from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import numpy as np
from sklearn.naive_bayes import MultinomialNB
from sklearn.preprocessing import LabelEncoder
import pickle
import os

app = Flask(__name__)
CORS(app)

# Global variables for model and data
model = None
label_encoder = None
symptom_columns = []
disease_info = {}

def load_disease_info():
    """Load disease descriptions, precautions, and specialist information"""
    global disease_info
    
    try:
        # Load descriptions
        descriptions_df = pd.read_csv('dataset/symptom_Description.csv')
        precautions_df = pd.read_csv('dataset/symptom_precaution.csv')
        
        disease_info = {}
        
        # Process descriptions
        for _, row in descriptions_df.iterrows():
            disease = row['Disease'].strip()
            disease_info[disease] = {
                'description': row['Description'].strip(),
                'precautions': [],
                'specialize': get_specialist(disease)
            }
        
        # Process precautions
        for _, row in precautions_df.iterrows():
            disease = row['Disease'].strip()
            precautions = []
            for i in range(1, 5):
                col_name = f'Precaution_{i}'
                if col_name in row and pd.notna(row[col_name]):
                    precautions.append(row[col_name].strip())
            
            if disease in disease_info:
                disease_info[disease]['precautions'] = precautions
        
        print(f"Loaded info for {len(disease_info)} diseases")
        
    except Exception as e:
        print(f"Error loading disease info: {str(e)}")
        disease_info = {}

def get_specialist(disease):
    """Map diseases to medical specialists"""
    specialist_mapping = {
        'Fungal infection': 'Dermatologist',
        'Allergy': 'Allergist',
        'GERD': 'Gastroenterologist',
        'Chronic cholestasis': 'Hepatologist',
        'Drug Reaction': 'Allergist',
        'Peptic ulcer diseae': 'Gastroenterologist',
        'AIDS': 'Infectious Disease Specialist',
        'Diabetes': 'Endocrinologist',
        'Gastroenteritis': 'Gastroenterologist',
        'Bronchial Asthma': 'Pulmonologist',
        'Hypertension': 'Cardiologist',
        'Migraine': 'Neurologist',
        'Cervical spondylosis': 'Orthopedic Surgeon',
        'Paralysis (brain hemorrhage)': 'Neurologist',
        'Jaundice': 'Hepatologist',
        'Malaria': 'Infectious Disease Specialist',
        'Chicken pox': 'General Physician',
        'Dengue': 'Infectious Disease Specialist',
        'Typhoid': 'Infectious Disease Specialist',
        'hepatitis A': 'Hepatologist',
        'Hepatitis B': 'Hepatologist',
        'Hepatitis C': 'Hepatologist',
        'Hepatitis D': 'Hepatologist',
        'Hepatitis E': 'Hepatologist',
        'Alcoholic hepatitis': 'Hepatologist',
        'Tuberculosis': 'Pulmonologist',
        'Common Cold': 'General Physician',
        'Pneumonia': 'Pulmonologist',
        'Dimorphic hemmorhoids(piles)': 'Proctologist',
        'Heart attack': 'Cardiologist',
        'Varicose veins': 'Vascular Surgeon',
        'Hypothyroidism': 'Endocrinologist',
        'Hyperthyroidism': 'Endocrinologist',
        'Hypoglycemia': 'Endocrinologist',
        'Osteoarthristis': 'Rheumatologist',
        'Arthritis': 'Rheumatologist',
        '(vertigo) Paroymsal  Positional Vertigo': 'ENT Specialist',
        'Acne': 'Dermatologist',
        'Urinary tract infection': 'Urologist',
        'Psoriasis': 'Dermatologist',
        'Impetigo': 'Dermatologist'
    }
    
    return specialist_mapping.get(disease, 'General Physician')

def train_model():
    """Train the Naive Bayes model"""
    global model, label_encoder, symptom_columns
    
    try:
        # Load training data
        df = pd.read_csv('dataset/Training.csv')
        
        # Get symptom columns (all columns except 'prognosis')
        symptom_columns = [col for col in df.columns if col != 'prognosis']
        
        # Prepare features and labels
        X = df[symptom_columns]
        y = df['prognosis']
        
        # Encode labels
        label_encoder = LabelEncoder()
        y_encoded = label_encoder.fit_transform(y)
        
        # Train Naive Bayes model
        model = MultinomialNB()
        model.fit(X, y_encoded)
        
        # Save the model
        os.makedirs('models', exist_ok=True)
        with open('models/naive_bayes_model.pkl', 'wb') as f:
            pickle.dump(model, f)
        with open('models/label_encoder.pkl', 'wb') as f:
            pickle.dump(label_encoder, f)
        with open('models/symptom_columns.pkl', 'wb') as f:
            pickle.dump(symptom_columns, f)
        
        print("Model trained successfully!")
        print(f"Number of symptoms: {len(symptom_columns)}")
        print(f"Number of diseases: {len(label_encoder.classes_)}")
        
        return True
        
    except Exception as e:
        print(f"Error training model: {str(e)}")
        return False

def load_model():
    """Load the trained model"""
    global model, label_encoder, symptom_columns
    
    try:
        with open('models/naive_bayes_model.pkl', 'rb') as f:
            model = pickle.load(f)
        with open('models/label_encoder.pkl', 'rb') as f:
            label_encoder = pickle.load(f)
        with open('models/symptom_columns.pkl', 'rb') as f:
            symptom_columns = pickle.load(f)
        
        print("Model loaded successfully!")
        return True
        
    except Exception as e:
        print(f"Model not found. Training new model...")
        return train_model()

def normalize_symptom(symptom):
    """Normalize symptom name to match dataset format"""
    if not symptom:
        return None
    
    # Convert to lowercase and replace spaces with underscores
    normalized = symptom.strip().lower().replace(' ', '_')
    
    # Find matching column in symptom_columns
    for col in symptom_columns:
        if col.lower() == normalized:
            return col
    
    return None

@app.route('/diseasepredict', methods=['POST'])
def predict_disease():
    """Predict disease based on symptoms"""
    try:
        data = request.json
        
        # Get symptoms from request
        symptom1 = data.get('symptom1', {}).get('value', '')
        symptom2 = data.get('symptom2', {}).get('value', '')
        symptom3 = data.get('symptom3', {}).get('value', '')
        
        # Validate input
        if not symptom1 or not symptom2 or not symptom3:
            return jsonify({
                'error': 'Please provide all three symptoms'
            }), 400
        
        # Normalize symptoms
        norm_symptom1 = normalize_symptom(symptom1)
        norm_symptom2 = normalize_symptom(symptom2)
        norm_symptom3 = normalize_symptom(symptom3)
        
        if not all([norm_symptom1, norm_symptom2, norm_symptom3]):
            return jsonify({
                'error': 'One or more symptoms not recognized'
            }), 400
        
        # Create input vector
        input_vector = np.zeros(len(symptom_columns))
        
        # Set symptoms to 1
        if norm_symptom1 in symptom_columns:
            input_vector[symptom_columns.index(norm_symptom1)] = 1
        if norm_symptom2 in symptom_columns:
            input_vector[symptom_columns.index(norm_symptom2)] = 1
        if norm_symptom3 in symptom_columns:
            input_vector[symptom_columns.index(norm_symptom3)] = 1
        
        # Reshape for prediction
        input_vector = input_vector.reshape(1, -1)
        
        # Make prediction
        prediction = model.predict(input_vector)
        disease = label_encoder.inverse_transform(prediction)[0]
        
        # Get disease information
        info = disease_info.get(disease, {
            'description': 'No description available.',
            'precautions': ['Consult a doctor for proper diagnosis and treatment.'],
            'specialize': 'General Physician'
        })
        
        # Format precautions as a string
        precautions_text = ' '.join([f"{i+1}. {p}" for i, p in enumerate(info['precautions'])])
        
        response = {
            'prediction': disease,
            'description': info['description'],
            'precautions': precautions_text,
            'specialize': info['specialize']
        }
        
        return jsonify(response), 200
        
    except Exception as e:
        print(f"Prediction error: {str(e)}")
        return jsonify({
            'error': f'Error making prediction: {str(e)}'
        }), 500

@app.route('/health', methods=['GET'])
def health_check():
    """Robust health check endpoint"""

    # Check if the model is loaded
    model_ok = model is not None
    label_encoder_ok = label_encoder is not None
    symptoms_ok = len(symptom_columns) > 0
    disease_info_ok = len(disease_info) > 0

    # Overall status
    if all([model_ok, label_encoder_ok, symptoms_ok, disease_info_ok]):
        status = 'healthy'
    else:
        status = 'unhealthy'

    return jsonify({
        'status': status,
        'model_loaded': model_ok,
        'label_encoder_loaded': label_encoder_ok,
        'disease_info_loaded': disease_info_ok
    }), 200

@app.route('/symptoms', methods=['GET'])
def get_symptoms():
    """Get list of all available symptoms"""
    try:
        # Convert symptom column names to readable format
        readable_symptoms = [
            col.replace('_', ' ').title() 
            for col in symptom_columns
        ]
        
        return jsonify({
            'symptoms': sorted(readable_symptoms)
        }), 200
        
    except Exception as e:
        return jsonify({
            'error': f'Error fetching symptoms: {str(e)}'
        }), 500

if __name__ == '__main__':
    print("Starting Flask application...")
    
    # Load disease information
    load_disease_info()
    
    # Load or train model
    load_model()
    
    # Run the app
    app.run(debug=True, host='0.0.0.0', port=5000)