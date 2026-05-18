from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func
from app.domain.models.task import TaskModel
from app.domain.schemas.task import TaskCreate

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

task_crud = TaskCrud()