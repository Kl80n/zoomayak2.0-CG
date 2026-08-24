import React, { useState } from 'react';
import { Bell, Check, LockKeyhole, Mail, MapPin, Phone, Save, UserRound, PawPrint, HeartPulse, CalendarDays, ArrowLeft } from 'lucide-react';
import { Pet, MedicalRecord, ReminderItem } from '../types';
import { MyPetsTab } from './MyPetsTab';
import { RemindersTab } from './RemindersTab';
import { HealthVaultTab } from './HealthVaultTab';

interface AccountTabProps {
  pets: Pet[];
  selectedPet?: Pet;
  reminders: ReminderItem[];
  medicalRecords: MedicalRecord[];
  onSelectPet: (pet: Pet) => void;
  onOpenAddPet: () => void;
  onOpenPassport: () => void;
  onOpenCollarStudio: () => void;
  onToggleReminder: (id: string) => void;
  onAddReminder: (item: ReminderItem) => void;
  onAddRecord: (record: MedicalRecord) => void;
}
type Section = 'overview' | 'pets' | 'reminders' | 'health';

export const AccountTab: React.FC<AccountTabProps> = (props) => {
  const [section, setSection] = useState<Section>('overview');
  const [name, setName] = useState('Владелец аккаунта');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('Ярославль');
  const [saved, setSaved] = useState(false);
  const save = (e: React.FormEvent) => { e.preventDefault(); setSaved(true); window.setTimeout(() => setSaved(false), 1800); };

  const sectionContent = section === 'pets' ? (
    <MyPetsTab pets={props.pets} selectedPet={props.selectedPet ?? props.pets[0]} onSelectPet={props.onSelectPet} onOpenAddPet={props.onOpenAddPet} onOpenPassport={props.onOpenPassport} onOpenCollarStudio={props.onOpenCollarStudio} />
  ) : section === 'reminders' ? (
    <RemindersTab reminders={props.reminders} pets={props.pets} onToggleReminder={props.onToggleReminder} onAddReminder={props.onAddReminder} />
  ) : section === 'health' ? (
    <HealthVaultTab medicalRecords={props.medicalRecords} pets={props.pets} selectedPet={props.selectedPet ?? props.pets[0]} onAddRecord={props.onAddRecord} onOpenPassport={props.onOpenPassport} />
  ) : null;

  return (
    <section className="account-page max-w-[1400px] mx-auto px-4 sm:px-6 xl:px-8 py-7">
      <div className="account-page-hero">
        <div><span className="eyebrow"><UserRound className="w-4 h-4" /> ЛИЧНЫЙ КАБИНЕТ</span><h1>Ваш профиль и всё управление ЗооМаяком</h1><p>Здесь собраны питомцы, здоровье, напоминания, документы и настройки владельца — без перегрузки главной страницы.</p></div>
        <div className="account-status-card"><div className="account-status-icon"><Check className="w-4 h-4" /></div><div><strong>Профиль активен</strong><span>ZM-сервис готов к работе</span></div></div>
      </div>
      <div className="account-section-nav">
        <button className={section === 'overview' ? 'is-active' : ''} onClick={() => setSection('overview')}><UserRound /> Профиль</button>
        <button className={section === 'pets' ? 'is-active' : ''} onClick={() => setSection('pets')}><PawPrint /> Мои питомцы <b>{props.pets.length}</b></button>
        <button className={section === 'reminders' ? 'is-active' : ''} onClick={() => setSection('reminders')}><CalendarDays /> Напоминания <b>{props.reminders.filter(r => !r.isCompleted).length}</b></button>
        <button className={section === 'health' ? 'is-active' : ''} onClick={() => setSection('health')}><HeartPulse /> Здоровье</button>
      </div>
      {section !== 'overview' ? (
        <div className="account-subpage">
          <button className="account-back-button" onClick={() => setSection('overview')}><ArrowLeft /> Вернуться в личный кабинет</button>
          {sectionContent}
        </div>
      ) : (
      <div className="account-page-grid">
        <form className="account-profile-card" onSubmit={save}>
          <div className="panel-heading"><div><span className="eyebrow compact">ПРОФИЛЬ ВЛАДЕЛЬЦА</span><h3>Контактные данные</h3></div><div className="account-avatar"><UserRound className="w-5 h-5" /></div></div>
          <div className="account-form-grid">
            <label><span><UserRound /> Имя</span><input value={name} onChange={e => setName(e.target.value)} /></label>
            <label><span><Phone /> Телефон</span><input value={phone} onChange={e => setPhone(e.target.value)} placeholder="+7 (___) ___-__-__" /></label>
            <label><span><Mail /> E-mail</span><input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="name@example.ru" /></label>
            <label><span><MapPin /> Город</span><input value={city} onChange={e => setCity(e.target.value)} /></label>
          </div>
          <div className="account-profile-foot"><span>{saved ? '✓ Изменения сохранены' : 'Данные используются для связи при SOS'}</span><button className="primary-cta small" type="submit"><Save className="w-4 h-4" /> Сохранить</button></div>
        </form>
        <div className="account-summary-card">
          <div className="panel-heading"><div><span className="eyebrow compact">МОЙ ЗООМАЯК</span><h3>Быстрый доступ</h3></div></div>
          <button onClick={() => setSection('pets')}><PawPrint /><span><strong>Мои питомцы</strong><small>{props.pets.length} профиля в базе</small></span><b>→</b></button>
          <button onClick={() => setSection('reminders')}><Bell /><span><strong>Напоминания</strong><small>События и важные даты</small></span><b>→</b></button>
          <button onClick={() => setSection('health')}><HeartPulse /><span><strong>Здоровье</strong><small>Медкарта и история</small></span><b>→</b></button>
          <div className="account-privacy"><LockKeyhole /><span><strong>Приватность</strong><small>Контакты владельца не показываются в публичном профиле без разрешения.</small></span></div>
        </div>
      </div>
      )}
    </section>
  );
};
