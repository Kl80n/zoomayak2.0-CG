import React, { useState, useEffect } from 'react';
import { 
  X, 
  ChevronLeft, 
  ArrowRight, 
  Check, 
  Truck, 
  Printer, 
  ShoppingBag,
  Sparkles,
  Phone,
  ShieldCheck,
  Award,
  CreditCard,
  MapPin,
  Heart,
  ExternalLink,
  Droplets,
  Gem,
  MoveVertical,
  QrCode
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { Pet } from '../types';
import { RealisticMetalTag, TagShape, TagMaterial } from './RealisticMetalTag';
import { ZoomayakLogo } from './ZoomayakLogo';
import { RealTagMockup } from './RealTagMockup';

interface CollarTagStudioModalProps {
  isOpen: boolean;
  onClose: () => void;
  pet: Pet;
}

export type { TagShape, TagMaterial };

export const CollarTagStudioModal: React.FC<CollarTagStudioModalProps> = ({
  isOpen,
  onClose,
  pet,
}) => {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [shape, setShape] = useState<TagShape>('circle');
  const [material, setMaterial] = useState<TagMaterial>('silver');
  const [petName, setPetName] = useState(pet.name || 'Барни');
  const [phone, setPhone] = useState(pet.emergencyContacts[0]?.phone || '+7 (905) 123-45-67');
  const [extraText, setExtraText] = useState('Если я потерялся, просканируйте QR или перейдите по ссылке:');
  const [isOrdered, setIsOrdered] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const shapeList: { 
    id: TagShape; 
    title: string; 
    dim: string; 
    subtitle: string;
    desc: string;
  }[] = [
    { 
      id: 'circle', 
      title: 'КРУГ', 
      dim: 'Ø 30 мм', 
      subtitle: 'Классика и универсальность',
      desc: 'Идеально сбалансированный круглый медальон. Подходит собакам и кошкам любых размеров.'
    },
    { 
      id: 'paw', 
      title: 'ЛАПА', 
      dim: '30 × 32 мм', 
      subtitle: 'Дружелюбно и мило',
      desc: 'Узнаваемая форма лапки с четырьмя подушечками и выразительной лазерной гравировкой.'
    },
    { 
      id: 'shield', 
      title: 'ЩИТ', 
      dim: '28 × 34 мм', 
      subtitle: 'Надёжно и стильно',
      desc: 'Геральдический контур рыцарского щита — символ верной защиты и безопасности.'
    },
  ];

  const materialOptions: { id: TagMaterial; name: string; hex: string }[] = [
    { id: 'silver', name: 'Сатинированная сталь 316L', hex: '#cbcfd3' },
    { id: 'black', name: 'Черный Оникс DLC', hex: '#2b2d30' },
    { id: 'gold', name: 'Золото 24K PVD', hex: '#cf9e46' },
    { id: 'copper', name: 'Медь / Розовое золото', hex: '#b86b5c' },
  ];

  const handleNext = () => {
    if (step < 4) {
      setStep((prev) => (prev + 1) as 1 | 2 | 3 | 4);
    } else {
      handleOrder();
    }
  };

  const handlePrev = () => {
    if (step > 1) {
      setStep((prev) => (prev - 1) as 1 | 2 | 3 | 4);
    }
  };

  const handleOrder = () => {
    confetti({
      particleCount: 90,
      spread: 80,
      origin: { y: 0.6 }
    });
    setIsOrdered(true);
    setTimeout(() => {
      setIsOrdered(false);
      onClose();
      alert(`Заказ на адресник «${shape === 'circle' ? 'КРУГ' : shape === 'paw' ? 'ЛАПА' : 'ЩИТ'}» для ${petName} оформлен! Доставка курьером в течение 1-2 дней.`);
    }, 1800);
  };

  const handlePrintTag = () => {
    confetti({ particleCount: 30 });
    window.print();
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto cursor-pointer"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-6xl bg-white dark:bg-slate-900 text-slate-900 dark:text-white rounded-[32px] shadow-2xl overflow-hidden my-4 animate-in fade-in zoom-in-95 duration-200 text-left flex flex-col max-h-[94vh] border border-slate-200/80 dark:border-slate-800 cursor-default"
        onClick={(e) => e.stopPropagation()}
      >
        {/* TOP BAR */}
        <div className="px-6 py-3.5 flex items-center justify-between border-b border-slate-100 dark:border-slate-800/80 shrink-0 bg-slate-50/50 dark:bg-slate-900/50">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={step > 1 ? handlePrev : onClose}
              className="w-9 h-9 rounded-full flex items-center justify-center text-teal-600 dark:text-teal-400 hover:bg-teal-50 dark:hover:bg-slate-800 transition cursor-pointer"
              aria-label="Назад"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <h2 className="text-base sm:text-lg font-black text-slate-900 dark:text-white tracking-tight">
              QR-адресник
            </h2>
          </div>

          {/* Stepper pills */}
          <div className="hidden sm:flex items-center gap-6">
            {[
              { num: 1, label: 'Форма' },
              { num: 2, label: 'Данные' },
              { num: 3, label: 'Дизайн' },
              { num: 4, label: 'Готово' },
            ].map((s) => {
              const isCompleted = step > s.num;
              const isCurrent = step === s.num;
              return (
                <button
                  key={s.num}
                  type="button"
                  onClick={() => setStep(s.num as 1 | 2 | 3 | 4)}
                  className="flex items-center gap-2 cursor-pointer group"
                >
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center font-black text-[11px] transition-all ${
                      isCurrent
                        ? 'bg-teal-600 text-white shadow-sm ring-2 ring-teal-500/30'
                        : isCompleted
                        ? 'bg-teal-600 text-white'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-400 border border-slate-200 dark:border-slate-700'
                    }`}
                  >
                    {isCompleted ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : s.num}
                  </div>
                  <span
                    className={`text-xs font-bold ${
                      isCurrent || isCompleted
                        ? 'text-slate-900 dark:text-white'
                        : 'text-slate-400 dark:text-slate-500'
                    }`}
                  >
                    {s.label}
                  </span>
                </button>
              );
            })}
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-9 h-9 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer"
            aria-label="Закрыть"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* MAIN BODY */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          
          {/* STEP 1: EXACT REPLICA OF THE PROTOTYPE LAYOUT FROM USER IMAGE */}
          {step === 1 && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start animate-in fade-in duration-200">
              
              {/* LEFT COLUMN: Controls & Pet Info Card */}
              <div className="lg:col-span-4 flex flex-col justify-between space-y-6">
                
                {/* Stepper on mobile */}
                <div className="sm:hidden flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
                  {[
                    { num: 1, label: 'Форма' },
                    { num: 2, label: 'Данные' },
                    { num: 3, label: 'Дизайн' },
                    { num: 4, label: 'Готово' },
                  ].map((s) => (
                    <div key={s.num} className="flex flex-col items-center gap-1">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-black ${
                        step === s.num ? 'bg-teal-600 text-white' : step > s.num ? 'bg-teal-500 text-white' : 'bg-slate-200 dark:bg-slate-800 text-slate-400'
                      }`}>
                        {step > s.num ? <Check className="w-3 h-3 stroke-[3]" /> : s.num}
                      </div>
                      <span className="text-[10px] text-slate-500 font-bold">{s.label}</span>
                    </div>
                  ))}
                </div>

                <div>
                  <h3 className="text-xl font-black text-slate-900 dark:text-white tracking-tight mb-1">
                    Выберите форму адресника
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mb-5">
                    QR-код ведёт на профиль питомца в ЗооМаяке.
                  </p>

                  {/* 3 Form Selector Cards: Круг, Лапа, Щит */}
                  <div className="grid grid-cols-3 gap-2.5 mb-6">
                    {shapeList.map((item) => {
                      const isSelected = shape === item.id;
                      return (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => setShape(item.id)}
                          className={`relative p-2.5 rounded-2xl flex flex-col items-center justify-between transition-all cursor-pointer border-2 ${
                            isSelected
                              ? 'border-teal-500 bg-teal-50/20 dark:bg-teal-950/30 shadow-md ring-2 ring-teal-500/20'
                              : 'border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 hover:border-slate-300'
                          }`}
                        >
                          {isSelected && (
                            <div className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-teal-500 text-white flex items-center justify-center">
                              <Check className="w-3 h-3 stroke-[3]" />
                            </div>
                          )}

                          <div className="py-1">
                            <RealisticMetalTag
                              shape={item.id}
                              material={material}
                              side="front"
                              petName={petName}
                              zmId={pet.zmId || 'ZM-2025-0001'}
                              size={62}
                              showShadow={false}
                            />
                          </div>

                          <span className="text-xs font-black text-slate-900 dark:text-white mt-1">
                            {item.title === 'КРУГ' ? 'Круг' : item.title === 'ЛАПА' ? 'Лапа' : 'Щит'}
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  {/* 3 Benefit bullets with icons */}
                  <div className="space-y-3.5 mb-6">
                    <div className="flex items-start gap-3">
                      <div className="w-7 h-7 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-700 dark:text-slate-300 shrink-0">
                        <ShieldCheck className="w-4 h-4 text-slate-700 dark:text-slate-300" />
                      </div>
                      <div>
                        <strong className="text-xs font-bold text-slate-900 dark:text-white block">
                          Надёжно и безопасно
                        </strong>
                        <span className="text-[11px] text-slate-500 dark:text-slate-400">
                          Ссылка на профиль питомца
                        </span>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-7 h-7 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-700 dark:text-slate-300 shrink-0">
                        <MapPin className="w-4 h-4 text-slate-700 dark:text-slate-300" />
                      </div>
                      <div>
                        <strong className="text-xs font-bold text-slate-900 dark:text-white block">
                          Помогает найти
                        </strong>
                        <span className="text-[11px] text-slate-500 dark:text-slate-400">
                          Даже если питомец далеко от дома
                        </span>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-7 h-7 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-700 dark:text-slate-300 shrink-0">
                        <Heart className="w-4 h-4 text-red-500" />
                      </div>
                      <div>
                        <strong className="text-xs font-bold text-slate-900 dark:text-white block">
                          Конфиденциально
                        </strong>
                        <span className="text-[11px] text-slate-500 dark:text-slate-400">
                          Данные доступны только вам
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Buttons: Назад & Далее */}
                  <div className="flex items-center gap-3 pt-2 pb-6 border-b border-slate-100 dark:border-slate-800">
                    <button
                      type="button"
                      onClick={onClose}
                      className="flex-1 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold text-xs transition cursor-pointer"
                    >
                      Назад
                    </button>
                    <button
                      type="button"
                      onClick={handleNext}
                      className="flex-1 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-black text-xs shadow-md shadow-teal-600/20 transition cursor-pointer flex items-center justify-center gap-1.5"
                    >
                      <span>Далее</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Pet Profile Preview Card at the bottom */}
                <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950/80 border border-slate-200/80 dark:border-slate-800">
                  <div className="flex items-start gap-3">
                    <div className="relative">
                      <img
                        src={pet.photo || '/emblem.svg'}
                        alt={petName}
                        className="w-13 h-13 rounded-full object-cover border-2 border-white dark:border-slate-800 shadow-sm"
                        onError={(e) => {
                          e.currentTarget.src = '/emblem.svg';
                        }}
                      />
                      <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-500 border-2 border-white dark:border-slate-900" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-black text-slate-900 dark:text-white truncate">
                          {petName}
                        </h4>
                        <span className="text-[10px] font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 px-1.5 py-0.2 rounded-md">
                          Активен
                        </span>
                      </div>

                      <div className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
                        {pet.zmId || 'ZM-2025-0001'}
                      </div>

                      <div className="text-[10.5px] text-slate-600 dark:text-slate-400 mt-1 space-y-0.5">
                        <div>Порода: <span className="font-semibold text-slate-800 dark:text-slate-200">{pet.breed || 'Золотистый ретривер'}</span></div>
                        <div>Возраст: <span className="font-semibold text-slate-800 dark:text-slate-200">{pet.age || '3 года'}</span></div>
                        <div>Пол: <span className="font-semibold text-slate-800 dark:text-slate-200">{pet.gender || 'Мальчик'}</span></div>
                      </div>

                      <button
                        type="button"
                        onClick={() => alert(`Профиль ${petName} (${pet.zmId || 'ZM-2025-0001'}) активен и готов к сканированию.`)}
                        className="text-[11px] text-teal-600 dark:text-teal-400 font-bold hover:underline mt-1.5 flex items-center gap-1 cursor-pointer"
                      >
                        <span>Открыть профиль</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>

                  {/* Footnote banner */}
                  <div className="mt-3 pt-2.5 border-t border-slate-200/60 dark:border-slate-800 flex items-center justify-between text-[10.5px] text-teal-700 dark:text-teal-400 font-bold">
                    <span>Этот QR-код будет вести на профиль {petName} в ЗооМаяке</span>
                    <span className="text-sm">🐾</span>
                  </div>
                </div>

              </div>

              {/* RIGHT COLUMN: Large Interactive Prototype Showcase */}
              <div className="lg:col-span-8 flex flex-col items-center justify-between bg-slate-50/50 dark:bg-slate-950/50 rounded-3xl p-4 sm:p-6 border border-slate-200/80 dark:border-slate-800">
                
                {/* Brand Header */}
                <div className="w-full flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-200 dark:border-slate-800">
                  <div className="flex items-center gap-3">
                    <ZoomayakLogo compact />
                    <div>
                      <div className="flex items-center gap-1.5 text-lg font-black text-slate-900 dark:text-white">
                        <span>Зоо</span><span className="text-teal-600 dark:text-teal-400">Маяк</span>
                      </div>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400">
                        помогаем найти, соединяем сердца
                      </p>
                    </div>
                  </div>

                  <div className="text-left sm:text-right">
                    <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white">
                      Прототипы QR-адресников
                    </h3>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">
                      Один QR-код подойдёт для любого типа адресника.
                    </p>
                  </div>
                </div>

                {/* ROW 1: FRONT FACE OF 3 SHAPES (КРУГ, ЛАПА, ЩИТ) */}
                <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-6 py-6">
                  {shapeList.map((item) => {
                    const isSelected = shape === item.id;
                    return (
                      <div
                        key={item.id}
                        onClick={() => setShape(item.id)}
                        className={`flex flex-col items-center text-center p-3 rounded-3xl transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-white dark:bg-slate-900 shadow-xl ring-2 ring-teal-500/50 scale-[1.02]'
                            : 'hover:bg-white/60 dark:hover:bg-slate-900/60'
                        }`}
                      >
                        {/* Dark pill badge at the top */}
                        <div className={`px-3 py-1 rounded-full text-xs font-black tracking-wider mb-3 ${
                          isSelected ? 'bg-slate-900 text-white dark:bg-teal-500 dark:text-white' : 'bg-slate-800 text-slate-200'
                        }`}>
                          {item.title}
                        </div>

                        {/* Front Face Realistic Metal Tag */}
                        <RealisticMetalTag
                          shape={item.id}
                          material={material}
                          side="front"
                          petName={petName}
                          zmId={pet.zmId || 'ZM-2025-0001'}
                          size={155}
                          showShadow={true}
                          selected={isSelected}
                        />

                        {/* Dimensions & Subtitle */}
                        <div className="mt-3">
                          <div className="text-sm font-black text-slate-900 dark:text-white">
                            {item.dim}
                          </div>
                          <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                            {item.subtitle}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* SECTION DIVIDER: ОБРАТНАЯ СТОРОНА */}
                <div className="w-full flex items-center gap-3 my-2">
                  <div className="flex-1 h-px bg-slate-200 dark:bg-slate-800" />
                  <span className="text-[11px] font-black uppercase tracking-wider text-slate-400 dark:text-slate-500 px-2">
                    ОБРАТНАЯ СТОРОНА (для всех форм)
                  </span>
                  <div className="flex-1 h-px bg-slate-200 dark:bg-slate-800" />
                </div>

                {/* ROW 2: BACK FACE OF 3 SHAPES */}
                <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-6 py-4">
                  {shapeList.map((item) => {
                    const isSelected = shape === item.id;
                    return (
                      <div
                        key={item.id}
                        onClick={() => setShape(item.id)}
                        className={`flex flex-col items-center text-center p-3 rounded-3xl transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-white dark:bg-slate-900 shadow-md ring-1 ring-teal-500/30'
                            : 'hover:bg-white/40 dark:hover:bg-slate-900/40'
                        }`}
                      >
                        {/* Reverse Face Realistic Metal Tag */}
                        <RealisticMetalTag
                          shape={item.id}
                          material={material}
                          side="back"
                          petName={petName}
                          zmId={pet.zmId || 'ZM-2025-0001'}
                          phone={phone}
                          size={145}
                          showShadow={true}
                          selected={isSelected}
                        />
                      </div>
                    );
                  })}
                </div>

                {/* BOTTOM FEATURES BAR */}
                <div className="w-full grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-slate-200 dark:border-slate-800 text-xs">
                  <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                    <ShieldCheck className="w-4 h-4 text-teal-600 dark:text-teal-400 shrink-0" />
                    <span className="text-[11px] leading-tight"><strong>Материал:</strong> нержавеющая сталь</span>
                  </div>

                  <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                    <Gem className="w-4 h-4 text-teal-600 dark:text-teal-400 shrink-0" />
                    <span className="text-[11px] leading-tight"><strong>Гравировка</strong> не стирается</span>
                  </div>

                  <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                    <Droplets className="w-4 h-4 text-teal-600 dark:text-teal-400 shrink-0" />
                    <span className="text-[11px] leading-tight"><strong>Не боится воды</strong> и перепадов t°</span>
                  </div>

                  <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                    <MoveVertical className="w-4 h-4 text-teal-600 dark:text-teal-400 shrink-0" />
                    <span className="text-[11px] leading-tight"><strong>Толщина:</strong> 1,5 мм</span>
                  </div>
                </div>

                {/* Footnote guarantee */}
                <div className="w-full text-center text-[10.5px] text-slate-400 dark:text-slate-500 mt-3 pt-2">
                  QR-код уникален для {petName} и ведёт на его профиль в ЗооМаяке с контактами владельца (только с вашего разрешения).
                </div>

              </div>

            </div>
          )}

          {/* STEP 2: PET DATA & ENGRAVING */}
          {step === 2 && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center animate-in fade-in duration-200">
              <div className="lg:col-span-5 flex flex-col items-center justify-center p-6 bg-slate-50 dark:bg-slate-950/70 rounded-3xl border border-slate-200 dark:border-slate-800">
                <RealisticMetalTag
                  shape={shape}
                  material={material}
                  side="front"
                  petName={petName}
                  phone={phone}
                  zmId={pet.zmId || 'ZM-2025-0001'}
                  size={230}
                  showShadow={true}
                />
                <div className="mt-4 text-center">
                  <span className="text-xs font-black text-teal-600 dark:text-teal-400">
                    Форма: {shapeList.find(s => s.id === shape)?.title} ({shapeList.find(s => s.id === shape)?.dim})
                  </span>
                </div>
              </div>

              <div className="lg:col-span-7 space-y-4">
                <div className="mb-2">
                  <div className="inline-flex items-center px-3 py-1 rounded-full bg-teal-50 dark:bg-teal-950/60 text-teal-600 dark:text-teal-300 text-xs font-black border border-teal-500/20 mb-2">
                    Шаг 2 из 4
                  </div>
                  <h3 className="text-xl font-black text-slate-900 dark:text-white">
                    Контакты и привязка QR-паспорта
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    При сканировании жетона нашедший человек сможет позвонить вам в 1 клик или отправить геолокацию.
                  </p>
                </div>

                <div>
                  <label className="text-xs font-black uppercase text-slate-700 dark:text-slate-300 block mb-1">
                    Кличка питомца
                  </label>
                  <input
                    type="text"
                    value={petName}
                    onChange={(e) => setPetName(e.target.value)}
                    maxLength={14}
                    placeholder="Барни"
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 border-2 border-slate-200 dark:border-slate-800 rounded-2xl text-base font-black text-slate-900 dark:text-white focus:border-teal-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-black uppercase text-slate-700 dark:text-slate-300 block mb-1 flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-teal-500" />
                    Экстренный номер телефона для связи
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+7 (905) 123-45-67"
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 border-2 border-slate-200 dark:border-slate-800 rounded-2xl text-sm font-mono font-bold text-slate-900 dark:text-white focus:border-teal-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-black uppercase text-slate-700 dark:text-slate-300 block mb-1">
                    Оттенок металла
                  </label>
                  <div className="flex items-center gap-3">
                    {materialOptions.map((mat) => (
                      <button
                        key={mat.id}
                        type="button"
                        onClick={() => setMaterial(mat.id)}
                        className={`flex-1 py-2 px-3 rounded-xl border-2 flex items-center justify-center gap-2 cursor-pointer transition ${
                          material === mat.id
                            ? 'border-teal-500 bg-teal-50/30 dark:bg-teal-950/30 font-bold text-slate-900 dark:text-white'
                            : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400'
                        }`}
                      >
                        <span className="w-4 h-4 rounded-full border border-slate-300 shadow-xs" style={{ backgroundColor: mat.hex }} />
                        <span className="text-xs">{mat.name.split(' ')[0]}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-500/30 flex items-center gap-3">
                  <ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <p className="text-xs text-emerald-800 dark:text-emerald-300 font-medium">
                    Уникальный реестровый ID <strong>{pet.zmId || 'ZM-2025-0001'}</strong> привязан к вашей учетной записи.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: 3D DESIGN & FULL ROTATION STUDIO */}
          {step === 3 && (
            <div className="flex flex-col items-center text-center animate-in fade-in duration-200">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-teal-50 dark:bg-teal-950/60 text-teal-600 dark:text-teal-300 text-xs font-black border border-teal-500/20 mb-2">
                Шаг 3 из 4
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight mb-1">
                Интерактивный 3D-просмотр
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md mb-4">
                Поворачивайте жетон мышью, проверяйте QR-код и примеряйте адресник на натуральном кожаном ошейнике.
              </p>

              <div className="w-full max-w-xl p-4 bg-slate-50 dark:bg-slate-950/70 rounded-3xl border border-slate-200 dark:border-slate-800">
                <RealTagMockup
                  shape={shape}
                  material={material}
                  petName={petName}
                  zmId={pet.zmId || 'ZM-2025-0001'}
                  phone={phone}
                  extraText={extraText}
                  interactive={true}
                />
              </div>
            </div>
          )}

          {/* STEP 4: ORDER & SPECIFICATION */}
          {step === 4 && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center animate-in fade-in duration-200">
              <div className="lg:col-span-5 flex flex-col items-center justify-center p-6 bg-slate-50 dark:bg-slate-950/70 rounded-3xl border border-slate-200 dark:border-slate-800">
                <RealisticMetalTag
                  shape={shape}
                  material={material}
                  side="front"
                  petName={petName}
                  phone={phone}
                  zmId={pet.zmId || 'ZM-2025-0001'}
                  size={230}
                  showShadow={true}
                />
                <div className="mt-4 flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handlePrintTag}
                    className="px-4 py-2 rounded-xl bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 text-xs font-bold transition flex items-center gap-2 cursor-pointer shadow-sm"
                  >
                    <Printer className="w-4 h-4" />
                    <span>Распечатать макет</span>
                  </button>
                </div>
              </div>

              <div className="lg:col-span-7 space-y-4 text-left">
                <div className="inline-flex items-center px-3 py-1 rounded-full bg-teal-50 dark:bg-teal-950/60 text-teal-600 dark:text-teal-300 text-xs font-black border border-teal-500/20">
                  Шаг 4 из 4 · Готово к изготовлению
                </div>

                <h3 className="text-2xl font-black text-slate-900 dark:text-white">
                  Ваш персональный адресник готов
                </h3>

                <div className="space-y-2.5 p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Форма адресника:</span>
                    <strong className="text-slate-900 dark:text-white">
                      {shapeList.find(s => s.id === shape)?.title} ({shapeList.find(s => s.id === shape)?.dim})
                    </strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Материал:</span>
                    <strong className="text-slate-900 dark:text-white">{materialOptions.find(m => m.id === material)?.name}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Питомец:</span>
                    <strong className="text-slate-900 dark:text-white">{petName} ({pet.breed || 'Золотистый ретривер'})</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Телефон владельца:</span>
                    <strong className="text-slate-900 dark:text-white font-mono">{phone}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Реестровый ID:</span>
                    <strong className="text-teal-600 dark:text-teal-400 font-mono">{pet.zmId || 'ZM-2025-0001'}</strong>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-500/30 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Truck className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                    <div>
                      <div className="text-xs font-black text-emerald-900 dark:text-emerald-200">
                        Бесплатная курьерская доставка
                      </div>
                      <div className="text-[11px] text-emerald-700 dark:text-emerald-400">
                        1-2 рабочих дня до двери
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-black text-slate-900 dark:text-white">890 ₽</div>
                    <div className="text-[10px] text-slate-500 line-through">1 490 ₽</div>
                  </div>
                </div>

              </div>
            </div>
          )}

        </div>

        {/* FOOTER BAR */}
        <div className="px-6 py-3.5 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between shrink-0 bg-slate-50/50 dark:bg-slate-900/50">
          <button
            type="button"
            onClick={step > 1 ? handlePrev : onClose}
            className="px-5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold text-xs transition cursor-pointer"
          >
            {step > 1 ? 'Назад' : 'Отмена'}
          </button>

          <button
            type="button"
            onClick={handleNext}
            disabled={isOrdered}
            className="px-6 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-black text-xs shadow-md shadow-teal-600/20 transition cursor-pointer flex items-center gap-2"
          >
            <span>{step === 4 ? (isOrdered ? 'Оформляем...' : 'Оформить заказ') : 'Далее →'}</span>
          </button>
        </div>

      </div>
    </div>
  );
};
