from models.project import Project


class ProjectService:

    def __init__(self):
        self.projects = {}

    def create_project(self, name: str, description: str):

        project = Project(
            name=name,
            description=description
        )

        self.projects[str(project.id)] = project

        return project

    def list_projects(self):

        return list(self.projects.values())

    def get_project(self, project_id: str):

        return self.projects.get(project_id)

    def delete_project(self, project_id: str):

        return self.projects.pop(project_id, None)


project_service = ProjectService()