from pydantic_settings import BaseSettings, SettingsConfigDict
from dotenv import load_dotenv

import os

load_dotenv()

class Settings(BaseSettings):
    SECRET_KEY = os.getenv("SECRET_KEY", "fallback_secret_key")
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    REFRESH_TOKEN_EXPIRE_DAYS: int = 7

    APP_NAME = "Confiteor"
    DEBUG: bool = True

settings = Settings()