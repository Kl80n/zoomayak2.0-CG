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
    <section className="relative pt-6 pb-16 lg:pt-12 lg:pb-24 overflow-hidden">
      
      {/* Background Mesh Gradient Orbs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-10 left-10 w-96 h-96 bg-teal-200/40 rounded-full blur-3xl animate-pulse-glow"></div>
        <div className="absolute top-20 right-10 w-[480px] h-[480px] bg-cyan-200/30 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '-2s' }}></div>
        <div className="absolute -top-10 left-1/3 w-80 h-80 bg-emerald-200/40 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '-4s' }}></div>
        
        {/* Subtle Decorative Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#cbd5e115_1px,transparent_1px),linear-gradient(to_bottom,#cbd5e115_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          
          {/* Left Column: Hero Typography & CTAs */}
          <div className="lg:col-span-7 flex flex-col items-start text-left z-10">
            
            {/* Tagline Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-bold uppercase tracking-wider mb-6 shadow-xs">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-600"></span>
              </span>
              <span>ЗООМАЯК · ЦИФРОВОЙ ПРОФИЛЬ ПИТОМЦА</span>
              <span className="bg-teal-200/70 text-teal-900 px-1.5 py-0.2 rounded text-[10px] font-extrabold">2.0</span>
            </div>

            {/* Grand Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 leading-[1.08] tracking-tight mb-6">
              Вся жизнь{' '}
              <span className="bg-gradient-to-r from-teal-600 via-emerald-600 to-cyan-600 bg-clip-text text-transparent drop-shadow-xs">
                питомца — в одном месте.
              </span>
            </h1>

            {/* Subheading */}
            <p className="text-lg sm:text-xl text-slate-600 max-w-2xl leading-relaxed mb-8 font-medium">
              Здоровье, документы, забота, безопасность, услуги и всё необходимое для вашего любимца — в одном умном сервисе с персональным QR-маяком.
            </p>

            {/* Primary Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 w-full sm:w-auto mb-8">
              <button
                id="hero-open-main-btn"
                onClick={onOpenPassport}
                className="w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-teal-600 via-teal-700 to-emerald-600 hover:from-teal-500 hover:to-emerald-500 text-white font-extrabold text-base shadow-xl shadow-teal-600/25 hover:shadow-teal-600/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 cursor-pointer"
              >
                <span>Открыть ЗооМаяк</span>
                <ArrowRight className="w-5 h-5" />
              </button>

              <button
                id="hero-collar-tag-btn"
                onClick={onOpenCollarStudio}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-white hover:bg-slate-50 text-teal-700 hover:text-teal-900 font-bold text-base border border-teal-200 hover:border-teal-400 shadow-md hover:scale-[1.02] transition-all duration-300 cursor-pointer"
              >
                <Tag className="w-4 h-4 text-teal-600" />
                <span>Создать QR-адресник</span>
              </button>
            </div>

            {/* Trust Points Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-4 border-t border-slate-200/90 w-full">
              <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-700 font-bold">
                <div className="w-5 h-5 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center shrink-0 border border-teal-200">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <span>Один профиль для всего</span>
              </div>
              <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-700 font-bold">
                <div className="w-5 h-5 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center shrink-0 border border-teal-200">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <span>Постоянный ZM-ID</span>
              </div>
              <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-700 font-bold">
                <div className="w-5 h-5 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center shrink-0 border border-teal-200">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <span>QR-код питомца</span>
              </div>
            </div>

          </div>

          {/* Right Column: Interactive Pet Card + Lighthouse Scene */}
          <div className="lg:col-span-5 relative flex flex-col items-center">
            
            {/* Ambient Back Glow for Hero Visuals */}
            <div className="absolute inset-0 bg-gradient-to-tr from-teal-200/50 via-cyan-200/40 to-emerald-200/40 rounded-3xl blur-2xl -z-10 transform rotate-1 scale-105"></div>

            {/* Interactive Pet Showcase Container */}
            <div className="w-full relative">
              
              {/* Pet Switcher mini-chips above the card */}
              <div className="flex items-center justify-between gap-2 mb-3 px-1">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Быстрый просмотр:
                </span>
                <div className="flex items-center gap-1.5">
                  {allPets.map((p) => (
                    <button
                      key={p.id}
                      onClick={() => onSelectPet(p)}
                      className={`text-xs px-2.5 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                        p.id === selectedPet.id
                          ? 'bg-teal-600 text-white shadow-xs font-black'
                          : 'bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-200'
                      }`}
                    >
                      {p.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Main Interactive Floating Pet Profile Card */}
              <div className="relative rounded-3xl bg-white border border-slate-200/90 p-6 shadow-xl backdrop-blur-2xl transition-all duration-300 hover:border-teal-400 hover:shadow-2xl group">
                
                {/* Floating Top Header: ZM-ID Pill & QR icon */}
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded-xl bg-gradient-to-r from-teal-600 to-emerald-600 text-white font-mono font-bold text-xs shadow-xs">
                      ZM-ID
                    </span>
                    <span className="font-mono text-xs font-bold text-slate-800 tracking-wider">
                      {selectedPet.zmId}
                    </span>
                  </div>

                  <button
                    onClick={onOpenPassport}
                    className="p-1.5 rounded-lg bg-teal-50 text-teal-700 hover:bg-teal-600 hover:text-white transition-colors cursor-pointer border border-teal-200"
                    title="Открыть QR-код"
                  >
                    <QrCode className="w-4 h-4" />
                  </button>
                </div>

                {/* Pet Photo, Name and Bio */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="relative">
                    {/* Ring animation */}
                    <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-teal-400 to-cyan-400 opacity-60 group-hover:opacity-100 blur-xs transition-opacity"></div>
                    <img
                      src={selectedPet.photoUrl}
                      alt={selectedPet.name}
                      className="relative w-20 h-20 sm:w-22 sm:h-22 rounded-full object-cover ring-2 ring-teal-500 shadow-md"
                    />
                    <span className="absolute bottom-0 right-0 w-6 h-6 bg-teal-600 rounded-full ring-2 ring-white flex items-center justify-center text-white text-xs font-black shadow">
                      ✓
                    </span>
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="text-2xl font-black text-slate-900 font-display">
                        {selectedPet.name}
                      </h3>
                      <span className="text-teal-600 font-bold" title="Верифицирован">✓</span>
                    </div>
                    <p className="text-sm font-bold text-slate-700 mt-0.5">
                      {selectedPet.breed}
                    </p>
                    <p className="text-xs text-slate-500 font-medium mt-0.5">
                      {selectedPet.ageText} • {selectedPet.gender === 'male' ? '♂ Самец' : '♀ Самка'}
                    </p>
                  </div>
                </div>

                {/* Two Status Boxes: Health & Documents */}
                <div className="grid grid-cols-2 gap-3 mb-5">
                  <div className="p-3 rounded-2xl bg-emerald-50/70 border border-emerald-200 hover:border-emerald-400 transition-colors">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-800 mb-1">
                      <Heart className="w-3.5 h-3.5 fill-emerald-600 text-emerald-600" />
                      <span>Здоровье</span>
                    </div>
                    <div className="text-[11px] font-semibold text-slate-700">
                      Все прививки актуальны
                    </div>
                    <div className="mt-1 text-[10px] text-emerald-700 font-mono font-bold">
                      Индекс: {selectedPet.healthScore}%
                    </div>
                  </div>

                  <div className="p-3 rounded-2xl bg-cyan-50/70 border border-cyan-200 hover:border-cyan-400 transition-colors">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-cyan-800 mb-1">
                      <FileText className="w-3.5 h-3.5 text-cyan-700" />
                      <span>Документы</span>
                    </div>
                    <div className="text-[11px] font-semibold text-slate-700">
                      Всегда под рукой
                    </div>
                    <div className="mt-1 text-[10px] text-cyan-700 font-mono font-bold">
                      Чип & Ветпаспорт
                    </div>
                  </div>
                </div>

                {/* Action Link Button */}
                <button
                  id="hero-pet-card-view-profile"
                  onClick={onOpenPassport}
                  className="w-full py-3 px-4 rounded-xl bg-teal-50 hover:bg-teal-100 border border-teal-200 hover:border-teal-300 text-teal-800 font-extrabold text-sm flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer"
                >
                  <span>Перейти в профиль</span>
                  <ArrowRight className="w-4 h-4 text-teal-700" />
                </button>

              </div>

              {/* Decorative Floating Badges */}
              <div className="absolute -bottom-6 -left-4 sm:-left-6 bg-white border border-slate-200 p-2.5 rounded-2xl shadow-xl flex items-center gap-2.5 animate-float">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-teal-500 to-emerald-600 flex items-center justify-center text-white shadow-xs">
                  <Radio className="w-4 h-4 animate-pulse" />
                </div>
                <div className="text-left">
                  <div className="text-[10px] font-bold uppercase text-slate-400">SOS-Маяк активен</div>
                  <div className="text-xs font-black text-slate-900">QR адресник включен</div>
                </div>
              </div>

              <div className="absolute -top-4 -right-2 sm:-right-4 bg-white border border-slate-200 p-2.5 rounded-2xl shadow-xl flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-cyan-500 to-teal-600 flex items-center justify-center text-white font-black text-xs shadow-xs">
                  98%
                </div>
                <div className="text-left">
                  <div className="text-[10px] font-bold uppercase text-slate-400">Статус заботы</div>
                  <div className="text-xs font-black text-teal-700">Идеальное состояние</div>
                </div>
              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
