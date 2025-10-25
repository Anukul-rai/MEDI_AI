# 🧠 Medi-AI – Disease Prediction System (Frontend)

**Medi-AI** is an intelligent health assistant that predicts diseases based on user-selected symptoms using a trained Machine Learning model.  
This repository contains the **frontend** built with **React + Vite**, offering a clean, modern, and responsive interface for users to interact with the backend prediction API.

> ⚕️ *Empowering Health Through Technology — Medi-AI bridges data-driven insights with accessible healthcare.*

---

## 🚀 Features

- ⚛️ **React + Vite** for fast, lightweight frontend performance  
- 🧩 **Symptom Selection** from 100+ health-related options  
- 🤖 **AI-Powered Prediction** using Flask + ML model backend  
- 💬 **Detailed Insights** – disease description, precautions, and specialist recommendation  
- 🎨 **Modern UI/UX** – Tailwind CSS styling and smooth animations  
- 📅 **Appointment Booking** feature integration  

---

## 🧰 Tech Stack

| Layer | Technology |
|-------|-------------|
| **Frontend Framework** | React (Vite) |
| **Styling** | Tailwind CSS |
| **Icons** | React Icons |
| **API Communication** | Fetch / Axios |
| **Backend (ML Model)** | Flask (Python) |
| **ML Libraries (Backend)** | Scikit-learn, Pandas, NumPy |

---

## 🔗 API Integration

The frontend communicates with the Flask backend for disease prediction.

Create a `.env` file in your project root and add your backend URL:

```bash
VITE_API_URL=http://127.0.0.1:5000
```
---

## 📦 Installation & Setup
- Clone the repository

```bash
git clone https://github.com/yourusername/medi-ai-frontend.git
cd medi-ai-frontend
```

- Install dependencies
```bash
npm install
```

- Set up environment variables
 Create a .env file and add:

```bash
# Backend API URL for disease prediction
VITE_API_URL=http://127.0.0.1:5000

# Clerk publishable key for authentication (replace with your own key)
VITE_CLERK_PUBLISHABLE_KEY=pk_test_your_publishable_key_here
```

- Run the development server
```bash
npm run dev
```

---

## 🖥️ How It Works

1. User selects 3 or more symptoms from dropdown menus.
2. The frontend sends the selected symptoms to the Flask backend via a POST request.
3. The backend ML model predicts the most likely disease.
4. A result modal displays:
      - 🩺 Predicted Disease
     - 📖 Description
     - 💊 Precautions
     - 👨‍⚕️ Specialist Recommendation
     - 📅 Option to Book Appointment

---

## 🎨 UI Preview

> ✨ A minimal, responsive, and modern interface with clean modals and intuitive interactions.

🖼️ (Add screenshots or screen recordings here)

---

## 💡 Future Enhancements

- 🔐 User Authentication (Login/Register)
- 📊 Personal Health History Dashboard
- 📱 Progressive Web App (PWA) Support
- 🌍 Multi-language Support
- 🧬 Integration with Wearable Devices
