import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Bell, 
  Search, 
  QrCode, 
  Plus, 
  AlertTriangle, 
  ChevronDown, 
  Sparkles,
  Compass,
  CheckCircle2
} from 'lucide-react';
import { Pet, ActiveNavTab } from '../types';

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
  onOpenLogos?: () => void;
  notificationCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  pets,
  selectedPet,
  onSelectPet,
  activeTab,
  setActiveTab,
  onOpenAddPet,
  onOpenPassport,
  onOpenScanModal,
  onOpenSOS,
  onOpenLogos,
  notificationCount,
}) => {
  const [petDropdownOpen, setPetDropdownOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200/90 bg-white/90 backdrop-blur-xl shadow-xs transition-all duration-300">
      {/* Top micro-banner for alerts */}
      <div className="bg-gradient-to-r from-teal-50 via-emerald-50 to-cyan-50 border-b border-teal-100 px-4 py-1.5 text-xs text-teal-900 font-medium">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-600"></span>
            </span>
            <span>Единая национальная сеть безопасности питомцев ЗооМаяк</span>
            <span className="hidden md:inline text-teal-400">•</span>
            <span className="hidden md:inline text-slate-600">Синхронизировано с базой микрочипов ISO 11784</span>
          </div>
          <div className="flex items-center gap-3">
            {onOpenLogos && (
              <>
                <button
                  id="header-brand-logos-link"
                  onClick={onOpenLogos}
                  className="text-teal-800 hover:text-teal-950 font-bold transition-colors flex items-center gap-1 cursor-pointer bg-teal-100/70 hover:bg-teal-200/70 px-2 py-0.5 rounded-md"
                >
                  <Sparkles className="w-3.5 h-3.5 text-teal-700" />
                  <span>🎨 Подборка логотипов</span>
                </button>
                <span className="text-teal-300">|</span>
              </>
            )}
            <button 
              id="header-tag-designer-link"
              onClick={onOpenScanModal}
              className="text-teal-700 hover:text-teal-900 font-semibold transition-colors flex items-center gap-1 cursor-pointer"
            >
              <QrCode className="w-3.5 h-3.5" />
              <span>Проверить ZM-ID</span>
            </button>
            <span className="text-teal-300">|</span>
            <span className="text-amber-700 font-bold">SOS-служба 24/7</span>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        
        {/* Logo and Brand */}
        <div 
          onClick={() => setActiveTab('home')}
          className="flex items-center gap-3 cursor-pointer group"
          id="brand-logo-button"
        >
          <div className="relative">
            {/* Ambient glow behind logo */}
            <div className="absolute -inset-1 bg-gradient-to-r from-teal-400 to-cyan-400 rounded-2xl blur-md opacity-30 group-hover:opacity-60 transition duration-500"></div>
            <div className="relative w-12 h-12 rounded-2xl bg-gradient-to-br from-teal-600 via-teal-700 to-emerald-800 border border-teal-400/40 flex items-center justify-center p-2 shadow-md shadow-teal-700/20 group-hover:scale-105 transition-transform duration-300">
              {/* Custom Lighthouse + Pets Symbol */}
              <svg viewBox="0 0 48 48" fill="none" className="w-full h-full text-white">
                {/* Lighthouse tower */}
                <path d="M21 16L23 8H25L27 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <path d="M20 16H28L30 38H18L20 16Z" fill="url(#lh-gradient)" stroke="#ffffff" strokeWidth="1.5" />
                {/* Lighthouse stripes */}
                <path d="M19.2 23H28.8M18.6 30H29.4" stroke="#042f2e" strokeWidth="2" />
                {/* Light beam waves */}
                <path d="M24 10C24 10 32 6 38 7" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeDasharray="1 3" />
                <path d="M24 10C24 10 16 6 10 7" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeDasharray="1 3" />
                {/* Dog & Cat heart silhouette bottom */}
                <path d="M13 36C13 32 17 30 20 33C21 34 23 35 24 37" stroke="#a7f3d0" strokeWidth="2.2" strokeLinecap="round" />
                <path d="M35 36C35 32 31 30 28 33C27 34 25 35 24 37" stroke="#bae6fd" strokeWidth="2.2" strokeLinecap="round" />
                <circle cx="24" cy="11" r="2.5" fill="#fef08a" />
                <defs>
                  <linearGradient id="lh-gradient" x1="18" y1="8" x2="30" y2="38" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#0d9488" />
                    <stop offset="1" stopColor="#0284c7" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>

          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="text-2xl font-black tracking-tight text-slate-900 font-display">
                Зоо<span className="bg-gradient-to-r from-teal-600 to-emerald-600 bg-clip-text text-transparent">Маяк</span>
              </span>
              <span className="px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-teal-100 text-teal-800 border border-teal-200">
                PRO
              </span>
            </div>
            <span className="text-[11px] font-semibold text-slate-500 tracking-wider">
              Ваш ориентир в мире питомцев
            </span>
          </div>
        </div>

        {/* Primary Navigation Tabs */}
        <nav className="hidden lg:flex items-center gap-1 bg-slate-100/90 p-1.5 rounded-2xl border border-slate-200/90 shadow-inner">
          <button
            id="nav-tab-home"
            onClick={() => setActiveTab('home')}
            className={`px-4 py-2 rounded-xl text-sm font-bold transition-all duration-200 cursor-pointer ${
              activeTab === 'home'
                ? 'bg-teal-600 text-white shadow-md shadow-teal-600/25'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/80'
            }`}
          >
            Главная
          </button>
          <button
            id="nav-tab-pets"
            onClick={() => setActiveTab('pets')}
            className={`px-4 py-2 rounded-xl text-sm font-bold transition-all duration-200 cursor-pointer ${
              activeTab === 'pets'
                ? 'bg-teal-600 text-white shadow-md shadow-teal-600/25'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/80'
            }`}
          >
            Мои питомцы
          </button>
          <button
            id="nav-tab-reminders"
            onClick={() => setActiveTab('reminders')}
            className={`px-4 py-2 rounded-xl text-sm font-bold transition-all duration-200 cursor-pointer ${
              activeTab === 'reminders'
                ? 'bg-teal-600 text-white shadow-md shadow-teal-600/25'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/80'
            }`}
          >
            Напоминания
          </button>
          <button
            id="nav-tab-health"
            onClick={() => setActiveTab('health')}
            className={`px-4 py-2 rounded-xl text-sm font-bold transition-all duration-200 cursor-pointer ${
              activeTab === 'health'
                ? 'bg-teal-600 text-white shadow-md shadow-teal-600/25'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/80'
            }`}
          >
            Здоровье
          </button>
          <button
            id="nav-tab-lost"
            onClick={() => setActiveTab('lost')}
            className={`px-4 py-2 rounded-xl text-sm font-bold transition-all duration-200 cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'lost'
                ? 'bg-rose-600 text-white shadow-md shadow-rose-600/25'
                : 'text-rose-700 hover:text-rose-900 hover:bg-rose-50'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse"></span>
            Потеряшка SOS
          </button>
          <button
            id="nav-tab-services"
            onClick={() => setActiveTab('services')}
            className={`px-4 py-2 rounded-xl text-sm font-bold transition-all duration-200 cursor-pointer ${
              activeTab === 'services'
                ? 'bg-teal-600 text-white shadow-md shadow-teal-600/25'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/80'
            }`}
          >
            Объявления
          </button>
          <button
            id="nav-tab-logos"
            onClick={() => setActiveTab('logos')}
            className={`px-4 py-2 rounded-xl text-sm font-extrabold transition-all duration-200 cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'logos'
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/25 ring-2 ring-emerald-400/40'
                : 'text-emerald-700 hover:text-emerald-950 hover:bg-emerald-50 bg-emerald-50/60 border border-emerald-200/60'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Логотипы</span>
            <span className="px-1.5 py-0.2 rounded-full text-[9px] bg-emerald-700 text-white font-mono">5</span>
          </button>
        </nav>

        {/* Right side controls: Pet Switcher & Profile CTA */}
        <div className="flex items-center gap-3">
          
          {/* Active Pet Selector Pill */}
          <div className="relative shrink-0">
            <button
              id="active-pet-switcher-btn"
              onClick={() => setPetDropdownOpen(!petDropdownOpen)}
              className="h-10 px-2.5 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 hover:border-teal-500 flex items-center gap-2 transition-all duration-200 shadow-xs cursor-pointer select-none"
            >
              <div className="relative shrink-0 w-7 h-7">
                <img
                  src={selectedPet.photoUrl}
                  alt={selectedPet.name}
                  className="w-7 h-7 rounded-full object-cover ring-1.5 ring-teal-500 shadow-xs"
                />
                <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 rounded-full ring-1 ring-white flex items-center justify-center text-[7px] font-black text-white">
                  ✓
                </span>
              </div>
              <div className="text-left hidden sm:flex flex-col justify-center min-w-0 max-w-[130px]">
                <div className="flex items-center gap-1.5 leading-none">
                  <span className="text-xs font-extrabold text-slate-800 truncate max-w-[70px]">{selectedPet.name}</span>
                  <span className="text-[9px] font-mono text-teal-800 bg-teal-50 px-1 py-0.5 rounded border border-teal-200 whitespace-nowrap shrink-0 font-bold">
                    {selectedPet.zmId.split('-')[1] || selectedPet.zmId}
                  </span>
                </div>
                <span className="text-[10px] text-slate-500 truncate leading-none mt-1 font-medium">{selectedPet.breed}</span>
              </div>
              <ChevronDown className={`w-3.5 h-3.5 text-slate-400 shrink-0 transition-transform duration-200 ${petDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Pet Switcher Dropdown */}
            {petDropdownOpen && (
              <div className="absolute right-0 mt-2 w-72 bg-white rounded-2xl border border-slate-200 shadow-xl p-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                <div className="px-3 py-2 text-xs font-extrabold uppercase tracking-wider text-slate-500 border-b border-slate-100 flex justify-between items-center">
                  <span>Мои питомцы ({pets.length})</span>
                  <span className="text-teal-600 text-[11px] font-bold">ZM-Cloud</span>
                </div>
                <div className="py-1 space-y-1">
                  {pets.map((pet) => (
                    <button
                      key={pet.id}
                      onClick={() => {
                        onSelectPet(pet);
                        setPetDropdownOpen(false);
                      }}
                      className={`w-full flex items-center justify-between p-2 rounded-xl transition-all text-left cursor-pointer ${
                        pet.id === selectedPet.id
                          ? 'bg-teal-50 border border-teal-200 text-teal-950 font-bold'
                          : 'hover:bg-slate-50 text-slate-700'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <img
                          src={pet.photoUrl}
                          alt={pet.name}
                          className="w-9 h-9 rounded-full object-cover ring-1 ring-slate-200"
                        />
                        <div>
                          <div className="text-sm font-bold flex items-center gap-1.5 text-slate-900">
                            {pet.name}
                            {pet.id === selectedPet.id && (
                              <CheckCircle2 className="w-3.5 h-3.5 text-teal-600" />
                            )}
                          </div>
                          <div className="text-xs text-slate-500">{pet.breed}</div>
                        </div>
                      </div>
                      <span className="text-[11px] font-mono bg-slate-100 text-slate-700 px-1.5 py-0.5 rounded font-semibold">
                        {pet.zmId.split('-')[1]}
                      </span>
                    </button>
                  ))}
                </div>

                <div className="pt-2 mt-1 border-t border-slate-100">
                  <button
                    id="dropdown-add-pet-btn"
                    onClick={() => {
                      setPetDropdownOpen(false);
                      onOpenAddPet();
                    }}
                    className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-teal-50 hover:bg-teal-100 text-teal-800 text-xs font-bold border border-teal-200 transition cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    Добавить нового питомца
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* QR Scanner Trigger */}
          <button
            id="header-qr-scan-btn"
            onClick={onOpenScanModal}
            className="p-2.5 rounded-xl bg-white hover:bg-slate-50 text-slate-700 hover:text-teal-700 border border-slate-200 hover:border-teal-400 transition shadow-xs cursor-pointer relative"
            title="Сканировать QR-адресник"
          >
            <QrCode className="w-5 h-5" />
          </button>

          {/* Notifications Button */}
          <div className="relative">
            <button
              id="header-notifications-btn"
              onClick={() => setShowNotifications(!showNotifications)}
              className="p-2.5 rounded-xl bg-white hover:bg-slate-50 text-slate-700 hover:text-amber-700 border border-slate-200 hover:border-amber-400 transition shadow-xs cursor-pointer relative"
              title="Уведомления"
            >
              <Bell className="w-5 h-5" />
              {notificationCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-amber-500 text-white font-black text-[10px] flex items-center justify-center shadow-md animate-bounce">
                  {notificationCount}
                </span>
              )}
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl border border-slate-200 shadow-xl p-3 z-50 animate-in fade-in zoom-in-95 duration-150">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <span className="font-bold text-sm text-slate-900">Уведомления & Забота</span>
                  <span className="text-xs text-teal-700 font-bold">{notificationCount} активных</span>
                </div>
                <div className="py-2 space-y-2 text-xs">
                  <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900">
                    <div className="font-bold text-amber-800 mb-0.5">🐾 Обработка от паразитов</div>
                    <div>У Барни через 8 дней срок приема таблетки Бравекто.</div>
                  </div>
                  <div className="p-2.5 rounded-xl bg-teal-50 border border-teal-200 text-teal-900">
                    <div className="font-bold text-teal-800 mb-0.5">💉 Вакцинация актуальна</div>
                    <div>Ветпаспорт {selectedPet.name} проверен: все прививки действительны.</div>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setShowNotifications(false);
                    setActiveTab('reminders');
                  }}
                  className="w-full text-center text-xs text-teal-700 hover:text-teal-900 font-bold pt-1 block cursor-pointer"
                >
                  Перейти в календарь напоминаний →
                </button>
              </div>
            )}
          </div>

          {/* Primary Action - "Личный кабинет / Цифровой Паспорт" */}
          <button
            id="header-open-passport-btn"
            onClick={onOpenPassport}
            className="hidden sm:flex items-center gap-2 bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-500 hover:to-emerald-500 text-white font-extrabold px-4 py-2 rounded-2xl text-sm shadow-md shadow-teal-600/20 hover:shadow-teal-600/35 transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer"
          >
            <ShieldCheck className="w-4 h-4 text-white" />
            <span>Паспорт питомца</span>
          </button>
        </div>

      </div>

      {/* Mobile Sub-Navigation */}
      <div className="lg:hidden flex items-center justify-around border-t border-slate-200 bg-white/95 py-2 px-2 overflow-x-auto text-xs">
        <button
          onClick={() => setActiveTab('home')}
          className={`px-3 py-1.5 rounded-lg whitespace-nowrap font-bold ${
            activeTab === 'home' ? 'bg-teal-600 text-white' : 'text-slate-600'
          }`}
        >
          Главная
        </button>
        <button
          onClick={() => setActiveTab('pets')}
          className={`px-3 py-1.5 rounded-lg whitespace-nowrap font-bold ${
            activeTab === 'pets' ? 'bg-teal-600 text-white' : 'text-slate-600'
          }`}
        >
          Питомцы
        </button>
        <button
          onClick={() => setActiveTab('reminders')}
          className={`px-3 py-1.5 rounded-lg whitespace-nowrap font-bold ${
            activeTab === 'reminders' ? 'bg-teal-600 text-white' : 'text-slate-600'
          }`}
        >
          Календарь
        </button>
        <button
          onClick={() => setActiveTab('health')}
          className={`px-3 py-1.5 rounded-lg whitespace-nowrap font-bold ${
            activeTab === 'health' ? 'bg-teal-600 text-white' : 'text-slate-600'
          }`}
        >
          Здоровье
        </button>
        <button
          onClick={() => setActiveTab('lost')}
          className={`px-3 py-1.5 rounded-lg whitespace-nowrap font-bold ${
            activeTab === 'lost' ? 'bg-rose-600 text-white' : 'text-rose-700'
          }`}
        >
          SOS Поиск
        </button>
        <button
          onClick={() => setActiveTab('services')}
          className={`px-3 py-1.5 rounded-lg whitespace-nowrap font-bold ${
            activeTab === 'services' ? 'bg-teal-600 text-white' : 'text-slate-600'
          }`}
        >
          Услуги
        </button>
        <button
          onClick={() => setActiveTab('logos')}
          className={`px-3 py-1.5 rounded-lg whitespace-nowrap font-extrabold ${
            activeTab === 'logos' ? 'bg-emerald-600 text-white shadow-xs' : 'text-emerald-700 bg-emerald-50'
          }`}
        >
          🎨 Логотипы
        </button>
      </div>
    </header>
  );
};
