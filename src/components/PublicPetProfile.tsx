import React, { useState } from 'react';
import { MapPin, Phone, ShieldCheck, QrCode } from 'lucide-react';
import { OwnerProfile, Pet, SightingReport } from '../types';
import { ZoomayakLogo } from './ZoomayakLogo';

interface PublicPetProfileProps {
  pet: Pet | undefined;
  owner: OwnerProfile;
  onReportLocation: (report: SightingReport) => void;
}

export const PublicPetProfile: React.FC<PublicPetProfileProps> = ({ pet, owner, onReportLocation }) => {
  const [status, setStatus] = useState('');

  if (!pet) {
    return (
      <div className="min-h-screen grid place-items-center p-6 bg-[#f5fbf7] text-slate-900">
        <div className="max-w-md text-center space-y-3">
          <ZoomayakLogo />
          <h1 className="text-2xl font-black">Питомец с таким QR-ID не найден</h1>
          <p className="text-slate-500">Проверьте код на адреснике или откройте ссылку ещё раз.</p>
        </div>
      </div>
    );
  }

  const phone = owner.showPhone ? (owner.phone || pet.emergencyContacts?.[0]?.phone) : '';
  const ownerLabel = owner.showName ? owner.name : 'Владелец ЗооМаяка';

  const reportLocation = () => {
    if (!navigator.geolocation) {
      setStatus('Геолокация недоступна в этом браузере.');
      return;
    }
    setStatus('Запрашиваем разрешение…');
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        onReportLocation({
          id: `see-${Date.now()}`,
          petId: pet.id,
          zmId: pet.zmId,
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
          accuracy: pos.coords.accuracy,
          reportedAt: new Date().toISOString(),
        });
        setStatus(`Местоположение передано владельцу. Точность около ${Math.round(pos.coords.accuracy)} м.`);
      },
      () => setStatus('Разрешение на геолокацию не получено.'),
    );
  };

  return (
    <div className="min-h-screen bg-[#f5fbf7] text-slate-900 p-4 sm:p-8">
      <div className="max-w-xl mx-auto space-y-4">
        <div className="flex items-center justify-between px-1"><ZoomayakLogo /><span className="text-xs font-bold text-emerald-700">ПУБЛИЧНАЯ КАРТОЧКА</span></div>
        <section className="rounded-3xl bg-white border border-emerald-100 overflow-hidden">
          <div className="h-2 bg-emerald-500" />
          <div className="p-5 sm:p-7">
            <div className="flex items-center gap-4">
              <img src={pet.photoUrl} alt={pet.name} className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl object-cover border-4 border-emerald-50" />
              <div>
                <div className="text-xs font-bold text-emerald-700 uppercase tracking-wider">Нашли питомца?</div>
                <h1 className="text-3xl font-black mt-1">{pet.name}</h1>
                <p className="text-slate-500">{pet.breed}</p>
                {owner.showCity && owner.city ? <p className="text-sm text-slate-400 mt-1">{owner.city}</p> : null}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 mt-5">
              <div className="rounded-2xl bg-emerald-50 p-3"><div className="text-xs text-slate-500">ZM-ID</div><div className="font-mono font-bold mt-1">{pet.zmId}</div></div>
              <div className="rounded-2xl bg-emerald-50 p-3"><div className="text-xs text-slate-500">Чип</div><div className="font-mono font-bold mt-1 text-sm">{pet.microchipId || 'не указан'}</div></div>
            </div>
            <div className="mt-5 rounded-2xl border border-emerald-100 p-4 bg-emerald-50/50">
              <div className="flex gap-3">
                <ShieldCheck className="text-emerald-600 shrink-0"/>
                <div>
                  <div className="font-bold">Питомец зарегистрирован в ЗооМаяке</div>
                  <p className="text-sm text-slate-600 mt-1">Передайте местоположение {ownerLabel.toLowerCase()}. Лишние контакты скрыты.</p>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
              {phone ? (
                <a href={`tel:${phone}`} className="rounded-2xl bg-emerald-600 text-white px-4 py-3 font-extrabold flex items-center justify-center gap-2"><Phone className="w-4 h-4"/> Позвонить</a>
              ) : (
                <div className="rounded-2xl border border-emerald-200 px-4 py-3 font-bold text-emerald-800 flex items-center justify-center gap-2 text-center text-sm">Телефон скрыт владельцем</div>
              )}
              <button type="button" onClick={reportLocation} className="rounded-2xl border border-emerald-200 px-4 py-3 font-extrabold text-emerald-800 flex items-center justify-center gap-2"><MapPin className="w-4 h-4"/> Сообщить местоположение</button>
            </div>
            {status ? <p className="text-sm text-slate-500 mt-3">{status}</p> : null}
          </div>
        </section>
        <div className="text-center text-xs text-slate-500 flex items-center justify-center gap-2"><QrCode className="w-4 h-4"/> QR-адресник ЗооМаяка · {pet.name}</div>
      </div>
    </div>
  );
};
