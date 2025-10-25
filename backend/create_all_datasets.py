import pandas as pd
import numpy as np
import os

print("="*70)
print("CREATING ALL DATASET FILES")
print("="*70)

# Create dataset folder if it doesn't exist
os.makedirs('dataset', exist_ok=True)

# ==================== 1. CREATE symptom_Description.csv ====================
print("\n1. Creating symptom_Description.csv...")

descriptions = {
    "Drug Reaction": "An adverse drug reaction (ADR) is an injury caused by taking medication. ADRs may occur following a single dose or prolonged administration of a drug or result from the combination of two or more drugs.",
    "Malaria": "An infectious disease caused by protozoan parasites from the Plasmodium family that can be transmitted by the bite of the Anopheles mosquito or by a contaminated needle or transfusion.",
    "Allergy": "An allergy is an immune system response to a foreign substance that's not typically harmful to your body. They can include certain foods pollen or pet dander.",
    "Hypothyroidism": "Hypothyroidism also called underactive thyroid or low thyroid is a disorder of the endocrine system in which the thyroid gland does not produce enough thyroid hormone.",
    "Psoriasis": "Psoriasis is a common skin disorder that forms thick red bumpy patches covered with silvery scales. They can pop up anywhere but most appear on the scalp elbows knees and lower back.",
    "GERD": "Gastroesophageal reflux disease or GERD is a digestive disorder that affects the lower esophageal sphincter (LES) the ring of muscle between the esophagus and stomach.",
    "Chronic cholestasis": "Chronic cholestatic diseases are characterized by defective bile acid transport from the liver to the intestine which is caused by primary damage to the biliary epithelium in most cases.",
    "hepatitis A": "Hepatitis A is a highly contagious liver infection caused by the hepatitis A virus. The virus is one of several types of hepatitis viruses that cause inflammation and affect your liver's ability to function.",
    "Osteoarthristis": "Osteoarthritis is the most common form of arthritis affecting millions of people worldwide. It occurs when the protective cartilage that cushions the ends of your bones wears down over time.",
    "(vertigo) Paroymsal  Positional Vertigo": "Benign paroxysmal positional vertigo (BPPV) is one of the most common causes of vertigo. It causes brief episodes of mild to intense dizziness.",
    "Hypoglycemia": "Hypoglycemia is a condition in which your blood sugar (glucose) level is lower than normal. Glucose is your body's main energy source.",
    "Acne": "Acne vulgaris is the formation of comedones papules pustules nodules and cysts as a result of obstruction and inflammation of pilosebaceous units.",
    "Diabetes": "Diabetes is a disease that occurs when your blood glucose also called blood sugar is too high. Blood glucose is your main source of energy and comes from the food you eat.",
    "Impetigo": "Impetigo is a common and highly contagious skin infection that mainly affects infants and children. Impetigo usually appears as red sores on the face.",
    "Hypertension": "Hypertension also known as high blood pressure (HBP) is a long-term medical condition in which the blood pressure in the arteries is persistently elevated.",
    "Peptic ulcer diseae": "Peptic ulcer disease (PUD) is a break in the inner lining of the stomach the first part of the small intestine or sometimes the lower esophagus.",
    "Dimorphic hemmorhoids(piles)": "Hemorrhoids also spelled haemorrhoids are vascular structures in the anal canal.",
    "Common Cold": "The common cold is a viral infection of your nose and throat (upper respiratory tract). It's usually harmless although it might not feel that way.",
    "Chicken pox": "Chickenpox is a highly contagious disease caused by the varicella-zoster virus (VZV). It can cause an itchy blister-like rash.",
    "Cervical spondylosis": "Cervical spondylosis is a general term for age-related wear and tear affecting the spinal disks in your neck.",
    "Hyperthyroidism": "Hyperthyroidism (overactive thyroid) occurs when your thyroid gland produces too much of the hormone thyroxine.",
    "Urinary tract infection": "Urinary tract infection: An infection of the kidney ureter bladder or urethra. Common symptoms include a frequent urge to urinate and pain or burning when urinating.",
    "Varicose veins": "A vein that has enlarged and twisted often appearing as a bulging blue blood vessel that is clearly visible through the skin.",
    "AIDS": "Acquired immunodeficiency syndrome (AIDS) is a chronic potentially life-threatening condition caused by the human immunodeficiency virus (HIV).",
    "Paralysis (brain hemorrhage)": "Intracerebral hemorrhage (ICH) is when blood suddenly bursts into brain tissue causing damage to your brain. Symptoms include headache weakness confusion and paralysis.",
    "Typhoid": "An acute illness characterized by fever caused by infection with the bacterium Salmonella typhi.",
    "Hepatitis B": "Hepatitis B is an infection of your liver. It can cause scarring of the organ liver failure and cancer.",
    "Fungal infection": "In humans fungal infections occur when an invading fungus takes over an area of the body and is too much for the immune system to handle.",
    "Hepatitis C": "Inflammation of the liver due to the hepatitis C virus (HCV) which is usually spread via blood transfusion and needle sticks.",
    "Migraine": "A migraine can cause severe throbbing pain or a pulsing sensation usually on one side of the head.",
    "Bronchial Asthma": "Bronchial asthma is a medical condition which causes the airway path of the lungs to swell and narrow.",
    "Alcoholic hepatitis": "Alcoholic hepatitis is a diseased inflammatory condition of the liver caused by heavy alcohol consumption over an extended period of time.",
    "Jaundice": "Yellow staining of the skin and sclerae (the whites of the eyes) by abnormally high blood levels of the bile pigment bilirubin.",
    "Hepatitis E": "A rare form of liver inflammation caused by infection with the hepatitis E virus (HEV).",
    "Dengue": "An acute infectious disease caused by a flavivirus transmitted by aedes mosquitoes and characterized by headache severe joint pain and a rash.",
    "Hepatitis D": "Hepatitis D also known as the hepatitis delta virus is an infection that causes the liver to become inflamed.",
    "Heart attack": "The death of heart muscle due to the loss of blood supply. The loss of blood supply is usually caused by a complete blockage of a coronary artery.",
    "Pneumonia": "Pneumonia is an infection in one or both lungs. Bacteria viruses and fungi cause it.",
    "Arthritis": "Arthritis is the swelling and tenderness of one or more of your joints. The main symptoms of arthritis are joint pain and stiffness.",
    "Gastroenteritis": "Gastroenteritis is an inflammation of the digestive tract particularly the stomach and large and small intestines.",
    "Tuberculosis": "Tuberculosis (TB) is an infectious disease usually caused by Mycobacterium tuberculosis (MTB) bacteria."
}

desc_df = pd.DataFrame(list(descriptions.items()), columns=['Disease', 'Description'])
desc_df.to_csv('dataset/symptom_Description.csv', index=False)
print(f"   ✅ Created with {len(desc_df)} diseases")

# ==================== 2. CREATE symptom_precaution.csv ====================
print("\n2. Creating symptom_precaution.csv...")

precautions = [
    ["Drug Reaction", "stop irritation", "consult nearest hospital", "stop taking drug", "follow up"],
    ["Malaria", "Consult nearest hospital", "avoid oily food", "avoid non veg food", "keep mosquitos out"],
    ["Allergy", "apply calamine", "cover area with bandage", "use ice to compress itching", "consult doctor"],
    ["Hypothyroidism", "reduce stress", "exercise", "eat healthy", "get proper sleep"],
    ["Psoriasis", "wash hands with warm soapy water", "stop bleeding using pressure", "consult doctor", "salt baths"],
    ["GERD", "avoid fatty spicy food", "avoid lying down after eating", "maintain healthy weight", "exercise"],
    ["Chronic cholestasis", "cold baths", "anti itch medicine", "consult doctor", "eat healthy"],
    ["hepatitis A", "Consult nearest hospital", "wash hands thoroughly", "avoid fatty spicy food", "medication"],
    ["Osteoarthristis", "acetaminophen", "consult nearest hospital", "follow up", "salt baths"],
    ["(vertigo) Paroymsal  Positional Vertigo", "lie down", "avoid sudden change in body", "avoid abrupt head movement", "relax"],
    ["Hypoglycemia", "lie down on side", "check pulse", "drink sugary drinks", "consult doctor"],
    ["Acne", "bath twice", "avoid fatty spicy food", "drink plenty of water", "avoid too many products"],
    ["Diabetes", "have balanced diet", "exercise", "consult doctor", "follow up"],
    ["Impetigo", "soak affected area in warm water", "use antibiotics", "remove scabs with wet cloth", "consult doctor"],
    ["Hypertension", "meditation", "salt baths", "reduce stress", "get proper sleep"],
    ["Peptic ulcer diseae", "avoid fatty spicy food", "consume probiotic food", "eliminate milk", "limit alcohol"],
    ["Dimorphic hemmorhoids(piles)", "avoid fatty spicy food", "consume witch hazel", "warm bath with epsom salt", "consume alovera juice"],
    ["Common Cold", "drink vitamin c rich drinks", "take vapour", "avoid cold food", "keep fever in check"],
    ["Chicken pox", "use neem in bathing", "consume neem leaves", "take vaccine", "avoid public places"],
    ["Cervical spondylosis", "use heating pad or cold pack", "exercise", "take pain reliever", "consult doctor"],
    ["Hyperthyroidism", "eat healthy", "massage", "use lemon balm", "take radioactive iodine treatment"],
    ["Urinary tract infection", "drink plenty of water", "increase vitamin c intake", "drink cranberry juice", "take probiotics"],
    ["Varicose veins", "lie down flat and raise leg high", "use oinments", "use vein compression", "dont stand still for long"],
    ["AIDS", "avoid open cuts", "wear ppe if possible", "consult doctor", "follow up"],
    ["Paralysis (brain hemorrhage)", "massage", "eat healthy", "exercise", "consult doctor"],
    ["Typhoid", "eat high calorie vegetables", "antibiotic therapy", "consult doctor", "medication"],
    ["Hepatitis B", "consult nearest hospital", "vaccination", "eat healthy", "medication"],
    ["Fungal infection", "bath twice", "use detol or neem in bathing water", "keep infected area dry", "use clean cloths"],
    ["Hepatitis C", "Consult nearest hospital", "vaccination", "eat healthy", "medication"],
    ["Migraine", "meditation", "reduce stress", "use polaroid glasses in sun", "consult doctor"],
    ["Bronchial Asthma", "switch to loose clothing", "take deep breaths", "get away from trigger", "seek help"],
    ["Alcoholic hepatitis", "stop alcohol consumption", "consult doctor", "medication", "follow up"],
    ["Jaundice", "drink plenty of water", "consume milk thistle", "eat fruits and high fiber food", "medication"],
    ["Hepatitis E", "stop alcohol consumption", "rest", "consult doctor", "medication"],
    ["Dengue", "drink papaya leaf juice", "avoid fatty spicy food", "keep mosquitos away", "keep hydrated"],
    ["Hepatitis D", "consult doctor", "medication", "eat healthy", "follow up"],
    ["Heart attack", "call ambulance", "chew or swallow aspirin", "keep calm", "stay still"],
    ["Pneumonia", "consult doctor", "medication", "rest", "follow up"],
    ["Arthritis", "exercise", "use hot and cold therapy", "try acupuncture", "massage"],
    ["Gastroenteritis", "stop eating solid food for while", "take small sips of water", "rest", "ease back into eating"],
    ["Tuberculosis", "cover mouth", "consult doctor", "medication", "rest"]
]

prec_df = pd.DataFrame(precautions, columns=['Disease', 'Precaution_1', 'Precaution_2', 'Precaution_3', 'Precaution_4'])
prec_df.to_csv('dataset/symptom_precaution.csv', index=False)
print(f"   ✅ Created with {len(prec_df)} diseases")

# ==================== 3. CREATE Training.csv ====================
print("\n3. Creating Training.csv...")

# All symptoms from your frontend
symptoms = [
    "itching", "skin_rash", "nodal_skin_eruptions", "continuous_sneezing", "shivering",
    "chills", "joint_pain", "stomach_pain", "acidity", "ulcers_on_tongue",
    "muscle_wasting", "vomiting", "burning_micturition", "spotting_urination", "fatigue",
    "weight_gain", "anxiety", "cold_hands_and_feets", "mood_swings", "weight_loss",
    "restlessness", "lethargy", "patches_in_throat", "irregular_sugar_level", "cough",
    "high_fever", "sunken_eyes", "breathlessness", "sweating", "dehydration",
    "indigestion", "headache", "yellowish_skin", "dark_urine", "nausea",
    "loss_of_appetite", "pain_behind_the_eyes", "back_pain", "constipation", "abdominal_pain",
    "diarrhoea", "mild_fever", "yellow_urine", "yellowing_of_eyes", "acute_liver_failure",
    "fluid_overload", "swelling_of_stomach", "swelled_lymph_nodes", "malaise", "blurred_and_distorted_vision",
    "phlegm", "throat_irritation", "redness_of_eyes", "sinus_pressure", "runny_nose",
    "congestion", "chest_pain", "weakness_in_limbs", "fast_heart_rate", "pain_during_bowel_movements",
    "pain_in_anal_region", "bloody_stool", "irritation_in_anus", "neck_pain", "dizziness",
    "cramps", "bruising", "obesity", "swollen_legs", "swollen_blood_vessels",
    "puffy_face_and_eyes", "enlarged_thyroid", "brittle_nails", "swollen_extremeties", "excessive_hunger",
    "extra_marital_contacts", "drying_and_tingling_lips", "slurred_speech", "knee_pain", "hip_joint_pain",
    "muscle_weakness", "stiff_neck", "swelling_joints", "movement_stiffness", "spinning_movements",
    "loss_of_balance", "unsteadiness", "weakness_of_one_body_side", "loss_of_smell", "bladder_discomfort",
    "foul_smell_of_urine", "continuous_feel_of_urine", "passage_of_gases", "internal_itching", "toxic_look_(typhos)",
    "depression", "irritability", "muscle_pain", "altered_sensorium", "red_spots_over_body",
    "belly_pain", "abnormal_menstruation", "dischromic_patches", "watering_from_eyes", "increased_appetite",
    "polyuria", "family_history", "mucoid_sputum", "rusty_sputum", "lack_of_concentration",
    "visual_disturbances", "receiving_blood_transfusion", "receiving_unsterile_injections", "coma", "stomach_bleeding",
    "distention_of_abdomen", "history_of_alcohol_consumption", "blood_in_sputum", "prominent_veins_on_calf",
    "palpitations", "painful_walking", "pus_filled_pimples", "blackheads", "scurring",
    "skin_peeling", "silver_like_dusting", "small_dents_in_nails", "inflammatory_nails", "blister",
    "red_sore_around_nose", "yellow_crust_ooze"
]

# Disease names
diseases = list(descriptions.keys())

# Disease-symptom mappings
disease_symptoms = {
    "Fungal infection": ["itching", "skin_rash", "nodal_skin_eruptions", "dischromic_patches"],
    "Allergy": ["continuous_sneezing", "shivering", "chills", "watering_from_eyes"],
    "GERD": ["stomach_pain", "acidity", "ulcers_on_tongue", "vomiting", "cough", "chest_pain"],
    "Chronic cholestasis": ["itching", "vomiting", "yellowish_skin", "nausea", "loss_of_appetite", "abdominal_pain"],
    "Drug Reaction": ["itching", "skin_rash", "stomach_pain", "burning_micturition", "spotting_urination"],
    "Peptic ulcer diseae": ["vomiting", "indigestion", "loss_of_appetite", "abdominal_pain", "passage_of_gases"],
    "AIDS": ["muscle_wasting", "patches_in_throat", "high_fever", "extra_marital_contacts"],
    "Diabetes": ["fatigue", "weight_loss", "restlessness", "lethargy", "irregular_sugar_level", "blurred_and_distorted_vision", "obesity", "excessive_hunger", "increased_appetite", "polyuria"],
    "Gastroenteritis": ["vomiting", "sunken_eyes", "dehydration", "diarrhoea"],
    "Bronchial Asthma": ["fatigue", "cough", "high_fever", "breathlessness", "family_history", "mucoid_sputum"],
    "Hypertension": ["headache", "chest_pain", "dizziness", "loss_of_balance", "lack_of_concentration"],
    "Migraine": ["acidity", "indigestion", "headache", "blurred_and_distorted_vision", "excessive_hunger", "visual_disturbances", "stiff_neck"],
    "Cervical spondylosis": ["back_pain", "weakness_in_limbs", "neck_pain", "dizziness", "loss_of_balance"],
    "Paralysis (brain hemorrhage)": ["vomiting", "headache", "weakness_of_one_body_side", "altered_sensorium"],
    "Jaundice": ["itching", "vomiting", "fatigue", "weight_loss", "high_fever", "yellowish_skin", "dark_urine", "nausea"],
    "Malaria": ["chills", "vomiting", "high_fever", "sweating", "headache", "nausea", "diarrhoea", "muscle_pain"],
    "Chicken pox": ["itching", "skin_rash", "fatigue", "lethargy", "high_fever", "headache", "loss_of_appetite", "mild_fever"],
    "Dengue": ["skin_rash", "chills", "joint_pain", "vomiting", "fatigue", "high_fever", "headache", "nausea", "loss_of_appetite", "pain_behind_the_eyes", "back_pain", "malaise", "muscle_pain", "red_spots_over_body"],
    "Typhoid": ["chills", "vomiting", "fatigue", "high_fever", "headache", "nausea", "constipation", "abdominal_pain", "diarrhoea", "toxic_look_(typhos)", "belly_pain"],
    "hepatitis A": ["joint_pain", "vomiting", "yellowish_skin", "dark_urine", "nausea", "loss_of_appetite", "abdominal_pain", "diarrhoea", "mild_fever", "yellow_urine", "yellowing_of_eyes"],
    "Hepatitis B": ["itching", "fatigue", "lethargy", "yellowish_skin", "dark_urine", "loss_of_appetite", "abdominal_pain", "yellow_urine", "yellowing_of_eyes", "acute_liver_failure", "swelling_of_stomach", "malaise"],
    "Hepatitis C": ["fatigue", "yellowish_skin", "nausea", "loss_of_appetite", "yellowing_of_eyes", "family_history"],
    "Hepatitis D": ["joint_pain", "vomiting", "fatigue", "yellowish_skin", "dark_urine", "nausea", "loss_of_appetite", "abdominal_pain", "yellowing_of_eyes"],
    "Hepatitis E": ["joint_pain", "vomiting", "fatigue", "high_fever", "yellowish_skin", "dark_urine", "nausea", "loss_of_appetite", "abdominal_pain", "yellowing_of_eyes", "acute_liver_failure", "swelling_of_stomach", "malaise"],
    "Alcoholic hepatitis": ["vomiting", "yellowish_skin", "abdominal_pain", "swelling_of_stomach", "distention_of_abdomen", "history_of_alcohol_consumption", "fluid_overload", "yellowing_of_eyes"],
    "Tuberculosis": ["chills", "vomiting", "fatigue", "weight_loss", "cough", "high_fever", "breathlessness", "sweating", "loss_of_appetite", "mild_fever", "yellowing_of_eyes", "swelled_lymph_nodes", "malaise", "phlegm", "chest_pain", "blood_in_sputum"],
    "Common Cold": ["continuous_sneezing", "chills", "fatigue", "cough", "high_fever", "headache", "swelled_lymph_nodes", "malaise", "phlegm", "throat_irritation", "redness_of_eyes", "sinus_pressure", "runny_nose", "congestion", "chest_pain", "loss_of_smell", "muscle_pain"],
    "Pneumonia": ["chills", "fatigue", "cough", "high_fever", "sweating", "breathlessness", "malaise", "phlegm", "chest_pain", "fast_heart_rate", "rusty_sputum"],
    "Dimorphic hemmorhoids(piles)": ["constipation", "pain_during_bowel_movements", "pain_in_anal_region", "bloody_stool", "irritation_in_anus"],
    "Heart attack": ["vomiting", "breathlessness", "sweating", "chest_pain"],
    "Varicose veins": ["fatigue", "bruising", "obesity", "swollen_legs", "swollen_blood_vessels", "prominent_veins_on_calf"],
    "Hypothyroidism": ["fatigue", "weight_gain", "cold_hands_and_feets", "mood_swings", "lethargy", "dizziness", "puffy_face_and_eyes", "enlarged_thyroid", "brittle_nails", "swollen_extremeties", "depression", "irritability", "abnormal_menstruation"],
    "Hyperthyroidism": ["fatigue", "mood_swings", "weight_loss", "restlessness", "sweating", "diarrhoea", "fast_heart_rate", "excessive_hunger", "muscle_weakness", "irritability", "abnormal_menstruation"],
    "Hypoglycemia": ["vomiting", "fatigue", "anxiety", "sweating", "headache", "nausea", "blurred_and_distorted_vision", "fast_heart_rate", "drying_and_tingling_lips", "slurred_speech"],
    "Osteoarthristis": ["joint_pain", "neck_pain", "knee_pain", "hip_joint_pain", "swelling_joints", "painful_walking"],
    "Arthritis": ["muscle_weakness", "stiff_neck", "swelling_joints", "movement_stiffness", "painful_walking"],
    "(vertigo) Paroymsal  Positional Vertigo": ["vomiting", "headache", "nausea", "spinning_movements", "loss_of_balance", "unsteadiness"],
    "Acne": ["skin_rash", "pus_filled_pimples", "blackheads", "scurring"],
    "Urinary tract infection": ["burning_micturition", "foul_smell_of_urine", "continuous_feel_of_urine"],
    "Psoriasis": ["skin_rash", "joint_pain", "skin_peeling", "silver_like_dusting", "small_dents_in_nails", "inflammatory_nails"],
    "Impetigo": ["skin_rash", "high_fever", "blister", "red_sore_around_nose", "yellow_crust_ooze"]
}

# Create training data
training_data = []
for disease in diseases:
    disease_symptom_list = disease_symptoms.get(disease, [])
    
    # Generate 10 samples per disease
    for _ in range(10):
        row = {symptom: 0 for symptom in symptoms}
        
        if disease_symptom_list:
            num_symptoms = np.random.randint(3, min(8, len(disease_symptom_list) + 1))
            selected_symptoms = np.random.choice(disease_symptom_list, 
                                                size=min(num_symptoms, len(disease_symptom_list)), 
                                                replace=False)
            for symptom in selected_symptoms:
                if symptom in row:
                    row[symptom] = 1
        
        row['prognosis'] = disease
        training_data.append(row)

# Create DataFrame
train_df = pd.DataFrame(training_data)
cols = [col for col in train_df.columns if col != 'prognosis'] + ['prognosis']
train_df = train_df[cols]

train_df.to_csv('dataset/Training.csv', index=False)
print(f"   ✅ Created with {len(train_df)} samples")
print(f"   ✅ Symptoms: {len(symptoms)}")
print(f"   ✅ Diseases: {len(diseases)}")

# ==================== VERIFICATION ====================
print("\n" + "="*70)
print("VERIFICATION")
print("="*70)

print("\n✅ All 3 files created successfully!")
print("\nFiles in dataset folder:")
for file in os.listdir('dataset'):
    size = os.path.getsize(f'dataset/{file}')
    print(f"   • {file} ({size:,} bytes)")

print("\n" + "="*70)
print("✅ READY TO RUN!")
print("="*70)
print("\nNow run: python app.py")