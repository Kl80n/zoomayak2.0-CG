import React, { useState } from 'react';
import { 
  X, 
  QrCode, 
  Camera, 
  Search, 
  Phone, 
  ShieldCheck, 
  Sparkles, 
  Check,
  AlertCircle
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { Pet } from '../types';

interface ScanModalProps {
  isOpen: boolean;
  onClose: () => void;
  pets: Pet[];
  onOpenPetProfile: (pet: Pet) => void;
}

export const ScanModal: React.FC<ScanModalProps> = ({
  isOpen,
  onClose,
  pets,
  onOpenPetProfile,
}) => {
  const [searchInput, setSearchInput] = useState('');
  const [scannedPet, setScannedPet] = useState<Pet | null>(null);
  const [isScanning, setIsScanning] = useState(true);

  if (!isOpen) return null;

  const handleSimulateScan = (pet: Pet) => {
    setIsScanning(false);
    setScannedPet(pet);
    confetti({ particleCount: 40 });
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchInput.trim()) return;

    const found = pets.find(
      p => p.zmId.toLowerCase().includes(searchInput.toLowerCase()) ||
           p.microchipId.includes(searchInput) ||
           p.name.toLowerCase().includes(searchInput.toLowerCase())
    );

    if (found) {
      handleSimulateScan(found);
    } else {
      alert('Питомец с таким ZM-ID или чипом не найден в демонстрационной базе.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md overflow-y-auto">
      <div 
        className="relative w-full max-w-xl bg-white border border-slate-200/90 rounded-3xl shadow-2xl overflow-hidden my-6 animate-in zoom-in-95 text-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-teal-700 via-teal-800 to-emerald-800 px-6 py-4 border-b border-teal-600/30 flex items-center justify-between text-white shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/15 backdrop-blur-xs border border-white/25 flex items-center justify-center text-emerald-300 shadow-inner">
              <QrCode className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-black text-white tracking-tight">
                Сканер QR-Маяка и Микрочипов
              </h3>
              <p className="text-xs text-teal-100/90 font-medium">
                Моментальная идентификация питомца и связь с владельцем
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white/10 hover:bg-rose-500/80 hover:text-white text-white/80 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 space-y-6 bg-slate-50/50">
          
          {/* Simulated Scanner Viewport */}
          {isScanning && (
            <div className="relative h-64 rounded-2xl bg-slate-900 border-2 border-teal-500/50 overflow-hidden flex flex-col items-center justify-center p-4 shadow-inner">
              
              {/* Scan grid and laser line */}
              <div className="absolute inset-x-8 h-1 bg-gradient-to-r from-transparent via-teal-400 to-transparent animate-pulse shadow-lg shadow-teal-400/80"></div>
              
              {/* Viewfinder brackets */}
              <div className="w-48 h-48 border-2 border-teal-400/60 rounded-2xl relative flex items-center justify-center">
                <div className="absolute -top-1 -left-1 w-4 h-4 border-t-2 border-l-2 border-teal-300"></div>
                <div className="absolute -top-1 -right-1 w-4 h-4 border-t-2 border-r-2 border-teal-300"></div>
                <div className="absolute -bottom-1 -left-1 w-4 h-4 border-b-2 border-l-2 border-teal-300"></div>
                <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b-2 border-r-2 border-teal-300"></div>
                <Camera className="w-10 h-10 text-teal-400/60 animate-pulse" />
              </div>

              <span className="text-xs text-slate-300 font-semibold mt-4">
                Наведите камеру на QR-адресник на ошейнике или введите ZM-ID
              </span>
            </div>
          )}

          {/* Quick Simulation Trigger Buttons */}
          {isScanning && (
            <div>
              <span className="text-xs font-black uppercase tracking-wider text-slate-600 block mb-2">
                Тестовое сканирование жетона:
              </span>
              <div className="grid grid-cols-3 gap-2">
                {pets.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => handleSimulateScan(p)}
                    className="p-2.5 rounded-xl bg-white border border-slate-200 hover:border-teal-500 hover:bg-teal-50/50 text-xs font-bold text-slate-800 transition flex items-center gap-2 cursor-pointer shadow-xs"
                  >
                    <img src={p.photoUrl} alt={p.name} className="w-6 h-6 rounded-full object-cover ring-1 ring-slate-200" />
                    <span>{p.name}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Manual Input Form */}
          {isScanning && (
            <form onSubmit={handleSearch} className="flex gap-2">
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Введите ZM-ID (например ZM-7X3B-9K2D) или чип"
                className="flex-1 bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 focus:border-teal-500 focus:outline-none font-mono"
              />
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-extrabold text-xs cursor-pointer shadow-xs"
              >
                Найти
              </button>
            </form>
          )}

          {/* Scanned Rescue Profile Result */}
          {scannedPet && (
            <div className="p-6 rounded-3xl bg-white border-2 border-emerald-500 shadow-xl space-y-4 animate-in zoom-in-95">
              
              <div className="flex items-center gap-2 text-emerald-800 text-xs font-extrabold uppercase tracking-wider">
                <Check className="w-4 h-4 text-emerald-600" />
                <span>Питомец успешно опознан в базе ЗооМаяк!</span>
              </div>

              <div className="flex items-center gap-4">
                <img
                  src={scannedPet.photoUrl}
                  alt={scannedPet.name}
                  className="w-20 h-20 rounded-2xl object-cover ring-2 ring-emerald-500 shadow-md"
                />
                <div>
                  <h4 className="text-2xl font-black text-slate-900">
                    {scannedPet.name}
                  </h4>
                  <p className="text-xs font-bold text-slate-700">
                    {scannedPet.breed} • {scannedPet.ageText}
                  </p>
                  <p className="text-xs font-mono font-bold text-teal-700 mt-0.5">
                    ID: {scannedPet.zmId}
                  </p>
                </div>
              </div>

              {/* Vital rescue notes */}
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 space-y-1 font-medium">
                <div><strong>Владелец:</strong> {scannedPet.emergencyContacts[0]?.name}</div>
                <div><strong>Особые приметы:</strong> {scannedPet.specialNotes}</div>
                {scannedPet.allergies.length > 0 && (
                  <div className="text-amber-800 font-bold">
                    ⚠️ Внимание: {scannedPet.allergies.join(', ')}
                  </div>
                )}
              </div>

              {/* Direct call action */}
              <div className="flex gap-2 pt-2">
                <a
                  href={`tel:${scannedPet.emergencyContacts[0]?.phone}`}
                  className="flex-1 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-extrabold text-xs flex items-center justify-center gap-2 shadow-md"
                >
                  <Phone className="w-4 h-4" />
                  <span>Позвонить владельцу: {scannedPet.emergencyContacts[0]?.phone}</span>
                </a>

                <button
                  onClick={() => {
                    onClose();
                    onOpenPetProfile(scannedPet);
                  }}
                  className="px-4 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-teal-800 text-xs font-bold transition cursor-pointer border border-slate-200"
                >
                  Полный паспорт
                </button>
              </div>

              <button
                onClick={() => {
                  setScannedPet(null);
                  setIsScanning(true);
                }}
                className="w-full text-center text-xs text-slate-500 hover:text-slate-800 pt-1 cursor-pointer font-bold"
              >
                Сканировать другого питомца
              </button>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
