import React, { useState } from 'react';
import { 
  CalendarClock, 
  Plus, 
  Clock, 
  Filter,
  Check
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { ReminderItem, Pet } from '../types';

interface RemindersTabProps {
  reminders: ReminderItem[];
  pets: Pet[];
  onToggleReminder: (id: string) => void;
  onAddReminder: (reminder: ReminderItem) => void;
}

export const RemindersTab: React.FC<RemindersTabProps> = ({
  reminders,
  pets,
  onToggleReminder,
  onAddReminder,
}) => {
  const [filter, setFilter] = useState<'all' | 'upcoming' | 'completed'>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [showAddModal, setShowAddModal] = useState(false);

  // New Reminder Form State
  const [newTitle, setNewTitle] = useState('');
  const [newPetId, setNewPetId] = useState(pets[0]?.id || 'pet-1');
  const [newCategory, setNewCategory] = useState<ReminderItem['category']>('parasite');
  const [newDate, setNewDate] = useState('');
  const [newTime, setNewTime] = useState('10:00');
  const [newRepeat, setNewRepeat] = useState('Однократно');
  const [newNote, setNewNote] = useState('');

  const handleToggle = (id: string, currentState: boolean) => {
    if (!currentState) {
      confetti({
        particleCount: 45,
        spread: 60,
        origin: { y: 0.7 }
      });
    }
    onToggleReminder(id);
  };

  const handleCreateReminder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newItem: ReminderItem = {
      id: `rem-${Date.now()}`,
      petId: newPetId,
      title: newTitle,
      category: newCategory,
      dueDate: newDate || new Date().toISOString().split('T')[0],
      dueTime: newTime,
      repeatFrequency: newRepeat,
      isCompleted: false,
      priority: 'high',
      note: newNote,
    };

    onAddReminder(newItem);
    setNewTitle('');
    setNewNote('');
    setShowAddModal(false);
    confetti({ particleCount: 30 });
  };

  const filteredReminders = reminders.filter((rem) => {
    if (filter === 'upcoming' && rem.isCompleted) return false;
    if (filter === 'completed' && !rem.isCompleted) return false;
    if (categoryFilter !== 'all' && rem.category !== categoryFilter) return false;
    return true;
  });

  const getCategoryBadge = (category: string) => {
    switch (category) {
      case 'vaccine':
        return { label: 'Вакцинация', color: 'bg-teal-50 dark:bg-teal-500/20 text-teal-700 dark:text-teal-300 border-teal-200 dark:border-teal-500/30' };
      case 'parasite':
        return { label: 'От паразитов', color: 'bg-amber-50 dark:bg-amber-500/20 text-amber-800 dark:text-amber-300 border-amber-200 dark:border-amber-500/30' };
      case 'grooming':
        return { label: 'Груминг', color: 'bg-purple-50 dark:bg-purple-500/20 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-500/30' };
      case 'medicine':
        return { label: 'Лекарство', color: 'bg-rose-50 dark:bg-rose-500/20 text-rose-700 dark:text-rose-300 border-rose-200 dark:border-rose-500/30' };
      case 'vet':
        return { label: 'Визит к ветврачу', color: 'bg-blue-50 dark:bg-blue-500/20 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-500/30' };
      default:
        return { label: 'Забота', color: 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-600' };
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-in fade-in duration-300 text-left">
      
      {/* Banner Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gradient-to-r from-cyan-500/10 via-teal-500/5 to-emerald-500/10 dark:from-cyan-950/60 dark:via-slate-900 dark:to-teal-950/60 p-6 sm:p-7 rounded-3xl border border-cyan-500/30 shadow-sm">
        <div>
          <div className="flex items-center gap-2 text-teal-600 dark:text-cyan-400 text-xs font-bold uppercase tracking-wider mb-1">
            <CalendarClock className="w-4 h-4" />
            <span>Умный календарь процедур</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            Напоминания и график заботы
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">
            Система никогда не позволит пропустить вакцинацию, капли от клещей или плановый прием.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-teal-500 hover:bg-teal-600 text-white font-extrabold text-sm shadow-md shadow-teal-500/20 transition cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Новое напоминание</span>
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-white dark:bg-slate-900/80 p-3 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
              filter === 'all'
                ? 'bg-teal-500 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            Все ({reminders.length})
          </button>
          <button
            onClick={() => setFilter('upcoming')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
              filter === 'upcoming'
                ? 'bg-teal-500 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            Предстоящие ({reminders.filter(r => !r.isCompleted).length})
          </button>
          <button
            onClick={() => setFilter('completed')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
              filter === 'completed'
                ? 'bg-teal-500 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            Выполненные ({reminders.filter(r => r.isCompleted).length})
          </button>
        </div>

        <div className="flex items-center gap-2">
          <Filter className="w-3.5 h-3.5 text-slate-400" />
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="bg-slate-50 dark:bg-slate-950 text-xs text-slate-700 dark:text-slate-200 font-semibold rounded-xl border border-slate-200 dark:border-slate-700 px-3 py-1.5 focus:border-teal-500 focus:outline-none"
          >
            <option value="all">Все категории</option>
            <option value="vaccine">Вакцинация</option>
            <option value="parasite">От паразитов</option>
            <option value="grooming">Груминг</option>
            <option value="medicine">Лекарства</option>
            <option value="vet">Осмотр ветеринара</option>
          </select>
        </div>
      </div>

      {/* Reminders List */}
      <div className="space-y-3">
        {filteredReminders.map((rem) => {
          const pet = pets.find(p => p.id === rem.petId) || pets[0];
          const badge = getCategoryBadge(rem.category);

          return (
            <div
              key={rem.id}
              className={`p-5 rounded-2xl border transition-all duration-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                rem.isCompleted
                  ? 'bg-slate-50 dark:bg-slate-950/40 border-slate-200 dark:border-slate-800/60 opacity-60'
                  : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-teal-500/40 shadow-sm hover:shadow-md'
              }`}
            >
              <div className="flex items-start gap-4">
                <button
                  onClick={() => handleToggle(rem.id, rem.isCompleted)}
                  className={`mt-0.5 w-6 h-6 rounded-lg flex items-center justify-center transition-colors cursor-pointer ${
                    rem.isCompleted
                      ? 'bg-emerald-500 text-white'
                      : 'border-2 border-slate-300 dark:border-slate-600 hover:border-teal-500 text-transparent'
                  }`}
                  title={rem.isCompleted ? 'Отметить невыполненным' : 'Отметить выполненным'}
                >
                  <Check className="w-4 h-4 stroke-[3]" />
                </button>

                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <span className={`text-base font-bold ${rem.isCompleted ? 'line-through text-slate-400' : 'text-slate-900 dark:text-white'}`}>
                      {rem.title}
                    </span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${badge.color}`}>
                      {badge.label}
                    </span>
                    <span className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1 font-semibold">
                      <img src={pet.photoUrl} alt={pet.name} className="w-4 h-4 rounded-full object-cover" />
                      {pet.name}
                    </span>
                  </div>

                  {rem.note && (
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 italic">
                      {rem.note}
                    </p>
                  )}

                  <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400 mt-2">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-teal-600 dark:text-cyan-400" />
                      {rem.dueDate} {rem.dueTime && `в ${rem.dueTime}`}
                    </span>
                    <span>•</span>
                    <span className="text-slate-400">{rem.repeatFrequency}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 self-end sm:self-center">
                <span className={`text-xs font-bold px-3 py-1 rounded-xl ${
                  rem.isCompleted 
                    ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-500/30'
                    : 'bg-teal-50 dark:bg-cyan-950/60 text-teal-700 dark:text-cyan-300 border border-teal-200 dark:border-cyan-500/30'
                }`}>
                  {rem.isCompleted ? 'Выполнено' : 'Запланировано'}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Reminder Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-teal-500/40 rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl animate-in zoom-in-95">
            <h3 className="text-xl font-extrabold text-slate-900 dark:text-white mb-4">
              Новое напоминание о питомце
            </h3>
            
            <form onSubmit={handleCreateReminder} className="space-y-4 text-left">
              <div>
                <label className="text-xs font-bold text-slate-600 dark:text-slate-300 block mb-1">
                  Название процедуры или лекарства
                </label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="Например: Капли на холку Advocate"
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-sm text-slate-900 dark:text-white focus:border-teal-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-600 dark:text-slate-300 block mb-1">
                    Питомец
                  </label>
                  <select
                    value={newPetId}
                    onChange={(e) => setNewPetId(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-sm text-slate-900 dark:text-white focus:border-teal-500 focus:outline-none"
                  >
                    {pets.map((p) => (
                      <option key={p.id} value={p.id}>{p.name} ({p.breed})</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-600 dark:text-slate-300 block mb-1">
                    Категория
                  </label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as any)}
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-sm text-slate-900 dark:text-white focus:border-teal-500 focus:outline-none"
                  >
                    <option value="parasite">От клещей и паразитов</option>
                    <option value="vaccine">Вакцинация</option>
                    <option value="grooming">Груминг и стрижка</option>
                    <option value="medicine">Прием лекарства</option>
                    <option value="vet">Осмотр ветеринара</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-600 dark:text-slate-300 block mb-1">
                    Дата
                  </label>
                  <input
                    type="date"
                    required
                    value={newDate}
                    onChange={(e) => setNewDate(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-sm text-slate-900 dark:text-white focus:border-teal-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-600 dark:text-slate-300 block mb-1">
                    Повтор
                  </label>
                  <select
                    value={newRepeat}
                    onChange={(e) => setNewRepeat(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-sm text-slate-900 dark:text-white focus:border-teal-500 focus:outline-none"
                  >
                    <option value="Однократно">Однократно</option>
                    <option value="Каждые 2 недели">Каждые 2 недели</option>
                    <option value="Каждый месяц">Каждый месяц</option>
                    <option value="Каждые 3 месяца">Каждые 3 месяца</option>
                    <option value="Раз в год">Раз в год</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-600 dark:text-slate-300 block mb-1">
                  Заметка / Дозировка
                </label>
                <input
                  type="text"
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                  placeholder="Дозировка, марка препарата или адрес"
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-sm text-slate-900 dark:text-white focus:border-teal-500 focus:outline-none"
                />
              </div>

              <div className="pt-4 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 text-xs font-bold cursor-pointer transition"
                >
                  Отмена
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-xl bg-teal-500 hover:bg-teal-600 text-white font-extrabold text-xs shadow-md cursor-pointer transition"
                >
                  Сохранить
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
