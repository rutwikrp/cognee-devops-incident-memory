from services.project_service import project_service
from services.document_service import document_service
from services.cognee_service import cognee_service


class MemoryService:

    async def improve(
        self,
        project_id: str,
    ):

        project = project_service.get_project(project_id)

        if not project:
            raise Exception("Project not found")

        await cognee_service.improve_dataset(
            project.dataset_name
        )

        return {
            "message": "Memory improved."
        }
    
    def get_memory_status(
        self,
        project_id: str,
    ):

        project = project_service.get_project(project_id)

        if not project:
            return None

        documents = document_service.list_documents(project_id)
        status = "Ready" if len(documents) > 0 else "Waiting for documents"
        return {
            "status": status,
            "dataset_name": project.dataset_name,
            "documents": len(documents),
            "session": "Active",
            "memory": "Persistent",
        }


memory_service = MemoryService()