import React, { useState } from 'react';
import './App.css';

function ServiceCard(props) {
  return (
    <div className="service-card">
      <div className="service-icon-wrapper">
        <img src={props.iconUrl} alt={props.text} className="service-icon-img" />
      </div>
      <p className="service-text"><strong>{props.text}</strong></p>
    </div>
  );
}

function ReviewBubble(props) {
  return (
    <div className="review-bubble">
      <p>"{props.text}"</p>
      <div className="review-author">{props.author}</div>
    </div>
  );
}

function PriceRow(props) {
  return (
    <div className="price-row">
      <span>{props.label}</span>
      <span className="price-value">{props.price}</span>
    </div>
  );
}

function App() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    message: ''
  });

  function handleScroll() {
    document.getElementById('contacts').scrollIntoView({ behavior: 'smooth' });
  }

  const handleSubmit = async (e) => {
    e.preventDefault(); 

    try {
      const response = await fetch('https://proz-backend.onrender.com/apply', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        alert('Дякуємо! Ваша заявка надіслана в Telegram.');
        setFormData({ name: '', phone: '', message: '' });
      } else {
        alert('Помилка: ' + result.message);
      }
    } catch (error) {
      console.error('Помилка зв\'язку з сервером:', error);
      alert('Не вдалося з\'єднатися з сервером. Переконайтеся, що FastAPI запущений.');
    }
  };

  return (
    <div className="landing">
      <section className="hero-section">
        <div className="container">
          <h1 className="hero-title">
            Підготовка тендерних пропозицій у системі Prozorro
          </h1>
          <p className="hero-subtitle">
            Допомога компаніям брати участь у публічних закупівлях та перемагати
          </p>
          <button className="btn-primary" onClick={handleScroll}>
            Безкоштовна консультація
          </button>
        </div>
      </section>

      <section className="services-section">
  <div className="container">
    <h2 className="section-title">Чим я можу допомогти</h2>
    <div className="services-grid">
      <ServiceCard 
        iconUrl="https://cdn-icons-png.flaticon.com/512/1055/1055644.png" 
        text="Аналіз тендерної документації" 
      />
      <ServiceCard 
        iconUrl="https://cdn-icons-png.flaticon.com/512/2666/2666505.png" 
        text="Підготовка тендерної пропозиції" 
      />
      <ServiceCard 
        iconUrl="https://www.freepik.com/icon/gavel_3373729" 
        text="Супровід закупівель" 
      />
      <ServiceCard 
        iconUrl="https://cdn-icons-png.flaticon.com/512/1048/1048953.png" 
        text="Оскарження в АМКУ" 
      />
    </div>
  </div>
</section>

      <section className="experience-section">
        <div className="container">
          <h2 className="section-title white" style={{ color: 'white' }}>Мій досвід</h2>
          <ul className="experience-list">
            <li><span>✔</span> 10+ років у сфері державних закупівель</li>
            <li><span>✔</span> Практика у великому державному замовнику</li>
            <li><span>✔</span> Глибоке знання Prozorro та законодавства</li>
            <li><span>✔</span> Сотні успішно поданих тендерних пропозицій</li>
          </ul>
        </div>
      </section>

      <section className="reviews-section">
        <div className="container">
          <h2 className="section-title">Відгуки клієнтів</h2>
          <div className="reviews-grid">
            <ReviewBubble 
              text="Завдяки вам ми виграли складний тендер. Все було підготовлено професійно. Рекомендую!" 
              author="Олександр, Будкомпанія" 
            />
            <ReviewBubble 
              text="Дуже допомогли з оскарженням. Професійний підхід і швидкий результат!" 
              author="Ірина, Медтех" 
            />
          </div>
        </div>
      </section>

      <section className="pricing-section">
        <div className="container">
          <h2 className="section-title">Вартість послуг</h2>
          <div className="price-table">
            <PriceRow label="Аналіз тендеру" price="від 500 грн" />
            <PriceRow label="Підготовка пропозиції" price="від 3000 грн" />
            <PriceRow label="Супровід тендеру" price="від 5000 грн" />
          </div>
        </div>
      </section>

      <footer className="footer-section" id="contacts">
        <div className="container footer-flex">
          <div className="contact-info">
            <h2 className="footer-title">Зв'яжіться зі мною</h2>
            <p>📞 <strong>Тел:</strong> +38 (050) 614-06-05</p>
            <p>📧 <strong>Email:</strong> skript1982@gmail.com</p>
            <p>✈ <strong>Telegram:</strong> @tendeconsult_pro</p>
          </div>

          <form className="contact-form" onSubmit={handleSubmit}>
            <input 
              type="text" 
              placeholder="Ваше ім'я" 
              required 
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
            <input 
              type="tel" 
              placeholder="Ваш телефон" 
              required 
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
            />
            <textarea 
              placeholder="Ваше запитання" 
              rows="4" 
              required 
              value={formData.message}
              onChange={(e) => setFormData({...formData, message: e.target.value})}
            ></textarea>
            <button type="submit" className="btn-primary">Відправити запит</button>
          </form>
        </div>
      </footer>
    </div>
  );
}

export default App;
