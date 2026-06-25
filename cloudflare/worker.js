const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type,x-sync-token"
};

export default {
  async fetch(request, env) {
    if (request.method === "OPTIONS") {
      return new Response(null, { headers: corsHeaders });
    }

    const url = new URL(request.url);
    if (!url.pathname.startsWith("/api/passages")) {
      return json({ ok: false, error: "Not found" }, 404);
    }

    if (!authorized(request, env)) {
      return json({ ok: false, error: "Unauthorized" }, 401);
    }

    if (request.method === "GET") {
      const date = url.searchParams.get("date") || todayIso();
      const value = await env.ACT_PASSAGES.get(keyFor(date), "json");
      if (!value) return json({ date, items: [] }, 404);
      return json(value);
    }

    if (request.method === "POST") {
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

    return json({ ok: false, error: "Method not allowed" }, 405);
  }
};

function authorized(request, env) {
  if (!env.SYNC_TOKEN) return true;
  return request.headers.get("x-sync-token") === env.SYNC_TOKEN;
}

function keyFor(date) {
  return `passages/${date}.json`;
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
