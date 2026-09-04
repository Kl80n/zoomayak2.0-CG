import React, { useState } from 'react';
import { 
  UserRound, 
  Phone, 
  Mail, 
  MapPin, 
  Save, 
  Check, 
  ShieldCheck, 
  LockKeyhole, 
  Bell, 
  PawPrint, 
  HeartPulse, 
  CalendarDays, 
  ArrowLeft, 
  Users, 
  Plus, 
  Trash2, 
  Download, 
  FileText, 
  Smartphone, 
  Send, 
  Clock, 
  Sparkles, 
  Stethoscope, 
  AlertCircle,
  ExternalLink,
  QrCode,
  CheckCircle2,
  Share2,
  Crown,
  CreditCard,
  Tag,
  Shield,
  Heart,
  Bone,
  Circle
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { Pet, MedicalRecord, ReminderItem } from '../types';
import { MyPetsTab } from './MyPetsTab';
import { RemindersTab } from './RemindersTab';
import { HealthVaultTab } from './HealthVaultTab';
import { PricingTariffsModal } from './PricingTariffsModal';

interface AccountTabProps {
  pets: Pet[];
  selectedPet?: Pet;
  reminders: ReminderItem[];
  medicalRecords: MedicalRecord[];
  onSelectPet: (pet: Pet) => void;
  onOpenAddPet: () => void;
  onOpenPassport: () => void;
  onOpenCollarStudio: () => void;
  onToggleReminder: (id: string) => void;
  onAddReminder: (item: ReminderItem) => void;
  onAddRecord: (record: MedicalRecord) => void;
  onOpenTariffs?: () => void;
}

type MainTab = 'profile' | 'tariffs' | 'family' | 'clinic' | 'security' | 'notifications' | 'export' | 'pets' | 'reminders' | 'health';

interface FamilyMember {
  id: string;
  name: string;
  relation: string;
  phone: string;
  role: 'full' | 'sos_only' | 'vet';
}

export const AccountTab: React.FC<AccountTabProps> = (props) => {
  const [activeSubTab, setActiveSubTab] = useState<MainTab>('profile');
  const [isTariffsModalOpen, setIsTariffsModalOpen] = useState(false);
  
  // Profile state
  const [name, setName] = useState('Александр Волков');
  const [phone, setPhone] = useState('+7 (905) 123-45-67');
  const [backupPhone, setBackupPhone] = useState('+7 (910) 987-65-43');
  const [email, setEmail] = useState('volkov.petcare@gmail.com');
  const [telegram, setTelegram] = useState('@volkov_pets');
  const [city, setCity] = useState('Ярославль');
  const [district, setDistrict] = useState('Кировский район, ул. Свободы');
  const [bio, setBio] = useState('Владелец двух собак (французский бульдог и хаски). Активный участник волонтёрской сети розыска «ЗооМаяк SOS».');
  const [isSaved, setIsSaved] = useState(false);

  // Active Plan State
  const [currentPlanId, setCurrentPlanId] = useState<string>('lifetime');

  // Family Members State
  const [familyMembers, setFamilyMembers] = useState<FamilyMember[]>([
    { id: '1', name: 'Елена Волкова', relation: 'Супруга', phone: '+7 (910) 987-65-43', role: 'full' },
    { id: '2', name: 'Дмитрий Волков', relation: 'Сын', phone: '+7 (915) 555-12-34', role: 'sos_only' },
  ]);
  const [newFamilyName, setNewFamilyName] = useState('');
  const [newFamilyPhone, setNewFamilyPhone] = useState('');
  const [newFamilyRelation, setNewFamilyRelation] = useState('Член семьи');
  const [newFamilyRole, setNewFamilyRole] = useState<'full' | 'sos_only' | 'vet'>('full');
  const [showAddFamily, setShowAddFamily] = useState(false);

  // Clinic & Vet Care State
  const [clinicName, setClinicName] = useState('Ветеринарный госпиталь «Маяк & Друзья»');
  const [clinicPhone, setClinicPhone] = useState('+7 (4852) 77-88-99');
  const [clinicAddress, setClinicAddress] = useState('г. Ярославль, ул. Победы, д. 38/27');
  const [doctorName, setDoctorName] = useState('Д-р Смирнова Анна Павловна');

  // Security & Privacy State
  const [hidePhoneOnTag, setHidePhoneOnTag] = useState(false);
  const [requirePinForMedical, setRequirePinForMedical] = useState(false);
  const [twoFactorAuth, setTwoFactorAuth] = useState(true);
  const [sosRadius, setSosRadius] = useState<'5' | '10' | '25'>('10');

  // Notifications State
  const [notifyLostSos, setNotifyLostSos] = useState(true);
  const [notifyVaccines, setNotifyVaccines] = useState(true);
  const [notifyTelegram, setNotifyTelegram] = useState(true);
  const [notifySms, setNotifySms] = useState(true);

  // Scan History
  const [scanLog] = useState([
    { id: 'scan-1', petName: 'Арчи', location: 'Ярославль, Советская площадь', time: '18 мая 2026, 14:22', status: 'Владелец уведомлен через Telegram' },
    { id: 'scan-2', petName: 'Мия', location: 'Ярославль, Набережная р. Волга', time: '02 апреля 2026, 11:05', status: 'Тестовое сканирование' },
  ]);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaved(true);
    confetti({ particleCount: 40, spread: 60, origin: { y: 0.6 } });
    setTimeout(() => setIsSaved(false), 2500);
  };

  const handleAddFamilyMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFamilyName.trim() || !newFamilyPhone.trim()) return;
    const newMember: FamilyMember = {
      id: `fam-${Date.now()}`,
      name: newFamilyName.trim(),
      phone: newFamilyPhone.trim(),
      relation: newFamilyRelation.trim(),
      role: newFamilyRole,
    };
    setFamilyMembers(prev => [...prev, newMember]);
    setNewFamilyName('');
    setNewFamilyPhone('');
    setShowAddFamily(false);
    confetti({ particleCount: 30, spread: 50 });
  };

  const handleDeleteFamily = (id: string) => {
    setFamilyMembers(prev => prev.filter(m => m.id !== id));
  };

  const handleExportData = () => {
    const dataObj = {
      owner: { name, phone, email, telegram, city, district },
      pets: props.pets,
      medicalRecords: props.medicalRecords,
      reminders: props.reminders,
      familyMembers,
      clinic: { clinicName, clinicPhone, clinicAddress, doctorName },
      exportDate: new Date().toISOString(),
    };
    const blob = new Blob([JSON.stringify(dataObj, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ЗооМаяк_Архив_Владельца_${name.replace(/\s+/g, '_')}.json`;
    a.click();
    URL.revokeObjectURL(url);
    confetti({ particleCount: 35, spread: 55 });
  };

  if (activeSubTab === 'pets') {
    return (
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 xl:px-8 py-6">
        <button 
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-bold text-xs hover:bg-teal-500 hover:text-white transition cursor-pointer mb-6" 
          onClick={() => setActiveSubTab('profile')}
        >
          <ArrowLeft className="w-4 h-4" /> Вернуться в профиль
        </button>
        <MyPetsTab
          pets={props.pets}
          selectedPet={props.selectedPet ?? props.pets[0]}
          onSelectPet={props.onSelectPet}
          onOpenAddPet={props.onOpenAddPet}
          onOpenPassport={props.onOpenPassport}
          onOpenCollarStudio={props.onOpenCollarStudio}
        />
      </div>
    );
  }

  if (activeSubTab === 'reminders') {
    return (
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 xl:px-8 py-6">
        <button 
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-bold text-xs hover:bg-teal-500 hover:text-white transition cursor-pointer mb-6" 
          onClick={() => setActiveSubTab('profile')}
        >
          <ArrowLeft className="w-4 h-4" /> Вернуться в профиль
        </button>
        <RemindersTab 
          reminders={props.reminders} 
          pets={props.pets} 
          onToggleReminder={props.onToggleReminder} 
          onAddReminder={props.onAddReminder} 
        />
      </div>
    );
  }

  if (activeSubTab === 'health') {
    return (
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 xl:px-8 py-6">
        <button 
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-bold text-xs hover:bg-teal-500 hover:text-white transition cursor-pointer mb-6" 
          onClick={() => setActiveSubTab('profile')}
        >
          <ArrowLeft className="w-4 h-4" /> Вернуться в профиль
        </button>
        <HealthVaultTab 
          medicalRecords={props.medicalRecords} 
          pets={props.pets} 
          selectedPet={props.selectedPet ?? props.pets[0]} 
          onAddRecord={props.onAddRecord} 
          onOpenPassport={props.onOpenPassport} 
        />
      </div>
    );
  }

  return (
    <section className="account-page max-w-[1400px] mx-auto px-4 sm:px-6 xl:px-8 py-7 space-y-6">
      
      {/* Top Hero Banner with Owner Identity & Status */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-teal-500/10 via-emerald-500/5 to-cyan-500/10 dark:from-teal-950/60 dark:via-slate-900 dark:to-cyan-950/60 border border-teal-500/30 shadow-sm">
        <div className="flex items-center gap-5">
          <div className="relative">
            <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-teal-400 to-emerald-600 flex items-center justify-center text-white text-2xl font-black shadow-lg shadow-teal-500/20">
              {name.split(' ').map(n => n[0]).join('') || 'АВ'}
            </div>
            <span className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-emerald-500 ring-2 ring-white dark:ring-slate-900 flex items-center justify-center text-white text-xs font-bold shadow">
              ✓
            </span>
          </div>

          <div>
            <div className="flex items-center gap-2 text-teal-600 dark:text-teal-400 text-xs font-extrabold uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4" />
              <span>Верифицированный профиль владельца</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mt-0.5 font-display">
              {name}
            </h1>
            <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 flex flex-wrap items-center gap-2">
              <span>{city}, {district}</span>
              <span>•</span>
              <span className="font-mono text-teal-600 dark:text-teal-400 font-bold">{phone}</span>
            </p>
          </div>
        </div>

        {/* Plan / Stats Cards */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-3">
            <div className="w-14 h-14 rounded-xl bg-teal-500/10 text-teal-600 dark:text-teal-400 flex items-center justify-center font-black">
              <PawPrint className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-slate-900 dark:text-white">{props.pets.length} питомца</div>
              <span className="text-[10px] text-slate-500 dark:text-slate-400">Под защитой Маяка</span>
            </div>
          </div>

          <button
            onClick={() => setIsTariffsModalOpen(true)}
            className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 hover:bg-teal-500/10 border border-teal-500/40 shadow-sm flex items-center gap-3 transition cursor-pointer text-left group"
          >
            <div className="w-14 h-14 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-black group-hover:scale-105 transition">
              <Crown className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                <span>{currentPlanId === 'lifetime' ? 'Пожизненный VIP' : currentPlanId === 'pro' ? 'Забота PRO' : 'Базовый Старт'}</span>
                <span className="text-[9px] bg-teal-500 text-white px-1.5 py-0.5 rounded font-black">Тарифы</span>
              </div>
              <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold">Все опции и жетоны →</span>
            </div>
          </button>
        </div>
      </div>

      {/* Navigation sub-tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        <button 
          onClick={() => setActiveSubTab('profile')} 
          className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl font-extrabold text-xs whitespace-nowrap transition cursor-pointer border ${
            activeSubTab === 'profile' 
              ? 'bg-teal-500 text-white border-teal-500 shadow-md shadow-teal-500/20' 
              : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:border-teal-500/40'
          }`}
        >
          <UserRound className="w-4 h-4" /> Профиль и контакты
        </button>

        <button 
          onClick={() => setActiveSubTab('tariffs')} 
          className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl font-extrabold text-xs whitespace-nowrap transition cursor-pointer border ${
            activeSubTab === 'tariffs' 
              ? 'bg-teal-500 text-white border-teal-500 shadow-md shadow-teal-500/20' 
              : 'bg-white dark:bg-slate-900 text-teal-700 dark:text-teal-300 border-teal-500/30 hover:border-teal-500'
          }`}
        >
          <Crown className="w-4 h-4 text-amber-500" /> Тарифы и адресники
        </button>

        <button 
          onClick={() => setActiveSubTab('family')} 
          className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl font-extrabold text-xs whitespace-nowrap transition cursor-pointer border ${
            activeSubTab === 'family' 
              ? 'bg-teal-500 text-white border-teal-500 shadow-md shadow-teal-500/20' 
              : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:border-teal-500/40'
          }`}
        >
          <Users className="w-4 h-4" /> Семейный доступ ({familyMembers.length})
        </button>

        <button 
          onClick={() => setActiveSubTab('clinic')} 
          className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl font-extrabold text-xs whitespace-nowrap transition cursor-pointer border ${
            activeSubTab === 'clinic' 
              ? 'bg-teal-500 text-white border-teal-500 shadow-md shadow-teal-500/20' 
              : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:border-teal-500/40'
          }`}
        >
          <Stethoscope className="w-4 h-4" /> Ветклиника и скорая
        </button>

        <button 
          onClick={() => setActiveSubTab('security')} 
          className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl font-extrabold text-xs whitespace-nowrap transition cursor-pointer border ${
            activeSubTab === 'security' 
              ? 'bg-teal-500 text-white border-teal-500 shadow-md shadow-teal-500/20' 
              : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:border-teal-500/40'
          }`}
        >
          <LockKeyhole className="w-4 h-4" /> Безопасность и QR
        </button>

        <button 
          onClick={() => setActiveSubTab('notifications')} 
          className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl font-extrabold text-xs whitespace-nowrap transition cursor-pointer border ${
            activeSubTab === 'notifications' 
              ? 'bg-teal-500 text-white border-teal-500 shadow-md shadow-teal-500/20' 
              : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:border-teal-500/40'
          }`}
        >
          <Bell className="w-4 h-4" /> Уведомления
        </button>

        <button 
          onClick={() => setActiveSubTab('export')} 
          className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl font-extrabold text-xs whitespace-nowrap transition cursor-pointer border ${
            activeSubTab === 'export' 
              ? 'bg-teal-500 text-white border-teal-500 shadow-md shadow-teal-500/20' 
              : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:border-teal-500/40'
          }`}
        >
          <Download className="w-4 h-4" /> Архив и экспорт
        </button>
      </div>

      {/* Main Tab Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Columns: Selected SubTab Body */}
        <div className="lg:col-span-2 space-y-6">

          {/* 1. PERSONAL PROFILE & CONTACTS */}
          {activeSubTab === 'profile' && (
            <form onSubmit={handleSaveProfile} className="p-6 sm:p-7 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
                <div>
                  <span className="text-xs font-bold text-teal-600 dark:text-teal-400 uppercase tracking-wider">Основная информация</span>
                  <h3 className="text-xl font-black text-slate-900 dark:text-white">Контакты и адрес владельца</h3>
                </div>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-2xl bg-teal-500 hover:bg-teal-600 text-white font-extrabold text-xs shadow-md shadow-teal-500/20 flex items-center gap-2 transition cursor-pointer"
                >
                  {isSaved ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
                  <span>{isSaved ? 'Сохранено!' : 'Сохранить изменения'}</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    ФИО владельца
                  </label>
                  <input 
                    type="text" 
                    value={name} 
                    onChange={e => setName(e.target.value)} 
                    className="w-full px-4 py-2.5 rounded-2xl bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800 text-sm font-semibold text-slate-900 dark:text-white focus:outline-none focus:border-teal-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    Основной телефон (привязан к жетонам)
                  </label>
                  <input 
                    type="tel" 
                    value={phone} 
                    onChange={e => setPhone(e.target.value)} 
                    className="w-full px-4 py-2.5 rounded-2xl bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800 text-sm font-mono font-bold text-teal-700 dark:text-teal-300 focus:outline-none focus:border-teal-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    Запасной телефон (на случай ЧП)
                  </label>
                  <input 
                    type="tel" 
                    value={backupPhone} 
                    onChange={e => setBackupPhone(e.target.value)} 
                    className="w-full px-4 py-2.5 rounded-2xl bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800 text-sm font-mono text-slate-900 dark:text-white focus:outline-none focus:border-teal-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    Электронная почта
                  </label>
                  <input 
                    type="email" 
                    value={email} 
                    onChange={e => setEmail(e.target.value)} 
                    className="w-full px-4 py-2.5 rounded-2xl bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-teal-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    Город проживания
                  </label>
                  <input 
                    type="text" 
                    value={city} 
                    onChange={e => setCity(e.target.value)} 
                    className="w-full px-4 py-2.5 rounded-2xl bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800 text-sm font-semibold text-slate-900 dark:text-white focus:outline-none focus:border-teal-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    Район / Улица
                  </label>
                  <input 
                    type="text" 
                    value={district} 
                    onChange={e => setDistrict(e.target.value)} 
                    className="w-full px-4 py-2.5 rounded-2xl bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-teal-500"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    Telegram для экстренных оповещений бота
                  </label>
                  <input 
                    type="text" 
                    value={telegram} 
                    onChange={e => setTelegram(e.target.value)} 
                    className="w-full px-4 py-2.5 rounded-2xl bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800 text-sm font-mono text-teal-700 dark:text-teal-300 focus:outline-none focus:border-teal-500"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    Заметки владельца и особые инструкции для нашедших
                  </label>
                  <textarea 
                    rows={3} 
                    value={bio} 
                    onChange={e => setBio(e.target.value)} 
                    className="w-full px-4 py-2.5 rounded-2xl bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-teal-500"
                  />
                </div>
              </div>
            </form>
          )}

          {/* 2. TARIFFS & PLANS SECTION */}
          {activeSubTab === 'tariffs' && (
            <div className="p-6 sm:p-7 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
                <div>
                  <span className="text-xs font-bold text-teal-600 dark:text-teal-400 uppercase tracking-wider">Тарифные планы сервиса</span>
                  <h3 className="text-xl font-black text-slate-900 dark:text-white">Подписка и умные адресники</h3>
                </div>
                <button
                  onClick={() => setIsTariffsModalOpen(true)}
                  className="px-4 py-2 rounded-xl bg-teal-500 hover:bg-teal-600 text-white font-extrabold text-xs shadow-sm flex items-center gap-1.5 cursor-pointer"
                >
                  <Crown className="w-4 h-4" /> Сравнить все тарифы
                </button>
              </div>

              {/* Active Plan Banner */}
              <div className="p-5 rounded-2xl bg-gradient-to-r from-teal-500/10 via-emerald-500/10 to-cyan-500/10 border-2 border-teal-500 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-black uppercase text-teal-700 dark:text-teal-300">Активный тариф:</span>
                    <strong className="text-base text-slate-900 dark:text-white">
                      {currentPlanId === 'lifetime' ? 'Пожизненный Маяк VIP' : currentPlanId === 'pro' ? 'Забота PRO' : 'Базовый Старт'}
                    </strong>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-500 text-white text-[10px] font-bold">Бессрочно</span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">
                    Безлимитное количество питомцев, вечное облако медицинских карт и включенный металлический жетон.
                  </p>
                </div>

                <button
                  onClick={() => setIsTariffsModalOpen(true)}
                  className="px-4 py-2 rounded-xl bg-white dark:bg-slate-900 border border-teal-500/40 text-teal-700 dark:text-teal-300 text-xs font-bold hover:bg-teal-500 hover:text-white transition cursor-pointer shrink-0"
                >
                  Сменить тариф
                </button>
              </div>

              {/* Hardware tags 4 shapes teaser */}
              <div className="space-y-3 pt-2">
                <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Формы физических адресников (Лазерная гравировка)
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    { name: 'ЩИТ', icon: Shield, desc: 'Максимум защиты', price: '890 ₽' },
                    { name: 'КОСТЬ', icon: Bone, desc: 'Классика для собак', price: '890 ₽' },
                    { name: 'СЕРДЦЕ', icon: Heart, desc: 'Изящный стиль', price: '890 ₽' },
                    { name: 'КРУГ', icon: Circle, desc: 'Универсальный', price: '790 ₽' },
                  ].map((shape, idx) => {
                    const Icon = shape.icon;
                    return (
                      <button
                        key={idx}
                        onClick={props.onOpenCollarStudio}
                        className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 hover:border-teal-500 transition text-left cursor-pointer flex flex-col justify-between gap-2"
                      >
                        <div className="flex items-center justify-between">
                          <Icon className="w-5 h-5 text-teal-600 dark:text-teal-400" />
                          <strong className="text-xs font-black text-slate-900 dark:text-white">{shape.price}</strong>
                        </div>
                        <div>
                          <strong className="text-xs text-slate-900 dark:text-white block">{shape.name}</strong>
                          <span className="text-[10px] text-slate-500 dark:text-slate-400">{shape.desc}</span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* 3. FAMILY ACCESS */}
          {activeSubTab === 'family' && (
            <div className="p-6 sm:p-7 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
                <div>
                  <span className="text-xs font-bold text-teal-600 dark:text-teal-400 uppercase tracking-wider">Семейный контур</span>
                  <h3 className="text-xl font-black text-slate-900 dark:text-white">Доступ близких и доверенных лиц</h3>
                </div>
                <button
                  onClick={() => setShowAddFamily(!showAddFamily)}
                  className="px-4 py-2.5 rounded-2xl bg-teal-500 hover:bg-teal-600 text-white font-extrabold text-xs shadow-md shadow-teal-500/20 flex items-center gap-2 transition cursor-pointer"
                >
                  <Plus className="w-4 h-4" /> Добавить члена семьи
                </button>
              </div>

              <div className="space-y-3">
                {familyMembers.map((member) => (
                  <div key={member.id} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-14 h-14 rounded-xl bg-teal-500/10 text-teal-600 dark:text-teal-400 flex items-center justify-center font-bold">
                        {member.name[0]}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <strong className="text-sm text-slate-900 dark:text-white">{member.name}</strong>
                          <span className="text-xs text-slate-500 font-medium">({member.relation})</span>
                        </div>
                        <div className="text-xs font-mono text-teal-700 dark:text-teal-300 mt-0.5">{member.phone}</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-[11px] font-bold px-2.5 py-1 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                        {member.role === 'full' ? 'Полный доступ' : member.role === 'sos_only' ? 'Только SOS-алерты' : 'Ветврач'}
                      </span>
                      <button 
                        onClick={() => handleDeleteFamily(member.id)}
                        className="p-2 rounded-xl text-rose-500 hover:bg-rose-500/10 transition cursor-pointer"
                        title="Удалить"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {showAddFamily && (
                <form onSubmit={handleAddFamilyMember} className="p-5 rounded-2xl bg-teal-500/5 border border-teal-500/20 space-y-4">
                  <div className="text-xs font-black uppercase tracking-wider text-teal-600 dark:text-teal-400">Новый доверенный контакт</div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input 
                      type="text" 
                      required
                      placeholder="Имя и фамилия" 
                      value={newFamilyName} 
                      onChange={e => setNewFamilyName(e.target.value)} 
                      className="px-3.5 py-2 rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-900 dark:text-white"
                    />
                    <input 
                      type="tel" 
                      required
                      placeholder="+7 (999) 000-00-00" 
                      value={newFamilyPhone} 
                      onChange={e => setNewFamilyPhone(e.target.value)} 
                      className="px-3.5 py-2 rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs font-mono text-slate-900 dark:text-white"
                    />
                    <input 
                      type="text" 
                      placeholder="Кем приходится (Супруг, догситтер...)" 
                      value={newFamilyRelation} 
                      onChange={e => setNewFamilyRelation(e.target.value)} 
                      className="px-3.5 py-2 rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-white"
                    />
                    <select 
                      value={newFamilyRole} 
                      onChange={e => setNewFamilyRole(e.target.value as any)} 
                      className="px-3.5 py-2 rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-900 dark:text-white"
                    >
                      <option value="full">Полный доступ (редактирование)</option>
                      <option value="sos_only">Только SOS-уведомления при сканировании</option>
                      <option value="vet">Ветврач / Клиника</option>
                    </select>
                  </div>
                  <div className="flex justify-end gap-2">
                    <button type="button" onClick={() => setShowAddFamily(false)} className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800">
                      Отмена
                    </button>
                    <button type="submit" className="px-5 py-2 rounded-xl bg-teal-500 hover:bg-teal-600 text-white font-bold text-xs shadow-md">
                      Добавить
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}

          {/* 4. CLINIC & EMERGENCY CARE */}
          {activeSubTab === 'clinic' && (
            <div className="p-6 sm:p-7 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
                <div>
                  <span className="text-xs font-bold text-teal-600 dark:text-teal-400 uppercase tracking-wider">Медицинское сопровождение</span>
                  <h3 className="text-xl font-black text-slate-900 dark:text-white">Прикрепленная ветклиника и врач</h3>
                </div>
                <a 
                  href={`tel:${clinicPhone}`}
                  className="px-4 py-2.5 rounded-2xl bg-rose-500 hover:bg-rose-600 text-white font-extrabold text-xs flex items-center gap-2 shadow-md shadow-rose-500/20 transition cursor-pointer"
                >
                  <Phone className="w-4 h-4" /> Скорая ветпомощь 24/7
                </a>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    Название ветеринарной клиники
                  </label>
                  <input 
                    type="text" 
                    value={clinicName} 
                    onChange={e => setClinicName(e.target.value)} 
                    className="w-full px-4 py-2.5 rounded-2xl bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800 text-sm font-semibold text-slate-900 dark:text-white focus:outline-none focus:border-teal-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    Круглосуточный телефон ветклиники
                  </label>
                  <input 
                    type="tel" 
                    value={clinicPhone} 
                    onChange={e => setClinicPhone(e.target.value)} 
                    className="w-full px-4 py-2.5 rounded-2xl bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800 text-sm font-semibold text-slate-900 dark:text-white focus:outline-none focus:border-teal-500"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    Адрес клиники
                  </label>
                  <input 
                    type="text" 
                    value={clinicAddress} 
                    onChange={e => setClinicAddress(e.target.value)} 
                    className="w-full px-4 py-2.5 rounded-2xl bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800 text-sm font-semibold text-slate-900 dark:text-white focus:outline-none focus:border-teal-500"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    Лечащий ветеринарный врач
                  </label>
                  <input 
                    type="text" 
                    value={doctorName} 
                    onChange={e => setDoctorName(e.target.value)} 
                    className="w-full px-4 py-2.5 rounded-2xl bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800 text-sm font-semibold text-slate-900 dark:text-white focus:outline-none focus:border-teal-500"
                  />
                </div>
              </div>
            </div>
          )}

          {/* 5. SECURITY & QR PRIVACY */}
          {activeSubTab === 'security' && (
            <div className="p-6 sm:p-7 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
              <div>
                <span className="text-xs font-bold text-teal-600 dark:text-teal-400 uppercase tracking-wider">Приватность и доступ</span>
                <h3 className="text-xl font-black text-slate-900 dark:text-white">Настройки безопасности QR-маяка</h3>
              </div>

              <div className="space-y-3">
                <label className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800 flex items-center justify-between gap-4 cursor-pointer">
                  <div>
                    <strong className="text-sm text-slate-900 dark:text-white block">Скрывать прямой номер телефона на публичной странице</strong>
                    <span className="text-xs text-slate-500 dark:text-slate-400 block mt-0.5">
                      Связь с нашедшим будет через безопасный Telegram-бот ЗооМаяка без раскрытия вашего номера.
                    </span>
                  </div>
                  <input 
                    type="checkbox" 
                    checked={hidePhoneOnTag} 
                    onChange={e => setHidePhoneOnTag(e.target.checked)} 
                    className="w-5 h-5 accent-teal-500 rounded cursor-pointer"
                  />
                </label>

                <label className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800 flex items-center justify-between gap-4 cursor-pointer">
                  <div>
                    <strong className="text-sm text-slate-900 dark:text-white block">Запрашивать PIN-код для просмотра полной веткарты</strong>
                    <span className="text-xs text-slate-500 dark:text-slate-400 block mt-0.5">
                      Нашедший увидит только контакты и аллергии, а полная история будет защищена.
                    </span>
                  </div>
                  <input 
                    type="checkbox" 
                    checked={requirePinForMedical} 
                    onChange={e => setRequirePinForMedical(e.target.checked)} 
                    className="w-5 h-5 accent-teal-500 rounded cursor-pointer"
                  />
                </label>

                <label className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800 flex items-center justify-between gap-4 cursor-pointer">
                  <div>
                    <strong className="text-sm text-slate-900 dark:text-white block">Двухфакторная защита аккаунта (2FA)</strong>
                    <span className="text-xs text-slate-500 dark:text-slate-400 block mt-0.5">
                      Подтверждение входа через разовый код в Telegram/SMS.
                    </span>
                  </div>
                  <input 
                    type="checkbox" 
                    checked={twoFactorAuth} 
                    onChange={e => setTwoFactorAuth(e.target.checked)} 
                    className="w-5 h-5 accent-teal-500 rounded cursor-pointer"
                  />
                </label>
              </div>

              {/* Scan Activity Log */}
              <div>
                <h4 className="text-xs uppercase font-extrabold text-slate-500 dark:text-slate-400 mb-3 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" /> Журнал сканирований жетонов
                </h4>
                <div className="space-y-2">
                  {scanLog.map(log => (
                    <div key={log.id} className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800 text-xs flex items-center justify-between gap-3">
                      <div>
                        <strong className="text-slate-900 dark:text-white">{log.petName}</strong> • <span className="text-slate-500">{log.location}</span>
                        <div className="text-[10px] text-slate-400 mt-0.5">{log.time}</div>
                      </div>
                      <span className="px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold text-[10px]">
                        {log.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* 6. NOTIFICATION PREFERENCES */}
          {activeSubTab === 'notifications' && (
            <div className="p-6 sm:p-7 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
              <div>
                <span className="text-xs font-bold text-teal-600 dark:text-teal-400 uppercase tracking-wider">Каналы связи</span>
                <h3 className="text-xl font-black text-slate-900 dark:text-white">Настройки оповещений</h3>
              </div>

              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800 space-y-3">
                  <strong className="text-sm text-slate-900 dark:text-white block">Радиус оповещений о сигналах «Потеряшка SOS»</strong>
                  <div className="grid grid-cols-3 gap-2">
                    {(['5', '10', '25'] as const).map(r => (
                      <button 
                        key={r}
                        type="button" 
                        onClick={() => setSosRadius(r)}
                        className={`py-2 rounded-xl text-xs font-extrabold transition cursor-pointer border ${
                          sosRadius === r 
                            ? 'bg-teal-500 text-white border-teal-500 shadow-sm' 
                            : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:border-teal-500/40'
                        }`}
                      >
                        {r} км от дома
                      </button>
                    ))}
                  </div>
                  <span className="text-[11px] text-slate-500 dark:text-slate-400 block">
                    Вы получите срочный сигнал, если рядом потеряется или найдется домашнее животное.
                  </span>
                </div>

                <div className="space-y-3">
                  <label className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800 flex items-center justify-between gap-4 cursor-pointer">
                    <div>
                      <strong className="text-sm text-slate-900 dark:text-white block">Мгновенный Telegram-бот</strong>
                      <span className="text-xs text-slate-500 dark:text-slate-400 block mt-0.5">Координаты при сканировании и срочные оповещения</span>
                    </div>
                    <input 
                      type="checkbox" 
                      checked={notifyTelegram} 
                      onChange={e => setNotifyTelegram(e.target.checked)} 
                      className="w-5 h-5 accent-teal-500 rounded cursor-pointer"
                    />
                  </label>

                  <label className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800 flex items-center justify-between gap-4 cursor-pointer">
                    <div>
                      <strong className="text-sm text-slate-900 dark:text-white block">СМС-дублирование при SOS</strong>
                      <span className="text-xs text-slate-500 dark:text-slate-400 block mt-0.5">Резервное оповещение на телефон при отсутствии интернета</span>
                    </div>
                    <input 
                      type="checkbox" 
                      checked={notifySms} 
                      onChange={e => setNotifySms(e.target.checked)} 
                      className="w-5 h-5 accent-teal-500 rounded cursor-pointer"
                    />
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* 7. DATA EXPORT & BACKUP */}
          {activeSubTab === 'export' && (
            <div className="p-6 sm:p-7 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
              <div>
                <span className="text-xs font-bold text-teal-600 dark:text-teal-400 uppercase tracking-wider">Резервное копирование</span>
                <h3 className="text-xl font-black text-slate-900 dark:text-white">Архив всех данных и экспорт</h3>
              </div>

              <div className="p-5 rounded-2xl bg-teal-500/10 border border-teal-500/20 flex items-start gap-3">
                <Sparkles className="w-5 h-5 text-teal-600 dark:text-teal-400 shrink-0 mt-0.5" />
                <div className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                  Вы можете в любой момент выгрузить полный архив профилей питомцев, историю прививок, медицинские протоколы и контакты в международном формате JSON или распечатать официальный ветпаспорт.
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800 flex flex-col justify-between gap-4">
                  <div>
                    <FileText className="w-6 h-6 text-teal-600 dark:text-teal-400 mb-2" />
                    <strong className="text-sm text-slate-900 dark:text-white block">Полный JSON-архив</strong>
                    <span className="text-xs text-slate-500 dark:text-slate-400 block mt-1">
                      Включает всех питомцев, вакцины, ZM-номера и данные семьи.
                    </span>
                  </div>
                  <button 
                    onClick={handleExportData}
                    className="w-full py-2.5 rounded-xl bg-teal-500 hover:bg-teal-600 text-white font-bold text-xs flex items-center justify-center gap-2 transition cursor-pointer shadow-sm"
                  >
                    <Download className="w-4 h-4" /> Скачать архив (.JSON)
                  </button>
                </div>

                <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800 flex flex-col justify-between gap-4">
                  <div>
                    <Smartphone className="w-6 h-6 text-teal-600 dark:text-teal-400 mb-2" />
                    <strong className="text-sm text-slate-900 dark:text-white block">Цифровой ветпаспорт</strong>
                    <span className="text-xs text-slate-500 dark:text-slate-400 block mt-1">
                      Печатная форма ветпаспорта и адресников с QR-кодами для поездок.
                    </span>
                  </div>
                  <button 
                    onClick={props.onOpenPassport}
                    className="w-full py-2.5 rounded-xl bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold text-xs flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <ExternalLink className="w-4 h-4" /> Открыть паспорт
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right 1 Column: Quick Hub & Direct Section Shortcuts */}
        <div className="space-y-4">
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <span className="text-xs font-extrabold text-teal-600 dark:text-teal-400 uppercase tracking-wider block">Быстрый переход</span>
            
            <button 
              onClick={() => setActiveSubTab('tariffs')} 
              className="w-full p-3.5 rounded-2xl bg-gradient-to-r from-amber-500/10 to-teal-500/10 hover:from-amber-500/20 hover:to-teal-500/20 border border-amber-500/30 transition flex items-center justify-between text-left cursor-pointer group"
            >
              <div className="flex items-center gap-3">
                <Crown className="w-5 h-5 text-amber-500" />
                <div>
                  <strong className="text-xs text-slate-900 dark:text-white block">Тарифные планы</strong>
                  <span className="text-[10px] text-teal-700 dark:text-teal-300 font-bold">Тарифы и 4 формы адресников</span>
                </div>
              </div>
              <span className="text-xs font-bold text-teal-600 dark:text-teal-400 group-hover:translate-x-1 transition">→</span>
            </button>

            <button 
              onClick={() => setActiveSubTab('pets')} 
              className="w-full p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950/70 hover:bg-teal-500/10 border border-slate-200 dark:border-slate-800 transition flex items-center justify-between text-left cursor-pointer group"
            >
              <div className="flex items-center gap-3">
                <PawPrint className="w-5 h-5 text-teal-600 dark:text-teal-400" />
                <div>
                  <strong className="text-xs text-slate-900 dark:text-white block">Мои питомцы</strong>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400">{props.pets.length} питомца в базе</span>
                </div>
              </div>
              <span className="text-xs font-bold text-teal-600 dark:text-teal-400 group-hover:translate-x-1 transition">→</span>
            </button>

            <button 
              onClick={() => setActiveSubTab('reminders')} 
              className="w-full p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950/70 hover:bg-teal-500/10 border border-slate-200 dark:border-slate-800 transition flex items-center justify-between text-left cursor-pointer group"
            >
              <div className="flex items-center gap-3">
                <CalendarDays className="w-5 h-5 text-teal-600 dark:text-teal-400" />
                <div>
                  <strong className="text-xs text-slate-900 dark:text-white block">Напоминания</strong>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400">{props.reminders.filter(r => !r.isCompleted).length} активных задач</span>
                </div>
              </div>
              <span className="text-xs font-bold text-teal-600 dark:text-teal-400 group-hover:translate-x-1 transition">→</span>
            </button>

            <button 
              onClick={() => setActiveSubTab('health')} 
              className="w-full p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950/70 hover:bg-teal-500/10 border border-slate-200 dark:border-slate-800 transition flex items-center justify-between text-left cursor-pointer group"
            >
              <div className="flex items-center gap-3">
                <HeartPulse className="w-5 h-5 text-teal-600 dark:text-teal-400" />
                <div>
                  <strong className="text-xs text-slate-900 dark:text-white block">Здоровье и вакцины</strong>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400">{props.medicalRecords.length} записей в карте</span>
                </div>
              </div>
              <span className="text-xs font-bold text-teal-600 dark:text-teal-400 group-hover:translate-x-1 transition">→</span>
            </button>

            <button 
              onClick={props.onOpenCollarStudio} 
              className="w-full p-3.5 rounded-2xl bg-gradient-to-r from-teal-500/10 to-emerald-500/10 hover:from-teal-500/20 hover:to-emerald-500/20 border border-teal-500/20 transition flex items-center justify-between text-left cursor-pointer group"
            >
              <div className="flex items-center gap-3">
                <QrCode className="w-5 h-5 text-teal-600 dark:text-teal-400" />
                <div>
                  <strong className="text-xs text-slate-900 dark:text-white block">Конструктор жетона</strong>
                  <span className="text-[10px] text-teal-700 dark:text-teal-300 font-semibold">Щит, Кость, Сердце, Круг</span>
                </div>
              </div>
              <span className="text-xs font-bold text-teal-600 dark:text-teal-400 group-hover:translate-x-1 transition">→</span>
            </button>
          </div>

          {/* Privacy Note */}
          <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-start gap-3">
            <LockKeyhole className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
            <div className="text-xs text-emerald-900 dark:text-emerald-200 leading-relaxed">
              <strong>Безопасность данных:</strong> Все контакты и медицинские карты зашифрованы по стандарту AES-256. Вы полностью контролируете, какая информация отображается в публичном профиле жетона.
            </div>
          </div>
        </div>
      </div>

      {/* Embedded Pricing Tariffs Modal */}
      {isTariffsModalOpen && (
        <PricingTariffsModal
          isOpen={isTariffsModalOpen}
          onClose={() => setIsTariffsModalOpen(false)}
          onSelectPlan={(planId) => setCurrentPlanId(planId)}
          onOpenCollarStudio={props.onOpenCollarStudio}
        />
      )}
    </section>
  );
};
