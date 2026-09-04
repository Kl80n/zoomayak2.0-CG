import React from 'react';
import { 
  Users, 
  Plus, 
  Heart, 
  Weight, 
  FileText, 
  QrCode, 
  ShieldCheck, 
  Sparkles,
  ChevronRight,
  AlertCircle
} from 'lucide-react';
import { Pet } from '../types';

interface MyPetsTabProps {
  pets: Pet[];
  selectedPet: Pet;
  onSelectPet: (pet: Pet) => void;
  onOpenAddPet: () => void;
  onOpenPassport: () => void;
  onOpenCollarStudio: () => void;
}

export const MyPetsTab: React.FC<MyPetsTabProps> = ({
  pets,
  selectedPet,
  onSelectPet,
  onOpenAddPet,
  onOpenPassport,
  onOpenCollarStudio,
}) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-in fade-in duration-300">
      
      {/* Top Banner Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gradient-to-r from-teal-500/10 via-emerald-500/5 to-cyan-500/10 dark:from-teal-950/60 dark:via-slate-900 dark:to-cyan-950/60 p-6 sm:p-7 rounded-3xl border border-teal-500/30 shadow-sm">
        <div>
          <div className="flex items-center gap-2 text-teal-600 dark:text-teal-400 text-xs font-bold uppercase tracking-wider mb-1">
            <Users className="w-4 h-4" />
            <span>Цифровая картотека питомцев</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            Мои питомцы под защитой Маяка
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">
            Управляйте паспортами, отслеживайте здоровье и обновляйте данные о микрочипах.
          </p>
        </div>

        <button
          onClick={onOpenAddPet}
          className="flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-teal-500 hover:bg-teal-600 text-white font-extrabold text-sm shadow-md shadow-teal-500/20 transition cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Добавить питомца</span>
        </button>
      </div>

      {/* Pet Selection Carousel / Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {pets.map((pet) => {
          const isSelected = pet.id === selectedPet.id;
          return (
            <div
              key={pet.id}
              onClick={() => onSelectPet(pet)}
              className={`p-5 rounded-3xl border transition-colors duration-200 cursor-pointer relative overflow-hidden ${
                isSelected
                  ? 'bg-white dark:bg-slate-900 border-2 border-teal-500 shadow-sm'
                  : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 shadow-sm'
              }`}
            >

              <div className="flex items-start justify-between mb-4">
                <div className="relative">
                  <img
                    src={pet.photoUrl}
                    alt={pet.name}
                    className="w-16 h-16 rounded-2xl object-cover ring-2 ring-teal-500/80 shadow-md"
                  />
                  <span className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-500 rounded-full ring-2 ring-white dark:ring-slate-900 flex items-center justify-center text-[9px] font-black text-white">
                    ✓
                  </span>
                </div>

                <div className="text-right">
                  <span className="font-mono text-xs font-bold text-teal-600 dark:text-teal-400 bg-teal-50 dark:bg-slate-800/90 px-2 py-1 rounded-lg border border-teal-200/50 dark:border-slate-700">
                    {pet.zmId}
                  </span>
                  <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-1">
                    {pet.species === 'dog' ? '🐶 Собака' : '🐱 Кошка'}
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-extrabold text-slate-900 dark:text-white flex items-center gap-1.5">
                  {pet.name}
                </h3>
                <p className="text-xs font-semibold text-slate-600 dark:text-slate-300">{pet.breed}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{pet.ageText}</p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs">
                <span className="text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1">
                  <Heart className="w-3 h-3 fill-emerald-500/20 text-emerald-500" />
                  Индекс: {pet.healthScore}%
                </span>
                <span className="text-teal-600 dark:text-teal-300 font-semibold group-hover:translate-x-0.5 transition flex items-center gap-0.5">
                  Выбрать <ChevronRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Deep Detail Card for Selected Pet */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md space-y-8">
        
        {/* Top bar of selected pet details */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-5">
            <img
              src={selectedPet.photoUrl}
              alt={selectedPet.name}
              className="w-24 h-24 rounded-3xl object-cover ring-4 ring-teal-500/30 shadow-xl"
            />
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-3xl font-black text-slate-900 dark:text-white font-display">
                  {selectedPet.name}
                </h3>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-teal-500/10 dark:bg-teal-500/20 text-teal-700 dark:text-teal-300 border border-teal-500/20 dark:border-teal-500/30">
                  {selectedPet.species === 'dog' ? 'Собака' : 'Кошка'}
                </span>
              </div>
              <p className="text-sm font-semibold text-slate-600 dark:text-slate-300 mt-1">
                {selectedPet.breed} • Родился {selectedPet.birthDate} ({selectedPet.ageText})
              </p>
              <div className="flex flex-wrap items-center gap-3 mt-2 text-xs">
                <span className="font-mono text-teal-700 dark:text-cyan-300 bg-slate-100 dark:bg-slate-950 px-2 py-0.5 rounded border border-slate-200 dark:border-slate-800">
                  Чип: {selectedPet.microchipId}
                </span>
                <span className="font-mono text-emerald-700 dark:text-teal-300 bg-slate-100 dark:bg-slate-950 px-2 py-0.5 rounded border border-slate-200 dark:border-slate-800">
                  Паспорт: {selectedPet.passportNumber}
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={onOpenPassport}
              className="px-5 py-2.5 rounded-2xl bg-teal-500 hover:bg-teal-600 text-white font-extrabold text-xs shadow-md shadow-teal-500/20 transition cursor-pointer flex items-center gap-1.5"
            >
              <FileText className="w-4 h-4" />
              <span>Открыть ВетПаспорт</span>
            </button>

            <button
              onClick={onOpenCollarStudio}
              className="px-4 py-2.5 rounded-2xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-teal-700 dark:text-teal-300 text-xs font-bold border border-slate-200 dark:border-teal-500/30 transition cursor-pointer flex items-center gap-1.5"
            >
              <QrCode className="w-4 h-4" />
              <span>Создать жетон с QR</span>
            </button>
          </div>
        </div>

        {/* 3-Column Info Matrix: Weight Dynamics, Diet & Medical */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Weight Dynamics & Chart */}
          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950/70 border border-slate-200/80 dark:border-slate-800/90 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                  <Weight className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                  Динамика веса
                </span>
                <span className="text-base font-extrabold text-slate-900 dark:text-white">
                  {selectedPet.weight} {selectedPet.weightUnit}
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
                Стабильный вес в пределах нормы породы.
              </p>
            </div>

            {/* Simulated mini weight chart */}
            <div className="h-28 flex items-end justify-between gap-2 pt-4 px-2 border-b border-slate-200 dark:border-slate-800">
              {selectedPet.weightHistory.map((item, idx) => (
                <div key={idx} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end">
                  <div
                    className="w-full max-w-[28px] rounded-t-lg bg-teal-500 dark:bg-gradient-to-t dark:from-teal-600 dark:to-cyan-400 hover:opacity-90 transition-all cursor-pointer relative group"
                    style={{ height: `${(item.weightKg / 35) * 80 + 15}%` }}
                  >
                    <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-slate-900 text-teal-300 text-[9px] font-mono px-1.5 py-0.5 rounded border border-slate-700 opacity-0 group-hover:opacity-100 transition shadow whitespace-nowrap z-10">
                      {item.weightKg} кг
                    </div>
                  </div>
                  <span className="text-[10px] text-slate-500 font-mono">{item.date.slice(5)}</span>
                </div>
              ))}
            </div>
            <div className="flex justify-between text-[10px] text-slate-500 dark:text-slate-400 mt-2">
              <span>Предыдущий замер: {selectedPet.weightHistory[selectedPet.weightHistory.length - 2]?.weightKg || 30.5} кг</span>
              <span className="text-emerald-600 dark:text-emerald-400 font-bold">+0.2 кг (норма)</span>
            </div>
          </div>

          {/* Nutrition & Diet */}
          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950/70 border border-slate-200/80 dark:border-slate-800/90 flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5 mb-3">
                <Sparkles className="w-4 h-4 text-teal-600 dark:text-cyan-400" />
                Рацион и питание
              </span>
              <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 mb-3 shadow-xs">
                <div className="text-xs text-slate-500 dark:text-slate-400 mb-1">Основной корм:</div>
                <div className="text-sm font-bold text-slate-900 dark:text-slate-100">{selectedPet.diet}</div>
              </div>
            </div>

            <div>
              <div className="text-xs font-bold text-amber-700 dark:text-amber-400 flex items-center gap-1 mb-2">
                <AlertCircle className="w-3.5 h-3.5" /> Аллергии и непереносимость
              </div>
              <div className="flex flex-wrap gap-1.5">
                {selectedPet.allergies.map((allergy, i) => (
                  <span key={i} className="text-xs px-2.5 py-1 rounded-lg bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-200 border border-amber-200 dark:border-amber-500/30">
                    {allergy}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Features & Vet Notes */}
          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950/70 border border-slate-200/80 dark:border-slate-800/90 flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5 mb-3">
                <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                Особые приметы & Ветклиника
              </span>
              <div className="space-y-2 text-xs">
                <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
                  <span className="text-slate-500 block text-[10px] uppercase font-bold">Прикрепленная клиника</span>
                  <span className="text-slate-900 dark:text-white font-bold">{selectedPet.vetClinic}</span>
                  <div className="text-slate-500 dark:text-slate-400 text-[11px] mt-0.5">{selectedPet.primaryVet}</div>
                </div>

                <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
                  <span className="text-slate-500 block text-[10px] uppercase font-bold">Заметки о поведении</span>
                  <span className="text-slate-700 dark:text-slate-300">{selectedPet.specialNotes}</span>
                </div>
              </div>
            </div>

            <div className="mt-3">
              <div className="text-[10px] uppercase font-bold text-slate-500 mb-1">Приметы для поиска:</div>
              <div className="flex flex-wrap gap-1">
                {selectedPet.features.map((feat, i) => (
                  <span key={i} className="text-[11px] px-2 py-0.5 rounded bg-white dark:bg-slate-900 text-teal-700 dark:text-teal-300 border border-slate-200 dark:border-slate-800">
                    • {feat}
                  </span>
                ))}
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
