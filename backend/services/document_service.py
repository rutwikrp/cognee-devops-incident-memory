import os
import shutil

from fastapi import UploadFile

from models.document import Document


class DocumentService:

    def __init__(self):

        self.documents = {}

        os.makedirs("uploads", exist_ok=True)

    async def upload_document(
        self,
        project_id: str,
        file: UploadFile
    ):

        filepath = os.path.join(
            "uploads",
            file.filename
        )

        with open(filepath, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)

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


document_service = DocumentService()