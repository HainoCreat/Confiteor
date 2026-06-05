from app.presentation.api.v1.endpoints.pages import tasks_routers, info_routers
# from app.core.config import settings, Settings
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

import socket

from app.presentation.admin.setup import setup_admin

app = FastAPI()

def get_local_ip():
    try:
        s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        s.settimeout(0.1)
        s.connect(('8.8.8.8', 80))
        ip = s.getsockname()[0]
        s.close()
        return ip
    except Exception:
        return '127.0.0.1'

# Получаем LAN IP
lan_ip = get_local_ip()
print(f"🌐 Бэкенд запущен на IP: {lan_ip}")

# Настройка CORS
origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    f"http://{lan_ip}:5173",
    f"http://{lan_ip}:3000",
    f"http://{lan_ip}:5174",
    f"http://{lan_ip}:8000",
]

print("✅ Разрешенные CORS origins:")
for origin in origins:
    print(f"   {origin}")

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
    
