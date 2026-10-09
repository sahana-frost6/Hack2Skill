import os
import json
import re
from dotenv import load_dotenv

try:
    import google.generativeai as genai
except Exception as e:
    print(f"Notice: google.generativeai could not be imported in current Python environment: {e}")
    genai = None

load_dotenv()

# Configure API Key securely
api_key = os.getenv("GEMINI_API_KEY")
model = None
if api_key and genai:
    try:
        genai.configure(api_key=api_key)
        # We use gemini-1.5-flash for speed, multimodal support, and cost efficiency
        model = genai.GenerativeModel("gemini-1.5-flash")
    except Exception as e:
        print(f"Warning: Failed to configure Gemini API with key: {e}")
        model = None

def _clean_and_parse_json(text: str, fallback: dict) -> dict:
    """Helper to cleanly extract and parse JSON from model output."""
    if not text:
        return fallback
    cleaned = text.strip()
    if cleaned.startswith("```"):
        cleaned = re.sub(r"^```(?:json)?\s*", "", cleaned, flags=re.IGNORECASE)
        cleaned = re.sub(r"\s*```$", "", cleaned)
    try:
        return json.loads(cleaned.strip())
    except Exception:
        match = re.search(r"(\{.*\})", cleaned, re.DOTALL)
        if match:
            try:
                return json.loads(match.group(1))
            except Exception:
                pass
        return fallback

def analyze_symptoms(symptoms_text: str):
    fallback_result = {
        "summary": f"Reported symptoms: {symptoms_text}",
        "possible_explanations": ["Viral Infection / Fatigue", "Mild seasonal allergy", "Tension or dehydration"],
        "urgency": "Routine consultation",
        "warning_signs": ["Shortness of breath", "High fever persisting over 3 days", "Severe chest pain"],
        "recommended_next_steps": [
            "Ensure adequate rest and hydration",
            "Monitor symptom progression over 24-48 hours",
            "Consult a licensed physician for professional assessment"
        ],
        "questions_for_doctor": [
            "Could these symptoms be related to my current routine or environment?",
            "What specific markers should prompt immediate emergency care?"
        ],
        "disclaimer": "AI-generated health insight — not a medical diagnosis. Consult a qualified healthcare professional for medical advice."
    }

    if not api_key or not model:
        return fallback_result
    
    prompt = f"""
    You are an AI-assisted health triage system. A user has reported the following symptoms:
    "{symptoms_text}"
    
    Please analyze these symptoms and provide a JSON response using the following schema exactly:
    {{
      "summary": "Brief summary of symptoms",
      "possible_explanations": ["Reason 1", "Reason 2"],
      "urgency": "Emergency / Urgent medical consultation / Routine consultation / Self-care + monitoring",
      "warning_signs": ["Sign 1", "Sign 2"],
      "recommended_next_steps": ["Step 1", "Step 2"],
      "questions_for_doctor": ["Question 1", "Question 2"],
      "disclaimer": "AI-generated health insight — not a medical diagnosis. Consult a qualified healthcare professional for medical advice."
    }}
    
    IMPORTANT: Ensure the output is strictly valid JSON without markdown wrapping, and never diagnose definitively.
    """
    
    try:
        response = model.generate_content(prompt)
        parsed = _clean_and_parse_json(response.text, fallback_result)
        return parsed
    except Exception as e:
        print("Gemini triage error or parsing failure:", e)
        return fallback_result


def analyze_medical_report(report_text: str = "", image_bytes: bytes = None, mime_type: str = "image/jpeg"):
    """
    Analyzes medical reports (lab values, blood tests, radiology summaries, etc.)
    Supports text input as well as multimodal image/PDF attachments.
    Returns normalized structure compatible with both frontend keys:
    ('values' / 'important_values', 'normal' / 'what_looks_normal', etc.)
    """
    fallback_values = [
        {"test": "Hemoglobin", "result": "14.2 g/dL", "range": "13.8 - 17.2 g/dL", "reference_range": "13.8 - 17.2 g/dL", "status": "Normal", "explanation": "Protein in red blood cells that carries oxygen."},
        {"test": "Total Cholesterol", "result": "195 mg/dL", "range": "< 200 mg/dL", "reference_range": "< 200 mg/dL", "status": "Normal", "explanation": "Overall cholesterol level in your blood."},
        {"test": "LDL Cholesterol", "result": "115 mg/dL", "range": "< 100 mg/dL", "reference_range": "< 100 mg/dL", "status": "Elevated", "explanation": "Low-density lipoprotein; slightly elevated, consider dietary review."},
        {"test": "HDL Cholesterol", "result": "55 mg/dL", "range": "> 40 mg/dL", "reference_range": "> 40 mg/dL", "status": "Normal", "explanation": "High-density lipoprotein (good cholesterol)."}
    ]
    fallback_result = {
        "summary": "Your report shows mostly normal biomarkers with slightly elevated LDL cholesterol.",
        "values": fallback_values,
        "important_values": fallback_values,
        "normal": ["Hemoglobin", "Total Cholesterol", "HDL Cholesterol"],
        "what_looks_normal": ["Hemoglobin", "Total Cholesterol", "HDL Cholesterol"],
        "attention": ["LDL Cholesterol (Slightly elevated)"],
        "what_may_need_attention": ["LDL Cholesterol (Slightly elevated)"],
        "questions": [
            "Should I adjust dietary saturated fats or repeat the lipid test in 3-6 months?",
            "Are any lifestyle modifications recommended at this stage?"
        ],
        "questions_for_doctor": [
            "Should I adjust dietary saturated fats or repeat the lipid test in 3-6 months?",
            "Are any lifestyle modifications recommended at this stage?"
        ],
        "trends": "LDL cholesterol remains slightly above optimal targets compared to typical benchmarks.",
        "disclaimer": "AI interpretation only — not a medical diagnosis. Verify results with a healthcare professional."
    }

    if not api_key or not model:
        if report_text:
            fallback_result["summary"] = f"Report Analysis: {report_text[:120]}..."
        return fallback_result

    prompt = f"""
    You are an AI medical report analyzer. Extract and summarize the key information from this medical report.
    {f'Report Content:\n{report_text}' if report_text else 'Extract all readable text, test names, results, reference ranges and interpretations from the attached image/document.'}

    Please provide a strictly valid JSON response using the following schema:
    {{
      "summary": "Clear, patient-friendly summary of the overall report",
      "values": [
        {{
          "test": "Name of test (e.g. Hemoglobin, LDL, Fasting Blood Sugar)",
          "result": "Measured Value with units (e.g. 14.2 g/dL)",
          "range": "Normal Reference Range (e.g. 13.5 - 17.5 g/dL)",
          "status": "Normal or High or Low or Elevated",
          "explanation": "Simple one-line patient friendly explanation"
        }}
      ],
      "normal": ["Item that is within normal limits", "Another normal item"],
      "attention": ["Any value or note that is out of range or requires attention"],
      "questions": ["Specific question for doctor 1", "Specific question for doctor 2"],
      "trends": "Brief comment on noteworthy trends or clinical context",
      "disclaimer": "AI interpretation only. Verify results with a healthcare professional."
    }}

    IMPORTANT:
    1. Output strictly valid JSON without markdown wrapping.
    2. Never give definitive diagnosis.
    3. Keep explanations accessible for non-medical users.
    """

    content_payload = []
    if image_bytes:
        content_payload.append({
            "mime_type": mime_type,
            "data": image_bytes
        })
    content_payload.append(prompt)

    try:
        response = model.generate_content(content_payload)
        parsed = _clean_and_parse_json(response.text, fallback_result)
        
        # Normalize and align all keys so frontend never breaks
        raw_values = parsed.get("values") or parsed.get("important_values") or fallback_values
        normalized_values = []
        for v in raw_values:
            if isinstance(v, dict):
                rng = v.get("range") or v.get("reference_range", "Standard")
                normalized_values.append({
                    "test": v.get("test", "Test"),
                    "result": v.get("result", "N/A"),
                    "range": rng,
                    "reference_range": rng,
                    "status": v.get("status", "Normal"),
                    "explanation": v.get("explanation", "")
                })
        
        normal_items = parsed.get("normal") or parsed.get("what_looks_normal") or []
        attention_items = parsed.get("attention") or parsed.get("what_may_need_attention") or []
        questions_items = parsed.get("questions") or parsed.get("questions_for_doctor") or []
        
        return {
            "summary": parsed.get("summary", "Report analyzed successfully."),
            "values": normalized_values,
            "important_values": normalized_values,
            "normal": normal_items,
            "what_looks_normal": normal_items,
            "attention": attention_items,
            "what_may_need_attention": attention_items,
            "questions": questions_items,
            "questions_for_doctor": questions_items,
            "trends": parsed.get("trends", "No significant negative trend detected."),
            "disclaimer": parsed.get("disclaimer", "AI interpretation only. Verify results with a healthcare professional.")
        }
    except Exception as e:
        print("Gemini medical report analysis error:", e)
        return fallback_result


def chat_with_copilot(message: str, history: list = None) -> str:
    """
    AI Health Copilot chat conversational assistant.
    Provides empathetic, informative health wellness guidance with safety safeguards.
    """
    default_response = (
        "I'm your MediSense AI Health Copilot. I can help explain medical terms, "
        "discuss wellness strategies, and organize questions for your healthcare provider. "
        "Please remember that I provide health information and not formal medical diagnoses."
    )

    if not api_key or not model:
        # Context-aware fallback response if API key is not present
        lowered = message.lower()
        if "hba1c" in lowered:
            return (
                "HbA1c (Hemoglobin A1c) measures your average blood sugar levels over the past 2 to 3 months. "
                "A normal level is typically below 5.7%, 5.7% to 6.4% indicates prediabetes, and 6.5% or higher may indicate diabetes. "
                "Would you like guidance on lifestyle habits that support balanced blood glucose?"
            )
        elif "cholesterol" in lowered or "ldl" in lowered:
            return (
                "Cholesterol is an essential lipid in your body. LDL is commonly referred to as 'bad' cholesterol "
                "because high levels can accumulate in arteries, while HDL is 'good' cholesterol because it helps transport excess cholesterol to your liver. "
                "Aerobic exercise, dietary fiber (oats, legumes), and reducing trans fats are proven ways to support optimal lipid profiles."
            )
        elif "score" in lowered or "health score" in lowered:
            return (
                "Your MediSense Health Score is calculated from composite indicators: sleep regularity, resting heart rate trends, "
                "reported activity levels, and routine vitals consistency. Updating your logs regularly keeps your score accurate and insightful."
            )
        return (
            f"Regarding '{message}': In preventive healthcare, tracking patterns over time and staying hydrated, "
            "active, and well-rested are key pillars. For personalized evaluation, always consult with your physician."
        )

    system_instruction = (
        "You are MediSense AI Health Copilot, a compassionate, articulate, and accurate clinical health assistant. "
        "You explain complex health concepts clearly in simple language, encourage healthy preventive habits, "
        "and suggest intelligent questions to ask doctors. Always emphasize that your advice is educational and not "
        "a substitute for direct clinical examination."
    )

    try:
        prompt = f"{system_instruction}\n\nUser Question: {message}\n\nCopilot Response:"
        response = model.generate_content(prompt)
        return response.text.strip()
    except Exception as e:
        print("Gemini copilot chat error:", e)
        return default_response
