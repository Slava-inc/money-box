# main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from backend.app.database import engine, Base
from backend.app.api.v1 import routes_users, routes_admin

# Создание таблиц в БД (лучше использовать Alembic для миграций)
Base.metadata.create_all(bind=engine)

app = FastAPI(title="Telegram Mini App Savings Tracker API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://money-njxgzv3z7-slava-incs-projects.vercel.app/"],  # 3. ВАЖНО: Укажите реальные домены вашего фронтенда!
                         # Пример: ["https://miniapp1.vercel.app", "https://miniapp2.netlify.app"]
                         # Избегайте ["*"] в production!
    allow_credentials=True, # Разрешить передачу куки/авторизации
    allow_methods=["*"],    # Разрешить все методы (GET, POST, PUT, DELETE и т.д.)
    allow_headers=["*"],    # Разрешить все заголовки
    # expose_headers=["Access-Control-Allow-Origin"] # Опционально: указать, какие заголовки можно читать на клиенте
)

app.include_router(routes_users.router)
app.include_router(routes_admin.router)

@app.get("/")
def read_root():
    return {"message": "Savings Tracker API"}

# uvicorn backend.app.main:app --reload
# https://money-box-wkbl.onrender.com
