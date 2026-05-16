from pydantic import BaseModel, Field
from enum import Enum
from datetime import datetime

from typing import List

#Схемы

class TaskStatus(str, Enum):
    NORMAL = "Обычная задача"
    MIDDLE = "Срочная задача"
    HARD = "Экстренная задача"

class TaskBase(BaseModel):
    id: int
    title: str
    description: str
    is_active: bool = True
    created_at: datetime = Field(default_factory=datetime.now) 
    status: TaskStatus = TaskStatus.NORMAL

class TaskList(BaseModel):
    title: str
    status: TaskStatus

    class Config:
        from_attributes = True

class TasksResponse(BaseModel):
    tasks:List[TaskList]
    total: int