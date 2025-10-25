# app.py
from flask import Flask, request, jsonify
from flask_cors import CORS
from config import SYMPTOM_DESC_FILE, SYMPTOM_PRECAUTION_FILE
from data_utils import load_disease_info, normalize_symptom
from model import load_model, predict, symptom_columns

app = Flask(__name__)
CORS(app)

# Load disease info and model
disease_info = load_disease_info(SYMPTOM_DESC_FILE, SYMPTOM_PRECAUTION_FILE)
load_model()


@app.route('/diseasepredict', methods=['POST'])
def disease_predict():
    """
    Predict disease based on symptoms.
    Accepts JSON:
    { "symptoms": ["headache", "fever", "cough"] }
    """
    try:
        data = request.json
        if not data or 'symptoms' not in data:
            return jsonify({'error': 'Provide "symptoms" as a list'}), 400

        user_symptoms = data['symptoms']
        if not isinstance(user_symptoms, list) or len(user_symptoms) == 0:
            return jsonify({'error': 'Symptoms should be a non-empty list'}), 400

        # Normalize symptoms
        norm_symptoms = []
        for s in user_symptoms:
            n = normalize_symptom(s, symptom_columns)
            if n:
                norm_symptoms.append(n)

        if len(norm_symptoms) == 0:
            return jsonify({'error': 'No valid symptoms found'}), 400

        # Predict disease
        disease = predict(norm_symptoms)

        # Get disease info
        info = disease_info.get(disease, {
            'description': 'No description available.',
            'precautions': ['Consult a doctor.'],
            'specialize': 'General Physician'
        })

        # Format precautions
        precautions_text = [f"{i+1}. {p}" for i, p in enumerate(info['precautions'])]

        return jsonify({
            'prediction': disease,
            'description': info['description'],
            'precautions': precautions_text,
            'specialize': info['specialize']
        }), 200

    except Exception as e:
        return jsonify({'error': f'Prediction failed: {str(e)}'}), 500


@app.route('/health', methods=['GET'])
def health():
    return jsonify({
        'status': 'healthy',
        'model_loaded': True,
        'diseases_count': len(disease_info),
        'symptoms_count': len(symptom_columns)
    })


@app.route('/symptoms', methods=['GET'])
def get_symptoms():
    readable_symptoms = [col.replace('_', ' ').title() for col in symptom_columns]
    return jsonify({'symptoms': sorted(readable_symptoms)})


if __name__ == '__main__':
    print("[App] Starting Flask server...")
    app.run(debug=True, host='0.0.0.0', port=5000)
