import React from 'react';
import { 
  ArrowRight, 
  Check, 
  QrCode, 
  ShieldCheck, 
  Heart, 
  FileText, 
  Sparkles, 
  Compass, 
  Radio, 
  Tag,
  Activity,
  Layers
} from 'lucide-react';
import { Pet } from '../types';

interface HeroSectionProps {
  selectedPet: Pet;
  onOpenPassport: () => void;
  onOpenCollarStudio: () => void;
  onOpenAddPet: () => void;
  onSelectPet: (pet: Pet) => void;
  allPets: Pet[];
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  selectedPet,
  onOpenPassport,
  onOpenCollarStudio,
  onOpenAddPet,
  onSelectPet,
  allPets,
}) => {
  return (
    <section className="relative pt-4 pb-8 lg:pt-8 lg:pb-12 overflow-hidden">
      
      {/* Background Mesh Gradient Orbs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[550px] pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-6 left-12 w-80 h-80 bg-teal-200/35 rounded-full blur-3xl"></div>
        <div className="absolute top-12 right-12 w-96 h-96 bg-cyan-200/30 rounded-full blur-3xl"></div>
        <div className="absolute top-0 left-1/3 w-72 h-72 bg-emerald-200/30 rounded-full blur-3xl"></div>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#cbd5e115_1px,transparent_1px),linear-gradient(to_bottom,#cbd5e115_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
          
          {/* Left Column: Hero Typography & CTAs */}
          <div className="lg:col-span-7 flex flex-col justify-between text-left">
            
            <div>
              {/* Tagline Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-bold uppercase tracking-wider mb-5 shadow-xs">
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-500 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-600"></span>
                </span>
                <span>ЗООМАЯК · ЦИФРОВОЙ ПРОФИЛЬ ПИТОМЦА</span>
                <span className="bg-teal-200/80 text-teal-950 px-1.5 py-0.2 rounded text-[10px] font-black">2.0</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 leading-[1.12] tracking-tight mb-4">
                Вся жизнь{' '}
                <span className="bg-gradient-to-r from-teal-600 via-emerald-600 to-cyan-600 bg-clip-text text-transparent">
                  питомца — в одном месте
                </span>
              </h1>

              {/* Subheading */}
              <p className="text-base sm:text-lg text-slate-600 max-w-2xl leading-relaxed mb-6 font-medium">
                Здоровье, документы, забота, безопасность, услуги и всё необходимое для вашего любимца — в одном умном сервисе с персональным QR-маяком.
              </p>

              {/* Primary Action Buttons */}
              <div className="flex flex-wrap items-center gap-3.5 mb-6">
                <button
                  id="hero-open-main-btn"
                  onClick={onOpenPassport}
                  className="w-full sm:w-auto h-13 px-7 rounded-2xl bg-gradient-to-r from-teal-600 via-teal-700 to-emerald-600 hover:from-teal-500 hover:to-emerald-500 text-white font-extrabold text-sm sm:text-base shadow-lg shadow-teal-600/25 hover:shadow-teal-600/35 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 flex items-center justify-center gap-2.5 cursor-pointer"
                >
                  <span>Открыть ЗооМаяк</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  id="hero-collar-tag-btn"
                  onClick={onOpenCollarStudio}
                  className="w-full sm:w-auto h-13 px-6 rounded-2xl bg-white hover:bg-slate-50 text-teal-700 hover:text-teal-900 font-bold text-sm sm:text-base border border-teal-200 hover:border-teal-400 shadow-sm hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Tag className="w-4 h-4 text-teal-600" />
                  <span>Создать QR-адресник</span>
                </button>
              </div>
            </div>

            {/* Trust Points Row */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-5 border-t border-slate-200">
              <div className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-700 font-bold bg-white/60 sm:bg-transparent p-2.5 sm:p-0 rounded-xl border border-slate-100 sm:border-0">
                <div className="w-5 h-5 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center shrink-0 border border-teal-200">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <span>Один профиль</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-700 font-bold bg-white/60 sm:bg-transparent p-2.5 sm:p-0 rounded-xl border border-slate-100 sm:border-0">
                <div className="w-5 h-5 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center shrink-0 border border-teal-200">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <span>Постоянный ZM-ID</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-700 font-bold bg-white/60 sm:bg-transparent p-2.5 sm:p-0 rounded-xl border border-slate-100 sm:border-0">
                <div className="w-5 h-5 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center shrink-0 border border-teal-200">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <span>QR-код питомца</span>
              </div>
            </div>

          </div>

          {/* Right Column: Balanced Pet Card */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            
            {/* Pet Switcher Header Bar */}
            <div className="flex items-center justify-between gap-2 mb-3 bg-white/80 p-1.5 rounded-2xl border border-slate-200 shadow-xs">
              <span className="text-[11px] font-black text-slate-600 uppercase tracking-wider pl-2">
                Питомец:
              </span>
              <div className="flex items-center gap-1">
                {allPets.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => onSelectPet(p)}
                    className={`text-xs px-3 py-1 rounded-xl font-bold transition-all cursor-pointer ${
                      p.id === selectedPet.id
                        ? 'bg-teal-600 text-white shadow-xs font-black'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                    }`}
                  >
                    {p.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Main Pet Profile Card */}
            <div className="relative flex-1 rounded-3xl bg-white border border-slate-200 p-6 sm:p-7 shadow-lg hover:shadow-xl hover:border-teal-400 transition-all duration-300 flex flex-col justify-between">
              
              {/* Card Top: ZM-ID & QR Quick Scan */}
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded-xl bg-gradient-to-r from-teal-600 to-emerald-600 text-white font-mono font-extrabold text-xs shadow-xs">
                      ZM-ID
                    </span>
                    <span className="font-mono text-xs font-black text-slate-800 tracking-wider">
                      {selectedPet.zmId}
                    </span>
                  </div>

                  <button
                    onClick={onOpenPassport}
                    className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-teal-50 text-teal-800 hover:bg-teal-600 hover:text-white transition-colors cursor-pointer border border-teal-200 text-xs font-bold"
                    title="Открыть QR-код"
                  >
                    <QrCode className="w-3.5 h-3.5" />
                    <span>QR-код</span>
                  </button>
                </div>

                {/* Pet Photo and Details */}
                <div className="flex items-center gap-4 mb-5">
                  <div className="relative shrink-0">
                    <img
                      src={selectedPet.photoUrl}
                      alt={selectedPet.name}
                      className="w-18 h-18 sm:w-20 sm:h-20 rounded-2xl object-cover ring-2 ring-teal-500 shadow-md"
                    />
                    <span className="absolute -bottom-1 -right-1 w-5 h-5 bg-teal-600 rounded-full ring-2 ring-white flex items-center justify-center text-white text-[10px] font-black shadow">
                      ✓
                    </span>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5">
                      <h3 className="text-xl sm:text-2xl font-black text-slate-900 truncate">
                        {selectedPet.name}
                      </h3>
                      <span className="text-teal-600 font-black" title="Верифицирован">✓</span>
                    </div>
                    <p className="text-xs sm:text-sm font-bold text-slate-700 mt-0.5 truncate">
                      {selectedPet.breed}
                    </p>
                    <p className="text-xs text-slate-500 font-medium mt-0.5">
                      {selectedPet.ageText} • {selectedPet.gender === 'male' ? '♂ Самец' : '♀ Самка'}
                    </p>
                  </div>
                </div>

                {/* Two Status Metrics */}
                <div className="grid grid-cols-2 gap-3 mb-5">
                  <div className="p-3 rounded-2xl bg-emerald-50/80 border border-emerald-200">
                    <div className="flex items-center gap-1.5 text-xs font-extrabold text-emerald-800 mb-1">
                      <Heart className="w-3.5 h-3.5 fill-emerald-600 text-emerald-600" />
                      <span>Здоровье</span>
                    </div>
                    <div className="text-[11px] font-bold text-slate-800">
                      Индекс: {selectedPet.healthScore}%
                    </div>
                    <div className="text-[10px] text-emerald-700 font-medium">
                      Прививки в норме
                    </div>
                  </div>

                  <div className="p-3 rounded-2xl bg-cyan-50/80 border border-cyan-200">
                    <div className="flex items-center gap-1.5 text-xs font-extrabold text-cyan-800 mb-1">
                      <FileText className="w-3.5 h-3.5 text-cyan-700" />
                      <span>Документы</span>
                    </div>
                    <div className="text-[11px] font-bold text-slate-800">
                      Чип & Ветпаспорт
                    </div>
                    <div className="text-[10px] text-cyan-700 font-medium">
                      Синхронизировано
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <button
                id="hero-pet-card-view-profile"
                onClick={onOpenPassport}
                className="w-full py-3 px-4 rounded-xl bg-slate-900 hover:bg-teal-700 text-white font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer shadow-sm"
              >
                <span>Перейти в цифровой паспорт</span>
                <ArrowRight className="w-4 h-4" />
              </button>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
