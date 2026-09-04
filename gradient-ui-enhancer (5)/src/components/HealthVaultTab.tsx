import React, { useState } from 'react';
import { 
  HeartPulse, 
  Plus, 
  FileText, 
  Award, 
  ShieldCheck, 
  Activity, 
  Calendar, 
  Stethoscope, 
  Download,
  Search,
  CheckCircle,
  FileCheck
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { MedicalRecord, Pet } from '../types';

interface HealthVaultTabProps {
  medicalRecords: MedicalRecord[];
  pets: Pet[];
  selectedPet: Pet;
  onAddRecord: (record: MedicalRecord) => void;
  onOpenPassport: () => void;
}

export const HealthVaultTab: React.FC<HealthVaultTabProps> = ({
  medicalRecords,
  pets,
  selectedPet,
  onAddRecord,
  onOpenPassport,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [showAddModal, setShowAddModal] = useState(false);

  // Add Record Form State
  const [title, setTitle] = useState('');
  const [type, setType] = useState<MedicalRecord['type']>('vaccine');
  const [clinic, setClinic] = useState('ВетЦентр «Маяк & Друзья»');
  const [doctor, setDoctor] = useState('Смирнова А.П.');
  const [medicineName, setMedicineName] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [nextDueDate, setNextDueDate] = useState('');
  const [notes, setNotes] = useState('');

  const currentPetRecords = medicalRecords.filter(r => r.petId === selectedPet.id);
  const filtered = selectedCategory === 'all' 
    ? currentPetRecords 
    : currentPetRecords.filter(r => r.type === selectedCategory);

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) return;

    const newRec: MedicalRecord = {
      id: `rec-${Date.now()}`,
      petId: selectedPet.id,
      title,
      type,
      date,
      nextDueDate: nextDueDate || undefined,
      doctor,
      clinic,
      medicineName: medicineName || undefined,
      status: 'completed',
      notes,
    };

    onAddRecord(newRec);
    setShowAddModal(false);
    setTitle('');
    setMedicineName('');
    setNotes('');
    confetti({ particleCount: 35 });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-in fade-in duration-300 text-left">
      
      {/* Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gradient-to-r from-emerald-50 via-white to-teal-50 p-6 rounded-3xl border border-emerald-200 shadow-sm">
        <div>
          <div className="flex items-center gap-2 text-emerald-800 text-xs font-extrabold uppercase tracking-wider mb-1">
            <HeartPulse className="w-4 h-4" />
            <span>Электронная медицинская карта</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
            Здоровье и ветеринарный архив: {selectedPet.name}
          </h2>
          <p className="text-sm text-slate-600 mt-1 font-medium">
            Вакцинации, анализы, протоколы УЗИ и назначения лечащих ветеринаров.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onOpenPassport}
            className="px-4 py-2.5 rounded-2xl bg-teal-50 hover:bg-teal-100 text-teal-800 text-xs font-bold border border-teal-200 transition cursor-pointer flex items-center gap-1.5"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Ветпаспорт с QR</span>
          </button>
          
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-extrabold text-xs shadow-md shadow-emerald-600/25 transition cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Добавить запись</span>
          </button>
        </div>
      </div>

      {/* Vital Metrics Overview Banner */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-black">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xs text-slate-500 font-bold uppercase">Вакцинальный статус</div>
            <div className="text-sm font-black text-emerald-700">Действителен (100%)</div>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-xl bg-teal-100 text-teal-700 flex items-center justify-center font-black">
            <Activity className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xs text-slate-500 font-bold uppercase">Индекс здоровья</div>
            <div className="text-sm font-black text-teal-700">{selectedPet.healthScore} / 100 баллов</div>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-xl bg-cyan-100 text-cyan-700 flex items-center justify-center font-black">
            <Stethoscope className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xs text-slate-500 font-bold uppercase">Записей в архиве</div>
            <div className="text-sm font-black text-cyan-700">{currentPetRecords.length} протоколов</div>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-black">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xs text-slate-500 font-bold uppercase">Вет-Клиника</div>
            <div className="text-xs font-bold text-slate-800 truncate">{selectedPet.vetClinic}</div>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {[
          { id: 'all', label: 'Все документы' },
          { id: 'vaccine', label: 'Вакцины и прививки' },
          { id: 'parasite', label: 'Обработки от паразитов' },
          { id: 'examination', label: 'Осмотры и УЗИ' },
          { id: 'surgery', label: 'Чипирование и операции' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setSelectedCategory(tab.id)}
            className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition cursor-pointer ${
              selectedCategory === tab.id
                ? 'bg-emerald-600 text-white shadow-xs font-black'
                : 'bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-50 border border-slate-200'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Medical Records Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((rec) => (
          <div
            key={rec.id}
            className="p-5 rounded-3xl bg-white border border-slate-200 hover:border-emerald-400 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center border border-emerald-200">
                    <FileCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-base font-black text-slate-900">
                      {rec.title}
                    </h4>
                    <span className="text-[11px] font-mono font-bold text-teal-700">
                      {rec.medicineName ? `Препарат: ${rec.medicineName}` : 'Протокол осмотра'}
                    </span>
                  </div>
                </div>

                <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 shrink-0">
                  Заверено
                </span>
              </div>

              <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200 space-y-1.5 text-xs text-slate-700 mb-4 font-medium">
                <div className="flex justify-between">
                  <span className="text-slate-500">Клиника:</span>
                  <span className="font-bold text-slate-900">{rec.clinic}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Врач:</span>
                  <span className="font-bold text-teal-700">{rec.doctor}</span>
                </div>
                {rec.batchNumber && (
                  <div className="flex justify-between">
                    <span className="text-slate-500">Серия партии:</span>
                    <span className="font-mono text-slate-700">{rec.batchNumber}</span>
                  </div>
                )}
                {rec.notes && (
                  <div className="pt-1.5 border-t border-slate-200 text-slate-700 italic">
                    «{rec.notes}»
                  </div>
                )}
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <div className="text-slate-500 font-medium">
                Дата: <strong className="text-slate-900">{rec.date}</strong>
              </div>
              {rec.nextDueDate && (
                <div className="text-emerald-700 font-bold">
                  Ревакцинация: {rec.nextDueDate}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Add Record Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl animate-in zoom-in-95">
            <h3 className="text-xl font-black text-slate-900 mb-4">
              Внесение ветеринарной записи
            </h3>
            
            <form onSubmit={handleCreate} className="space-y-3.5 text-left">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Название процедуры или диагноза
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Например: Вакцинация против бешенства"
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-sm text-slate-900 focus:border-emerald-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Тип записи
                  </label>
                  <select
                    value={type}
                    onChange={(e) => setType(e.target.value as any)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-sm text-slate-900 focus:border-emerald-500 focus:outline-none"
                  >
                    <option value="vaccine">Вакцинация</option>
                    <option value="parasite">Обработка от паразитов</option>
                    <option value="examination">Осмотр / Диагностика</option>
                    <option value="lab">Лабораторные анализы</option>
                    <option value="surgery">Чипирование / Операция</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Препарат
                  </label>
                  <input
                    type="text"
                    value={medicineName}
                    onChange={(e) => setMedicineName(e.target.value)}
                    placeholder="Nobivac, Rabisin..."
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-sm text-slate-900 focus:border-emerald-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Клиника
                  </label>
                  <input
                    type="text"
                    value={clinic}
                    onChange={(e) => setClinic(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-sm text-slate-900 focus:border-emerald-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Врач
                  </label>
                  <input
                    type="text"
                    value={doctor}
                    onChange={(e) => setDoctor(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-sm text-slate-900 focus:border-emerald-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Дата проведения
                  </label>
                  <input
                    type="date"
                    required
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-sm text-slate-900 focus:border-emerald-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Следующая дата (план)
                  </label>
                  <input
                    type="date"
                    value={nextDueDate}
                    onChange={(e) => setNextDueDate(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-sm text-slate-900 focus:border-emerald-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Заключение / Рекомендации
                </label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Состояние животного, рекомендации по диете..."
                  rows={2}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-sm text-slate-900 focus:border-emerald-500 focus:outline-none"
                />
              </div>

              <div className="pt-3 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 text-xs font-bold cursor-pointer hover:bg-slate-200"
                >
                  Отмена
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs shadow-md cursor-pointer"
                >
                  Записать в медкарту
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
