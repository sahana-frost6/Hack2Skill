from fastapi import APIRouter, HTTPException
from typing import Optional, List, Dict, Any
from pydantic import BaseModel
from app.ai.gemini_client import analyze_symptoms, chat_with_copilot

router = APIRouter()

class SymptomRequest(BaseModel):
    symptoms: str

class ChatRequest(BaseModel):
    message: str
    history: Optional[List[Dict[str, Any]]] = None

@router.post("/chat")
def chat(request: ChatRequest):
    if not request.message or not request.message.strip():
        raise HTTPException(status_code=400, detail="Message cannot be empty")
    try:
        reply = chat_with_copilot(request.message, request.history)
        return {"reply": reply}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/triage")
def triage(request: SymptomRequest):
    if not request.symptoms or not request.symptoms.strip():
        raise HTTPException(status_code=400, detail="Symptoms text is required")
    try:
        result = analyze_symptoms(request.symptoms)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
