/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  INITIAL_PETS, 
  INITIAL_RECORDS, 
  INITIAL_REMINDERS, 
  INITIAL_LOST_ALERTS, 
  INITIAL_SERVICES 
} from './data/mockData';
import { Pet, MedicalRecord, ReminderItem, LostAlert, ActiveNavTab } from './types';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { NavigationCards } from './components/NavigationCards';
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
import { LogoShowcaseModal } from './components/LogoShowcaseModal';
import { Footer } from './components/Footer';

export default function App() {
  const [pets, setPets] = useState<Pet[]>(INITIAL_PETS);
  const [selectedPet, setSelectedPet] = useState<Pet>(INITIAL_PETS[0]);
  const [medicalRecords, setMedicalRecords] = useState<MedicalRecord[]>(INITIAL_RECORDS);
  const [reminders, setReminders] = useState<ReminderItem[]>(INITIAL_REMINDERS);
  const [lostAlerts, setLostAlerts] = useState<LostAlert[]>(INITIAL_LOST_ALERTS);
  const [activeTab, setActiveTab] = useState<ActiveNavTab>('home');

  // Modals state
  const [isPassportOpen, setIsPassportOpen] = useState(false);
  const [isCollarStudioOpen, setIsCollarStudioOpen] = useState(false);
  const [isAddPetOpen, setIsAddPetOpen] = useState(false);
  const [isScanModalOpen, setIsScanModalOpen] = useState(false);
  const [isSOSModalOpen, setIsSOSModalOpen] = useState(false);
  const [isLogosOpen, setIsLogosOpen] = useState(false);

  // Handlers
  const handleAddPet = (newPet: Pet) => {
    setPets(prev => [newPet, ...prev]);
    setSelectedPet(newPet);
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

  const uncompletedRemindersCount = reminders.filter(r => !r.isCompleted).length;

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 flex flex-col font-sans relative selection:bg-teal-500 selection:text-white mesh-gradient-bg">
      
      {/* Top Header */}
      <Header
        pets={pets}
        selectedPet={selectedPet}
        onSelectPet={setSelectedPet}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenAddPet={() => setIsAddPetOpen(true)}
        onOpenPassport={() => setIsPassportOpen(true)}
        onOpenScanModal={() => setIsScanModalOpen(true)}
        onOpenSOS={() => setIsSOSModalOpen(true)}
        onOpenLogos={() => setIsLogosOpen(true)}
        notificationCount={uncompletedRemindersCount}
      />

      {/* Main App Content Views */}
      <main className="flex-1">
        {activeTab === 'home' && (
          <div className="space-y-6">
            <HeroSection
              selectedPet={selectedPet}
              onOpenPassport={() => setIsPassportOpen(true)}
              onOpenCollarStudio={() => setIsCollarStudioOpen(true)}
              onOpenAddPet={() => setIsAddPetOpen(true)}
              onSelectPet={setSelectedPet}
              allPets={pets}
            />

            {/* 5 Bottom Feature Cards as seen in user reference, enhanced */}
            <NavigationCards
              activeTab={activeTab}
              onSelectTab={setActiveTab}
              petsCount={pets.length}
              remindersCount={uncompletedRemindersCount}
              lostAlertsCount={lostAlerts.length}
            />
          </div>
        )}

        {activeTab === 'pets' && (
          <MyPetsTab
            pets={pets}
            selectedPet={selectedPet}
            onSelectPet={setSelectedPet}
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
        onOpenLogos={() => setIsLogosOpen(true)}
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
          setSelectedPet(pet);
          setIsPassportOpen(true);
        }}
      />

      <SOSAlertModal
        isOpen={isSOSModalOpen}
        onClose={() => setIsSOSModalOpen(false)}
        pets={pets}
        onAddAlert={handleAddLostAlert}
      />

      <LogoShowcaseModal
        isOpen={isLogosOpen}
        onClose={() => setIsLogosOpen(false)}
      />

    </div>
  );
}
