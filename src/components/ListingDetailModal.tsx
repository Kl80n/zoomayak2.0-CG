import React, { useState, useEffect } from 'react';
import { 
  X, 
  MapPin, 
  Phone, 
  ShieldCheck, 
  Share2, 
  Heart, 
  ExternalLink, 
  Check, 
  AlertTriangle, 
  Clock, 
  Star, 
  Send,
  MessageCircle,
  FileCheck2,
  Sparkles,
  Info,
  FileText
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { AnimalListing, ServiceListing } from '../types';
import { SalesContractModal } from './SalesContractModal';
import { SourceBadge } from './SourceBadge';

interface ListingDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  listing?: AnimalListing | null;
  service?: ServiceListing | null;
  isFavorite?: boolean;
  onToggleFavorite?: (id: string) => void;
}

export const ListingDetailModal: React.FC<ListingDetailModalProps> = ({
  isOpen,
  onClose,
  listing,
  service,
  isFavorite: externalIsFavorite,
  onToggleFavorite,
}) => {
  const [internalFavorite, setInternalFavorite] = useState(false);
  const isFavorite = externalIsFavorite !== undefined ? externalIsFavorite : internalFavorite;
  const [copied, setCopied] = useState(false);
  const [contacted, setContacted] = useState(false);
  const [isContractOpen, setIsContractOpen] = useState(false);

  if (!isOpen || (!listing && !service)) return null;

  const currentId = listing?.id || service?.id || '';

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleToggleFavorite = () => {
    if (onToggleFavorite && currentId) {
      onToggleFavorite(currentId);
    } else {
      setInternalFavorite(prev => !prev);
    }
    if (!isFavorite) {
      confetti({ particleCount: 25, spread: 50, origin: { y: 0.7 } });
    }
  };

  const isAnimal = Boolean(listing);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  return (
    <>
      <div 
        className="fixed inset-0 z-[75] flex items-center justify-center p-3 sm:p-5 bg-slate-950/80 backdrop-blur-xl overflow-y-auto cursor-pointer"
        onClick={onClose}
      >
        <div 
          className="relative w-full max-w-2xl bg-white dark:bg-slate-900 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl overflow-hidden my-4 text-left animate-in fade-in zoom-in-95 duration-200 cursor-default"
          onClick={e => e.stopPropagation()}
        >
          {/* Top Header Bar */}
          <div className="relative h-48 sm:h-72 w-full overflow-hidden bg-slate-950">
            <img 
              src={isAnimal ? listing?.imageUrl : service?.imageUrl} 
              alt={isAnimal ? listing?.title : service?.title} 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-black/35 pointer-events-none" />

            {/* Floating actions at top */}
            <div className="absolute top-3 sm:top-4 left-3 sm:left-4 right-3 sm:right-4 flex items-center justify-between z-20">
              <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap max-w-[65%]">
                <SourceBadge 
                  source={isAnimal ? (listing?.source || 'ЗооМаяк') : 'ЗооМаяк'} 
                  size="md" 
                  className="!shadow-lg !border-white/30"
                />
                {(listing?.verified || service?.rating) && (
                  <span className="px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-lg bg-emerald-600/95 backdrop-blur-md text-white font-extrabold text-[11px] sm:text-xs flex items-center gap-1 shadow-lg border border-emerald-400/40 whitespace-nowrap">
                    <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-200" /> Проверено
                  </span>
                )}
              </div>

              <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
                <button 
                  type="button"
                  onClick={handleToggleFavorite}
                  className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl backdrop-blur-md flex items-center justify-center transition shadow-lg cursor-pointer ${
                    isFavorite 
                      ? 'bg-rose-500 text-white border border-rose-400 shadow-rose-500/30 scale-105' 
                      : 'bg-white/90 hover:bg-white text-slate-800 border border-white/40 hover:scale-105'
                  }`}
                  aria-label="В избранное"
                  title={isFavorite ? 'Удалить из избранного' : 'Добавить в избранное'}
                >
                  <Heart className={`w-4 h-4 sm:w-5 sm:h-5 ${isFavorite ? 'fill-white text-white' : 'text-slate-700'}`} strokeWidth={2.2} />
                </button>
                <button 
                  type="button"
                  onClick={handleShare}
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-white/90 hover:bg-white text-slate-800 border border-white/40 flex items-center justify-center shadow-lg hover:scale-105 transition cursor-pointer"
                  aria-label="Поделиться"
                  title="Скопировать ссылку"
                >
                  {copied ? <Check className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600 stroke-[2.5]" /> : <Share2 className="w-4 h-4 sm:w-5 sm:h-5 text-slate-700 stroke-[2.2]" />}
                </button>
                <button 
                  type="button"
                  onClick={onClose}
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-white/90 hover:bg-rose-500 hover:text-white text-slate-800 border border-white/40 flex items-center justify-center shadow-lg hover:scale-105 transition cursor-pointer group"
                  aria-label="Закрыть"
                  title="Закрыть"
                >
                  <X className="w-4 h-4 sm:w-5 sm:h-5 text-slate-700 group-hover:text-white stroke-[2.5]" />
                </button>
              </div>
            </div>

            {/* Title & price overlay at bottom of image */}
            <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 z-10 bg-gradient-to-t from-slate-950 via-slate-950/85 to-transparent">
              <div className="flex items-end justify-between gap-3">
                <div className="min-w-0 flex-1">
                  <h2 
                    className="text-xl sm:text-3xl font-black drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)] tracking-tight leading-tight m-0 line-clamp-2"
                    style={{ color: '#ffffff' }}
                  >
                    {isAnimal ? listing?.title : service?.title}
                  </h2>
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 mt-1 sm:mt-2 text-xs font-semibold drop-shadow" style={{ color: '#f1f5f9' }}>
                    <span className="flex items-center gap-1 text-slate-100 truncate">
                      <MapPin className="w-3.5 h-3.5 text-teal-300 shrink-0" /> 
                      {isAnimal ? listing?.city : `${service?.address} · ${service?.district}`}
                    </span>
                    <span className="text-slate-400 hidden sm:inline">•</span>
                    <span className="text-slate-200 text-[11px] sm:text-xs">{isAnimal ? listing?.publishedAt : service?.openHours}</span>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <span className="text-[10px] sm:text-[11px] block font-bold uppercase tracking-wider text-slate-200 drop-shadow mb-0.5" style={{ color: '#e2e8f0' }}>
                    Стоимость
                  </span>
                  <span 
                    className="text-xl sm:text-3xl font-black drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)] whitespace-nowrap" 
                    style={{ color: '#34d399' }}
                  >
                    {isAnimal 
                      ? (listing?.price ? `${listing.price.toLocaleString('ru-RU')} ₽` : 'Бесплатно')
                      : `от ${service?.priceFrom.toLocaleString('ru-RU')} ₽`}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Modal Body Content */}
          <div className="p-4 sm:p-7 space-y-4 sm:space-y-6 max-h-[55vh] sm:max-h-[60vh] overflow-y-auto">
            {/* Key Parameters Chips */}
            {isAnimal && listing && (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-2.5">
                <div className="p-2.5 sm:p-3 rounded-2xl bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800">
                  <span className="text-[10px] uppercase font-bold text-slate-500 dark:text-slate-400 block">Порода</span>
                  <strong className="text-xs text-slate-900 dark:text-white font-bold block mt-0.5 truncate">{listing.breed}</strong>
                </div>
                <div className="p-2.5 sm:p-3 rounded-2xl bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800">
                  <span className="text-[10px] uppercase font-bold text-slate-500 dark:text-slate-400 block">Возраст</span>
                  <strong className="text-xs text-slate-900 dark:text-white font-bold block mt-0.5">{listing.age}</strong>
                </div>
                <div className="p-2.5 sm:p-3 rounded-2xl bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800">
                  <span className="text-[10px] uppercase font-bold text-slate-500 dark:text-slate-400 block">Пол</span>
                  <strong className="text-xs text-slate-900 dark:text-white font-bold block mt-0.5">
                    {listing.sex === 'female' ? 'Девочка ♀' : 'Мальчик ♂'}
                  </strong>
                </div>
                <div className="p-2.5 sm:p-3 rounded-2xl bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800 flex flex-col justify-between">
                  <span className="text-[10px] uppercase font-bold text-slate-500 dark:text-slate-400 block">Источник</span>
                  <div className="mt-1">
                    <SourceBadge source={listing.source} size="sm" />
                  </div>
                </div>
              </div>
            )}

            {/* Service Rating & Specs */}
            {!isAnimal && service && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-2.5">
                <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center gap-3">
                  <div className="w-14 h-14 rounded-xl bg-amber-500 text-white flex items-center justify-center font-black">
                    <Star className="w-5 h-5 fill-current" />
                  </div>
                  <div>
                    <div className="text-sm font-black text-slate-900 dark:text-white">{service.rating} из 5.0</div>
                    <span className="text-[10px] text-slate-500 dark:text-slate-400">{service.reviewsCount} отзывов клиентов</span>
                  </div>
                </div>
                <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800 flex items-center gap-3">
                  <Clock className="w-5 h-5 text-teal-600 dark:text-teal-400 shrink-0" />
                  <div className="min-w-0">
                    <div className="text-xs font-bold text-slate-900 dark:text-white">Часы работы</div>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400 truncate block">{service.openHours}</span>
                  </div>
                </div>
                <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800 flex items-center gap-3">
                  <ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <div className="min-w-0">
                    <div className="text-xs font-bold text-slate-900 dark:text-white">Лицензия</div>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400 truncate block">Сертифицировано ZM</span>
                  </div>
                </div>
              </div>
            )}

            {/* Description Section */}
            <div>
              <h4 className="text-xs uppercase font-extrabold tracking-wider text-slate-500 dark:text-slate-400 mb-2">
                Описание и подробности
              </h4>
              <div className="p-3.5 sm:p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 text-sm text-slate-700 dark:text-slate-300 leading-relaxed space-y-2">
                <p>{isAnimal ? listing?.description : service?.description}</p>
                {isAnimal && (
                  <p className="text-xs text-slate-500 dark:text-slate-400 pt-2 border-t border-slate-200 dark:border-slate-800/80">
                    Питомец социально адаптирован, приучен к порядку и готов к переезду в заботливую семью.
                  </p>
                )}
              </div>
            </div>

            {/* Health & Documents Checklist (for animals) */}
            {isAnimal && (
              <div>
                <div className="flex flex-wrap items-center justify-between gap-1 mb-2">
                  <h4 className="text-xs uppercase font-extrabold tracking-wider text-slate-500 dark:text-slate-400">
                    Документы и ветеринарный статус
                  </h4>
                  <button
                    onClick={() => setIsContractOpen(true)}
                    className="text-xs font-bold text-teal-600 dark:text-teal-400 hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <FileText className="w-3.5 h-3.5" /> Бланк договора →
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <div className="p-2.5 sm:p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center gap-2.5 text-xs text-emerald-900 dark:text-emerald-300 font-bold">
                    <FileCheck2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                    <span>Ветеринарный паспорт с отметками</span>
                  </div>
                  <div className="p-2.5 sm:p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center gap-2.5 text-xs text-emerald-900 dark:text-emerald-300 font-bold">
                    <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                    <span>Прививки и дегельминтизация по возрасту</span>
                  </div>
                  <div className="p-2.5 sm:p-3 rounded-2xl bg-teal-500/10 border border-teal-500/20 flex items-center gap-2.5 text-xs text-teal-900 dark:text-teal-300 font-bold">
                    <Sparkles className="w-4 h-4 text-teal-600 dark:text-teal-400 shrink-0" />
                    <span>Поддержка регистрации в ЗооМаяк</span>
                  </div>
                  <button 
                    onClick={() => setIsContractOpen(true)}
                    className="p-2.5 sm:p-3 rounded-2xl bg-teal-500/15 hover:bg-teal-500/25 border border-teal-500/30 flex items-center justify-between gap-2.5 text-xs text-teal-900 dark:text-teal-200 font-bold transition text-left cursor-pointer"
                  >
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-teal-600 dark:text-teal-400 shrink-0" />
                      <span>Типовой договор купли-продажи</span>
                    </div>
                    <span className="text-[10px] bg-teal-500 text-white px-2 py-0.5 rounded-full">Открыть</span>
                  </button>
                </div>
              </div>
            )}

            {/* Safety Warning */}
            <div className="p-3.5 sm:p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-start gap-2.5 sm:gap-3">
              <AlertTriangle className="w-4 h-4 sm:w-5 sm:h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
              <div className="text-[11px] sm:text-xs text-amber-900 dark:text-amber-200 leading-relaxed">
                <strong>Правило безопасности ЗооМаяка:</strong> Никогда не переводите предоплату до личной встречи с продавцом и осмотра питомца. Обязательно подписывайте договор купли-продажи и оформляйте цифровой QR-паспорт в ЗооМаяке.
              </div>
            </div>
          </div>

          {/* Modal Foot Actions */}
          <div className="p-3.5 sm:p-5 bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 sm:gap-3">
            <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
              {isAnimal && (
                <button
                  onClick={() => setIsContractOpen(true)}
                  className="px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-xl bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold text-xs flex items-center gap-1.5 transition cursor-pointer"
                >
                  <FileText className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                  <span>Договор</span>
                </button>
              )}
              {isAnimal && listing?.sourceUrl && listing.sourceUrl !== '#' && (
                <a
                  href={listing.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-2 sm:px-3.5 sm:py-2.5 rounded-xl bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold text-xs flex items-center gap-1.5 transition cursor-pointer border border-slate-300 dark:border-slate-700"
                  title={`Перейти к оригинальному объявлению на ${listing.source}`}
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>На {listing.source}</span>
                </a>
              )}
              <span className="text-xs text-slate-500 dark:text-slate-400 hidden lg:inline">
                {contacted ? 'Контакт сохранен' : 'Прямая связь'}
              </span>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <a
                href={isAnimal ? 'tel:+79991234567' : `tel:${service?.phone}`}
                onClick={() => setContacted(true)}
                className="flex-1 sm:flex-initial px-5 sm:px-6 py-2.5 sm:py-3 rounded-2xl bg-teal-500 hover:bg-teal-600 text-white font-extrabold text-xs flex items-center justify-center gap-2 shadow-md shadow-teal-500/20 transition cursor-pointer"
              >
                <Phone className="w-4 h-4" /> Позвонить
              </a>

              <button
                onClick={() => {
                  alert('Чат с продавцом открыт в защищенном канале ЗооМаяка.');
                  setContacted(true);
                }}
                className="flex-1 sm:flex-initial px-4 sm:px-5 py-2.5 sm:py-3 rounded-2xl bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-extrabold text-xs flex items-center justify-center gap-2 transition cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 text-teal-600 dark:text-teal-400" /> Написать
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Embedded Sales Contract Modal */}
      {isContractOpen && (
        <SalesContractModal
          isOpen={isContractOpen}
          onClose={() => setIsContractOpen(false)}
          listing={listing}
        />
      )}
    </>
  );
};
