import React, { useState } from 'react';
import './App.css';

function App() {
  const [formData, setFormData] = useState({ name: '', phone: '', message: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch('https://proz-backend.onrender.com/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        alert('Дякуємо! Заявка надіслана.');
        setFormData({ name: '', phone: '', message: '' });
      } else {
        alert('Помилка сервера.');
      }
    } catch (error) {
      alert('Не вдалося з’єднатися з сервером.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="landing">
      <header className="hero-section">
        <h1>Prozorro Консалт</h1>
        <p>Підготовка тендерних пропозицій</p>
      </header>
      <main className="container">
        <form className="contact-form" onSubmit={handleSubmit}>
          <input 
            type="text" placeholder="Ваше ім'я" required 
            value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})}
          />
          <input 
            type="tel" placeholder="Ваш телефон" required 
            value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})}
          />
          <textarea 
            placeholder="Запитання" 
            value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})}
          ></textarea>
          <button type="submit" disabled={loading}>
            {loading ? 'Надсилання...' : 'Відправити запит'}
          </button>
        </form>
      </main>
    </div>
  );
}

export default App;
