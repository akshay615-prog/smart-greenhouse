import os

import numpy as np
import tensorflow as tf

from PIL import Image
from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware


# ==========================================
# PATHS
# ==========================================

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

MODEL_PATH = os.path.join(
    BASE_DIR,
    "model",
    "crop_model.keras"
)

LABELS_PATH = os.path.join(
    BASE_DIR,
    "labels.txt"
)


# ==========================================
# SETTINGS
# ==========================================

IMG_SIZE = 224


# ==========================================
# LOAD MODEL
# ==========================================

print("======================================")
print("       SMART GREENHOUSE AI API")
print("======================================")

print("\nLoading AI model...")

model = tf.keras.models.load_model(MODEL_PATH)

print("AI model loaded successfully!")


# ==========================================
# LOAD LABELS
# ==========================================

with open(LABELS_PATH, "r", encoding="utf-8") as file:
    labels = [
        line.strip()
        for line in file
        if line.strip()
    ]

print("Labels:", labels)


# ==========================================
# FASTAPI APP
# ==========================================

app = FastAPI(
    title="Smart Greenhouse AI",
    description="AI crop identification API",
    version="1.0"
)


# ==========================================
# CORS
# ==========================================

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://127.0.0.1:5500",
        "http://localhost:5500"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ==========================================
# HEALTH CHECK
# ==========================================

@app.get("/")
def home():
    return {
        "status": "online",
        "message": "Smart Greenhouse AI API is running!",
        "supported_crops": labels
    }


# ==========================================
# IMAGE PREPROCESSING
# ==========================================

def prepare_image(image: Image.Image):

    image = image.convert("RGB")

    image = image.resize(
        (IMG_SIZE, IMG_SIZE)
    )

    image = np.array(
        image,
        dtype=np.float32
    )

    # Same preprocessing used during training
    image = tf.keras.applications.mobilenet_v2.preprocess_input(
        image
    )

    image = np.expand_dims(
        image,
        axis=0
    )

    return image


# ==========================================
# PREDICTION
# ==========================================

@app.post("/predict")
async def predict(
    file: UploadFile = File(...)
):

    try:

        print("\n======================================")
        print("NEW IMAGE RECEIVED")
        print("Filename:", file.filename)
        print("======================================")

        # Read uploaded image
        image_bytes = await file.read()

        # Convert bytes to PIL image
        from io import BytesIO

        image = Image.open(
            BytesIO(image_bytes)
        )

        print("Image loaded successfully!")

        # Prepare image
        processed_image = prepare_image(
            image
        )

        # AI prediction
        prediction = model.predict(
            processed_image,
            verbose=0
        )[0]

        # Get highest probability
        top_index = int(
            np.argmax(prediction)
        )

        top_crop = labels[top_index]

        top_probability = float(
            prediction[top_index] * 100
        )

        # Create probability results
        probabilities = {}

        for index, label in enumerate(labels):

            probabilities[label] = round(
                float(prediction[index] * 100),
                2
            )

        print("\nAI RESULT")
        print("Crop:", top_crop)
        print(
            "Confidence:",
            round(top_probability, 2),
            "%"
        )

        print("\nAll probabilities:")

        for crop, probability in probabilities.items():
            print(
                f"{crop}: {probability}%"
            )

        # Return result to website
        return {
            "success": True,
            "crop": top_crop,
            "confidence": round(
                top_probability,
                2
            ),
            "probabilities": probabilities
        }

    except Exception as error:

        print("\nERROR:")
        print(error)

        return {
            "success": False,
            "error": str(error)
        }