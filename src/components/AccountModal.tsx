import React, { useState, useEffect } from 'react';
import { 
  Bell, 
  Check, 
  LockKeyhole, 
  Mail, 
  MapPin, 
  Phone, 
  Save, 
  UserRound, 
  X, 
  ShieldCheck, 
  Users, 
  Stethoscope, 
  Smartphone, 
  Send,
  CheckCircle2,
  Trash2,
  Plus
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface AccountModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type ModalTab = 'profile' | 'family' | 'clinic' | 'security';

export const AccountModal: React.FC<AccountModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<ModalTab>('profile');
  const [name, setName] = useState('Александр Волков');
  const [phone, setPhone] = useState('+7 (905) 123-45-67');
  const [backupPhone, setBackupPhone] = useState('+7 (910) 987-65-43');
  const [email, setEmail] = useState('volkov.petcare@gmail.com');
  const [telegram, setTelegram] = useState('@volkov_pets');
  const [city, setCity] = useState('Ярославль');
  const [district, setDistrict] = useState('Кировский район');
  const [saved, setSaved] = useState(false);

  // Clinic
  const [clinicName, setClinicName] = useState('Ветклиника «БиоВет 24/7»');
  const [clinicPhone, setClinicPhone] = useState('+7 (4852) 59-40-30');

  // Security
  const [maskPhone, setMaskPhone] = useState(true);
  const [smsOnScan, setSmsOnScan] = useState(true);

  // Family
  const [familyMembers, setFamilyMembers] = useState([
    { id: '1', name: 'Екатерина Волкова', relation: 'Супруга', phone: '+7 (905) 777-11-22' },
    { id: '2', name: 'Максим', relation: 'Догситтер', phone: '+7 (915) 333-44-55' },
  ]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const save = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    confetti({ particleCount: 20 });
    window.setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div 
      className="fixed inset-0 z-[70] flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-xl overflow-y-auto cursor-pointer" 
      onClick={onClose}
      onMouseDown={onClose}
    >
      <div 
        className="w-full max-w-xl bg-white dark:bg-slate-900 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl overflow-hidden my-4 text-left animate-in fade-in zoom-in-95 duration-200 cursor-default" 
        onClick={(e) => e.stopPropagation()}
        onMouseDown={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 sm:p-6 bg-slate-50 dark:bg-slate-950/80 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-teal-500/10 text-teal-600 dark:text-teal-400 flex items-center justify-center font-black">
              <UserRound className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] font-extrabold text-teal-600 dark:text-teal-400 uppercase tracking-wider block">Личный кабинет</span>
              <h2 className="text-xl font-black text-slate-900 dark:text-white">Профиль владельца</h2>
            </div>
          </div>
          <button 
            className="p-2.5 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition cursor-pointer" 
            onClick={onClose} 
            aria-label="Закрыть"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Navigation Tabs */}
        <div className="flex items-center gap-1.5 px-6 pt-4 pb-2 border-b border-slate-100 dark:border-slate-800 overflow-x-auto">
          <button
            onClick={() => setActiveTab('profile')}
            className={`px-3.5 py-2 rounded-xl text-xs font-extrabold whitespace-nowrap transition cursor-pointer ${
              activeTab === 'profile'
                ? 'bg-teal-500 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            Контакты
          </button>
          <button
            onClick={() => setActiveTab('family')}
            className={`px-3.5 py-2 rounded-xl text-xs font-extrabold whitespace-nowrap transition cursor-pointer ${
              activeTab === 'family'
                ? 'bg-teal-500 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            Семейный доступ ({familyMembers.length})
          </button>
          <button
            onClick={() => setActiveTab('clinic')}
            className={`px-3.5 py-2 rounded-xl text-xs font-extrabold whitespace-nowrap transition cursor-pointer ${
              activeTab === 'clinic'
                ? 'bg-teal-500 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            Ветклиника
          </button>
          <button
            onClick={() => setActiveTab('security')}
            className={`px-3.5 py-2 rounded-xl text-xs font-extrabold whitespace-nowrap transition cursor-pointer ${
              activeTab === 'security'
                ? 'bg-teal-500 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            Безопасность QR
          </button>
        </div>

        {/* Tab content */}
        <form onSubmit={save} className="p-6 space-y-5 max-h-[calc(80vh-180px)] overflow-y-auto">
          {activeTab === 'profile' && (
            <div className="space-y-4">
              <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-emerald-500 text-white flex items-center justify-center font-bold text-xs shrink-0">
                  <Check className="w-4 h-4" />
                </div>
                <div className="text-xs text-emerald-900 dark:text-emerald-300">
                  <strong>Профиль верифицирован:</strong> Ваши контакты защищены и используются для мгновенной связи в экстренных случаях SOS.
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">ФИО владельца</label>
                  <input value={name} onChange={(e) => setName(e.target.value)} required className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800 text-xs font-semibold" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Основной телефон (SOS)</label>
                  <input value={phone} onChange={(e) => setPhone(e.target.value)} required className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800 text-xs font-semibold" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Резервный телефон</label>
                  <input value={backupPhone} onChange={(e) => setBackupPhone(e.target.value)} placeholder="На случай недоступности" className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800 text-xs font-semibold" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">E-mail</label>
                  <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800 text-xs font-semibold" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Telegram</label>
                  <input value={telegram} onChange={(e) => setTelegram(e.target.value)} placeholder="@username" className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800 text-xs font-semibold" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Город</label>
                  <input value={city} onChange={(e) => setCity(e.target.value)} className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800 text-xs font-semibold" />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'family' && (
            <div className="space-y-3">
              <span className="text-xs text-slate-500 dark:text-slate-400 block">
                Доверенные члены семьи имеют доступ к просмотру паспорта и получают дублирующие SMS при тревоге:
              </span>
              {familyMembers.map(m => (
                <div key={m.id} className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800 flex items-center justify-between gap-3 text-xs">
                  <div>
                    <strong className="text-slate-900 dark:text-white block">{m.name} ({m.relation})</strong>
                    <span className="text-slate-500 font-mono">{m.phone}</span>
                  </div>
                  <button 
                    type="button" 
                    onClick={() => setFamilyMembers(prev => prev.filter(x => x.id !== m.id))}
                    className="p-1.5 text-slate-400 hover:text-rose-500 transition"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'clinic' && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Название ветеринарной клиники</label>
                <input value={clinicName} onChange={(e) => setClinicName(e.target.value)} className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800 text-xs font-semibold" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Экстренный телефон клиники</label>
                <input value={clinicPhone} onChange={(e) => setClinicPhone(e.target.value)} className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800 text-xs font-semibold" />
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="space-y-3">
              <label className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800 flex items-center justify-between gap-3 text-xs cursor-pointer">
                <div>
                  <strong className="text-slate-900 dark:text-white block">Безопасный звонок через шлюз</strong>
                  <span className="text-slate-500">Маскировать личный телефон при сканировании адресника</span>
                </div>
                <input type="checkbox" checked={maskPhone} onChange={e => setMaskPhone(e.target.checked)} className="w-4 h-4 accent-teal-500" />
              </label>

              <label className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800 flex items-center justify-between gap-3 text-xs cursor-pointer">
                <div>
                  <strong className="text-slate-900 dark:text-white block">Мгновенный GPS-отчет по SMS</strong>
                  <span className="text-slate-500">Отправлять локацию при каждом считывании QR</span>
                </div>
                <input type="checkbox" checked={smsOnScan} onChange={e => setSmsOnScan(e.target.checked)} className="w-4 h-4 accent-teal-500" />
              </label>
            </div>
          )}

          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-3">
            <span className="text-xs text-slate-500 dark:text-slate-400">
              {saved ? '✓ Данные сохранены' : 'Настройки профиля синхронизированы с облаком'}
            </span>
            <button className="px-5 py-2.5 rounded-2xl bg-teal-500 hover:bg-teal-600 text-white font-extrabold text-xs flex items-center gap-1.5 shadow-md shadow-teal-500/20 cursor-pointer" type="submit">
              <Save className="w-4 h-4" /> {saved ? 'Сохранено' : 'Сохранить'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
