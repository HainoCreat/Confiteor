from sqladmin import ModelView
from app.domain.models.task import TaskModel

class TaskAdmin(ModelView, model=TaskModel):
    colum_list = [TaskModel.id, TaskModel.title, TaskModel.description, TaskModel.status, TaskModel.is_active, TaskModel.created_at] 
    colum_list_seacrh = [TaskModel.id, TaskModel.title]