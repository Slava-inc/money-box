# routes_admin.py
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from backend.app import auth, models, schemas # Предполагается, что будет проверка роли админа
from backend.app.database import get_db

router = APIRouter(prefix="/admin", tags=["admin"])

# Зависимость для проверки роли админа (пример)
def verify_admin(current_user: models.User = Depends(auth.get_current_user)):
    # Здесь должна быть логика проверки роли админа
    # Например, проверка telegram_id по списку разрешенных
    ADMIN_TELEGRAM_IDS = ["123456789", "987654321"] # Задать через env
    if current_user.telegram_id not in ADMIN_TELEGRAM_IDS:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Not enough permissions")
    return current_user

@router.get("/goals/", response_model=List[schemas.AdminGoalView])
def read_all_goals(
    skip: int = 0,
    limit: int = 100,
    admin_user: models.User = Depends(verify_admin),
    db: Session = Depends(get_db)
):
    # Запрос с join для получения данных пользователя и цели
    results = db.query(
        models.User.id.label("user_id"),
        models.User.username,
        models.Goal.name.label("goal_name"),
        models.Goal.target_amount,
        models.Goal.current_amount,
        models.Goal.start_amount,
        models.Goal.created_at
    ).join(models.Goal, models.User.id == models.Goal.user_id).offset(skip).limit(limit).all()

    # Преобразование результатов в схему
    goals_data = []
    for row in results:
        goals_data.append(schemas.AdminGoalView(
            user_id=row.user_id,
            username=row.username or "N/A",
            goal_name=row.goal_name,
            target_amount=row.target_amount,
            current_amount=row.current_amount,
            start_amount=row.start_amount,
            created_at=row.created_at
        ))
    return goals_data

# Добавьте другие эндпоинты для админ-панели (транзакции, активность и т.д.)
