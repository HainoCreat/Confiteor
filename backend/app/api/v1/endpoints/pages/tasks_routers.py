from fastapi import APIRouter

router = APIRouter (
    prefix="/tasks", 
    tags=["task_pages"]
    )

@router.get("/")
def task_list():
    return {"testmessage": "Круто", "tasks": []}