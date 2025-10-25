# data_utils.py
import pandas as pd

def load_disease_info(desc_file, prec_file):
    """Load disease descriptions, precautions, and specialist mapping"""
    disease_info = {}
    try:
        desc_df = pd.read_csv(desc_file)
        prec_df = pd.read_csv(prec_file)

        for _, row in desc_df.iterrows():
            disease = row['Disease'].strip()
            disease_info[disease] = {
                'description': row['Description'].strip(),
                'precautions': [],
                'specialize': get_specialist(disease)
            }

        for _, row in prec_df.iterrows():
            disease = row['Disease'].strip()
            precautions = [row[f'Precaution_{i}'].strip()
                            for i in range(1, 5) if pd.notna(row.get(f'Precaution_{i}'))]
            if disease in disease_info:
                disease_info[disease]['precautions'] = precautions

    except Exception as e:
        print(f"[DataUtils] Error loading disease info: {e}")
    return disease_info


def get_specialist(disease):
    """Map diseases to specialists"""
    mapping = {
        'Fungal infection': 'Dermatologist',
        'Allergy': 'Allergist',
        # Add remaining mappings
    }
    return mapping.get(disease, 'General Physician')


def normalize_symptom(symptom, symptom_columns):
    """
    Normalize user input to match dataset columns.
    Handles case, spaces, and minor mismatches.
    """
    if not symptom:
        return None
    normalized = symptom.strip().lower().replace(' ', '_')
    for col in symptom_columns:
        if col.lower() == normalized:
            return col
    return None
