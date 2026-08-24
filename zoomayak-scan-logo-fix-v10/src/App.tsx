/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

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
      if (!savedEmail || !savedPassword) {
        setError('Учётная запись ещё не создана. Зарегистрируйтесь.');
        return;
      }
      if (normalizedEmail !== savedEmail || password !== savedPassword) {
        setError('Неверный e-mail или пароль');
        return;
      }
    } else {
      localStorage.setItem('zoomayak_account_name', name.trim());
      localStorage.setItem('zoomayak_account_email', normalizedEmail);
      localStorage.setItem('zoomayak_account_password', password);
    }

    const displayName = localStorage.getItem('zoomayak_account_name') || name.trim() || normalizedEmail.split('@')[0];
    localStorage.setItem('zoomayak_account_logged_in', '1');
    localStorage.setItem('zoomayak_account_name', displayName);
    localStorage.setItem('zoomayak_account_email', normalizedEmail);
    onSuccess(displayName, normalizedEmail);
    onClose();
  };

  return (
    <div className="auth-modal-backdrop" onClick={onClose}>
      <section className="auth-modal" onClick={e => e.stopPropagation()} role="dialog" aria-modal="true">
        <button className="auth-close" onClick={onClose} aria-label="Закрыть">×</button>
        <div className="auth-brand">Зоо<span>Маяк</span></div>
        <div className="auth-kicker">{mode === 'register' ? 'ЛИЧНЫЙ КАБИНЕТ' : 'ВХОД В АККАУНТ'}</div>
        <h2>{mode === 'register' ? 'Создать учётную запись' : 'С возвращением'}</h2>
        <p>Ваши питомцы, документы, здоровье и напоминания — в одном личном кабинете.</p>
        <form onSubmit={submit} className="auth-form">
          {mode === 'register' && (
            <label><span>Имя</span><div className="auth-input"><UserRound/><input value={name} onChange={e=>setName(e.target.value)} placeholder="Ваше имя" /></div></label>
          )}
          <label><span>E-mail</span><div className="auth-input"><Mail/><input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="name@example.ru" /></div></label>
          <label><span>Пароль</span><div className="auth-input"><LockKeyhole/><input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Минимум 6 символов" /></div></label>
          {error && <div className="auth-error">{error}</div>}
          <button className="auth-submit" type="submit">{mode === 'register' ? 'Создать аккаунт' : 'Войти'}</button>
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
  // Данные демо сохраняются между перезагрузками. Это уже рабочий MVP-режим;
  // позже эти же состояния можно заменить на API без переделки компонентов.
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
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  const toggleTheme = () => setTheme(prev => prev === 'dark' ? 'light' : 'dark');

  if (!selectedPet) {
    return (
      <div className="min-h-screen bg-[#090d16] text-white grid place-items-center p-6">
        <div className="max-w-md text-center">
          <div className="text-5xl mb-4">🐾</div>
          <h1 className="text-2xl font-extrabold mb-2">ЗооМаяк</h1>
          <p className="text-slate-400 mb-6">Добавьте первого питомца, чтобы начать.</p>
          <button onClick={() => setIsAddPetOpen(true)} className="px-5 py-3 rounded-2xl bg-teal-400 text-slate-950 font-extrabold">Добавить питомца</button>
        </div>
        <AddPetModal isOpen={isAddPetOpen} onClose={() => setIsAddPetOpen(false)} onAddPet={handleAddPet} />
      </div>
    );
  }

  return (
    <div className={`app-shell ${theme === 'light' ? 'theme-light' : 'theme-dark'} min-h-screen flex flex-col font-sans relative`}>
      
      {/* Top Header */}
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

      {/* Main App Content Views */}
      <main className="flex-1">
        {activeTab === 'home' && (
          <div className="space-y-6">
            <HeroSection
              selectedPet={selectedPet}
              onOpenPassport={() => setIsPassportOpen(true)}
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
