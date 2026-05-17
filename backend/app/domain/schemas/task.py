from pydantic import BaseModel, Field
from enum import Enum
from datetime import datetime

from typing import List

from app.core.db.base import Base

#Схемы

"""Статусы задач"""
class TaskStatus(str, Enum):
    NORMAL = "Обычная задача"
    MIDDLE = "Срочная задача"
    HARD = "Экстренная задача"

"""Базовая схема задчаи, описывающая все свойства"""
class TaskBase(BaseModel):
    id: int
    title: str
    description: str
    is_active: bool = True
    created_at: datetime = Field(default_factory=datetime.now) 
    status: TaskStatus = TaskStatus.NORMAL

"""Список задач"""
class TaskList(BaseModel):
    id: int
    title: str
    status: TaskStatus

    class Config:
        from_attributes = True

"""Список(Каталог) задач"""
class TasksResponse(BaseModel):
    tasks:List[TaskList]
    total: int


"""Отдельная схема для детальной страницы. Она полностью дублирует TaskBase"""
class TaskDetail(TaskBase):
    pass

    class Config:
        from_attributes = True