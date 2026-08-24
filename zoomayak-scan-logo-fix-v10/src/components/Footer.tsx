import React from 'react';
import { 
  Heart, 
  ShieldCheck, 
  Phone, 
  Mail, 
  Sparkles, 
  QrCode, 
  Compass,
  FileText
} from 'lucide-react';
import { ActiveNavTab } from '../types';
import { ZoomayakLogo } from './ZoomayakLogo';

interface FooterProps {
  onSelectTab: (tab: ActiveNavTab) => void;
  onOpenPassport: () => void;
  onOpenCollarStudio: () => void;
  onOpenScanModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onSelectTab,
  onOpenPassport,
  onOpenCollarStudio,
  onOpenScanModal,
}) => {
  return (
    <footer className="mt-20 border-t border-slate-800/80 bg-slate-950/95 relative overflow-hidden text-left">
      
      {/* Ambient background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-gradient-to-t from-teal-500/10 to-transparent blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          
          {/* Col 1: Brand */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-2.5">
              <ZoomayakLogo />
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Единый цифровой профиль и экосистема заботы о питомцах. Международная интеграция ветпаспортов, поиск потеряшек и умные QR-адресники.
            </p>
            <div className="flex items-center gap-2 text-xs text-emerald-400 font-semibold">
              <ShieldCheck className="w-4 h-4" />
              <span>ISO 11784 / 11785 Совместимость</span>
            </div>
          </div>

          {/* Col 2: Ecosystem */}
          <div>
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-300 mb-4">
              Экосистема
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <button onClick={() => onSelectTab('account')} className="hover:text-teal-300 transition cursor-pointer">
                  Цифровые профили питомцев
                </button>
              </li>
              <li>
                <button onClick={onOpenPassport} className="hover:text-teal-300 transition cursor-pointer">
                  Ветеринарный паспорт онлайн
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('account')} className="hover:text-teal-300 transition cursor-pointer">
                  Календарь вакцинации и заботы
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('account')} className="hover:text-teal-300 transition cursor-pointer">
                  Электронная медкарта
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Services & Tools */}
          <div>
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-300 mb-4">
              Сервисы & Жетон
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <button onClick={onOpenCollarStudio} className="hover:text-teal-300 transition cursor-pointer">
                  Конструктор QR-адресника
                </button>
              </li>
              <li>
                <button onClick={onOpenScanModal} className="hover:text-teal-300 transition cursor-pointer">
                  Сканер микрочипа и QR
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('lost')} className="hover:text-rose-400 transition cursor-pointer">
                  Потеряшка SOS & Радар
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('services')} className="hover:text-teal-300 transition cursor-pointer">
                  Проверенные ветклиники и груминг
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Support & 24/7 Hotline */}
          <div className="space-y-3">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-300 mb-4">
              Круглосуточная помощь 24/7
            </h4>
            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
              <div className="text-[11px] text-slate-400 mb-1">Экстренная вет-линия:</div>
              <a href="tel:+74951209000" className="text-base font-extrabold text-teal-300 hover:underline block">
                +7 (495) 120-90-00
              </a>
              <div className="text-[10px] text-slate-500 mt-1">Бесплатно по всей России</div>
            </div>
            <div className="text-xs text-slate-400 flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-teal-400" />
              <span>support@zoomayak.ru</span>
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © 2026 ЗооМаяк. Все права защищены.
          </div>
          <div className="flex items-center gap-4">
            <span className="hover:text-slate-300 cursor-pointer">Политика конфиденциальности</span>
            <span>•</span>
            <span className="hover:text-slate-300 cursor-pointer">Пользовательское соглашение</span>
            <span>•</span>
            <span className="hover:text-slate-300 cursor-pointer">API для ветеринаров</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
