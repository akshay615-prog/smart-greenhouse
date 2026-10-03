import os
import random
import numpy as np
import tensorflow as tf

# ==========================================
# SMART GREENHOUSE AI
# Local PlantVillage Training
# ==========================================

IMG_SIZE = 224
BATCH_SIZE = 32
EPOCHS = 5

TRAIN_PER_CLASS = 1500
TEST_PER_CLASS = 400

DATASET_DIR = r"C:\Users\aksha\Desktop\PlantVillage\raw\color"

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_DIR = os.path.join(BASE_DIR, "model")

MODEL_PATH = os.path.join(MODEL_DIR, "crop_model.keras")
LABELS_PATH = os.path.join(BASE_DIR, "labels.txt")

os.makedirs(MODEL_DIR, exist_ok=True)

# ==========================================
# CROP CLASSES
# ==========================================

CROP_NAMES = [
    "Tomato",
    "Pepper",
    "Potato"
]

print("======================================")
print("       SMART GREENHOUSE AI")
print("======================================")

print("\nDataset:")
print(DATASET_DIR)

print("\nClasses:")
for i, crop in enumerate(CROP_NAMES):
    print(f"{i}: {crop}")


# ==========================================
# FIND IMAGE FILES
# ==========================================

def find_images_for_crop(crop_name):

    files = []

    for folder in os.listdir(DATASET_DIR):

        folder_path = os.path.join(DATASET_DIR, folder)

        if not os.path.isdir(folder_path):
            continue

        # Tomato___healthy, Tomato___Late_blight, etc.
        if crop_name == "Tomato" and folder.startswith("Tomato___"):
            pass

        elif crop_name == "Pepper" and folder.startswith("Pepper,_bell___"):
            pass

        elif crop_name == "Potato" and folder.startswith("Potato___"):
            pass

        else:
            continue

        for filename in os.listdir(folder_path):

            if filename.lower().endswith(
                (".jpg", ".jpeg", ".png")
            ):

                files.append(
                    os.path.join(folder_path, filename)
                )

    return files


# ==========================================
# COLLECT DATA
# ==========================================

print("\n======================================")
print("       COLLECTING IMAGES")
print("======================================")

all_images = []
all_labels = []

for class_id, crop_name in enumerate(CROP_NAMES):

    images = find_images_for_crop(crop_name)

    random.seed(42)
    random.shuffle(images)

    print(
        f"\n{crop_name}: {len(images)} images found"
    )

    # Limit dataset size
    images = images[:TRAIN_PER_CLASS + TEST_PER_CLASS]

    split_point = min(TRAIN_PER_CLASS, len(images))

    train_images = images[:split_point]
    test_images = images[split_point:]

    # If there aren't enough test images,
    # use the remaining images.
    test_images = test_images[:TEST_PER_CLASS]

    for image_path in train_images:

        all_images.append(image_path)
        all_labels.append(class_id)

    print(
        f"  Training images: {len(train_images)}"
    )

    print(
        f"  Testing images: {len(test_images)}"
    )


# ==========================================
# CREATE TRAIN / TEST LISTS
# ==========================================

train_paths = []
train_labels = []

test_paths = []
test_labels = []

for class_id, crop_name in enumerate(CROP_NAMES):

    images = find_images_for_crop(crop_name)

    random.seed(42)
    random.shuffle(images)

    images = images[:TRAIN_PER_CLASS + TEST_PER_CLASS]

    train_images = images[:TRAIN_PER_CLASS]
    test_images = images[
        TRAIN_PER_CLASS:
        TRAIN_PER_CLASS + TEST_PER_CLASS
    ]

    train_paths.extend(train_images)
    train_labels.extend(
        [class_id] * len(train_images)
    )

    test_paths.extend(test_images)
    test_labels.extend(
        [class_id] * len(test_images)
    )


# Shuffle training data
combined = list(zip(train_paths, train_labels))
random.seed(42)
random.shuffle(combined)

train_paths, train_labels = zip(*combined)

train_paths = list(train_paths)
train_labels = list(train_labels)


# ==========================================
# IMAGE LOADING
# ==========================================

def load_image(path, label):

    image = tf.io.read_file(path)

    image = tf.image.decode_image(
        image,
        channels=3,
        expand_animations=False
    )

    image.set_shape([None, None, 3])

    image = tf.image.resize(
        image,
        (IMG_SIZE, IMG_SIZE)
    )

    image = tf.cast(
        image,
        tf.float32
    )

    # MobileNetV2 preprocessing
    image = tf.keras.applications.mobilenet_v2.preprocess_input(
        image
    )

    return image, label


# ==========================================
# CREATE TF DATASETS
# ==========================================

train_dataset = tf.data.Dataset.from_tensor_slices(
    (train_paths, train_labels)
)

train_dataset = train_dataset.map(
    load_image,
    num_parallel_calls=tf.data.AUTOTUNE
)

train_dataset = train_dataset.shuffle(1000)

train_dataset = train_dataset.batch(
    BATCH_SIZE
)

train_dataset = train_dataset.prefetch(
    tf.data.AUTOTUNE
)


test_dataset = tf.data.Dataset.from_tensor_slices(
    (test_paths, test_labels)
)

test_dataset = test_dataset.map(
    load_image,
    num_parallel_calls=tf.data.AUTOTUNE
)

test_dataset = test_dataset.batch(
    BATCH_SIZE
)

test_dataset = test_dataset.prefetch(
    tf.data.AUTOTUNE
)


# ==========================================
# DATA SUMMARY
# ==========================================

print("\n======================================")
print("           DATASET READY")
print("======================================")

print(
    f"\nTotal training images: {len(train_paths)}"
)

print(
    f"Total testing images: {len(test_paths)}"
)

print(
    f"Batch size: {BATCH_SIZE}"
)

print(
    f"Image size: {IMG_SIZE}x{IMG_SIZE}"
)


# ==========================================
# CREATE MODEL
# ==========================================

print("\n======================================")
print("       CREATING AI MODEL")
print("======================================")

base_model = tf.keras.applications.MobileNetV2(
    input_shape=(IMG_SIZE, IMG_SIZE, 3),
    include_top=False,
    weights="imagenet"
)

base_model.trainable = False


model = tf.keras.Sequential([

    base_model,

    tf.keras.layers.GlobalAveragePooling2D(),

    tf.keras.layers.Dense(
        128,
        activation="relu"
    ),

    tf.keras.layers.Dropout(0.3),

    tf.keras.layers.Dense(
        3,
        activation="softmax"
    )
])


model.compile(

    optimizer=tf.keras.optimizers.Adam(
        learning_rate=0.001
    ),

    loss="sparse_categorical_crossentropy",

    metrics=["accuracy"]
)


model.summary()


# ==========================================
# TRAIN
# ==========================================

print("\n======================================")
print("          STARTING TRAINING")
print("======================================\n")


history = model.fit(

    train_dataset,

    validation_data=test_dataset,

    epochs=EPOCHS
)


# ==========================================
# SAVE MODEL
# ==========================================

print("\n======================================")
print("             SAVING MODEL")
print("======================================")


model.save(MODEL_PATH)


with open(
    LABELS_PATH,
    "w",
    encoding="utf-8"
) as file:

    for crop in CROP_NAMES:
        file.write(crop + "\n")


print("\nModel saved to:")
print(MODEL_PATH)

print("\nLabels saved to:")
print(LABELS_PATH)


# ==========================================
# FINAL RESULT
# ==========================================

print("\n======================================")
print("       TRAINING COMPLETED!")
print("======================================")

print("\nSupported crops:")

for i, crop in enumerate(CROP_NAMES):

    print(
        f"{i}: {crop}"
    )

print("\nYour real AI crop model is ready! 🚀")