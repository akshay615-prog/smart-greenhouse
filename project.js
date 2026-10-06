"use strict";

const API_URL = "http://127.0.0.1:8000/predict";
const $ = id => document.getElementById(id);
const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));

// ---------- DATA ----------
const crops = [
  {cat:"crop",emoji:"🍅",name:"Tomato",sci:"Solanum lycopersicum",match:"lycopersicum",min:18,max:30,lo:20,hi:27,type:"Vegetable crop",
   about:"Tomato is a widely grown vegetable used fresh and in sauces, soups and ketchup.",temp:"20–27°C",water:"Keep soil evenly moist; avoid waterlogging.",sun:"6–8 hours daily",soil:"Well-drained, fertile, rich in organic matter.",days:"60–100 days",uses:"Salads, cooking, sauces, soups.",problems:"Late blight, early blight, leaf spots, aphids, whiteflies."},
  {cat:"crop",emoji:"🫑",name:"Bell Pepper",sci:"Capsicum annuum",match:"capsicum annuum",min:18,max:32,lo:21,hi:29,type:"Vegetable crop",
   about:"Bell pepper is a vegetable available in green, red, yellow and other colors. The same species also includes many chilli peppers.",temp:"21–29°C",water:"Water regularly; avoid soggy soil.",sun:"6–8 hours daily",soil:"Fertile, well-drained, organic-rich.",days:"60–90 days after transplanting",uses:"Curries, salads, stir-fries, stuffed dishes.",problems:"Aphids, whiteflies, leaf spots, bacterial diseases."},
  {cat:"crop",emoji:"🥔",name:"Potato",sci:"Solanum tuberosum",match:"tuberosum",min:10,max:25,lo:15,hi:20,type:"Tuber crop",
   about:"Potato is an important food crop grown for its underground tubers.",temp:"15–20°C",water:"Regular moisture; no waterlogging.",sun:"Good sunlight",soil:"Loose, fertile, well-drained.",days:"70–120 days",uses:"Fries, chips, curries, mashed potato.",problems:"Late blight, early blight, potato beetles, tuber diseases."},
  {cat:"crop",emoji:"🥒",name:"Cucumber",sci:"Cucumis sativus",match:"cucumis sativus",min:18,max:32,lo:21,hi:30,type:"Vegetable crop",
   about:"Cucumber is a fast-growing vegetable eaten fresh or pickled.",temp:"21–30°C",water:"Consistent watering, especially during fruiting.",sun:"6–8 hours daily",soil:"Rich, loose, well-drained.",days:"50–70 days",uses:"Salads, pickles, sandwiches, juices.",problems:"Powdery mildew, downy mildew, aphids, cucumber beetles."},
  {cat:"crop",emoji:"🍆",name:"Eggplant (Brinjal)",sci:"Solanum melongena",match:"melongena",min:20,max:35,lo:24,hi:30,type:"Vegetable crop",
   about:"Eggplant, also called brinjal or aubergine, is a warm-season vegetable.",temp:"24–30°C",water:"Keep soil moist; avoid waterlogging.",sun:"6–8 hours daily",soil:"Fertile, well-drained, organic-rich.",days:"60–100 days",uses:"Curries, roasted dishes, bharta, fries.",problems:"Aphids, whiteflies, mites, bacterial wilt."},
  {cat:"crop",emoji:"🌾",name:"Wheat",sci:"Triticum aestivum",match:"triticum",min:10,max:25,lo:15,hi:22,type:"Cereal crop",
   about:"Wheat is one of the world's most important cereals, grown mainly for its grain.",temp:"15–22°C",water:"Adequate moisture at key growth stages.",sun:"Good sunlight",soil:"Fertile, well-drained loam.",days:"120–150 days",uses:"Flour, bread, roti, biscuits, pasta.",problems:"Rust diseases, powdery mildew, aphids."},
  {cat:"crop",emoji:"🍚",name:"Rice",sci:"Oryza sativa",match:"oryza sativa",min:20,max:35,lo:25,hi:32,type:"Cereal crop",
   about:"Rice is a major cereal and a staple food for billions of people.",temp:"25–32°C",water:"Needs plenty of water through most stages.",sun:"Good sunlight",soil:"Clay or loam that holds moisture.",days:"100–150 days",uses:"Cooked rice, rice flour, snacks, cereals.",problems:"Blast disease, bacterial diseases, stem borers, weeds."}
];
const others = [
  {cat:"insect",emoji:"🐛",name:"Aphids",about:"Tiny sap-sucking insects that cluster on new growth, curl leaves and spread plant viruses. Control with water sprays, neem oil, or ladybird beetles."},
  {cat:"insect",emoji:"🦟",name:"Whiteflies",about:"Small white flying insects found under leaves. They weaken plants and leave sticky honeydew. Use yellow sticky traps and keep leaves inspected."},
  {cat:"disease",emoji:"🍂",name:"Late blight",about:"A fungus-like disease causing dark, water-soaked patches on leaves and fruit, spreading fast in cool, humid weather. Improve airflow and avoid wet leaves."},
  {cat:"disease",emoji:"🌫️",name:"Powdery mildew",about:"A white powdery coating on leaves, common in warm days with humid nights. Increase ventilation and remove badly affected leaves."},
  {cat:"soil",emoji:"🟤",name:"Loamy soil",about:"A balanced mix of sand, silt and clay that drains well yet holds moisture and nutrients. Suitable for most greenhouse crops."},
  {cat:"soil",emoji:"🧱",name:"Clay soil",about:"Dense soil that holds water and nutrients but drains slowly. Mix in compost and sand to improve drainage and avoid waterlogging."}
];
const encyclopedia = [...crops, ...others];

// ---------- DETAIL HTML ----------
function detailHTML(i) {
  const fields = [["🌡 Temperature",i.temp],["💧 Water",i.water],["☀️ Sunlight",i.sun],["🌱 Soil",i.soil],["⏱ Growing period",i.days],["🍽 Common uses",i.uses]]
    .filter(f => f[1]).map(f => `<div class="detail-item"><span>${f[0]}</span><strong>${esc(f[1])}</strong></div>`).join("");
  return `<h2>${i.emoji || "🌿"} ${esc(i.name)}</h2>
    ${i.sci ? `<p style="color:var(--green);font-style:italic">${esc(i.sci)}</p>` : ""}
    <p style="color:var(--soft);margin-top:10px" class="about-text">${esc(i.about)}</p>
    ${fields ? `<div class="detail-grid">${fields}</div>` : ""}
    ${i.problems ? `<div class="detail-warn">⚠️ <strong>Common problems:</strong> ${esc(i.problems)}</div>` : ""}`;
}
function openModal(item) {
  $("modalBody").innerHTML = detailHTML(item);
  $("modal").classList.remove("hidden");
  document.body.style.overflow = "hidden";
}
function closeModal() {
  $("modal").classList.add("hidden");
  document.body.style.overflow = "";
}

// ---------- DASHBOARD ----------
const greenhouse = {temperature: 24, humidity: 70, soilMoisture: 80, waterTemperature: 22};
let outdoor = {temperature: null, humidity: null};
const drift = (v, step, lo, hi) => Math.min(hi, Math.max(lo, Math.round(v + (Math.random() * 2 - 1) * step)));

function updateDashboard() {
  const g = greenhouse;
  const set = (id, text, pct) => { $(id + "Value").textContent = text; $(id + "Progress").style.width = Math.max(0, Math.min(100, pct)) + "%"; };
  set("temperature", g.temperature + "°C", g.temperature / 50 * 100);
  set("humidity", g.humidity + "%", g.humidity);
  set("soilMoisture", g.soilMoisture + "%", g.soilMoisture);
  set("waterTemperature", g.waterTemperature + "°C", g.waterTemperature / 40 * 100);

  $("cropSuitabilityGrid").innerHTML = crops.map(c => {
    const t = g.temperature;
    const [cls, label] = t >= c.lo && t <= c.hi ? ["good", "Ideal"] : t >= c.min && t <= c.max ? ["ok", "Acceptable"] : ["bad", "Unsuitable"];
    return `<div class="crop-chip ${cls}">${c.emoji} ${esc(c.name)}<strong>${label}</strong><small>Ideal ${c.lo}–${c.hi}°C</small></div>`;
  }).join("");

  const alerts = [];
  if (g.temperature >= 30) alerts.push("🌡️ Greenhouse is hot (" + g.temperature + "°C). Open vents or turn on the fan.");
  if (g.temperature < 16) alerts.push("❄️ Greenhouse is cold (" + g.temperature + "°C). Consider heating.");
  if (g.humidity > 85) alerts.push("💧 Humidity is high. Increase airflow to prevent fungal disease.");
  if (g.humidity < 40) alerts.push("🏜️ Humidity is low. Mist the air or reduce ventilation.");
  if (g.soilMoisture <= 30) alerts.push("🌱 Soil is dry. Start irrigation.");
  if (g.soilMoisture >= 90) alerts.push("🌊 Soil is waterlogged. Pause watering and check drainage.");
  if (outdoor.temperature !== null && outdoor.temperature - g.temperature > 8) alerts.push("☀️ It is much hotter outside than inside. Watch for heat build-up.");
  $("environmentAlerts").innerHTML = alerts.length
    ? alerts.map(a => `<div class="alert">${a}</div>`).join("")
    : `<div class="alert ok">✅ All greenhouse conditions are normal.</div>`;
}
function initDashboard() {
  updateDashboard();
  setInterval(() => {
    greenhouse.temperature = drift(greenhouse.temperature, 1, 12, 40);
    greenhouse.humidity = drift(greenhouse.humidity, 3, 25, 95);
    greenhouse.soilMoisture = drift(greenhouse.soilMoisture, 4, 10, 98);
    greenhouse.waterTemperature = drift(greenhouse.waterTemperature, 1, 15, 32);
    updateDashboard();
  }, 4000);
}

// ---------- WEATHER ----------
function loadWeather() {
  if (!navigator.geolocation) { $("weatherLocation").textContent = "Location not supported"; return; }
  navigator.geolocation.getCurrentPosition(async pos => {
    try {
      const {latitude, longitude} = pos.coords;
      const r = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m&timezone=auto`);
      if (!r.ok) throw new Error();
      const c = (await r.json()).current;
      outdoor.temperature = Math.round(c.temperature_2m);
      outdoor.humidity = Math.round(c.relative_humidity_2m);
      $("weatherTemperature").textContent = outdoor.temperature + "°C";
      $("weatherHumidity").textContent = "Humidity: " + outdoor.humidity + "%";
      $("weatherLocation").textContent = "Your current location";
      updateDashboard();
    } catch { $("weatherLocation").textContent = "Weather unavailable"; }
  }, () => { $("weatherLocation").textContent = "Allow location access for live weather"; },
  {timeout: 10000, maximumAge: 300000});
}

// ---------- ENCYCLOPEDIA ----------
function initEncyclopedia() {
  const grid = $("encyclopediaGrid"), search = $("encyclopediaSearch");
  let category = "all";
  function render() {
    const q = search.value.toLowerCase().trim();
    const list = encyclopedia.filter(i => (category === "all" || i.cat === category) &&
      (i.name + " " + (i.sci || "") + " " + i.about).toLowerCase().includes(q));
    grid.innerHTML = list.map((i, n) => `<button type="button" class="knowledge-card" data-i="${encyclopedia.indexOf(i)}">
      <div class="emoji">${i.emoji}</div><h3>${esc(i.name)}</h3><p>${esc(i.about)}</p></button>`).join("");
    $("encyclopediaEmpty").style.display = list.length ? "none" : "block";
  }
  search.addEventListener("input", render);
  document.querySelectorAll(".category-button").forEach(b => b.addEventListener("click", () => {
    document.querySelectorAll(".category-button").forEach(x => x.classList.remove("active"));
    b.classList.add("active");
    category = b.dataset.category;
    render();
  }));
  grid.addEventListener("click", e => {
    const card = e.target.closest(".knowledge-card");
    if (card) openModal(encyclopedia[card.dataset.i]);
  });
  $("modalClose").addEventListener("click", closeModal);
  $("modal").addEventListener("click", e => { if (e.target.id === "modal") closeModal(); });
  document.addEventListener("keydown", e => { if (e.key === "Escape") closeModal(); });
  render();
}

// ---------- SCANNER ----------
let selectedFile = null, previewURL = null, currentItem = null;

function setFile(file) {
  if (!file) return;
  if (!file.type.startsWith("image/")) { alert("Please choose an image file (JPG, PNG or WebP)."); return; }
  if (file.size > 10 * 1024 * 1024) { alert("Image is larger than 10 MB. Please choose a smaller one."); return; }
  selectedFile = file;
  if (previewURL) URL.revokeObjectURL(previewURL);
  previewURL = URL.createObjectURL(file);
  $("imagePreview").src = previewURL;
  $("uploadPlaceholder").style.display = "none";
  $("imagePreviewContainer").style.display = "block";
  $("analyzeBtn").disabled = false;
  resetResult();
}
function clearFile() {
  selectedFile = null;
  if (previewURL) URL.revokeObjectURL(previewURL);
  previewURL = null;
  $("imageInput").value = "";
  $("imagePreview").src = "";
  $("imagePreviewContainer").style.display = "none";
  $("uploadPlaceholder").style.display = "";
  $("analyzeBtn").disabled = true;
  resetResult();
}
function resetResult() {
  $("emptyResult").style.display = "";
  $("analysisResult").style.display = "none";
  currentItem = null;
}

function findCrop(sci) {
  const s = String(sci || "").toLowerCase();
  return crops.find(c => s.includes(c.match));
}
async function wikiSummary(sci) {
  try {
    const r = await fetch("https://en.wikipedia.org/api/rest_v1/page/summary/" + encodeURIComponent(sci.trim().replace(/\s+/g, "_")));
    if (!r.ok) throw new Error();
    return (await r.json()).extract || null;
  } catch { return null; }
}

async function analyze() {
  if (!selectedFile) { alert("Please upload an image first."); return; }
  const btn = $("analyzeBtn");
  btn.disabled = true;
  btn.textContent = "Analyzing…";
  try {
    const form = new FormData();
    form.append("file", selectedFile);
    let res;
    try { res = await fetch(API_URL, {method: "POST", body: form}); }
    catch { throw new Error("Cannot reach the AI server. Start it with: uvicorn main:app --reload (in the backend folder)."); }
    let data;
    try { data = await res.json(); } catch { throw new Error("The server returned an invalid response."); }
    if (!res.ok) {
      const d = data.detail;
      const msg = typeof d === "string" ? d : (d && d.message) || "";
      if (res.status === 404) throw new Error("No plant recognised. Try a clearer, closer photo of a leaf, fruit or flower.");
      if (res.status === 429) throw new Error("Daily Pl@ntNet request limit reached. Try again tomorrow.");
      if (res.status === 401 || res.status === 403) throw new Error("Pl@ntNet API key is missing or invalid.");
      throw new Error(msg || "AI analysis failed (status " + res.status + ").");
    }
    await showResult(data);
  } catch (err) {
    alert(err.message);
  } finally {
    btn.disabled = false;
    btn.textContent = "Analyze image";
  }
}

async function showResult(data) {
  const top = data.results && data.results[0];
  if (!top) throw new Error("No plant recognised. Try a clearer photo.");
  const species = top.species || {};
  const sci = species.scientificNameWithoutAuthor || data.bestMatch || "Unknown plant";
  const known = findCrop(sci);
  const commonNames = species.commonNames || [];

  const item = known || {
    emoji: "🌿",
    name: commonNames[0] || sci,
    sci,
    type: "Plant",
    about: "Loading description…",
    problems: ""
  };
  currentItem = item;

  const pct = Math.round((top.score || 0) * 1000) / 10;
  const strength = pct >= 80 ? "Strong match" : pct >= 50 ? "Possible match" : "Low confidence";

  $("identifiedName").textContent = item.name;
  $("confidenceValue").textContent = pct.toFixed(1) + "%";
  $("confidenceProgress").style.width = Math.min(pct, 100) + "%";
  $("resultType").textContent = item.type;
  $("resultRisk").textContent = strength;
  $("analysisStatus").textContent = "Analysis complete";

  const family = species.family && species.family.scientificNameWithoutAuthor;
  const others = commonNames.slice(1, 4).join(", ");
  $("resultDescription").innerHTML =
    (others ? `<p>Also called: ${esc(others)}</p>` : "") +
    (family && !known ? `<p>Plant family: ${esc(family)}</p>` : "") +
    (pct < 50 ? `<p>⚠️ Confidence is low. Try a clearer photo of one leaf, fruit or flower.</p>` : "") +
    detailHTML(item);

  $("emptyResult").style.display = "none";
  $("analysisResult").style.display = "block";
  $("analysisResult").scrollIntoView({behavior: "smooth", block: "nearest"});

  if (!known) {
    const text = await wikiSummary(sci);
    item.about = text || "No detailed description is available for this plant yet.";
    const el = $("resultDescription").querySelector(".about-text");
    if (el) el.textContent = item.about;
  }
}

function initScanner() {
  const input = $("imageInput"), area = $("uploadArea");
  $("uploadButton").addEventListener("click", e => { e.stopPropagation(); input.click(); });
  area.addEventListener("click", e => {
    if (selectedFile || e.target.closest("button")) return;
    input.click();
  });
  input.addEventListener("change", () => setFile(input.files[0]));
  $("removeImage").addEventListener("click", e => { e.stopPropagation(); clearFile(); });
  $("analyzeBtn").addEventListener("click", analyze);
  ["dragenter", "dragover"].forEach(ev => area.addEventListener(ev, e => { e.preventDefault(); area.classList.add("drag"); }));
  ["dragleave", "drop"].forEach(ev => area.addEventListener(ev, e => { e.preventDefault(); area.classList.remove("drag"); }));
  area.addEventListener("drop", e => setFile(e.dataTransfer.files[0]));
  $("learnResult").addEventListener("click", () => { if (currentItem) openModal(currentItem); });
}

// ---------- START ----------
document.addEventListener("DOMContentLoaded", () => {
  initDashboard();
  initEncyclopedia();
  initScanner();
  loadWeather();
});