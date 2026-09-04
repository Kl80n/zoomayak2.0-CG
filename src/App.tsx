/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import { 
  INITIAL_PETS, 
  INITIAL_RECORDS, 
  INITIAL_REMINDERS, 
  INITIAL_LOST_ALERTS, 
  INITIAL_SERVICES,
  INITIAL_ANIMAL_LISTINGS,
} from './data/mockData';
import { Pet, MedicalRecord, ReminderItem, LostAlert, ActiveNavTab, AnimalListing, OwnerProfile, DEFAULT_OWNER, SightingReport } from './types';
import { Header, type ThemeMode } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { MyPetsTab } from './components/MyPetsTab';
import { RemindersTab } from './components/RemindersTab';
import { HealthVaultTab } from './components/HealthVaultTab';
import { LostPetSOSTab } from './components/LostPetSOSTab';
import { MarketplaceTab } from './components/MarketplaceTab';
import { PetPassportModal } from './components/PetPassportModal';
import { CollarTagStudioModal } from './components/CollarTagStudioModal';
import { AddPetModal } from './components/AddPetModal';
import { ScanModal } from './components/ScanModal';
import { SOSAlertModal } from './components/SOSAlertModal';
import { Footer } from './components/Footer';
import { PublicPetProfile } from './components/PublicPetProfile';
import { AccountModal } from './components/AccountModal';
import { ZoomayakLogo } from './components/ZoomayakLogo';
import { usePersistentState } from './storage';

function findPetByPublicId(pets: Pet[], publicId: string) {
  const id = publicId.toLowerCase();
  return pets.find(p => p.zmId.toLowerCase() === id) ?? pets.find(p => p.id.toLowerCase() === id);
}

export default function App() {
  const [pets, setPets] = usePersistentState<Pet[]>('pets', INITIAL_PETS);
  const [medicalRecords, setMedicalRecords] = usePersistentState<MedicalRecord[]>('medical-records', INITIAL_RECORDS);
  const [reminders, setReminders] = usePersistentState<ReminderItem[]>('reminders', INITIAL_REMINDERS);
  const [lostAlerts, setLostAlerts] = usePersistentState<LostAlert[]>('lost-alerts', INITIAL_LOST_ALERTS);
  const [listings, setListings] = usePersistentState<AnimalListing[]>('my-listings', []);
  const [owner, setOwner] = usePersistentState<OwnerProfile>('owner', DEFAULT_OWNER);
  const [sightings, setSightings] = usePersistentState<SightingReport[]>('sightings', []);
  const [selectedPetId, setSelectedPetId] = usePersistentState<string>('selected-pet', INITIAL_PETS[0]?.id ?? '');
  const selectedPet = pets.find((pet) => pet.id === selectedPetId) ?? pets[0];
  const [activeTab, setActiveTab] = useState<ActiveNavTab>('home');
  const [theme, setTheme] = usePersistentState<ThemeMode>('theme', 'dark');
  const [isPassportOpen, setIsPassportOpen] = useState(false);
  const [isCollarStudioOpen, setIsCollarStudioOpen] = useState(false);
  const [isAddPetOpen, setIsAddPetOpen] = useState(false);
  const [isScanModalOpen, setIsScanModalOpen] = useState(false);
  const [isSOSModalOpen, setIsSOSModalOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);

  const publicMatch = typeof window !== 'undefined' ? window.location.pathname.match(/^\/qr\/([^/]+)/i) : null;
  if (publicMatch) {
    const publicId = decodeURIComponent(publicMatch[1]);
    const publicPet = findPetByPublicId(pets, publicId);
    return (
      <PublicPetProfile
        pet={publicPet}
        owner={owner}
        onReportLocation={(report) => setSightings(prev => [report, ...prev])}
      />
    );
  }

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
    document.documentElement.classList.toggle('theme-light', theme === 'light');
    document.documentElement.classList.toggle('theme-dark', theme === 'dark');
  }, [theme]);

  const toggleTheme = () => setTheme(prev => prev === 'dark' ? 'light' : 'dark');

  if (!selectedPet) {
    return (
          <div className="min-h-screen app-shell grid place-items-center p-6">
        <div className="max-w-md text-center">
          <div className="mb-4 flex justify-center"><ZoomayakLogo /></div>
          <h1 className="text-2xl font-extrabold mb-2">ЗооМаяк</h1>
          <p className="mb-6" style={{color:'var(--muted)'}}>Добавьте первого питомца, чтобы начать.</p>
          <button onClick={() => setIsAddPetOpen(true)} className="primary-cta">Добавить питомца</button>
        </div>
        <AddPetModal isOpen={isAddPetOpen} onClose={() => setIsAddPetOpen(false)} onAddPet={handleAddPet} owner={owner} />
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
        onOpenAccount={() => setIsAccountOpen(true)}
        notificationCount={uncompletedRemindersCount}
        theme={theme}
        onToggleTheme={toggleTheme}
      />

      {/* Main App Content Views */}
      <main className="flex-1">
        {activeTab === 'home' && (
          <div className="space-y-6">
            <HeroSection
              onOpenCabinet={() => setActiveTab('pets')}
              onOpenCollarStudio={() => setIsCollarStudioOpen(true)}
              onOpenSOS={() => setActiveTab('lost')}
              onOpenListings={() => setActiveTab('services')}
            />

          </div>
        )}

        {activeTab === 'pets' && (
          <MyPetsTab
            pets={pets}
            selectedPet={selectedPet}
            onSelectPet={handleSelectPet}
            onOpenAddPet={() => setIsAddPetOpen(true)}
            onOpenPassport={() => setIsPassportOpen(true)}
            onOpenCollarStudio={() => setIsCollarStudioOpen(true)}
          />
        )}

        {activeTab === 'reminders' && (
          <RemindersTab
            reminders={reminders}
            pets={pets}
            onToggleReminder={handleToggleReminder}
            onAddReminder={handleAddReminder}
          />
        )}

        {activeTab === 'health' && (
          <HealthVaultTab
            medicalRecords={medicalRecords}
            pets={pets}
            selectedPet={selectedPet}
            onAddRecord={handleAddRecord}
            onOpenPassport={() => setIsPassportOpen(true)}
          />
        )}

        {activeTab === 'lost' && (
          <LostPetSOSTab
            lostAlerts={lostAlerts}
            pets={pets}
            sightings={sightings}
            onAddLostAlert={handleAddLostAlert}
            onOpenSOSModal={() => setIsSOSModalOpen(true)}
          />
        )}

        {activeTab === 'services' && (
          <MarketplaceTab
            services={INITIAL_SERVICES}
            catalog={INITIAL_ANIMAL_LISTINGS}
            published={listings}
            onPublish={(item) => setListings(prev => [item, ...prev])}
          />
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
        owner={owner}
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
        owner={owner}
        onAddAlert={handleAddLostAlert}
      />

      <AccountModal isOpen={isAccountOpen} onClose={() => setIsAccountOpen(false)} owner={owner} onSave={setOwner} />
    </div>
  );
}
