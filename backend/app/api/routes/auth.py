from fastapi import APIRouter

router = APIRouter()

@router.post("/login")
def login():
    return {"message": "Mock login endpoint"}

@router.post("/register")
def register():
    return {"message": "Mock register endpoint"}
