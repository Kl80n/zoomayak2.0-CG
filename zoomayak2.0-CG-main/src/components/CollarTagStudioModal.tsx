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
import { QRCodeCanvas } from 'qrcode.react';
import { Pet } from '../types';
import { ZoomayakLogo } from './ZoomayakLogo';

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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-xl overflow-y-auto">
      <div 
        className="relative w-full max-w-3xl bg-slate-900 border border-teal-500/40 rounded-3xl shadow-2xl shadow-teal-950/90 overflow-hidden my-6 animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header */}
        <div className="bg-gradient-to-r from-teal-950 via-slate-900 to-cyan-950 px-6 py-4 border-b border-teal-500/20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-400 to-emerald-500 flex items-center justify-center text-slate-950 shadow-md">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-extrabold text-white">
                Конструктор Умного QR-Адресника
              </h3>
              <p className="text-xs text-teal-300">
                Защита от потери с лазерной гравировкой и вечным QR-маяком
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800 hover:bg-rose-950 hover:text-rose-400 text-slate-400 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          
          {/* Left: Interactive 3D/2D Tag Preview */}
          <div className="md:col-span-6 flex flex-col items-center justify-center p-8 bg-slate-950/80 rounded-3xl border border-slate-800 relative">
            <div className="absolute top-3 left-3 text-[10px] uppercase font-mono text-slate-500 font-bold">
              Живой макет адресника (Масштаб 1:1)
            </div>

            {/* The Physical Tag Replica */}
            <div className="relative my-6 group">
              {/* Ring Hook at top of tag */}
              <div className="w-6 h-6 rounded-full border-4 border-slate-400 mx-auto -mb-2 shadow-inner bg-slate-900"></div>

              {/* Tag Body */}
              <div
                className={`w-48 h-48 sm:w-52 sm:h-52 ${shape === 'circle' ? 'rounded-full' : shape === 'shield' ? 'rounded-b-3xl rounded-t-xl' : 'rounded-3xl'} ${matStyles.bg} border-4 ${matStyles.border} shadow-2xl ${matStyles.glow} flex flex-col items-center justify-center p-4 text-center transform transition-all duration-300 group-hover:scale-105`}
              >
                {/* Master brand mark */}
                <div className="mb-1 text-white/90"><ZoomayakLogo compact /></div>

                {/* Engraved Pet Name */}
                <div className={`text-xl font-black ${matStyles.textColor} tracking-tight drop-shadow`}>
                  {engravedText || pet.name}
                </div>

                {/* Real QR: opens the public pet profile. Logo is embedded with high error correction. */}
                <div className="w-20 h-20 bg-white p-1.5 rounded-lg my-1.5 shadow-inner flex items-center justify-center">
                  <QRCodeCanvas
                    value={`${window.location.origin}/qr/${encodeURIComponent(pet.zmId)}`}
                    size={70}
                    level="H"
                    includeMargin={false}
                    imageSettings={{
                      src: '/zoomayak-logo-approved-icon.png',
                      height: 16,
                      width: 16,
                      excavate: true,
                    }}
                  />
                </div>

                {/* ZM-ID string */}
                <div className="text-[10px] font-mono font-bold tracking-wider opacity-90">
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

            <div className="text-center text-xs text-slate-400 mt-2">
              Нержавеющая хирургическая сталь с PVD-напылением • Защита от влаги и царапин
            </div>
          </div>

          {/* Right: Customization Controls */}
          <div className="md:col-span-6 space-y-5 text-left">
            
            {/* Material Selector */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2">
                Материал и цвет
              </label>
              <div className="grid grid-cols-5 gap-2">
                {[
                  { id: 'teal', label: 'Изумруд', color: 'bg-teal-500' },
                  { id: 'black', label: 'Оникс', color: 'bg-slate-900 border border-slate-700' },
                  { id: 'gold', label: 'Золото', color: 'bg-amber-400' },
                  { id: 'silver', label: 'Титан', color: 'bg-slate-300' },
                  { id: 'purple', label: 'Неон', color: 'bg-purple-500' },
                ].map((m) => (
                  <button
                    key={m.id}
                    onClick={() => setMaterial(m.id as TagMaterial)}
                    className={`flex flex-col items-center gap-1.5 p-2 rounded-xl border transition-all cursor-pointer ${
                      material === m.id
                        ? 'bg-slate-800 border-teal-400 shadow-md ring-1 ring-teal-400'
                        : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <span className={`w-6 h-6 rounded-full ${m.color} shadow-sm`}></span>
                    <span className="text-[10px] font-bold text-slate-300">{m.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Shape Selector */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2">
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
                        ? 'bg-teal-500/20 border-teal-400 text-teal-300 shadow'
                        : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-white'
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
                <label className="text-xs font-bold text-slate-300 block mb-1">
                  Кличка на жетоне
                </label>
                <input
                  type="text"
                  value={engravedText}
                  onChange={(e) => setEngravedText(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-white font-bold focus:border-teal-400 focus:outline-none"
                  placeholder="Имя питомца"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1">
                  Телефон для связи при сканировании
                </label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-white font-mono focus:border-teal-400 focus:outline-none"
                  placeholder="+7 (999) 000-00-00"
                />
              </div>
            </div>

            {/* Price & Action */}
            <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
              <div>
                <div className="text-xs text-slate-400">Стоимость жетона</div>
                <div className="text-xl font-extrabold text-white">890 ₽ <span className="text-xs text-emerald-400 font-normal">(Доставка 1-2 дня)</span></div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => {
                    confetti({ particleCount: 30 });
                    window.print();
                  }}
                  className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition cursor-pointer"
                  title="Печать макета"
                >
                  <Printer className="w-5 h-5" />
                </button>

                <button
                  onClick={handleOrder}
                  disabled={isOrdered}
                  className="px-6 py-3 rounded-2xl bg-gradient-to-r from-teal-500 via-emerald-500 to-cyan-500 hover:from-teal-400 hover:to-cyan-400 text-slate-950 font-extrabold text-sm shadow-lg shadow-teal-500/30 transition cursor-pointer flex items-center gap-2"
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
