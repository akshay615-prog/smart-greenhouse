import os
import json
import tensorflow as tf

from tensorflow.keras import layers, models
from tensorflow.keras.applications import MobileNetV2
from tensorflow.keras.applications.mobilenet_v2 import preprocess_input


DATASET_DIR = "dataset"
MODEL_DIR = "model"

IMAGE_SIZE = (224, 224)
BATCH_SIZE = 32
SEED = 123


os.makedirs(MODEL_DIR, exist_ok=True)


print("\nLoading crop dataset...\n")


train_dataset = tf.keras.utils.image_dataset_from_directory(
    DATASET_DIR,
    validation_split=0.2,
    subset="training",
    seed=SEED,
    image_size=IMAGE_SIZE,
    batch_size=BATCH_SIZE
)


validation_dataset = tf.keras.utils.image_dataset_from_directory(
    DATASET_DIR,
    validation_split=0.2,
    subset="validation",
    seed=SEED,
    image_size=IMAGE_SIZE,
    batch_size=BATCH_SIZE
)


class_names = train_dataset.class_names


print("\nCrops detected:")

for i, name in enumerate(class_names):
    print(i, "->", name)


labels_path = os.path.join(
    MODEL_DIR,
    "labels.json"
)


with open(labels_path, "w") as file:

    json.dump(
        class_names,
        file,
        indent=4
    )


AUTOTUNE = tf.data.AUTOTUNE

train_dataset = train_dataset.prefetch(
    AUTOTUNE
)

validation_dataset = validation_dataset.prefetch(
    AUTOTUNE
)


data_augmentation = tf.keras.Sequential([

    layers.RandomFlip("horizontal"),

    layers.RandomRotation(0.15),

    layers.RandomZoom(0.15),

    layers.RandomContrast(0.1)

])


base_model = MobileNetV2(

    input_shape=(224, 224, 3),

    include_top=False,

    weights="imagenet"

)


base_model.trainable = False


inputs = layers.Input(
    shape=(224, 224, 3)
)


x = data_augmentation(inputs)

x = preprocess_input(x)

x = base_model(
    x,
    training=False
)

x = layers.GlobalAveragePooling2D()(x)

x = layers.Dropout(0.3)(x)


outputs = layers.Dense(
    len(class_names),
    activation="softmax"
)(x)


model = models.Model(
    inputs,
    outputs
)


model.compile(

    optimizer=tf.keras.optimizers.Adam(
        learning_rate=0.001
    ),

    loss="sparse_categorical_crossentropy",

    metrics=["accuracy"]

)


print("\n================================")
print("STARTING AI TRAINING")
print("================================\n")


model.fit(

    train_dataset,

    validation_data=validation_dataset,

    epochs=10

)


model_path = os.path.join(
    MODEL_DIR,
    "crop_model.keras"
)


model.save(model_path)


print("\n================================")
print("AI TRAINING COMPLETE")
print("================================")

print(
    "Model saved:",
    model_path
)

print(
    "Labels saved:",
    labels_path
)