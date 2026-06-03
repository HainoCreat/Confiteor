from app.infrastructure.core.database import sync_engine
from sqladmin import Admin

from app.presentation.admin.views import TaskAdmin

def setup_admin(app):
    admin = Admin(app, sync_engine, base_url="/core_admin", title="Админка")
    admin.add_view(TaskAdmin)