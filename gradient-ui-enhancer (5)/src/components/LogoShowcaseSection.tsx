import React, { useState } from 'react';
import { 
  Sparkles, 
  Download, 
  Copy, 
  Check, 
  Palette, 
  Layers, 
  Eye, 
  Shield, 
  Smartphone, 
  Tag, 
  BookOpen, 
  CheckCircle2, 
  Sliders,
  Maximize2
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { LOGO_CONCEPTS, LogoConcept } from './LogoShowcaseModal';

interface LogoShowcaseSectionProps {
  onOpenModal?: () => void;
}

export const LogoShowcaseSection: React.FC<LogoShowcaseSectionProps> = ({ onOpenModal }) => {
  const [selectedConcept, setSelectedConcept] = useState<LogoConcept>(LOGO_CONCEPTS[0]);
  const [previewMode, setPreviewMode] = useState<'light' | 'dark' | 'collar' | 'phone'>('light');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopySvg = (concept: LogoConcept) => {
    navigator.clipboard.writeText(concept.svgCode);
    setCopiedId(concept.id);
    confetti({ particleCount: 35, spread: 60 });
    setTimeout(() => setCopiedId(null), 2200);
  };

  const handleDownloadSvg = (concept: LogoConcept) => {
    const blob = new Blob([concept.svgCode], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `zoomayak-${concept.id}.svg`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    confetti({ particleCount: 45, spread: 70 });
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" id="brand-logo-showcase-section">
      
      {/* Section Header Banner */}
      <div className="relative rounded-3xl bg-gradient-to-r from-slate-900 via-teal-950 to-slate-900 border border-teal-800/40 p-6 sm:p-8 text-white overflow-hidden shadow-xl mb-8">
        <div className="absolute top-0 right-0 -mt-8 -mr-8 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/20 border border-teal-400/30 text-teal-300 text-xs font-black uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Официальная бренд-коллекция</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white font-display">
              5 авторских концепций логотипа <span className="text-teal-300">«ЗооМаяк»</span>
            </h2>
            <p className="text-sm text-slate-300 font-medium leading-relaxed">
              Векторные логотипы, объединяющие символы надежного маяка, силуэты питомцев и высокие технологии (микрочипы, GPS и QR-адресники). Выберите понравившийся концепт, протестируйте на разных фонах и скачайте исходный SVG.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => handleDownloadSvg(selectedConcept)}
              className="px-5 py-3 rounded-2xl bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-400 hover:to-emerald-400 text-white font-extrabold text-sm shadow-lg shadow-teal-500/25 flex items-center gap-2 transition cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Скачать выбранный SVG</span>
            </button>
          </div>
        </div>
      </div>

      {/* Grid of 5 Logo Concepts */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
        {LOGO_CONCEPTS.map((concept, idx) => {
          const isSelected = selectedConcept.id === concept.id;
          return (
            <div
              key={concept.id}
              onClick={() => setSelectedConcept(concept)}
              className={`rounded-3xl p-5 border transition-all duration-300 cursor-pointer flex flex-col justify-between ${
                isSelected
                  ? 'bg-white border-teal-500 shadow-xl ring-4 ring-teal-500/15 -translate-y-1'
                  : 'bg-white/80 hover:bg-white border-slate-200 hover:border-slate-300 hover:shadow-md'
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-md ${
                    isSelected ? 'bg-teal-100 text-teal-800' : 'bg-slate-100 text-slate-600'
                  }`}>
                    Вариант #{idx + 1}
                  </span>
                  {isSelected && (
                    <span className="w-2.5 h-2.5 rounded-full bg-teal-500 animate-pulse"></span>
                  )}
                </div>

                {/* Logo Preview Box */}
                <div className="w-full aspect-square rounded-2xl bg-slate-50 border border-slate-100 p-4 flex items-center justify-center mb-3 shadow-inner group-hover:scale-105 transition-transform">
                  <div className="w-24 h-24">
                    {concept.renderSvg()}
                  </div>
                </div>

                <h3 className="font-black text-sm text-slate-900 leading-snug">
                  {concept.title.split(':')[1] || concept.title}
                </h3>
                <p className="text-[11px] text-slate-500 font-medium mt-1 line-clamp-2">
                  {concept.subtitle}
                </p>
              </div>

              {/* Color dots preview */}
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                <div className="flex items-center -space-x-1.5">
                  {concept.colors.map((c, i) => (
                    <span 
                      key={i} 
                      className={`w-4 h-4 rounded-full border-2 border-white ${c.bgClass} shadow-xs`}
                      title={`${c.name}: ${c.hex}`}
                    />
                  ))}
                </div>
                <span className="text-[10px] font-bold text-teal-700 hover:underline">
                  {isSelected ? 'Активен' : 'Выбрать →'}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Interactive Spotlight & Context Mockups */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden p-6 sm:p-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Interactive Visual Canvas Mockup */}
          <div className="lg:col-span-6 space-y-4">
            
            {/* View Mode Switcher */}
            <div className="flex items-center gap-1.5 p-1.5 rounded-2xl bg-slate-100 border border-slate-200 max-w-fit">
              <button
                onClick={() => setPreviewMode('light')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                  previewMode === 'light'
                    ? 'bg-white text-slate-900 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Светлый фон</span>
              </button>

              <button
                onClick={() => setPreviewMode('dark')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                  previewMode === 'dark'
                    ? 'bg-slate-900 text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Тёмный фон</span>
              </button>

              <button
                onClick={() => setPreviewMode('collar')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                  previewMode === 'collar'
                    ? 'bg-teal-600 text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Tag className="w-3.5 h-3.5" />
                <span>На адреснике</span>
              </button>

              <button
                onClick={() => setPreviewMode('phone')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                  previewMode === 'phone'
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Smartphone className="w-3.5 h-3.5" />
                <span>Иконка в iOS / Android</span>
              </button>
            </div>

            {/* Display Canvas Frame */}
            <div className="relative rounded-3xl overflow-hidden border border-slate-200 min-h-[340px] flex items-center justify-center transition-all duration-300">
              
              {/* Light View */}
              {previewMode === 'light' && (
                <div className="w-full h-full p-12 bg-radial from-slate-50 to-slate-200/60 flex flex-col items-center justify-center">
                  <div className="w-48 h-48 drop-shadow-xl animate-in zoom-in-95 duration-200">
                    {selectedConcept.renderSvg(false)}
                  </div>
                  <div className="mt-6 flex items-center gap-2">
                    <span className="text-xl font-black tracking-tight text-slate-900">
                      Зоо<span className="text-teal-600">Маяк</span>
                    </span>
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                      — Векторный оригинал
                    </span>
                  </div>
                </div>
              )}

              {/* Dark View */}
              {previewMode === 'dark' && (
                <div className="w-full h-full p-12 bg-gradient-to-br from-slate-950 via-slate-900 to-teal-950 flex flex-col items-center justify-center text-white">
                  <div className="w-48 h-48 drop-shadow-[0_10px_25px_rgba(20,184,166,0.3)] animate-in zoom-in-95 duration-200">
                    {selectedConcept.renderSvg(true)}
                  </div>
                  <div className="mt-6 flex items-center gap-2">
                    <span className="text-xl font-black tracking-tight text-white">
                      Зоо<span className="text-teal-400">Маяк</span>
                    </span>
                    <span className="text-xs font-bold text-teal-300/80 uppercase tracking-wider">
                      — Dark Mode / Неон
                    </span>
                  </div>
                </div>
              )}

              {/* Collar Tag Mockup View */}
              {previewMode === 'collar' && (
                <div className="w-full h-full p-8 bg-gradient-to-tr from-teal-900 via-emerald-800 to-slate-900 flex flex-col items-center justify-center">
                  <div className="relative">
                    {/* Ring chain */}
                    <div className="w-8 h-8 rounded-full border-4 border-amber-300 mx-auto -mb-3 z-0 shadow-md"></div>
                    {/* Metal Token */}
                    <div className="relative z-10 w-44 h-44 rounded-full bg-gradient-to-b from-slate-100 via-slate-200 to-slate-400 border-4 border-amber-400 p-4 shadow-2xl flex flex-col items-center justify-center">
                      <div className="w-20 h-20">
                        {selectedConcept.renderSvg()}
                      </div>
                      <div className="text-[10px] font-black text-slate-800 uppercase tracking-widest mt-1">
                        ZM-ID: #84920
                      </div>
                      <div className="text-[8px] font-mono text-slate-600">
                        SCAN TO CONTACT
                      </div>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-teal-100 mt-4">
                    Вид на гравированном смарт-адреснике питомца
                  </span>
                </div>
              )}

              {/* Mobile Phone Mockup View */}
              {previewMode === 'phone' && (
                <div className="w-full h-full p-8 bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-950 flex flex-col items-center justify-center">
                  <div className="w-64 rounded-3xl bg-slate-900 border-4 border-slate-700 p-4 shadow-2xl">
                    <div className="w-16 h-4 bg-slate-800 rounded-full mx-auto mb-4"></div>
                    <div className="flex items-center justify-around gap-2 mb-2">
                      <div className="flex flex-col items-center gap-1.5">
                        <div className="w-16 h-16 rounded-2xl shadow-lg ring-2 ring-white/10 overflow-hidden">
                          {selectedConcept.renderSvg(true)}
                        </div>
                        <span className="text-[10px] font-bold text-white tracking-tight">ЗооМаяк</span>
                      </div>
                      <div className="flex flex-col items-center gap-1.5 opacity-40">
                        <div className="w-16 h-16 rounded-2xl bg-slate-700"></div>
                        <span className="text-[10px] font-bold text-slate-400">Карты</span>
                      </div>
                      <div className="flex flex-col items-center gap-1.5 opacity-40">
                        <div className="w-16 h-16 rounded-2xl bg-slate-700"></div>
                        <span className="text-[10px] font-bold text-slate-400">Заметки</span>
                      </div>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-slate-300 mt-4">
                    Иконка сервиса на домашнем экране iOS / Android
                  </span>
                </div>
              )}

            </div>

          </div>

          {/* Right Column: Detailed Specs, Color Hex Codes, Download Tools */}
          <div className="lg:col-span-6 space-y-6 text-left">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-teal-100 text-teal-800 text-xs font-black uppercase tracking-wider border border-teal-200">
                  {selectedConcept.style}
                </span>
                <span className="text-xs font-bold text-slate-400">
                  Векторный формат SVG 120x120px
                </span>
              </div>
              <h3 className="text-3xl font-black text-slate-900 tracking-tight mt-3">
                {selectedConcept.title}
              </h3>
              <p className="text-base text-slate-600 font-medium mt-2 leading-relaxed">
                {selectedConcept.description}
              </p>
            </div>

            {/* Brand Color Swatches */}
            <div className="space-y-2.5">
              <span className="text-xs font-black uppercase tracking-wider text-slate-700 block">
                Фирменные цвета концепта (нажмите для копирования HEX):
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {selectedConcept.colors.map((color, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      navigator.clipboard.writeText(color.hex);
                      confetti({ particleCount: 20 });
                    }}
                    className="p-3 rounded-2xl bg-slate-50 border border-slate-200 hover:border-teal-400 hover:bg-teal-50/50 transition flex items-center gap-3 text-left cursor-pointer group"
                  >
                    <span className={`w-7 h-7 rounded-xl ${color.bgClass} shadow-xs shrink-0 ring-2 ring-white`}></span>
                    <div className="overflow-hidden">
                      <div className="text-xs font-extrabold text-slate-800 truncate">{color.name}</div>
                      <div className="text-[11px] font-mono text-slate-500 group-hover:text-teal-700 font-bold">{color.hex}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Typography Pairing Recommendation */}
            <div className="p-4 rounded-2xl bg-teal-50/70 border border-teal-200/80 flex items-start gap-3.5">
              <div className="w-9 h-9 rounded-xl bg-teal-600 text-white flex items-center justify-center shrink-0 shadow-xs font-black text-sm">
                Aa
              </div>
              <div className="text-xs text-teal-950 leading-relaxed font-medium">
                <strong className="font-extrabold text-teal-900">Рекомендуемая типографика:</strong> Display-заголовки: <em>Plus Jakarta Sans / Montserrat Black</em> (начертания 800/900). Текстовые блоки: <em>Inter / Roboto Flex</em> (400/500/600).
              </div>
            </div>

            {/* Download & Copy Buttons */}
            <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center gap-3">
              <button
                onClick={() => handleDownloadSvg(selectedConcept)}
                className="flex-1 py-3.5 px-5 rounded-2xl bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-500 hover:to-emerald-500 text-white font-extrabold text-sm shadow-md shadow-teal-600/25 flex items-center justify-center gap-2.5 transition cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>Скачать векторный SVG</span>
              </button>

              <button
                onClick={() => handleCopySvg(selectedConcept)}
                className="py-3.5 px-5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-sm flex items-center justify-center gap-2 transition cursor-pointer border border-slate-200"
              >
                {copiedId === selectedConcept.id ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span className="text-emerald-700 font-extrabold">Скопировано!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>Скопировать SVG код</span>
                  </>
                )}
              </button>
            </div>

          </div>

        </div>
      </div>

    </section>
  );
};
