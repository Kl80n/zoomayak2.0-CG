import React, { useState } from 'react';
import { 
  Radio, 
  AlertTriangle, 
  MapPin, 
  Phone, 
  Plus, 
  Printer, 
  Share2, 
  Sparkles, 
  CheckCircle, 
  Eye, 
  Navigation,
  Compass,
  FileDown
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { LostAlert, Pet } from '../types';

interface LostPetSOSTabProps {
  lostAlerts: LostAlert[];
  pets: Pet[];
  onAddLostAlert: (alert: LostAlert) => void;
  onOpenSOSModal: () => void;
}

export const LostPetSOSTab: React.FC<LostPetSOSTabProps> = ({
  lostAlerts,
  pets,
  onAddLostAlert,
  onOpenSOSModal,
}) => {
  const [selectedAlertForPoster, setSelectedAlertForPoster] = useState<LostAlert | null>(null);

  const handlePrintPoster = (alertItem: LostAlert) => {
    setSelectedAlertForPoster(alertItem);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-in fade-in duration-300 text-left">
      
      {/* High Alert Hero Banner */}
      <div className="relative overflow-hidden bg-gradient-to-r from-rose-50 via-white to-amber-50 p-6 sm:p-8 rounded-3xl border-2 border-rose-200 shadow-sm">
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-100 text-rose-800 border border-rose-200 text-xs font-black uppercase tracking-wider mb-3">
              <span className="w-2 h-2 rounded-full bg-rose-600 animate-ping"></span>
              <span>Федеральный поисковый радар ЗооМаяк</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 leading-tight">
              Потеряшка SOS: Экстренный поиск животных
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-2 font-medium">
              При активации сигнала SOS уведомления рассылаются волонтерам, клиникам и пользователям в радиусе 10 км. QR-адресник на ошейнике передает GPS координаты при сканировании.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={onOpenSOSModal}
              className="px-6 py-4 rounded-2xl bg-gradient-to-r from-rose-600 via-red-600 to-amber-600 hover:from-rose-500 hover:to-amber-500 text-white font-extrabold text-sm shadow-lg shadow-rose-600/30 hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer flex items-center gap-2"
            >
              <Radio className="w-5 h-5 animate-pulse" />
              <span>Подать сигнал SOS о пропаже</span>
            </button>
          </div>
        </div>
      </div>

      {/* Radar Map Simulation */}
      <div className="relative rounded-3xl bg-white border border-slate-200 p-6 shadow-sm overflow-hidden">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Navigation className="w-5 h-5 text-rose-600" />
            <h3 className="text-lg font-black text-slate-900">
              Интерактивный радар поиска в вашем районе
            </h3>
          </div>
          <span className="text-xs font-bold text-teal-800 bg-teal-50 px-3 py-1 rounded-full border border-teal-200">
            Радар активен (Зона: 15 км)
          </span>
        </div>

        {/* Map Canvas Background Simulation */}
        <div className="relative h-64 sm:h-80 w-full rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden flex items-center justify-center">
          
          {/* Radar circle animations */}
          <div className="absolute w-40 h-40 rounded-full border border-rose-500/40 animate-ping"></div>
          <div className="absolute w-80 h-80 rounded-full border border-rose-500/30"></div>
          <div className="absolute w-[450px] h-[450px] rounded-full border border-teal-500/20"></div>
          <div className="absolute w-full h-[1px] bg-slate-800"></div>
          <div className="absolute h-full w-[1px] bg-slate-800"></div>

          {/* Map Grid overlay */}
          <div className="absolute inset-0 bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:16px_16px] opacity-40"></div>

          {/* User Location Center */}
          <div className="relative z-10 flex flex-col items-center">
            <div className="w-6 h-6 rounded-full bg-teal-500 border-2 border-white shadow-lg flex items-center justify-center text-slate-950 font-black text-[10px]">
              Вы
            </div>
            <span className="text-[10px] font-bold text-teal-200 mt-1 bg-slate-900/90 px-2 py-0.5 rounded border border-slate-700">
              Ваша локация
            </span>
          </div>

          {/* Lost Pets Map Pins */}
          {lostAlerts.map((alert, idx) => {
            const positions = [
              { top: '25%', left: '30%' },
              { top: '65%', left: '72%' },
              { top: '35%', left: '60%' },
            ];
            const pos = positions[idx % positions.length];

            return (
              <div 
                key={alert.id}
                style={{ top: pos.top, left: pos.left }}
                className="absolute z-20 flex flex-col items-center cursor-pointer group"
                onClick={() => handlePrintPoster(alert)}
              >
                <div className="relative">
                  <div className="w-10 h-10 rounded-full ring-2 ring-rose-500 overflow-hidden shadow-xl group-hover:scale-125 transition-transform bg-white">
                    <img src={alert.photoUrl} alt={alert.petName} className="w-full h-full object-cover" />
                  </div>
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-rose-600 rounded-full text-[9px] font-black text-white flex items-center justify-center animate-bounce">
                    !
                  </span>
                </div>
                <div className="bg-white text-slate-900 text-[11px] font-bold px-2 py-0.5 rounded-md border border-rose-300 shadow-md mt-1 whitespace-nowrap group-hover:bg-rose-50">
                  {alert.petName} ({alert.reward || 'SOS'})
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Active Missing Pets List */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-black text-slate-900 flex items-center gap-2">
            <span>Срочные объявления о поиске ({lostAlerts.length})</span>
          </h3>
          <span className="text-xs text-slate-500 font-medium">Нажмите на карточку для генерации постера</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {lostAlerts.map((alert) => (
            <div
              key={alert.id}
              className="p-5 rounded-3xl bg-white border border-slate-200 hover:border-rose-300 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="relative mb-4">
                  <img
                    src={alert.photoUrl}
                    alt={alert.petName}
                    className="w-full h-48 rounded-2xl object-cover ring-1 ring-slate-200"
                  />
                  {alert.reward && (
                    <div className="absolute top-3 right-3 px-3 py-1 rounded-xl bg-rose-600 text-white font-extrabold text-xs shadow-md">
                      Вознаграждение: {alert.reward}
                    </div>
                  )}
                  <div className="absolute bottom-3 left-3 px-2.5 py-1 rounded-lg bg-white/95 text-teal-800 font-mono text-xs font-bold border border-slate-200 shadow-xs">
                    {alert.zmId}
                  </div>
                </div>

                <div className="flex items-center justify-between mb-1">
                  <h4 className="text-2xl font-black text-slate-900 font-display">
                    {alert.petName}
                  </h4>
                  <span className="text-xs font-bold text-slate-500">
                    {alert.species === 'dog' ? 'Собака' : 'Кошка'}
                  </span>
                </div>
                
                <p className="text-xs font-bold text-slate-600 mb-2">
                  {alert.breed}
                </p>

                <div className="space-y-1.5 text-xs text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-200 mb-3 font-medium">
                  <div className="flex items-start gap-1.5 text-rose-800 font-bold">
                    <MapPin className="w-3.5 h-3.5 shrink-0 mt-0.5 text-rose-600" />
                    <span>{alert.location}</span>
                  </div>
                  <div className="text-slate-500 text-[11px]">
                    Время пропажи: {alert.lostDate}
                  </div>
                  <div className="text-slate-600 text-[11px] italic pt-1 border-t border-slate-200">
                    «{alert.distinguishingFeatures}»
                  </div>
                </div>
              </div>

              <div className="space-y-2 pt-2 border-t border-slate-100">
                <a
                  href={`tel:${alert.ownerPhone}`}
                  className="w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-extrabold text-xs flex items-center justify-center gap-2 shadow-sm transition cursor-pointer"
                >
                  <Phone className="w-4 h-4" />
                  <span>Позвонить владельцу ({alert.ownerName})</span>
                </a>

                <button
                  onClick={() => handlePrintPoster(alert)}
                  className="w-full py-2 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold border border-slate-200 transition flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Printer className="w-3.5 h-3.5 text-slate-600" />
                  <span>Печать объявления о пропаже (А4)</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Printable Poster Modal Generator */}
      {selectedAlertForPoster && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-xl overflow-y-auto">
          <div className="relative w-full max-w-xl bg-white text-slate-950 rounded-3xl p-6 sm:p-8 shadow-2xl animate-in zoom-in-95 my-8">
            <button
              onClick={() => setSelectedAlertForPoster(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 cursor-pointer"
            >
              ✕
            </button>

            {/* Poster Header */}
            <div className="text-center pb-4 border-b-4 border-rose-600 mb-4">
              <div className="text-3xl sm:text-4xl font-black text-rose-600 uppercase tracking-tight">
                ПРОПАЛА {selectedAlertForPoster.species === 'dog' ? 'СОБАКА' : 'КОШКА'}!
              </div>
              <div className="text-sm font-bold text-slate-800 uppercase tracking-wider mt-1">
                ПОЖАЛУЙСТА, ПОМОГИТЕ НАЙТИ ЧЛЕНА СЕМЬИ!
              </div>
            </div>

            {/* Poster Content */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center my-4">
              <img
                src={selectedAlertForPoster.photoUrl}
                alt={selectedAlertForPoster.petName}
                className="w-full h-48 rounded-2xl object-cover border-2 border-slate-900"
              />

              <div className="space-y-2 text-left">
                <div className="text-2xl font-black text-slate-950">
                  Кличка: {selectedAlertForPoster.petName}
                </div>
                <div className="text-sm font-bold text-slate-700">
                  Порода: {selectedAlertForPoster.breed}
                </div>
                <div className="text-xs text-slate-800">
                  <strong>Место:</strong> {selectedAlertForPoster.location}
                </div>
                <div className="text-xs text-slate-800">
                  <strong>Приметы:</strong> {selectedAlertForPoster.distinguishingFeatures}
                </div>
                {selectedAlertForPoster.reward && (
                  <div className="p-2 bg-rose-100 border border-rose-300 rounded-xl text-rose-800 font-extrabold text-sm">
                    💰 Вознаграждение: {selectedAlertForPoster.reward}
                  </div>
                )}
              </div>
            </div>

            {/* QR Scan box for quick phone link */}
            <div className="p-4 bg-slate-100 rounded-2xl border-2 border-slate-900 flex items-center justify-between gap-4 text-left my-4">
              <div>
                <div className="text-xs font-bold uppercase text-slate-600">Контакты для связи (24/7):</div>
                <div className="text-xl font-black text-slate-950">{selectedAlertForPoster.ownerPhone}</div>
                <div className="text-xs font-bold text-slate-700">{selectedAlertForPoster.ownerName}</div>
                <div className="text-[11px] font-mono text-teal-700 mt-1">ID в базе: {selectedAlertForPoster.zmId}</div>
              </div>

              {/* QR Code */}
              <div className="p-2 bg-white rounded-xl border border-slate-300 text-center shrink-0">
                <div className="w-16 h-16 bg-slate-900 rounded flex items-center justify-center text-white text-[10px] font-bold">
                  QR-МАЯК
                </div>
                <span className="text-[8px] font-bold block mt-1">СКАНИРОВАТЬ</span>
              </div>
            </div>

            {/* Poster Actions */}
            <div className="flex gap-3 pt-2">
              <button
                onClick={() => {
                  confetti({ particleCount: 40 });
                  window.print();
                }}
                className="flex-1 py-3 rounded-2xl bg-rose-600 hover:bg-rose-500 text-white font-extrabold text-sm shadow-lg transition cursor-pointer flex items-center justify-center gap-2"
              >
                <Printer className="w-4 h-4" />
                <span>Распечатать объявление (PDF/Печать)</span>
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
