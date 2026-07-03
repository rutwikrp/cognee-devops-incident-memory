from services.project_service import project_service
from services.cognee_service import cognee_service


class ChatService:

    async def ask(
        self,
        project_id: str,
        question: str,
    ):

        project = project_service.get_project(project_id)

        if not project:
            raise Exception("Project not found")

        answer = await cognee_service.chat(
            dataset_name=project.dataset_name,
            session_id=project.session_id,
            question=question,
        )

        return {
            "answer": answer
        }


chat_service = ChatService()