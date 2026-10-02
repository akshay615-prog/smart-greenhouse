// ============================================================
// SMART GREENHOUSE AI - ON DEMAND ENCYCLOPEDIA
// ============================================================

const ENCYCLOPEDIA_DATA = [

    // =========================
    // CROPS
    // =========================

    {
        name: "Tomato",
        scientific: "Solanum lycopersicum",
        category: "crops",
        icon: "🍅",
        description:
            "A warm-season fruit crop widely grown under protected cultivation.",

        overview:
            "Tomato is one of the most important greenhouse crops. It requires stable temperature, adequate light, balanced irrigation, good airflow and proper nutrition. Greenhouse cultivation can provide better control over environmental conditions and crop production.",

        temperature: "20–28°C during the day; 16–20°C at night",
        humidity: "60–75%",
        light: "High light; approximately 6–8+ hours of strong light",
        water: "Regular irrigation with consistent soil moisture. Avoid waterlogging.",
        soil: "Well-drained, fertile soil rich in organic matter",
        ph: "5.8–6.8",

        nutrition: [
            "Nitrogen supports vegetative growth.",
            "Phosphorus supports root development and flowering.",
            "Potassium supports fruit development and quality.",
            "Calcium helps maintain healthy growing tissue and fruit quality.",
            "Magnesium is important for chlorophyll production."
        ],

        growth: [
            "Seed germination",
            "Seedling development",
            "Vegetative growth",
            "Flowering",
            "Fruit development",
            "Fruit ripening"
        ],

        pests: [
            "Aphids",
            "Whiteflies",
            "Thrips",
            "Spider mites",
            "Tomato hornworms"
        ],

        diseases: [
            "Early blight",
            "Late blight",
            "Powdery mildew",
            "Fusarium wilt",
            "Bacterial wilt",
            "Mosaic virus diseases"
        ],

        symptoms:
            "Yellowing leaves, curling leaves, weak growth, leaf spots, flower drop or abnormal fruit development may indicate environmental stress, pests or disease.",

        prevention: [
            "Maintain good airflow.",
            "Avoid excessive humidity.",
            "Inspect leaves regularly.",
            "Remove heavily infected plant material.",
            "Keep irrigation consistent.",
            "Maintain balanced nutrition.",
            "Control greenhouse pests early."
        ],

        greenhouse:
            "Tomatoes perform well in controlled greenhouse environments when temperature, humidity, irrigation, nutrition and pollination are carefully managed.",

        ai:
            "For image recognition, useful visual features include leaf shape, leaf spots, discoloration, fruit appearance, pest presence and overall plant structure."
    },

    {
        name: "Wheat",
        scientific: "Triticum aestivum",
        category: "crops",
        icon: "🌾",
        description:
            "A major cereal crop cultivated for grain production.",

        overview:
            "Wheat is primarily a field crop but can be studied in controlled agricultural environments for growth and disease research.",

        temperature: "Approximately 15–25°C depending on growth stage",
        humidity: "Moderate humidity",
        light: "Strong natural or artificial light",
        water: "Moderate and consistent moisture",
        soil: "Well-drained fertile soil",
        ph: "6.0–7.5",

        nutrition: [
            "Nitrogen supports leaf and biomass production.",
            "Phosphorus supports roots and early development.",
            "Potassium supports overall plant strength."
        ],

        growth: [
            "Germination",
            "Seedling growth",
            "Tillering",
            "Stem elongation",
            "Flowering",
            "Grain filling",
            "Maturity"
        ],

        pests: [
            "Aphids",
            "Armyworms",
            "Hessian fly"
        ],

        diseases: [
            "Rust diseases",
            "Powdery mildew",
            "Fusarium head blight"
        ],

        symptoms:
            "Yellowing, stunted growth, unusual spots or rust-colored structures may indicate stress, pest damage or disease.",

        prevention: [
            "Use healthy seed.",
            "Maintain appropriate irrigation.",
            "Monitor plants regularly.",
            "Control weeds and pests.",
            "Maintain balanced nutrition."
        ],

        greenhouse:
            "Controlled environments can be useful for wheat research, disease studies and growth experiments.",

        ai:
            "AI identification can examine leaf color, disease spots, growth structure and visible pest damage."
    },

    {
        name: "Rice",
        scientific: "Oryza sativa",
        category: "crops",
        icon: "🌾",
        description:
            "A major cereal crop and staple food crop grown in many regions.",

        overview:
            "Rice requires adequate water, nutrients, light and suitable temperature. Controlled environments can be used for research and early-stage cultivation studies.",

        temperature: "20–35°C depending on growth stage",
        humidity: "Moderate to high",
        light: "High light",
        water: "High water requirement compared with many dryland crops",
        soil: "Fertile soil with good nutrient availability",
        ph: "5.5–7.0",

        nutrition: [
            "Nitrogen supports vegetative growth.",
            "Phosphorus supports root development.",
            "Potassium improves plant strength and stress tolerance."
        ],

        growth: [
            "Germination",
            "Seedling establishment",
            "Tillering",
            "Panicle development",
            "Flowering",
            "Grain filling",
            "Maturity"
        ],

        pests: [
            "Rice planthoppers",
            "Stem borers",
            "Leaf folders"
        ],

        diseases: [
            "Rice blast",
            "Bacterial leaf blight",
            "Sheath blight"
        ],

        symptoms:
            "Leaf spots, discoloration, wilting, damaged stems and poor grain development can indicate pest or disease problems.",

        prevention: [
            "Monitor plants regularly.",
            "Maintain balanced fertilizer use.",
            "Use healthy planting material.",
            "Manage water appropriately.",
            "Remove severely affected material."
        ],

        greenhouse:
            "Greenhouse conditions can be used for controlled rice research and early plant development studies.",

        ai:
            "AI can analyze leaf lesions, discoloration, plant structure and visible insect damage."
    },

    {
        name: "Cucumber",
        scientific: "Cucumis sativus",
        category: "crops",
        icon: "🥒",
        description:
            "A warm-season vegetable commonly grown in protected cultivation.",

        overview:
            "Cucumber grows rapidly and performs well under warm greenhouse conditions. Consistent irrigation, humidity management, nutrition and airflow are important.",

        temperature: "21–29°C",
        humidity: "60–80%",
        light: "High light",
        water: "Frequent and consistent irrigation",
        soil: "Fertile, well-drained soil",
        ph: "5.5–7.0",

        nutrition: [
            "Nitrogen supports vegetative growth.",
            "Potassium supports fruit production.",
            "Calcium supports healthy tissues.",
            "Magnesium supports photosynthesis."
        ],

        growth: [
            "Germination",
            "Seedling growth",
            "Vine development",
            "Flowering",
            "Fruit development",
            "Harvest"
        ],

        pests: [
            "Aphids",
            "Whiteflies",
            "Spider mites",
            "Cucumber beetles",
            "Thrips"
        ],

        diseases: [
            "Powdery mildew",
            "Downy mildew",
            "Fusarium wilt",
            "Mosaic virus diseases"
        ],

        symptoms:
            "Yellow leaves, powdery growth, leaf spots, curling leaves and malformed fruit can indicate stress or disease.",

        prevention: [
            "Provide good ventilation.",
            "Avoid prolonged leaf wetness.",
            "Inspect leaves frequently.",
            "Control pests early.",
            "Maintain consistent irrigation."
        ],

        greenhouse:
            "Cucumber is well suited to greenhouse cultivation because environmental conditions can be controlled closely.",

        ai:
            "AI can examine leaf texture, spots, discoloration, pest presence and fruit shape."
    },

    // =========================
    // PESTS
    // =========================

    {
        name: "Aphid",
        scientific: "Aphidoidea",
        category: "insects",
        icon: "🐜",
        description:
            "A small sap-feeding insect that can weaken greenhouse plants.",

        overview:
            "Aphids are soft-bodied insects that feed on plant sap. They can reproduce rapidly under favorable conditions and may transmit plant viruses.",

        temperature: "Often increases rapidly under warm conditions",
        humidity: "Moderate conditions can support populations",
        light: "Not directly dependent on light",
        water: "Plant water stress can increase vulnerability",
        soil: "Not soil dependent",
        ph: "Not directly applicable",

        nutrition: [
            "Aphids feed on plant phloem rather than soil nutrients."
        ],

        growth: [
            "Egg or live birth depending on species",
            "Nymph",
            "Adult",
            "Rapid reproduction under favorable conditions"
        ],

        pests: [
            "Aphids themselves are the pest."
        ],

        diseases: [
            "Some aphid species can transmit plant viruses."
        ],

        symptoms:
            "Leaf curling, distorted new growth, sticky honeydew and reduced plant vigor may indicate aphid activity.",

        prevention: [
            "Inspect new growth regularly.",
            "Remove heavily infested leaves.",
            "Control weeds around the greenhouse.",
            "Use appropriate biological or integrated pest management methods."
        ],

        greenhouse:
            "Aphids can spread quickly in protected cultivation, so early detection is important.",

        ai:
            "AI can look for small insects clustered on young shoots, leaf curling and characteristic feeding damage."
    },

    {
        name: "Greenhouse Whitefly",
        scientific: "Trialeurodes vaporariorum",
        category: "insects",
        icon: "🦋",
        description:
            "A small sap-feeding pest commonly found in protected cultivation.",

        overview:
            "Whiteflies feed on plant sap and can weaken plants. Their populations can increase quickly in greenhouse environments.",

        temperature: "Warm conditions can favor population growth",
        humidity: "Moderate to high humidity may support populations",
        light: "Normal greenhouse light",
        water: "Maintain appropriate plant irrigation",
        soil: "Not soil dependent",
        ph: "Not directly applicable",

        nutrition: [
            "Whiteflies feed directly on plant tissues rather than soil nutrients."
        ],

        growth: [
            "Egg",
            "Nymph",
            "Pupa-like stage",
            "Adult"
        ],

        pests: [
            "Whitefly"
        ],

        diseases: [
            "Some whiteflies can transmit plant viruses."
        ],

        symptoms:
            "Yellowing leaves, sticky honeydew, reduced vigor and clouds of small white insects when foliage is disturbed.",

        prevention: [
            "Inspect the underside of leaves.",
            "Use insect monitoring traps where appropriate.",
            "Remove heavily infested plant material.",
            "Maintain greenhouse hygiene."
        ],

        greenhouse:
            "Whiteflies are particularly important greenhouse pests because their population can build rapidly.",

        ai:
            "AI can identify white insects on leaf undersides, yellowing and characteristic feeding damage."
    },

    {
        name: "Two-Spotted Spider Mite",
        scientific: "Tetranychus urticae",
        category: "insects",
        icon: "🕷️",
        description:
            "A tiny mite that feeds on plant cells and can cause leaf damage.",

        overview:
            "Spider mites are extremely small pests that can damage leaves by feeding on plant cells. Severe infestations can reduce photosynthesis and plant vigor.",

        temperature: "Warm and dry conditions can favor populations",
        humidity: "Low humidity often favors outbreaks",
        light: "Normal greenhouse light",
        water: "Avoid plant water stress",
        soil: "Not soil dependent",
        ph: "Not directly applicable",

        nutrition: [
            "Spider mites feed on plant cells rather than soil nutrients."
        ],

        growth: [
            "Egg",
            "Larval stage",
            "Nymphal stages",
            "Adult"
        ],

        pests: [
            "Two-spotted spider mite"
        ],

        diseases: [
            "Not a disease, but feeding damage can seriously weaken plants."
        ],

        symptoms:
            "Fine yellow or pale speckling on leaves, leaf bronzing and sometimes fine webbing.",

        prevention: [
            "Monitor leaves regularly.",
            "Pay special attention during hot, dry conditions.",
            "Maintain healthy irrigation.",
            "Use integrated pest management."
        ],

        greenhouse:
            "Spider mites can become a major problem in warm, dry greenhouse conditions.",

        ai:
            "AI can look for fine stippling, bronzing and webbing on leaves."
    },

    // =========================
    // DISEASES
    // =========================

    {
        name: "Powdery Mildew",
        scientific: "Multiple fungal species",
        category: "diseases",
        icon: "🍃",
        description:
            "A fungal disease characterized by powder-like growth on plant surfaces.",

        overview:
            "Powdery mildew produces white or gray powder-like fungal growth on leaves and other plant surfaces. It can reduce photosynthesis and plant vigor.",

        temperature: "Moderate temperatures can favor development",
        humidity: "High local humidity can encourage disease",
        light: "Good light and airflow can help reduce risk",
        water: "Avoid excessive moisture on foliage",
        soil: "Depends on host crop",
        ph: "Depends on host crop",

        nutrition: [
            "Maintain balanced crop nutrition.",
            "Avoid excessive nitrogen that encourages overly soft vegetative growth."
        ],

        growth: [
            "Spore landing",
            "Fungal establishment",
            "Visible powdery growth",
            "Spore production",
            "Spread"
        ],

        pests: [
            "Not an insect pest."
        ],

        diseases: [
            "Powdery mildew"
        ],

        symptoms:
            "White powder-like patches on leaves, stems or other plant surfaces.",

        prevention: [
            "Improve airflow.",
            "Avoid excessive humidity.",
            "Remove severely affected material.",
            "Monitor plants frequently."
        ],

        greenhouse:
            "Greenhouse airflow and humidity management are important for reducing powdery mildew risk.",

        ai:
            "AI image recognition can examine white powder-like patches and leaf discoloration."
    },

    // =========================
    // SOIL
    // =========================

    {
        name: "Soil pH",
        scientific: "Soil chemical property",
        category: "soil",
        icon: "🧪",
        description:
            "A measurement describing how acidic or alkaline the growing medium is.",

        overview:
            "Soil pH affects nutrient availability and root-zone conditions. Different crops perform best within different pH ranges.",

        temperature: "Not a temperature variable",
        humidity: "Not directly applicable",
        light: "Not directly applicable",
        water: "Water quality can influence root-zone pH",
        soil: "Directly measured in soil or growing media",
        ph: "Scale from acidic to alkaline",

        nutrition: [
            "Incorrect pH can reduce availability of certain nutrients.",
            "Maintaining crop-appropriate pH helps roots access nutrients."
        ],

        growth: [
            "Root development",
            "Nutrient uptake",
            "Vegetative growth",
            "Flowering and fruiting"
        ],

        pests: [
            "Not a pest."
        ],

        diseases: [
            "Poor root-zone conditions can increase plant stress."
        ],

        symptoms:
            "Nutrient deficiencies or poor growth can sometimes be associated with unsuitable root-zone pH.",

        prevention: [
            "Test the growing medium.",
            "Use appropriate amendments when required.",
            "Monitor pH regularly."
        ],

        greenhouse:
            "Regular pH monitoring is especially useful in greenhouse production where fertigation and controlled irrigation are used.",

        ai:
            "AI cannot reliably determine exact soil pH from an ordinary photograph alone. A sensor or laboratory test is more appropriate."
    }

];


// ============================================================
// ELEMENTS
// ============================================================

const encyclopediaSearch = document.getElementById("encyclopediaSearch");
const encyclopediaGrid = document.getElementById("encyclopediaGrid");
const encyclopediaEmpty = document.getElementById("encyclopediaEmpty");


// ============================================================
// INITIALIZE
// ============================================================

function initializeEncyclopedia() {

    if (!encyclopediaSearch) {
        console.warn("Encyclopedia search input not found.");
        return;
    }

    // Start empty.
    showSearchMessage();

    // Search while typing.
    encyclopediaSearch.addEventListener("input", handleEncyclopediaSearch);

    // Category buttons.
    document.querySelectorAll(".encyclopedia-filter").forEach(button => {

        button.addEventListener("click", () => {

            document.querySelectorAll(".encyclopedia-filter")
                .forEach(btn => btn.classList.remove("active"));

            button.classList.add("active");

            const category = button.dataset.category;

            searchEncyclopedia(
                encyclopediaSearch.value.trim(),
                category
            );
        });

    });

}


// ============================================================
// SEARCH
// ============================================================

function handleEncyclopediaSearch() {

    const query = encyclopediaSearch.value
        .trim()
        .toLowerCase();

    const activeButton =
        document.querySelector(".encyclopedia-filter.active");

    const category =
        activeButton?.dataset.category || "all";

    if (!query) {
        showSearchMessage();
        return;
    }

    searchEncyclopedia(query, category);
}


function searchEncyclopedia(query, category = "all") {

    if (!encyclopediaGrid) return;

    const results = ENCYCLOPEDIA_DATA.filter(item => {

        const matchesCategory =
            category === "all" ||
            item.category === category;

        const searchableText = `
            ${item.name}
            ${item.scientific}
            ${item.category}
            ${item.description}
        `.toLowerCase();

        return matchesCategory &&
            searchableText.includes(query.toLowerCase());
    });

    if (results.length === 0) {

        encyclopediaGrid.innerHTML = "";

        if (encyclopediaEmpty) {
            encyclopediaEmpty.style.display = "block";
            encyclopediaEmpty.innerHTML = `
                <div class="empty-icon">🔍</div>
                <h3>No information found</h3>
                <p>
                    Try searching for Tomato, Aphid, Whitefly,
                    Powdery Mildew or Soil pH.
                </p>
            `;
        }

        return;
    }

    if (encyclopediaEmpty) {
        encyclopediaEmpty.style.display = "none";
    }

    // Only show matching result.
    encyclopediaGrid.innerHTML =
        results.map(createSearchResultCard).join("");

    // Add click events.
    document.querySelectorAll(".encyclopedia-result-button")
        .forEach(button => {

            button.addEventListener("click", () => {

                const name = button.dataset.name;

                const item =
                    ENCYCLOPEDIA_DATA.find(
                        entry => entry.name === name
                    );

                if (item) {
                    openEncyclopediaDetails(item);
                }

            });

        });

}


// ============================================================
// SEARCH RESULT CARD
// ============================================================

function createSearchResultCard(item) {

    return `
        <article class="advanced-card search-result-card">

            <div class="advanced-card-icon">
                ${item.icon}
            </div>

            <span class="advanced-card-category">
                ${item.category.toUpperCase()}
            </span>

            <h3>${item.name}</h3>

            <p class="scientific-name">
                ${item.scientific}
            </p>

            <p class="advanced-card-description">
                ${item.description}
            </p>

            <button
                class="learn-button encyclopedia-result-button"
                data-name="${item.name}"
            >
                View Full Details →
            </button>

        </article>
    `;
}


// ============================================================
// EMPTY SEARCH STATE
// ============================================================

function showSearchMessage() {

    if (encyclopediaGrid) {
        encyclopediaGrid.innerHTML = "";
    }

    if (encyclopediaEmpty) {

        encyclopediaEmpty.style.display = "block";

        encyclopediaEmpty.innerHTML = `
            <div class="empty-icon">🌱</div>

            <h3>Search the Greenhouse Encyclopedia</h3>

            <p>
                Search for a crop, pest, disease or soil topic
                to view its complete information.
            </p>

            <div class="search-examples">
                <span>Try:</span>
                <button onclick="searchExample('Tomato')">
                    Tomato
                </button>

                <button onclick="searchExample('Aphid')">
                    Aphid
                </button>

                <button onclick="searchExample('Whitefly')">
                    Whitefly
                </button>

                <button onclick="searchExample('Powdery Mildew')">
                    Powdery Mildew
                </button>
            </div>
        `;
    }
}


function searchExample(name) {

    if (!encyclopediaSearch) return;

    encyclopediaSearch.value = name;

    handleEncyclopediaSearch();
}


// ============================================================
// FULL DETAILS MODAL
// ============================================================

function openEncyclopediaDetails(item) {

    closeEncyclopediaDetails();

    const modal = document.createElement("div");

    modal.id = "encyclopediaModal";

    modal.className = "encyclopedia-modal";

    modal.innerHTML = `
        <div class="encyclopedia-backdrop"
             onclick="closeEncyclopediaDetails()">
        </div>

        <div class="encyclopedia-modal-card">

            <button
                class="encyclopedia-close"
                onclick="closeEncyclopediaDetails()">
                ×
            </button>

            <div class="modal-icon">
                ${item.icon}
            </div>

            <span class="modal-category">
                ${item.category.toUpperCase()}
            </span>

            <h2>${item.name}</h2>

            <p class="modal-scientific">
                ${item.scientific}
            </p>

            <p class="modal-overview">
                ${item.overview}
            </p>

            ${conditionsSection(item)}

            ${detailSection(
                "🌱 Nutrition",
                createList(item.nutrition)
            )}

            ${detailSection(
                "🌿 Growth Stages",
                createList(item.growth)
            )}

            ${detailSection(
                "🐛 Common Pests",
                createList(item.pests)
            )}

            ${detailSection(
                "🦠 Diseases",
                createList(item.diseases)
            )}

            ${detailSection(
                "⚠️ Symptoms",
                `<p>${item.symptoms}</p>`
            )}

            ${detailSection(
                "🛡️ Prevention",
                createList(item.prevention)
            )}

            ${detailSection(
                "🏠 Greenhouse Guidance",
                `<p>${item.greenhouse}</p>`
            )}

            ${detailSection(
                "🤖 AI Identification",
                `<p>${item.ai}</p>`
            )}

        </div>
    `;

    document.body.appendChild(modal);

    document.body.style.overflow = "hidden";
}


function closeEncyclopediaDetails() {

    const modal =
        document.getElementById("encyclopediaModal");

    if (modal) {
        modal.remove();
    }

    document.body.style.overflow = "";
}


// ============================================================
// CONDITIONS
// ============================================================

function conditionsSection(item) {

    return `
        <section class="encyclopedia-detail-section">

            <h3>🌡️ Ideal Conditions</h3>

            <div class="condition-grid">

                <div class="condition-box">
                    <span>Temperature</span>
                    <strong>${item.temperature}</strong>
                </div>

                <div class="condition-box">
                    <span>Humidity</span>
                    <strong>${item.humidity}</strong>
                </div>

                <div class="condition-box">
                    <span>Light</span>
                    <strong>${item.light}</strong>
                </div>

                <div class="condition-box">
                    <span>Water</span>
                    <strong>${item.water}</strong>
                </div>

                <div class="condition-box">
                    <span>Soil</span>
                    <strong>${item.soil}</strong>
                </div>

                <div class="condition-box">
                    <span>pH</span>
                    <strong>${item.ph}</strong>
                </div>

            </div>

        </section>
    `;
}


// ============================================================
// DETAIL SECTION
// ============================================================

function detailSection(title, content) {

    return `
        <section class="encyclopedia-detail-section">

            <h3>${title}</h3>

            ${content}

        </section>
    `;
}


// ============================================================
// LIST CREATOR
// ============================================================

function createList(items) {

    if (!Array.isArray(items)) {
        return items;
    }

    return `
        <ul class="detail-list">

            ${items.map(item => `
                <li>${item}</li>
            `).join("")}

        </ul>
    `;
}


// ============================================================
// ESCAPE HTML
// ============================================================

function escapeHTML(value) {

    return String(value ?? "")
        .replace(/[&<>"']/g, character => {

            const entities = {
                "&": "&amp;",
                "<": "&lt;",
                ">": "&gt;",
                '"': "&quot;",
                "'": "&#039;"
            };

            return entities[character];

        });
}


// ============================================================
// START
// ============================================================

document.addEventListener(
    "DOMContentLoaded",
    initializeEncyclopedia
);