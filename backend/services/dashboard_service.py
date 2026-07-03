from services.project_service import project_service
from services.document_service import document_service


class DashboardService:

    def get_stats(self):

        projects = project_service.list_projects()

        documents = document_service.documents.values()

        return {
            "projects": len(projects),
            "documents": len(list(documents)),
            "memory_status": (
                "Ready"
                if len(document_service.documents) > 0
                else "Waiting for documents"
            ),
        }


dashboard_service = DashboardService()