import os
import shutil

from fastapi import UploadFile

from models.document import Document
from services.project_service import project_service
from services.cognee_service import cognee_service

class DocumentService:

    def __init__(self):

        self.documents = {}

        os.makedirs("uploads", exist_ok=True)

    

    async def upload_document(
        self,
        project_id: str,
        file: UploadFile
        ):

        project = project_service.get_project(project_id)

        if not project:
            raise Exception("Project not found")

        filepath = os.path.join(
            "uploads",
            file.filename
        )

        with open(filepath, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)

        await cognee_service.remember_document(
            dataset_name=project.dataset_name,
            file_path=filepath,
        )

        document = Document(
            project_id=project_id,
            filename=file.filename,
            filepath=filepath
        )

        self.documents[str(document.id)] = document

        return document

    def list_documents(self, project_id: str):

        return [
            doc
            for doc in self.documents.values()
            if doc.project_id == project_id
        ]

    def delete_document(
        self,
        document_id: str,
    ):

        document = self.documents.get(document_id)

        if not document:
            return False

        if os.path.exists(document.filepath):
            os.remove(document.filepath)

        del self.documents[document_id]

        return True

document_service = DocumentService()