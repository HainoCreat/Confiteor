from http.client import HTTPException
from app.application.crud.task_crud import TaskCrud, task_crud
from fastapi import APIRouter, Depends, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.sql import func, select
from app.infrastructure.core.database import get_db
from app.domain.entities.task import TaskModel
from app.application.schemas.task import TaskStatus, TaskList, TasksResponse, TaskDetail, TaskCreate, TaskUpdate

from app.infrastructure.core.db.base import Base

router = APIRouter (
    prefix="/info", 
    tags=["info_pages"]
    )

@router.get("/")
def info_main():
    return{
        "title": "О нас",
        "message": "Confiteor — проект для любых ваших задач! Вы можете: Создать и отредактировать задачу, а так же установить ее срочность."
    }