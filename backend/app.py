from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from PIL import Image
from io import BytesIO

import os
import requests


# ============================================================
# LOAD ENVIRONMENT
# ============================================================

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
ENV_PATH = os.path.join(BASE_DIR, "..", ".env")

load_dotenv(ENV_PATH)

PLANTNET_API_KEY = os.getenv("PLANTNET_API_KEY")


# ============================================================
# FASTAPI APP
# ============================================================

app = FastAPI(
    title="Smart Greenhouse AI",
    version="3.0"
)


# ============================================================
# CORS
# ============================================================

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ============================================================
# PLANTNET
# ============================================================

PLANTNET_PROJECT = "all"

PLANTNET_URL = (
    f"https://my-api.plantnet.org/v2/identify/"
    f"{PLANTNET_PROJECT}"
)


# ============================================================
# STARTUP
# ============================================================

@app.on_event("startup")
def startup():

    if PLANTNET_API_KEY:
        print("========================================")
        print("Pl@ntNet API key loaded successfully!")
        print("========================================")
    else:
        print("WARNING: PLANTNET_API_KEY NOT FOUND!")

    print()
    print("SMART GREENHOUSE AI READY")
    print()
    print("GET  /")
    print("GET  /health")
    print("POST /predict")
    print()


# ============================================================
# HOME
# ============================================================

@app.get("/")
def home():

    return {
        "status": "online",
        "message": "Smart Greenhouse AI API is running!",
        "version": "3.0",
        "ai_engine": "Pl@ntNet",
        "project": PLANTNET_PROJECT
    }


# ============================================================
# HEALTH CHECK
# ============================================================

@app.get("/health")
def health():

    return {
        "status": "healthy",
        "plantnet_configured": bool(PLANTNET_API_KEY)
    }


# ============================================================
# PLANT IDENTIFICATION
# ============================================================

@app.post("/predict")
async def predict(
    file: UploadFile = File(...)
):

    # --------------------------------------------------------
    # API KEY
    # --------------------------------------------------------

    if not PLANTNET_API_KEY:

        raise HTTPException(
            status_code=500,
            detail="Pl@ntNet API key is not configured."
        )


    # --------------------------------------------------------
    # READ IMAGE
    # --------------------------------------------------------

    try:

        image_data = await file.read()

        if len(image_data) == 0:

            raise HTTPException(
                status_code=400,
                detail="The uploaded image is empty."
            )


        # Maximum upload size
        if len(image_data) > 20 * 1024 * 1024:

            raise HTTPException(
                status_code=400,
                detail="Image must be smaller than 20 MB."
            )


        # ----------------------------------------------------
        # OPEN IMAGE
        # ----------------------------------------------------

        image = Image.open(
            BytesIO(image_data)
        )


        # ----------------------------------------------------
        # CONVERT TO RGB
        # ----------------------------------------------------

        if image.mode != "RGB":

            image = image.convert("RGB")


        # ----------------------------------------------------
        # CONVERT EVERYTHING TO JPEG
        # ----------------------------------------------------

        jpeg_buffer = BytesIO()

        image.save(
            jpeg_buffer,
            format="JPEG",
            quality=90
        )

        jpeg_buffer.seek(0)

        jpeg_data = jpeg_buffer.read()


    except HTTPException:

        raise


    except Exception as error:

        print("Image processing error:", error)

        raise HTTPException(
            status_code=400,
            detail="The uploaded file is not a valid image."
        )


    # --------------------------------------------------------
    # SEND IMAGE TO PLANTNET
    # --------------------------------------------------------

    files = [
        (
            "images",
            (
                "plant.jpg",
                jpeg_data,
                "image/jpeg"
            )
        )
    ]


    params = {
        "api-key": PLANTNET_API_KEY,
        "lang": "en",
        "nb-results": 5,
        "detailed": "true"
    }


    try:

        response = requests.post(
            PLANTNET_URL,
            params=params,
            files=files,
            timeout=60
        )


    except requests.exceptions.Timeout:

        raise HTTPException(
            status_code=504,
            detail="Pl@ntNet request timed out."
        )


    except requests.exceptions.RequestException as error:

        print("Pl@ntNet connection error:", error)

        raise HTTPException(
            status_code=502,
            detail="Could not connect to Pl@ntNet."
        )


    # --------------------------------------------------------
    # HANDLE PLANTNET ERROR
    # --------------------------------------------------------

    if response.status_code != 200:

        print()
        print("========== PLANTNET ERROR ==========")
        print("Status:", response.status_code)
        print("Response:", response.text)
        print("====================================")
        print()

        try:

            error_data = response.json()

        except Exception:

            error_data = {
                "message": response.text
            }


        raise HTTPException(
            status_code=response.status_code,
            detail=error_data
        )


    # --------------------------------------------------------
    # PARSE RESULT
    # --------------------------------------------------------

    result = response.json()


    # --------------------------------------------------------
    # RETURN RESULT
    # --------------------------------------------------------

    return {

        "success": True,

        "source": "Pl@ntNet",

        "bestMatch": result.get(
            "bestMatch"
        ),

        "predictedOrgans": result.get(
            "predictedOrgans",
            []
        ),

        "results": result.get(
            "results",
            []
        ),

        "otherResults": result.get(
            "otherResults",
            {}
        ),

        "remainingRequests": result.get(
            "remainingIdentificationRequests"
        ),

        "version": result.get(
            "version"
        )
    }