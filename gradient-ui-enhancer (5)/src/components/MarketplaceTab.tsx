import React, { useState } from 'react';
import { 
  ShoppingBag, 
  Search, 
  Star, 
  MapPin, 
  Phone, 
  Clock, 
  ShieldCheck, 
  Sparkles, 
  Check, 
  Calendar,
  Filter
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { ServiceListing } from '../types';

interface MarketplaceTabProps {
  services: ServiceListing[];
}

export const MarketplaceTab: React.FC<MarketplaceTabProps> = ({ services }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [bookingService, setBookingService] = useState<ServiceListing | null>(null);
  const [bookingSuccess, setBookingSuccess] = useState(false);

  const filtered = services.filter((srv) => {
    if (selectedCategory !== 'all' && srv.category !== selectedCategory) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        srv.title.toLowerCase().includes(q) ||
        srv.address.toLowerCase().includes(q) ||
        srv.description.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    confetti({ particleCount: 50 });
    setBookingSuccess(true);
    setTimeout(() => {
      setBookingSuccess(false);
      setBookingService(null);
    }, 1500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-in fade-in duration-300 text-left">
      
      {/* Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gradient-to-r from-indigo-50 via-white to-teal-50 p-6 rounded-3xl border border-indigo-200 shadow-sm">
        <div>
          <div className="flex items-center gap-2 text-indigo-800 text-xs font-extrabold uppercase tracking-wider mb-1">
            <ShoppingBag className="w-4 h-4" />
            <span>Проверенные сервисы и специалисты</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
            Объявления и услуги для питомцев
          </h2>
          <p className="text-sm text-slate-600 mt-1 font-medium">
            Круглосуточные ветеринарные центры, груминг-салоны, зоогостиницы и кинологи с рейтингом 4.8+.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-2xl border border-slate-200 text-xs text-teal-800 font-bold shadow-xs">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>Все специалисты проверены ЗооМаяк</span>
        </div>
      </div>

      {/* Search and Category Filters */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-3 rounded-2xl border border-slate-200 shadow-xs">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Поиск клиники, грумера, гостиницы или услуги..."
            className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2 text-xs text-slate-900 placeholder:text-slate-400 focus:border-indigo-500 focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
          {[
            { id: 'all', label: 'Все' },
            { id: 'vet', label: 'Ветклиники' },
            { id: 'grooming', label: 'Груминг' },
            { id: 'hotel', label: 'Зоогостиницы' },
            { id: 'training', label: 'Дрессировка' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-indigo-600 text-white shadow-xs font-extrabold'
                  : 'bg-slate-100 text-slate-600 hover:text-slate-900 hover:bg-slate-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filtered.map((service) => (
          <div
            key={service.id}
            className="p-6 rounded-3xl bg-white border border-slate-200 hover:border-indigo-300 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <div className="relative mb-4">
                <img
                  src={service.imageUrl}
                  alt={service.title}
                  className="w-full h-44 rounded-2xl object-cover ring-1 ring-slate-200"
                />
                <div className="absolute top-3 right-3 px-3 py-1 rounded-xl bg-white/95 text-slate-900 font-bold text-xs flex items-center gap-1 border border-slate-200 shadow-sm">
                  <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                  <span>{service.rating}</span>
                  <span className="text-slate-500 text-[10px]">({service.reviewsCount})</span>
                </div>

                {service.verified && (
                  <div className="absolute bottom-3 left-3 px-2.5 py-1 rounded-lg bg-teal-50 text-teal-800 font-bold text-xs flex items-center gap-1 border border-teal-200 shadow-xs">
                    <ShieldCheck className="w-3.5 h-3.5 text-teal-600" />
                    <span>Верифицировано</span>
                  </div>
                )}
              </div>

              <h4 className="text-xl font-black text-slate-900 mb-1">
                {service.title}
              </h4>
              
              <p className="text-xs text-slate-600 line-clamp-2 mb-3 font-medium">
                {service.description}
              </p>

              {/* Badges */}
              <div className="flex flex-wrap gap-1.5 mb-4">
                {service.badges.map((b, i) => (
                  <span key={i} className="text-[11px] font-bold px-2.5 py-0.5 rounded-lg bg-indigo-50 text-indigo-700 border border-indigo-100">
                    {b}
                  </span>
                ))}
              </div>

              {/* Address and Hours */}
              <div className="space-y-1 text-xs text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-200 mb-4 font-medium">
                <div className="flex items-center gap-1.5 text-slate-800">
                  <MapPin className="w-3.5 h-3.5 text-indigo-600" />
                  <span>{service.address} ({service.district})</span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-600">
                  <Clock className="w-3.5 h-3.5 text-teal-600" />
                  <span>{service.openHours}</span>
                </div>
              </div>
            </div>

            {/* Bottom Row: Price & Action */}
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              <div>
                <div className="text-[10px] uppercase font-bold text-slate-400">Стоимость от</div>
                <div className="text-lg font-black text-slate-900">
                  {service.priceFrom} <span className="text-xs font-semibold text-slate-500">{service.priceUnit}</span>
                </div>
              </div>

              <div className="flex gap-2">
                <a
                  href={`tel:${service.phone}`}
                  className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition"
                  title="Позвонить"
                >
                  <Phone className="w-4 h-4" />
                </a>

                <button
                  onClick={() => setBookingService(service)}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-teal-600 hover:from-indigo-500 hover:to-teal-500 text-white font-extrabold text-xs shadow-md transition cursor-pointer"
                >
                  Записаться онлайн
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Booking Modal */}
      {bookingService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl animate-in zoom-in-95">
            <h3 className="text-xl font-black text-slate-900 mb-2">
              Запись в {bookingService.title}
            </h3>
            <p className="text-xs text-slate-500 mb-4 font-medium">
              Автоматическая передача данных ветпаспорта из ЗооМаяк
            </p>

            <form onSubmit={handleBooking} className="space-y-3.5 text-left">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Ваше имя и телефон
                </label>
                <input
                  type="text"
                  required
                  defaultValue="Алексей (+7 999 450-88-21)"
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-sm text-slate-900 focus:border-indigo-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Питомец
                </label>
                <input
                  type="text"
                  readOnly
                  value="Барни (Золотистый ретривер, ZM-7X3B-9K2D)"
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-sm text-teal-800 font-mono font-bold"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Желаемая дата
                  </label>
                  <input
                    type="date"
                    required
                    defaultValue={new Date().toISOString().split('T')[0]}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-sm text-slate-900 focus:border-indigo-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Время
                  </label>
                  <input
                    type="time"
                    required
                    defaultValue="14:00"
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-sm text-slate-900 focus:border-indigo-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="pt-3 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setBookingService(null)}
                  className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 text-xs font-bold cursor-pointer hover:bg-slate-200"
                >
                  Отмена
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold text-xs shadow-md cursor-pointer"
                >
                  {bookingSuccess ? 'Отправлено!' : 'Подтвердить запись'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
