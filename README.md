# 💾🎨🚀Confiteor - проект ваших задач

Проект фоновых задач.
Стек: FastApi (Python 3.12) + React

БД: PostgreSQL

![Логотип FastApi](https://github.com/HainoCreat/Confiteor/blob/a411497bc32f584b03c8db8bf32d8652392010ff/frontend/public/favicon.svg)

## 🎯 О проекте

**Confiteor** — проект создание ваших задач

![200](https://github.com/HainoCreat/Confiteor/blob/a4fbd2f756e854262d982a4c040218a1476785c7/images_repository/main.png)

## 📁 Структура проекта
```
confiteor/
│
├── backend # (Backend часть — FastApi)
│   ├── app
│   │   ├── admin
│   │   │   ├── __init__.py
│   │   │   ├── setup.py
│   │   │   └── views.py
│   │   ├── api #Версионированные эндпоинты
│   │   │   └── v1 #Первая версия
│   │   │       └── endpoints
│   │   │           ├── info_routers.py
│   │   │           └── tasks_routers.py
│   │   ├── domain #Доменные сущности
│   │   │   ├── models #Модели
│   │   │   │   ├── __init__.py
│   │   │   │   └── task.py
│   │   │   └── schemas #Схемы моделей
│   │   │       ├── __init__.py
│   │   │       └── task.py
│   │   ├── core
│   │   │   ├── db
│   │   │   │   ├── __init__.py
│   │   │   │   └── base.py
│   │   │   ├── __init__.py
│   │   │   ├── config.py
│   │   │   └── database.py
│   │   ├── crud
│   │   │   ├── __init__.py
│   │   │   └── task_crud.py
│   │   └── main.py #Основной файл Бэкэнда
│   ├── alembic/ # Управление миграциями
│   ├── .gitignore
│   ├── migration.sql
│   ├── requirements.txt
│   └── run.py # Файл запуска Бэкэнда (python run.py)
├── frontend (Frontend часть — React)
│   ├── public
│   │   ├── favicon.svg
│   │   └── icons.py
│   ├── src
│   │   ├── assets
│   │   ├── components
│   │   ├── pages
│   │   │   ├── tasks
│   │   │   │   ├── TaskCreate.tsx
│   │   │   │   ├── TaskDetail.tsx
│   │   │   │   ├── TaskEdit.tsx
│   │   │   │   └── TaskList.tsx
│   │   │   ├── info 
│   │   │   │   └── About.tsx
│   │   │   └── Home.jsx
│   │   ├── services
│   │   ├── App.css
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── .gitignore
│   ├── eslint.config.js
│   ├── index.html
│   ├── package-lock.json
│   ├── package.json
│   ├── vite.config
│   └── README.md #Базовая документация React
├── images_repository # Изображения для репозитория
└── README.md #Документация проекта
```