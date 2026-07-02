from pydantic import BaseModel, Field
from uuid import UUID, uuid4
from datetime import datetime


class Document(BaseModel):

    id: UUID = Field(default_factory=uuid4)

    project_id: str

    filename: str

    filepath: str

    uploaded_at: datetime = Field(default_factory=datetime.utcnow)