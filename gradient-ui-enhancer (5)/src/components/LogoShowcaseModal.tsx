import React, { useState } from 'react';
import { 
  X, 
  Sparkles, 
  Download, 
  Copy, 
  Check, 
  Palette, 
  Layers, 
  Eye, 
  CheckCircle2,
  Share2
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface LogoShowcaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectAppLogo?: (logoId: string) => void;
  selectedLogoId?: string;
}

export interface LogoConcept {
  id: string;
  title: string;
  subtitle: string;
  style: string;
  description: string;
  colors: { name: string; hex: string; bgClass: string }[];
  svgCode: string;
  renderSvg: (isDark?: boolean) => React.ReactNode;
}

export const LOGO_CONCEPTS: LogoConcept[] = [
  {
    id: 'beacon-paw',
    title: 'Концепт 1: «Световой Луч и Лапка»',
    subtitle: 'Минималистичный технологичный вектор',
    style: 'Modern Flat & Minimal',
    description: 'Маяк как символ надежды и ориентира. Световые лучи расходятся в стороны и формируют силуэты ушек и подушечки лапы. Чистые геометрические пропорции.',
    colors: [
      { name: 'Изумрудный Маяк', hex: '#0D9488', bgClass: 'bg-teal-600' },
      { name: 'Мятный Неон', hex: '#10B981', bgClass: 'bg-emerald-500' },
      { name: 'Глубокий Океан', hex: '#0F172A', bgClass: 'bg-slate-900' },
    ],
    svgCode: `<svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g1" x1="20" y1="20" x2="100" y2="100" gradientUnits="userSpaceOnUse">
      <stop stop-color="#0D9488"/>
      <stop offset="1" stop-color="#10B981"/>
    </linearGradient>
  </defs>
  <rect width="120" height="120" rx="28" fill="url(#g1)"/>
  <!-- Lighthouse Tower -->
  <path d="M54 36L56 22H64L66 36" stroke="#FFFFFF" stroke-width="4" stroke-linecap="round"/>
  <path d="M52 36H68L74 94H46L52 36Z" fill="#FFFFFF" fill-opacity="0.2" stroke="#FFFFFF" stroke-width="4"/>
  <path d="M50 54H70M48 72H72" stroke="#FFFFFF" stroke-width="4"/>
  <!-- Light Beams forming paw wings -->
  <path d="M60 26C72 16 92 18 102 24" stroke="#FEF08A" stroke-width="5" stroke-linecap="round" stroke-dasharray="2 6"/>
  <path d="M60 26C48 16 28 18 18 24" stroke="#FEF08A" stroke-width="5" stroke-linecap="round" stroke-dasharray="2 6"/>
  <!-- Paw Pads at base -->
  <circle cx="60" cy="82" r="6" fill="#FFFFFF"/>
  <circle cx="50" cy="74" r="3.5" fill="#FFFFFF"/>
  <circle cx="70" cy="74" r="3.5" fill="#FFFFFF"/>
  <circle cx="60" cy="26" r="5" fill="#FEF08A"/>
</svg>`,
    renderSvg: (isDark = false) => (
      <svg viewBox="0 0 120 120" fill="none" className="w-full h-full">
        <defs>
          <linearGradient id="c1-grad" x1="20" y1="20" x2="100" y2="100" gradientUnits="userSpaceOnUse">
            <stop stopColor="#0D9488"/>
            <stop offset="1" stopColor="#10B981"/>
          </linearGradient>
        </defs>
        <rect width="120" height="120" rx="28" fill="url(#c1-grad)"/>
        <path d="M54 36L56 22H64L66 36" stroke="#FFFFFF" strokeWidth="4" strokeLinecap="round"/>
        <path d="M52 36H68L74 94H46L52 36Z" fill="#FFFFFF" fillOpacity="0.25" stroke="#FFFFFF" strokeWidth="4"/>
        <path d="M50 54H70M48 72H72" stroke="#FFFFFF" strokeWidth="4"/>
        <path d="M60 26C72 16 92 18 102 24" stroke="#FEF08A" strokeWidth="5" strokeLinecap="round" strokeDasharray="2 6"/>
        <path d="M60 26C48 16 28 18 18 24" stroke="#FEF08A" strokeWidth="5" strokeLinecap="round" strokeDasharray="2 6"/>
        <circle cx="60" cy="82" r="6" fill="#FFFFFF"/>
        <circle cx="50" cy="74" r="3.5" fill="#FFFFFF"/>
        <circle cx="70" cy="74" r="3.5" fill="#FFFFFF"/>
        <circle cx="60" cy="26" r="5" fill="#FEF08A"/>
      </svg>
    ),
  },
  {
    id: 'shield-guard',
    title: 'Концепт 2: «Оберег & Профиль Друзей»',
    subtitle: 'Символ безопасности и защиты',
    style: 'Emblem & Heraldic Modern',
    description: 'Форма защитного герба-жетона, внутри которого силуэты верного пса и грациозной кошки освещены теплым светом прожектора. Идеально для адресников и паспортов.',
    colors: [
      { name: 'Изумруд Про', hex: '#059669', bgClass: 'bg-emerald-600' },
      { name: 'Лазурный бриз', hex: '#0284C7', bgClass: 'bg-sky-600' },
      { name: 'Золотой маяк', hex: '#F59E0B', bgClass: 'bg-amber-500' },
    ],
    svgCode: `<svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g2" x1="10" y1="10" x2="110" y2="110" gradientUnits="userSpaceOnUse">
      <stop stop-color="#0284C7"/>
      <stop offset="1" stop-color="#059669"/>
    </linearGradient>
  </defs>
  <path d="M60 12L98 26V60C98 84 80 102 60 110C40 102 22 84 22 60V26L60 12Z" fill="url(#g2)" stroke="#FFFFFF" stroke-width="3"/>
  <!-- Lighthouse in Center -->
  <path d="M54 44L56 32H64L66 44" stroke="#FEF08A" stroke-width="3" stroke-linecap="round"/>
  <path d="M53 44H67L72 88H48L53 44Z" fill="#FFFFFF" fill-opacity="0.9"/>
  <circle cx="60" cy="36" r="4" fill="#FEF08A"/>
  <!-- Cat Silhouette Left -->
  <path d="M38 78C38 66 46 62 52 64C48 70 48 78 48 84" stroke="#FFFFFF" stroke-width="3.5" stroke-linecap="round"/>
  <!-- Dog Silhouette Right -->
  <path d="M82 78C82 66 74 60 68 64C72 70 72 78 72 84" stroke="#FFFFFF" stroke-width="3.5" stroke-linecap="round"/>
</svg>`,
    renderSvg: (isDark = false) => (
      <svg viewBox="0 0 120 120" fill="none" className="w-full h-full">
        <defs>
          <linearGradient id="c2-grad" x1="10" y1="10" x2="110" y2="110" gradientUnits="userSpaceOnUse">
            <stop stopColor="#0284C7"/>
            <stop offset="1" stopColor="#059669"/>
          </linearGradient>
        </defs>
        <path d="M60 12L98 26V60C98 84 80 102 60 110C40 102 22 84 22 60V26L60 12Z" fill="url(#c2-grad)" stroke="#FFFFFF" strokeWidth="3"/>
        <path d="M54 44L56 32H64L66 44" stroke="#FEF08A" strokeWidth="3" strokeLinecap="round"/>
        <path d="M53 44H67L72 88H48L53 44Z" fill="#FFFFFF" fillOpacity="0.9"/>
        <circle cx="60" cy="36" r="4" fill="#FEF08A"/>
        <path d="M38 78C38 66 46 62 52 64C48 70 48 78 48 84" stroke="#FFFFFF" strokeWidth="3.5" strokeLinecap="round"/>
        <path d="M82 78C82 66 74 60 68 64C72 70 72 78 72 84" stroke="#FFFFFF" strokeWidth="3.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    id: 'smart-beacon-qr',
    title: 'Концепт 3: «Умный QR-Маяк & Радар»',
    subtitle: 'Фокус на технологиях, чипах и GPS',
    style: 'High-Tech Digital Badge',
    description: 'Маяк объединен с радиоволнами сканера и цифровым QR-модулем. Подчеркивает технологичность сервиса, базу микрочипов и мгновенный поиск потерявшихся животных.',
    colors: [
      { name: 'Кибер Тиал', hex: '#0F766E', bgClass: 'bg-teal-700' },
      { name: 'Бирюзовый Неон', hex: '#06B6D4', bgClass: 'bg-cyan-500' },
      { name: 'Сияющий Янтарь', hex: '#FBBF24', bgClass: 'bg-amber-400' },
    ],
    svgCode: `<svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="120" height="120" rx="28" fill="#0F172A"/>
  <!-- Radar Wave Circles -->
  <circle cx="60" cy="40" r="32" stroke="#06B6D4" stroke-opacity="0.3" stroke-width="2" stroke-dasharray="3 3"/>
  <circle cx="60" cy="40" r="48" stroke="#06B6D4" stroke-opacity="0.15" stroke-width="2"/>
  <!-- Lighthouse Beacon -->
  <path d="M52 46H68L74 96H46L52 46Z" fill="#1E293B" stroke="#06B6D4" stroke-width="3"/>
  <!-- Glowing lamp -->
  <circle cx="60" cy="38" r="8" fill="#FBBF24" filter="drop-shadow(0 0 8px #FBBF24)"/>
  <!-- QR Mini Pattern on body -->
  <rect x="54" y="62" width="5" height="5" fill="#38BDF8"/>
  <rect x="61" y="62" width="5" height="5" fill="#38BDF8"/>
  <rect x="54" y="69" width="5" height="5" fill="#38BDF8"/>
  <rect x="61" y="76" width="5" height="5" fill="#38BDF8"/>
  <!-- Signal Radiating beams -->
  <path d="M60 38L96 20" stroke="#FBBF24" stroke-width="3" stroke-linecap="round"/>
  <path d="M60 38L24 20" stroke="#FBBF24" stroke-width="3" stroke-linecap="round"/>
</svg>`,
    renderSvg: (isDark = false) => (
      <svg viewBox="0 0 120 120" fill="none" className="w-full h-full">
        <rect width="120" height="120" rx="28" fill="#0F172A"/>
        <circle cx="60" cy="40" r="32" stroke="#06B6D4" strokeOpacity="0.3" strokeWidth="2" strokeDasharray="3 3"/>
        <circle cx="60" cy="40" r="48" stroke="#06B6D4" strokeOpacity="0.15" strokeWidth="2"/>
        <path d="M52 46H68L74 96H46L52 46Z" fill="#1E293B" stroke="#06B6D4" strokeWidth="3"/>
        <circle cx="60" cy="38" r="8" fill="#FBBF24"/>
        <rect x="54" y="62" width="5" height="5" fill="#38BDF8"/>
        <rect x="61" y="62" width="5" height="5" fill="#38BDF8"/>
        <rect x="54" y="69" width="5" height="5" fill="#38BDF8"/>
        <rect x="61" y="76" width="5" height="5" fill="#38BDF8"/>
        <path d="M60 38L96 20" stroke="#FBBF24" strokeWidth="3" strokeLinecap="round"/>
        <path d="M60 38L24 20" stroke="#FBBF24" strokeWidth="3" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    id: 'heart-caring-line',
    title: 'Концепт 4: «Сердце & Забота»',
    subtitle: 'Утонченный лайн-арт контур',
    style: 'Continuous Line Art',
    description: 'Мягкий, душевный логотип в стиле премиальных ветеринарных клиник. Плавная линия очерчивает контур сердца, внутри которого уютно разместились маяк и питомец.',
    colors: [
      { name: 'Тёплый Изумруд', hex: '#047857', bgClass: 'bg-emerald-700' },
      { name: 'Персиковый свет', hex: '#FDE68A', bgClass: 'bg-amber-200' },
      { name: 'Белый шелк', hex: '#FFFFFF', bgClass: 'bg-white' },
    ],
    svgCode: `<svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
  <circle cx="60" cy="60" r="54" fill="#ECFDF5" stroke="#10B981" stroke-width="3"/>
  <!-- Heart contour -->
  <path d="M60 92C60 92 26 70 26 46C26 34 35 25 46 25C52 25 57 28 60 32C63 28 68 25 74 25C85 25 94 34 94 46C94 70 60 92 60 92Z" stroke="#047857" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
  <!-- Lighthouse inside -->
  <path d="M55 42H65L68 76H52L55 42Z" fill="#047857" fill-opacity="0.15" stroke="#047857" stroke-width="3"/>
  <circle cx="60" cy="38" r="4" fill="#F59E0B"/>
</svg>`,
    renderSvg: (isDark = false) => (
      <svg viewBox="0 0 120 120" fill="none" className="w-full h-full">
        <circle cx="60" cy="60" r="54" fill="#ECFDF5" stroke="#10B981" strokeWidth="3"/>
        <path d="M60 92C60 92 26 70 26 46C26 34 35 25 46 25C52 25 57 28 60 32C63 28 68 25 74 25C85 25 94 34 94 46C94 70 60 92 60 92Z" stroke="#047857" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M55 42H65L68 76H52L55 42Z" fill="#047857" fillOpacity="0.15" stroke="#047857" strokeWidth="3"/>
        <circle cx="60" cy="38" r="4" fill="#F59E0B"/>
      </svg>
    ),
  },
  {
    id: 'app-icon-glossy',
    title: 'Концепт 5: «3D Иконка Приложения»',
    subtitle: 'Премиальный глянец для App Store / Google Play',
    style: 'Modern 3D Neomorphic App Icon',
    description: 'Яркая, сочная иконка приложения. Смягченные углы, глубокий градиент и контрастный маячный свет, привлекающий внимание на экране смартфона.',
    colors: [
      { name: 'Бирюза AppStore', hex: '#0D9488', bgClass: 'bg-teal-600' },
      { name: 'Глубокий Синий', hex: '#1E1B4B', bgClass: 'bg-indigo-950' },
      { name: 'Солнечный луч', hex: '#FACC15', bgClass: 'bg-yellow-400' },
    ],
    svgCode: `<svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g5" x1="0" y1="0" x2="120" y2="120" gradientUnits="userSpaceOnUse">
      <stop stop-color="#0F766E"/>
      <stop offset="0.5" stop-color="#0D9488"/>
      <stop offset="1" stop-color="#042F2E"/>
    </linearGradient>
  </defs>
  <rect width="120" height="120" rx="30" fill="url(#g5)"/>
  <!-- 3D top shine -->
  <path d="M20 10H100C105 10 110 15 110 20V45C80 35 40 40 10 60V20C10 15 15 10 20 10Z" fill="#FFFFFF" fill-opacity="0.12"/>
  <!-- Lighthouse Beacon Tower -->
  <path d="M54 34L56 22H64L66 34" stroke="#FFFFFF" stroke-width="3.5" stroke-linecap="round"/>
  <path d="M52 34H68L74 94H46L52 34Z" fill="#FFFFFF" stroke="#FFFFFF" stroke-width="3"/>
  <path d="M50 52H70M48 70H72" stroke="#0F766E" stroke-width="4"/>
  <!-- Golden Glowing Bulb -->
  <circle cx="60" cy="26" r="6" fill="#FACC15"/>
  <!-- Ray Cones -->
  <polygon points="60,26 114,14 110,48" fill="#FDE047" fill-opacity="0.35"/>
  <polygon points="60,26 6,14 10,48" fill="#FDE047" fill-opacity="0.35"/>
</svg>`,
    renderSvg: (isDark = false) => (
      <svg viewBox="0 0 120 120" fill="none" className="w-full h-full">
        <defs>
          <linearGradient id="c5-grad" x1="0" y1="0" x2="120" y2="120" gradientUnits="userSpaceOnUse">
            <stop stopColor="#0F766E"/>
            <stop offset="0.5" stopColor="#0D9488"/>
            <stop offset="1" stopColor="#042F2E"/>
          </linearGradient>
        </defs>
        <rect width="120" height="120" rx="30" fill="url(#c5-grad)"/>
        <path d="M20 10H100C105 10 110 15 110 20V45C80 35 40 40 10 60V20C10 15 15 10 20 10Z" fill="#FFFFFF" fillOpacity="0.12"/>
        <path d="M54 34L56 22H64L66 34" stroke="#FFFFFF" strokeWidth="3.5" strokeLinecap="round"/>
        <path d="M52 34H68L74 94H46L52 34Z" fill="#FFFFFF" stroke="#FFFFFF" strokeWidth="3"/>
        <path d="M50 52H70M48 70H72" stroke="#0F766E" strokeWidth="4"/>
        <circle cx="60" cy="26" r="6" fill="#FACC15"/>
        <polygon points="60,26 114,14 110,48" fill="#FDE047" fillOpacity="0.35"/>
        <polygon points="60,26 6,14 10,48" fill="#FDE047" fillOpacity="0.35"/>
      </svg>
    ),
  },
];

export const LogoShowcaseModal: React.FC<LogoShowcaseModalProps> = ({
  isOpen,
  onClose,
  onSelectAppLogo,
  selectedLogoId = 'beacon-paw',
}) => {
  const [activeLogo, setActiveLogo] = useState<LogoConcept>(LOGO_CONCEPTS[0]);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleCopySvg = (concept: LogoConcept) => {
    navigator.clipboard.writeText(concept.svgCode);
    setCopiedId(concept.id);
    confetti({ particleCount: 30 });
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleDownloadSvg = (concept: LogoConcept) => {
    const blob = new Blob([concept.svgCode], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `zoomayak-logo-${concept.id}.svg`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    confetti({ particleCount: 40 });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md overflow-y-auto">
      <div 
        className="relative w-full max-w-4xl bg-white border border-slate-200 rounded-3xl shadow-2xl overflow-hidden my-6 animate-in zoom-in-95 text-left"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header */}
        <div className="bg-gradient-to-r from-teal-700 via-teal-800 to-emerald-800 px-6 py-4 border-b border-teal-600/30 flex items-center justify-between text-white shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/15 backdrop-blur-xs border border-white/25 flex items-center justify-center text-emerald-300 shadow-inner">
              <Palette className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-black text-white tracking-tight">
                Подборка фирменных логотипов «ЗооМаяк»
              </h3>
              <p className="text-xs text-teal-100/90 font-medium">
                5 авторских дизайн-концептов с векторными исходниками и палитрами
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
        <div className="p-6 sm:p-8 space-y-6 max-h-[80vh] overflow-y-auto bg-slate-50/50">
          
          {/* Logo Selector Grid */}
          <div>
            <span className="text-xs font-black uppercase tracking-wider text-slate-700 block mb-3">
              Выберите концепцию для детального просмотра:
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
              {LOGO_CONCEPTS.map((concept) => (
                <button
                  key={concept.id}
                  onClick={() => setActiveLogo(concept)}
                  className={`p-3 rounded-2xl border transition-all flex flex-col items-center gap-2.5 text-center cursor-pointer ${
                    activeLogo.id === concept.id
                      ? 'bg-teal-50 border-teal-500 shadow-md ring-2 ring-teal-500/20'
                      : 'bg-white border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="w-16 h-16 rounded-2xl p-1 bg-white shadow-xs border border-slate-100 flex items-center justify-center">
                    {concept.renderSvg()}
                  </div>
                  <div className="text-[11px] font-bold text-slate-800 leading-tight">
                    {concept.title.split(':')[1] || concept.title}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Active Logo Detailed Spotlight */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            
            {/* Left: Big Preview Cards (Light and Dark backdrops) */}
            <div className="md:col-span-5 space-y-4">
              <div className="p-8 rounded-3xl bg-slate-50 border border-slate-200 flex flex-col items-center justify-center shadow-inner">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-4">
                  Светлый фон
                </span>
                <div className="w-36 h-36 drop-shadow-md">
                  {activeLogo.renderSvg(false)}
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                <span className="text-[10px] font-mono text-slate-400">На темном фоне / App Icon:</span>
                <div className="w-10 h-10">
                  {activeLogo.renderSvg(true)}
                </div>
              </div>
            </div>

            {/* Right: Description & Specs */}
            <div className="md:col-span-7 space-y-5 text-left">
              <div>
                <span className="px-2.5 py-1 rounded-full bg-teal-50 text-teal-800 text-[10px] font-extrabold border border-teal-200 uppercase">
                  {activeLogo.style}
                </span>
                <h4 className="text-2xl font-black text-slate-900 mt-2">
                  {activeLogo.title}
                </h4>
                <p className="text-sm text-slate-600 font-medium mt-2 leading-relaxed">
                  {activeLogo.description}
                </p>
              </div>

              {/* Color Palette */}
              <div>
                <span className="text-xs font-black uppercase tracking-wider text-slate-700 block mb-2">
                  Фирменная палитра концепта:
                </span>
                <div className="flex flex-wrap gap-2">
                  {activeLogo.colors.map((c, i) => (
                    <div 
                      key={i}
                      className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200"
                    >
                      <span className={`w-4 h-4 rounded-full ${c.bgClass} shadow-xs`}></span>
                      <span className="text-xs font-bold text-slate-800">{c.name}</span>
                      <span className="text-[10px] font-mono text-slate-500">{c.hex}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="pt-4 border-t border-slate-100 flex flex-wrap gap-3">
                <button
                  onClick={() => handleDownloadSvg(activeLogo)}
                  className="flex-1 py-3 px-4 rounded-2xl bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-500 hover:to-emerald-500 text-white font-extrabold text-xs shadow-md shadow-teal-600/20 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>Скачать векторный SVG</span>
                </button>

                <button
                  onClick={() => handleCopySvg(activeLogo)}
                  className="py-3 px-4 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs flex items-center justify-center gap-2 transition cursor-pointer border border-slate-200"
                >
                  {copiedId === activeLogo.id ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-600" />
                      <span className="text-emerald-700">Скопировано!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      <span>Скопировать SVG</span>
                    </>
                  )}
                </button>
              </div>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
