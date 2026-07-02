from models.chat import ChatResponse


class ChatService:

    async def ask(
        self,
        project_id: str,
        question: str
    ):

        return ChatResponse(
            answer=f"Mock response for '{question}'. Cognee integration coming next."
        )


chat_service = ChatService()