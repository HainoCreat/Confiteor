from sqlalchemy import Column, Integer, String, Boolean, DateTime, Enum as SQLEnum
from sqlalchemy.orm import declarative_base
from sqlalchemy.sql import func
from datetime import datetime
from app.domain.schemas.task import TaskStatus

from app.core.db.base import Base

#Модели задач

class TaskModel(Base):
    __tablename__ = "tasks"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(255), nullable=False)
    description = Column(String(1000), nullable=False)
    is_active = Column(Boolean, default=True)
    status = Column(SQLEnum(TaskStatus), default=TaskStatus.NORMAL)
    created_at = Column(DateTime(timezone=True), server_default=func.now())