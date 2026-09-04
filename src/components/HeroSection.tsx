import React from 'react';
import { ArrowRight, CheckCircle2, Droplets, QrCode, Radio, ShieldCheck, Sparkles } from 'lucide-react';
import { ZoomayakQR } from './ZoomayakQR';
import { ZoomayakLogo } from './ZoomayakLogo';

interface HeroSectionProps {
  onOpenCabinet: () => void;
  onOpenCollarStudio: () => void;
  onOpenSOS: () => void;
  onOpenListings: () => void;
}

const TAGS = [
  { id: 'circle', title: 'Круг', size: '30 мм', note: 'Классика', shape: 'circle' as const },
  { id: 'paw', title: 'Лапа', size: '30×32 мм', note: 'Дружелюбный', shape: 'paw' as const },
  { id: 'shield', title: 'Щит', size: '28×34 мм', note: 'Надёжный', shape: 'shield' as const },
];

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenCabinet, onOpenCollarStudio, onOpenSOS, onOpenListings }) => {
  const sampleQr = typeof window !== 'undefined' ? `${window.location.origin}/qr/ZM-7X3B-9K2D` : 'https://zoomayak.ru/qr/ZM-7X3B-9K2D';

  return (
    <section className="home-shell max-w-[1400px] mx-auto px-4 sm:px-6 xl:px-8 py-5 lg:py-6">
      <div className="home-hero-grid">
        <div className="hero-main-card">
          <div className="hero-copy">
            <span className="eyebrow"><ShieldCheck className="w-4 h-4" /> ЗООМАЯК · ЦИФРОВОЙ МАЯК ПИТОМЦА</span>
            <h1>Один QR.<br /><span>Любая форма адресника.</span></h1>
            <p>Главная — витрина сервиса: профиль, поиск и стальной QR-жетон. Личные данные питомца открываются только в кабинете.</p>
            <div className="hero-actions">
              <button onClick={onOpenCollarStudio} className="primary-cta"><QrCode className="w-4 h-4" /> Создать QR-адресник <ArrowRight className="w-4 h-4" /></button>
              <button onClick={onOpenCabinet} className="secondary-cta">Личный кабинет</button>
            </div>
            <div className="hero-benefits">
              <span><CheckCircle2 /> Постоянный ZM-ID</span>
              <span><CheckCircle2 /> Логотип в QR и на жетоне</span>
              <span><CheckCircle2 /> Контакты только с согласия</span>
            </div>
          </div>
        </div>

        <aside className="hero-product-card">
          <div className="hero-product-brand"><ZoomayakLogo compact /><span>помогаем найти, соединяем сердца</span></div>
          <h2>Прототипы QR-адресников</h2>
          <p>Один код работает на круге, лапе и щите. На лице — знак ЗооМаяка, на обороте — ссылка на публичную карточку.</p>
          <div className="tag-proto-row">
            {TAGS.map((tag) => (
              <button key={tag.id} type="button" className={`tag-proto tag-proto-${tag.shape}`} onClick={onOpenCollarStudio}>
                <div className="tag-proto-face">
                  <ZoomayakQR value={sampleQr} size={72} />
                  <small>♥ ЗооМаяк ♥</small>
                </div>
                <strong>{tag.title}</strong>
                <span>{tag.size} · {tag.note}</span>
              </button>
            ))}
          </div>
        </aside>
      </div>

      <div className="home-lower-grid">
        <div className="panel-card home-spec-card">
          <div className="panel-heading"><div><span className="eyebrow compact"><Sparkles className="w-3.5 h-3.5" /> ЖЕТОН</span><h3>Сталь, гравировка, влага</h3></div><button onClick={onOpenListings} className="panel-link">Объявления →</button></div>
          <div className="home-spec-row"><span><ShieldCheck /> Нержавеющая сталь</span><span><Sparkles /> Вечная гравировка</span><span><Droplets /> Влагозащита</span><span>1.5 мм</span></div>
        </div>
        <div className="sos-preview panel-card">
          <div className="sos-preview-top"><div className="sos-illustration"><Radio className="w-6 h-6" /></div><span className="status-pill">SOS-маяк</span></div>
          <span className="eyebrow compact">БЕЗОПАСНОСТЬ</span><h3>Питомец потерялся?</h3><p>Поиск включается из кабинета. С главной открывается общая лента потеряшек.</p>
          <button onClick={onOpenSOS} className="secondary-cta small"><Radio className="w-4 h-4" /> Открыть SOS</button>
        </div>
      </div>
    </section>
  );
};
