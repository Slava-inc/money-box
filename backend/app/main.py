# main.py
from fastapi import FastAPI
from backend.app.database import engine, Base
from backend.app.api.v1 import routes_users, routes_admin

# Создание таблиц в БД (лучше использовать Alembic для миграций)
Base.metadata.create_all(bind=engine)

app = FastAPI(title="Telegram Mini App Savings Tracker API")

app.include_router(routes_users.router)
app.include_router(routes_admin.router)

@app.get("/")
def read_root():
    return {"message": "Savings Tracker API"}

# uvicorn app.main:app --reload
