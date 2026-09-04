import React, { useState, useRef } from 'react';
import { Eye, Smartphone, Award, ShieldCheck, Sparkles, RefreshCw } from 'lucide-react';
import { RealisticMetalTag, TagShape, TagMaterial } from './RealisticMetalTag';
import { ZoomayakQR } from './ZoomayakQR';

interface RealTagMockupProps {
  shape: TagShape;
  material: TagMaterial;
  petName: string;
  zmId: string;
  phone: string;
  extraText?: string;
  interactive?: boolean;
}

export const RealTagMockup: React.FC<RealTagMockupProps> = ({
  shape,
  material,
  petName,
  zmId,
  phone,
  extraText = 'Есть чип · Верните за вознаграждение',
  interactive = true,
}) => {
  const [side, setSide] = useState<'front' | 'back' | 'collar'>('front');
  const [mousePos, setMousePos] = useState({ rotateX: 0, rotateY: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || side === 'collar') return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -12;
    const rotateY = ((x - centerX) / centerX) * 12;
    setMousePos({ rotateX, rotateY });
  };

  const handleMouseLeave = () => {
    setMousePos({ rotateX: 0, rotateY: 0 });
  };

  const getMaterialName = () => {
    switch (material) {
      case 'black':
        return 'Матовый Оружейный Оникс (DLC)';
      case 'gold':
        return 'Ювелирное Золото 24K (PVD)';
      case 'copper':
        return 'Медь / Розовое золото (PVD)';
      case 'silver':
      default:
        return 'Хирургическая сатинированная сталь 316L';
    }
  };

  return (
    <div className="w-full flex flex-col items-center select-none">
      {/* Visual Navigation Switcher */}
      {interactive && (
        <div className="flex items-center gap-1.5 p-1 bg-slate-100 dark:bg-slate-800/90 rounded-2xl mb-4 border border-slate-200 dark:border-slate-700 text-xs font-black shadow-inner">
          <button
            type="button"
            onClick={() => setSide('front')}
            className={`px-3.5 py-1.5 rounded-xl transition cursor-pointer flex items-center gap-1.5 ${
              side === 'front'
                ? 'bg-white dark:bg-slate-900 text-teal-700 dark:text-teal-400 shadow-sm ring-1 ring-teal-500/30'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Лицевая (Аверс)</span>
          </button>

          <button
            type="button"
            onClick={() => setSide('back')}
            className={`px-3.5 py-1.5 rounded-xl transition cursor-pointer flex items-center gap-1.5 ${
              side === 'back'
                ? 'bg-white dark:bg-slate-900 text-teal-700 dark:text-teal-400 shadow-sm ring-1 ring-teal-500/30'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>Оборот (QR и связь)</span>
          </button>

          <button
            type="button"
            onClick={() => setSide('collar')}
            className={`px-3.5 py-1.5 rounded-xl transition cursor-pointer flex items-center gap-1.5 ${
              side === 'collar'
                ? 'bg-white dark:bg-slate-900 text-teal-700 dark:text-teal-400 shadow-sm ring-1 ring-teal-500/30'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Award className="w-3.5 h-3.5" />
            <span>На ошейнике</span>
          </button>
        </div>
      )}

      {/* 3D Physical Studio Stage */}
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative py-4 px-2 flex flex-col items-center justify-center min-h-[340px] w-full"
        style={{ perspective: '1000px' }}
      >
        {side === 'collar' ? (
          /* Real Studio Collar View */
          <div className="relative w-full max-w-md h-72 rounded-3xl overflow-hidden shadow-2xl border-2 border-stone-800 bg-gradient-to-b from-stone-900 via-stone-950 to-black flex items-center justify-center animate-in fade-in duration-300">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-200/10 via-transparent to-black pointer-events-none" />

            {/* Heavy Genuine Leather Collar */}
            <div className="absolute top-1/4 left-0 right-0 h-20 bg-[#2d1b0f] border-y-4 border-[#1a1009] shadow-[0_15px_30px_rgba(0,0,0,0.9)] flex items-center justify-between px-6 z-0">
              <div className="absolute top-2 left-0 right-0 border-t-2 border-dashed border-[#b87333]/70" />
              <div className="absolute bottom-2 left-0 right-0 border-b-2 border-dashed border-[#b87333]/70" />
              <div className="text-[10px] uppercase tracking-widest text-[#d4af37]/70 font-mono font-black pl-2">
                ★ ЗООМАЯК GENUINE LEATHER ★
              </div>
              <div className="w-12 h-14 rounded-b-2xl border-[5px] border-slate-200 bg-transparent shadow-2xl mx-auto relative top-8 z-10">
                <div className="absolute inset-0 bg-gradient-to-r from-slate-400 via-white to-slate-500 opacity-80 rounded-b-xl" />
              </div>
            </div>

            {/* Suspended Realistic Tag */}
            <div className="relative z-20 mt-20 transform scale-75 drop-shadow-[0_25px_30px_rgba(0,0,0,0.9)]">
              <RealisticMetalTag
                shape={shape}
                material={material}
                side="front"
                petName={petName}
                phone={phone}
                zmId={zmId}
                size={240}
                showShadow={false}
              />
            </div>
          </div>
        ) : (
          /* Interactive Direct Realistic Tag */
          <div
            className="relative flex flex-col items-center transition-transform duration-200 ease-out"
            style={{
              transform: `rotateX(${mousePos.rotateX}deg) rotateY(${mousePos.rotateY}deg)`,
              transformStyle: 'preserve-3d',
            }}
          >
            {/* Hanging Steel Ring Assembly */}
            <div className="relative z-20 flex flex-col items-center -mb-7">
              {/* Double Split Ring */}
              <div className="w-11 h-11 rounded-full border-[5px] border-slate-300 dark:border-slate-200 bg-slate-900 shadow-2xl relative flex items-center justify-center">
                <div className="w-5 h-5 rounded-full border border-slate-400 bg-slate-950/70" />
                <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-transparent via-white/80 to-transparent pointer-events-none" />
              </div>
              <div className="w-5 h-5 -mt-2 rounded-full border-[3px] border-slate-400 bg-slate-950 shadow-md relative z-10" />
            </div>

            {/* REALISTIC METAL TAG COMPONENT */}
            <div className="relative z-10">
              <RealisticMetalTag
                shape={shape}
                material={material}
                side={side}
                petName={petName}
                phone={phone}
                zmId={zmId}
                extraText={extraText}
                size={270}
                showShadow={true}
              />
            </div>
          </div>
        )}
      </div>

      {/* Material & Laser Tech Info Footer */}
      <div className="w-full mt-2 pt-3 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-2 text-xs">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-teal-500 shadow-sm animate-pulse" />
          <span className="text-slate-800 dark:text-slate-200 font-bold">
            {getMaterialName()}
          </span>
        </div>
        <span className="text-slate-500 dark:text-slate-400 font-mono text-[11px] font-bold">
          {side === 'front' ? 'Лицевая сторона (Аверс)' : side === 'back' ? 'Обратная сторона (Реверс)' : 'Вид на ошейнике'}
        </span>
      </div>
    </div>
  );
};
