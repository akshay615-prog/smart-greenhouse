import os
import numpy as np
import tensorflow as tf
from datasets import load_dataset, concatenate_datasets


# ==========================================
# SETTINGS
# ==========================================

IMG_SIZE = 224
BATCH_SIZE = 32
EPOCHS = 5

MAX_TRAIN_PER_CLASS = 1500
MAX_TEST_PER_CLASS = 400


# ==========================================
# PATHS
# ==========================================

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

MODEL_DIR = os.path.join(BASE_DIR, "model")
MODEL_PATH = os.path.join(MODEL_DIR, "crop_model.keras")
LABELS_PATH = os.path.join(BASE_DIR, "labels.txt")

os.makedirs(MODEL_DIR, exist_ok=True)


# ==========================================
# CROP LABELS
# ==========================================

CROP_TO_ID = {
    "Tomato": 0,
    "Pepper,_bell": 1,
    "Potato": 2
}

ID_TO_CROP = {
    0: "Tomato",
    1: "Pepper",
    2: "Potato"
}


# ==========================================
# START
# ==========================================

print("======================================")
print("       SMART GREENHOUSE AI")
print("======================================")

print("\nLoading PlantVillage dataset...")
print("The first download can take some time.\n")


# ==========================================
# LOAD DATASET
# ==========================================

dataset = load_dataset(
    "mohanty/PlantVillage"
)

print("\nDataset loaded successfully!")
print(dataset)


# ==========================================
# ADD CROP ID
# ==========================================

def add_crop_id(example):
    crop = example["crop"]

    return {
        "crop_id": CROP_TO_ID.get(crop, -1)
    }


print("\nFiltering Tomato, Pepper and Potato...")


train_data = dataset["train"].map(
    add_crop_id
)

test_data = dataset["test"].map(
    add_crop_id
)


train_data = train_data.filter(
    lambda x: x["crop_id"] >= 0
)

test_data = test_data.filter(
    lambda x: x["crop_id"] >= 0
)


print(
    "Filtered training images:",
    len(train_data)
)

print(
    "Filtered testing images:",
    len(test_data)
)


# ==========================================
# BALANCE DATASET
# ==========================================

def limit_per_class(data, maximum):

    parts = []

    for crop_id in range(3):

        print(
            f"Preparing class: {ID_TO_CROP[crop_id]}"
        )

        crop_data = data.filter(
            lambda x, cid=crop_id:
            x["crop_id"] == cid
        )

        count = min(
            len(crop_data),
            maximum
        )

        crop_data = (
            crop_data
            .shuffle(seed=42)
            .select(range(count))
        )

        parts.append(crop_data)

    combined = concatenate_datasets(parts)

    return combined.shuffle(seed=42)


print("\nCreating balanced training dataset...")


train_data = limit_per_class(
    train_data,
    MAX_TRAIN_PER_CLASS
)

test_data = limit_per_class(
    test_data,
    MAX_TEST_PER_CLASS
)


print(
    "\nTraining images:",
    len(train_data)
)

print(
    "Testing images:",
    len(test_data)
)


# ==========================================
# IMAGE PREPARATION
# ==========================================

def prepare_image(image):

    # Convert image to RGB
    image = image.convert("RGB")

    # Convert PIL image to NumPy
    image = np.array(image)

    # Resize to MobileNetV2 input size
    image = tf.image.resize(
        image,
        (IMG_SIZE, IMG_SIZE)
    )

    # Convert to float32
    image = tf.cast(
        image,
        tf.float32
    )

    # MobileNetV2 preprocessing
    image = (
        tf.keras.applications
        .mobilenet_v2
        .preprocess_input(image)
    )

    return image.numpy()


# ==========================================
# DATA GENERATOR
# ==========================================

def make_generator(data):

    def generator():

        indexes = np.arange(
            len(data)
        )

        np.random.shuffle(indexes)

        for start in range(
            0,
            len(indexes),
            BATCH_SIZE
        ):

            batch_indexes = indexes[
                start:start + BATCH_SIZE
            ]

            images = []
            labels = []

            for index in batch_indexes:

                example = data[int(index)]

                image = prepare_image(
                    example["image"]
                )

                label = example["crop_id"]

                images.append(image)
                labels.append(label)

            yield (
                np.array(
                    images,
                    dtype=np.float32
                ),
                np.array(
                    labels,
                    dtype=np.int32
                )
            )

    return generator


# ==========================================
# GENERATORS
# ==========================================

train_generator = make_generator(
    train_data
)

test_generator = make_generator(
    test_data
)


train_steps = int(
    np.ceil(
        len(train_data) / BATCH_SIZE
    )
)

test_steps = int(
    np.ceil(
        len(test_data) / BATCH_SIZE
    )
)


print("\nTraining steps:", train_steps)
print("Testing steps:", test_steps)


# ==========================================
# CREATE MOBILENETV2
# ==========================================

print("\nCreating MobileNetV2 model...")


base_model = tf.keras.applications.MobileNetV2(
    input_shape=(
        IMG_SIZE,
        IMG_SIZE,
        3
    ),
    include_top=False,
    weights="imagenet"
)


# Freeze pretrained layers
base_model.trainable = False


# ==========================================
# BUILD MODEL
# ==========================================

model = tf.keras.Sequential([

    base_model,

    tf.keras.layers.GlobalAveragePooling2D(),

    tf.keras.layers.Dense(
        128,
        activation="relu"
    ),

    tf.keras.layers.Dropout(
        0.3
    ),

    tf.keras.layers.Dense(
        3,
        activation="softmax"
    )
])


# ==========================================
# COMPILE MODEL
# ==========================================

model.compile(

    optimizer=tf.keras.optimizers.Adam(
        learning_rate=0.001
    ),

    loss="sparse_categorical_crossentropy",

    metrics=[
        "accuracy"
    ]
)


print("\nModel created successfully!")


# ==========================================
# TRAIN MODEL
# ==========================================

print("\n======================================")
print("          STARTING TRAINING")
print("======================================\n")


history = model.fit(

    train_generator(),

    steps_per_epoch=train_steps,

    epochs=EPOCHS,

    validation_data=test_generator(),

    validation_steps=test_steps
)


# ==========================================
# SAVE MODEL
# ==========================================

print("\n======================================")
print("             SAVING MODEL")
print("======================================")


model.save(
    MODEL_PATH
)


# ==========================================
# SAVE LABELS
# ==========================================

with open(
    LABELS_PATH,
    "w",
    encoding="utf-8"
) as file:

    for crop_id in range(3):

        file.write(
            ID_TO_CROP[crop_id] + "\n"
        )


# ==========================================
# FINISHED
# ==========================================

print("\n======================================")
print("       TRAINING COMPLETED!")
print("======================================")

print("\nModel saved to:")
print(MODEL_PATH)

print("\nLabels saved to:")
print(LABELS_PATH)

print("\nSupported crops:")

for crop_id in range(3):

    print(
        f"{crop_id}: {ID_TO_CROP[crop_id]}"
    )

print("\nYour AI model is ready! 🚀")