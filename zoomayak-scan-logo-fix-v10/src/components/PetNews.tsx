import React, { useRef } from 'react';
import { ArrowLeft, ArrowRight, CalendarDays, Heart } from 'lucide-react';

const NEWS = [
  {id:1,title:'Как подготовить питомца к осеннему сезону',date:'18 августа 2026',category:'Здоровье',image:'https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=crop&w=900&q=80',text:'Что проверить дома, какие обработки не забыть и когда пора записаться к ветеринару.'},
  {id:2,title:'Почему QR-маяк полезен даже домашнему питомцу',date:'15 августа 2026',category:'Безопасность',image:'https://images.unsplash.com/photo-1495360010541-f48722b34f7d?auto=format&fit=crop&w=900&q=80',text:'Цифровой профиль помогает быстро вернуть питомца домой, если он потерялся.'},
  {id:3,title:'Питание собак: что действительно важно',date:'12 августа 2026',category:'Питание',image:'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=900&q=80',text:'Возраст, активность, вес и индивидуальные особенности — разбираем основу рациона.'},
  {id:4,title:'Как читать ветеринарный паспорт',date:'9 августа 2026',category:'Документы',image:'https://images.unsplash.com/photo-1558788353-f76d92427f16?auto=format&fit=crop&w=900&q=80',text:'Какие отметки важны, что проверять перед поездкой и зачем хранить историю лечения.'},
];

export const PetNews: React.FC = () => {
  const trackRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'prev' | 'next') => {
    trackRef.current?.scrollBy({
      left: direction === 'next' ? trackRef.current.clientWidth * 0.78 : -trackRef.current.clientWidth * 0.78,
      behavior: 'smooth',
    });
  };

  return (
    <section className="pet-news-section">
      <div className="home-section-head">
        <div>
          <span className="eyebrow"><Heart className="w-4 h-4" /> НОВОСТИ ЗООМАЯКА</span>
          <h2>Полезное о домашних питомцах</h2>
          <p>Короткие материалы о здоровье, безопасности, уходе и жизни с питомцами.</p>
        </div>
        <div className="home-carousel-actions">
          <button className="carousel-arrow" onClick={() => scroll('prev')} aria-label="Предыдущие новости"><ArrowLeft /></button>
          <button className="carousel-arrow" onClick={() => scroll('next')} aria-label="Следующие новости"><ArrowRight /></button>
          <button className="ghost-link">Все новости <ArrowRight /></button>
        </div>
      </div>

      <div className="home-carousel">
        <div ref={trackRef} className="pet-news-grid pet-news-carousel">
          {NEWS.map(n => (
            <article className="pet-news-card" key={n.id}>
              <img src={n.image} alt={n.title}/>
              <div className="pet-news-body">
                <div className="pet-news-meta"><span>{n.category}</span><time><CalendarDays/> {n.date}</time></div>
                <h3>{n.title}</h3>
                <p>{n.text}</p>
                <button>Читать <ArrowRight/></button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
