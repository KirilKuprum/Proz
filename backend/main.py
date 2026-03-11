import os
import requests
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv

load_dotenv()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://proz-azure.vercel.app"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

TELEGRAM_TOKEN = os.getenv("TELEGRAM_TOKEN", "8632700178:AAHOKybHsYs-a4rsZ1JsOpSNSQs_-7Q2ci8")
CHAT_ID = os.getenv("CHAT_ID", "5247430396")

def send_telegram_msg(text):
    url = f"https://api.telegram.org/bot{TELEGRAM_TOKEN}/sendMessage"
    payload = {
        "chat_id": CHAT_ID, 
        "text": text, 
        "parse_mode": "HTML"
    }
    try:
        response = requests.post(url, json=payload)
        response.raise_for_status()
    except Exception as e:
        print(f"Помилка відправки в Telegram: {e}")

@app.get("/")
async def root():
    return {
        "status": "online",
        "message": "Proz-Backend is running. Use POST /apply to send data."
    }

@app.post("/apply")
async def apply(request: Request):
    try:
        data = await request.json()
        name = data.get("name")
        phone = data.get("phone")
        message_text = data.get("message", "Не вказано")

        if not name or not phone:
            return {"status": "error", "message": "Name and phone are required"}

        tg_text = (
            f"<b>🚀 Нова заявка: Prozorro Консалт</b>\n"
            f"--------------------------\n"
            f"👤 <b>Клієнт:</b> {name}\n"
            f"📞 <b>Телефон:</b> {phone}\n"
            f"💬 <b>Питання:</b> {message_text}"
        )
        
        send_telegram_msg(tg_text)
        return {"status": "success", "message": "Заявку успішно надіслано!"}

    except Exception as e:
        return {"status": "error", "message": str(e)}
