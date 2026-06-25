const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type,x-sync-token,x-gemini-key"
};

export default {
  async fetch(request, env) {
    if (request.method === "OPTIONS") {
      return new Response(null, { headers: corsHeaders });
    }

    const url = new URL(request.url);
    if (!url.pathname.startsWith("/api/")) return json({ ok: false, error: "Not found" }, 404);

    if (url.pathname === "/api/passages" && request.method === "GET") {
      const date = url.searchParams.get("date") || todayIso();
      const value = await env.ACT_PASSAGES.get(keyFor(date), "json");
      if (!value) return json({ date, items: [] }, 404);
      return json(value);
    }

    if (url.pathname === "/api/passages" && request.method === "POST") {
      if (!authorized(request, env)) return json({ ok: false, error: "Unauthorized" }, 401);
      const body = await request.json();
      if (!validDate(body.date) || !Array.isArray(body.items)) {
        return json({ ok: false, error: "Expected { date, items }." }, 400);
      }

      const record = {
        date: body.date,
        items: body.items,
        updatedAt: new Date().toISOString()
      };
      await env.ACT_PASSAGES.put(keyFor(body.date), JSON.stringify(record));
      return json({ ok: true, date: body.date, count: body.items.length });
    }

    if (url.pathname === "/api/generate" && request.method === "POST") {
      const body = await request.json();
      const date = body.date || todayIso();
      const slot = Number(body.slot || 1);
      const guide = String(body.guide || "");
      const geminiKey = request.headers.get("x-gemini-key") || env.GEMINI_API_KEY;

      if (!validDate(date) || !Number.isFinite(slot) || slot < 1) {
        return json({ ok: false, error: "Expected a valid date and slot." }, 400);
      }
      if (!guide) return json({ ok: false, error: "Missing question guide." }, 400);
      if (!geminiKey) return json({ ok: false, error: "Missing Gemini key." }, 400);

      const source = SOURCES[seededIndex(`${date}-${slot}`, SOURCES.length)];
      const raw = await fetch(source.url).then((response) => {
        if (!response.ok) throw new Error(`Source fetch failed: HTTP ${response.status}`);
        return response.text();
      });
      const excerpt = makeExcerpt(cleanGutenbergText(raw), `${date}-${slot}-${source.title}`);
      const generated = await generateWithGemini({ geminiKey, guide, source, excerpt });
      const item = {
        id: `${date}-${slot}`,
        date,
        slot,
        createdAt: new Date().toISOString(),
        title: generated.title || source.title,
        source: generated.source || `${source.author}, ${source.title}`,
        passageType: generated.passageType || source.type,
        difficulty: generated.difficulty || "Medium",
        estimatedWords: generated.estimatedWords || excerpt.split(/\s+/).length,
        passage: generated.passage || excerpt,
        questions: generated.questions
      };

      const existing = await env.ACT_PASSAGES.get(keyFor(date), "json");
      const items = Array.isArray(existing?.items) ? existing.items.filter((entry) => entry.id !== item.id) : [];
      items.push(item);
      await env.ACT_PASSAGES.put(keyFor(date), JSON.stringify({
        date,
        items,
        updatedAt: new Date().toISOString()
      }));

      return json({ ok: true, item });
    }

    if ((url.pathname === "/api/profile/login" || url.pathname === "/api/profile/create") && request.method === "POST") {
      const body = await request.json();
      const name = cleanName(body.name);
      const pin = String(body.pin || "");
      if (!name) return json({ ok: false, error: "Name is required." }, 400);
      if (!/^\d{4}$/.test(pin)) return json({ ok: false, error: "A 4 digit PIN is required." }, 400);

      const key = profileKey(name);
      const pinHash = await hashPin(name, pin);
      const existing = await env.ACT_PASSAGES.get(key, "json");
      if (url.pathname === "/api/profile/create" && existing) {
        return json({ ok: false, error: "That profile already exists. Use Login instead." }, 409);
      }
      if (url.pathname === "/api/profile/login" && !existing) {
        return json({ ok: false, error: "Profile not found. Create an account first." }, 404);
      }
      if (existing && existing.pinHash !== pinHash) {
        return json({ ok: false, error: "That PIN does not match this profile." }, 401);
      }

      const profile = existing || {
        name,
        pinHash,
        completed: {},
        createdAt: new Date().toISOString()
      };
      profile.lastLoginAt = new Date().toISOString();
      await env.ACT_PASSAGES.put(key, JSON.stringify(profile));
      return json({ ok: true, profile: publicProfile(profile, pin) });
    }

    if (url.pathname === "/api/profile/complete" && request.method === "POST") {
      const body = await request.json();
      const name = cleanName(body.name);
      const pin = String(body.pin || "");
      const passageId = String(body.passageId || "");
      if (!name || !/^\d{4}$/.test(pin) || !passageId) {
        return json({ ok: false, error: "Name, PIN, and passage ID are required." }, 400);
      }

      const key = profileKey(name);
      const profile = await env.ACT_PASSAGES.get(key, "json");
      if (!profile) return json({ ok: false, error: "Profile not found." }, 404);
      if (profile.pinHash !== await hashPin(name, pin)) {
        return json({ ok: false, error: "That PIN does not match this profile." }, 401);
      }

      profile.completed = {
        ...(profile.completed || {}),
        [passageId]: sanitizeCompletion(body.completion)
      };
      profile.updatedAt = new Date().toISOString();
      await env.ACT_PASSAGES.put(key, JSON.stringify(profile));
      return json({ ok: true, profile: publicProfile(profile, pin) });
    }

    return json({ ok: false, error: "Method not allowed" }, 405);
  }
};

const GEMINI_MODEL = "gemini-2.5-flash";

const SOURCES = [
  {
    title: "The Souls of Black Folk",
    author: "W. E. B. Du Bois",
    type: "Informational",
    url: "https://www.gutenberg.org/cache/epub/408/pg408.txt"
  },
  {
    title: "A Room with a View",
    author: "E. M. Forster",
    type: "Literary Narrative",
    url: "https://www.gutenberg.org/cache/epub/2641/pg2641.txt"
  },
  {
    title: "The Voyage of the Beagle",
    author: "Charles Darwin",
    type: "Informational",
    url: "https://www.gutenberg.org/cache/epub/944/pg944.txt"
  },
  {
    title: "The Secret Garden",
    author: "Frances Hodgson Burnett",
    type: "Literary Narrative",
    url: "https://www.gutenberg.org/cache/epub/113/pg113.txt"
  }
];

function authorized(request, env) {
  if (!env.SYNC_TOKEN) return true;
  return request.headers.get("x-sync-token") === env.SYNC_TOKEN;
}

function keyFor(date) {
  return `passages/${date}.json`;
}

function profileKey(name) {
  return `profiles/${name.toLowerCase()}.json`;
}

function cleanName(name) {
  return String(name || "").trim().replace(/\s+/g, " ").slice(0, 48);
}

async function hashPin(name, pin) {
  const input = new TextEncoder().encode(`${name.toLowerCase()}::${pin}`);
  const digest = await crypto.subtle.digest("SHA-256", input);
  return [...new Uint8Array(digest)].map((byte) => byte.toString(16).padStart(2, "0")).join("");
}

function publicProfile(profile, pin) {
  return {
    name: profile.name,
    pin,
    completed: profile.completed || {},
    createdAt: profile.createdAt,
    updatedAt: profile.updatedAt || profile.lastLoginAt
  };
}

function sanitizeCompletion(completion = {}) {
  return {
    answers: completion.answers || {},
    score: Number(completion.score || 0),
    total: Number(completion.total || 0),
    completedAt: completion.completedAt || new Date().toISOString()
  };
}

function validDate(date) {
  return /^\d{4}-\d{2}-\d{2}$/.test(date || "");
}

function todayIso() {
  return new Date().toISOString().slice(0, 10);
}

function json(value, status = 200) {
  return new Response(JSON.stringify(value), {
    status,
    headers: {
      ...corsHeaders,
      "Content-Type": "application/json"
    }
  });
}

function cleanGutenbergText(text) {
  const startMarkers = [
    "*** START OF THE PROJECT GUTENBERG EBOOK",
    "*** START OF THIS PROJECT GUTENBERG EBOOK"
  ];
  const endMarkers = [
    "*** END OF THE PROJECT GUTENBERG EBOOK",
    "*** END OF THIS PROJECT GUTENBERG EBOOK"
  ];
  let body = text;
  for (const marker of startMarkers) {
    const index = body.indexOf(marker);
    if (index >= 0) body = body.slice(index + marker.length);
  }
  for (const marker of endMarkers) {
    const index = body.indexOf(marker);
    if (index >= 0) body = body.slice(0, index);
  }
  return body.replace(/\r/g, "").replace(/\n{3,}/g, "\n\n").replace(/[ \t]+/g, " ").trim();
}

function seededIndex(seed, max) {
  let hash = 2166136261;
  for (let i = 0; i < seed.length; i += 1) {
    hash ^= seed.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return Math.abs(hash) % max;
}

function makeExcerpt(text, seed) {
  const paragraphs = text
    .split(/\n\s*\n/)
    .map((paragraph) => paragraph.replace(/\s+/g, " ").trim())
    .filter((paragraph) => paragraph.length > 90 && !/^(chapter|contents)\b/i.test(paragraph));

  const start = seededIndex(seed, Math.max(1, paragraphs.length - 12));
  const selected = [];
  let words = 0;
  for (let i = start; i < paragraphs.length && words < 720; i += 1) {
    const paragraphWords = paragraphs[i].split(/\s+/).length;
    if (words + paragraphWords > 820 && selected.length >= 4) break;
    selected.push(paragraphs[i]);
    words += paragraphWords;
  }
  return selected.join("\n\n");
}

async function generateWithGemini({ geminiKey, guide, source, excerpt }) {
  const prompt = [
    guide,
    "",
    "Create one practice set from this public-domain excerpt.",
    "",
    `Source: ${source.title} by ${source.author}`,
    `Passage type: ${source.type}`,
    "",
    "Excerpt:",
    excerpt
  ].join("\n");

  const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-goog-api-key": geminiKey
    },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: {
        temperature: 0.35,
        responseMimeType: "application/json"
      }
    })
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Gemini request failed: HTTP ${response.status} ${errorText.slice(0, 160)}`);
  }

  const data = await response.json();
  const text = data.candidates?.[0]?.content?.parts?.map((part) => part.text || "").join("") || "";
  const generated = JSON.parse(text);
  if (!Array.isArray(generated.questions) || generated.questions.length !== 9) {
    throw new Error("Gemini returned an invalid question set.");
  }
  return generated;
}
