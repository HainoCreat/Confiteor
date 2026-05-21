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
│   │   ├── domain
│   │   ├── auth
│   │   ├── core
│   │   ├── crud
│   │   └── main.py
│   ├── alembic
│   ├── .gitignore
│   ├── migration.sql
│   ├── requirements.txt
│   └── run.py # Файл запуска Бэкэнда (python run.py)
├── frontend (Frontend часть — React)
├── images_repository # Изображения для репозитория
└── README.md #Документация проекта
```