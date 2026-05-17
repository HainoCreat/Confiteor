from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import sessionmaker, declarative_base
import os
from dotenv import load_dotenv
from app.core.db.base import Base

from sqlalchemy import create_engine  # синхронный
from sqlalchemy.orm import sessionmaker

load_dotenv()

ASYNC_DB_URL = os.getenv("DATABASE_URL_ASYNC")

engine = create_async_engine(ASYNC_DB_URL, echo=True, future=True)
AsyncSessionLocal = sessionmaker(engine, class_=AsyncSession, expire_on_commit=False)

SYNC_DB_URL = os.getenv("DATABASE_URL_SYNC") 
sync_engine = create_engine(SYNC_DB_URL, echo=True)
SyncSessionLocal = sessionmaker(bind=sync_engine)


async def get_db():
    async with AsyncSessionLocal() as session:
        yield session