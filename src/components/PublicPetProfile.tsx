import React from 'react';
import { MapPin, Phone, ShieldCheck, QrCode } from 'lucide-react';
import { Pet } from '../types';
import { ZoomayakLogo } from './ZoomayakLogo';

export const PublicPetProfile: React.FC<{ pet: Pet | undefined }> = ({ pet }) => {
  if (!pet) {
    return (
      <div className="min-h-screen bg-[#f6faf8] dark:bg-[#070b14] text-slate-900 dark:text-white grid place-items-center p-6 text-center">
        <div>
          <div className="text-4xl mb-3">🔍</div>
          <h2 className="text-xl font-bold">Питомец с таким QR-ID не найден</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Проверьте корректность сканированного QR-кода</p>
        </div>
      </div>
    );
  }

  const contact = pet.emergencyContacts?.[0];

  return (
    <div className="min-h-screen bg-[#f6faf8] dark:bg-[#070b14] text-slate-900 dark:text-white p-4 sm:p-8 transition-colors duration-200">
      <div className="max-w-xl mx-auto space-y-4">
        <div className="flex items-center justify-between px-1">
          <ZoomayakLogo />
          <span className="text-xs font-extrabold text-teal-700 dark:text-teal-400 tracking-wider">
            ПУБЛИЧНАЯ КАРТОЧКА
          </span>
        </div>

        <section className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden">
          <div className="h-2 bg-gradient-to-r from-teal-500 to-emerald-400" />
          <div className="p-5 sm:p-7">
            <div className="flex items-center gap-4">
              <img
                src={pet.photoUrl}
                alt={pet.name}
                className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl object-cover ring-4 ring-teal-500/20 shadow-md"
              />
              <div>
                <div className="text-xs font-bold text-teal-700 dark:text-teal-400 uppercase tracking-wider">
                  Нашли питомца?
                </div>
                <h1 className="text-3xl font-black mt-1 text-slate-900 dark:text-white">{pet.name}</h1>
                <p className="text-slate-500 dark:text-slate-400 font-medium">{pet.breed}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 mt-5">
              <div className="rounded-2xl bg-slate-50 dark:bg-slate-950 p-3 border border-slate-200 dark:border-slate-800">
                <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">ZM-ID</div>
                <div className="font-mono font-bold mt-1 text-teal-700 dark:text-teal-300">{pet.zmId}</div>
              </div>
              <div className="rounded-2xl bg-slate-50 dark:bg-slate-950 p-3 border border-slate-200 dark:border-slate-800">
                <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">Чип (ISO)</div>
                <div className="font-mono font-bold mt-1 text-sm text-slate-800 dark:text-slate-200">
                  {pet.microchipId || 'не указан'}
                </div>
              </div>
            </div>

            <div className="mt-5 rounded-2xl border border-teal-200 dark:border-teal-500/30 p-4 bg-teal-50/50 dark:bg-teal-950/30">
              <div className="flex gap-3">
                <ShieldCheck className="text-teal-600 dark:text-teal-400 shrink-0 w-5 h-5 mt-0.5" />
                <div>
                  <div className="font-bold text-slate-900 dark:text-white text-sm">
                    Питомец зарегистрирован в базе ЗооМаяк
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">
                    Пожалуйста, свяжитесь с владельцем для безопасного возврата животного домой.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-5">
              <a
                href={contact ? `tel:${contact.phone}` : '#'}
                className="rounded-2xl bg-teal-500 hover:bg-teal-600 text-white px-4 py-3 font-extrabold text-sm flex items-center justify-center gap-2 shadow-md transition"
              >
                <Phone className="w-4 h-4" /> Связаться с владельцем
              </a>
              <button
                onClick={() => {
                  if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(
                      (pos) => {
                        alert(`Координаты местоположения (${pos.coords.latitude.toFixed(4)}, ${pos.coords.longitude.toFixed(4)}) зафиксированы и переданы владельцу.`);
                      },
                      () => alert('Геолокация недоступна в браузере.')
                    );
                  }
                }}
                className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-3 font-extrabold text-slate-800 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 flex items-center justify-center gap-2 transition cursor-pointer text-sm"
              >
                <MapPin className="w-4 h-4 text-teal-600 dark:text-teal-400" /> Сообщить геометку
              </button>
            </div>
          </div>
        </section>

        <div className="text-center text-xs text-slate-500 dark:text-slate-400 flex items-center justify-center gap-2">
          <QrCode className="w-4 h-4 text-teal-600 dark:text-teal-400" /> QR-адресник ЗооМаяка · {pet.name}
        </div>
      </div>
    </div>
  );
};
