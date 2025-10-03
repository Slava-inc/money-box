# routes_users.py
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from backend.app import auth, models, schemas
from backend.app.database import get_db

router = APIRouter(prefix="/user", tags=["user"])

@router.post("/goal/", response_model=schemas.Goal)
def create_goal_for_user(
    goal: schemas.GoalCreate,
    current_user: models.User = Depends(auth.get_current_user),
    db: Session = Depends(get_db)
):
    db_goal = models.Goal(**goal.dict(), user_id=current_user.id, current_amount=goal.start_amount)
    db.add(db_goal)
    db.commit()
    db.refresh(db_goal)
    return db_goal

@router.get("/goal/", response_model=schemas.Goal)
def read_user_goal(
    current_user: models.User = Depends(auth.get_current_user),
    db: Session = Depends(get_db)
):
    db_goal = db.query(models.Goal).filter(models.Goal.user_id == current_user.id).first()
    if db_goal is None:
        raise HTTPException(status_code=404, detail="Goal not found for user")
    return db_goal

@router.post("/goal/transaction/", response_model=schemas.Transaction)
def add_transaction(
    transaction: schemas.TransactionCreate,
    current_user: models.User = Depends(auth.get_current_user),
    db: Session = Depends(get_db)
):
    db_goal = db.query(models.Goal).filter(models.Goal.user_id == current_user.id).first()
    if db_goal is None:
        raise HTTPException(status_code=404, detail="Goal not found for user")

    # Проверка на отрицательную сумму больше текущей
    if transaction.amount < 0 and abs(transaction.amount) > db_goal.current_amount:
         raise HTTPException(status_code=400, detail="Insufficient funds")

    db_transaction = models.Transaction(**transaction.dict(), goal_id=db_goal.id)
    db.add(db_transaction)
    db_goal.current_amount += transaction.amount
    db.commit()
    db.refresh(db_transaction)
    # Так же обновляем goal после коммита транзакции
    db.refresh(db_goal)
    return db_transaction

@router.get("/leaderboard/", response_model=List[schemas.LeaderboardEntry])
def get_leaderboard(
    limit: int = 10, # Ограничение количества записей
    current_user: models.User = Depends(auth.get_current_user), # Требуется для авторизации, даже если не используется
    db: Session = Depends(get_db)
):
    # Запрос к БД для получения лидерборда
    # Пример запроса (может потребоваться адаптация):
    from sqlalchemy import text
    sql = text("""
        SELECT
            ROW_NUMBER() OVER (ORDER BY (g.current_amount / g.target_amount) DESC) as rank,
            u.username,
            (g.current_amount / g.target_amount) * 100 as progress_percentage
        FROM goals g
        JOIN users u ON g.user_id = u.id
        WHERE g.target_amount > 0
        ORDER BY progress_percentage DESC
        LIMIT :limit
    """)
    result = db.execute(sql, {"limit": limit}).fetchall()
    # Преобразуем результат в список Pydantic моделей
    leaderboard = [schemas.LeaderboardEntry(rank=row.rank, username=row.username or "Anonymous", progress_percentage=row.progress_percentage) for row in result]
    return leaderboard

@router.get("/debug-initdata/", response_model=schemas.User)
def debug_initdata(
    current_user: models.User = Depends(auth.get_current_user),
    db: Session = Depends(get_db)
):
    """
    Эндпоинт для отладки: возвращает текущего пользователя.
    Используется для проверки, что initData дошла до бэкенда и была успешно проверена.
    """
    # Возвращаем пользователя, чтобы подтвердить, что аутентификация прошла успешно
    return current_user