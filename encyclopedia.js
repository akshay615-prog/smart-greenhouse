// ============================================================
// SMART GREENHOUSE AI
// ENCYCLOPEDIA JAVASCRIPT
// ============================================================

"use strict";
// ============================================================
// CROP DATABASE
// ============================================================

const cropDatabase = {
    tomato: {
        name: "Tomato",
        scientificName: "Solanum lycopersicum",
        emoji: "🍅",
        category: "Vegetable / Fruit",
        description:
            "Tomato is a warm-season crop commonly grown in greenhouses and open fields. It requires good sunlight, controlled temperature, regular watering, and nutrient-rich soil.",

        temperature: "18°C – 27°C",
        humidity: "60% – 70%",
        soilMoisture: "60% – 80%",
        sunlight: "6 – 8 hours/day",
        waterRequirement: "Moderate",
        growthTime: "60 – 100 days",

        soil:
            "Well-drained, fertile soil rich in organic matter. Slightly acidic to neutral soil is preferred.",

        watering:
            "Water regularly while avoiding waterlogging. Keep soil moisture relatively consistent.",

        nutrients:
            "Tomatoes benefit from nitrogen during early growth and phosphorus and potassium during flowering and fruit development.",

        commonProblems: [
            "Late blight",
            "Early blight",
            "Powdery mildew",
            "Bacterial spot",
            "Aphids",
            "Whiteflies"
        ],

        tips: [
            "Provide strong sunlight.",
            "Avoid excessive watering.",
            "Provide support for growing plants.",
            "Maintain good airflow between plants.",
            "Monitor leaves regularly for pests and diseases."
        ]
    },

    pepper: {
        name: "Pepper",
        scientificName: "Capsicum annuum",
        emoji: "🌶️",
        category: "Vegetable",

        description:
            "Pepper is a warm-season crop that grows well under controlled greenhouse conditions. Stable temperature, adequate sunlight, and balanced nutrients help produce healthy fruits.",

        temperature: "21°C – 29°C",
        humidity: "60% – 70%",
        soilMoisture: "55% – 75%",
        sunlight: "6 – 8 hours/day",
        waterRequirement: "Moderate",
        growthTime: "60 – 90 days",

        soil:
            "Loose, fertile, well-drained soil with plenty of organic matter is ideal.",

        watering:
            "Keep the soil evenly moist but avoid excessive water around the roots.",

        nutrients:
            "Balanced fertilizer is useful during vegetative growth, followed by increased phosphorus and potassium during flowering and fruit production.",

        commonProblems: [
            "Bacterial spot",
            "Phytophthora blight",
            "Powdery mildew",
            "Aphids",
            "Thrips",
            "Spider mites"
        ],

        tips: [
            "Maintain stable greenhouse temperature.",
            "Avoid waterlogging.",
            "Provide sufficient sunlight.",
            "Inspect the underside of leaves for pests.",
            "Maintain good ventilation."
        ]
    },

    potato: {
        name: "Potato",
        scientificName: "Solanum tuberosum",
        emoji: "🥔",
        category: "Tuber Crop",

        description:
            "Potato is a cool-season crop grown for its underground tubers. Proper soil moisture, temperature, drainage, and nutrient management are important for good tuber development.",

        temperature: "15°C – 21°C",
        humidity: "70% – 80%",
        soilMoisture: "60% – 75%",
        sunlight: "6 – 8 hours/day",
        waterRequirement: "Moderate",
        growthTime: "70 – 120 days",

        soil:
            "Loose, well-drained soil is preferred because compact or waterlogged soil can affect tuber development.",

        watering:
            "Maintain consistent soil moisture, especially during tuber formation. Avoid excessive irrigation.",

        nutrients:
            "Potatoes require balanced nutrients, particularly potassium for healthy tuber development.",

        commonProblems: [
            "Late blight",
            "Early blight",
            "Common scab",
            "Potato beetles",
            "Aphids",
            "Wireworms"
        ],

        tips: [
            "Use loose and well-drained soil.",
            "Avoid excessive irrigation.",
            "Monitor plants for fungal diseases.",
            "Maintain suitable soil moisture during tuber formation.",
            "Rotate crops when possible."
        ]
    }
};

// ============================================================
// DOM ELEMENTS
// ============================================================

let encyclopediaModal = null;
let encyclopediaContent = null;

// ============================================================
// INITIALIZE ENCYCLOPEDIA
// ============================================================

document.addEventListener("DOMContentLoaded", () => {
    initializeEncyclopedia();
});

function initializeEncyclopedia() {

    findExistingElements();

    setupEncyclopediaButtons();

    setupSearch();

    setupCloseButtons();

    console.log("Encyclopedia initialized successfully.");
}

// ============================================================
// FIND EXISTING HTML ELEMENTS
// ============================================================

function findExistingElements() {

    encyclopediaModal =
        document.getElementById("encyclopediaModal") ||
        document.querySelector(".encyclopedia-modal");

    encyclopediaContent =
        document.getElementById("encyclopediaContent") ||
        document.querySelector(".encyclopedia-content");

    // If modal doesn't exist, create one automatically.
    if (!encyclopediaModal) {
        createEncyclopediaModal();
    }
}

// ============================================================
// CREATE MODAL IF NOT PRESENT
// ============================================================

function createEncyclopediaModal() {

    const modal = document.createElement("div");

    modal.id = "encyclopediaModal";

    modal.innerHTML = `
        <div class="encyclopedia-overlay"></div>

        <div class="encyclopedia-window">

            <button
                class="encyclopedia-close"
                id="encyclopediaClose"
                aria-label="Close encyclopedia"
            >
                ×
            </button>

            <div id="encyclopediaContent"></div>

        </div>
    `;

    document.body.appendChild(modal);

    encyclopediaModal = modal;

    encyclopediaContent =
        document.getElementById("encyclopediaContent");

    addGeneratedModalStyles();
}

// ============================================================
// GENERATED MODAL STYLES
// ============================================================

function addGeneratedModalStyles() {

    if (document.getElementById("generatedEncyclopediaStyles")) {
        return;
    }

    const style = document.createElement("style");

    style.id = "generatedEncyclopediaStyles";

    style.textContent = `
        #encyclopediaModal {
            position: fixed;
            inset: 0;
            z-index: 9999;
            display: none;
            align-items: center;
            justify-content: center;
            padding: 20px;
        }

        #encyclopediaModal.active {
            display: flex;
        }

        .encyclopedia-overlay {
            position: absolute;
            inset: 0;
            background: rgba(3, 7, 18, 0.82);
            backdrop-filter: blur(10px);
        }

        .encyclopedia-window {
            position: relative;
            width: min(900px, 95vw);
            max-height: 90vh;
            overflow-y: auto;
            padding: 30px;
            border-radius: 24px;
            background: #0b1220;
            border: 1px solid rgba(255,255,255,0.1);
            box-shadow: 0 25px 80px rgba(0,0,0,0.5);
            color: #fff;
        }

        .encyclopedia-close {
            position: absolute;
            top: 15px;
            right: 18px;
            width: 38px;
            height: 38px;
            border: none;
            border-radius: 50%;
            background: rgba(255,255,255,0.08);
            color: #fff;
            font-size: 25px;
            cursor: pointer;
        }

        .encyclopedia-close:hover {
            background: rgba(255,255,255,0.15);
        }

        .encyclopedia-header {
            display: flex;
            gap: 18px;
            align-items: center;
            margin-bottom: 25px;
        }

        .crop-emoji {
            font-size: 55px;
        }

        .encyclopedia-header h2 {
            margin: 0;
            font-size: 32px;
        }

        .scientific-name {
            margin-top: 5px;
            color: #9ca3af;
            font-style: italic;
        }

        .crop-description {
            color: #cbd5e1;
            line-height: 1.7;
            margin-bottom: 25px;
        }

        .crop-stats {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 12px;
            margin-bottom: 25px;
        }

        .crop-stat {
            padding: 16px;
            border-radius: 15px;
            background: rgba(255,255,255,0.05);
            border: 1px solid rgba(255,255,255,0.07);
        }

        .crop-stat-label {
            display: block;
            color: #94a3b8;
            font-size: 13px;
            margin-bottom: 6px;
        }

        .crop-stat-value {
            font-size: 16px;
            font-weight: 600;
        }

        .encyclopedia-section {
            margin-top: 22px;
        }

        .encyclopedia-section h3 {
            margin-bottom: 10px;
        }

        .encyclopedia-section p {
            color: #cbd5e1;
            line-height: 1.7;
        }

        .encyclopedia-list {
            padding-left: 20px;
            color: #cbd5e1;
            line-height: 1.8;
        }

        .encyclopedia-search {
            width: 100%;
            box-sizing: border-box;
            padding: 13px 16px;
            margin-bottom: 20px;
            border-radius: 12px;
            border: 1px solid rgba(255,255,255,0.1);
            background: rgba(255,255,255,0.05);
            color: #fff;
            outline: none;
        }

        .encyclopedia-search::placeholder {
            color: #94a3b8;
        }

        .crop-card-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 16px;
        }

        .crop-card {
            padding: 20px;
            border-radius: 18px;
            background: rgba(255,255,255,0.05);
            border: 1px solid rgba(255,255,255,0.08);
            cursor: pointer;
            transition: 0.25s ease;
        }

        .crop-card:hover {
            transform: translateY(-4px);
            background: rgba(255,255,255,0.08);
        }

        .crop-card-icon {
            font-size: 40px;
            margin-bottom: 10px;
        }

        .crop-card h3 {
            margin: 0 0 6px;
        }

        .crop-card p {
            margin: 0;
            color: #94a3b8;
            font-size: 14px;
        }

        @media (max-width: 700px) {

            .crop-stats {
                grid-template-columns: repeat(2, 1fr);
            }

            .crop-card-grid {
                grid-template-columns: 1fr;
            }

            .encyclopedia-window {
                padding: 22px;
            }

            .encyclopedia-header h2 {
                font-size: 26px;
            }
        }
    `;

    document.head.appendChild(style);
}

// ============================================================
// ENCYCLOPEDIA BUTTONS
// ============================================================

function setupEncyclopediaButtons() {

    const buttons = document.querySelectorAll(
        "[data-encyclopedia], " +
        ".encyclopedia-btn, " +
        "#encyclopediaBtn, " +
        "#openEncyclopedia"
    );

    buttons.forEach(button => {

        button.addEventListener("click", event => {

            event.preventDefault();

            const crop =
                button.dataset.encyclopedia ||
                button.dataset.crop ||
                "";

            if (crop) {
                showCrop(crop);
            } else {
                openEncyclopedia();
            }
        });
    });
}

// ============================================================
// SEARCH
// ============================================================

function setupSearch() {

    const searchInput = document.getElementById("encyclopediaSearch");

    if (!searchInput) {
        return;
    }

    searchInput.addEventListener("input", () => {

        const query =
            searchInput.value
                .trim()
                .toLowerCase();

        const cards =
            document.querySelectorAll(".crop-card");

        cards.forEach(card => {

            const text =
                card.textContent.toLowerCase();

            card.style.display =
                text.includes(query)
                    ? ""
                    : "none";
        });
    });
}

// ============================================================
// OPEN ENCYCLOPEDIA
// ============================================================

function openEncyclopedia() {

    if (!encyclopediaModal) {
        createEncyclopediaModal();
    }

    renderCropList();

    encyclopediaModal.classList.add("active");

    document.body.style.overflow = "hidden";
}

// ============================================================
// CLOSE ENCYCLOPEDIA
// ============================================================

function closeEncyclopedia() {

    if (!encyclopediaModal) {
        return;
    }

    encyclopediaModal.classList.remove("active");

    document.body.style.overflow = "";
}

// ============================================================
// CLOSE BUTTONS
// ============================================================

function setupCloseButtons() {

    document.addEventListener("click", event => {

        if (
            event.target.id === "encyclopediaClose" ||
            event.target.classList.contains("encyclopedia-overlay")
        ) {
            closeEncyclopedia();
        }
    });

    document.addEventListener("keydown", event => {

        if (event.key === "Escape") {
            closeEncyclopedia();
        }
    });
}

// ============================================================
// RENDER CROP LIST
// ============================================================

function renderCropList() {

    if (!encyclopediaContent) {
        return;
    }

    encyclopediaContent.innerHTML = `

        <div class="encyclopedia-header">
            <div class="crop-emoji">🌱</div>

            <div>
                <h2>Plant Encyclopedia</h2>
                <p class="scientific-name">
                    Smart Greenhouse AI Knowledge Base
                </p>
            </div>
        </div>

        <input
            type="text"
            id="encyclopediaSearch"
            class="encyclopedia-search"
            placeholder="Search for a crop..."
        >

        <div class="crop-card-grid">

            ${Object.entries(cropDatabase)
                .map(([key, crop]) => `

                    <div
                        class="crop-card"
                        data-crop="${key}"
                        onclick="showCrop('${key}')"
                    >

                        <div class="crop-card-icon">
                            ${crop.emoji}
                        </div>

                        <h3>${crop.name}</h3>

                        <p>
                            ${crop.scientificName}
                        </p>

                    </div>

                `)
                .join("")}

        </div>
    `;

    setupSearch();
}

// ============================================================
// SHOW SPECIFIC CROP
// ============================================================

function showCrop(cropName) {

    const key =
        String(cropName)
            .toLowerCase()
            .trim()
            .replace(/\s+/g, "_");

    const crop =
        cropDatabase[key] ||
        cropDatabase[
            Object.keys(cropDatabase).find(
                item =>
                    item.toLowerCase() ===
                    key.toLowerCase()
            )
        ];

    if (!crop) {

        console.warn(
            "Crop not found in encyclopedia:",
            cropName
        );

        return;
    }

    if (!encyclopediaModal) {
        createEncyclopediaModal();
    }

    encyclopediaContent.innerHTML = `

        <button
            class="encyclopedia-back"
            onclick="openEncyclopedia()"
            style="
                border:none;
                background:rgba(255,255,255,0.07);
                color:#fff;
                padding:9px 14px;
                border-radius:10px;
                cursor:pointer;
                margin-bottom:20px;
            "
        >
            ← Back to Crops
        </button>

        <div class="encyclopedia-header">

            <div class="crop-emoji">
                ${crop.emoji}
            </div>

            <div>

                <h2>
                    ${crop.name}
                </h2>

                <p class="scientific-name">
                    ${crop.scientificName}
                </p>

            </div>

        </div>

        <p class="crop-description">
            ${crop.description}
        </p>

        <div class="crop-stats">

            <div class="crop-stat">
                <span class="crop-stat-label">
                    🌡️ Temperature
                </span>

                <span class="crop-stat-value">
                    ${crop.temperature}
                </span>
            </div>

            <div class="crop-stat">
                <span class="crop-stat-label">
                    💧 Humidity
                </span>

                <span class="crop-stat-value">
                    ${crop.humidity}
                </span>
            </div>

            <div class="crop-stat">
                <span class="crop-stat-label">
                    🌱 Soil Moisture
                </span>

                <span class="crop-stat-value">
                    ${crop.soilMoisture}
                </span>
            </div>

            <div class="crop-stat">
                <span class="crop-stat-label">
                    ☀️ Sunlight
                </span>

                <span class="crop-stat-value">
                    ${crop.sunlight}
                </span>
            </div>

            <div class="crop-stat">
                <span class="crop-stat-label">
                    💧 Water
                </span>

                <span class="crop-stat-value">
                    ${crop.waterRequirement}
                </span>
            </div>

            <div class="crop-stat">
                <span class="crop-stat-label">
                    ⏱️ Growth Time
                </span>

                <span class="crop-stat-value">
                    ${crop.growthTime}
                </span>
            </div>

        </div>

        <div class="encyclopedia-section">

            <h3>🌱 Soil Requirements</h3>

            <p>
                ${crop.soil}
            </p>

        </div>

        <div class="encyclopedia-section">

            <h3>💧 Watering</h3>

            <p>
                ${crop.watering}
            </p>

        </div>

        <div class="encyclopedia-section">

            <h3>🧪 Nutrient Requirements</h3>

            <p>
                ${crop.nutrients}
            </p>

        </div>

        <div class="encyclopedia-section">

            <h3>⚠️ Common Problems</h3>

            <ul class="encyclopedia-list">

                ${crop.commonProblems
                    .map(problem => `<li>${problem}</li>`)
                    .join("")}

            </ul>

        </div>

        <div class="encyclopedia-section">

            <h3>💡 Growing Tips</h3>

            <ul class="encyclopedia-list">

                ${crop.tips
                    .map(tip => `<li>${tip}</li>`)
                    .join("")}

            </ul>

        </div>
    `;

    encyclopediaModal.classList.add("active");

    document.body.style.overflow = "hidden";
}

// ============================================================
// AI RESULT → ENCYCLOPEDIA CONNECTION
// ============================================================

function showCropFromAI(cropName) {

    if (!cropName) {
        return;
    }

    showCrop(cropName);
}

// ============================================================
// GET CROP DATA
// ============================================================

function getCropData(cropName) {

    const key =
        String(cropName)
            .toLowerCase()
            .trim();

    return cropDatabase[key] || null;
}

// ============================================================
// GLOBAL FUNCTIONS
// ============================================================

window.openEncyclopedia = openEncyclopedia;
window.closeEncyclopedia = closeEncyclopedia;
window.showCrop = showCrop;
window.showCropFromAI = showCropFromAI;
window.getCropData = getCropData;

// ============================================================
// END
// ============================================================

console.log(
    "🌱 Smart Greenhouse AI Encyclopedia loaded."
);
