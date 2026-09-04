import React, { useRef } from 'react';
import { ArrowLeft, ArrowRight, MapPin, ShieldCheck, PawPrint, Tag } from 'lucide-react';
import { INITIAL_ANIMAL_LISTINGS } from '../data/mockData';

export const HomeMarketplacePreview: React.FC<{ onOpenMarketplace: () => void }> = ({ onOpenMarketplace }) => {
  const items = INITIAL_ANIMAL_LISTINGS.slice(0, 5);
  const trackRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'prev' | 'next') => {
    trackRef.current?.scrollBy({
      left: direction === 'next' ? trackRef.current.clientWidth * 0.78 : -trackRef.current.clientWidth * 0.78,
      behavior: 'smooth',
    });
  };

  return (
    <section className="home-market-preview">
      <div className="home-section-head">
        <div>
          <span className="eyebrow"><Tag className="w-4 h-4" /> ОБЪЯВЛЕНИЯ</span>
          <h2>Питомцы, которых сейчас ищут нового хозяина</h2>
          <p>Живая витрина объявлений из каталога ЗооМаяка и подключаемых источников.</p>
        </div>
        <div className="home-carousel-actions">
          <button className="carousel-arrow" onClick={() => scroll('prev')} aria-label="Предыдущие объявления"><ArrowLeft /></button>
          <button className="carousel-arrow" onClick={() => scroll('next')} aria-label="Следующие объявления"><ArrowRight /></button>
          <button className="ghost-link" onClick={onOpenMarketplace}>Все объявления <ArrowRight /></button>
        </div>
      </div>

      <div className="home-carousel">
        <div ref={trackRef} className="home-listing-grid home-listing-carousel">
          {items.map(item => (
            <article key={item.id} className="home-listing-card">
              <div className="home-listing-image">
                <img src={item.imageUrl} alt={item.title} />
                <span>{item.source}</span>
              </div>
              <div className="home-listing-body">
                <div className="home-listing-title">
                  <h3>{item.title}</h3>
                  <strong>{item.price.toLocaleString('ru-RU')} ₽</strong>
                </div>
                <p>{item.breed} · {item.age}</p>
                <div className="home-listing-meta">
                  <span><MapPin /> {item.city}</span>
                  {item.verified && <span className="verified-inline"><ShieldCheck /> Проверено</span>}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      <div className="home-market-note">
        <PawPrint />
        <span>Объявления можно размещать прямо в ЗооМаяке, а внешние площадки подключать через серверные парсеры и адаптеры.</span>
        <button onClick={onOpenMarketplace}>Разместить объявление <ArrowRight /></button>
      </div>
    </section>
  );
};
