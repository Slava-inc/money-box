# models.py
from sqlalchemy import Column, Integer, String, Float, DateTime, ForeignKey, func
from sqlalchemy.orm import relationship
from sqlalchemy.types import DateTime as SqlDateTime # Импортируем тип DateTime SQLAlchemy
from backend.app.database import Base
import datetime # Импортируем datetime Python

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    telegram_id = Column(String, unique=True, index=True) # ID из initData
    username = Column(String, index=True)
    first_name = Column(String)
    last_name = Column(String)
    # SQLite не поддерживает server_default=func.now() напрямую для DateTime
    # Лучше устанавливать значение по умолчанию в Python коде при создании объекта
    created_at = Column(SqlDateTime, default=datetime.datetime.utcnow) # Используем тип SQLAlchemy и datetime Python
    # Связь один-ко-многим с Goal
    goals = relationship("Goal", back_populates="user", cascade="all, delete-orphan") # cascade для каскадного удаления


class Goal(Base):
    __tablename__ = "goals"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    name = Column(String, index=True)
    target_amount = Column(Float)
    current_amount = Column(Float, default=0.0)
    start_amount = Column(Float, default=0.0)
    # Аналогично с created_at
    created_at = Column(SqlDateTime, default=datetime.datetime.utcnow) # Используем тип SQLAlchemy и datetime Python
    # Связь многие-к-одному с User
    user = relationship("User", back_populates="goals")
    # Связь один-ко-многим с Transaction
    transactions = relationship("Transaction", back_populates="goal", cascade="all, delete-orphan")


class Transaction(Base):
    __tablename__ = "transactions"

    id = Column(Integer, primary_key=True, index=True)
    goal_id = Column(Integer, ForeignKey("goals.id"))
    amount = Column(Float) # Положительное - пополнение, отрицательное - снятие
    # Аналогично с timestamp
    timestamp = Column(SqlDateTime, default=datetime.datetime.utcnow) # Используем тип SQLAlchemy и datetime Python
    # Связь многие-к-одному с Goal
    goal = relationship("Goal", back_populates="transactions")

# Модель для логов активности (если нужна отдельная таблица)
# class ActivityLog(Base):
#     __tablename__ = "activity_logs"
#     id = Column(Integer, primary_key=True, index=True)
#     user_id = Column(Integer, ForeignKey("users.id"))
#     action = Column(String) # 'login', 'goal_created', 'transaction', 'logout'
#     details = Column(String) # JSON или текст с деталями
#     timestamp = Column(SqlDateTime, default=datetime.datetime.utcnow)
#     user = relationship("User")
