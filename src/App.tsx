import React, { useEffect, useState } from 'react';
import { LockKeyhole, Mail, UserRound } from 'lucide-react';
import { 
  INITIAL_PETS, 
  INITIAL_RECORDS, 
  INITIAL_REMINDERS, 
  INITIAL_LOST_ALERTS, 
  INITIAL_SERVICES 
} from './data/mockData';
import { Pet, MedicalRecord, ReminderItem, LostAlert, ActiveNavTab } from './types';
import { Header, type ThemeMode } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { LostPetSOSTab } from './components/LostPetSOSTab';
import { MarketplaceTab } from './components/MarketplaceTab';
import { PetPassportModal } from './components/PetPassportModal';
import { CollarTagStudioModal } from './components/CollarTagStudioModal';
import { AddPetModal } from './components/AddPetModal';
import { ScanModal } from './components/ScanModal';
import { SOSAlertModal } from './components/SOSAlertModal';
import { PricingTariffsModal } from './components/PricingTariffsModal';
import { Footer } from './components/Footer';
import { PublicPetProfile } from './components/PublicPetProfile';
import { AccountTab } from './components/AccountTab';
import { HomeMarketplacePreview } from './components/HomeMarketplacePreview';
import { PetNews } from './components/PetNews';
import { usePersistentState } from './storage';


function AuthModal({
  onClose,
  onSuccess,
}: {
  onClose: () => void;
  onSuccess: (name: string, email: string) => void;
}) {
  const [mode, setMode] = React.useState<'register' | 'login'>('register');
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState('');

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!email || !password || (mode === 'register' && !name)) {
      setError('Заполните все поля');
      return;
    }
    if (password.length < 6) {
      setError('Пароль должен содержать минимум 6 символов');
      return;
    }
    const normalizedEmail = email.trim().toLowerCase();
    const savedEmail = localStorage.getItem('zoomayak_account_email');
    const savedPassword = localStorage.getItem('zoomayak_account_password');

    if (mode === 'login') {
      if (!savedEmail || savedEmail !== normalizedEmail || savedPassword !== password) {
        setError('Неверный email или пароль (для демо зарегистрируйтесь заново)');
        return;
      }
      const savedName = localStorage.getItem('zoomayak_account_name') || 'Владелец';
      localStorage.setItem('zoomayak_account_logged_in', '1');
      onSuccess(savedName, normalizedEmail);
      onClose();
      return;
    }

    localStorage.setItem('zoomayak_account_email', normalizedEmail);
    localStorage.setItem('zoomayak_account_password', password);
    localStorage.setItem('zoomayak_account_name', name.trim());
    localStorage.setItem('zoomayak_account_logged_in', '1');
    onSuccess(name.trim(), normalizedEmail);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xl" onMouseDown={onClose}>
      <section
        className="auth-modal-card animate-in fade-in zoom-in-95 duration-200"
        onMouseDown={(e) => e.stopPropagation()}
        aria-modal="true"
        role="dialog"
        aria-labelledby="auth-modal-title"
      >
        <div className="auth-modal-head">
          <div>
            <span className="eyebrow compact">{mode === 'register' ? 'РЕГИСТРАЦИЯ В СИСТЕМЕ' : 'ВХОД В ЛИЧНЫЙ КАБИНЕТ'}</span>
            <h2 id="auth-modal-title">{mode === 'register' ? 'Создать аккаунт ЗооМаяк' : 'Добро пожаловать'}</h2>
          </div>
          <button className="icon-action" onClick={onClose} aria-label="Закрыть модальное окно">✕</button>
        </div>
        <form onSubmit={submit} className="auth-form">
          {mode === 'register' && (
            <label>
              <span>Ваше имя</span>
              <div className="auth-input-wrap">
                <UserRound className="w-4 h-4" />
                <input
                  type="text"
                  required
                  placeholder="Александр Волков"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  autoComplete="name"
                />
              </div>
            </label>
          )}
          <label>
            <span>Электронная почта</span>
            <div className="auth-input-wrap">
              <Mail className="w-4 h-4" />
              <input
                type="email"
                required
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
              />
            </div>
          </label>
          <label>
            <span>Пароль</span>
            <div className="auth-input-wrap">
              <LockKeyhole className="w-4 h-4" />
              <input
                type="password"
                required
                placeholder="Минимум 6 символов"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete={mode === 'register' ? 'new-password' : 'current-password'}
              />
            </div>
          </label>
          {error && <div className="auth-error" role="alert">{error}</div>}
          <button type="submit" className="primary-cta w-full">
            {mode === 'register' ? 'Зарегистрироваться' : 'Войти в профиль'}
          </button>
        </form>
        <button className="auth-switch" onClick={() => { setError(''); setMode(mode === 'register' ? 'login' : 'register'); }}>
          {mode === 'register' ? 'Уже есть аккаунт? Войти →' : 'Нет аккаунта? Зарегистрироваться →'}
        </button>
        <div className="auth-note">MVP: данные аккаунта сохраняются локально в браузере. Настоящую серверную авторизацию подключим отдельным backend-этапом.</div>
      </section>
    </div>
  );
}


export default function App() {
  const [authOpen, setAuthOpen] = useState(false);
  const [accountLoggedIn, setAccountLoggedIn] = useState(() => localStorage.getItem('zoomayak_account_logged_in') === '1');
  const [accountName, setAccountName] = useState(() => localStorage.getItem('zoomayak_account_name') || 'Личный кабинет');

  const publicMatch = window.location.pathname.match(/^\/qr\/([^/]+)/i);
  if (publicMatch) {
    const publicId = decodeURIComponent(publicMatch[1]).toLowerCase();
    const publicPet = INITIAL_PETS.find(p => p.zmId.toLowerCase() === publicId) ??
      INITIAL_PETS.find(p => p.id.toLowerCase() === publicId);
    return <PublicPetProfile pet={publicPet} />;
  }

  const [pets, setPets] = usePersistentState<Pet[]>('pets', INITIAL_PETS);
  const [medicalRecords, setMedicalRecords] = usePersistentState<MedicalRecord[]>('medical-records', INITIAL_RECORDS);
  const [reminders, setReminders] = usePersistentState<ReminderItem[]>('reminders', INITIAL_REMINDERS);
  const [lostAlerts, setLostAlerts] = usePersistentState<LostAlert[]>('lost-alerts', INITIAL_LOST_ALERTS);
  const [selectedPetId, setSelectedPetId] = usePersistentState<string>('selected-pet', INITIAL_PETS[0]?.id ?? '');
  const selectedPet = pets.find((pet) => pet.id === selectedPetId) ?? pets[0];
  const [activeTab, setActiveTab] = useState<ActiveNavTab>('home');
  const [theme, setTheme] = usePersistentState<ThemeMode>('theme', 'dark');

  // Modals state
  const [isPassportOpen, setIsPassportOpen] = useState(false);
  const [isCollarStudioOpen, setIsCollarStudioOpen] = useState(false);
  const [isAddPetOpen, setIsAddPetOpen] = useState(false);
  const [isScanModalOpen, setIsScanModalOpen] = useState(false);
  const [isSOSModalOpen, setIsSOSModalOpen] = useState(false);
  const [isTariffsOpen, setIsTariffsOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('zoomayak_account_logged_in');
    localStorage.removeItem('zoomayak_account_name');
    localStorage.removeItem('zoomayak_account_email');
    setAccountLoggedIn(false);
    setAccountName('Личный кабинет');
    setActiveTab('home');
  };

  // Handlers
  const handleSelectPet = (pet: Pet) => setSelectedPetId(pet.id);

  const handleAddPet = (newPet: Pet) => {
    setPets(prev => [newPet, ...prev]);
    setSelectedPetId(newPet.id);
  };

  const handleAddRecord = (newRecord: MedicalRecord) => {
    setMedicalRecords(prev => [newRecord, ...prev]);
  };

  const handleToggleReminder = (id: string) => {
    setReminders(prev =>
      prev.map(r => (r.id === id ? { ...r, isCompleted: !r.isCompleted } : r))
    );
  };

  const handleAddReminder = (newReminder: ReminderItem) => {
    setReminders(prev => [newReminder, ...prev]);
  };

  const handleAddLostAlert = (newAlert: LostAlert) => {
    setLostAlerts(prev => [newAlert, ...prev]);
  };

  useEffect(() => {
    if (!selectedPet && pets.length) setSelectedPetId(pets[0].id);
  }, [selectedPet, pets, setSelectedPetId]);

  const uncompletedRemindersCount = reminders.filter(r => !r.isCompleted).length;

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute('data-theme', theme);
    if (theme === 'dark') {
      root.classList.add('dark', 'theme-dark');
      root.classList.remove('light', 'theme-light');
      document.body.classList.add('dark', 'theme-dark');
      document.body.classList.remove('light', 'theme-light');
    } else {
      root.classList.add('light', 'theme-light');
      root.classList.remove('dark', 'theme-dark');
      document.body.classList.add('light', 'theme-light');
      document.body.classList.remove('dark', 'theme-dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)] transition-colors duration-200 flex flex-col justify-between">
      {/* Universal Header */}
      <Header
        pets={pets}
        selectedPet={selectedPet}
        onSelectPet={handleSelectPet}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenAddPet={() => setIsAddPetOpen(true)}
        onOpenPassport={() => setIsPassportOpen(true)}
        onOpenScanModal={() => setIsScanModalOpen(true)}
        onOpenSOS={() => setIsSOSModalOpen(true)}
        onOpenAccount={() => setActiveTab('account')}
        accountLoggedIn={accountLoggedIn}
        accountName={accountName}
        onOpenAuth={() => setAuthOpen(true)}
        onLogout={handleLogout}
        notificationCount={uncompletedRemindersCount}
        theme={theme}
        onToggleTheme={toggleTheme}
      />

      {/* Main Routed Content */}
      <main className="flex-1">
        {activeTab === 'home' && (
          <div className="space-y-6">
            <HeroSection
              selectedPet={selectedPet}
              petsCount={pets.length}
              activeAlertsCount={lostAlerts.length}
              remindersCount={uncompletedRemindersCount}
              activeTab={activeTab}
              onSelectTab={setActiveTab}
              onOpenAddPet={() => setIsAddPetOpen(true)}
              onOpenPassport={() => setIsPassportOpen(true)}
              onOpenScanModal={() => setIsScanModalOpen(true)}
              onOpenCollarStudio={() => setIsCollarStudioOpen(true)}
              onOpenSOS={() => setIsSOSModalOpen(true)}
              onSelectPets={() => setActiveTab('account')}
              onOpenMarketplace={() => setActiveTab('services')}
            />
            <HomeMarketplacePreview onOpenMarketplace={() => setActiveTab('services')} />
            <PetNews />
          </div>
        )}

        {activeTab === 'account' && (
          <AccountTab
            pets={pets}
            selectedPet={selectedPet}
            reminders={reminders}
            medicalRecords={medicalRecords}
            onSelectPet={handleSelectPet}
            onOpenAddPet={() => setIsAddPetOpen(true)}
            onOpenPassport={() => setIsPassportOpen(true)}
            onOpenCollarStudio={() => setIsCollarStudioOpen(true)}
            onToggleReminder={handleToggleReminder}
            onAddReminder={handleAddReminder}
            onAddRecord={handleAddRecord}
            onOpenTariffs={() => setIsTariffsOpen(true)}
          />
        )}

        {activeTab === 'lost' && (
          <LostPetSOSTab
            lostAlerts={lostAlerts}
            pets={pets}
            onAddLostAlert={handleAddLostAlert}
            onOpenSOSModal={() => setIsSOSModalOpen(true)}
          />
        )}

        {activeTab === 'services' && (
          <MarketplaceTab services={INITIAL_SERVICES} />
        )}
      </main>

      {/* Footer */}
      <Footer
        onSelectTab={setActiveTab}
        onOpenPassport={() => setIsPassportOpen(true)}
        onOpenCollarStudio={() => setIsCollarStudioOpen(true)}
        onOpenScanModal={() => setIsScanModalOpen(true)}
      />

      {/* Interactive Modals */}
      <PetPassportModal
        isOpen={isPassportOpen}
        onClose={() => setIsPassportOpen(false)}
        pet={selectedPet}
        medicalRecords={medicalRecords}
        onOpenCollarStudio={() => setIsCollarStudioOpen(true)}
      />

      <CollarTagStudioModal
        isOpen={isCollarStudioOpen}
        onClose={() => setIsCollarStudioOpen(false)}
        pet={selectedPet}
      />

      <AddPetModal
        isOpen={isAddPetOpen}
        onClose={() => setIsAddPetOpen(false)}
        onAddPet={handleAddPet}
        onOpenCollarStudio={() => setIsCollarStudioOpen(true)}
      />

      <ScanModal
        isOpen={isScanModalOpen}
        onClose={() => setIsScanModalOpen(false)}
        pets={pets}
        onOpenPetProfile={(pet) => {
          handleSelectPet(pet);
          setIsPassportOpen(true);
        }}
      />

      <SOSAlertModal
        isOpen={isSOSModalOpen}
        onClose={() => setIsSOSModalOpen(false)}
        pets={pets}
        onAddAlert={handleAddLostAlert}
      />

      <PricingTariffsModal
        isOpen={isTariffsOpen}
        onClose={() => setIsTariffsOpen(false)}
        onOpenCollarStudio={() => {
          setIsTariffsOpen(false);
          setIsCollarStudioOpen(true);
        }}
      />

      {authOpen && (
        <AuthModal
          onClose={() => setAuthOpen(false)}
          onSuccess={(name) => {
            setAccountLoggedIn(true);
            setAccountName(name);
            setActiveTab('account');
          }}
        />
      )}
    </div>
  );
}
