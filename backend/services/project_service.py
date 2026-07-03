from uuid import uuid4
from models.project import Project
from services.cognee_service import cognee_service

class ProjectService:

    def __init__(self):
        self.projects = {}

    def create_project(self, name: str, description: str):

        dataset_name = (
            name.strip()
                .lower()
                .replace(" ", "-")
        )

        session_id = str(uuid4())
        project = Project(
            name=name,
            dataset_name=dataset_name,
            description=description,
            session_id=session_id,
        )

        self.projects[str(project.id)] = project

        return project

    def list_projects(self):

        return list(self.projects.values())

    def get_project(self, project_id: str):

        return self.projects.get(project_id)

    async def delete_project(self, project_id: str):

        project = self.get_project(project_id)

        if not project:
            return None

        await cognee_service.forget_dataset(
            project.dataset_name
        )

        return self.projects.pop(project_id)
    

project_service = ProjectService()