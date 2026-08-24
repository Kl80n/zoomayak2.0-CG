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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-xl overflow-y-auto">
      <div 
        className="relative w-full max-w-xl bg-slate-900 border-2 border-rose-500/50 rounded-3xl shadow-2xl shadow-rose-950/90 overflow-hidden my-6 animate-in zoom-in-95 text-left"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header */}
        <div className="bg-gradient-to-r from-rose-950 via-slate-900 to-red-950 px-6 py-4 border-b border-rose-500/30 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-rose-600 flex items-center justify-center text-white shadow-md animate-pulse">
              <Radio className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-extrabold text-white">
                Подача экстренного сигнала SOS
              </h3>
              <p className="text-xs text-rose-300">
                Оповещение волонтеров, ветклиник и пользователей рядом
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-4">
          
          <div>
            <label className="text-xs font-bold text-slate-300 block mb-1">
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
                      ? 'bg-rose-950/60 border-rose-500 text-white shadow-md'
                      : 'bg-slate-950 border-slate-800 text-slate-400'
                  }`}
                >
                  <img src={p.photoUrl} alt={p.name} className="w-8 h-8 rounded-xl object-cover" />
                  <div>
                    <div className="text-xs font-bold">{p.name}</div>
                    <div className="text-[10px] text-slate-400">{p.breed.slice(0, 8)}..</div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-300 block mb-1">
              Где и когда последний раз видели питомца *
            </label>
            <input
              type="text"
              required
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Улица, парк, ориентиры..."
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-white focus:border-rose-500 focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1">
                Вознаграждение за возврат
              </label>
              <input
                type="text"
                value={reward}
                onChange={(e) => setReward(e.target.value)}
                placeholder="Например: 20 000 ₽"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-amber-300 font-bold focus:border-rose-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1">
                Телефон для связи *
              </label>
              <input
                type="text"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-white focus:border-rose-500 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-300 block mb-1">
              Особые приметы и обстоятельства
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-white focus:border-rose-500 focus:outline-none"
            />
          </div>

          <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
            <span className="text-[11px] text-rose-400 font-semibold">
              Радиус рассылки: 15 км • 24/7
            </span>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 rounded-xl bg-slate-800 text-slate-300 text-xs font-bold cursor-pointer"
              >
                Отмена
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-rose-600 to-amber-600 hover:from-rose-500 hover:to-amber-500 text-white font-extrabold text-xs shadow-lg shadow-rose-600/30 cursor-pointer"
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
