// ============================================================
// SMART GREENHOUSE AI
// Main JavaScript
// Version: AI Scanner Upgrade
// ============================================================


// ============================================================
// CONFIGURATION
// ============================================================

const API_BASE_URL = "http://127.0.0.1:8000";


// ============================================================
// GREENHOUSE SENSOR DATA
// ============================================================

let greenhouseData = {
    temperature: 24,
    humidity: 70,
    soilMoisture: 80,
    waterTemperature: 22
};


// Outdoor weather is separate from greenhouse sensors.
let outdoorWeather = {
    temperature: null,
    humidity: null
};


// Scanner state
let currentImageURL = null;
let currentImageFile = null;
let currentPrediction = null;


// ============================================================
// DOM READY
// ============================================================

document.addEventListener("DOMContentLoaded", () => {

    initializeNavigation();
    initializeDashboard();
    initializeScanner();
    initializeWeather();

    // Encyclopedia is now handled by encyclopedia.js
    if (typeof initializeEncyclopedia === "function") {
        initializeEncyclopedia();
    }

    updateDashboard();
});


// ============================================================
// NAVIGATION
// ============================================================

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

            const targetSection =
                document.getElementById(target);

            if (targetSection) {
                targetSection.classList.add("active-section");
            }

            // Scroll smoothly when needed
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }
        });
    });
}


// ============================================================
// DASHBOARD
// ============================================================

function initializeDashboard() {

    const refreshBtn =
        document.getElementById("refreshBtn");

    if (!refreshBtn) {
        return;
    }

    refreshBtn.addEventListener("click", () => {

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


// ============================================================
// UPDATE DASHBOARD
// ============================================================

function updateDashboard() {

    setText(
        "temperature",
        greenhouseData.temperature + "°C"
    );

    setText(
        "humidity",
        greenhouseData.humidity + "%"
    );

    setText(
        "soilMoisture",
        greenhouseData.soilMoisture + "%"
    );

    setText(
        "waterTemperature",
        greenhouseData.waterTemperature + "°C"
    );


    // AI recommendation
    setText(
        "aiAction",
        getAIAction()
    );


    // Sensor status
    setText(
        "tempStatus",
        getTemperatureStatus(
            greenhouseData.temperature
        )
    );

    setText(
        "humidityStatus",
        getHumidityStatus(
            greenhouseData.humidity
        )
    );

    setText(
        "soilStatus",
        getSoilStatus(
            greenhouseData.soilMoisture
        )
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


// ============================================================
// AI GREENHOUSE RECOMMENDATION
// ============================================================

function getAIAction() {

    const temperature =
        greenhouseData.temperature;

    const soil =
        greenhouseData.soilMoisture;


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


// ============================================================
// SENSOR STATUS
// ============================================================

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


// ============================================================
// AI PLANT SCANNER
// ============================================================

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


    if (!imageInput) {
        return;
    }


    // --------------------------------------------------------
    // FILE INPUT
    // --------------------------------------------------------

    imageInput.addEventListener("change", event => {

        const file = event.target.files[0];

        if (!file) {
            return;
        }

        handleSelectedImage(file);
    });


    // --------------------------------------------------------
    // DRAG AND DROP
    // --------------------------------------------------------

    if (uploadArea) {

        uploadArea.addEventListener("dragover", event => {

            event.preventDefault();

            uploadArea.classList.add("drag-active");
        });


        uploadArea.addEventListener("dragleave", () => {

            uploadArea.classList.remove("drag-active");
        });


        uploadArea.addEventListener("drop", event => {

            event.preventDefault();

            uploadArea.classList.remove("drag-active");

            const file =
                event.dataTransfer.files[0];

            if (!file) {
                return;
            }

            if (!file.type.startsWith("image/")) {

                showScannerMessage(
                    "Please drop a valid image file.",
                    "error"
                );

                return;
            }

            // Put dropped file into input
            try {

                const dataTransfer =
                    new DataTransfer();

                dataTransfer.items.add(file);

                imageInput.files =
                    dataTransfer.files;

            } catch (error) {

                console.warn(
                    "Could not synchronize dropped file with input.",
                    error
                );
            }

            handleSelectedImage(file);
        });
    }


    // --------------------------------------------------------
    // REMOVE IMAGE
    // --------------------------------------------------------

    if (removeImage) {

        removeImage.addEventListener("click", () => {

            clearSelectedImage();
        });
    }


    // --------------------------------------------------------
    // ANALYZE BUTTON
    // --------------------------------------------------------

    if (analyzeBtn) {

        analyzeBtn.addEventListener("click", async () => {

            if (!currentImageFile) {

                showScannerMessage(
                    "Please select a plant image first.",
                    "error"
                );

                return;
            }

            await analyzePlantImage();
        });
    }
}


// ============================================================
// HANDLE SELECTED IMAGE
// ============================================================

function handleSelectedImage(file) {

    if (!file.type.startsWith("image/")) {

        showScannerMessage(
            "Please select a valid image file.",
            "error"
        );

        return;
    }


    // Maximum frontend upload size: 10 MB
    if (file.size > 10 * 1024 * 1024) {

        showScannerMessage(
            "Image is too large. Please choose an image under 10 MB.",
            "error"
        );

        return;
    }


    currentImageFile = file;


    // Remove previous object URL
    if (currentImageURL) {
        URL.revokeObjectURL(currentImageURL);
    }


    currentImageURL =
        URL.createObjectURL(file);


    const imagePreview =
        document.getElementById("imagePreview");

    const uploadArea =
        document.getElementById("uploadArea");

    const imagePreviewContainer =
        document.getElementById("imagePreviewContainer");

    const analyzeBtn =
        document.getElementById("analyzeBtn");


    if (imagePreview) {

        imagePreview.src =
            currentImageURL;

        imagePreview.onload = () => {

            checkImageQuality(
                imagePreview.naturalWidth,
                imagePreview.naturalHeight,
                file
            );
        };
    }


    if (uploadArea) {
        uploadArea.classList.add("hidden");
    }

    if (imagePreviewContainer) {
        imagePreviewContainer.classList.remove("hidden");
    }

    if (analyzeBtn) {
        analyzeBtn.disabled = false;
    }


    resetAnalysis();

    showScannerMessage(
        "Image ready. Run AI analysis when you're ready.",
        "info"
    );
}


// ============================================================
// IMAGE QUALITY CHECK
// ============================================================

function checkImageQuality(
    width,
    height,
    file
) {

    let warnings = [];


    if (width < 224 || height < 224) {

        warnings.push(
            "The image resolution is low."
        );
    }


    if (width < 160 || height < 160) {

        warnings.push(
            "For better AI detection, use a clearer and larger image."
        );
    }


    if (file.size < 10 * 1024) {

        warnings.push(
            "The image file is unusually small."
        );
    }


    const qualityElement =
        document.getElementById("imageQualityMessage");


    if (qualityElement) {

        if (warnings.length > 0) {

            qualityElement.textContent =
                warnings.join(" ");

            qualityElement.classList.remove("hidden");

        } else {

            qualityElement.textContent =
                "Image quality looks suitable for analysis.";

            qualityElement.classList.remove("hidden");
        }
    }
}


// ============================================================
// CLEAR SELECTED IMAGE
// ============================================================

function clearSelectedImage() {

    if (currentImageURL) {

        URL.revokeObjectURL(
            currentImageURL
        );

        currentImageURL = null;
    }


    currentImageFile = null;
    currentPrediction = null;


    const imageInput =
        document.getElementById("imageInput");

    const imagePreview =
        document.getElementById("imagePreview");

    const uploadArea =
        document.getElementById("uploadArea");

    const imagePreviewContainer =
        document.getElementById("imagePreviewContainer");

    const analyzeBtn =
        document.getElementById("analyzeBtn");


    if (imageInput) {
        imageInput.value = "";
    }

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


    const qualityElement =
        document.getElementById("imageQualityMessage");

    if (qualityElement) {
        qualityElement.textContent = "";
        qualityElement.classList.add("hidden");
    }


    resetAnalysis();
}


// ============================================================
// ANALYZE PLANT IMAGE
// ============================================================

async function analyzePlantImage() {

    const analyzeBtn =
        document.getElementById("analyzeBtn");


    if (!currentImageFile) {

        showScannerMessage(
            "Please select an image first.",
            "error"
        );

        return;
    }


    // --------------------------------------------------------
    // UI: ANALYZING STATE
    // --------------------------------------------------------

    if (analyzeBtn) {

        analyzeBtn.disabled = true;

        analyzeBtn.dataset.originalText =
            analyzeBtn.textContent;

        analyzeBtn.textContent =
            "Analyzing image...";
    }


    showAnalysisLoading();


    try {

        const formData =
            new FormData();

        formData.append(
            "file",
            currentImageFile
        );


        // ----------------------------------------------------
        // REAL BACKEND REQUEST
        // ----------------------------------------------------

        const response =
            await fetch(
                `${API_BASE_URL}/predict`,
                {
                    method: "POST",
                    body: formData
                }
            );


        // ----------------------------------------------------
        // READ RESPONSE
        // ----------------------------------------------------

        let result = null;

        try {

            result =
                await response.json();

        } catch (jsonError) {

            throw new Error(
                "The AI server returned an invalid response."
            );
        }


        if (!response.ok) {

            const serverMessage =
                result?.detail ||
                result?.message ||
                "AI prediction failed.";

            throw new Error(
                serverMessage
            );
        }


        console.log(
            "SMART GREENHOUSE AI RESULT:",
            result
        );


        // ----------------------------------------------------
        // NORMALIZE BACKEND RESPONSE
        // ----------------------------------------------------

        const normalized =
            normalizePredictionResult(result);


        currentPrediction =
            normalized;


        // ----------------------------------------------------
        // SHOW RESULT ON WEBSITE
        // ----------------------------------------------------

        displayAIResult(
            normalized
        );


    } catch (error) {

        console.error(
            "AI prediction error:",
            error
        );


        showAnalysisError(
            error.message ||
            "Could not analyze the image."
        );


    } finally {

        if (analyzeBtn) {

            analyzeBtn.disabled = false;

            analyzeBtn.textContent =
                analyzeBtn.dataset.originalText ||
                "Analyze Image";
        }
    }
}


// ============================================================
// NORMALIZE AI RESULT
// ============================================================

function normalizePredictionResult(result) {

    /*
        The frontend supports several possible backend formats.

        Example:

        {
            crop: "Tomato",
            confidence: 94.2,
            reliable: true
        }

        OR:

        {
            prediction: "Tomato",
            confidence: 94.2,
            reliable: true,
            predictions: [...]
        }
    */


    const crop =
        result.crop ||
        result.prediction ||
        result.class_name ||
        result.label ||
        result.name ||
        "Unknown";


    const confidence =
        Number(
            result.confidence ??
            result.probability ??
            result.score ??
            0
        );


    const reliable =
        result.reliable ??
        result.is_reliable ??
        result.accepted ??
        confidence >= 70;


    const quality =
        result.image_quality ||
        result.quality ||
        null;


    const message =
        result.message ||
        result.reason ||
        "";


    let alternatives =
        result.predictions ||
        result.alternatives ||
        result.top_predictions ||
        [];


    if (!Array.isArray(alternatives)) {
        alternatives = [];
    }


    alternatives =
        alternatives
            .map(item => {

                return {
                    crop:
                        item.crop ||
                        item.prediction ||
                        item.class_name ||
                        item.label ||
                        item.name ||
                        "Unknown",

                    confidence:
                        Number(
                            item.confidence ??
                            item.probability ??
                            item.score ??
                            0
                        )
                };
            })
            .filter(item =>
                item.crop !== "Unknown"
            )
            .sort(
                (a, b) =>
                    b.confidence -
                    a.confidence
            );


    // If backend doesn't provide alternatives,
    // create a single top prediction.
    if (
        alternatives.length === 0 &&
        crop !== "Unknown"
    ) {

        alternatives.push({
            crop: crop,
            confidence: confidence
        });
    }


    return {

        crop: crop,

        confidence:
            clamp(confidence, 0, 100),

        reliable:
            Boolean(reliable),

        quality:
            quality,

        message:
            message,

        alternatives:
            alternatives
    };
}


// ============================================================
// SHOW ANALYSIS LOADING
// ============================================================

function showAnalysisLoading() {

    const emptyResult =
        document.getElementById("emptyResult");

    const analysisResult =
        document.getElementById("analysisResult");


    if (emptyResult) {
        emptyResult.classList.add("hidden");
    }

    if (analysisResult) {
        analysisResult.classList.remove("hidden");
    }


    setText(
        "analysisStatus",
        "AI is analyzing your image..."
    );

    setText(
        "identifiedName",
        "Analyzing..."
    );

    setText(
        "confidenceValue",
        "—"
    );

    setText(
        "resultType",
        "AI Detection"
    );

    setText(
        "resultRisk",
        "Checking..."
    );

    setText(
        "resultDescription",
        "Checking image quality, visual features and crop classification..."
    );


    updateConfidenceBar(0);


    const reliability =
        document.getElementById(
            "reliabilityStatus"
        );

    if (reliability) {

        reliability.textContent =
            "Analyzing reliability...";

        reliability.className =
            "reliability-status";
    }


    hideElement(
        "cropInfoButton"
    );

    hideElement(
        "viewCropInfo"
    );
}


// ============================================================
// DISPLAY AI RESULT
// ============================================================

function displayAIResult(result) {

    const emptyResult =
        document.getElementById("emptyResult");

    const analysisResult =
        document.getElementById("analysisResult");


    if (emptyResult) {
        emptyResult.classList.add("hidden");
    }

    if (analysisResult) {
        analysisResult.classList.remove("hidden");
    }


    const confidence =
        result.confidence;


    const crop =
        result.crop;


    // --------------------------------------------------------
    // STATUS
    // --------------------------------------------------------

    setText(
        "analysisStatus",
        result.reliable
            ? "Analysis Complete"
            : "Low Reliability — Review Image"
    );


    // --------------------------------------------------------
    // CROP NAME
    // --------------------------------------------------------

    setText(
        "identifiedName",
        crop
    );


    // --------------------------------------------------------
    // CONFIDENCE
    // --------------------------------------------------------

    setText(
        "confidenceValue",
        formatConfidence(confidence)
    );


    updateConfidenceBar(
        confidence
    );


    // --------------------------------------------------------
    // RESULT TYPE
    // --------------------------------------------------------

    setText(
        "resultType",
        "Crop Detection"
    );


    // --------------------------------------------------------
    // RELIABILITY
    // --------------------------------------------------------

    const reliability =
        document.getElementById(
            "reliabilityStatus"
        );


    if (reliability) {

        if (result.reliable) {

            reliability.textContent =
                "✓ Reliable detection";

            reliability.className =
                "reliability-status reliable";

        } else {

            reliability.textContent =
                "⚠ Detection needs a clearer image";

            reliability.className =
                "reliability-status uncertain";
        }
    }


    // --------------------------------------------------------
    // RISK / QUALITY
    // --------------------------------------------------------

    let resultRisk =
        "Detection confidence";

    if (confidence >= 90) {
        resultRisk = "Very strong match";
    } else if (confidence >= 75) {
        resultRisk = "Strong match";
    } else if (confidence >= 60) {
        resultRisk = "Moderate match";
    } else {
        resultRisk = "Weak match";
    }


    setText(
        "resultRisk",
        resultRisk
    );


    // --------------------------------------------------------
    // DESCRIPTION
    // --------------------------------------------------------

    let description =
        `The AI identified this image as ${crop} ` +
        `with ${formatConfidence(confidence)} confidence.`;


    if (!result.reliable) {

        description +=
            " The result should be treated as uncertain. " +
            "Try another clear image showing the plant or leaf clearly.";
    }


    if (result.message) {

        description +=
            ` ${result.message}`;
    }


    if (result.quality) {

        description +=
            ` Image quality: ${formatQuality(result.quality)}.`;
    }


    setText(
        "resultDescription",
        description
    );


    // --------------------------------------------------------
    // ALTERNATIVE PREDICTIONS
    // --------------------------------------------------------

    renderAlternativePredictions(
        result.alternatives,
        crop
    );


    // --------------------------------------------------------
    // CROP INFORMATION BUTTON
    // --------------------------------------------------------

    if (
        result.reliable &&
        isSupportedCrop(crop)
    ) {

        showCropInformationButton(
            crop
        );

    } else {

        hideElement(
            "cropInfoButton"
        );

        hideElement(
            "viewCropInfo"
        );
    }
}


// ============================================================
// CONFIDENCE BAR
// ============================================================

function updateConfidenceBar(value) {

    const progress =
        document.getElementById(
            "confidenceProgress"
        );


    if (!progress) {
        return;
    }


    const safeValue =
        clamp(
            Number(value) || 0,
            0,
            100
        );


    progress.style.width =
        `${safeValue}%`;


    progress.setAttribute(
        "aria-valuenow",
        safeValue
    );
}


// ============================================================
// ALTERNATIVE PREDICTIONS
// ============================================================

function renderAlternativePredictions(
    predictions,
    detectedCrop
) {

    const container =
        document.getElementById(
            "alternativePredictions"
        );


    if (!container) {
        return;
    }


    container.innerHTML = "";


    const alternatives =
        predictions
            .filter(item =>
                normalizeCropName(item.crop) !==
                normalizeCropName(detectedCrop)
            )
            .slice(0, 3);


    if (alternatives.length === 0) {

        container.classList.add("hidden");

        return;
    }


    container.classList.remove("hidden");


    const title =
        document.createElement("div");

    title.className =
        "alternative-title";

    title.textContent =
        "Other possible matches";

    container.appendChild(title);


    alternatives.forEach(item => {

        const row =
            document.createElement("div");

        row.className =
            "alternative-prediction";


        const name =
            document.createElement("span");

        name.textContent =
            item.crop;


        const confidence =
            document.createElement("span");

        confidence.textContent =
            formatConfidence(
                item.confidence
            );


        row.appendChild(name);
        row.appendChild(confidence);

        container.appendChild(row);
    });
}


// ============================================================
// SHOW CROP INFORMATION BUTTON
// ============================================================

function showCropInformationButton(crop) {

    const button =
        document.getElementById(
            "cropInfoButton"
        ) ||
        document.getElementById(
            "viewCropInfo"
        );


    if (!button) {
        return;
    }


    button.classList.remove("hidden");


    button.textContent =
        `View complete ${crop} guide`;


    // Avoid duplicate event listeners
    button.onclick = () => {

        openCropEncyclopedia(
            crop
        );
    };
}


// ============================================================
// OPEN CROP ENCYCLOPEDIA
// ============================================================

function openCropEncyclopedia(crop) {

    /*
        encyclopedia.js will contain the detailed crop data.

        We expose the selected crop through a global event so
        encyclopedia.js can open the correct information.
    */

    const normalized =
        normalizeCropName(crop);


    // Try a direct function if encyclopedia.js provides one.
    if (
        typeof window.openCropGuide ===
        "function"
    ) {

        window.openCropGuide(
            normalized
        );

        return;
    }


    if (
        typeof window.showCropInfo ===
        "function"
    ) {

        window.showCropInfo(
            normalized
        );

        return;
    }


    // Fallback: send custom event.
    window.dispatchEvent(
        new CustomEvent(
            "smartGreenhouse:openCrop",
            {
                detail: {
                    crop: normalized
                }
            }
        )
    );


    // Try opening encyclopedia navigation section.
    const encyclopediaSection =
        document.getElementById(
            "encyclopedia"
        );


    if (encyclopediaSection) {

        document.querySelectorAll(
            ".page-section"
        ).forEach(section => {

            section.classList.remove(
                "active-section"
            );
        });


        encyclopediaSection.classList.add(
            "active-section"
        );
    }
}


// ============================================================
// SCANNER ERROR
// ============================================================

function showAnalysisError(message) {

    const emptyResult =
        document.getElementById(
            "emptyResult"
        );

    const analysisResult =
        document.getElementById(
            "analysisResult"
        );


    if (emptyResult) {
        emptyResult.classList.add("hidden");
    }

    if (analysisResult) {
        analysisResult.classList.remove("hidden");
    }


    setText(
        "analysisStatus",
        "Analysis Failed"
    );


    setText(
        "identifiedName",
        "Unable to identify"
    );


    setText(
        "confidenceValue",
        "—"
    );


    setText(
        "resultType",
        "AI Error"
    );


    setText(
        "resultRisk",
        "Try again"
    );


    setText(
        "resultDescription",
        message ||
        "The image could not be analyzed."
    );


    updateConfidenceBar(0);


    const reliability =
        document.getElementById(
            "reliabilityStatus"
        );


    if (reliability) {

        reliability.textContent =
            "⚠ Analysis unavailable";

        reliability.className =
            "reliability-status uncertain";
    }


    hideElement(
        "cropInfoButton"
    );

    hideElement(
        "viewCropInfo"
    );
}


// ============================================================
// RESET ANALYSIS
// ============================================================

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
        analysisResult.classList.add("hidden");
    }

    if (emptyResult) {
        emptyResult.classList.remove("hidden");
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


    updateConfidenceBar(0);


    const reliability =
        document.getElementById(
            "reliabilityStatus"
        );


    if (reliability) {

        reliability.textContent =
            "Waiting for analysis";

        reliability.className =
            "reliability-status";
    }


    const alternatives =
        document.getElementById(
            "alternativePredictions"
        );


    if (alternatives) {

        alternatives.innerHTML = "";

        alternatives.classList.add(
            "hidden"
        );
    }


    hideElement(
        "cropInfoButton"
    );

    hideElement(
        "viewCropInfo"
    );
}


// ============================================================
// SCANNER MESSAGE
// ============================================================

function showScannerMessage(
    message,
    type = "info"
) {

    const messageElement =
        document.getElementById(
            "scannerMessage"
        );


    if (!messageElement) {
        return;
    }


    messageElement.textContent =
        message;


    messageElement.className =
        `scanner-message ${type}`;


    messageElement.classList.remove(
        "hidden"
    );
}


// ============================================================
// WEATHER
// ============================================================

function initializeWeather() {

    getOutdoorWeather();


    // Refresh weather every 10 minutes.
    setInterval(() => {

        getOutdoorWeather();

    }, 10 * 60 * 1000);


    const cropSelect =
        document.getElementById(
            "cropSelect"
        );


    if (cropSelect) {

        cropSelect.addEventListener(
            "change",
            updateCropWarning
        );
    }
}


// ============================================================
// GET OUTDOOR WEATHER
// ============================================================

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

            fetchWeather(
                latitude,
                longitude
            );
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


// ============================================================
// FETCH WEATHER
// ============================================================

async function fetchWeather(
    latitude,
    longitude
) {

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

            throw new Error(
                "Weather request failed."
            );
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

        console.error(
            "Weather error:",
            error
        );


        showWeatherError(
            "Weather unavailable"
        );
    }
}


// ============================================================
// WEATHER UI
// ============================================================

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


// ============================================================
// CROP DATABASE
// ============================================================

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
    },

    potato: {

        min: 10,
        max: 25,

        idealMin: 15,
        idealMax: 21
    }
};


// ============================================================
// CROP WARNING
// ============================================================

function updateCropWarning() {

    const cropSelect =
        document.getElementById(
            "cropSelect"
        );

    const cropWarning =
        document.getElementById(
            "cropWarning"
        );


    if (!cropSelect || !cropWarning) {
        return;
    }


    const crop =
        cropSelect.value;


    if (!crop) {

        cropWarning.classList.add(
            "hidden"
        );

        return;
    }


    if (
        outdoorWeather.temperature ===
        null
    ) {

        cropWarning.classList.add(
            "hidden"
        );

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


    cropWarning.classList.remove(
        "hidden"
    );


    setText(
        "warningTitle",
        title
    );


    setText(
        "warningMessage",
        message
    );
}


// ============================================================
// CROP HELPERS
// ============================================================

function isSupportedCrop(crop) {

    const normalized =
        normalizeCropName(crop);


    return [
        "tomato",
        "pepper",
        "potato"
    ].includes(
        normalized
    );
}


function normalizeCropName(crop) {

    if (!crop) {
        return "";
    }


    return crop
        .toString()
        .trim()
        .toLowerCase()
        .replace("pepper,_bell", "pepper")
        .replace("bell pepper", "pepper")
        .replace("_", " ");
}


function capitalize(text) {

    if (!text) {
        return "";
    }


    return text.charAt(0).toUpperCase() +
        text.slice(1);
}


// ============================================================
// FORMATTING HELPERS
// ============================================================

function formatConfidence(value) {

    const number =
        Number(value);


    if (!Number.isFinite(number)) {
        return "0%";
    }


    return `${number.toFixed(1)}%`;
}


function formatQuality(value) {

    if (!value) {
        return "not provided";
    }


    if (typeof value === "string") {
        return value;
    }


    if (
        typeof value === "object"
    ) {

        return (
            value.status ||
            value.label ||
            value.score ||
            "checked"
        );
    }


    return String(value);
}


// ============================================================
// UI HELPERS
// ============================================================

function setText(
    id,
    value
) {

    const element =
        document.getElementById(id);


    if (element) {

        element.textContent =
            value;
    }
}


function hideElement(id) {

    const element =
        document.getElementById(id);


    if (element) {

        element.classList.add(
            "hidden"
        );
    }
}


function showElement(id) {

    const element =
        document.getElementById(id);


    if (element) {

        element.classList.remove(
            "hidden"
        );
    }
}


// ============================================================
// NUMBER HELPERS
// ============================================================

function randomNumber(
    min,
    max
) {

    return Math.floor(
        Math.random() *
        (max - min + 1)
    ) + min;
}


function clamp(
    value,
    min,
    max
) {

    return Math.min(
        Math.max(
            value,
            min
        ),
        max
    );
}


// ============================================================
// DEBUG HELPERS
// ============================================================

window.smartGreenhouseAI = {

    getCurrentPrediction() {

        return currentPrediction;
    },

    getCurrentImage() {

        return currentImageFile;
    },

    analyze() {

        return analyzePlantImage();
    },

    resetScanner() {

        clearSelectedImage();
    },

    api: API_BASE_URL
};