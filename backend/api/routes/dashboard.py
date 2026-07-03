from fastapi import APIRouter

from services.dashboard_service import dashboard_service

router = APIRouter(
    prefix="/dashboard",
    tags=["Dashboard"],
)


@router.get("/stats")
def dashboard_stats():

    return dashboard_service.get_stats()