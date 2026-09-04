import React, { useEffect, useState } from 'react';
import { Bell, Check, LockKeyhole, Mail, MapPin, Phone, Save, UserRound, X } from 'lucide-react';
import { OwnerProfile } from '../types';

interface AccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  owner: OwnerProfile;
  onSave: (owner: OwnerProfile) => void;
}

export const AccountModal: React.FC<AccountModalProps> = ({ isOpen, onClose, owner, onSave }) => {
  const [draft, setDraft] = useState(owner);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (isOpen) setDraft(owner);
  }, [isOpen, owner]);

  if (!isOpen) return null;

  const save = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(draft);
    setSaved(true);
    window.setTimeout(() => setSaved(false), 1800);
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xl" onMouseDown={onClose}>
      <div className="account-modal" onMouseDown={(e) => e.stopPropagation()}>
        <div className="account-modal-head">
          <div className="flex items-center gap-3">
            <div className="account-avatar"><UserRound className="w-5 h-5" /></div>
            <div>
              <span className="eyebrow compact">ЛИЧНЫЙ КАБИНЕТ</span>
              <h2>Мой аккаунт</h2>
            </div>
          </div>
          <button className="icon-action" onClick={onClose} aria-label="Закрыть"><X className="w-4 h-4" /></button>
        </div>

        <form onSubmit={save} className="account-modal-body">
          <div className="account-status">
            <div className="account-status-icon"><Check className="w-4 h-4" /></div>
            <div><strong>Профиль ЗооМаяка активен</strong><span>Эти данные используются в SOS и на публичном QR, только если вы это разрешили.</span></div>
          </div>

          <div className="account-form-grid">
            <label><span><UserRound /> Имя</span><input value={draft.name} onChange={(e) => setDraft({ ...draft, name: e.target.value })} placeholder="Как к вам обращаться" /></label>
            <label><span><Phone /> Телефон</span><input value={draft.phone} onChange={(e) => setDraft({ ...draft, phone: e.target.value })} placeholder="+7 (___) ___-__-__" /></label>
            <label><span><Mail /> E-mail</span><input type="email" value={draft.email} onChange={(e) => setDraft({ ...draft, email: e.target.value })} placeholder="name@example.ru" /></label>
            <label><span><MapPin /> Город</span><input value={draft.city} onChange={(e) => setDraft({ ...draft, city: e.target.value })} placeholder="Город" /></label>
          </div>

          <div className="account-quick-grid">
            <label className="flex items-start gap-2 text-left"><input type="checkbox" checked={draft.showName} onChange={(e) => setDraft({ ...draft, showName: e.target.checked })} /><span><strong>Имя в QR-профиле</strong><small className="block">Показывать имя нашедшему</small></span></label>
            <label className="flex items-start gap-2 text-left"><input type="checkbox" checked={draft.showCity} onChange={(e) => setDraft({ ...draft, showCity: e.target.checked })} /><span><strong>Город в QR-профиле</strong><small className="block">Показывать город</small></span></label>
            <label className="flex items-start gap-2 text-left"><input type="checkbox" checked={draft.showPhone} onChange={(e) => setDraft({ ...draft, showPhone: e.target.checked })} /><span><Bell /><strong>Телефон в QR</strong><small className="block">По умолчанию скрыт</small></span></label>
            <div><LockKeyhole /><strong>Приватность</strong><small>Контакты не показываются без этих галочек</small></div>
          </div>

          <div className="account-modal-foot">
            <span>{saved ? 'Изменения сохранены' : 'Сохраняется в этом браузере'}</span>
            <button className="primary-cta small" type="submit"><Save className="w-4 h-4" /> {saved ? 'Сохранено' : 'Сохранить'}</button>
          </div>
        </form>
      </div>
    </div>
  );
};
