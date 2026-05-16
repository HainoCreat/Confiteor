from app.api.v1.endpoints.pages import tasks_routers
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# from app.api.v1.endpoints.pages.tasks_routers import task_list

app = FastAPI(title = "Confiteor — проект для ваших задач")

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
    return {"message": "Ответ от Реакт, Привет ФастАпи!"}

app.include_router(tasks_routers.router)
    
