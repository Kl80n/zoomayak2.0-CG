import React, { useState } from 'react';
import { 
  X, 
  ShieldCheck, 
  QrCode, 
  Share2, 
  Printer, 
  Phone, 
  Heart, 
  AlertCircle, 
  Download, 
  Check, 
  Sparkles,
  Award,
  Calendar,
  Layers,
  Activity,
  FileCheck
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { Pet, MedicalRecord } from '../types';

interface PetPassportModalProps {
  isOpen: boolean;
  onClose: () => void;
  pet: Pet;
  medicalRecords: MedicalRecord[];
  onOpenCollarStudio: () => void;
}

export const PetPassportModal: React.FC<PetPassportModalProps> = ({
  isOpen,
  onClose,
  pet,
  medicalRecords,
  onOpenCollarStudio,
}) => {
  const [activeCardSide, setActiveCardSide] = useState<'front' | 'back'>('front');
  const [copiedId, setCopiedId] = useState(false);
  const [copiedChip, setCopiedChip] = useState(false);

  if (!isOpen) return null;

  const handleCopy = (text: string, type: 'id' | 'chip') => {
    navigator.clipboard.writeText(text);
    if (type === 'id') {
      setCopiedId(true);
      setTimeout(() => setCopiedId(false), 2000);
    } else {
      setCopiedChip(true);
      setTimeout(() => setCopiedChip(false), 2000);
    }
  };

  const handleTriggerConfetti = () => {
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.6 }
    });
  };

  const petRecords = medicalRecords.filter(r => r.petId === pet.id);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md overflow-y-auto">
      
      {/* Modal Card Backdrop */}
      <div 
        className="relative w-full max-w-4xl bg-white border border-slate-200/90 rounded-3xl shadow-2xl overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Ribbon */}
        <div className="bg-gradient-to-r from-teal-700 via-teal-800 to-emerald-800 px-6 py-4 border-b border-teal-600/30 flex items-center justify-between text-white shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/15 backdrop-blur-xs border border-white/25 flex items-center justify-center text-white font-black shadow-inner">
              <ShieldCheck className="w-6 h-6 text-emerald-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-black text-white tracking-tight">
                  Цифровой ВетПаспорт ЗооМаяк
                </h3>
                <span className="bg-emerald-400/20 text-emerald-200 border border-emerald-300/30 text-[10px] font-extrabold px-2 py-0.5 rounded-full">
                  Верифицирован
                </span>
              </div>
              <p className="text-xs text-teal-100/80 font-mono">
                ZM-PASSPORT · ISO 11784 / 11785 STANDARDS
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                handleTriggerConfetti();
                window.print();
              }}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition cursor-pointer"
              title="Печать ветпаспорта"
            >
              <Printer className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-white/10 hover:bg-rose-500/80 hover:text-white text-white/80 transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-8 max-h-[80vh] overflow-y-auto bg-slate-50/50">
          
          {/* Main Visual ID Card */}
          <div className="relative rounded-3xl bg-white border border-slate-200/90 p-6 sm:p-8 shadow-lg overflow-hidden">
            
            {/* Top background glow elements */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-teal-100/50 rounded-full blur-3xl pointer-events-none -z-10"></div>
            <div className="absolute bottom-0 left-0 w-60 h-60 bg-emerald-100/40 rounded-full blur-2xl pointer-events-none -z-10"></div>

            {/* Top row of ID badge */}
            <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="px-3 py-1 rounded-xl bg-gradient-to-r from-teal-600 to-emerald-600 text-white font-extrabold text-xs uppercase tracking-wider shadow-xs">
                  Единый ZM-ID
                </div>
                <div className="flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200">
                  <span className="font-mono font-black text-teal-800 text-sm">{pet.zmId}</span>
                  <button
                    onClick={() => handleCopy(pet.zmId, 'id')}
                    className="text-slate-500 hover:text-teal-700 font-bold transition cursor-pointer text-xs flex items-center gap-1"
                    title="Копировать ID"
                  >
                    {copiedId ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : 'Копировать'}
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs text-slate-700">
                <span className="text-slate-500 font-semibold">Микрочип:</span>
                <span className="font-mono bg-slate-100 px-2.5 py-1 rounded-lg border border-slate-200 text-teal-900 font-bold">
                  {pet.microchipId}
                </span>
              </div>
            </div>

            {/* Mid Section: Photo + Vital Info + QR Code */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 pt-6 items-center">
              
              {/* Pet Photo */}
              <div className="md:col-span-3 flex flex-col items-center">
                <div className="relative">
                  <img
                    src={pet.photoUrl}
                    alt={pet.name}
                    className="w-32 h-32 sm:w-36 sm:h-36 rounded-2xl object-cover ring-4 ring-teal-500/20 shadow-md"
                  />
                  <div className="absolute -bottom-2 -right-2 bg-gradient-to-r from-emerald-600 to-teal-600 text-white p-1.5 rounded-xl shadow-md font-black text-xs flex items-center gap-1">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                </div>
                <span className="text-[11px] font-mono text-slate-500 font-bold mt-2">
                  Паспорт № {pet.passportNumber}
                </span>
              </div>

              {/* Vital Details */}
              <div className="md:col-span-6 space-y-3 text-left">
                <div>
                  <h2 className="text-3xl font-black text-slate-900 font-display flex items-center gap-2">
                    <span>{pet.name}</span>
                    <span className="text-xs font-bold px-2.5 py-0.5 rounded-lg bg-teal-100 text-teal-800 border border-teal-200">
                      {pet.species === 'dog' ? 'Собака' : pet.species === 'cat' ? 'Кошка' : 'Питомец'}
                    </span>
                  </h2>
                  <p className="text-sm font-bold text-slate-700 mt-0.5">
                    {pet.breed}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                    <span className="text-slate-500 block text-[10px] uppercase font-bold">Возраст & Пол</span>
                    <span className="text-slate-800 font-bold">{pet.ageText} • {pet.gender === 'male' ? 'Кобель' : 'Сука'}</span>
                  </div>

                  <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                    <span className="text-slate-500 block text-[10px] uppercase font-bold">Текущий вес</span>
                    <span className="text-teal-800 font-bold">{pet.weight} {pet.weightUnit}</span>
                  </div>

                  <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200 col-span-2">
                    <span className="text-slate-500 block text-[10px] uppercase font-bold">Диета / Рацион</span>
                    <span className="text-slate-700 font-semibold">{pet.diet}</span>
                  </div>

                  <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200 col-span-2">
                    <span className="text-amber-700 block text-[10px] uppercase font-bold flex items-center gap-1">
                      <AlertCircle className="w-3 h-3 text-amber-600" /> Аллергии & Особенности
                    </span>
                    <span className="text-slate-700 font-semibold">{pet.allergies.join(', ')}</span>
                  </div>
                </div>
              </div>

              {/* Dynamic QR Code Badge */}
              <div className="md:col-span-3 flex flex-col items-center justify-center p-4 rounded-2xl bg-white border border-slate-200 shadow-sm text-center">
                <div className="relative p-2 border-2 border-slate-900 rounded-xl mb-2 bg-white">
                  {/* Stylized QR representation with Logo in center */}
                  <svg viewBox="0 0 100 100" className="w-24 h-24">
                    <rect width="100" height="100" fill="white" />
                    {/* Corners */}
                    <rect x="5" y="5" width="25" height="25" fill="#0f172a" rx="2" />
                    <rect x="10" y="10" width="15" height="15" fill="white" rx="1" />
                    <rect x="13" y="13" width="9" height="9" fill="#0d9488" rx="1" />

                    <rect x="70" y="5" width="25" height="25" fill="#0f172a" rx="2" />
                    <rect x="75" y="10" width="15" height="15" fill="white" rx="1" />
                    <rect x="78" y="13" width="9" height="9" fill="#0d9488" rx="1" />

                    <rect x="5" y="70" width="25" height="25" fill="#0f172a" rx="2" />
                    <rect x="10" y="75" width="15" height="15" fill="white" rx="1" />
                    <rect x="13" y="78" width="9" height="9" fill="#0d9488" rx="1" />

                    {/* QR data pattern matrix */}
                    <rect x="35" y="10" width="6" height="6" fill="#0f172a" />
                    <rect x="45" y="10" width="6" height="6" fill="#0f172a" />
                    <rect x="55" y="10" width="6" height="6" fill="#0f172a" />
                    <rect x="35" y="22" width="6" height="6" fill="#0f172a" />
                    <rect x="50" y="25" width="6" height="6" fill="#0f172a" />
                    <rect x="15" y="40" width="6" height="6" fill="#0f172a" />
                    <rect x="25" y="40" width="6" height="6" fill="#0f172a" />
                    <rect x="40" y="40" width="20" height="20" fill="#0d9488" rx="4" />
                    <rect x="70" y="40" width="6" height="6" fill="#0f172a" />
                    <rect x="80" y="45" width="6" height="6" fill="#0f172a" />
                    <rect x="40" y="70" width="6" height="6" fill="#0f172a" />
                    <rect x="55" y="75" width="6" height="6" fill="#0f172a" />
                    <rect x="75" y="75" width="12" height="6" fill="#0f172a" />
                  </svg>
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-800">
                  Сканировать QR
                </span>
                <span className="text-[9px] font-mono text-teal-700 font-bold">
                  zoomayak.ru/{pet.zmId}
                </span>
              </div>

            </div>

            {/* Bottom Actions Bar on Card */}
            <div className="mt-6 pt-5 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                <span className="text-slate-600">Лечащий врач: <strong className="text-slate-900">{pet.primaryVet}</strong></span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    onClose();
                    onOpenCollarStudio();
                  }}
                  className="px-3.5 py-1.5 rounded-xl bg-teal-50 hover:bg-teal-100 text-teal-800 font-extrabold border border-teal-200 transition cursor-pointer flex items-center gap-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5 text-teal-600" />
                  Заказать металл-жетон с этим QR
                </button>
              </div>
            </div>

          </div>

          {/* Medical & Vaccination History Timeline in Passport */}
          <div className="space-y-4 text-left">
            <div className="flex items-center justify-between">
              <h4 className="text-base font-black text-slate-900 flex items-center gap-2">
                <FileCheck className="w-5 h-5 text-teal-600" />
                <span>Медицинские отметки и прививки ({petRecords.length})</span>
              </h4>
              <span className="text-xs text-emerald-700 font-bold bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full">
                ✓ Вакцинация действительна
              </span>
            </div>

            <div className="space-y-2.5">
              {petRecords.map((rec) => (
                <div 
                  key={rec.id}
                  className="p-4 rounded-2xl bg-white border border-slate-200 hover:border-teal-400 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center shrink-0 mt-0.5 border border-teal-200 font-bold">
                      <Award className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-slate-900 flex items-center gap-2">
                        <span>{rec.title}</span>
                        <span className="text-[10px] font-mono bg-teal-50 text-teal-800 px-1.5 py-0.5 rounded border border-teal-200 font-bold">
                          {rec.medicineName}
                        </span>
                      </div>
                      <div className="text-xs text-slate-500 mt-0.5">
                        {rec.clinic} • Врач: {rec.doctor}
                      </div>
                      {rec.notes && (
                        <div className="text-xs text-slate-600 mt-1 italic">
                          "{rec.notes}"
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <div className="text-xs font-bold text-slate-800">
                      Дата: {rec.date}
                    </div>
                    {rec.nextDueDate && (
                      <div className="text-[11px] text-teal-700 font-bold">
                        Следующая: {rec.nextDueDate}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Emergency Contacts Section */}
          <div className="p-4 rounded-2xl bg-white border border-slate-200 text-left shadow-xs">
            <h5 className="text-xs font-extrabold uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-teal-600" />
              Экстренные контакты для связи
            </h5>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {pet.emergencyContacts.map((contact, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                  <div>
                    <div className="text-xs font-bold text-slate-900">{contact.name}</div>
                    <div className="text-[11px] text-slate-500 font-medium">{contact.relation}</div>
                  </div>
                  <a
                    href={`tel:${contact.phone}`}
                    className="p-2 rounded-lg bg-teal-50 text-teal-700 hover:bg-teal-600 hover:text-white border border-teal-200 transition"
                    title="Позвонить"
                  >
                    <Phone className="w-3.5 h-3.5" />
                  </a>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="bg-white px-6 py-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
          <div className="text-xs text-slate-500 font-medium">
            Электронный документ защищен криптографической подписью ЗооМаяк
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                handleTriggerConfetti();
                navigator.clipboard.writeText(`https://zoomayak.ru/passport/${pet.zmId}`);
                alert('Ссылка на публичный профиль питомца скопирована!');
              }}
              className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition flex items-center gap-1.5 cursor-pointer"
            >
              <Share2 className="w-3.5 h-3.5" />
              Поделиться профилем
            </button>
            <button
              onClick={onClose}
              className="px-6 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white text-xs font-extrabold shadow-md transition cursor-pointer"
            >
              Готово
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
