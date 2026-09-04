import React, { useState } from 'react';
import { 
  X, 
  Radio, 
  AlertTriangle, 
  MapPin, 
  Sparkles, 
  Phone, 
  CheckCircle,
  Share2
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { LostAlert, Pet } from '../types';

interface SOSAlertModalProps {
  isOpen: boolean;
  onClose: () => void;
  pets: Pet[];
  onAddAlert: (alert: LostAlert) => void;
}

export const SOSAlertModal: React.FC<SOSAlertModalProps> = ({
  isOpen,
  onClose,
  pets,
  onAddAlert,
}) => {
  const [selectedPetId, setSelectedPetId] = useState(pets[0]?.id || 'pet-1');
  const [location, setLocation] = useState('Парк Горького, набережная');
  const [reward, setReward] = useState('25 000 ₽');
  const [phone, setPhone] = useState('+7 (999) 450-88-21');
  const [description, setDescription] = useState('Убежал во время вечерней прогулки, испугался салюта. На нем ошейник с QR ЗооМаяк.');

  if (!isOpen) return null;

  const currentPet = pets.find(p => p.id === selectedPetId) || pets[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newAlert: LostAlert = {
      id: `lost-${Date.now()}`,
      petId: currentPet.id,
      petName: currentPet.name,
      species: currentPet.species,
      breed: currentPet.breed,
      photoUrl: currentPet.photoUrl,
      zmId: currentPet.zmId,
      location,
      coordinates: { lat: 55.73, lng: 37.60 },
      lostDate: 'Только что',
      reward: reward || undefined,
      ownerName: currentPet.emergencyContacts[0]?.name || 'Владелец',
      ownerPhone: phone,
      distinguishingFeatures: description,
      status: 'active',
    };

    onAddAlert(newAlert);
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });
    onClose();
    alert('Сигнал SOS успешно разослан по сети ЗооМаяк в радиусе 15 км! Объявление добавлено на радар.');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md overflow-y-auto">
      <div 
        className="relative w-full max-w-xl bg-white border border-rose-200 rounded-3xl shadow-2xl overflow-hidden my-6 animate-in zoom-in-95 text-left"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header */}
        <div className="bg-gradient-to-r from-rose-700 via-rose-800 to-red-800 px-6 py-4 border-b border-rose-600/30 flex items-center justify-between text-white shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/15 backdrop-blur-xs border border-white/25 flex items-center justify-center text-rose-200 shadow-inner animate-pulse">
              <Radio className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-black text-white tracking-tight">
                Подача экстренного сигнала SOS
              </h3>
              <p className="text-xs text-rose-100/90 font-medium">
                Оповещение волонтеров, ветклиник и пользователей рядом
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

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-4 bg-slate-50/50">
          
          <div>
            <label className="text-xs font-black uppercase tracking-wider text-slate-700 block mb-2">
              Выберите питомца
            </label>
            <div className="grid grid-cols-3 gap-2">
              {pets.map((p) => (
                <button
                  type="button"
                  key={p.id}
                  onClick={() => setSelectedPetId(p.id)}
                  className={`p-2.5 rounded-2xl border transition flex items-center gap-2 text-left cursor-pointer ${
                    selectedPetId === p.id
                      ? 'bg-rose-50 border-rose-500 text-slate-900 shadow-xs ring-2 ring-rose-500/20'
                      : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
                  }`}
                >
                  <img src={p.photoUrl} alt={p.name} className="w-8 h-8 rounded-xl object-cover ring-1 ring-slate-200" />
                  <div>
                    <div className="text-xs font-black text-slate-900">{p.name}</div>
                    <div className="text-[10px] text-slate-500 font-semibold">{p.breed.slice(0, 8)}..</div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">
              Где и когда последний раз видели питомца *
            </label>
            <input
              type="text"
              required
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Улица, парк, ориентиры..."
              className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-sm text-slate-900 focus:border-rose-500 focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Вознаграждение за возврат
              </label>
              <input
                type="text"
                value={reward}
                onChange={(e) => setReward(e.target.value)}
                placeholder="Например: 20 000 ₽"
                className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-sm text-amber-700 font-bold focus:border-rose-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Телефон для связи *
              </label>
              <input
                type="text"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-sm text-slate-900 font-bold focus:border-rose-500 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">
              Особые приметы и обстоятельства
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-sm text-slate-900 focus:border-rose-500 focus:outline-none"
            />
          </div>

          <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
            <span className="text-[11px] text-rose-700 font-bold">
              Радиус рассылки: 15 км • 24/7
            </span>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold cursor-pointer"
              >
                Отмена
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 text-white font-extrabold text-xs shadow-md shadow-rose-600/20 cursor-pointer"
              >
                Запустить поиск SOS
              </button>
            </div>
          </div>

        </form>

      </div>
    </div>
  );
};
