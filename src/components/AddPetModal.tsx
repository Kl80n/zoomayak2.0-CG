import React, { useState, useEffect } from 'react';
import { 
  X, 
  Plus, 
  ShieldCheck,
  QrCode,
  Sparkles,
  Download,
  Printer,
  Check,
  ArrowRight
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { Pet, PetSpecies } from '../types';
import { ZoomayakLogo } from './ZoomayakLogo';
import { ZoomayakQR } from './ZoomayakQR';

interface AddPetModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddPet: (pet: Pet) => void;
  onOpenCollarStudio?: () => void;
}

export const AddPetModal: React.FC<AddPetModalProps> = ({
  isOpen,
  onClose,
  onAddPet,
  onOpenCollarStudio,
}) => {
  const [step, setStep] = useState<'form' | 'success'>('form');

  const [name, setName] = useState('');
  const [species, setSpecies] = useState<PetSpecies>('dog');
  const [breed, setBreed] = useState('');
  const [birthDate, setBirthDate] = useState('2024-01-01');
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [weight, setWeight] = useState(12.5);
  const [diet, setDiet] = useState('Премиум сухой корм для активных питомцев');
  const [microchipId, setMicrochipId] = useState('643098' + Math.floor(100000000 + Math.random() * 900000000));
  const [photoUrl, setPhotoUrl] = useState('https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=800&q=80');
  const [allergiesText, setAllergiesText] = useState('Нет выявленных');

  // Generated Pet for Success Screen
  const [createdPet, setCreatedPet] = useState<Pet | null>(null);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !breed.trim()) return;

    const randomSuffix = Math.random().toString(36).substring(2, 6).toUpperCase() + '-' + Math.random().toString(36).substring(2, 6).toUpperCase();
    const newZmId = `ZM-${randomSuffix}`;

    const newPet: Pet = {
      id: `pet-${Date.now()}`,
      name: name.trim(),
      species,
      breed: breed.trim(),
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
        { name: 'Владелец', phone: '+7 (905) 123-45-67', relation: 'Основной владелец' },
      ],
      specialNotes: 'Новый питомец успешно добавлен в базу ЗооМаяк. QR-код и ZM-ID сгенерированы автоматически.',
      features: ['Чипирован', 'Паспорт оформлен', 'QR-маяк активен'],
    };

    onAddPet(newPet);
    setCreatedPet(newPet);
    setStep('success');

    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  const samplePhotos = [
    { url: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=800&q=80', label: 'Корги' },
    { url: 'https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?auto=format&fit=crop&w=800&q=80', label: 'Хаски' },
    { url: 'https://images.unsplash.com/photo-1574158622682-e40e69881006?auto=format&fit=crop&w=800&q=80', label: 'Британский кот' },
    { url: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?auto=format&fit=crop&w=800&q=80', label: 'Полосатый кот' },
  ];

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-xl overflow-y-auto cursor-pointer"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-2xl bg-white dark:bg-slate-900 text-slate-900 dark:text-white border border-slate-200 dark:border-teal-500/40 rounded-3xl shadow-2xl overflow-hidden my-6 animate-in zoom-in-95 text-left cursor-default"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-50 via-teal-50/60 to-cyan-50 dark:from-teal-950 dark:via-slate-900 dark:to-cyan-950 px-6 py-4 border-b border-slate-200 dark:border-teal-500/20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 rounded-xl bg-teal-500 text-white flex items-center justify-center shadow-md">
              {step === 'form' ? <Plus className="w-5 h-5" /> : <Check className="w-5 h-5" />}
            </div>
            <div>
              <h3 className="text-lg font-extrabold text-slate-900 dark:text-white">
                {step === 'form' ? 'Регистрация нового питомца' : 'Питомец успешно зарегистрирован!'}
              </h3>
              <p className="text-xs text-teal-700 dark:text-teal-300 font-medium">
                {step === 'form' ? 'Создание цифрового ветпаспорта и генерация персонального ZM-ID' : 'Персональный QR-код с логотипом компании сгенерирован'}
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

        {/* STEP 1: Registration Form */}
        {step === 'form' && (
          <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-4 max-h-[80vh] overflow-y-auto">
            
            {/* Pet Type and Gender */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Вид питомца *
                </label>
                <select
                  value={species}
                  onChange={(e) => setSpecies(e.target.value as PetSpecies)}
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-sm text-slate-900 dark:text-white focus:border-teal-500 focus:outline-none"
                >
                  <option value="dog">🐶 Собака</option>
                  <option value="cat">🐱 Кошка</option>
                  <option value="bird">🦜 Птица</option>
                  <option value="rodent">🐹 Грызун</option>
                  <option value="reptile">🦎 Рептилия</option>
                  <option value="other">🐾 Другое</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Пол
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setGender('male')}
                    className={`py-2 px-3 rounded-xl text-xs font-bold border transition cursor-pointer ${
                      gender === 'male'
                        ? 'bg-teal-50 dark:bg-cyan-500/20 border-teal-400 dark:border-cyan-400 text-teal-800 dark:text-cyan-300'
                        : 'bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    ♂ Мальчик
                  </button>
                  <button
                    type="button"
                    onClick={() => setGender('female')}
                    className={`py-2 px-3 rounded-xl text-xs font-bold border transition cursor-pointer ${
                      gender === 'female'
                        ? 'bg-pink-50 dark:bg-pink-500/20 border-pink-400 dark:border-pink-400 text-pink-800 dark:text-pink-300'
                        : 'bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400'
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
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Кличка питомца *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Например: Арчи, Мия, Чарли..."
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-sm text-slate-900 dark:text-white focus:border-teal-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Порода *
                </label>
                <input
                  type="text"
                  required
                  value={breed}
                  onChange={(e) => setBreed(e.target.value)}
                  placeholder="Например: Французский бульдог, Абиссинская..."
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-sm text-slate-900 dark:text-white focus:border-teal-500 focus:outline-none"
                />
              </div>
            </div>

            {/* Birth date & Weight */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Дата рождения
                </label>
                <input
                  type="date"
                  value={birthDate}
                  onChange={(e) => setBirthDate(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-sm text-slate-900 dark:text-white focus:border-teal-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Вес (кг)
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={weight}
                  onChange={(e) => setWeight(parseFloat(e.target.value) || 0)}
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-sm text-slate-900 dark:text-white focus:border-teal-500 focus:outline-none"
                />
              </div>
            </div>

            {/* Photo Selector */}
            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-2">
                Фотография профиля (Выберите образец или укажите ссылку)
              </label>
              <div className="grid grid-cols-4 gap-2 mb-2">
                {samplePhotos.map((p, idx) => (
                  <button
                    type="button"
                    key={idx}
                    onClick={() => setPhotoUrl(p.url)}
                    className={`relative rounded-xl overflow-hidden border-2 transition cursor-pointer ${
                      photoUrl === p.url ? 'border-teal-500 shadow-md ring-2 ring-teal-500/30' : 'border-slate-200 dark:border-slate-800 opacity-60 hover:opacity-100'
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
                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-1.5 text-xs text-slate-700 dark:text-slate-300 focus:border-teal-500 focus:outline-none font-mono"
              />
            </div>

            {/* Microchip & Allergies */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Номер микрочипа (ISO 11784)
                </label>
                <input
                  type="text"
                  value={microchipId}
                  onChange={(e) => setMicrochipId(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-sm text-teal-700 dark:text-teal-300 font-mono focus:border-teal-500 focus:outline-none font-bold"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Аллергии и особенности (через запятую)
                </label>
                <input
                  type="text"
                  value={allergiesText}
                  onChange={(e) => setAllergiesText(e.target.value)}
                  placeholder="Курица, лактоза..."
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-sm text-slate-900 dark:text-white focus:border-teal-500 focus:outline-none"
                />
              </div>
            </div>

            {/* Submit */}
            <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <span className="text-xs text-teal-700 dark:text-teal-400 font-semibold flex items-center gap-1">
                <ShieldCheck className="w-4 h-4" /> Автосоздание QR с логотипом ZM
              </span>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 text-xs font-bold cursor-pointer hover:bg-slate-200 dark:hover:bg-slate-700 transition"
                >
                  Отмена
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-teal-500 hover:bg-teal-600 text-white font-extrabold text-xs shadow-md transition cursor-pointer"
                >
                  Зарегистрировать и создать QR
                </button>
              </div>
            </div>

          </form>
        )}

        {/* STEP 2: Auto-Created QR Presentation Screen */}
        {step === 'success' && createdPet && (
          <div className="p-6 sm:p-8 space-y-6 text-center animate-in fade-in zoom-in-95 duration-200">
            <div className="p-6 rounded-3xl bg-gradient-to-br from-teal-500/10 via-emerald-500/5 to-cyan-500/10 dark:from-teal-950/60 dark:via-slate-900 dark:to-cyan-950/60 border border-teal-500/30 flex flex-col sm:flex-row items-center justify-between gap-6 text-left">
              
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 text-xs font-extrabold uppercase tracking-wider">
                  <Sparkles className="w-4 h-4" />
                  <span>Умный QR-код готов</span>
                </div>
                <h4 className="text-2xl font-black text-slate-900 dark:text-white">
                  {createdPet.name} под защитой Маяка!
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed max-w-sm">
                  Мы автоматически сгенерировали цифровой ветпаспорт и QR-код с логотипом компании ЗооМаяк в центре.
                </p>
                <div className="pt-2 flex flex-wrap items-center gap-2 text-xs">
                  <span className="font-mono bg-white dark:bg-slate-900 px-2 py-1 rounded-lg border border-teal-500/30 text-teal-600 dark:text-teal-300 font-bold">
                    {createdPet.zmId}
                  </span>
                  <span className="text-slate-500 dark:text-slate-400">
                    Чип: {createdPet.microchipId}
                  </span>
                </div>
              </div>

              {/* Generated QR Badge Card */}
              <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border-2 border-teal-500 shadow-xl flex flex-col items-center shrink-0">
                <div className="p-0 bg-transparent rounded-xl shadow-inner flex items-center justify-center">
                  <ZoomayakQR
                    value={`${window.location.origin}/qr/${encodeURIComponent(createdPet.zmId)}`}
                    size={140}
                    logoSize={38}
                    lightBackground={true}
                  />
                </div>
                <span className="text-[10px] font-mono font-bold text-slate-700 dark:text-slate-300 mt-2">
                  {createdPet.zmId}
                </span>
                <span className="text-[9px] text-teal-600 dark:text-teal-400 font-bold uppercase">
                  Логотип ЗооМаяк в центре
                </span>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <button
                onClick={() => {
                  onClose();
                  onOpenCollarStudio?.();
                }}
                className="w-full py-3.5 rounded-2xl bg-teal-500 hover:bg-teal-600 text-white font-extrabold text-xs shadow-md shadow-teal-500/20 flex items-center justify-center gap-2 transition cursor-pointer"
              >
                <Sparkles className="w-4 h-4" />
                <span>Заказать жетон с гравировкой (Щит, Кость, Сердце, Круг)</span>
              </button>

              <button
                onClick={onClose}
                className="w-full py-3.5 rounded-2xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-extrabold text-xs flex items-center justify-center gap-2 transition cursor-pointer border border-slate-200 dark:border-slate-700"
              >
                <span>Перейти в карточку питомца</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
