import React from 'react';
import { ArrowRight, CheckCircle2, FileText, Heart, Radio, QrCode, ShieldCheck, PawPrint, MapPin, ExternalLink, Sparkles } from 'lucide-react';
import { Pet } from '../types';
import { INITIAL_ANIMAL_LISTINGS } from '../data/mockData';

interface HeroSectionProps {
  selectedPet: Pet;
  onOpenPassport: () => void;
  onOpenCollarStudio: () => void;
  onOpenSOS: () => void;
  onSelectPets: () => void;
  onOpenReminders: () => void;
  onOpenMarketplace?: () => void;
}

const speciesLabel = (species: Pet['species']) => species === 'dog' ? 'Собака' : species === 'cat' ? 'Кошка' : species === 'bird' ? 'Птица' : species === 'rodent' ? 'Грызун' : species === 'reptile' ? 'Рептилия' : 'Другое';

export const HeroSection: React.FC<HeroSectionProps> = ({ selectedPet, onOpenPassport, onOpenCollarStudio, onOpenSOS, onSelectPets, onOpenMarketplace }) => {
  const listings = INITIAL_ANIMAL_LISTINGS.slice(0, 5);
  return (
    <section className="home-shell max-w-[1400px] mx-auto px-4 sm:px-6 xl:px-8 py-5 lg:py-7">
      <div className="home-hero-grid">
        <div className="hero-main-card">
          <div className="hero-copy">
            <span className="eyebrow"><ShieldCheck className="w-4 h-4" /> ЦИФРОВОЙ ПРОФИЛЬ ПИТОМЦА</span>
            <h1>Вся жизнь <span>питомца</span><br />в одном месте.</h1>
            <p>Здоровье, документы, забота и безопасность — в одном понятном сервисе с персональным QR-маяком.</p>
            <div className="hero-actions">
              <button onClick={onOpenPassport} className="primary-cta"><FileText className="w-4 h-4" /> Открыть профиль <ArrowRight className="w-4 h-4" /></button>
              <button onClick={onOpenCollarStudio} className="secondary-cta"><QrCode className="w-4 h-4" /> Создать QR-адресник</button>
            </div>
            <div className="hero-benefits">
              <span><CheckCircle2 /> Один профиль для всего</span><span><CheckCircle2 /> Постоянный ZM-ID</span><span><CheckCircle2 /> QR-код питомца</span>
            </div>
          </div>
        </div>

        <aside className="hero-profile-card">
          <div className="hero-profile-top">
            <div><span className="mini-label">БЫСТРЫЙ ПРОСМОТР</span><div className="hero-health-badge"><strong>{selectedPet.healthScore}%</strong><span>Состояние<br /><b>в норме</b></span></div></div>
            <span className="zm-pill">ZM-ID · {selectedPet.zmId}</span>
          </div>
          <div className="hero-profile-person">
            <div className="hero-profile-photo-wrap"><img src={selectedPet.photoUrl} alt={selectedPet.name} className="hero-profile-photo" /><span className="pet-ok large">✓</span></div>
            <div className="min-w-0"><div className="hero-profile-name-row"><h2>{selectedPet.name}</h2><CheckCircle2 className="w-5 h-5" /></div><p>{selectedPet.breed}</p><small>{selectedPet.ageText} · {speciesLabel(selectedPet.species)}</small></div>
          </div>
          <div className="hero-profile-stats">
            <div><span><Heart className="w-3.5 h-3.5" /> Здоровье</span><strong>Прививки актуальны</strong><small>Индекс: {selectedPet.healthScore}%</small></div>
            <div><span><FileText className="w-3.5 h-3.5" /> Документы</span><strong>Всё под рукой</strong><small>Чип и ветпаспорт</small></div>
          </div>
          <button onClick={onOpenPassport} className="hero-profile-button">Перейти в профиль <ArrowRight className="w-4 h-4" /></button>
          <div className="hero-profile-footer"><span><Radio className="w-3.5 h-3.5" /> QR-маяк включён</span><button onClick={onSelectPets}>Сменить питомца →</button></div>
        </aside>
      </div>

      <div className="home-value-grid">
        <div className="home-value-card"><Sparkles /><div><strong>QR-маяк всегда под рукой</strong><span>Нашёлся питомец — человек сканирует код и получает безопасную информацию для связи с владельцем.</span></div></div>
        <div className="home-value-card"><ShieldCheck /><div><strong>Единый цифровой паспорт</strong><span>Чип, ветпаспорт, здоровье и важные документы собраны в одном профиле.</span></div></div>
        <div className="home-value-card sos"><Radio /><div><strong>Потеряшка SOS</strong><span>Запуск поиска и проверенные данные владельца без публикации лишней персональной информации.</span></div><button onClick={onOpenSOS}>Открыть SOS →</button></div>
      </div>

      <div className="home-steps">
        <div className="home-steps-title"><span className="eyebrow compact">КАК ЭТО РАБОТАЕТ</span><h2>Три шага до цифрового маяка</h2></div>
        <div className="home-step"><b>01</b><strong>Создайте профиль</strong><span>Добавьте питомца и основные документы.</span></div>
        <div className="home-step"><b>02</b><strong>Получите ZM-ID и QR</strong><span>Разместите адресник на ошейнике.</span></div>
        <div className="home-step"><b>03</b><strong>Будьте спокойнее</strong><span>Всё важное хранится в одном месте.</span></div>
      </div>
    </section>
  );
};
