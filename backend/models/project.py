from pydantic import BaseModel, Field
from uuid import UUID, uuid4
from datetime import datetime


class Project(BaseModel):
    id: UUID = Field(default_factory=uuid4)
    name: str
    description: str
    created_at: datetime = Field(default_factory=datetime.utcnow)