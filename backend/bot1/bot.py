# bot1/bot.py
import logging
from telegram import Update, WebAppInfo, InlineKeyboardButton, InlineKeyboardMarkup
from telegram.ext import Application, CommandHandler, ContextTypes
import os
from dotenv import load_dotenv

load_dotenv(dotenv_path='env_vars')

# Включаем логирование
logging.basicConfig(
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s', level=logging.INFO
)
logger = logging.getLogger(__name__)

# Получаем токен бота и URL Mini App из переменных окружения
BOT_TOKEN = os.getenv("TELEGRAM_BOT1_TOKEN")
MINIAPP_URL = os.getenv("MINIAPP1_URL") # Например, https://your-miniapp1.vercel.app

if not BOT_TOKEN or not MINIAPP_URL:
    raise ValueError("TELEGRAM_BOT1_TOKEN and MINIAPP1_URL environment variables must be set")

async def start(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    """Отправляет сообщение с кнопкой WebApp."""
    # Создаем кнопку WebApp
    keyboard = [[InlineKeyboardButton("Открыть Копилку 1", web_app=WebAppInfo(url=MINIAPP_URL))]]
    reply_markup = InlineKeyboardMarkup(keyboard)

    await update.message.reply_text(
        "Добро пожаловать в Копилку 1! Нажмите кнопку ниже, чтобы открыть приложение.",
        reply_markup=reply_markup
    )

def main() -> None:
    """Запуск бота."""
    application = Application.builder().token(BOT_TOKEN).build()

    application.add_handler(CommandHandler("start", start))

    # Запуск бота до тех пор, пока пользователь не нажмет Ctrl-C
    application.run_polling(allowed_updates=Update.ALL_TYPES)

if __name__ == "__main__":
    main()
