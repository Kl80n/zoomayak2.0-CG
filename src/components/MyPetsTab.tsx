import React, { useState } from 'react';
import { 
  Users, 
  Plus, 
  Heart, 
  Calendar, 
  Weight, 
  FileText, 
  QrCode, 
  ShieldCheck, 
  Edit3, 
  Sparkles,
  Award,
  ChevronRight,
  AlertCircle
} from 'lucide-react';
import { Pet, SPECIES_EMOJI, SPECIES_LABELS } from '../types';

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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gradient-to-r from-teal-950/60 via-slate-900 to-cyan-950/60 p-6 rounded-3xl border border-teal-500/30">
        <div>
          <div className="flex items-center gap-2 text-teal-400 text-xs font-bold uppercase tracking-wider mb-1">
            <Users className="w-4 h-4" />
            <span>Цифровая картотека питомцев</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            Мои питомцы под защитой Маяка
          </h2>
          <p className="text-sm text-slate-300 mt-1">
            Управляйте паспортами, отслеживайте здоровье и обновляйте данные о микрочипах.
          </p>
        </div>

        <button
          onClick={onOpenAddPet}
          className="flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-400 hover:to-emerald-400 text-slate-950 font-extrabold text-sm shadow-lg shadow-teal-500/25 transition cursor-pointer"
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
              className={`p-5 rounded-3xl border transition-all duration-300 cursor-pointer relative overflow-hidden ${
                isSelected
                  ? 'bg-gradient-to-b from-slate-900 via-slate-900 to-teal-950/60 border-2 border-teal-400 shadow-xl shadow-teal-950/50 scale-[1.02]'
                  : 'bg-slate-900/70 border-slate-800 hover:border-teal-500/40 hover:bg-slate-850'
              }`}
            >
              {isSelected && (
                <div className="absolute top-0 right-0 w-32 h-32 bg-teal-500/10 rounded-full blur-xl pointer-events-none"></div>
              )}

              <div className="flex items-start justify-between mb-4">
                <div className="relative">
                  <img
                    src={pet.photoUrl}
                    alt={pet.name}
                    className="w-16 h-16 rounded-2xl object-cover ring-2 ring-teal-400/80 shadow-md"
                  />
                  <span className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-500 rounded-full ring-2 ring-slate-900 flex items-center justify-center text-[9px] font-black text-slate-950">
                    ✓
                  </span>
                </div>

                <div className="text-right">
                  <span className="font-mono text-xs font-bold text-teal-400 bg-slate-800/90 px-2 py-1 rounded-lg border border-slate-700">
                    {pet.zmId}
                  </span>
                  <div className="text-[10px] text-slate-400 mt-1">
                    {SPECIES_EMOJI[pet.species]} {SPECIES_LABELS[pet.species]}
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-extrabold text-white flex items-center gap-1.5">
                  {pet.name}
                </h3>
                <p className="text-xs font-semibold text-slate-300">{pet.breed}</p>
                <p className="text-xs text-slate-400 mt-0.5">{pet.ageText}</p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
                <span className="text-emerald-400 font-bold flex items-center gap-1">
                  <Heart className="w-3 h-3 fill-emerald-400" />
                  Индекс: {pet.healthScore}%
                </span>
                <span className="text-teal-300 font-semibold group-hover:translate-x-0.5 transition flex items-center gap-0.5">
                  Выбрать <ChevronRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Deep Detail Card for Selected Pet */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl space-y-8">
        
        {/* Top bar of selected pet details */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-slate-800">
          <div className="flex items-center gap-5">
            <img
              src={selectedPet.photoUrl}
              alt={selectedPet.name}
              className="w-24 h-24 rounded-3xl object-cover ring-4 ring-teal-500/40 shadow-xl"
            />
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-3xl font-black text-white font-display">
                  {selectedPet.name}
                </h3>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-teal-500/20 text-teal-300 border border-teal-500/30">
                  {SPECIES_LABELS[selectedPet.species]}
                </span>
              </div>
              <p className="text-sm font-semibold text-slate-300 mt-1">
                {selectedPet.breed} • Родился {selectedPet.birthDate} ({selectedPet.ageText})
              </p>
              <div className="flex items-center gap-3 mt-2 text-xs">
                <span className="font-mono text-cyan-300 bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
                  Чип: {selectedPet.microchipId}
                </span>
                <span className="font-mono text-teal-300 bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
                  Паспорт: {selectedPet.passportNumber}
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={onOpenPassport}
              className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-400 hover:to-cyan-400 text-slate-950 font-extrabold text-xs shadow-lg shadow-teal-500/25 transition cursor-pointer flex items-center gap-1.5"
            >
              <FileText className="w-4 h-4" />
              <span>Открыть ВетПаспорт</span>
            </button>

            <button
              onClick={onOpenCollarStudio}
              className="px-4 py-2.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-teal-300 text-xs font-bold border border-teal-500/30 transition cursor-pointer flex items-center gap-1.5"
            >
              <QrCode className="w-4 h-4" />
              <span>Создать жетон с QR</span>
            </button>
          </div>
        </div>

        {/* 3-Column Info Matrix: Weight Dynamics, Diet & Medical */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Weight Dynamics & Chart */}
          <div className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800/90 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                  <Weight className="w-4 h-4 text-teal-400" />
                  Динамика веса
                </span>
                <span className="text-base font-extrabold text-white">
                  {selectedPet.weight} {selectedPet.weightUnit}
                </span>
              </div>
              <p className="text-xs text-slate-400 mb-4">
                Стабильный вес в пределах нормы породы.
              </p>
            </div>

            {/* Simulated mini weight chart */}
            <div className="h-28 flex items-end justify-between gap-2 pt-4 px-2 border-b border-slate-800">
              {selectedPet.weightHistory.map((item, idx) => (
                <div key={idx} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end">
                  <div
                    className="w-full max-w-[28px] rounded-t-lg bg-gradient-to-t from-teal-600 to-cyan-400 hover:from-teal-400 hover:to-cyan-300 transition-all cursor-pointer relative group"
                    style={{ height: `${(item.weightKg / 35) * 80 + 15}%` }}
                  >
                    <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-slate-900 text-teal-300 text-[9px] font-mono px-1.5 py-0.5 rounded border border-slate-700 opacity-0 group-hover:opacity-100 transition shadow whitespace-nowrap">
                      {item.weightKg} кг
                    </div>
                  </div>
                  <span className="text-[10px] text-slate-500 font-mono">{item.date.slice(5)}</span>
                </div>
              ))}
            </div>
            <div className="flex justify-between text-[10px] text-slate-400 mt-2">
              <span>Предыдущий замер: {selectedPet.weightHistory[selectedPet.weightHistory.length - 2]?.weightKg || 30.5} кг</span>
              <span className="text-emerald-400 font-bold">+0.2 кг (норма)</span>
            </div>
          </div>

          {/* Nutrition & Diet */}
          <div className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800/90 flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5 mb-3">
                <Sparkles className="w-4 h-4 text-cyan-400" />
                Рацион и питание
              </span>
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 mb-3">
                <div className="text-xs text-slate-400 mb-1">Основной корм:</div>
                <div className="text-sm font-bold text-slate-100">{selectedPet.diet}</div>
              </div>
            </div>

            <div>
              <div className="text-xs font-bold text-amber-400 flex items-center gap-1 mb-2">
                <AlertCircle className="w-3.5 h-3.5" /> Аллергии и непереносимость
              </div>
              <div className="flex flex-wrap gap-1.5">
                {selectedPet.allergies.map((allergy, i) => (
                  <span key={i} className="text-xs px-2.5 py-1 rounded-lg bg-amber-950/40 text-amber-200 border border-amber-500/30">
                    {allergy}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Features & Vet Notes */}
          <div className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800/90 flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5 mb-3">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                Особые приметы & Ветклиника
              </span>
              <div className="space-y-2 text-xs">
                <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                  <span className="text-slate-500 block text-[10px] uppercase font-bold">Прикрепленная клиника</span>
                  <span className="text-white font-bold">{selectedPet.vetClinic}</span>
                  <div className="text-slate-400 text-[11px] mt-0.5">{selectedPet.primaryVet}</div>
                </div>

                <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                  <span className="text-slate-500 block text-[10px] uppercase font-bold">Заметки о поведении</span>
                  <span className="text-slate-300">{selectedPet.specialNotes}</span>
                </div>
              </div>
            </div>

            <div className="mt-3">
              <div className="text-[10px] uppercase font-bold text-slate-500 mb-1">Приметы для поиска:</div>
              <div className="flex flex-wrap gap-1">
                {selectedPet.features.map((feat, i) => (
                  <span key={i} className="text-[11px] px-2 py-0.5 rounded bg-slate-900 text-teal-300 border border-slate-800">
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
