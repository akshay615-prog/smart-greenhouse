import os
import numpy as np
import tensorflow as tf

from datasets import load_dataset, concatenate_datasets


# ==========================================
# SMART GREENHOUSE AI
# PLANTVILLAGE CROP CLASSIFIER
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
    "Potato": 2,
}

ID_TO_CROP = {
    0: "Tomato",
    1: "Pepper",
    2: "Potato",
}


# ==========================================
# START
# ==========================================

print("=" * 50)
print("        SMART GREENHOUSE AI")
print("=" * 50)

print("\nSupported crops:")

for crop_id, crop_name in ID_TO_CROP.items():
    print(f"{crop_id}: {crop_name}")


# ==========================================
# LOAD PLANTVILLAGE DATASET
# ==========================================

print("\n" + "=" * 50)
print("LOADING PLANTVILLAGE DATASET")
print("=" * 50)

print("\nThe first download can take some time...\n")

# Use the default configuration.
# This avoids the old "BuilderConfig color not found" error.
dataset = load_dataset(
    "mohanty/PlantVillage"
)

print("\nDataset loaded successfully!")
print(dataset)


# ==========================================
# ADD CROP ID
# ==========================================

def add_crop_id(example):
    return {
        "crop_id": CROP_TO_ID.get(
            example["crop"],
            -1
        )
    }


print("\nAdding crop labels...")

train_data = dataset["train"].map(
    add_crop_id
)

test_data = dataset["test"].map(
    add_crop_id
)


# ==========================================
# FILTER CROPS
# ==========================================

print("\nFiltering dataset...")

train_data = train_data.filter(
    lambda example: example["crop_id"] >= 0
)

test_data = test_data.filter(
    lambda example: example["crop_id"] >= 0
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

        crop_data = data.filter(
            lambda example, cid=crop_id:
            example["crop_id"] == cid
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

        print(
            f"Crop {crop_id}: {count} images"
        )

        parts.append(crop_data)

    return concatenate_datasets(
        parts
    ).shuffle(seed=42)


print("\n" + "=" * 50)
print("CREATING BALANCED DATASET")
print("=" * 50)

train_data = limit_per_class(
    train_data,
    MAX_TRAIN_PER_CLASS
)

test_data = limit_per_class(
    test_data,
    MAX_TEST_PER_CLASS
)

print(
    "\nTotal training images:",
    len(train_data)
)

print(
    "Total testing images:",
    len(test_data)
)


# ==========================================
# IMAGE PREPARATION
# ==========================================

def prepare_image(image):

    image = image.convert("RGB")

    image = np.array(
        image,
        dtype=np.float32
    )

    image = tf.image.resize(
        image,
        (IMG_SIZE, IMG_SIZE)
    )

    image = tf.keras.applications.mobilenet_v2.preprocess_input(
        image
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

                example = data[
                    int(index)
                ]

                image = prepare_image(
                    example["image"]
                )

                label = example[
                    "crop_id"
                ]

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
# MOBILE NET V2
# ==========================================

print("\n" + "=" * 50)
print("CREATING MOBILENETV2 MODEL")
print("=" * 50)

base_model = tf.keras.applications.MobileNetV2(
    input_shape=(
        IMG_SIZE,
        IMG_SIZE,
        3
    ),
    include_top=False,
    weights="imagenet"
)

base_model.trainable = False


# ==========================================
# MODEL
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
# COMPILE
# ==========================================

model.compile(

    optimizer=tf.keras.optimizers.Adam(
        learning_rate=0.001
    ),

    loss="sparse_categorical_crossentropy",

    metrics=["accuracy"]
)

print("\nModel created successfully!")

model.summary()


# ==========================================
# TRAIN
# ==========================================

print("\n" + "=" * 50)
print("STARTING AI TRAINING")
print("=" * 50)

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

print("\n" + "=" * 50)
print("SAVING MODEL")
print("=" * 50)

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

print("\n" + "=" * 50)
print("TRAINING COMPLETED!")
print("=" * 50)

print("\nModel saved to:")
print(MODEL_PATH)

print("\nLabels saved to:")
print(LABELS_PATH)

print("\nSupported crops:")

for crop_id in range(3):

    print(
        f"{crop_id}: {ID_TO_CROP[crop_id]}"
    )

print("\nYour Smart Greenhouse AI model is ready!")