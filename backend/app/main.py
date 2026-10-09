from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.routes import router as api_router
from dotenv import load_dotenv
import os

load_dotenv()

app = FastAPI(
    title="MediSense AI",
    description="AI-Powered Healthcare System API",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(api_router, prefix="/api")

# Determine static frontend directory (supports container, local, and custom STATIC_DIR)
current_dir = os.path.dirname(os.path.abspath(__file__))
candidate_paths = [
    os.environ.get("STATIC_DIR"),
    os.path.abspath(os.path.join(current_dir, "..", "frontend", "dist")),
    os.path.abspath(os.path.join(current_dir, "..", "..", "frontend", "dist")),
    os.path.abspath(os.path.join(current_dir, "..", "static")),
    "/app/frontend/dist",
]
static_path = next((p for p in candidate_paths if p and os.path.exists(p)), None)

if static_path:
    from fastapi.staticfiles import StaticFiles
    from fastapi.responses import FileResponse
    from fastapi import HTTPException

    assets_path = os.path.join(static_path, "assets")
    if os.path.exists(assets_path):
        app.mount("/assets", StaticFiles(directory=assets_path), name="assets")

    @app.get("/{full_path:path}")
    async def serve_spa(full_path: str):
        # Do not catch unhandled API routes; return 404
        if full_path.startswith("api"):
            raise HTTPException(status_code=404, detail="API endpoint not found")
        target_file = os.path.join(static_path, full_path)
        if full_path and os.path.exists(target_file) and os.path.isfile(target_file):
            return FileResponse(target_file)
        index_file = os.path.join(static_path, "index.html")
        if os.path.exists(index_file):
            return FileResponse(index_file)
        return {"message": "Welcome to MediSense AI"}
else:
    @app.get("/")
    def read_root():
        return {"message": "Welcome to MediSense AI Backend"}

