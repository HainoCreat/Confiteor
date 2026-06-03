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

@router.post("/create", response_model=TaskDetail, status_code = status.HTTP_201_CREATED)
async def task_create(
    task_data: TaskCreate,
    db: AsyncSession = Depends(get_db)
    ):

    new_task = await task_crud.task_create(db, task_data)
    return new_task

@router.patch("/{task_id}", response_model=TaskDetail)
async def task_update(
    task_id: int,
    task_data: TaskUpdate,
    db: AsyncSession = Depends(get_db)
):
    
    update_task = await task_crud.task_update(db, task_id, task_data)

    if not update_task:
            raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Задача {task_id} не найдена!"
        )
    
    return update_task

@router.delete("/{task_id}", status_code=status.HTTP_204_NO_CONTENT)
async def task_delete(
    task_id: int,
    db: AsyncSession = Depends(get_db)
):
    result = await db.execute(
        select(TaskModel).where(TaskModel.id == task_id)
    )
    task = result.scalar_one_or_none()
    
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    
    await db.delete(task)
    await db.commit()
    return None