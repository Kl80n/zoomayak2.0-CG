import React, { useState } from 'react';
import { 
  X, 
  Plus, 
  Sparkles, 
  Upload, 
  ShieldCheck, 
  CheckCircle2,
  Camera
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { Pet, PetSpecies } from '../types';

interface AddPetModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddPet: (pet: Pet) => void;
}

export const AddPetModal: React.FC<AddPetModalProps> = ({
  isOpen,
  onClose,
  onAddPet,
}) => {
  const [name, setName] = useState('');
  const [species, setSpecies] = useState<PetSpecies>('dog');
  const [breed, setBreed] = useState('');
  const [birthDate, setBirthDate] = useState('2024-01-01');
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [weight, setWeight] = useState(12.5);
  const [diet, setDiet] = useState('Премиум сухой корм для активных собак');
  const [microchipId, setMicrochipId] = useState('643098' + Math.floor(100000000 + Math.random() * 900000000));
  const [photoUrl, setPhotoUrl] = useState('https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=800&q=80');
  const [allergiesText, setAllergiesText] = useState('Нет выявленных');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !breed.trim()) return;

    const randomSuffix = Math.random().toString(36).substring(2, 6).toUpperCase() + '-' + Math.random().toString(36).substring(2, 6).toUpperCase();
    const newZmId = `ZM-${randomSuffix}`;

    const newPet: Pet = {
      id: `pet-${Date.now()}`,
      name,
      species,
      breed,
      ageText: '1 год',
      birthDate,
      gender,
      photoUrl,
      zmId: newZmId,
      microchipId,
      status: 'safe',
      healthScore: 100,
      weight,
      weightUnit: 'кг',
      weightHistory: [
        { date: '2025-01', weightKg: weight - 1.5 },
        { date: '2025-05', weightKg: weight - 0.8 },
        { date: '2026-02', weightKg: weight },
      ],
      allergies: allergiesText.split(',').map(s => s.trim()).filter(Boolean),
      diet,
      passportNumber: `ВП-RUS-${Math.floor(100000 + Math.random() * 900000)}-Z`,
      vetClinic: 'ВетЦентр «Маяк & Друзья»',
      primaryVet: 'Д-р Смирнова Анна Павловна',
      emergencyContacts: [
        { name: 'Владелец', phone: '+7 (999) 450-88-21', relation: 'Основной владелец' },
      ],
      specialNotes: 'Новый питомец успешно добавлен в базу ЗооМаяк.',
      features: ['Чипирован', 'Паспорт оформлен'],
    };

    onAddPet(newPet);
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });
    onClose();
  };

  const samplePhotos = [
    { url: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=800&q=80', label: 'Корги' },
    { url: 'https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?auto=format&fit=crop&w=800&q=80', label: 'Хаски' },
    { url: 'https://images.unsplash.com/photo-1574158622682-e40e69881006?auto=format&fit=crop&w=800&q=80', label: 'Британский кот' },
    { url: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?auto=format&fit=crop&w=800&q=80', label: 'Полосатый кот' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md overflow-y-auto">
      <div 
        className="relative w-full max-w-2xl bg-white border border-slate-200/90 rounded-3xl shadow-2xl overflow-hidden my-6 animate-in zoom-in-95 text-left"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header */}
        <div className="bg-gradient-to-r from-teal-700 via-teal-800 to-emerald-800 px-6 py-4 border-b border-teal-600/30 flex items-center justify-between text-white shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/15 backdrop-blur-xs border border-white/25 flex items-center justify-center text-emerald-300 shadow-inner">
              <Plus className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-black text-white tracking-tight">
                Регистрация нового питомца
              </h3>
              <p className="text-xs text-teal-100/90 font-medium">
                Создание цифрового ветпаспорта и генерация персонального ZM-ID
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
        <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-4 max-h-[80vh] overflow-y-auto bg-slate-50/50">
          
          {/* Pet Type and Gender */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-black uppercase tracking-wider text-slate-600 block mb-2">
                Вид питомца
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setSpecies('dog')}
                  className={`py-2 px-3 rounded-xl text-xs font-bold border transition cursor-pointer ${
                    species === 'dog'
                      ? 'bg-teal-600 text-white border-teal-600 shadow-xs'
                      : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  🐶 Собака
                </button>
                <button
                  type="button"
                  onClick={() => setSpecies('cat')}
                  className={`py-2 px-3 rounded-xl text-xs font-bold border transition cursor-pointer ${
                    species === 'cat'
                      ? 'bg-teal-600 text-white border-teal-600 shadow-xs'
                      : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  🐱 Кошка
                </button>
              </div>
            </div>

            <div>
              <label className="text-xs font-black uppercase tracking-wider text-slate-600 block mb-2">
                Пол
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setGender('male')}
                  className={`py-2 px-3 rounded-xl text-xs font-bold border transition cursor-pointer ${
                    gender === 'male'
                      ? 'bg-cyan-600 text-white border-cyan-600 shadow-xs'
                      : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  ♂ Мальчик
                </button>
                <button
                  type="button"
                  onClick={() => setGender('female')}
                  className={`py-2 px-3 rounded-xl text-xs font-bold border transition cursor-pointer ${
                    gender === 'female'
                      ? 'bg-rose-500 text-white border-rose-500 shadow-xs'
                      : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  ♀ Девочка
                </button>
              </div>
            </div>
          </div>

          {/* Name and Breed */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Кличка питомца *
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Например: Арчи, Мия, Чарли..."
                className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-sm text-slate-900 focus:border-teal-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Порода *
              </label>
              <input
                type="text"
                required
                value={breed}
                onChange={(e) => setBreed(e.target.value)}
                placeholder="Например: Французский бульдог, Абиссинская..."
                className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-sm text-slate-900 focus:border-teal-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Birth date & Weight */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Дата рождения
              </label>
              <input
                type="date"
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
                className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-sm text-slate-900 focus:border-teal-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Вес (кг)
              </label>
              <input
                type="number"
                step="0.1"
                value={weight}
                onChange={(e) => setWeight(parseFloat(e.target.value) || 0)}
                className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-sm text-slate-900 focus:border-teal-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Photo Selector */}
          <div>
            <label className="text-xs font-black uppercase tracking-wider text-slate-600 block mb-2">
              Фотография профиля (Выберите образец или укажите ссылку)
            </label>
            <div className="grid grid-cols-4 gap-2 mb-2">
              {samplePhotos.map((p, idx) => (
                <button
                  type="button"
                  key={idx}
                  onClick={() => setPhotoUrl(p.url)}
                  className={`relative rounded-xl overflow-hidden border-2 transition cursor-pointer ${
                    photoUrl === p.url ? 'border-teal-500 shadow-sm ring-2 ring-teal-500/20' : 'border-slate-200 opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={p.url} alt={p.label} className="w-full h-14 object-cover" />
                  <span className="text-[9px] font-bold text-center block bg-slate-900/80 py-0.5 text-white">
                    {p.label}
                  </span>
                </button>
              ))}
            </div>
            <input
              type="url"
              value={photoUrl}
              onChange={(e) => setPhotoUrl(e.target.value)}
              placeholder="Или вставьте прямую ссылку на фото"
              className="w-full bg-white border border-slate-300 rounded-xl px-3 py-1.5 text-xs text-slate-700 focus:border-teal-500 focus:outline-none font-mono"
            />
          </div>

          {/* Microchip & Allergies */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Номер микрочипа (ISO 11784)
              </label>
              <input
                type="text"
                value={microchipId}
                onChange={(e) => setMicrochipId(e.target.value)}
                className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-sm text-teal-700 font-mono font-bold focus:border-teal-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Аллергии и особенности (через запятую)
              </label>
              <input
                type="text"
                value={allergiesText}
                onChange={(e) => setAllergiesText(e.target.value)}
                placeholder="Курица, лактоза..."
                className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-sm text-slate-900 focus:border-teal-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Submit */}
          <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
            <span className="text-xs text-teal-700 font-bold flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600" /> Данные шифруются и защищены
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
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-500 hover:to-emerald-500 text-white font-extrabold text-xs shadow-md shadow-teal-600/20 cursor-pointer"
              >
                Зарегистрировать питомца
              </button>
            </div>
          </div>

        </form>

      </div>
    </div>
  );
};
