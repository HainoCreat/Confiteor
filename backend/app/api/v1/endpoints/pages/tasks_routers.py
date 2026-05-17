from http.client import HTTPException
from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.sql import func, select
from app.core.database import get_db
from app.domain import schemas
from app.domain import models
from app.domain.models.task import TaskModel
from app.domain.schemas.task import TaskStatus, TaskList, TasksResponse, TaskDetail

from app.core.db.base import Base


router = APIRouter (
    prefix="/tasks", 
    tags=["task_pages"]
    )

@router.get("/", response_model=TasksResponse)
async def task_list(
    skip: int = 0, #Пагинация
    limit: int = 100,
    page: int = 1,      
    size: int = 50, 

    db: AsyncSession = Depends(get_db)
    ):

    if page > 0:
        skip = (page - 1) * size
        limit = size

    result = await db.execute( #LINQ
        select(TaskModel) #TaskMoodel - название модели из domain/models/task
        .offset(skip)
        .limit(limit)
        .order_by(TaskModel.created_at.desc())
    )
    tasks = result.scalars().all()
    
    task_list = [
        TaskList(
            id=task.id,
            title=task.title,
            status=task.status
        )
        for task in tasks
    ]
    
    total_result = await db.execute(select(func.count()).select_from(TaskModel))
    total = total_result.scalar()
    
    return TasksResponse(
        tasks=task_list,
        total=total
    )

@router.get("/{task_id}", response_model = TaskDetail)
async def task_detail(
    task_id: int,
    db: AsyncSession = Depends(get_db)
    ):
    result = await db.execute(
    select(TaskModel).where(TaskModel.id == task_id)
    )

    task = result.scalar_one_or_none()
    if not task:
        raise HTTPException(status_code=404, detail="Task not found/Задача не найдена")
    return task 

