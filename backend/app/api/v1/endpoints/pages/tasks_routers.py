from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.sql import func, select
from app.core.database import get_db
from app.domain import schemas
from app.domain import models
from app.domain.models.task import TaskModel
from app.domain.schemas.task import TaskStatus, TaskList, TasksResponse


router = APIRouter (
    prefix="/tasks", 
    tags=["task_pages"]
    )

@router.get("/", response_model=schemas.task.TasksResponse)
async def task_list(
    page_skip: int = 0,  #Пагинация.
    page_limit: int = 100,
    db: AsyncSession = Depends(get_db)
):

    result = await db.execute( #LINQ
        select(TaskModel)
        .offset(page_skip)
        .limit(page_limit)
        .order_by(TaskModel.created_at.desc())
    )
    tasks = result.scalars().all()
    
    task_list = [
        schemas.TaskList(
            title=task.title,
            status=task.status
        ) for task in tasks
    ]
    
    total_result = await db.execute(select(func.count()).select_from(models.Task))
    total = total_result.scalar()
    
    return schemas.TasksResponse(
        tasks=task_list,
        total=total
    )