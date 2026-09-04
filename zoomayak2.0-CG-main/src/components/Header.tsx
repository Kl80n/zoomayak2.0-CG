import React, { useEffect, useRef, useState } from 'react';
import { ZoomayakLogo } from './ZoomayakLogo';
import { Bell, QrCode, CheckCircle2, Sun, Moon, UserRound, LogIn, LogOut, Mail, LockKeyhole } from 'lucide-react';
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
  accountLoggedIn: boolean;
  accountName: string;
  onOpenAuth: () => void;
  onLogout: () => void;
  notificationCount: number;
  theme: ThemeMode;
  onToggleTheme: () => void;
}

const navItems: Array<{ id: ActiveNavTab; label: string }> = [
  { id: 'home', label: 'Главная' },
  { id: 'lost', label: 'Потеряшка SOS' },
  { id: 'services', label: 'Объявления' },
];

export const Header: React.FC<HeaderProps> = ({
  pets, selectedPet, onSelectPet, activeTab, setActiveTab, onOpenAddPet,
  onOpenPassport, onOpenScanModal, onOpenSOS, onOpenAccount,
  accountLoggedIn, accountName, onOpenAuth, onLogout,
  notificationCount, theme, onToggleTheme,
}) => {
  const [petDropdownOpen, setPetDropdownOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showAccountMenu, setShowAccountMenu] = useState(false);
  const accountMenuRef = useRef<HTMLDivElement>(null);

  // Меню ЛК всегда закрыто при первом рендере, после навигации и после выхода.
  useEffect(() => {
    setShowAccountMenu(false);
  }, [activeTab, accountLoggedIn]);

  useEffect(() => {
    if (!showAccountMenu) return;

    const handlePointerDown = (event: MouseEvent) => {
      if (!accountMenuRef.current?.contains(event.target as Node)) {
        setShowAccountMenu(false);
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setShowAccountMenu(false);
    };

    document.addEventListener('mousedown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [showAccountMenu]);

  return (
    <header className="site-header sticky top-0 z-40 w-full">
      <div className="site-header-inner max-w-[1400px] mx-auto px-4 sm:px-6 xl:px-8 min-h-[78px] flex items-center gap-4">
        <button onClick={() => setActiveTab('home')} className="brand-block shrink-0 flex items-center text-left" id="brand-logo-button" aria-label="ЗооМаяк — главная">
          <ZoomayakLogo />
        </button>

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
              <button onClick={() => { setActiveTab('account'); setShowNotifications(false); }} className="popover-link mt-3">Открыть напоминания →</button>
            </div>}
          </div>

          <div className="header-account-wrap" ref={accountMenuRef}>
            <button
              onClick={() => {
                if (accountLoggedIn) {
                  setShowAccountMenu((open) => !open);
                } else {
                  onOpenAuth();
                }
              }}
              className={`account-header-button ${activeTab === 'account' ? 'is-active' : ''}`}
              aria-expanded={accountLoggedIn ? showAccountMenu : undefined}
              aria-haspopup={accountLoggedIn ? 'menu' : undefined}
              aria-label={accountLoggedIn ? 'Открыть меню личного кабинета' : 'Войти или зарегистрироваться'}
              title={accountLoggedIn ? 'Личный кабинет' : 'Войти / Регистрация'}
            >
              <span className="account-header-icon"><UserRound className="w-4 h-4" /></span>
              <span className="hidden lg:block text-left leading-tight">
                <strong>{accountLoggedIn ? accountName : 'Войти / Регистрация'}</strong>
                <small>{accountLoggedIn ? 'Личный кабинет' : 'Создать учётную запись'}</small>
              </span>
            </button>
            {accountLoggedIn && showAccountMenu && (
              <div className="account-header-menu" role="menu">
                <button role="menuitem" onClick={() => { setShowAccountMenu(false); setActiveTab('account'); }}>
                  <UserRound className="w-4 h-4" /> Открыть ЛК
                </button>
                <button role="menuitem" onClick={() => { setShowAccountMenu(false); onLogout(); }}>
                  <LogOut className="w-4 h-4" /> Выйти
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="mobile-tools xl:hidden max-w-[1400px] mx-auto px-4 pt-2 flex items-center justify-between gap-2">
        <button onClick={() => accountLoggedIn ? setActiveTab('account') : onOpenAuth()} className={`mobile-account-button ${activeTab === 'account' ? 'is-active' : ''}`}><span className="account-header-icon"><UserRound className="w-4 h-4" /></span><span>{accountLoggedIn ? 'Личный кабинет' : 'Войти / Регистрация'}</span></button>
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
