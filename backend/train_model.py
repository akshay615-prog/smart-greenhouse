import os
import tensorflow as tf
import tensorflow_datasets as tfds

IMG_SIZE = 224
BATCH_SIZE = 32
EPOCHS = 5

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_DIR = os.path.join(BASE_DIR, "model")

os.makedirs(MODEL_DIR, exist_ok=True)

MODEL_PATH = os.path.join(MODEL_DIR, "crop_model.keras")
LABELS_PATH = os.path.join(BASE_DIR, "labels.txt")

print("\n==============================")
print("SMART GREENHOUSE AI")
print("==============================")
print("Loading PlantVillage dataset...")

(train_data, val_data), info = tfds.load(
    "plant_village",
    split=["train[:80%]", "train[80%:]"],
    with_info=True,
    shuffle_files=True
)

class_names = info.features["label"].names

print("PlantVillage loaded.")
print("Total classes:", len(class_names))

# Find the classes belonging to our 3 crops
mapping = {}

for i, name in enumerate(class_names):
    if name.startswith("Tomato___"):
        mapping[i] = 0
    elif name.startswith("Pepper,_bell___"):
        mapping[i] = 1
    elif name.startswith("Potato___"):
        mapping[i] = 2

wanted = tf.constant(list(mapping.keys()), dtype=tf.int64)

keys = tf.constant(list(mapping.keys()), dtype=tf.int64)
values = tf.constant(list(mapping.values()), dtype=tf.int64)

table = tf.lookup.StaticHashTable(
    tf.lookup.KeyValueTensorInitializer(keys, values),
    default_value=-1
)

def keep_crop(example):
    label = tf.cast(example["label"], tf.int64)
    return tf.reduce_any(tf.equal(label, wanted))

def prepare(example):
    image = tf.image.resize(
        example["image"],
        (IMG_SIZE, IMG_SIZE)
    )

    image = tf.cast(image, tf.float32)

    image = tf.keras.applications.mobilenet_v2.preprocess_input(
        image
    )

    label = table.lookup(
        tf.cast(example["label"], tf.int64)
    )

    return image, label

train_data = train_data.filter(keep_crop)
val_data = val_data.filter(keep_crop)

train_data = train_data.map(
    prepare,
    num_parallel_calls=tf.data.AUTOTUNE
)

val_data = val_data.map(
    prepare,
    num_parallel_calls=tf.data.AUTOTUNE
)

train_data = train_data.shuffle(5000).batch(
    BATCH_SIZE
).prefetch(tf.data.AUTOTUNE)

val_data = val_data.batch(
    BATCH_SIZE
).prefetch(tf.data.AUTOTUNE)

print("\nCreating AI model...")

base_model = tf.keras.applications.MobileNetV2(
    input_shape=(IMG_SIZE, IMG_SIZE, 3),
    include_top=False,
    weights="imagenet"
)

base_model.trainable = False

model = tf.keras.Sequential([
    base_model,
    tf.keras.layers.GlobalAveragePooling2D(),
    tf.keras.layers.Dense(128, activation="relu"),
    tf.keras.layers.Dropout(0.3),
    tf.keras.layers.Dense(3, activation="softmax")
])

model.compile(
    optimizer="adam",
    loss="sparse_categorical_crossentropy",
    metrics=["accuracy"]
)

print("\n==============================")
print("STARTING TRAINING")
print("==============================")

model.fit(
    train_data,
    validation_data=val_data,
    epochs=EPOCHS
)

print("\nSaving model...")

model.save(MODEL_PATH)

with open(LABELS_PATH, "w", encoding="utf-8") as f:
    f.write("Tomato\n")
    f.write("Pepper\n")
    f.write("Potato\n")

print("\n==============================")
print("AI TRAINING COMPLETE")
print("==============================")
print("Model:", MODEL_PATH)
print("Labels:", LABELS_PATH)
print("==============================")