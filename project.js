// ============================================
// SMART GREENHOUSE AI
// Main JavaScript
// ============================================

// --------------------------------------------
// GREENHOUSE SENSOR DATA
// --------------------------------------------

let greenhouseData = {
    temperature: 24,
    humidity: 70,
    soilMoisture: 80,
    waterTemperature: 22
};

// Outdoor weather is kept SEPARATE
// from greenhouse sensor data.
let outdoorWeather = {
    temperature: null,
    humidity: null
};

let currentImageURL = null;


// --------------------------------------------
// DOM READY
// --------------------------------------------

document.addEventListener("DOMContentLoaded", () => {

    initializeNavigation();
    initializeDashboard();
    initializeEncyclopedia();
    initializeScanner();
    initializeWeather();

    updateDashboard();
});


// ============================================
// NAVIGATION
// ============================================

function initializeNavigation() {

    const navLinks = document.querySelectorAll(".nav-link");
    const sections = document.querySelectorAll(".page-section");

    navLinks.forEach(link => {

        link.addEventListener("click", () => {

            const target = link.dataset.section;

            navLinks.forEach(item => {
                item.classList.remove("active");
            });

            sections.forEach(section => {
                section.classList.remove("active-section");
            });

            link.classList.add("active");

            const targetSection = document.getElementById(target);

            if (targetSection) {
                targetSection.classList.add("active-section");
            }
        });
    });
}


// ============================================
// DASHBOARD
// ============================================

function initializeDashboard() {

    const refreshBtn = document.getElementById("refreshBtn");

    if (refreshBtn) {

        refreshBtn.addEventListener("click", () => {

            // Demo greenhouse sensor values
            greenhouseData.temperature =
                randomNumber(20, 35);

            greenhouseData.humidity =
                randomNumber(50, 90);

            greenhouseData.soilMoisture =
                randomNumber(20, 95);

            greenhouseData.waterTemperature =
                randomNumber(18, 28);

            updateDashboard();
        });
    }
}


// --------------------------------------------
// UPDATE DASHBOARD
// --------------------------------------------

function updateDashboard() {

    setText("temperature",
        greenhouseData.temperature + "°C");

    setText("humidity",
        greenhouseData.humidity + "%");

    setText("soilMoisture",
        greenhouseData.soilMoisture + "%");

    setText("waterTemperature",
        greenhouseData.waterTemperature + "°C");


    // AI recommendation
    const action = getAIAction();

    setText("aiAction", action);


    // Status text
    setText(
        "tempStatus",
        getTemperatureStatus(greenhouseData.temperature)
    );

    setText(
        "humidityStatus",
        getHumidityStatus(greenhouseData.humidity)
    );

    setText(
        "soilStatus",
        getSoilStatus(greenhouseData.soilMoisture)
    );


    // Monitor section
    setText(
        "monitorTemp",
        greenhouseData.temperature + "°C"
    );

    setText(
        "monitorHumidity",
        greenhouseData.humidity + "%"
    );

    setText(
        "monitorSoil",
        greenhouseData.soilMoisture + "%"
    );
}


// ============================================
// AI GREENHOUSE RECOMMENDATION
// ============================================

function getAIAction() {

    const temperature = greenhouseData.temperature;
    const soil = greenhouseData.soilMoisture;

    if (temperature >= 30 && soil <= 25) {
        return "FAN + PUMP";
    }

    if (temperature >= 30) {
        return "FAN";
    }

    if (soil <= 25) {
        return "PUMP";
    }

    return "NORMAL";
}


// ============================================
// SENSOR STATUS
// ============================================

function getTemperatureStatus(temp) {

    if (temp >= 30) {
        return "High temperature";
    }

    if (temp <= 15) {
        return "Low temperature";
    }

    return "Normal";
}


function getHumidityStatus(humidity) {

    if (humidity >= 85) {
        return "High humidity";
    }

    if (humidity <= 40) {
        return "Low humidity";
    }

    return "Normal";
}


function getSoilStatus(soil) {

    if (soil <= 25) {
        return "Dry soil";
    }

    if (soil >= 90) {
        return "Very wet";
    }

    return "Good moisture";
}


// ============================================
// ENCYCLOPEDIA
// ============================================

const encyclopediaData = [

    {
        name: "Aphid",
        type: "Insect",
        category: "insect",
        risk: "Moderate",
        description:
            "Small insects that feed on plant sap and can damage young leaves."
    },

    {
        name: "Whitefly",
        type: "Insect",
        category: "insect",
        risk: "Moderate",
        description:
            "Small flying insects that feed on plant sap and may spread plant diseases."
    },

    {
        name: "Spider Mite",
        type: "Insect",
        category: "insect",
        risk: "High",
        description:
            "Tiny pests that commonly attack leaves in warm and dry conditions."
    },

    {
        name: "Tomato",
        type: "Crop",
        category: "crop",
        risk: "Low",
        description:
            "Tomatoes generally grow well in warm conditions with sufficient sunlight and water."
    },

    {
        name: "Wheat",
        type: "Crop",
        category: "crop",
        risk: "Low",
        description:
            "Wheat prefers cooler growing conditions and moderate soil moisture."
    },

    {
        name: "Rice",
        type: "Crop",
        category: "crop",
        risk: "Low",
        description:
            "Rice generally requires warm temperatures and high water availability."
    },

    {
        name: "Cucumber",
        type: "Crop",
        category: "crop",
        risk: "Low",
        description:
            "Cucumber grows well in warm conditions with adequate moisture."
    },

    {
        name: "Pepper",
        type: "Crop",
        category: "crop",
        risk: "Low",
        description:
            "Peppers prefer warm temperatures and consistent moisture."
    }
];


// --------------------------------------------
// ENCYCLOPEDIA INITIALIZATION
// --------------------------------------------

function initializeEncyclopedia() {

    const searchInput =
        document.getElementById("encyclopediaSearch");

    const categoryButtons =
        document.querySelectorAll(".category-button");

    if (searchInput) {

        searchInput.addEventListener("input", () => {

            filterEncyclopedia(
                searchInput.value,
                getSelectedCategory()
            );
        });
    }


    categoryButtons.forEach(button => {

        button.addEventListener("click", () => {

            categoryButtons.forEach(btn => {
                btn.classList.remove("active");
            });

            button.classList.add("active");

            filterEncyclopedia(
                searchInput ? searchInput.value : "",
                button.dataset.category || "all"
            );
        });
    });

    filterEncyclopedia("", "all");
}


// --------------------------------------------
// GET SELECTED CATEGORY
// --------------------------------------------

function getSelectedCategory() {

    const activeButton =
        document.querySelector(".category-button.active");

    if (!activeButton) {
        return "all";
    }

    return activeButton.dataset.category || "all";
}


// --------------------------------------------
// FILTER ENCYCLOPEDIA
// --------------------------------------------

function filterEncyclopedia(search, category) {

    const cards =
        document.querySelectorAll(".knowledge-card");

    const searchText =
        search.toLowerCase().trim();

    cards.forEach(card => {

        const text =
            card.textContent.toLowerCase();

        const cardCategory =
            card.dataset.category || "all";

        const matchesSearch =
            text.includes(searchText);

        const matchesCategory =
            category === "all" ||
            cardCategory === category;

        if (matchesSearch && matchesCategory) {
            card.style.display = "";
        } else {
            card.style.display = "none";
        }
    });
}


// ============================================
// IMAGE SCANNER
// REAL AI VERSION
// ============================================

function initializeScanner() {

    const imageInput =
        document.getElementById("imageInput");

    const uploadArea =
        document.getElementById("uploadArea");

    const imagePreviewContainer =
        document.getElementById("imagePreviewContainer");

    const imagePreview =
        document.getElementById("imagePreview");

    const removeImage =
        document.getElementById("removeImage");

    const analyzeBtn =
        document.getElementById("analyzeBtn");


    // Make sure scanner exists on this page
    if (!imageInput) {
        console.log("AI Scanner: image input not found.");
        return;
    }


    // ========================================
    // CHOOSE IMAGE / UPLOAD AREA
    // ========================================

    if (uploadArea) {

        uploadArea.addEventListener("click", event => {

            // Don't trigger twice when clicking the label
            if (event.target.closest("label")) {
                return;
            }

            imageInput.click();
        });
    }


    // ========================================
    // IMAGE SELECTED
    // ========================================

    imageInput.addEventListener("change", event => {

        const file = event.target.files[0];

        if (!file) {
            return;
        }


        // Check image type
        if (!file.type.startsWith("image/")) {

            alert("Please select an image file.");

            imageInput.value = "";

            return;
        }


        // Remove previous object URL
        if (currentImageURL) {

            URL.revokeObjectURL(currentImageURL);

            currentImageURL = null;
        }


        // Create preview URL
        currentImageURL =
            URL.createObjectURL(file);


        // Show image preview
        if (imagePreview) {

            imagePreview.src =
                currentImageURL;
        }


        // Hide upload area
        if (uploadArea) {

            uploadArea.classList.add("hidden");
        }


        // Show preview container
        if (imagePreviewContainer) {

            imagePreviewContainer.classList.remove("hidden");
        }


        // Enable analyze button
        if (analyzeBtn) {

            analyzeBtn.disabled = false;
        }


        // Reset old result
        resetAnalysis();


        console.log(
            "Image selected:",
            file.name
        );
    });


    // ========================================
    // REMOVE IMAGE
    // ========================================

    if (removeImage) {

        removeImage.addEventListener("click", () => {

            if (currentImageURL) {

                URL.revokeObjectURL(
                    currentImageURL
                );

                currentImageURL = null;
            }


            imageInput.value = "";


            if (imagePreview) {

                imagePreview.src = "";
            }


            if (imagePreviewContainer) {

                imagePreviewContainer.classList.add(
                    "hidden"
                );
            }


            if (uploadArea) {

                uploadArea.classList.remove(
                    "hidden"
                );
            }


            if (analyzeBtn) {

                analyzeBtn.disabled = true;

                analyzeBtn.textContent =
                    "Analyze Image";
            }


            resetAnalysis();
        });
    }


    // ========================================
    // ANALYZE IMAGE
    // ========================================

    if (analyzeBtn) {

        analyzeBtn.addEventListener(
            "click",
            async () => {

                const file =
                    imageInput.files[0];


                if (!file) {

                    alert(
                        "Please upload an image first."
                    );

                    return;
                }


                // Disable button while analyzing
                analyzeBtn.disabled = true;

                analyzeBtn.textContent =
                    "Analyzing...";


                setText(
                    "analysisStatus",
                    "AI analyzing image..."
                );


                try {

                    // --------------------------------
                    // SEND IMAGE TO PYTHON BACKEND
                    // --------------------------------

                    const formData =
                        new FormData();

                    formData.append(
                        "file",
                        file
                    );


                    console.log(
                        "Sending image to AI backend..."
                    );


                    const response =
                        await fetch(
                            "http://127.0.0.1:8000/predict",
                            {
                                method: "POST",
                                body: formData
                            }
                        );


                    // --------------------------------
                    // CHECK RESPONSE
                    // --------------------------------

                    if (!response.ok) {

                        const errorText =
                            await response.text();

                        console.error(
                            "Backend error:",
                            errorText
                        );

                        throw new Error(
                            "AI backend returned an error."
                        );
                    }


                    // --------------------------------
                    // GET REAL AI RESULT
                    // --------------------------------

                    const result =
                        await response.json();


                    console.log(
                        "REAL AI RESULT:",
                        result
                    );


                    // --------------------------------
                    // DISPLAY RESULT
                    // --------------------------------

                    displayAIResult(result);

                }

                catch (error) {

                    console.error(
                        "AI Analysis Error:",
                        error
                    );


                    setText(
                        "analysisStatus",
                        "Analysis Failed"
                    );


                    alert(
                        "Could not analyze the image. Make sure the Python AI server is running."
                    );
                }


                finally {

                    analyzeBtn.disabled =
                        false;

                    analyzeBtn.textContent =
                        "Analyze Image";
                }
            }
        );
    }


    console.log(
        "AI Scanner initialized successfully."
    );
}


// ============================================
// REAL AI RESULT
// ============================================

function displayAIResult(result) {

    const analysisResult =
        document.getElementById(
            "analysisResult"
        );

    const emptyResult =
        document.getElementById(
            "emptyResult"
        );


    // Hide empty state
    if (emptyResult) {

        emptyResult.classList.add(
            "hidden"
        );
    }


    // Show result
    if (analysisResult) {

        analysisResult.classList.remove(
            "hidden"
        );
    }


    // ----------------------------------------
    // GET REAL VALUES FROM PYTHON
    // ----------------------------------------

    const prediction =
        result.prediction || "Unknown";

    const confidence =
        Number(result.confidence || 0);


    // ----------------------------------------
    // RESULT TEXT
    // ----------------------------------------

    setText(
        "analysisStatus",
        "Analysis Complete"
    );


    setText(
        "identifiedName",
        prediction
    );


    setText(
        "confidenceValue",
        confidence.toFixed(2) + "%"
    );


    setText(
        "resultType",
        "Crop"
    );


    // Confidence-based display only
    if (confidence >= 80) {

        setText(
            "resultRisk",
            "Strong Match"
        );

    } else if (confidence >= 50) {

        setText(
            "resultRisk",
            "Possible Match"
        );

    } else {

        setText(
            "resultRisk",
            "Low Confidence"
        );
    }


    setText(
        "resultDescription",
        "The AI model detected " +
        prediction +
        " with " +
        confidence.toFixed(2) +
        "% confidence."
    );


    // ----------------------------------------
    // CONFIDENCE BAR
    // ----------------------------------------

    const progress =
        document.getElementById(
            "confidenceProgress"
        );


    if (progress) {

        progress.style.width =
            Math.min(confidence, 100) + "%";
    }


    // ----------------------------------------
    // PROBABILITIES
    // ----------------------------------------

    console.log(
        "Crop probabilities:",
        result.probabilities
    );
}


// ============================================
// RESET ANALYSIS
// ============================================

function resetAnalysis() {

    const analysisResult =
        document.getElementById(
            "analysisResult"
        );

    const emptyResult =
        document.getElementById(
            "emptyResult"
        );


    if (analysisResult) {

        analysisResult.classList.add(
            "hidden"
        );
    }


    if (emptyResult) {

        emptyResult.classList.remove(
            "hidden"
        );
    }


    setText(
        "analysisStatus",
        "Waiting for image"
    );


    setText(
        "identifiedName",
        "—"
    );


    setText(
        "confidenceValue",
        "0%"
    );


    setText(
        "resultType",
        "—"
    );


    setText(
        "resultRisk",
        "—"
    );


    setText(
        "resultDescription",
        "Upload an image to begin analysis."
    );


    const progress =
        document.getElementById(
            "confidenceProgress"
        );


    if (progress) {

        progress.style.width = "0%";
    }
}

    // ----------------------------------------
    // REMOVE IMAGE
    // ----------------------------------------

    if (removeImage) {

        removeImage.addEventListener("click", () => {

            if (currentImageURL) {
                URL.revokeObjectURL(currentImageURL);
                currentImageURL = null;
            }

            imageInput.value = "";

            if (imagePreview) {
                imagePreview.src = "";
            }

            if (imagePreviewContainer) {
                imagePreviewContainer.classList.add("hidden");
            }

            if (uploadArea) {
                uploadArea.classList.remove("hidden");
            }

            if (analyzeBtn) {
                analyzeBtn.disabled = true;
            }

            resetAnalysis();
        });
    }


// ----------------------------------------
// ANALYZE IMAGE
// ----------------------------------------

if (analyzeBtn) {

    analyzeBtn.addEventListener("click", async () => {

        if (!imageInput.files.length) {
            alert("Please upload an image first.");
            return;
        }

        analyzeBtn.disabled = true;
        analyzeBtn.textContent = "Analyzing...";

        try {

            // Get the uploaded image
            const imageFile = imageInput.files[0];

            // Send image to Python AI backend
            const formData = new FormData();
            formData.append("file", imageFile);

            const response = await fetch(
                "http://127.0.0.1:8000/predict",
                {
                    method: "POST",
                    body: formData
                }
            );

            if (!response.ok) {
                throw new Error("AI server returned an error.");
            }

            const result = await response.json();

            console.log("REAL AI RESULT:", result);

            // Show result
            displayAIResult(result);

        } catch (error) {

            console.error("AI Analysis Error:", error);

            alert(
                "Could not analyze the image. Make sure the Python AI server is running."
            );

        } finally {

            analyzeBtn.disabled = false;
            analyzeBtn.textContent = "Analyze Image";
        }
    });
}


// ============================================
// REAL AI RESULT
// ============================================

function displayAIResult(result) {

    const analysisResult =
        document.getElementById("analysisResult");

    const emptyResult =
        document.getElementById("emptyResult");

    // Make sure result container exists
    if (!analysisResult) {
        console.error("analysisResult element not found");
        return;
    }

    // Hide empty result message
    if (emptyResult) {
        emptyResult.classList.add("hidden");
    }

    // Get REAL AI values from Python
    const crop =
        result.crop ||
        result.prediction ||
        "Unknown";

    const confidence =
        Number(result.confidence || 0);

    const probabilities =
        result.probabilities || {};

    // Build probability section
    let probabilityHTML = "";

    Object.entries(probabilities).forEach(
        ([name, value]) => {

            const percentage =
                Number(value);

            probabilityHTML += `
                <div style="
                    margin: 14px 0;
                    text-align: left;
                ">

                    <div style="
                        display: flex;
                        justify-content: space-between;
                        margin-bottom: 6px;
                        font-weight: 600;
                    ">
                        <span>${name}</span>
                        <span>
                            ${percentage.toFixed(2)}%
                        </span>
                    </div>

                    <div style="
                        width: 100%;
                        height: 8px;
                        background: rgba(255,255,255,0.12);
                        border-radius: 20px;
                        overflow: hidden;
                    ">

                        <div style="
                            width: ${Math.min(
                                percentage,
                                100
                            )}%;
                            height: 100%;
                            background: #39e68c;
                            border-radius: 20px;
                            transition: width 0.8s ease;
                        "></div>

                    </div>

                </div>
            `;
        }
    );

    // Display complete AI result
    analysisResult.innerHTML = `

        <div style="
            margin-top: 20px;
            padding: 28px;
            border: 1px solid rgba(57, 230, 140, 0.35);
            border-radius: 18px;
            background: rgba(10, 35, 25, 0.85);
            box-shadow: 0 10px 35px rgba(0,0,0,0.25);
        ">

            <div style="
                font-size: 42px;
                margin-bottom: 10px;
            ">
                🌱
            </div>

            <div style="
                font-size: 14px;
                text-transform: uppercase;
                letter-spacing: 2px;
                opacity: 0.7;
                margin-bottom: 8px;
            ">
                Analysis Complete
            </div>

            <div style="
                font-size: 32px;
                font-weight: 700;
                margin-bottom: 8px;
            ">
                ${crop}
            </div>

            <div style="
                font-size: 18px;
                margin-bottom: 25px;
            ">
                Confidence:
                <strong>
                    ${confidence.toFixed(2)}%
                </strong>
            </div>

            <div style="
                height: 10px;
                width: 100%;
                background: rgba(255,255,255,0.12);
                border-radius: 20px;
                overflow: hidden;
                margin-bottom: 28px;
            ">

                <div style="
                    width: ${Math.min(confidence, 100)}%;
                    height: 100%;
                    background: #39e68c;
                    border-radius: 20px;
                    transition: width 1s ease;
                "></div>

            </div>

            <div style="
                font-size: 18px;
                font-weight: 700;
                margin-bottom: 15px;
                text-align: left;
            ">
                Prediction Probabilities
            </div>

            ${probabilityHTML}

            <div style="
                margin-top: 25px;
                padding: 14px;
                border-radius: 12px;
                background: rgba(57, 230, 140, 0.08);
                text-align: left;
            ">

                <strong>✓ AI Analysis Completed</strong>

                <div style="
                    margin-top: 6px;
                    opacity: 0.75;
                    font-size: 14px;
                ">
                    The AI model detected
                    ${crop}
                    with
                    ${confidence.toFixed(2)}%
                    confidence.
                </div>

            </div>

        </div>
    `;

    // Make sure result is visible
    analysisResult.classList.remove("hidden");

    // Debug information
    console.log(
        "REAL AI RESULT:",
        result
    );

    console.log(
        "Crop:",
        crop
    );

    console.log(
        "Confidence:",
        confidence
    );

    console.log(
        "Probabilities:",
        probabilities
    );
}
// ============================================
// RESET ANALYSIS
// ============================================

function resetAnalysis() {

    const analysisResult =
        document.getElementById("analysisResult");

    const emptyResult =
        document.getElementById("emptyResult");


    if (analysisResult) {
        analysisResult.classList.add("hidden");
    }

    if (emptyResult) {
        emptyResult.classList.remove("hidden");
    }


    setText("analysisStatus", "Waiting for image");

    setText("identifiedName", "—");

    setText("confidenceValue", "0%");

    setText("resultType", "—");

    setText("resultRisk", "—");

    setText(
        "resultDescription",
        "Upload an image to begin analysis."
    );


    const progress =
        document.getElementById("confidenceProgress");

    if (progress) {
        progress.style.width = "0%";
    }
}


// ============================================
// WEATHER
// ============================================

function initializeWeather() {

    getOutdoorWeather();


    // Refresh outdoor weather every 10 minutes
    setInterval(() => {
        getOutdoorWeather();
    }, 10 * 60 * 1000);


    const cropSelect =
        document.getElementById("cropSelect");

    if (cropSelect) {

        cropSelect.addEventListener("change", () => {
            updateCropWarning();
        });
    }
}


// ============================================
// GET OUTDOOR WEATHER
// ============================================

function getOutdoorWeather() {

    if (!navigator.geolocation) {

        showWeatherError(
            "Geolocation is not supported by this browser."
        );

        return;
    }


    navigator.geolocation.getCurrentPosition(

        position => {

            const latitude =
                position.coords.latitude;

            const longitude =
                position.coords.longitude;

            fetchWeather(latitude, longitude);
        },

        () => {

            showWeatherError(
                "Location permission required."
            );
        },

        {
            enableHighAccuracy: false,
            timeout: 10000,
            maximumAge: 600000
        }
    );
}


// ============================================
// FETCH WEATHER
// ============================================

async function fetchWeather(latitude, longitude) {

    const url =
        `https://api.open-meteo.com/v1/forecast?` +
        `latitude=${latitude}` +
        `&longitude=${longitude}` +
        `&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code` +
        `&timezone=auto`;


    try {

        const response =
            await fetch(url);

        if (!response.ok) {
            throw new Error("Weather request failed.");
        }


        const data =
            await response.json();


        outdoorWeather.temperature =
            data.current.temperature_2m;

        outdoorWeather.humidity =
            data.current.relative_humidity_2m;


        updateWeatherUI();

        updateCropWarning();

    } catch (error) {

        console.error(error);

        showWeatherError(
            "Weather unavailable"
        );
    }
}


// ============================================
// UPDATE WEATHER UI
// ============================================

function updateWeatherUI() {

    const temp =
        outdoorWeather.temperature;

    const humidity =
        outdoorWeather.humidity;


    setText(
        "locationName",
        "Your current location"
    );


    setText(
        "weatherText",
        `${temp}°C • ${humidity}% humidity • Outdoor`
    );
}


// ============================================
// WEATHER ERROR
// ============================================

function showWeatherError(message) {

    setText(
        "locationName",
        "Location unavailable"
    );

    setText(
        "weatherText",
        message
    );
}


// ============================================
// CROP DATABASE
// ============================================

const cropDatabase = {

    tomato: {
        min: 18,
        max: 30,
        idealMin: 20,
        idealMax: 27
    },

    wheat: {
        min: 10,
        max: 25,
        idealMin: 15,
        idealMax: 22
    },

    rice: {
        min: 20,
        max: 35,
        idealMin: 25,
        idealMax: 32
    },

    cucumber: {
        min: 18,
        max: 32,
        idealMin: 21,
        idealMax: 30
    },

    pepper: {
        min: 18,
        max: 32,
        idealMin: 21,
        idealMax: 29
    }
};


// ============================================
// CROP WARNING
// ============================================

function updateCropWarning() {

    const cropSelect =
        document.getElementById("cropSelect");

    const cropWarning =
        document.getElementById("cropWarning");


    if (!cropSelect || !cropWarning) {
        return;
    }


    const crop =
        cropSelect.value;


    if (!crop) {

        cropWarning.classList.add("hidden");
        return;
    }


    if (outdoorWeather.temperature === null) {

        cropWarning.classList.add("hidden");
        return;
    }


    const data =
        cropDatabase[crop];


    if (!data) {
        return;
    }


    const temp =
        outdoorWeather.temperature;


    let title = "";
    let message = "";


    if (temp < data.min) {

        title =
            "Cold Temperature Warning";

        message =
            `Outdoor temperature is ${temp}°C. ` +
            `This may be too cold for ${capitalize(crop)}. ` +
            `Recommended minimum is around ${data.min}°C.`;

    } else if (temp > data.max) {

        title =
            "High Temperature Warning";

        message =
            `Outdoor temperature is ${temp}°C. ` +
            `This may be too hot for ${capitalize(crop)}. ` +
            `Recommended maximum is around ${data.max}°C.`;

    } else if (
        temp >= data.idealMin &&
        temp <= data.idealMax
    ) {

        title =
            "Temperature Suitable";

        message =
            `${temp}°C is within the preferred temperature ` +
            `range for ${capitalize(crop)}.`;

    } else {

        title =
            "Temperature Acceptable";

        message =
            `${temp}°C is within the survivable range for ` +
            `${capitalize(crop)}, but it is outside its ideal range.`;
    }


    cropWarning.classList.remove("hidden");


    setText(
        "warningTitle",
        title
    );

    setText(
        "warningMessage",
        message
    );
}


// ============================================
// UTILITY FUNCTIONS
// ============================================

function randomNumber(min, max) {

    return Math.floor(
        Math.random() * (max - min + 1)
    ) + min;
}


function setText(id, value) {

    const element =
        document.getElementById(id);

    if (element) {
        element.textContent = value;
    }
}


function capitalize(text) {

    if (!text) {
        return "";
    }

    return text.charAt(0).toUpperCase() +
        text.slice(1);
}


function wait(ms) {

    return new Promise(resolve => {
        setTimeout(resolve, ms);
    });
}