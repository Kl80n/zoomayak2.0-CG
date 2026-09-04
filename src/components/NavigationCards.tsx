import React from 'react';
import { Users, CalendarClock, HeartPulse, Radio, ShoppingBag, ChevronRight, Sparkles } from 'lucide-react';
import { ActiveNavTab } from '../types';

interface NavigationCardsProps {
  activeTab: ActiveNavTab;
  onSelectTab: (tab: ActiveNavTab) => void;
  petsCount: number;
  remindersCount: number;
  lostAlertsCount: number;
}

export const NavigationCards: React.FC<NavigationCardsProps> = ({ activeTab, onSelectTab, petsCount, remindersCount, lostAlertsCount }) => {
  const cards = [
    { id: 'pets' as ActiveNavTab, title: 'Мои питомцы', subtitle: 'Профили и документы', icon: Users, badge: `${petsCount} профиля` },
    { id: 'reminders' as ActiveNavTab, title: 'Напоминания', subtitle: 'Прививки и события', icon: CalendarClock, badge: `${remindersCount} активных` },
    { id: 'health' as ActiveNavTab, title: 'Здоровье', subtitle: 'История и наблюдение', icon: HeartPulse, badge: '98% норма' },
    { id: 'lost' as ActiveNavTab, title: 'Потеряшка SOS', subtitle: 'Поиск и оповещения', icon: Radio, badge: `${lostAlertsCount} в поиске`, emergency: true },
    { id: 'services' as ActiveNavTab, title: 'Объявления', subtitle: 'Товары и услуги', icon: ShoppingBag, badge: '120+ услуг' },
  ];

  return (
    <section className="home-nav-section max-w-[1400px] mx-auto px-4 sm:px-6 xl:px-8 pb-6">
      <div className="home-nav-heading"><div><span className="eyebrow compact"><Sparkles className="w-3.5 h-3.5" /> ЭКОСИСТЕМА ЗАБОТЫ</span><h2>Всё нужное — рядом</h2></div><span>Нажмите на карточку, чтобы открыть раздел</span></div>
      <div className="home-nav-grid">
        {cards.map((card) => {
          const Icon = card.icon;
          const active = activeTab === card.id;
          return (
            <button key={card.id} onClick={() => onSelectTab(card.id)} className={`home-nav-card ${active ? 'is-active' : ''} ${card.emergency ? 'is-emergency' : ''}`}>
              <div className="home-nav-icon"><Icon className="w-5 h-5" /></div>
              <div className="min-w-0 flex-1"><div className="home-nav-title"><strong>{card.title}</strong><ChevronRight className="w-4 h-4" /></div><p>{card.subtitle}</p></div>
              <span className="home-nav-badge">{card.badge}</span>
            </button>
          );
        })}
      </div>
    </section>
  );
};
