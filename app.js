const GEMINI_MODEL = "gemini-2.5-flash";
const STORE_KEY = "actLikeReadingLab";
const SETTINGS_KEY = "actLikeReadingLabSettings";
const TODAY_COUNT = 2;

const LOCAL_PASSAGES = [
  {
    title: "The Souls of Black Folk",
    author: "W. E. B. Du Bois",
    type: "Informational",
    excerpt: `Between me and the other world there is ever an unasked question: unasked by some through feelings of delicacy; by others through the difficulty of rightly framing it. All, nevertheless, flutter round it. They approach me in a half-hesitant sort of way, eye me curiously or compassionately, and then, instead of saying directly, How does it feel to be a problem? they say, I know an excellent colored man in my town; or, I fought at Mechanicsville; or, Do not these Southern outrages make your blood boil?

At these I smile, or am interested, or reduce the boiling to a simmer, as the occasion may require. To the real question, How does it feel to be a problem? I answer seldom a word.

And yet, being a problem is a strange experience, peculiar even for one who has never been anything else, save perhaps in babyhood and in Europe. It is in the early days of rollicking boyhood that the revelation first bursts upon one, all in a day, as it were. I remember well when the shadow swept across me. I was a little thing, away up in the hills of New England, where the dark Housatonic winds between Hoosac and Taghkanic to the sea.

In a wee wooden schoolhouse, something put it into the boys' and girls' heads to buy gorgeous visiting-cards, ten cents a package, and exchange. The exchange was merry, till one girl, a tall newcomer, refused my card, refused it peremptorily, with a glance. Then it dawned upon me with a certain suddenness that I was different from the others; or like, mayhap, in heart and life and longing, but shut out from their world by a vast veil.`
  },
  {
    title: "A Room with a View",
    author: "E. M. Forster",
    type: "Literary Narrative",
    excerpt: `"The Signora had no business to do it," said Miss Bartlett, "no business at all. She promised us south rooms with a view close together, instead of which here are north rooms, looking into a courtyard, and a long way apart. Oh, Lucy!"

"And a Cockney, besides!" said Lucy, who had been further saddened by the Signora's unexpected accent. "It might be London." She looked at the two rows of English people who were sitting at the table; at the row of white bottles of water and red bottles of wine that ran between the English people; at the portraits of the late Queen and the late Poet Laureate that hung behind the English people, heavily framed; at the notice of the English church pinned by the door; and at the two little old ladies who were sitting further up the table, and who had asked if there was a church.

"Charlotte, don't you feel, too, that we might be in London? I can hardly believe that all kinds of other things are just outside. I suppose it is one's being so tired."

"This meat has surely been used for soup," said Miss Bartlett, laying down her fork.

"I want so to see the Arno. The rooms the Signora promised us in her letter would have looked over the Arno. The Signora had no business to do it at all."`
  },
  {
    title: "The Voyage of the Beagle",
    author: "Charles Darwin",
    type: "Informational",
    excerpt: `The scene, as beheld from the anchorage, was very striking. The regular volcanic outline of the island, the high table-land, and the many cones rising from it, gave it a remarkable appearance. The whole island, from the black lava streams to the summits of the craters, was covered by a thin layer of burnt-looking vegetation.

The shore is formed chiefly of black, rugged rocks, against which the sea breaks with violence. A little further inland the lava is broken into rough fragments, and in the hollows there is a scanty growth of coarse grass and low shrubs. Every object seemed marked by the same dry and desolate character.

Yet this apparent sterility was not without interest. The plants and animals, though few in number, were unlike those of the mainland. They appeared to have been formed for the peculiar conditions of the place: heat, drought, and a soil that had only slowly begun to crumble into earth. It was impossible to walk among them without reflecting on the strange relation between living forms and the circumstances in which they are placed.

The naturalist, in such a country, is not rewarded by abundance, but by singularity. Each small fact seems to have a value greater than it would possess in a richer scene. A bird, a lizard, or a plant growing from a crack in the lava becomes evidence of a larger history, written not in books but in the distribution of life itself.`
  },
  {
    title: "The Secret Garden",
    author: "Frances Hodgson Burnett",
    type: "Literary Narrative",
    excerpt: `When Mary Lennox was sent to Misselthwaite Manor to live with her uncle everybody said she was the most disagreeable-looking child ever seen. It was true, too. She had a little thin face and a little thin body, thin light hair and a sour expression.

Her hair was yellow, and her face was yellow because she had been born in India and had always been ill in one way or another. Her father had held a position under the English Government and had always been busy and ill himself, and her mother had been a great beauty who cared only to go to parties and amuse herself with gay people.

She had not wanted a little girl at all, and when Mary was born she handed her over to the care of an Ayah, who was made to understand that if she wished to please the Mem Sahib she must keep the child out of sight as much as possible.

So when she was a sickly, fretful, ugly little baby she was kept out of the way, and when she became a sickly, fretful, toddling thing she was kept out of the way also. She never remembered seeing familiarly anything but the dark faces of her Ayah and the other native servants, and as they always obeyed her and gave her her own way in everything, because the Mem Sahib would be angry if she was disturbed by her crying, by the time she was six years old she was as tyrannical and selfish a little pig as ever lived.`
  }
];

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
  },
  {
    title: "Walden",
    author: "Henry David Thoreau",
    type: "Informational",
    url: "https://www.gutenberg.org/cache/epub/205/pg205.txt"
  },
  {
    title: "Narrative of the Life of Frederick Douglass",
    author: "Frederick Douglass",
    type: "Informational",
    url: "https://www.gutenberg.org/cache/epub/23/pg23.txt"
  }
];

const els = {
  geminiKey: document.querySelector("#geminiKey"),
  workerUrl: document.querySelector("#workerUrl"),
  syncToken: document.querySelector("#syncToken"),
  autoDaily: document.querySelector("#autoDaily"),
  loadDate: document.querySelector("#loadDate"),
  loadDateButton: document.querySelector("#loadDateButton"),
  saveSettings: document.querySelector("#saveSettings"),
  generateToday: document.querySelector("#generateToday"),
  refreshLibrary: document.querySelector("#refreshLibrary"),
  library: document.querySelector("#library"),
  statusPill: document.querySelector("#statusPill"),
  emptyState: document.querySelector("#emptyState"),
  practiceView: document.querySelector("#practiceView"),
  practiceMeta: document.querySelector("#practiceMeta"),
  practiceTitle: document.querySelector("#practiceTitle"),
  passageText: document.querySelector("#passageText"),
  questionForm: document.querySelector("#questionForm"),
  showAnswers: document.querySelector("#showAnswers"),
  installButton: document.querySelector("#installButton"),
  dialog: document.querySelector("#messageDialog"),
  dialogTitle: document.querySelector("#dialogTitle"),
  dialogBody: document.querySelector("#dialogBody")
};

let deferredInstall = null;
let selectedId = null;
let answersVisible = false;

const todayIso = () => new Date().toISOString().slice(0, 10);

function loadSettings() {
  try {
    return JSON.parse(localStorage.getItem(SETTINGS_KEY)) || {};
  } catch {
    return {};
  }
}

function saveSettings(settings) {
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
}

function loadStore() {
  try {
    return JSON.parse(localStorage.getItem(STORE_KEY)) || { passages: [] };
  } catch {
    return { passages: [] };
  }
}

function saveStore(store) {
  localStorage.setItem(STORE_KEY, JSON.stringify(store));
}

function showMessage(title, body) {
  els.dialogTitle.textContent = title;
  els.dialogBody.textContent = body;
  els.dialog.showModal();
}

function normalizeWorkerUrl(url) {
  return (url || "").trim().replace(/\/+$/, "");
}

function setBusy(isBusy, label = "Generate Today") {
  els.generateToday.disabled = isBusy;
  els.refreshLibrary.disabled = isBusy;
  els.saveSettings.disabled = isBusy;
  els.generateToday.textContent = isBusy ? "Working..." : label;
}

function updateStatus() {
  const settings = loadSettings();
  els.statusPill.textContent = settings.workerUrl ? "Cloud Sync" : "Local";
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
  return body
    .replace(/\r/g, "")
    .replace(/\n{3,}/g, "\n\n")
    .replace(/[ \t]+/g, " ")
    .trim();
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

function extractJson(text) {
  const trimmed = text.trim();
  if (trimmed.startsWith("{")) return JSON.parse(trimmed);
  const fenced = trimmed.match(/```(?:json)?\s*([\s\S]*?)```/i);
  if (fenced) return JSON.parse(fenced[1]);
  const first = trimmed.indexOf("{");
  const last = trimmed.lastIndexOf("}");
  if (first >= 0 && last > first) return JSON.parse(trimmed.slice(first, last + 1));
  throw new Error("Gemini did not return JSON.");
}

function validatePracticeSet(set) {
  if (!set || !Array.isArray(set.questions) || set.questions.length !== 9) {
    throw new Error("Gemini returned a set without exactly 9 questions.");
  }
  set.questions.forEach((question, index) => {
    const choices = question.choices || {};
    const labels = ["A", "B", "C", "D"];
    if (!labels.every((label) => typeof choices[label] === "string")) {
      throw new Error(`Question ${index + 1} is missing answer choices.`);
    }
    if (!labels.includes(question.answer)) {
      throw new Error(`Question ${index + 1} has an invalid answer key.`);
    }
  });
}

async function generateWithGemini({ key, guide, source, excerpt }) {
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

  const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${encodeURIComponent(key)}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
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
    throw new Error(`Gemini request failed: ${response.status} ${errorText.slice(0, 160)}`);
  }

  const data = await response.json();
  const text = data.candidates?.[0]?.content?.parts?.map((part) => part.text || "").join("") || "";
  const set = extractJson(text);
  validatePracticeSet(set);
  return set;
}

async function generatePracticeSet(date, slot, key, guide) {
  const source = SOURCES[seededIndex(`${date}-${slot}`, SOURCES.length)];
  let excerpt;
  try {
    const sourceResponse = await fetch(source.url);
    if (!sourceResponse.ok) throw new Error(`HTTP ${sourceResponse.status}`);
    const raw = await sourceResponse.text();
    excerpt = makeExcerpt(cleanGutenbergText(raw), `${date}-${slot}-${source.title}`);
  } catch {
    const local = LOCAL_PASSAGES[seededIndex(`${date}-${slot}`, LOCAL_PASSAGES.length)];
    source.title = local.title;
    source.author = local.author;
    source.type = local.type;
    excerpt = local.excerpt;
  }

  let generated;
  try {
    generated = await generateWithGemini({ key, guide, source, excerpt });
  } catch (error) {
    throw new Error(`Gemini generation failed. ${error.message}`);
  }

  return {
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
}

async function syncToCloudflare(items) {
  const { workerUrl, syncToken } = loadSettings();
  const base = normalizeWorkerUrl(workerUrl);
  if (!base) return;

  const response = await fetch(`${base}/api/passages`, {
    method: "POST",
    headers: cloudHeaders(syncToken),
    body: JSON.stringify({ date: todayIso(), items })
  });

  if (!response.ok) throw new Error(`Cloudflare sync failed: HTTP ${response.status}`);
}

async function fetchFromCloudflare(date = todayIso()) {
  const { workerUrl, syncToken } = loadSettings();
  const base = normalizeWorkerUrl(workerUrl);
  if (!base) return [];

  const response = await fetch(`${base}/api/passages?date=${encodeURIComponent(date)}`, {
    headers: syncToken ? { "x-sync-token": syncToken } : {}
  });
  if (response.status === 404) return [];
  if (!response.ok) throw new Error(`Cloudflare load failed: HTTP ${response.status}`);
  const data = await response.json();
  return Array.isArray(data.items) ? data.items : [];
}

async function generateWithWorker(date, slot, guide, key) {
  const { workerUrl, syncToken } = loadSettings();
  const base = normalizeWorkerUrl(workerUrl);
  if (!base) return null;

  const response = await fetch(`${base}/api/generate`, {
    method: "POST",
    headers: {
      ...cloudHeaders(syncToken),
      "x-gemini-key": key
    },
    body: JSON.stringify({ date, slot, guide })
  });

  if (response.status === 404 || response.status === 405) return null;
  if (!response.ok) throw new Error(`Worker generation failed: HTTP ${response.status}`);
  const data = await response.json();
  if (!data.item) throw new Error("Worker generation returned no practice set.");
  return data.item;
}

function cloudHeaders(syncToken) {
  const headers = { "Content-Type": "application/json" };
  if (syncToken) headers["x-sync-token"] = syncToken;
  return headers;
}

function upsertPassages(items) {
  const store = loadStore();
  const byId = new Map(store.passages.map((item) => [item.id, item]));
  items.forEach((item) => byId.set(item.id, item));
  store.passages = Array.from(byId.values()).sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  saveStore(store);
}

function renderLibrary() {
  const store = loadStore();
  els.library.innerHTML = "";

  if (!store.passages.length) {
    const empty = document.createElement("p");
    empty.className = "finePrint";
    empty.textContent = "No saved practice sets yet.";
    els.library.append(empty);
    return;
  }

  store.passages.forEach((item) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `libraryItem${item.id === selectedId ? " active" : ""}`;
    button.innerHTML = `<strong></strong><span></span>`;
    button.querySelector("strong").textContent = item.title;
    button.querySelector("span").textContent = `${item.date} · ${item.passageType} · ${item.questions.length} questions`;
    button.addEventListener("click", () => selectPractice(item.id));
    els.library.append(button);
  });
}

function passageHtml(passage) {
  return passage
    .split(/\n\s*\n/)
    .map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`)
    .join("");
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function selectPractice(id) {
  const item = loadStore().passages.find((passage) => passage.id === id);
  if (!item) return;

  selectedId = id;
  answersVisible = false;
  els.emptyState.hidden = true;
  els.practiceView.hidden = false;
  els.questionForm.classList.remove("answersVisible");
  els.showAnswers.textContent = "Show Answers";
  els.practiceMeta.textContent = `${item.passageType} · ${item.source} · ${item.estimatedWords || "?"} words`;
  els.practiceTitle.textContent = item.title;
  els.passageText.innerHTML = passageHtml(item.passage);
  renderQuestions(item);
  renderLibrary();
}

function renderQuestions(item) {
  els.questionForm.innerHTML = "";
  item.questions.forEach((question, index) => {
    const fieldset = document.createElement("fieldset");
    fieldset.className = "question";
    const legend = document.createElement("legend");
    legend.textContent = `${index + 1}. ${question.question}`;
    fieldset.append(legend);

    const choices = document.createElement("div");
    choices.className = "choices";
    ["A", "B", "C", "D"].forEach((label) => {
      const choice = document.createElement("label");
      choice.className = "choice";
      choice.dataset.label = label;
      choice.innerHTML = `<input type="radio" name="q${index}" value="${label}"><span></span>`;
      choice.querySelector("span").textContent = `${label}. ${question.choices[label]}`;
      choices.append(choice);
    });
    fieldset.append(choices);

    const explanation = document.createElement("p");
    explanation.className = "explanation";
    explanation.textContent = `Answer ${question.answer}. ${question.evidence || ""}`;
    fieldset.append(explanation);
    els.questionForm.append(fieldset);
  });
}

function gradeVisibleAnswers() {
  const item = loadStore().passages.find((passage) => passage.id === selectedId);
  if (!item) return;

  item.questions.forEach((question, index) => {
    const selected = els.questionForm.querySelector(`input[name="q${index}"]:checked`)?.value;
    els.questionForm.querySelectorAll(`input[name="q${index}"]`).forEach((input) => {
      const choice = input.closest(".choice");
      choice.classList.toggle("correct", input.value === question.answer);
      choice.classList.toggle("incorrect", Boolean(selected) && input.value === selected && selected !== question.answer);
    });
  });
}

async function generateToday() {
  const settings = loadSettings();
  const key = settings.geminiKey;
  if (!key) {
    showMessage("Gemini key needed", "Paste your Gemini API key into Setup before generating practice.");
    return;
  }

  setBusy(true);
  try {
    const date = todayIso();
    const existing = loadStore().passages.filter((item) => item.date === date);
    if (existing.length >= TODAY_COUNT) {
      showMessage("Already generated", "Today already has two practice sets saved.");
      return;
    }

    const guide = await fetch("question-construction.md").then((response) => {
      if (!response.ok) throw new Error("Could not load question-construction.md.");
      return response.text();
    });

    const generated = [];
    for (let slot = existing.length + 1; slot <= TODAY_COUNT; slot += 1) {
      els.generateToday.textContent = `Generating ${slot}/${TODAY_COUNT}...`;
      let workerItem = null;
      try {
        workerItem = await generateWithWorker(date, slot, guide, key);
      } catch (error) {
        console.warn(error.message);
      }
      generated.push(workerItem || await generatePracticeSet(date, slot, key, guide));
    }

    upsertPassages(generated);
    try {
      await syncToCloudflare(loadStore().passages.filter((item) => item.date === date));
    } catch (error) {
      console.warn(error.message);
      showMessage("Saved locally", `${error.message}. Your generated sets were saved in this browser, but not Cloudflare yet.`);
    }
    renderLibrary();
    selectPractice(generated[0].id);
  } catch (error) {
    showMessage("Generation failed", error.message);
  } finally {
    setBusy(false);
  }
}

async function refreshLibrary(date = todayIso()) {
  setBusy(true, "Generate Today");
  try {
    const cloudItems = await fetchFromCloudflare(date);
    if (cloudItems.length) upsertPassages(cloudItems);
    renderLibrary();
    if (!selectedId && loadStore().passages[0]) selectPractice(loadStore().passages[0].id);
  } catch (error) {
    showMessage("Refresh failed", error.message);
  } finally {
    setBusy(false);
  }
}

function initSettings() {
  const settings = loadSettings();
  els.geminiKey.value = settings.geminiKey || "";
  els.workerUrl.value = settings.workerUrl || "";
  els.syncToken.value = settings.syncToken || "";
  els.autoDaily.checked = settings.autoDaily !== false;
  els.loadDate.value = todayIso();
  updateStatus();
}

function wireEvents() {
  els.saveSettings.addEventListener("click", () => {
    saveSettings({
      geminiKey: els.geminiKey.value.trim(),
      workerUrl: normalizeWorkerUrl(els.workerUrl.value),
      syncToken: els.syncToken.value.trim(),
      autoDaily: els.autoDaily.checked
    });
    updateStatus();
    showMessage("Saved", "Settings were saved in this browser.");
  });

  els.generateToday.addEventListener("click", generateToday);
  els.refreshLibrary.addEventListener("click", () => refreshLibrary(todayIso()));
  els.loadDateButton.addEventListener("click", () => refreshLibrary(els.loadDate.value || todayIso()));
  els.showAnswers.addEventListener("click", () => {
    answersVisible = !answersVisible;
    els.questionForm.classList.toggle("answersVisible", answersVisible);
    els.showAnswers.textContent = answersVisible ? "Hide Answers" : "Show Answers";
    if (answersVisible) gradeVisibleAnswers();
  });

  window.addEventListener("beforeinstallprompt", (event) => {
    event.preventDefault();
    deferredInstall = event;
    els.installButton.hidden = false;
  });

  els.installButton.addEventListener("click", async () => {
    if (!deferredInstall) return;
    deferredInstall.prompt();
    await deferredInstall.userChoice;
    deferredInstall = null;
    els.installButton.hidden = true;
  });
}

async function registerServiceWorker() {
  if ("serviceWorker" in navigator) {
    await navigator.serviceWorker.register("sw.js");
  }
}

initSettings();
wireEvents();
renderLibrary();
registerServiceWorker().catch(() => {});
refreshLibrary().then(() => {
  const settings = loadSettings();
  const todayCount = loadStore().passages.filter((item) => item.date === todayIso()).length;
  if (settings.autoDaily !== false && settings.geminiKey && todayCount < TODAY_COUNT) {
    generateToday();
  }
});
