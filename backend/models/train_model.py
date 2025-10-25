import pandas as pd
import joblib
from sklearn.naive_bayes import MultinomialNB
from sklearn.preprocessing import LabelEncoder

# Load dataset
data = pd.read_csv("../data/symptom_Description.csv")  
# Example: columns = ['symptom1','symptom2','symptom3','disease','precautions','description','specialize']

# Create feature set (symptoms) and labels (disease)
X = data[['symptom1','symptom2','symptom3']].astype(str)
y = data['disease']

# Encode disease labels
label_encoder = LabelEncoder()
y_encoded = label_encoder.fit_transform(y)

# Convert symptoms to simple numeric encoding (basic method)
X_encoded = X.apply(lambda col: col.astype('category').cat.codes)

# Train Naive Bayes
model = MultinomialNB()
model.fit(X_encoded, y_encoded)

# Save model and encoder
joblib.dump(model, "disease_model.pkl")
joblib.dump(label_encoder, "label_encoder.pkl")

print("✅ Model training complete. Saved as disease_model.pkl")
