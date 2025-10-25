# config.py

DATASET_PATH = 'dataset'
MODEL_PATH = 'models'

TRAINING_FILE = f'{DATASET_PATH}/Training.csv'
SYMPTOM_DESC_FILE = f'{DATASET_PATH}/symptom_Description.csv'
SYMPTOM_PRECAUTION_FILE = f'{DATASET_PATH}/symptom_precaution.csv'

MODEL_FILE = f'{MODEL_PATH}/naive_bayes_model.pkl'
LABEL_ENCODER_FILE = f'{MODEL_PATH}/label_encoder.pkl'
SYMPTOM_COLUMNS_FILE = f'{MODEL_PATH}/symptom_columns.pkl'
