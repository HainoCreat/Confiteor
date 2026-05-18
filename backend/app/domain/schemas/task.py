from pydantic import BaseModel, Field
from enum import Enum
from datetime import datetime

from typing import List, Optional

from app.core.db.base import Base

#Схемы

"""Статусы задач"""
class TaskStatus(str, Enum):
    NORMAL = "Обычная задача"
    MIDDLE = "Срочная задача"
    HARD = "Экстренная задача"

"""Базовая схема задчаи, описывающая все свойства"""
class TaskBase(BaseModel):
    title: str
    description: str
    is_active: bool = True
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
    id: int
    created_at: datetime

    class Config:
        from_attributes = True


"""Схема создания задачи"""
class TaskCreate(TaskBase):
    pass

"""Схема обновления модели"""
class TaskUpdate(BaseModel):
    title: Optional[str] = Field(None, min_length=1)
    description: Optional[str]= Field(None)
    is_active: Optional[bool]= None
    status: Optional[TaskStatus]= None

    class Config:
        extra = "forbid"
        from_attributes = True