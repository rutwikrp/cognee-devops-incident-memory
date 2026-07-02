from fastapi import APIRouter
from fastapi import UploadFile
from fastapi import File

from services.document_service import document_service


router = APIRouter(
    prefix="/documents",
    tags=["Documents"]
)


@router.post("/{project_id}")
async def upload_document(
    project_id: str,
    file: UploadFile = File(...)
):

    return await document_service.upload_document(
        project_id,
        file
    )


@router.get("/{project_id}")
async def list_documents(
    project_id: str
):

    return document_service.list_documents(project_id)