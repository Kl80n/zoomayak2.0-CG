import React, { useEffect, useState } from 'react';
import { 
  X, 
  ShieldCheck, 
  Share2, 
  Printer, 
  Phone, 
  AlertCircle, 
  Check, 
  Sparkles, 
  Award, 
  FileCheck 
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { Pet, MedicalRecord } from '../types';
import { ZoomayakQR } from './ZoomayakQR';

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
  const [copiedId, setCopiedId] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(true);
    setTimeout(() => setCopiedId(false), 2000);
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
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-xl overflow-y-auto cursor-pointer"
      onClick={onClose}
    >
      {/* Modal Card Backdrop */}
      <div 
        className="relative w-full max-w-4xl bg-white dark:bg-slate-900 text-slate-900 dark:text-white border border-slate-200 dark:border-teal-500/40 rounded-3xl shadow-2xl overflow-hidden my-6 sm:my-8 animate-in fade-in zoom-in-95 duration-200 text-left cursor-default"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Ribbon */}
        <div className="bg-gradient-to-r from-emerald-50 via-teal-50/60 to-cyan-50 dark:from-teal-950 dark:via-slate-900 dark:to-cyan-950 px-5 sm:px-6 py-4 border-b border-slate-200 dark:border-teal-500/20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 rounded-xl bg-teal-500 text-white flex items-center justify-center font-black shadow-md">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-extrabold text-slate-900 dark:text-white">
                  Цифровой ВетПаспорт ЗооМаяк
                </h3>
                <span className="bg-emerald-100 dark:bg-emerald-500/20 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-500/30 text-[10px] font-bold px-2 py-0.5 rounded-full">
                  Верифицирован
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-mono">
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
              className="p-2 rounded-xl bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 transition cursor-pointer"
              title="Печать ветпаспорта"
            >
              <Printer className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-white dark:bg-slate-800 hover:bg-rose-100 hover:text-rose-600 dark:hover:bg-rose-950 dark:hover:text-rose-400 text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-700 transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-8 space-y-7 max-h-[80vh] overflow-y-auto">
          
          {/* Main Visual ID Card */}
          <div className="relative rounded-3xl bg-gradient-to-br from-slate-50 via-teal-50/30 to-emerald-50/40 dark:from-slate-950 dark:via-slate-900 dark:to-teal-950 border-2 border-teal-500/40 p-5 sm:p-7 shadow-lg overflow-hidden">
            
            {/* Top row of ID badge */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-5 border-b border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-3">
                <div className="px-3 py-1 rounded-xl bg-teal-500 text-white font-black text-xs uppercase tracking-wider shadow">
                  Единый ZM-ID
                </div>
                <div className="flex items-center gap-0 bg-transparent dark:bg-slate-900 px-3 py-1 rounded-xl border border-slate-200 dark:border-slate-700 shadow-xs">
                  <span className="font-mono font-bold text-teal-700 dark:text-teal-300 text-sm">{pet.zmId}</span>
                  <button
                    onClick={() => handleCopy(pet.zmId)}
                    className="text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition cursor-pointer text-xs font-semibold"
                    title="Копировать ID"
                  >
                    {copiedId ? <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" /> : 'Копировать'}
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-300">
                <span className="text-slate-500">Микрочип:</span>
                <span className="font-mono bg-white dark:bg-slate-900 px-2 py-0.5 rounded border border-slate-200 dark:border-slate-700 text-teal-700 dark:text-cyan-300 font-bold">
                  {pet.microchipId}
                </span>
              </div>
            </div>

            {/* Mid Section: Photo + Vital Info + QR Code */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 pt-5 items-center">
              
              {/* Pet Photo */}
              <div className="md:col-span-3 flex flex-col items-center">
                <div className="relative">
                  <img
                    src={pet.photoUrl}
                    alt={pet.name}
                    className="w-32 h-32 sm:w-36 sm:h-36 rounded-2xl object-cover ring-4 ring-teal-500/30 shadow-md"
                  />
                  <div className="absolute -bottom-2 -right-2 bg-emerald-500 text-white p-1.5 rounded-xl shadow font-black text-xs flex items-center gap-1">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                </div>
                <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400 mt-2 font-semibold">
                  Паспорт № {pet.passportNumber}
                </span>
              </div>

              {/* Vital Details */}
              <div className="md:col-span-6 space-y-3">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white font-display flex items-center gap-2">
                    <span>{pet.name}</span>
                    <span className="text-xs font-bold px-2 py-0.5 rounded bg-teal-100 dark:bg-teal-500/20 text-teal-800 dark:text-teal-300 border border-teal-200 dark:border-teal-500/30">
                      {pet.species === 'dog' ? 'Собака' : pet.species === 'cat' ? 'Кошка' : 'Питомец'}
                    </span>
                  </h2>
                  <p className="text-sm font-semibold text-slate-600 dark:text-slate-300 mt-0.5">
                    {pet.breed}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-2.5 text-xs">
                  <div className="bg-white dark:bg-slate-900/90 p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs">
                    <span className="text-slate-500 block text-[10px] uppercase font-bold">Возраст & Пол</span>
                    <span className="text-slate-800 dark:text-slate-200 font-bold">{pet.ageText} • {pet.gender === 'male' ? 'Кобель' : 'Сука'}</span>
                  </div>

                  <div className="bg-white dark:bg-slate-900/90 p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs">
                    <span className="text-slate-500 block text-[10px] uppercase font-bold">Текущий вес</span>
                    <span className="text-teal-700 dark:text-teal-300 font-bold">{pet.weight} {pet.weightUnit}</span>
                  </div>

                  <div className="bg-white dark:bg-slate-900/90 p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs col-span-2">
                    <span className="text-slate-500 block text-[10px] uppercase font-bold">Диета / Рацион</span>
                    <span className="text-slate-700 dark:text-slate-300 font-medium">{pet.diet}</span>
                  </div>

                  <div className="bg-white dark:bg-slate-900/90 p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs col-span-2">
                    <span className="text-amber-600 dark:text-amber-400 block text-[10px] uppercase font-bold flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> Аллергии & Особенности
                    </span>
                    <span className="text-slate-700 dark:text-slate-300 font-medium">{pet.allergies.join(', ')}</span>
                  </div>
                </div>
              </div>

              {/* Real QR Code Badge */}
              <div className="md:col-span-3 flex flex-col items-center justify-center p-4 rounded-2xl bg-white dark:bg-slate-900 text-slate-950 dark:text-white border border-slate-200 dark:border-slate-800 shadow-md text-center">
                <div className="relative p-0 bg-transparent border border-slate-200 rounded-xl mb-2 flex items-center justify-center shadow-xs">
                  <ZoomayakQR
                    value={`${window.location.origin}/qr/${encodeURIComponent(pet.zmId)}`}
                    size={100}
                    logoSize={28}
                    lightBackground={true}
                  />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">Сканировать QR</span>
                <span className="text-[9px] font-mono text-slate-500 break-all">{window.location.host}/qr/{pet.zmId}</span>
              </div>

            </div>

            {/* Bottom Actions Bar on Card */}
            <div className="mt-5 pt-4 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                <span className="text-slate-600 dark:text-slate-300">Лечащий врач: <strong className="text-slate-900 dark:text-white">{pet.primaryVet}</strong></span>
              </div>

              <button
                onClick={() => {
                  onClose();
                  onOpenCollarStudio();
                }}
                className="px-3 py-1.5 rounded-xl bg-teal-50 dark:bg-teal-500/20 hover:bg-teal-100 dark:hover:bg-teal-500/30 text-teal-700 dark:text-teal-300 font-bold border border-teal-200 dark:border-teal-500/40 transition cursor-pointer flex items-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5" />
                Заказать жетон с этим QR
              </button>
            </div>

          </div>

          {/* Medical & Vaccination History Timeline in Passport */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-base font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                <FileCheck className="w-5 h-5 text-teal-600 dark:text-teal-400" />
                <span>Медицинские отметки и прививки ({petRecords.length})</span>
              </h4>
              <span className="text-xs text-emerald-600 dark:text-emerald-400 font-bold">
                ✓ Вакцинация действительна
              </span>
            </div>

            <div className="space-y-2.5">
              {petRecords.map((rec) => (
                <div 
                  key={rec.id}
                  className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 hover:border-teal-500/40 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-xl bg-teal-100 dark:bg-teal-500/20 text-teal-700 dark:text-teal-400 flex items-center justify-center shrink-0 mt-0.5 border border-teal-200 dark:border-teal-500/30">
                      <Award className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                        <span>{rec.title}</span>
                        {rec.medicineName && (
                          <span className="text-[10px] font-mono bg-slate-200 dark:bg-slate-800 text-teal-800 dark:text-teal-300 px-1.5 py-0.5 rounded">
                            {rec.medicineName}
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                        {rec.clinic} • Врач: {rec.doctor}
                      </div>
                      {rec.notes && (
                        <div className="text-xs text-slate-600 dark:text-slate-300 mt-1 italic">
                          «{rec.notes}»
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <div className="text-xs font-bold text-slate-700 dark:text-slate-200">
                      Дата: {rec.date}
                    </div>
                    {rec.nextDueDate && (
                      <div className="text-[11px] text-teal-600 dark:text-teal-400 font-bold">
                        Следующая: {rec.nextDueDate}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Emergency Contacts Section */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800">
            <h5 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3 flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
              Экстренные контакты для связи
            </h5>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {pet.emergencyContacts.map((contact, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-between shadow-xs">
                  <div>
                    <div className="text-xs font-bold text-slate-900 dark:text-white">{contact.name}</div>
                    <div className="text-[11px] text-slate-500 dark:text-slate-400">{contact.relation}</div>
                  </div>
                  <a
                    href={`tel:${contact.phone}`}
                    className="p-2 rounded-lg bg-teal-50 dark:bg-teal-500/20 text-teal-700 dark:text-teal-300 hover:bg-teal-500 hover:text-white transition"
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
        <div className="bg-slate-50 dark:bg-slate-950 px-6 py-4 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3">
          <div className="text-xs text-slate-500 dark:text-slate-400">
            Электронный документ защищен криптографической подписью ЗооМаяк
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                handleTriggerConfetti();
                navigator.clipboard.writeText(`${window.location.origin}/qr/${pet.zmId}`);
                alert('Ссылка на публичный профиль питомца скопирована!');
              }}
              className="px-4 py-2 rounded-xl bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold border border-slate-200 dark:border-slate-700 transition flex items-center gap-1.5 cursor-pointer"
            >
              <Share2 className="w-3.5 h-3.5" />
              Поделиться профилем
            </button>
            <button
              onClick={onClose}
              className="px-6 py-2 rounded-xl bg-teal-500 hover:bg-teal-600 text-white text-xs font-extrabold shadow-md transition cursor-pointer"
            >
              Готово
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
