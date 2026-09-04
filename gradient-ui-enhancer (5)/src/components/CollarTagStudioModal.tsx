import React, { useState } from 'react';
import { 
  X, 
  Sparkles, 
  Check, 
  QrCode, 
  Download, 
  ShieldCheck, 
  ShoppingBag,
  Sliders,
  Layers,
  Printer
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { Pet } from '../types';

interface CollarTagStudioModalProps {
  isOpen: boolean;
  onClose: () => void;
  pet: Pet;
}

type TagMaterial = 'teal' | 'black' | 'gold' | 'silver' | 'purple';
type TagShape = 'circle' | 'shield' | 'hexagon' | 'bone';

export const CollarTagStudioModal: React.FC<CollarTagStudioModalProps> = ({
  isOpen,
  onClose,
  pet,
}) => {
  const [material, setMaterial] = useState<TagMaterial>('teal');
  const [shape, setShape] = useState<TagShape>('circle');
  const [showPhone, setShowPhone] = useState(true);
  const [showMicrochip, setShowMicrochip] = useState(true);
  const [engravedText, setEngravedText] = useState(pet.name);
  const [phone, setPhone] = useState(pet.emergencyContacts[0]?.phone || '+7 (999) 000-00-00');
  const [isOrdered, setIsOrdered] = useState(false);

  if (!isOpen) return null;

  const handleOrder = () => {
    confetti({
      particleCount: 70,
      spread: 70,
      origin: { y: 0.6 }
    });
    setIsOrdered(true);
    setTimeout(() => {
      setIsOrdered(false);
      onClose();
      alert('Заказ на умный QR-адресник ЗооМаяк оформлен! Мы отправим его службой экспресс-доставки.');
    }, 1800);
  };

  const getMaterialStyles = () => {
    switch (material) {
      case 'teal':
        return {
          bg: 'bg-gradient-to-tr from-teal-900 via-emerald-800 to-cyan-700',
          border: 'border-teal-400',
          textColor: 'text-teal-100',
          accent: 'bg-teal-400 text-slate-950',
          glow: 'shadow-teal-500/50',
        };
      case 'black':
        return {
          bg: 'bg-gradient-to-tr from-slate-950 via-zinc-900 to-slate-800',
          border: 'border-slate-400',
          textColor: 'text-slate-100',
          accent: 'bg-slate-100 text-slate-950',
          glow: 'shadow-slate-500/30',
        };
      case 'gold':
        return {
          bg: 'bg-gradient-to-tr from-amber-800 via-yellow-700 to-amber-500',
          border: 'border-amber-300',
          textColor: 'text-amber-100',
          accent: 'bg-amber-300 text-slate-950',
          glow: 'shadow-amber-500/50',
        };
      case 'silver':
        return {
          bg: 'bg-gradient-to-tr from-slate-400 via-slate-200 to-slate-100 text-slate-900',
          border: 'border-slate-100',
          textColor: 'text-slate-900',
          accent: 'bg-slate-900 text-white',
          glow: 'shadow-slate-300/50',
        };
      case 'purple':
        return {
          bg: 'bg-gradient-to-tr from-indigo-900 via-purple-800 to-pink-700',
          border: 'border-purple-400',
          textColor: 'text-purple-100',
          accent: 'bg-purple-300 text-slate-950',
          glow: 'shadow-purple-500/50',
        };
    }
  };

  const matStyles = getMaterialStyles();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md overflow-y-auto">
      <div 
        className="relative w-full max-w-3xl bg-white border border-slate-200/90 rounded-3xl shadow-2xl overflow-hidden my-6 animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header */}
        <div className="bg-gradient-to-r from-teal-700 via-teal-800 to-emerald-800 px-6 py-4 border-b border-teal-600/30 flex items-center justify-between text-white shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/15 backdrop-blur-xs border border-white/25 flex items-center justify-center text-emerald-300 shadow-inner">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-black text-white tracking-tight">
                Конструктор Умного QR-Адресника
              </h3>
              <p className="text-xs text-teal-100/90 font-medium">
                Защита от потери с лазерной гравировкой и вечным QR-маяком
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

        {/* Content */}
        <div className="p-6 sm:p-8 grid grid-cols-1 md:grid-cols-12 gap-8 items-center bg-slate-50/50">
          
          {/* Left: Interactive 3D/2D Tag Preview */}
          <div className="md:col-span-6 flex flex-col items-center justify-center p-8 bg-white rounded-3xl border border-slate-200/90 shadow-sm relative">
            <div className="absolute top-3 left-3 text-[10px] uppercase font-mono text-slate-500 font-bold">
              Живой макет адресника (Масштаб 1:1)
            </div>

            {/* The Physical Tag Replica */}
            <div className="relative my-6 group">
              {/* Ring Hook at top of tag */}
              <div className="w-7 h-7 rounded-full border-4 border-slate-300 mx-auto -mb-2 shadow-inner bg-slate-100"></div>

              {/* Tag Body */}
              <div
                className={`w-48 h-48 sm:w-52 sm:h-52 ${shape === 'circle' ? 'rounded-full' : shape === 'shield' ? 'rounded-b-3xl rounded-t-xl' : 'rounded-3xl'} ${matStyles.bg} border-4 ${matStyles.border} shadow-xl flex flex-col items-center justify-center p-4 text-center transform transition-all duration-300 group-hover:scale-105`}
              >
                {/* Micro Brand mark */}
                <div className="text-[8px] font-black uppercase tracking-widest opacity-80 mb-1">
                  ЗООМАЯК · GPS/QR
                </div>

                {/* Engraved Pet Name */}
                <div className={`text-xl font-black ${matStyles.textColor} tracking-tight drop-shadow-sm`}>
                  {engravedText || pet.name}
                </div>

                {/* Center QR Box */}
                <div className="w-16 h-16 bg-white p-1 rounded-lg my-1.5 shadow-inner flex items-center justify-center">
                  <svg viewBox="0 0 40 40" className="w-full h-full text-slate-950">
                    <rect width="40" height="40" fill="white" />
                    <rect x="2" y="2" width="10" height="10" fill="black" />
                    <rect x="4" y="4" width="6" height="6" fill="white" />
                    <rect x="5" y="5" width="4" height="4" fill="black" />
                    <rect x="28" y="2" width="10" height="10" fill="black" />
                    <rect x="30" y="4" width="6" height="6" fill="white" />
                    <rect x="31" y="5" width="4" height="4" fill="black" />
                    <rect x="2" y="28" width="10" height="10" fill="black" />
                    <rect x="4" y="30" width="6" height="6" fill="white" />
                    <rect x="5" y="31" width="4" height="4" fill="black" />
                    <rect x="15" y="5" width="4" height="4" fill="black" />
                    <rect x="18" y="18" width="8" height="8" fill="#0d9488" rx="2" />
                    <rect x="25" y="28" width="6" height="6" fill="black" />
                  </svg>
                </div>

                {/* ZM-ID string */}
                <div className="text-[10px] font-mono font-black tracking-wider opacity-90">
                  {pet.zmId}
                </div>

                {/* Phone number */}
                {showPhone && (
                  <div className={`text-[10px] font-bold ${matStyles.textColor} mt-0.5`}>
                    {phone}
                  </div>
                )}
              </div>
            </div>

            <div className="text-center text-xs text-slate-500 font-medium mt-2">
              Нержавеющая хирургическая сталь с PVD-напылением • Защита от влаги и царапин
            </div>
          </div>

          {/* Right: Customization Controls */}
          <div className="md:col-span-6 space-y-5 text-left">
            
            {/* Material Selector */}
            <div>
              <label className="text-xs font-black uppercase tracking-wider text-slate-600 block mb-2">
                Материал и цвет
              </label>
              <div className="grid grid-cols-5 gap-2">
                {[
                  { id: 'teal', label: 'Изумруд', color: 'bg-teal-600' },
                  { id: 'black', label: 'Оникс', color: 'bg-slate-900 border border-slate-700' },
                  { id: 'gold', label: 'Золото', color: 'bg-amber-400' },
                  { id: 'silver', label: 'Титан', color: 'bg-slate-300' },
                  { id: 'purple', label: 'Неон', color: 'bg-purple-600' },
                ].map((m) => (
                  <button
                    key={m.id}
                    onClick={() => setMaterial(m.id as TagMaterial)}
                    className={`flex flex-col items-center gap-1.5 p-2 rounded-xl border transition-all cursor-pointer ${
                      material === m.id
                        ? 'bg-teal-50 border-teal-500 shadow-xs ring-2 ring-teal-500/20'
                        : 'bg-white border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <span className={`w-6 h-6 rounded-full ${m.color} shadow-xs`}></span>
                    <span className="text-[10px] font-bold text-slate-700">{m.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Shape Selector */}
            <div>
              <label className="text-xs font-black uppercase tracking-wider text-slate-600 block mb-2">
                Форма медальона
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'circle', label: 'Круг' },
                  { id: 'shield', label: 'Щит' },
                  { id: 'hexagon', label: 'Гексагон' },
                ].map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setShape(s.id as TagShape)}
                    className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                      shape === s.id
                        ? 'bg-teal-600 border-teal-600 text-white shadow-xs'
                        : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Engraving Inputs */}
            <div className="space-y-3">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Кличка на жетоне
                </label>
                <input
                  type="text"
                  value={engravedText}
                  onChange={(e) => setEngravedText(e.target.value)}
                  className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-sm text-slate-900 font-bold focus:border-teal-500 focus:outline-none"
                  placeholder="Имя питомца"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Телефон для связи при сканировании
                </label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-sm text-slate-900 font-mono font-bold focus:border-teal-500 focus:outline-none"
                  placeholder="+7 (999) 000-00-00"
                />
              </div>
            </div>

            {/* Price & Action */}
            <div className="pt-3 border-t border-slate-200 flex items-center justify-between">
              <div>
                <div className="text-xs text-slate-500 font-semibold">Стоимость жетона</div>
                <div className="text-xl font-black text-slate-900">890 ₽ <span className="text-xs text-emerald-600 font-bold">(Доставка 1-2 дня)</span></div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => {
                    confetti({ particleCount: 30 });
                    window.print();
                  }}
                  className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition cursor-pointer"
                  title="Печать макета"
                >
                  <Printer className="w-5 h-5" />
                </button>

                <button
                  onClick={handleOrder}
                  disabled={isOrdered}
                  className="px-6 py-3 rounded-2xl bg-gradient-to-r from-teal-600 via-teal-700 to-emerald-600 hover:from-teal-500 hover:to-emerald-500 text-white font-extrabold text-sm shadow-md shadow-teal-600/20 transition cursor-pointer flex items-center gap-2"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>{isOrdered ? 'Оформляем...' : 'Заказать адресник'}</span>
                </button>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
