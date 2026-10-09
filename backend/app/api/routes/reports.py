from fastapi import APIRouter, UploadFile, File, Form, HTTPException
from typing import Optional
from pydantic import BaseModel
from app.ai.gemini_client import analyze_medical_report

router = APIRouter()

class ReportAnalyzeRequest(BaseModel):
    report_text: Optional[str] = None

@router.post("/upload")
async def upload_report(file: UploadFile = File(...)):
    try:
        content = await file.read()
        return {
            "filename": file.filename,
            "content_type": file.content_type,
            "size_bytes": len(content),
            "status": "uploaded"
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/analyze")
async def analyze_report(
    file: Optional[UploadFile] = File(None),
    report_text: Optional[str] = Form(None)
):
    try:
        image_bytes = None
        mime_type = "image/jpeg"
        extracted_text = report_text or ""

        if file:
            content = await file.read()
            mime_type = file.content_type or "image/jpeg"
            if mime_type.startswith("image/"):
                image_bytes = content
            elif mime_type == "application/pdf":
                # For PDF, pass as bytes with application/pdf mime type
                image_bytes = content
            else:
                try:
                    extracted_text = content.decode("utf-8")
                except Exception:
                    image_bytes = content

        result = analyze_medical_report(
            report_text=extracted_text,
            image_bytes=image_bytes,
            mime_type=mime_type
        )
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/analyze-text")
def analyze_report_json(request: ReportAnalyzeRequest):
    try:
        result = analyze_medical_report(report_text=request.report_text or "")
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
