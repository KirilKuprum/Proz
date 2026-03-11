from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
import os
import requests
from dotenv import load_dotenv

load_dotenv()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://proz-azure.vercel.app"], 
    allow_methods=["*"],
    allow_headers=["*"],
)

TELEGRAM_TOKEN = "8632700178:AAHOKybHsYs-a4rsZ1JsOpSNSQs_-7Q2ci8"
CHAT_ID = "5247430396"

def send_telegram_msg(text):
    url = f"https://api.telegram.org/bot{TELEGRAM_TOKEN}/sendMessage"
    payload = {
        "chat_id": CHAT_ID,
        "text": text,
        "parse_mode": "HTML"
    }
    try:
        requests.post(url, json=payload)
    except Exception as e:
        print(f"Помилка відправки в Telegram: {e}")

@app.post("/apply")
async def apply(request: Request):
    data = await request.json()
    name = data.get("name")
    phone = data.get("phone")
    message_text = data.get("message")

    if not name or not phone:
        return {"status": "error", "message": "Ім'я та телефон обов'язкові"}

    tg_text = (
        f"<b>🚀 Нова заявка: Prozorro Консалт</b>\n"
        f"--------------------------\n"
        f"👤 <b>Клієнт:</b> {name}\n"
        f"📞 <b>Телефон:</b> {phone}\n"
        f"💬 <b>Питання:</b> {message_text}\n"
    )
    
    send_telegram_msg(tg_text)

    return {"status": "success", "message": "Заявку успішно надіслано!"}
