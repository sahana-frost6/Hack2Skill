import google.generativeai as genai
import os

# Configure Gemini API
# genai.configure(api_key=os.getenv("GEMINI_API_KEY"))
# Set a mock or use actual API later.

def generate_personalized_insights(user_profile: dict, health_data: dict) -> list:
    """
    Mock implementation for personalized insights based on user data.
    """
    return [
        {
            "type": "insight",
            "message": "Your sleep duration has decreased for 4 consecutive days. Consider maintaining a consistent sleep schedule and reducing screen exposure before bedtime.",
            "disclaimer": "AI-generated health insight \u2014 not a medical diagnosis. Consult a qualified healthcare professional for medical advice."
        },
        {
            "type": "preventive",
            "message": "Based on your age and activity level, a routine blood pressure check is recommended this month.",
            "disclaimer": "AI-generated health insight \u2014 not a medical diagnosis. Consult a qualified healthcare professional for medical advice."
        }
    ]
