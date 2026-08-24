import React, { useState } from 'react';
import { Bell, Check, LockKeyhole, Mail, MapPin, Phone, Save, UserRound, X } from 'lucide-react';

interface AccountModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AccountModal: React.FC<AccountModalProps> = ({ isOpen, onClose }) => {
  const [name, setName] = useState('Владелец аккаунта');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('');
  const [saved, setSaved] = useState(false);

  if (!isOpen) return null;

  const save = (e: React.FormEvent) => {
    e.preventDefault();
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
            <div><strong>Профиль ЗооМаяка активен</strong><span>Данные владельца используются для связи при SOS и обращениях.</span></div>
          </div>

          <div className="account-form-grid">
            <label><span><UserRound /> Имя</span><input value={name} onChange={(e) => setName(e.target.value)} placeholder="Как к вам обращаться" /></label>
            <label><span><Phone /> Телефон</span><input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+7 (___) ___-__-__" /></label>
            <label><span><Mail /> E-mail</span><input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="name@example.ru" /></label>
            <label><span><MapPin /> Город</span><input value={city} onChange={(e) => setCity(e.target.value)} placeholder="Город" /></label>
          </div>

          <div className="account-quick-grid">
            <div><Bell /><strong>Уведомления</strong><small>Напоминания, SOS и ответы на объявления</small></div>
            <div><LockKeyhole /><strong>Приватность</strong><small>Контакты владельца не показываются публично</small></div>
          </div>

          <div className="account-modal-foot">
            <span>{saved ? 'Изменения сохранены' : 'Настройки сохраняются в текущем профиле'}</span>
            <button className="primary-cta small" type="submit"><Save className="w-4 h-4" /> {saved ? 'Сохранено' : 'Сохранить'}</button>
          </div>
        </form>
      </div>
    </div>
  );
};
