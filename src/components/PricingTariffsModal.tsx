import React, { useState, useEffect } from 'react';
import { 
  X, 
  Check, 
  Sparkles, 
  ShieldCheck, 
  CreditCard, 
  Crown, 
  Tag, 
  Zap, 
  HeartHandshake, 
  QrCode, 
  HelpCircle,
  Truck,
  ArrowRight
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { RealisticMetalTag } from './RealisticMetalTag';

interface PricingTariffsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectPlan?: (planId: string) => void;
  onOpenCollarStudio?: () => void;
}

export const PricingTariffsModal: React.FC<PricingTariffsModalProps> = ({
  isOpen,
  onClose,
  onSelectPlan,
  onOpenCollarStudio,
}) => {
  const [billingCycle, setBillingCycle] = useState<'yearly' | 'monthly'>('yearly');
  const [selectedPlan, setSelectedPlan] = useState<string>('lifetime');
  const [orderedNotice, setOrderedNotice] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleChoose = (planId: string) => {
    confetti({ particleCount: 50, spread: 60, origin: { y: 0.6 } });
    setSelectedPlan(planId);
    setOrderedNotice(true);
    setTimeout(() => {
      setOrderedNotice(false);
      onSelectPlan?.(planId);
      onClose();
      alert(`Тариф «${planId === 'lifetime' ? 'Пожизненный VIP' : planId === 'pro' ? 'Забота PRO' : 'Базовый Маяк'}» успешно активирован для всех ваших питомцев!`);
    }, 1500);
  };

  const servicePlans = [
    {
      id: 'free',
      name: 'Базовый Старт',
      badge: 'Бесплатно навсегда',
      priceYear: '0 ₽',
      priceMonth: '0 ₽',
      period: 'без абонентской платы',
      description: 'Идеально для 1 питомца и базовой защиты от потери.',
      isPopular: false,
      features: [
        'До 1 питомца в профиле',
        'Электронный ветпаспорт и ZM-ID',
        'Базовый QR-код для профиля',
        'Календарь напоминаний о прививках',
        'Уведомления о потеряшках в радиусе 3 км',
      ],
      ctaText: 'Текущий тариф',
      disabled: false,
    },
    {
      id: 'pro',
      name: 'Забота & Семья PRO',
      badge: 'Хит подписки',
      priceYear: '190 ₽',
      priceMonth: '290 ₽',
      period: 'в месяц при оплате за год',
      description: 'Для активных владельцев с расширенным контролем и семейным доступом.',
      isPopular: false,
      features: [
        'До 5 питомцев в аккаунте',
        'Мгновенные SMS и Telegram SOS-алерты с GPS',
        'Маскирование номера телефона через безопасный шлюз',
        'Семейный доступ до 4 человек (супруги, догситтеры)',
        'Прямая интеграция с ветклиниками и вызов неотложки',
        'Скидка 15% на физические адресники',
      ],
      ctaText: 'Выбрать PRO',
      disabled: false,
    },
    {
      id: 'lifetime',
      name: 'Пожизненный Маяк VIP',
      badge: 'Лучшая выгода',
      priceYear: '1 990 ₽',
      priceMonth: '1 990 ₽',
      period: 'единоразово навсегда',
      description: 'Полный безлимитный доступ без подписок + металлический жетон в подарок.',
      isPopular: true,
      features: [
        'Безлимитно питомцев навсегда',
        'Включен 1 металлический QR-адресник с лазерной гравировкой и доставкой',
        'Приоритетный розыск в сети SOS-волонтёров ЗооМаяк',
        'Вечное облачное хранилище анализов, рентгенов и паспортов',
        'Личный менеджер заботы 24/7',
        'Бессрочная гарантия на жетон и бесплатная замена при утере',
      ],
      ctaText: 'Активировать пожизненно',
      disabled: false,
    },
  ];

  const tagProducts = [
    {
      name: 'Фирменный жетон «ЩИТ»',
      shape: 'Щит',
      price: '890 ₽',
      material: 'Хирургическая сталь 316L',
      desc: 'Символ защиты. Высокая прочность, лазерная гравировка логотипа и QR-кода.',
    },
    {
      name: 'Фирменный жетон «КОСТЬ»',
      shape: 'Кость',
      price: '890 ₽',
      material: 'Титан с PVD-напылением',
      desc: 'Классическая форма для собак всех пород. Гравировка имени и телефона.',
    },
    {
      name: 'Фирменный жетон «СЕРДЦЕ»',
      shape: 'Сердце',
      price: '890 ₽',
      material: 'Ювелирная латунь / сталь',
      desc: 'Трогательный и изящный медальон. Идеален для кошек и небольших собак.',
    },
    {
      name: 'Фирменный жетон «КРУГ»',
      shape: 'Круг',
      price: '790 ₽',
      material: 'Полированная сталь',
      desc: 'Лаконичный универсальный медальон с логотипом ЗооМаяк и вечным QR.',
    },
  ];

  return (
    <div 
      className="fixed inset-0 z-[80] flex items-center justify-center p-3 sm:p-5 bg-slate-950/80 backdrop-blur-xl overflow-y-auto cursor-pointer"
      onClick={onClose}
      onMouseDown={onClose}
    >
      <div 
        className="relative w-full max-w-5xl bg-white dark:bg-slate-900 text-slate-900 dark:text-white border border-slate-200 dark:border-teal-500/40 rounded-3xl shadow-2xl overflow-hidden my-4 text-left animate-in fade-in zoom-in-95 duration-200 flex flex-col max-h-[90vh] cursor-default"
        onClick={e => e.stopPropagation()}
        onMouseDown={e => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="bg-gradient-to-r from-emerald-50 via-teal-50/60 to-cyan-50 dark:from-teal-950 dark:via-slate-900 dark:to-cyan-950 px-6 py-5 border-b border-slate-200 dark:border-teal-500/20 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 rounded-2xl bg-teal-500 text-white flex items-center justify-center shadow-md">
              <Crown className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-black text-slate-900 dark:text-white">
                  Тарифы сервиса и умные адресники
                </h3>
                <span className="bg-teal-500/10 text-teal-700 dark:text-teal-300 border border-teal-500/30 text-[10px] font-bold px-2 py-0.5 rounded-full">
                  ЗооМаяк Cloud
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Выберите подходящий уровень защиты и закажите долговечный QR-адресник
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2.5 rounded-xl bg-white dark:bg-slate-800 hover:bg-rose-100 hover:text-rose-600 dark:hover:bg-rose-950 dark:hover:text-rose-400 text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-700 transition cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-8 overflow-y-auto">
          
          {/* Billing Switch */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800">
            <div className="text-xs text-slate-600 dark:text-slate-300">
              💡 <strong>Экономия до 35%</strong> при оплате подписки за год или выборе пожизненного доступа
            </div>

            <div className="flex items-center bg-slate-200 dark:bg-slate-800 p-1 rounded-xl">
              <button
                onClick={() => setBillingCycle('monthly')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                  billingCycle === 'monthly'
                    ? 'bg-white dark:bg-slate-900 text-teal-600 dark:text-teal-400 shadow-xs'
                    : 'text-slate-600 dark:text-slate-400'
                }`}
              >
                Ежемесячно
              </button>
              <button
                onClick={() => setBillingCycle('yearly')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer flex items-center gap-1.5 ${
                  billingCycle === 'yearly'
                    ? 'bg-teal-500 text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400'
                }`}
              >
                <span>На 1 год</span>
                <span className="text-[9px] bg-white/20 px-1.5 py-0.5 rounded font-black">-35%</span>
              </button>
            </div>
          </div>

          {/* 3 Main Tier Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {servicePlans.map((plan) => {
              const isSelected = selectedPlan === plan.id;
              return (
                <div
                  key={plan.id}
                  className={`relative p-6 rounded-3xl border transition-all flex flex-col justify-between ${
                    plan.isPopular
                      ? 'bg-gradient-to-b from-teal-500/10 via-white dark:via-slate-900 to-emerald-500/10 border-2 border-teal-500 shadow-xl ring-2 ring-teal-500/20'
                      : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-sm hover:border-teal-500/40'
                  }`}
                >
                  {plan.isPopular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-gradient-to-r from-teal-500 to-emerald-600 text-white text-[10px] font-black uppercase tracking-wider shadow-md">
                      {plan.badge}
                    </div>
                  )}

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-lg font-black text-slate-900 dark:text-white">
                        {plan.name}
                      </h4>
                      {!plan.isPopular && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                          {plan.badge}
                        </span>
                      )}
                    </div>

                    <p className="text-xs text-slate-500 dark:text-slate-400 mb-4 min-h-[32px]">
                      {plan.description}
                    </p>

                    <div className="mb-5 pb-5 border-b border-slate-100 dark:border-slate-800">
                      <div className="text-3xl font-black text-slate-900 dark:text-white">
                        {billingCycle === 'yearly' ? plan.priceYear : plan.priceMonth}
                      </div>
                      <span className="text-[11px] text-slate-500 dark:text-slate-400 block mt-0.5">
                        {plan.period}
                      </span>
                    </div>

                    {/* Features list */}
                    <ul className="space-y-2.5 mb-6 text-xs text-slate-700 dark:text-slate-300">
                      {plan.features.map((feat, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <Check className="w-4 h-4 text-teal-500 shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <button
                    onClick={() => handleChoose(plan.id)}
                    disabled={orderedNotice}
                    className={`w-full py-3 rounded-2xl font-extrabold text-xs flex items-center justify-center gap-2 transition cursor-pointer shadow-sm ${
                      plan.isPopular
                        ? 'bg-teal-500 hover:bg-teal-600 text-white shadow-teal-500/20'
                        : 'bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200'
                    }`}
                  >
                    <span>{orderedNotice && isSelected ? 'Подключаем...' : plan.ctaText}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              );
            })}
          </div>

          {/* Tag Hardware Offer Section */}
          <div className="p-6 sm:p-7 rounded-3xl bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800 space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-200 dark:border-slate-800">
              <div>
                <span className="text-xs font-bold text-teal-600 dark:text-teal-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Tag className="w-4 h-4" /> Физические QR-адресники с лазерной гравировкой
                </span>
                <h4 className="text-xl font-black text-slate-900 dark:text-white mt-0.5">
                  Формы медальонов на выбор
                </h4>
              </div>

              {onOpenCollarStudio && (
                <button
                  onClick={() => {
                    onClose();
                    onOpenCollarStudio();
                  }}
                  className="px-4 py-2 rounded-xl bg-teal-500 hover:bg-teal-600 text-white font-extrabold text-xs shadow-sm flex items-center gap-1.5 transition cursor-pointer self-start sm:self-auto"
                >
                  <QrCode className="w-4 h-4" />
                  <span>Открыть 3D-конструктор жетона</span>
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { shape: 'circle' as const, material: 'silver' as const, title: 'КРУГ (Ø 30 мм)', subtitle: 'Классика и универсальность', price: '890 ₽', desc: 'Хирургическая сталь 316L с высокоточной лазерной гравировкой QR и логотипа ЗооМаяк.' },
                { shape: 'paw' as const, material: 'silver' as const, title: 'ЛАПА (30 × 32 мм)', subtitle: 'Дружелюбно и мило', price: '890 ₽', desc: 'Узнаваемый силуэт лапки с глубокой гравировкой и пожизненной стойкостью к влаге.' },
                { shape: 'shield' as const, material: 'silver' as const, title: 'ЩИТ (28 × 34 мм)', subtitle: 'Надёжно и стильно', price: '890 ₽', desc: 'Классический геральдический профиль рыцарского щита — символ максимальной защиты.' },
              ].map((tag, i) => (
                <div key={i} className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col justify-between gap-3 shadow-xs hover:border-teal-500/50 transition">
                  <div>
                    {/* Realistic Visual Mockup Badge Header */}
                    <div className="h-32 rounded-xl bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800/80 flex items-center justify-center relative mb-3 overflow-hidden shadow-inner py-1">
                      <RealisticMetalTag
                        shape={tag.shape}
                        material={tag.material}
                        side="front"
                        size={92}
                        petName="Барни"
                        showShadow={true}
                      />
                    </div>

                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[11px] font-extrabold text-teal-700 dark:text-teal-400 bg-teal-50 dark:bg-teal-500/10 px-2 py-0.5 rounded-lg">
                        {tag.title}
                      </span>
                      <strong className="text-sm font-black text-slate-900 dark:text-white">{tag.price}</strong>
                    </div>
                    <strong className="text-xs text-slate-900 dark:text-white block mt-1">{tag.subtitle}</strong>
                    <p className="text-[11px] text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
                      {tag.desc}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-slate-100 dark:border-slate-800 text-[10px] text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1">
                    <Truck className="w-3.5 h-3.5" /> Бесплатная доставка по РФ (1-2 дня)
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Guarantee Footer */}
          <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
            <div className="text-xs text-emerald-900 dark:text-emerald-200 leading-relaxed">
              <strong>Гарантия безопасности ЗооМаяк:</strong> Все платежи защищены шифрованием банковского уровня (PCI DSS). Никаких скрытых списаний — отменить подписку можно в любой момент в личном кабинете в 1 клик.
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
