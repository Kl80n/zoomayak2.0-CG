import React from 'react';
import { Heart, MapPin, Phone, ShieldCheck, QrCode } from 'lucide-react';
import { Pet } from '../types';
import { ZoomayakLogo } from './ZoomayakLogo';

export const PublicPetProfile: React.FC<{ pet: Pet | undefined }> = ({ pet }) => {
  if (!pet) return <div className="min-h-screen grid place-items-center p-6">Питомец с таким QR-ID не найден.</div>;
  const contact = pet.emergencyContacts?.[0];
  return (
    <div className="min-h-screen bg-[#f5fbf7] text-slate-900 p-4 sm:p-8">
      <div className="max-w-xl mx-auto space-y-4">
        <div className="flex items-center justify-between px-1"><ZoomayakLogo /><span className="text-xs font-bold text-emerald-700">ПУБЛИЧНАЯ КАРТОЧКА</span></div>
        <section className="rounded-3xl bg-white border border-emerald-100 shadow-xl overflow-hidden">
          <div className="h-2 bg-emerald-500" />
          <div className="p-5 sm:p-7">
            <div className="flex items-center gap-4">
              <img src={pet.photoUrl} alt={pet.name} className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl object-cover border-4 border-emerald-50" />
              <div><div className="text-xs font-bold text-emerald-700 uppercase tracking-wider">Нашли питомца?</div><h1 className="text-3xl font-black mt-1">{pet.name}</h1><p className="text-slate-500">{pet.breed}</p></div>
            </div>
            <div className="grid grid-cols-2 gap-3 mt-5">
              <div className="rounded-2xl bg-emerald-50 p-3"><div className="text-xs text-slate-500">ZM-ID</div><div className="font-mono font-bold mt-1">{pet.zmId}</div></div>
              <div className="rounded-2xl bg-emerald-50 p-3"><div className="text-xs text-slate-500">Чип</div><div className="font-mono font-bold mt-1 text-sm">{pet.microchipId || 'не указан'}</div></div>
            </div>
            <div className="mt-5 rounded-2xl border border-emerald-100 p-4 bg-emerald-50/50"><div className="flex gap-3"><ShieldCheck className="text-emerald-600 shrink-0"/><div><div className="font-bold">Питомец зарегистрирован в ЗооМаяке</div><p className="text-sm text-slate-600 mt-1">Пожалуйста, помогите вернуть его владельцу.</p></div></div></div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
              <a href={contact ? `tel:${contact.phone}` : '#'} className="rounded-2xl bg-emerald-600 text-white px-4 py-3 font-extrabold flex items-center justify-center gap-2"><Phone className="w-4 h-4"/> Связаться с владельцем</a>
              <button className="rounded-2xl border border-emerald-200 px-4 py-3 font-extrabold text-emerald-800 flex items-center justify-center gap-2"><MapPin className="w-4 h-4"/> Сообщить местоположение</button>
            </div>
          </div>
        </section>
        <div className="text-center text-xs text-slate-500 flex items-center justify-center gap-2"><QrCode className="w-4 h-4"/> QR-адресник ЗооМаяка · {pet.name}</div>
      </div>
    </div>
  );
};
