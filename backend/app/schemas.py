# schemas.py
from pydantic import BaseModel
from typing import Optional
from datetime import datetime

# Pydantic модели для валидации и сериализации данных

class UserBase(BaseModel):
    telegram_id: str
    username: Optional[str] = None
    first_name: Optional[str] = None
    last_name: Optional[str] = None

class UserCreate(UserBase):
    pass

class User(UserBase):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True # Для работы с ORM моделями

class GoalBase(BaseModel):
    name: str
    target_amount: float
    start_amount: float = 0.0

class GoalCreate(GoalBase):
    pass

class Goal(GoalBase):
    id: int
    user_id: int
    current_amount: float
    created_at: datetime

    class Config:
        from_attributes = True

class TransactionBase(BaseModel):
    amount: float

class TransactionCreate(TransactionBase):
    pass

class Transaction(TransactionBase):
    id: int
    goal_id: int
    timestamp: datetime

    class Config:
        from_attributes = True

# Схема для лидерборда
class LeaderboardEntry(BaseModel):
    rank: int
    username: str
    progress_percentage: float

# Схема для админ-панели (пример)
class AdminGoalView(BaseModel):
    user_id: int
    username: str
    goal_name: str
    target_amount: float
    current_amount: float
    start_amount: float
    created_at: datetime
    # Можно добавить список транзакций
    # transactions: List[Transaction]

    class Config:
        from_attributes = True
