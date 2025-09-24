# auth.py
import hashlib
import hmac
from urllib.parse import parse_qs, unquote
import time
from fastapi import HTTPException, status, Depends
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
import os
from sqlalchemy.orm import Session
from backend.app.database import get_db
from backend.app import models, schemas

# Получаем токен бота из переменных окружения
BOT_TOKEN = os.getenv("TELEGRAM_BOT1_TOKEN")
if not BOT_TOKEN:
    raise ValueError("TELEGRAM_BOT1_TOKEN environment variable is not set")

security = HTTPBearer()

class TMAAuthError(Exception):
    """Пользовательское исключение для ошибок аутентификации TMA"""
    pass

def validate_init_data(init_data: str) -> dict:
    """
    Проверяет подпись initData и возвращает распарсенные данные.
    https://core.telegram.org/bots/webapps#validating-data-received-via-the-web-app
    """
    try:
        parsed_data = parse_qs(init_data, keep_blank_values=True)
        # Удаляем 'hash' из данных для подписи
        hash_value = parsed_data.pop('hash', [None])[0]
        if not hash_value:
            raise TMAAuthError("Hash not found in initData")

        # Подготавливаем данные для подписи
        data_check_string = "\n".join(sorted([f"{k}={v[0]}" for k, v in parsed_data.items() if v[0]]))
        
        # Создаем секретный ключ
        secret_key = hmac.new(b"WebAppData", BOT_TOKEN.encode(), hashlib.sha256).digest()
        
        # Вычисляем подпись
        calculated_hash = hmac.new(secret_key, data_check_string.encode(), hashlib.sha256).hexdigest()
        
        # Проверяем подпись
        if calculated_hash != hash_value:
            raise TMAAuthError("Invalid hash signature")

        # Проверяем auth_date (например, не старше 1 дня)
        auth_date_str = parsed_data.get('auth_date', [None])[0]
        if not auth_date_str:
             raise TMAAuthError("auth_date not found")
        auth_date = int(auth_date_str)
        if time.time() - auth_date > 86400: # 1 день
             raise TMAAuthError("InitData is too old")

        # Возвращаем распарсенные данные
        result = {}
        for key, value_list in parsed_data.items():
            result[key] = value_list[0] if value_list else None
            if key == 'user' and result[key]:
                # user - это JSON строка
                import json
                result[key] = json.loads(unquote(result[key]))
        return result

    except (ValueError, KeyError, json.JSONDecodeError) as e:
        raise TMAAuthError(f"Error parsing initData: {e}")


async def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(security),
    db: Session = Depends(get_db)
) -> models.User:
    """
    Dependency для получения текущего пользователя по initData.
    """
    init_data_str = credentials.credentials # Ожидаем формат "Bearer <initData>"
    
    try:
        validated_data = validate_init_data(init_data_str)
        user_data = validated_data.get('user')
        if not user_data:
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="User data not found in initData")

        telegram_id = str(user_data['id'])
        username = user_data.get('username')
        first_name = user_data.get('first_name')
        last_name = user_data.get('last_name')

        # Найти или создать пользователя в БД
        db_user = db.query(models.User).filter(models.User.telegram_id == telegram_id).first()
        if not db_user:
            db_user = models.User(
                telegram_id=telegram_id,
                username=username,
                first_name=first_name,
                last_name=last_name
            )
            db.add(db_user)
            db.commit()
            db.refresh(db_user)
        # Можно обновить данные пользователя, если они изменились
        # elif db_user.username != username or ...:
        #     db_user.username = username
        #     ...
        #     db.commit()
        #     db.refresh(db_user)

        return db_user

    except TMAAuthError as e:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail=str(e))
    except Exception as e:
        # Логирование ошибки
        print(f"Unexpected error in get_current_user: {e}")
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Authentication error")
