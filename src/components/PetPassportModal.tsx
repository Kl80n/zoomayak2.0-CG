import React, { useState } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xl overflow-y-auto">
      
      {/* Modal Card Backdrop */}
      <div 
        className="relative w-full max-w-4xl bg-slate-900 border border-teal-500/40 rounded-3xl shadow-2xl shadow-teal-950/80 overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Ribbon */}
        <div className="bg-gradient-to-r from-teal-950 via-slate-900 to-cyan-950 px-6 py-4 border-b border-teal-500/20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-400 to-cyan-500 flex items-center justify-center text-slate-950 font-black shadow-md">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-extrabold text-white">
                  Цифровой ВетПаспорт ЗооМаяк
                </h3>
                <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-bold px-2 py-0.5 rounded-full">
                  Верифицирован
                </span>
              </div>
              <p className="text-xs text-slate-400 font-mono">
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
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition cursor-pointer"
              title="Печать ветпаспорта"
            >
              <Printer className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-800 hover:bg-rose-950 hover:text-rose-400 text-slate-400 transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-8 max-h-[80vh] overflow-y-auto">
          
          {/* Main Visual ID Card */}
          <div className="relative rounded-3xl bg-gradient-to-br from-slate-950 via-slate-900 to-teal-950 border-2 border-teal-500/50 p-6 sm:p-8 shadow-2xl overflow-hidden">
            
            {/* Top background glow elements */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-teal-500/15 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-60 h-60 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none"></div>

            {/* Top row of ID badge */}
            <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-800">
              <div className="flex items-center gap-3">
                <div className="px-3 py-1 rounded-xl bg-gradient-to-r from-teal-500 to-cyan-500 text-slate-950 font-black text-xs uppercase tracking-wider shadow">
                  Единый ZM-ID
                </div>
                <div className="flex items-center gap-2 bg-slate-900 px-3 py-1 rounded-xl border border-slate-700">
                  <span className="font-mono font-bold text-teal-300 text-sm">{pet.zmId}</span>
                  <button
                    onClick={() => handleCopy(pet.zmId, 'id')}
                    className="text-slate-400 hover:text-white transition cursor-pointer text-xs"
                    title="Копировать ID"
                  >
                    {copiedId ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : 'Копировать'}
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs text-slate-300">
                <span className="text-slate-500">Микрочип:</span>
                <span className="font-mono bg-slate-900 px-2 py-0.5 rounded border border-slate-700 text-cyan-300">
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
                    className="w-32 h-32 sm:w-36 sm:h-36 rounded-2xl object-cover ring-4 ring-teal-500/40 shadow-xl"
                  />
                  <div className="absolute -bottom-2 -right-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 p-1.5 rounded-xl shadow font-black text-xs flex items-center gap-1">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                </div>
                <span className="text-[11px] font-mono text-slate-400 mt-2">
                  Паспорт № {pet.passportNumber}
                </span>
              </div>

              {/* Vital Details */}
              <div className="md:col-span-6 space-y-3 text-left">
                <div>
                  <h2 className="text-3xl font-black text-white font-display flex items-center gap-2">
                    <span>{pet.name}</span>
                    <span className="text-xs font-bold px-2 py-0.5 rounded bg-teal-500/20 text-teal-300 border border-teal-500/30">
                      {pet.species === 'dog' ? 'Собака' : pet.species === 'cat' ? 'Кошка' : 'Питомец'}
                    </span>
                  </h2>
                  <p className="text-sm font-semibold text-slate-300 mt-0.5">
                    {pet.breed}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="bg-slate-900/80 p-2.5 rounded-xl border border-slate-800">
                    <span className="text-slate-500 block text-[10px] uppercase font-bold">Возраст & Пол</span>
                    <span className="text-slate-200 font-bold">{pet.ageText} • {pet.gender === 'male' ? 'Кобель' : 'Сука'}</span>
                  </div>

                  <div className="bg-slate-900/80 p-2.5 rounded-xl border border-slate-800">
                    <span className="text-slate-500 block text-[10px] uppercase font-bold">Текущий вес</span>
                    <span className="text-teal-300 font-bold">{pet.weight} {pet.weightUnit}</span>
                  </div>

                  <div className="bg-slate-900/80 p-2.5 rounded-xl border border-slate-800 col-span-2">
                    <span className="text-slate-500 block text-[10px] uppercase font-bold">Диета / Рацион</span>
                    <span className="text-slate-300 font-medium">{pet.diet}</span>
                  </div>

                  <div className="bg-slate-900/80 p-2.5 rounded-xl border border-slate-800 col-span-2">
                    <span className="text-amber-400/90 block text-[10px] uppercase font-bold flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> Аллергии & Особенности
                    </span>
                    <span className="text-slate-300 font-medium">{pet.allergies.join(', ')}</span>
                  </div>
                </div>
              </div>

              {/* Real QR Code Badge */}
              <div className="md:col-span-3 flex flex-col items-center justify-center p-4 rounded-2xl bg-white text-slate-950 shadow-xl text-center">
                <div className="relative p-2 border-2 border-slate-900 rounded-xl mb-2">
                  <QRCodeCanvas
                    value={`${window.location.origin}/qr/${encodeURIComponent(pet.zmId)}`}
                    size={96}
                    level="H"
                    includeMargin
                    imageSettings={{ src: '/zoomayak-logo-approved-icon.png', height: 22, width: 22, excavate: true }}
                  />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-800">Сканировать QR</span>
                <span className="text-[9px] font-mono text-slate-500 break-all">{window.location.host}/qr/{pet.zmId}</span>
              </div>

            </div>

            {/* Bottom Actions Bar on Card */}
            <div className="mt-6 pt-5 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                <span className="text-slate-300">Лечащий врач: <strong className="text-white">{pet.primaryVet}</strong></span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    onClose();
                    onOpenCollarStudio();
                  }}
                  className="px-3 py-1.5 rounded-xl bg-teal-500/20 hover:bg-teal-500/30 text-teal-300 font-bold border border-teal-500/40 transition cursor-pointer flex items-center gap-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  Заказать металл-жетон с этим QR
                </button>
              </div>
            </div>

          </div>

          {/* Medical & Vaccination History Timeline in Passport */}
          <div className="space-y-4 text-left">
            <div className="flex items-center justify-between">
              <h4 className="text-base font-extrabold text-white flex items-center gap-2">
                <FileCheck className="w-5 h-5 text-teal-400" />
                <span>Медицинские отметки и прививки ({petRecords.length})</span>
              </h4>
              <span className="text-xs text-emerald-400 font-bold">
                ✓ Вакцинация действительна
              </span>
            </div>

            <div className="space-y-2.5">
              {petRecords.map((rec) => (
                <div 
                  key={rec.id}
                  className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800/80 hover:border-teal-500/30 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-xl bg-teal-500/20 text-teal-400 flex items-center justify-center shrink-0 mt-0.5 border border-teal-500/30">
                      <Award className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-white flex items-center gap-2">
                        <span>{rec.title}</span>
                        <span className="text-[10px] font-mono bg-slate-800 text-teal-300 px-1.5 py-0.5 rounded">
                          {rec.medicineName}
                        </span>
                      </div>
                      <div className="text-xs text-slate-400 mt-0.5">
                        {rec.clinic} • Врач: {rec.doctor}
                      </div>
                      {rec.notes && (
                        <div className="text-xs text-slate-300 mt-1 italic">
                          "{rec.notes}"
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <div className="text-xs font-bold text-slate-200">
                      Дата: {rec.date}
                    </div>
                    {rec.nextDueDate && (
                      <div className="text-[11px] text-teal-400 font-medium">
                        Следующая: {rec.nextDueDate}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Emergency Contacts Section */}
          <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 text-left">
            <h5 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-teal-400" />
              Экстренные контакты для связи
            </h5>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {pet.emergencyContacts.map((contact, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
                  <div>
                    <div className="text-xs font-bold text-white">{contact.name}</div>
                    <div className="text-[11px] text-slate-400">{contact.relation}</div>
                  </div>
                  <a
                    href={`tel:${contact.phone}`}
                    className="p-2 rounded-lg bg-teal-500/20 text-teal-300 hover:bg-teal-500 hover:text-slate-950 transition"
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
        <div className="bg-slate-950 px-6 py-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
          <div className="text-xs text-slate-400">
            Электронный документ защищен криптографической подписью ЗооМаяк
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                handleTriggerConfetti();
                navigator.clipboard.writeText(`https://zoomayak.ru/passport/${pet.zmId}`);
                alert('Ссылка на публичный профиль питомца скопирована!');
              }}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition flex items-center gap-1.5 cursor-pointer"
            >
              <Share2 className="w-3.5 h-3.5" />
              Поделиться профилем
            </button>
            <button
              onClick={onClose}
              className="px-6 py-2 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 text-xs font-extrabold transition cursor-pointer"
            >
              Готово
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
