from fastapi import APIRouter
from typing import Dict, Any, List

router = APIRouter()

@router.get("/")
def health_check():
    return {"status": "healthy", "service": "MediSense AI"}

@router.get("/vitals")
def get_vitals():
    return {
        "status": "success",
        "latest": {
            "blood_pressure": "118/75 mmHg",
            "heart_rate": 72,
            "spo2": 98,
            "glucose": 96,
            "status": "Optimal"
        },
        "trends": [
            {"date": "Oct 2", "systolic": 122, "diastolic": 80, "heartRate": 76, "spo2": 97, "glucose": 102},
            {"date": "Oct 3", "systolic": 120, "diastolic": 78, "heartRate": 74, "spo2": 98, "glucose": 98},
            {"date": "Oct 4", "systolic": 124, "diastolic": 82, "heartRate": 78, "spo2": 97, "glucose": 104},
            {"date": "Oct 5", "systolic": 119, "diastolic": 76, "heartRate": 71, "spo2": 98, "glucose": 95},
            {"date": "Oct 6", "systolic": 117, "diastolic": 75, "heartRate": 73, "spo2": 99, "glucose": 94},
            {"date": "Oct 7", "systolic": 121, "diastolic": 77, "heartRate": 75, "spo2": 98, "glucose": 97},
            {"date": "Oct 8", "systolic": 118, "diastolic": 75, "heartRate": 72, "spo2": 98, "glucose": 96}
        ],
        "ai_insight": "Systolic blood pressure stabilized within optimal targets (<120 mmHg) with steady resting heart rate recovery."
    }

@router.get("/wellness")
def get_wellness_plan():
    return {
        "status": "success",
        "adherence": 82,
        "pillars": {
            "movement": {
                "weekly_target_minutes": 150,
                "current_minutes": 110,
                "recommendation": "Maintain zone 2 brisk walking (30 mins 4x/week) to support endothelial health."
            },
            "nutrition": {
                "focus": "Cardioprotective low-glycemic Mediterranean plan with elevated soluble fiber.",
                "hydration_target_ml": 2500
            },
            "sleep": {
                "target_hours": 8.0,
                "bedtime_target": "10:30 PM",
                "recommendation": "Address 4-day sleep deficit with digital wind-down routine 45 mins before bedtime."
            }
        }
    }

@router.get("/medications")
def get_medications():
    return {
        "status": "success",
        "adherence_rate": 85,
        "medications": [
            {"id": 1, "name": "Metformin", "dosage": "500mg", "frequency": "Twice daily", "timing": "With meals", "status": "active"},
            {"id": 2, "name": "Vitamin D3", "dosage": "1000 IU", "frequency": "Once daily", "timing": "Morning", "status": "active"},
            {"id": 3, "name": "Atorvastatin", "dosage": "20mg", "frequency": "Once daily", "timing": "Bedtime", "status": "active"}
        ]
    }

