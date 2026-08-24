import React, { useState, useEffect } from 'react';
import { 
  X, 
  Radio
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

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

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
      distifyingFeatures: description,
      status: 'active',
    } as unknown as LostAlert;

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
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-xl overflow-y-auto cursor-pointer"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-xl bg-white dark:bg-slate-900 text-slate-900 dark:text-white border-2 border-rose-500/40 rounded-3xl shadow-2xl overflow-hidden my-6 animate-in zoom-in-95 text-left cursor-default"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header */}
        <div className="bg-gradient-to-r from-rose-50 via-red-50/50 to-orange-50 dark:from-rose-950 dark:via-slate-900 dark:to-red-950 px-6 py-4 border-b border-rose-200 dark:border-rose-500/30 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 rounded-xl bg-rose-600 flex items-center justify-center text-white shadow-md animate-pulse">
              <Radio className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-extrabold text-slate-900 dark:text-white">
                Подача экстренного сигнала SOS
              </h3>
              <p className="text-xs text-rose-700 dark:text-rose-300 font-medium">
                Оповещение волонтеров, ветклиник и пользователей рядом
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white dark:bg-slate-800 hover:bg-rose-100 hover:text-rose-600 dark:hover:bg-rose-950 dark:hover:text-rose-400 text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-700 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-4">
          
          <div>
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
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
                      ? 'bg-rose-50 dark:bg-rose-950/60 border-rose-500 text-rose-900 dark:text-white shadow-xs font-bold'
                      : 'bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400'
                  }`}
                >
                  <img src={p.photoUrl} alt={p.name} className="w-8 h-8 rounded-xl object-cover" />
                  <div className="min-w-0">
                    <div className="text-xs font-bold truncate">{p.name}</div>
                    <div className="text-[10px] text-slate-500 dark:text-slate-400 truncate">{p.breed}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
              Где и когда последний раз видели питомца *
            </label>
            <input
              type="text"
              required
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Улица, парк, ориентиры..."
              className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-sm text-slate-900 dark:text-white focus:border-rose-500 focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                Вознаграждение за возврат
              </label>
              <input
                type="text"
                value={reward}
                onChange={(e) => setReward(e.target.value)}
                placeholder="Например: 20 000 ₽"
                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-sm text-amber-700 dark:text-amber-300 font-bold focus:border-rose-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                Телефон для связи *
              </label>
              <input
                type="text"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-sm text-slate-900 dark:text-white focus:border-rose-500 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
              Особые приметы и обстоятельства
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-sm text-slate-900 dark:text-white focus:border-rose-500 focus:outline-none"
            />
          </div>

          <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <span className="text-[11px] text-rose-600 dark:text-rose-400 font-bold">
              Радиус рассылки: 15 км • 24/7
            </span>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 text-xs font-bold hover:bg-slate-200 dark:hover:bg-slate-700 transition cursor-pointer"
              >
                Отмена
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-extrabold text-xs shadow-lg shadow-rose-600/30 transition cursor-pointer"
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
