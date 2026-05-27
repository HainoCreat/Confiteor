from http.client import HTTPException
from app.crud.task_crud import TaskCrud, task_crud
from fastapi import APIRouter, Depends, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.sql import func, select
from app.core.database import get_db
from app.domain.models.task import TaskModel
from app.domain.schemas.task import TaskStatus, TaskList, TasksResponse, TaskDetail, TaskCreate, TaskUpdate

from app.core.db.base import Base

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