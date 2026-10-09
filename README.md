# MediSense AI
“Understand your health. Act earlier. Live better.”

## Problem Statement
Traditional healthcare often reacts to illness rather than preventing it. Patients struggle to understand complex medical reports, track their health trends, and know when to seek medical attention.

## Solution
**MediSense AI** is an AI-powered healthcare ecosystem that helps users understand symptoms, identify potential health risks early, analyze medical reports, and maintain a secure personal health profile. It acts as an intelligent health companion, bridging the gap between daily wellness and professional healthcare.

## Features
- **Smart Health Onboarding**: Multi-step wizard to build a comprehensive health profile.
- **AI Symptom Triage**: Conversational symptom assessment with urgency evaluation.
- **Multimodal Medical Report Analyzer**: Upload reports (blood tests, prescriptions, etc.) and receive structured, easy-to-understand summaries.
- **AI Health Copilot**: Conversational AI assistant for general health and wellness questions.
- **Medication Management**: Track medications, dosages, and receive smart reminders.
- **Vitals Tracker**: Monitor BP, heart rate, weight, etc., with AI trend detection.
- **Personalized Wellness Plan**: Weekly plans for movement, nutrition, and sleep.
- **Mental Wellness Module**: Mood tracking, journaling, and meditation timer.
- **Doctor Visit Assistant**: Generates concise patient summaries and questions for upcoming appointments.
- **Emergency Assistance**: Quick access to emergency contacts, allergies, and critical health data.

## Architecture
- **Frontend**: React, Vite, TypeScript, Tailwind CSS, shadcn/ui, Recharts
- **Backend**: Python, FastAPI
- **AI Layer**: Google Gemini API
- **Database/Auth**: Firebase (Authentication, Firestore, Storage)

## Setup Instructions

1. Clone the repository.
2. Create `.env` files based on `.env.example`.

### Frontend
```bash
cd frontend
npm install
npm run dev
```

### Backend
```bash
cd backend
python -m venv venv
# Activate venv
pip install -r requirements.txt
uvicorn app.main:app --reload
```

### Google Cloud Run Deployment
Deploy the full-stack container (React SPA + FastAPI backend) directly to Google Cloud Run:

```powershell
# Using the PowerShell script:
.\deploy-gcp.ps1 -ProjectId "<YOUR_GCP_PROJECT_ID>" -Region "asia-south1"

# Or directly using gcloud:
gcloud config set project <YOUR_GCP_PROJECT_ID>
gcloud services enable run.googleapis.com cloudbuild.googleapis.com artifactregistry.googleapis.com
gcloud run deploy medisense-ai --source . --region asia-south1 --platform managed --allow-unauthenticated
```
> **Note**: An active GCP Billing account must be linked to your project in the [Google Cloud Console](https://console.cloud.google.com/billing) for Cloud Run & Cloud Build APIs to be enabled.


## Responsible AI & Safety
MediSense AI is a health information and decision-support system, NOT a replacement for doctors. All AI-generated insights include disclaimers, and the system is designed to escalate potential emergencies to human professionals.

## Future Scope
- Real wearable device integration (Apple Health, Google Fit)
- Multi-language support (Hindi, Kannada, etc. currently mocked)
- Advanced predictive models for cardiometabolic risks
