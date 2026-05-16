from fastapi import APIRouter

router = APIRouter (
    prefix="/tasks", 
    tags=["task_pages"]
    )

@router.get("/")
async def task_list():
