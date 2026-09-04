import React from 'react';
import { 
  Users, 
  CalendarClock, 
  HeartPulse, 
  Radio, 
  ShoppingBag, 
  ChevronRight,
  Shield,
  Sparkles
} from 'lucide-react';
import { ActiveNavTab } from '../types';

interface NavigationCardsProps {
  activeTab: ActiveNavTab;
  onSelectTab: (tab: ActiveNavTab) => void;
  petsCount: number;
  remindersCount: number;
  lostAlertsCount: number;
}

export const NavigationCards: React.FC<NavigationCardsProps> = ({
  activeTab,
  onSelectTab,
  petsCount,
  remindersCount,
  lostAlertsCount,
}) => {
  const cards = [
    {
      id: 'pets' as ActiveNavTab,
      title: 'Мои питомцы',
      subtitle: 'Профили, информация, документы и история',
      icon: Users,
      badge: `${petsCount} профиля`,
      gradient: 'from-teal-50 to-emerald-50',
      iconBg: 'bg-teal-100 text-teal-700',
      borderColor: 'border-slate-200 hover:border-teal-400',
      activeBorder: 'border-teal-500 shadow-md shadow-teal-500/10 ring-2 ring-teal-500/20',
      accentColor: 'text-teal-700',
    },
    {
      id: 'reminders' as ActiveNavTab,
      title: 'Напоминания',
      subtitle: 'Прививки, обработки и важные события',
      icon: CalendarClock,
      badge: `${remindersCount} активных`,
      gradient: 'from-cyan-50 to-blue-50',
      iconBg: 'bg-cyan-100 text-cyan-700',
      borderColor: 'border-slate-200 hover:border-cyan-400',
      activeBorder: 'border-cyan-500 shadow-md shadow-cyan-500/10 ring-2 ring-cyan-500/20',
      accentColor: 'text-cyan-700',
    },
    {
      id: 'health' as ActiveNavTab,
      title: 'Здоровье',
      subtitle: 'Осмотры, анализы, рекомендации ветеринаров',
      icon: HeartPulse,
      badge: '98% норма',
      gradient: 'from-emerald-50 to-teal-50',
      iconBg: 'bg-emerald-100 text-emerald-700',
      borderColor: 'border-slate-200 hover:border-emerald-400',
      activeBorder: 'border-emerald-500 shadow-md shadow-emerald-500/10 ring-2 ring-emerald-500/20',
      accentColor: 'text-emerald-700',
    },
    {
      id: 'lost' as ActiveNavTab,
      title: 'Потеряшка',
      subtitle: 'Быстрый поиск питомцев и оповещения',
      icon: Radio,
      badge: `${lostAlertsCount} в поиске`,
      isEmergency: true,
      gradient: 'from-rose-50 to-amber-50',
      iconBg: 'bg-rose-100 text-rose-700',
      borderColor: 'border-rose-200 hover:border-rose-400',
      activeBorder: 'border-rose-500 shadow-md shadow-rose-500/10 ring-2 ring-rose-500/20',
      accentColor: 'text-rose-700',
    },
    {
      id: 'services' as ActiveNavTab,
      title: 'Объявления',
      subtitle: 'Покупка, продажа, вязка и проверенные услуги',
      icon: ShoppingBag,
      badge: '120+ услуг',
      gradient: 'from-indigo-50 to-purple-50',
      iconBg: 'bg-indigo-100 text-indigo-700',
      borderColor: 'border-slate-200 hover:border-indigo-400',
      activeBorder: 'border-indigo-500 shadow-md shadow-indigo-500/10 ring-2 ring-indigo-500/20',
      accentColor: 'text-indigo-700',
    },
    {
      id: 'logos' as ActiveNavTab,
      title: 'Бренд-кит',
      subtitle: '5 концепций логотипа, SVG, палитры и мокапы',
      icon: Sparkles,
      badge: '5 логотипов',
      gradient: 'from-emerald-50 to-teal-50',
      iconBg: 'bg-emerald-100 text-emerald-800',
      borderColor: 'border-emerald-200 hover:border-emerald-500',
      activeBorder: 'border-emerald-500 shadow-md shadow-emerald-500/10 ring-2 ring-emerald-500/20',
      accentColor: 'text-emerald-800',
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-teal-600" />
          <h2 className="text-sm font-extrabold uppercase tracking-wider text-slate-500">
            Экосистема заботы ЗооМаяк
          </h2>
        </div>
        <span className="text-xs text-slate-500 font-medium">Нажмите на карточку для перехода</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3.5 items-stretch">
        {cards.map((card) => {
          const Icon = card.icon;
          const isActive = activeTab === card.id;

          return (
            <button
              key={card.id}
              id={`nav-card-${card.id}`}
              onClick={() => onSelectTab(card.id)}
              className={`relative text-left p-4.5 rounded-2xl bg-white border transition-all duration-200 group cursor-pointer shadow-xs flex flex-col justify-between min-h-[160px] ${
                isActive
                  ? `bg-gradient-to-b ${card.gradient} ${card.activeBorder} shadow-md`
                  : `border-slate-200 ${card.borderColor} hover:bg-slate-50 hover:-translate-y-0.5 hover:shadow-md`
              }`}
            >
              <div className="relative z-10 flex flex-col h-full justify-between w-full">
                
                {/* Header: Icon + Pill Badge */}
                <div className="flex items-center justify-between gap-2 mb-3.5">
                  <div
                    className={`w-10 h-10 rounded-xl ${card.iconBg} flex items-center justify-center shadow-xs transform group-hover:scale-105 transition-transform duration-200 shrink-0`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>

                  <span
                    className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full border whitespace-nowrap ${
                      card.isEmergency
                        ? 'bg-rose-100 text-rose-800 border-rose-200 animate-pulse'
                        : 'bg-slate-100 text-slate-700 border-slate-200'
                    }`}
                  >
                    {card.badge}
                  </span>
                </div>

                {/* Body: Title and Subtitle */}
                <div>
                  <h3 className="text-sm font-black text-slate-900 group-hover:text-teal-700 transition-colors flex items-center justify-between">
                    <span className="truncate">{card.title}</span>
                    <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-teal-600 group-hover:translate-x-0.5 transition-all shrink-0 ml-1" />
                  </h3>
                  <p className="text-[11px] text-slate-500 mt-1 leading-snug line-clamp-2 font-medium">
                    {card.subtitle}
                  </p>
                </div>

              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
};
