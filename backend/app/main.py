from app.api.v1.endpoints.pages import tasks_routers
from app.api.v1.endpoints.pages import info_routers
# from app.core.config import settings, Settings
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.admin.setup import setup_admin

# from app.api.v1.endpoints.pages.tasks_routers import task_list

# app = FastAPI(title=settings.APP_NAME, debug=settings.DEBUG)
app = FastAPI()

origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def home():
    return {"message": "Ошибка — Успех!"}

# Роуты 
app.include_router(tasks_routers.router)
app.include_router(info_routers.router)
# Админка
setup_admin(app)
    
