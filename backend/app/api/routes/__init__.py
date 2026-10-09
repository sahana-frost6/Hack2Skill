from fastapi import APIRouter

from . import auth, users, ai, health, reports

router = APIRouter()

router.include_router(auth.router, prefix="/auth", tags=["auth"])
router.include_router(users.router, prefix="/users", tags=["users"])
router.include_router(ai.router, prefix="/ai", tags=["ai"])
router.include_router(health.router, prefix="/health", tags=["health"])
router.include_router(reports.router, prefix="/reports", tags=["reports"])
