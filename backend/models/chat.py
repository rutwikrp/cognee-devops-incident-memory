from pydantic import BaseModel


class ChatRequest(BaseModel):
    project_id: str
    question: str


class ChatResponse(BaseModel):
    answer: str