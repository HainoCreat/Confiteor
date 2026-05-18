from typing import Generic, TypeVar, Type, List, Optional
from sqlalchemy.orm import Session
from sqlalchemy.future import select
from pydantic import BaseModel

from app.core.db.base import Base

from app.domain.models.task import TaskModel

