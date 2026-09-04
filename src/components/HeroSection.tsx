import React from 'react';
import { ArrowRight, CalendarDays, CheckCircle2, FileText, Heart, Radio, QrCode, ShieldCheck } from 'lucide-react';
import { Pet, ReminderItem } from '../types';

interface HeroSectionProps {
  selectedPet: Pet;
  reminders: ReminderItem[];
  onOpenPassport: () => void;
  onOpenCollarStudio: () => void;
  onOpenSOS: () => void;
  onSelectPets: () => void;
  onOpenReminders: () => void;
}

function formatDue(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString('ru-RU', { day: '2-digit', month: '2-digit' });
}

export const HeroSection: React.FC<HeroSectionProps> = ({ selectedPet, reminders, onOpenPassport, onOpenCollarStudio, onOpenSOS, onSelectPets, onOpenReminders }) => {
  const upcoming = reminders.filter(item => !item.isCompleted && item.petId === selectedPet.id).slice(0, 2);
  return (
    <section className="home-shell max-w-[1400px] mx-auto px-4 sm:px-6 xl:px-8 py-5 lg:py-6">
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
            <div><span className="mini-label">ПИТОМЕЦ В ПРОФИЛЕ</span><div className="hero-health-badge"><strong>{selectedPet.healthScore}%</strong><span>Состояние<br /><b>в норме</b></span></div></div>
            <span className="zm-pill">ZM-ID · {selectedPet.zmId}</span>
          </div>
          <div className="hero-profile-person">
            <div className="hero-profile-photo-wrap"><img src={selectedPet.photoUrl} alt={selectedPet.name} className="hero-profile-photo" /><span className="pet-ok large">✓</span></div>
            <div className="min-w-0"><div className="hero-profile-name-row"><h2>{selectedPet.name}</h2><CheckCircle2 className="w-5 h-5" /></div><p>{selectedPet.breed}</p><small>{selectedPet.ageText} · {selectedPet.species === 'dog' ? 'Собака' : selectedPet.species === 'cat' ? 'Кошка' : 'Питомец'}</small></div>
          </div>
          <div className="hero-profile-stats">
            <div><span><Heart className="w-3.5 h-3.5" /> Здоровье</span><strong>Прививки актуальны</strong><small>Индекс: {selectedPet.healthScore}%</small></div>
            <div><span><FileText className="w-3.5 h-3.5" /> Документы</span><strong>Всё под рукой</strong><small>Чип и ветпаспорт</small></div>
          </div>
          <button onClick={onOpenPassport} className="hero-profile-button">Перейти в профиль <ArrowRight className="w-4 h-4" /></button>
          <div className="hero-profile-footer"><span><Radio className="w-3.5 h-3.5" /> QR-маяк включён</span><button onClick={onSelectPets}>Сменить питомца →</button></div>
        </aside>
      </div>

      <div className="home-lower-grid">
        <div className="panel-card reminders-preview">
          <div className="panel-heading"><div><span className="eyebrow compact"><CalendarDays className="w-3.5 h-3.5" /> БЛИЖАЙШИЕ СОБЫТИЯ</span><h3>Напоминания</h3></div><button onClick={onOpenReminders} className="panel-link">Все напоминания →</button></div>
          {upcoming.length ? upcoming.map(item => (
            <div className="reminder-row" key={item.id}><div className="reminder-icon"><CalendarDays className="w-4 h-4" /></div><div className="flex-1"><strong>{item.title}</strong><span>{selectedPet.name} · {formatDue(item.dueDate)}</span></div><span className="positive">запланировано</span></div>
          )) : (
            <div className="reminder-row"><div className="reminder-icon"><ShieldCheck className="w-4 h-4" /></div><div className="flex-1"><strong>Ближайших дел нет</strong><span>Добавьте напоминание в кабинете</span></div><span className="positive">готово</span></div>
          )}
        </div>
        <div className="sos-preview panel-card">
          <div className="sos-preview-top"><div className="sos-illustration"><Radio className="w-6 h-6" /></div><span className="status-pill">SOS-маяк</span></div>
          <span className="eyebrow compact">БЕЗОПАСНОСТЬ</span><h3>Питомец потерялся?</h3><p>Запустите поиск и быстро покажите проверенные данные владельца.</p>
          <button onClick={onOpenSOS} className="secondary-cta small"><Radio className="w-4 h-4" /> Открыть SOS</button>
        </div>
      </div>
    </section>
  );
};
