from typing import Optional
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func
from app.domain.models.task import TaskModel
from app.domain.schemas.task import TaskCreate, TaskUpdate

class TaskCrud():
    @staticmethod
    async def task_create(
        db: AsyncSession,
        task_data: TaskCreate
    ) -> TaskModel:
        new_task = TaskModel(
            title = task_data.title,
            description =task_data.description,
            status = task_data.status,
            is_active = task_data.is_active
        )

        db.add(new_task)
        await db.commit()

        await db.refresh(new_task)

        return new_task
    
    @staticmethod
    async def task_update(
        db: AsyncSession,
        task_id: int, 
        task_data: TaskUpdate
    ) -> Optional[TaskModel]:
        
        result = await db.execute(
            select(TaskModel)
            .where(TaskModel.id == task_id)
        )

        task = result.scalar_one_or_none()

        if not task:
            return None
        
        update_data = task_data.model_dump(exclude_unset=True)

        for field, value in update_data.items():
            setattr(task, field, value) 

        db.add(task)
        await db.commit()
        await db.refresh(task)

        return task

task_crud = TaskCrud()