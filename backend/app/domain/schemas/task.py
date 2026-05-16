from pydantic import BaseModel, Field
from enum import Enum
from datetime import datetime

#Схемы

class TaskStatuc(str, Enum):
    NORMAL = "Обычная задача"
    MIDDLE = "Срочная задача"
    HARD = "Экстренная задача"

class TaskBase(BaseModel):
    id: int
    title: str
    description: str
    is_active: bool = True
    created_at: datetime = Field(default_factory=datetime.now) 
    status: TaskStatuc = TaskStatuc.NORMAL