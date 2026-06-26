const GEMINI_MODEL = "gemini-2.5-flash";
const STORE_KEY = "actLikeReadingLab";
const SETTINGS_KEY = "actLikeReadingLabSettings";
const PROFILE_KEY = "actLikeReadingLabProfile";
const IOS_INSTALL_HIDE_KEY = "actLikeReadingLabHideIosInstall";
const TODAY_COUNT = 2;
const DEFAULT_WORKER_URL = "https://actprep.solitary-sky-76c1.workers.dev";

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
  settingsButton: document.querySelector("#settingsButton"),
  profileButton: document.querySelector("#profileButton"),
  statsButton: document.querySelector("#statsButton"),
  workerUrl: document.querySelector("#workerUrl"),
  syncToken: document.querySelector("#syncToken"),
  autoDaily: document.querySelector("#autoDaily"),
  loadDate: document.querySelector("#loadDate"),
  loadDateButton: document.querySelector("#loadDateButton"),
  saveSettings: document.querySelector("#saveSettings"),
  forceUpdate: document.querySelector("#forceUpdate"),
  generateToday: document.querySelector("#generateToday"),
  generateExtra: document.querySelector("#generateExtra"),
  refreshLibrary: document.querySelector("#refreshLibrary"),
  library: document.querySelector("#library"),
  showMoreLibrary: document.querySelector("#showMoreLibrary"),
  statusPill: document.querySelector("#statusPill"),
  emptyState: document.querySelector("#emptyState"),
  practiceView: document.querySelector("#practiceView"),
  practiceMeta: document.querySelector("#practiceMeta"),
  practiceTitle: document.querySelector("#practiceTitle"),
  passageText: document.querySelector("#passageText"),
  questionForm: document.querySelector("#questionForm"),
  questions: document.querySelector("#questions"),
  submitAnswers: document.querySelector("#submitAnswers"),
  scoreSummary: document.querySelector("#scoreSummary"),
  installButton: document.querySelector("#installButton"),
  settingsDialog: document.querySelector("#settingsDialog"),
  profileDialog: document.querySelector("#profileDialog"),
  profileName: document.querySelector("#profileName"),
  profilePin: document.querySelector("#profilePin"),
  loginProfile: document.querySelector("#loginProfile"),
  createProfile: document.querySelector("#createProfile"),
  logoutProfile: document.querySelector("#logoutProfile"),
  profileStatus: document.querySelector("#profileStatus"),
  profilePill: document.querySelector("#profilePill"),
  profileDetails: document.querySelector("#profileDetails"),
  statsDialog: document.querySelector("#statsDialog"),
  statsSummary: document.querySelector("#statsSummary"),
  accuracyChart: document.querySelector("#accuracyChart"),
  iosInstallDialog: document.querySelector("#iosInstallDialog"),
  hideIosInstall: document.querySelector("#hideIosInstall"),
  hideIosInstallForever: document.querySelector("#hideIosInstallForever"),
  geminiKeyDialog: document.querySelector("#geminiKeyDialog"),
  openSettingsFromKeyPrompt: document.querySelector("#openSettingsFromKeyPrompt"),
  dialog: document.querySelector("#messageDialog"),
  dialogTitle: document.querySelector("#dialogTitle"),
  dialogBody: document.querySelector("#dialogBody")
};

let deferredInstall = null;
let selectedId = null;
let answersVisible = false;
let libraryVisibleCount = 5;

const todayIso = () => new Date().toISOString().slice(0, 10);

function loadSettings() {
  try {
    return {
      workerUrl: DEFAULT_WORKER_URL,
      ...(JSON.parse(localStorage.getItem(SETTINGS_KEY)) || {})
    };
  } catch {
    return { workerUrl: DEFAULT_WORKER_URL };
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

function loadProfile() {
  try {
    return JSON.parse(localStorage.getItem(PROFILE_KEY)) || null;
  } catch {
    return null;
  }
}

function saveProfile(profile) {
  if (!profile) {
    localStorage.removeItem(PROFILE_KEY);
    return;
  }
  localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
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
  els.generateExtra.disabled = isBusy;
  els.refreshLibrary.disabled = isBusy;
  els.saveSettings.disabled = isBusy;
  els.generateToday.textContent = isBusy ? "Working..." : label;
}

function syncTokenValue() {
  return els.syncToken?.value?.trim() || "";
}

function updateStatus() {
  const settings = loadSettings();
  els.statusPill.textContent = settings.workerUrl ? "Cloud" : "Local";
}

function updateProfileUi() {
  const profile = loadProfile();
  const completedItems = Object.values(profile?.completed || {}).sort((a, b) =>
    String(b.completedAt || "").localeCompare(String(a.completedAt || ""))
  );
  const completions = completedItems.length;
  const recent = completedItems.slice(0, 10);
  const earned = recent.reduce((sum, item) => sum + Number(item.score || 0), 0);
  const total = recent.reduce((sum, item) => sum + Number(item.total || 0), 0);
  const accuracy = total ? Math.round((earned / total) * 100) : 0;
  els.profileStatus.textContent = profile ? `${profile.name} · ${completions} completed` : "Not signed in";
  els.profilePill.textContent = profile ? "Signed in" : "Guest";
  els.profileDetails.textContent = profile
    ? `${profile.name} · ${accuracy}% accuracy across the last ${recent.length || 0} passage${recent.length === 1 ? "" : "s"}.`
    : "Sign in to sync completed passages across devices.";
  els.profileStats.hidden = !profile;
  if (profile) {
    els.profileStats.innerHTML = `
      <div class="stat"><strong>${accuracy}%</strong><span>Last 10 accuracy</span></div>
      <div class="stat"><strong>${completions}</strong><span>Completed</span></div>
    `;
  } else {
    els.profileStats.innerHTML = "";
  }
  els.profileName.value = profile?.name || "";
  els.profilePin.value = "";
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

async function requestWorker(path, options = {}) {
  const { workerUrl } = loadSettings();
  const base = normalizeWorkerUrl(workerUrl);
  if (!base) throw new Error("Worker URL is missing.");
  const response = await fetch(`${base}${path}`, options);
  const text = await response.text();
  const data = text ? JSON.parse(text) : {};
  if (!response.ok) throw new Error(data.error || `Request failed: HTTP ${response.status}`);
  return data;
}

async function submitProfile(mode) {
  const name = els.profileName.value.trim();
  const pin = els.profilePin.value.trim();
  if (!name) {
    showMessage("Name needed", "Enter a name for this profile.");
    return;
  }
  if (!/^\d{4}$/.test(pin)) {
    showMessage("PIN needed", "Enter a 4 digit PIN.");
    return;
  }

  els.loginProfile.disabled = true;
  els.createProfile.disabled = true;
  try {
    const data = await requestWorker(`/api/profile/${mode}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, pin })
    });
    saveProfile(data.profile);
    applyCompletionsToStore(data.profile.completed || {});
    await importLocalPassagesToProfile();
    await loadProfileGeneratedPassages(loadProfile());
    updateProfileUi();
    renderLibrary();
    showMessage(mode === "create" ? "Account created" : "Signed in", `Profile ready for ${data.profile.name}.`);
  } catch (error) {
    showMessage("Profile failed", error.message);
  } finally {
    els.loginProfile.disabled = false;
    els.createProfile.disabled = false;
  }
}

async function importLocalPassagesToProfile() {
  const profile = loadProfile();
  if (!profile) return;
  const items = loadStore().passages;
  if (!items.length) return;

  try {
    const data = await requestWorker("/api/profile/import", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: profile.name,
        pin: profile.pin,
        items
      })
    });
    if (data.profile) saveProfile(data.profile);
  } catch (error) {
    console.warn(error.message);
  }
}

async function loadProfileGeneratedPassages(profile) {
  const generated = Array.isArray(profile?.generated) ? profile.generated : [];
  const dates = [...new Set(generated.map((item) => item.date).filter(Boolean))];
  for (const date of dates) {
    try {
      const cloudItems = await fetchFromCloudflare(date);
      if (cloudItems.length) upsertPassages(cloudItems);
    } catch (error) {
      console.warn(error.message);
    }
  }
  applyCompletionsToStore(profile.completed || {});
}

function applyCompletionsToStore(completed) {
  const store = loadStore();
  store.passages = store.passages.map((item) => ({
    ...item,
    completed: Boolean(completed[item.id]),
    score: completed[item.id]?.score ?? item.score,
    answers: completed[item.id]?.answers ?? item.answers,
    completedAt: completed[item.id]?.completedAt ?? item.completedAt
  }));
  saveStore(store);
}

async function generateWithWorker(date, slot, guide, key) {
  const { workerUrl, syncToken } = loadSettings();
  const base = normalizeWorkerUrl(workerUrl);
  if (!base) return null;

  const profile = loadProfile();
  const response = await fetch(`${base}/api/generate`, {
    method: "POST",
    headers: {
      ...cloudHeaders(syncToken),
      "x-gemini-key": key
    },
    body: JSON.stringify({
      date,
      slot,
      guide,
      profile: profile ? { name: profile.name, pin: profile.pin } : null
    })
  });

  if (response.status === 404 || response.status === 405) return null;
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Worker generation failed: HTTP ${response.status}. ${errorText.slice(0, 220)}`);
  }
  const data = await response.json();
  if (!data.item) throw new Error("Worker generation returned no practice set.");
  if (data.profile) {
    saveProfile(data.profile);
    updateProfileUi();
  }
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
    const done = item.completed ? ` · Completed ${item.score ?? ""}/${item.questions.length}` : "";
    button.querySelector("span").textContent = `${item.date} · ${item.passageType} · ${item.questions.length} questions${done}`;
    button.addEventListener("click", () => selectPractice(item.id));
    els.library.append(button);
  });
}

function selectPractice(id) {
  const item = loadStore().passages.find((passage) => passage.id === id);
  if (!item) return;

  selectedId = id;
  answersVisible = false;
  els.emptyState.hidden = true;
  els.practiceView.hidden = false;
  els.questionForm.classList.remove("answersVisible");
  els.submitAnswers.disabled = false;
  els.submitAnswers.textContent = item.completed ? "Answers Shown" : "Submit Answers";
  els.scoreSummary.textContent = item.completed && Number.isFinite(item.score)
    ? `Completed: ${item.score}/${item.questions.length}`
    : "";
  els.practiceMeta.textContent = `${item.passageType} · ${item.source} · ${item.estimatedWords || "?"} words`;
  els.practiceTitle.textContent = item.title;
  els.passageText.innerHTML = passageHtml(item.passage);
  renderQuestions(item);
  if (item.completed) {
    els.questionForm.classList.add("answersVisible");
    gradeVisibleAnswers(item.answers || {});
  }
  renderLibrary();
}

function renderQuestions(item) {
  els.questions.innerHTML = "";
  item.questions.forEach((question, index) => {
    const block = document.createElement("section");
    block.className = "question";
    const prompt = document.createElement("div");
    prompt.className = "questionPrompt";
    prompt.textContent = `${index + 1}. ${question.question}`;
    block.append(prompt);

    const choices = document.createElement("div");
    choices.className = "choices";
    ["A", "B", "C", "D"].forEach((label) => {
      const choice = document.createElement("label");
      choice.className = "choice";
      choice.dataset.label = label;
      choice.innerHTML = `<input type="radio" name="q${index}" value="${label}"><span></span>`;
      choice.querySelector("span").textContent = `${label}. ${question.choices[label]}`;
      if (item.answers?.[index] === label) choice.querySelector("input").checked = true;
      choices.append(choice);
    });
    block.append(choices);

    const explanation = document.createElement("p");
    explanation.className = "explanation";
    explanation.textContent = `Answer ${question.answer}. ${question.evidence || ""}`;
    block.append(explanation);
    els.questions.append(block);
  });
}

function selectedAnswers(item) {
  const answers = {};
  item.questions.forEach((question, index) => {
    answers[index] = els.questionForm.querySelector(`input[name="q${index}"]:checked`)?.value || "";
  });
  return answers;
}

function gradeVisibleAnswers(answers = null) {
  const item = loadStore().passages.find((passage) => passage.id === selectedId);
  if (!item) return;
  const chosen = answers || selectedAnswers(item);

  item.questions.forEach((question, index) => {
    const selected = chosen[index];
    els.questionForm.querySelectorAll(`input[name="q${index}"]`).forEach((input) => {
      const choice = input.closest(".choice");
      choice.classList.toggle("correct", input.value === question.answer);
      choice.classList.toggle("incorrect", Boolean(selected) && input.value === selected && selected !== question.answer);
    });
  });
}

async function submitAnswers(event) {
  event.preventDefault();
  const item = loadStore().passages.find((passage) => passage.id === selectedId);
  if (!item) return;
  const answers = selectedAnswers(item);
  const unanswered = Object.values(answers).filter((answer) => !answer).length;
  if (unanswered) {
    showMessage("Questions left", `Answer all questions before submitting. ${unanswered} left.`);
    return;
  }

  const score = item.questions.reduce((sum, question, index) => sum + (answers[index] === question.answer ? 1 : 0), 0);
  els.questionForm.classList.add("answersVisible");
  els.submitAnswers.textContent = "Answers Shown";
  els.scoreSummary.textContent = `Score: ${score}/${item.questions.length}`;
  gradeVisibleAnswers(answers);
  await markCompleted(item, answers, score);
}

async function markCompleted(item, answers, score) {
  const completedAt = new Date().toISOString();
  const store = loadStore();
  store.passages = store.passages.map((passage) => passage.id === item.id
    ? { ...passage, completed: true, answers, score, completedAt }
    : passage);
  saveStore(store);

  const profile = loadProfile();
  if (profile) {
    profile.completed = {
      ...(profile.completed || {}),
      [item.id]: { answers, score, total: item.questions.length, completedAt }
    };
    saveProfile(profile);
    updateProfileUi();
    try {
      await requestWorker("/api/profile/complete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: profile.name,
          pin: profile.pin,
          passageId: item.id,
          completion: profile.completed[item.id]
        })
      });
    } catch (error) {
      console.warn(error.message);
    }
  }
  renderLibrary();
}

function settingsFromInputs() {
  return {
    geminiKey: els.geminiKey.value.trim(),
    workerUrl: normalizeWorkerUrl(els.workerUrl.value) || DEFAULT_WORKER_URL,
    syncToken: syncTokenValue(),
    autoDaily: els.autoDaily.checked
  };
}

async function generatePassageBatch({ extra = false } = {}) {
  const settings = settingsFromInputs();
  saveSettings(settings);
  updateStatus();

  const key = settings.geminiKey;
  if (!key) {
    showMessage("Gemini key needed", "Paste your Gemini API key into Setup before generating practice.");
    return;
  }

  setBusy(true);
  try {
    const date = todayIso();
    const existing = loadStore().passages.filter((item) => item.date === date);
    if (!extra && existing.length >= TODAY_COUNT) {
      showMessage("Already generated", "Today already has two practice sets saved.");
      return;
    }

    const guide = await fetch("question-construction.md").then((response) => {
      if (!response.ok) throw new Error("Could not load question-construction.md.");
      return response.text();
    });

    const generated = [];
    const existingSlots = existing.map((item) => Number(item.slot || item.id?.split("-").pop() || 0));
    const startSlot = Math.max(0, ...existingSlots) + 1;
    const targetCount = extra ? 1 : Math.max(0, TODAY_COUNT - existing.length);
    for (let offset = 0; offset < targetCount; offset += 1) {
      const slot = startSlot + offset;
      els.generateToday.textContent = extra ? "Generating extra..." : `Generating ${offset + 1}/${targetCount}...`;
      let workerItem = null;
      try {
        workerItem = await generateWithWorker(date, slot, guide, key);
      } catch (error) {
        if (settings.workerUrl) throw error;
        console.warn(error.message);
      }
      generated.push(workerItem || await generatePracticeSet(date, slot, key, guide));
    }

    upsertPassages(generated);
    renderLibrary();
    selectPractice(generated[0].id);
  } catch (error) {
    showMessage("Generation failed", error.message);
  } finally {
    setBusy(false);
  }
}

async function generateToday() {
  await generatePassageBatch({ extra: false });
}

async function generateExtraPassage() {
  await generatePassageBatch({ extra: true });
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
  const emptyTitle = els.emptyState.querySelector("h2");
  const emptyCopy = els.emptyState.querySelector("p");
  if (emptyTitle) emptyTitle.textContent = "No passage selected";
  if (emptyCopy) emptyCopy.textContent = "Select a saved passage or generate a new one.";
  els.geminiKey.value = settings.geminiKey || "";
  els.workerUrl.value = settings.workerUrl || DEFAULT_WORKER_URL;
  if (els.syncToken) els.syncToken.value = settings.syncToken || "";
  els.autoDaily.checked = settings.autoDaily !== false;
  els.loadDate.value = todayIso();
  updateStatus();
  updateProfileUi();
}

function wireEvents() {
  els.settingsButton.addEventListener("click", () => els.settingsDialog.showModal());
  els.profileButton.addEventListener("click", () => {
    updateProfileUi();
    els.profileDialog.showModal();
  });
  els.statsButton.addEventListener("click", () => {
    renderStats();
    els.statsDialog.showModal();
  });
  els.loginProfile.addEventListener("click", () => submitProfile("login"));
  els.createProfile.addEventListener("click", () => submitProfile("create"));
  els.logoutProfile.addEventListener("click", () => {
    saveProfile(null);
    updateProfileUi();
    renderLibrary();
  });

  els.saveSettings.addEventListener("click", () => {
    saveSettings({
      geminiKey: els.geminiKey.value.trim(),
      workerUrl: normalizeWorkerUrl(els.workerUrl.value),
      syncToken: syncTokenValue(),
      autoDaily: els.autoDaily.checked
    });
    updateStatus();
    showMessage("Saved", "Settings were saved in this browser.");
  });
  els.forceUpdate.addEventListener("click", forceUpdateApp);
  els.hideIosInstall.addEventListener("click", () => els.iosInstallDialog.close());
  els.hideIosInstallForever.addEventListener("click", () => {
    localStorage.setItem(IOS_INSTALL_HIDE_KEY, "1");
    els.iosInstallDialog.close();
  });
  els.openSettingsFromKeyPrompt.addEventListener("click", () => {
    els.geminiKeyDialog.close();
    els.settingsDialog.showModal();
    els.geminiKey.focus();
  });

  els.generateToday.addEventListener("click", generateToday);
  els.generateExtra.addEventListener("click", generateExtraPassage);
  els.showMoreLibrary.addEventListener("click", () => {
    libraryVisibleCount += 5;
    renderLibrary();
  });
  els.refreshLibrary.addEventListener("click", () => refreshLibrary(todayIso()));
  els.loadDateButton.addEventListener("click", () => refreshLibrary(els.loadDate.value || todayIso()));
  els.questionForm.addEventListener("submit", submitAnswers);

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

async function forceUpdateApp() {
  els.forceUpdate.disabled = true;
  els.forceUpdate.textContent = "Updating...";
  try {
    if ("serviceWorker" in navigator) {
      const registrations = await navigator.serviceWorker.getRegistrations();
      await Promise.all(registrations.map((registration) => registration.unregister()));
    }
    if ("caches" in window) {
      const keys = await caches.keys();
      await Promise.all(keys.map((key) => caches.delete(key)));
    }
  } finally {
    window.location.href = `${window.location.pathname}?fresh=${Date.now()}`;
  }
}

function maybeShowIosInstallPrompt() {
  const isIos = /iPad|iPhone|iPod/.test(navigator.userAgent)
    || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
  const isStandalone = window.matchMedia("(display-mode: standalone)").matches || window.navigator.standalone;
  const hiddenThisSession = sessionStorage.getItem(IOS_INSTALL_HIDE_KEY) === "1";
  const hiddenForever = localStorage.getItem(IOS_INSTALL_HIDE_KEY) === "1";

  if (!isIos || isStandalone || hiddenThisSession || hiddenForever) return;
  window.setTimeout(() => {
    if (!els.iosInstallDialog.open) els.iosInstallDialog.showModal();
    sessionStorage.setItem(IOS_INSTALL_HIDE_KEY, "1");
  }, 700);
}

function maybeShowGeminiKeyPrompt() {
  const settings = loadSettings();
  if (settings.geminiKey) return;
  window.setTimeout(() => {
    if (!els.geminiKeyDialog.open && !els.iosInstallDialog.open) {
      els.geminiKeyDialog.showModal();
    }
  }, 1100);
}

function profileStatsSummary(profile) {
  const completedItems = Object.values(profile?.completed || {}).sort((a, b) =>
    String(b.completedAt || "").localeCompare(String(a.completedAt || ""))
  );
  const recent = completedItems.slice(0, 10);
  const earned = recent.reduce((sum, item) => sum + Number(item.score || 0), 0);
  const total = recent.reduce((sum, item) => sum + Number(item.total || 0), 0);
  return {
    accuracy: total ? Math.round((earned / total) * 100) : 0,
    count: recent.length,
    completed: completedItems.length
  };
}

function updateProfileUi() {
  const profile = loadProfile();
  const summary = profileStatsSummary(profile);
  els.profileButton.textContent = profile ? profile.name : "Profile";
  els.profileStatus.textContent = profile ? `${profile.name} · ${summary.completed} completed` : "Not signed in";
  els.profilePill.textContent = profile ? "Signed in" : "Guest";
  els.profileDetails.textContent = profile
    ? `${profile.name} · ${summary.accuracy}% accuracy across the last ${summary.count} passage${summary.count === 1 ? "" : "s"}.`
    : "Sign in to sync completed passages across devices.";
  els.loginProfile.hidden = Boolean(profile);
  els.createProfile.hidden = Boolean(profile);
  els.logoutProfile.hidden = !profile;
  els.profileName.value = profile?.name || "";
  els.profilePin.value = "";
}

function renderStats() {
  const profile = loadProfile();
  const summary = profileStatsSummary(profile);
  els.statsSummary.innerHTML = `
    <div class="stat"><strong>${summary.accuracy}%</strong><span>Last 10 accuracy</span></div>
    <div class="stat"><strong>${summary.completed}</strong><span>Completed</span></div>
  `;

  const completed = Object.values(profile?.completed || {});
  const days = [];
  const now = new Date();
  for (let i = 6; i >= 0; i -= 1) {
    const day = new Date(now);
    day.setDate(now.getDate() - i);
    const iso = day.toISOString().slice(0, 10);
    const items = completed.filter((item) => String(item.completedAt || "").slice(0, 10) === iso);
    const earned = items.reduce((sum, item) => sum + Number(item.score || 0), 0);
    const total = items.reduce((sum, item) => sum + Number(item.total || 0), 0);
    days.push({
      label: day.toLocaleDateString(undefined, { weekday: "short" }),
      accuracy: total ? Math.round((earned / total) * 100) : 0
    });
  }

  els.accuracyChart.innerHTML = days.map((day) => `
    <div class="barWrap">
      <div class="bar" style="height:${Math.max(4, day.accuracy)}%"></div>
      <div class="barValue">${day.accuracy}%</div>
      <div class="barLabel">${day.label}</div>
    </div>
  `).join("");
}

function renderLibrary() {
  const store = loadStore();
  els.library.innerHTML = "";

  if (!store.passages.length) {
    const empty = document.createElement("p");
    empty.className = "finePrint";
    empty.textContent = "No saved practice sets yet.";
    els.library.append(empty);
    els.showMoreLibrary.hidden = true;
    return;
  }

  const visible = store.passages.slice(0, libraryVisibleCount);
  visible.forEach((item) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `libraryItem${item.id === selectedId ? " active" : ""}`;
    button.innerHTML = `<strong></strong><span></span>`;
    button.querySelector("strong").textContent = item.title;
    const done = item.completed ? ` · Completed ${item.score ?? ""}/${item.questions.length}` : "";
    button.querySelector("span").textContent = `${item.date} · ${item.passageType} · ${item.questions.length} questions${done}`;
    button.addEventListener("click", () => selectPractice(item.id));
    els.library.append(button);
  });

  els.showMoreLibrary.hidden = store.passages.length <= libraryVisibleCount;
}

initSettings();
wireEvents();
renderLibrary();
if (loadStore().passages[0]) selectPractice(loadStore().passages[0].id);
registerServiceWorker().catch(() => {});
maybeShowIosInstallPrompt();
maybeShowGeminiKeyPrompt();
refreshLibrary().then(() => {
  const settings = loadSettings();
  const todayCount = loadStore().passages.filter((item) => item.date === todayIso()).length;
  if (!selectedId && loadStore().passages[0]) selectPractice(loadStore().passages[0].id);
  if (settings.autoDaily !== false && settings.geminiKey && todayCount < TODAY_COUNT) {
    generateToday();
  }
});
