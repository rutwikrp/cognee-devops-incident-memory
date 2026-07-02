from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

from services.project_service import project_service


router = APIRouter(prefix="/projects", tags=["Projects"])


class CreateProjectRequest(BaseModel):
    name: str
    description: str


@router.post("/")
async def create_project(request: CreateProjectRequest):

    return project_service.create_project(
        request.name,
        request.description
    )


@router.get("/")
async def list_projects():

    return project_service.list_projects()


@router.get("/{project_id}")
async def get_project(project_id: str):

    project = project_service.get_project(project_id)

    if not project:
        raise HTTPException(status_code=404, detail="Project not found")

    return project


@router.delete("/{project_id}")
async def delete_project(project_id: str):

    project = project_service.delete_project(project_id)

    if not project:
        raise HTTPException(status_code=404, detail="Project not found")

    return {"message": "Project deleted"}