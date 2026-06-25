const GEMINI_MODEL = "gemini-2.5-flash";
const STORE_KEY = "actLikeReadingLab";
const SETTINGS_KEY = "actLikeReadingLabSettings";
const TODAY_COUNT = 2;

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
  const sourceResponse = await fetch(source.url);
  if (!sourceResponse.ok) throw new Error(`Could not fetch ${source.title}.`);
  const raw = await sourceResponse.text();
  const excerpt = makeExcerpt(cleanGutenbergText(raw), `${date}-${slot}-${source.title}`);
  const generated = await generateWithGemini({ key, guide, source, excerpt });

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

  if (!response.ok) throw new Error(`Cloudflare sync failed: ${response.status}`);
}

async function fetchFromCloudflare(date = todayIso()) {
  const { workerUrl, syncToken } = loadSettings();
  const base = normalizeWorkerUrl(workerUrl);
  if (!base) return [];

  const response = await fetch(`${base}/api/passages?date=${encodeURIComponent(date)}`, {
    headers: syncToken ? { "x-sync-token": syncToken } : {}
  });
  if (response.status === 404) return [];
  if (!response.ok) throw new Error(`Cloudflare load failed: ${response.status}`);
  const data = await response.json();
  return Array.isArray(data.items) ? data.items : [];
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
      generated.push(await generatePracticeSet(date, slot, key, guide));
    }

    upsertPassages(generated);
    await syncToCloudflare(loadStore().passages.filter((item) => item.date === date));
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
