# model.py
import os
import pickle
import numpy as np
import pandas as pd
from sklearn.naive_bayes import MultinomialNB
from sklearn.preprocessing import LabelEncoder
from config import TRAINING_FILE, MODEL_PATH, MODEL_FILE, LABEL_ENCODER_FILE, SYMPTOM_COLUMNS_FILE

# Global variables
model = None
label_encoder = None
symptom_columns = []


def train_model():
    """Train Naive Bayes model and save to disk"""
    global model, label_encoder, symptom_columns
    try:
        df = pd.read_csv(TRAINING_FILE)
        symptom_columns = [col for col in df.columns if col != 'prognosis']
        X = df[symptom_columns]
        y = df['prognosis']

        label_encoder = LabelEncoder()
        y_encoded = label_encoder.fit_transform(y)

        model = MultinomialNB()
        model.fit(X, y_encoded)

        os.makedirs(MODEL_PATH, exist_ok=True)
        with open(MODEL_FILE, 'wb') as f: pickle.dump(model, f)
        with open(LABEL_ENCODER_FILE, 'wb') as f: pickle.dump(label_encoder, f)
        with open(SYMPTOM_COLUMNS_FILE, 'wb') as f: pickle.dump(symptom_columns, f)

        print(f"[Model] Training completed. Diseases: {len(label_encoder.classes_)}, Symptoms: {len(symptom_columns)}")
        return True
    except Exception as e:
        print(f"[Model] Training failed: {e}")
        return False


def load_model():
    """Load trained model, encoder, and symptom columns"""
    global model, label_encoder, symptom_columns
    try:
        with open(MODEL_FILE, 'rb') as f: model = pickle.load(f)
        with open(LABEL_ENCODER_FILE, 'rb') as f: label_encoder = pickle.load(f)
        with open(SYMPTOM_COLUMNS_FILE, 'rb') as f: symptom_columns = pickle.load(f)
        print("[Model] Loaded existing model successfully")
        return True
    except Exception:
        print("[Model] Model not found. Training a new model...")
        return train_model()


def predict(symptoms):
    """Predict disease given a list of normalized symptoms"""
    if not model or not label_encoder:
        raise Exception("Model is not loaded")

    input_vector = np.zeros(len(symptom_columns))
    for s in symptoms:
        if s in symptom_columns:
            input_vector[symptom_columns.index(s)] = 1
    input_vector = input_vector.reshape(1, -1)

    prediction = model.predict(input_vector)
    return label_encoder.inverse_transform(prediction)[0]
