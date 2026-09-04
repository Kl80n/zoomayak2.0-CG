import React, { useState } from 'react';
import { ZoomayakLogo } from './ZoomayakLogo';
import { Bell, QrCode, Plus, CheckCircle2, Sun, Moon, UserRound, ChevronDown } from 'lucide-react';
import { Pet, ActiveNavTab } from '../types';

export type ThemeMode = 'light' | 'dark';

interface HeaderProps {
  pets: Pet[];
  selectedPet: Pet;
  onSelectPet: (pet: Pet) => void;
  activeTab: ActiveNavTab;
  setActiveTab: (tab: ActiveNavTab) => void;
  onOpenAddPet: () => void;
  onOpenPassport: () => void;
  onOpenScanModal: () => void;
  onOpenSOS: () => void;
  onOpenAccount: () => void;
  notificationCount: number;
  theme: ThemeMode;
  onToggleTheme: () => void;
}

const navItems: Array<{ id: ActiveNavTab; label: string }> = [
  { id: 'home', label: 'Главная' },
  { id: 'pets', label: 'Мои питомцы' },
  { id: 'reminders', label: 'Напоминания' },
  { id: 'health', label: 'Здоровье' },
  { id: 'lost', label: 'Потеряшка SOS' },
  { id: 'services', label: 'Объявления' },
];

export const Header: React.FC<HeaderProps> = ({
  pets, selectedPet, onSelectPet, activeTab, setActiveTab, onOpenAddPet,
  onOpenPassport, onOpenScanModal, onOpenSOS, onOpenAccount,
  notificationCount, theme, onToggleTheme,
}) => {
  const [petDropdownOpen, setPetDropdownOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <header className="site-header sticky top-0 z-40 w-full">
      <div className="site-header-inner max-w-[1400px] mx-auto px-4 sm:px-6 xl:px-8 min-h-[78px] flex items-center gap-4">
        <button onClick={() => setActiveTab('home')} className="brand-block shrink-0 flex items-center text-left" id="brand-logo-button" aria-label="ЗооМаяк — главная">
          <ZoomayakLogo />
        </button>

        <div className="relative hidden lg:block">
          <button
            type="button"
            onClick={() => setPetDropdownOpen(v => !v)}
            className="account-header-button"
            aria-label="Сменить питомца"
          >
            <img src={selectedPet.photoUrl} alt="" className="w-8 h-8 rounded-full object-cover" />
            <span className="hidden xl:block text-left leading-tight"><strong>{selectedPet.name}</strong><small>{selectedPet.zmId}</small></span>
            <ChevronDown className="w-4 h-4" />
          </button>
          {petDropdownOpen && (
            <div className="header-popover left-0 mt-2 w-72 p-2">
              {pets.map(pet => (
                <button key={pet.id} type="button" className={`pet-switch-item ${pet.id === selectedPet.id ? 'is-selected' : ''}`} onClick={() => { onSelectPet(pet); setPetDropdownOpen(false); }}>
                  <img src={pet.photoUrl} alt="" className="w-8 h-8 rounded-full object-cover" />
                  <span className="text-left"><strong className="block">{pet.name}</strong><small>{pet.zmId}</small></span>
                </button>
              ))}
              <button type="button" className="pet-switch-add" onClick={() => { onOpenAddPet(); setPetDropdownOpen(false); }}>
                <Plus className="w-4 h-4" /> Добавить питомца
              </button>
            </div>
          )}
        </div>

        <nav className="main-nav hidden xl:flex items-center gap-1 flex-1 justify-center" aria-label="Основная навигация">
          {navItems.map((item) => {
            const active = activeTab === item.id;
            return <button key={item.id} onClick={() => setActiveTab(item.id)} className={`main-nav-item ${active ? 'is-active' : ''} ${item.id === 'lost' ? 'is-sos' : ''}`}>
              {item.id === 'lost' && <span className="sos-dot" />}{item.label}
            </button>;
          })}
        </nav>

        <div className="header-actions ml-auto flex items-center gap-2">
          <button onClick={onToggleTheme} className="theme-toggle flex items-center gap-2" title={theme === 'light' ? 'Включить тёмную тему' : 'Включить светлую тему'} aria-label="Переключить тему">
            <Sun className={`w-4 h-4 ${theme === 'light' ? 'theme-icon-active' : ''}`} />
            <span className="theme-toggle-track"><span className={`theme-toggle-knob ${theme === 'dark' ? 'is-dark' : ''}`} /></span>
            <Moon className={`w-4 h-4 ${theme === 'dark' ? 'theme-icon-active' : ''}`} />
          </button>

          <button onClick={onOpenScanModal} className="icon-action" title="Сканировать QR" aria-label="Сканировать QR"><QrCode className="w-4 h-4" /></button>

          <div className="relative">
            <button onClick={() => setShowNotifications(!showNotifications)} className="icon-action relative" title="Уведомления" aria-label="Уведомления">
              <Bell className="w-4 h-4" />{notificationCount > 0 && <span className="notification-badge">{Math.min(notificationCount, 9)}</span>}
            </button>
            {showNotifications && <div className="header-popover right-0 mt-2 w-72 p-4">
              <div className="flex items-center justify-between mb-3"><strong>Напоминания</strong><span className="status-pill">{notificationCount} активных</span></div>
              <p className="text-sm opacity-70">Проверьте ближайшие события в разделе «Напоминания».</p>
              <button onClick={() => { setActiveTab('reminders'); setShowNotifications(false); }} className="popover-link mt-3">Открыть напоминания →</button>
            </div>}
          </div>

          <button onClick={onOpenAccount} className="account-header-button" aria-label="Открыть личный кабинет" title="Личный кабинет">
            <span className="account-header-icon"><UserRound className="w-4 h-4" /></span>
            <span className="hidden lg:block text-left leading-tight"><strong>Личный кабинет</strong><small>Профиль владельца</small></span>
          </button>
        </div>
      </div>

      <div className="mobile-tools xl:hidden max-w-[1400px] mx-auto px-4 pt-2 flex items-center justify-between gap-2">
        <button onClick={onOpenAccount} className="mobile-account-button"><span className="account-header-icon"><UserRound className="w-4 h-4" /></span><span>Личный кабинет</span></button>
        <div className="flex items-center gap-1 shrink-0">
          <button onClick={onToggleTheme} className="mobile-theme-button" aria-label="Переключить тему">{theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}</button>
          <button onClick={onOpenScanModal} className="mobile-theme-button" aria-label="Сканировать QR"><QrCode className="w-4 h-4" /></button>
          <button onClick={onOpenPassport} className="mobile-theme-button" aria-label="Открыть паспорт питомца"><CheckCircle2 className="w-4 h-4" /></button>
        </div>
      </div>

      <div className="mobile-nav xl:hidden max-w-[1400px] mx-auto px-4 pb-3 overflow-x-auto">
        <div className="flex gap-1 min-w-max">{navItems.map((item) => <button key={item.id} onClick={() => setActiveTab(item.id)} className={`mobile-nav-item ${activeTab === item.id ? 'is-active' : ''}`}>{item.id === 'lost' && <span className="sos-dot" />}{item.label}</button>)}</div>
      </div>
    </header>
  );
};
