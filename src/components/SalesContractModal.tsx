import React, { useState, useEffect } from 'react';
import { 
  X, 
  FileText, 
  Download, 
  Printer, 
  ShieldCheck, 
  Check, 
  User, 
  Building, 
  Calendar, 
  DollarSign, 
  Sparkles,
  Info,
  Copy,
  FileCheck2
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { AnimalListing, SPECIES_LABELS } from '../types';
import { ZoomayakQR } from './ZoomayakQR';

interface SalesContractModalProps {
  isOpen: boolean;
  onClose: () => void;
  listing?: AnimalListing | null;
}

export const SalesContractModal: React.FC<SalesContractModalProps> = ({
  isOpen,
  onClose,
  listing,
}) => {
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const currentDate = new Date().toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  // Seller info (defaults from listing or template)
  const [sellerName, setSellerName] = useState('Иванова Мария Сергеевна');
  const [sellerPassport, setSellerPassport] = useState('Серия 78 14 № 654321, выдан УМВД по Ярославской обл.');
  const [sellerPhone, setSellerPhone] = useState('+7 (999) 123-45-67');
  const [sellerAddress, setSellerAddress] = useState(listing?.city ? `г. ${listing.city}, ул. Свободы, д. 42` : 'г. Ярославль, ул. Свободы, д. 42');

  // Buyer info
  const [buyerName, setBuyerName] = useState('Александр Волков');
  const [buyerPassport, setBuyerPassport] = useState('Серия 78 19 № 987123, выдан МВД РФ');
  const [buyerPhone, setBuyerPhone] = useState('+7 (905) 123-45-67');
  const [buyerAddress, setBuyerAddress] = useState('г. Ярославль, Кировский район, ул. Победы, д. 15');

  // Pet details
  const [petSpecies, setPetSpecies] = useState(SPECIES_LABELS[listing?.species ?? 'dog']);
  const [petBreed, setPetBreed] = useState(listing?.breed || 'Французский бульдог');
  const [petName, setPetName] = useState(listing?.title || 'Арчи');
  const [petGender, setPetGender] = useState(listing?.sex === 'female' ? 'Женский (Сука/Кошка)' : 'Мужской (Кобель/Кот)');
  const [petBirthDate, setPetBirthDate] = useState('15 мая 2025 г.');
  const [petMicrochip, setPetMicrochip] = useState('643098100234567');
  const [petPrice, setPetPrice] = useState(listing?.price ? String(listing.price) : '25000');
  const [contractNumber, setContractNumber] = useState(`ЗМ-${Math.floor(100000 + Math.random() * 900000)}/26`);

  const [copied, setCopied] = useState(false);
  const [isPrinting, setIsPrinting] = useState(false);

  if (!isOpen) return null;

  // Ultra-reliable standalone iframe printing engine
  const handlePrint = () => {
    confetti({ particleCount: 35, spread: 50 });
    setIsPrinting(true);

    try {
      // Remove any existing temporary print iframe
      const oldFrame = document.getElementById('zoomayak-contract-print-iframe');
      if (oldFrame) oldFrame.remove();

      const iframe = document.createElement('iframe');
      iframe.id = 'zoomayak-contract-print-iframe';
      iframe.style.position = 'fixed';
      iframe.style.right = '0';
      iframe.style.bottom = '0';
      iframe.style.width = '0';
      iframe.style.height = '0';
      iframe.style.border = '0';
      iframe.style.visibility = 'hidden';
      document.body.appendChild(iframe);

      const formattedPrice = Number(petPrice).toLocaleString('ru-RU');
      const doc = iframe.contentWindow?.document;
      if (!doc) {
        window.print();
        setIsPrinting(false);
        return;
      }

      const contractHTML = `
        <!DOCTYPE html>
        <html lang="ru">
        <head>
          <meta charset="utf-8">
          <title>Договор купли-продажи питомца № ${contractNumber}</title>
          <style>
            @page {
              size: A4;
              margin: 15mm 15mm 15mm 15mm;
            }
            body {
              font-family: 'Times New Roman', 'Liberation Serif', serif;
              font-size: 11pt;
              line-height: 1.35;
              color: #000;
              margin: 0;
              padding: 0;
            }
            .header-table {
              width: 100%;
              border-bottom: 2px solid #000;
              padding-bottom: 8px;
              margin-bottom: 14px;
            }
            .header-table td {
              vertical-align: middle;
            }
            .title-block {
              text-align: center;
              margin: 14px 0;
            }
            .title-block h1 {
              font-size: 13pt;
              font-weight: bold;
              text-transform: uppercase;
              margin: 0 0 4px 0;
            }
            .title-block .subtitle {
              font-size: 9.5pt;
              color: #333;
            }
            .parties-table {
              width: 100%;
              border-collapse: collapse;
              margin: 12px 0;
            }
            .parties-table td {
              width: 50%;
              vertical-align: top;
              padding: 8px;
              border: 1px solid #777;
              font-size: 9.5pt;
            }
            .parties-table h3 {
              margin: 0 0 6px 0;
              font-size: 10pt;
              font-weight: bold;
              text-transform: uppercase;
            }
            .section-title {
              font-size: 10.5pt;
              font-weight: bold;
              margin: 10px 0 4px 0;
              text-transform: uppercase;
            }
            p {
              margin: 4px 0;
              text-align: justify;
              font-size: 10pt;
            }
            .pet-specs-table {
              width: 100%;
              border-collapse: collapse;
              margin: 8px 0;
              font-size: 9.5pt;
            }
            .pet-specs-table th, .pet-specs-table td {
              border: 1px solid #000;
              padding: 4px 8px;
              text-align: left;
            }
            .pet-specs-table th {
              background-color: #f2f2f2;
            }
            .signatures-table {
              width: 100%;
              margin-top: 24px;
              border-collapse: collapse;
            }
            .signatures-table td {
              width: 50%;
              vertical-align: top;
              padding: 10px;
              font-size: 9.5pt;
            }
            .sign-line {
              margin-top: 30px;
              border-top: 1px solid #000;
              padding-top: 4px;
            }
            .stamp-box {
              display: inline-block;
              border: 2px dashed #008060;
              color: #008060;
              padding: 4px 8px;
              font-size: 8pt;
              font-weight: bold;
              border-radius: 4px;
              margin-top: 8px;
            }
          </style>
        </head>
        <body>
          <table class="header-table">
            <tr>
              <td>
                <strong style="font-size: 14pt; font-family: sans-serif; color: #008060;">ЗООМАЯК</strong><br>
                <span style="font-size: 8.5pt; font-family: sans-serif; color: #555;">Всероссийский реестр и защита питомцев · zoomayak.ru</span>
              </td>
              <td style="text-align: right;">
                <span style="font-size: 9pt; font-family: sans-serif;">
                  <b>Электронная верификация:</b> ДЕЙСТВИТЕЛЕН<br>
                  ZM-ID питомца: ZM-${petMicrochip.slice(-6)}
                </span>
              </td>
            </tr>
          </table>

          <div class="title-block">
            <h1>ДОГОВОР КУПЛИ-ПРОДАЖИ (ПЕРЕДАЧИ) ПИТОМЦА № ${contractNumber}</h1>
            <div class="subtitle">г. Ярославль &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; «${currentDate}»</div>
          </div>

          <table class="parties-table">
            <tr>
              <td>
                <h3>ПРОДАВЕЦ (ЗАВОДЧИК):</h3>
                <b>ФИО:</b> ${sellerName}<br>
                <b>Паспорт:</b> ${sellerPassport}<br>
                <b>Адрес:</b> ${sellerAddress}<br>
                <b>Телефон:</b> ${sellerPhone}
              </td>
              <td>
                <h3>ПОКУПАТЕЛЬ (ВЛАДЕЛЕЦ):</h3>
                <b>ФИО:</b> ${buyerName}<br>
                <b>Паспорт:</b> ${buyerPassport}<br>
                <b>Адрес:</b> ${buyerAddress}<br>
                <b>Телефон:</b> ${buyerPhone}
              </td>
            </tr>
          </table>

          <div class="section-title">1. ПРЕДМЕТ ДОГОВОРА</div>
          <p>1.1. Продавец обязуется передать в собственность Покупателя, а Покупатель обязуется принять и оплатить животное (питомца) со следующими характеристиками:</p>

          <table class="pet-specs-table">
            <tr>
              <th>Параметр</th>
              <th>Значение</th>
              <th>Параметр</th>
              <th>Значение</th>
            </tr>
            <tr>
              <td><b>Вид / Порода:</b></td>
              <td>${petSpecies} / ${petBreed}</td>
              <td><b>Кличка:</b></td>
              <td>${petName}</td>
            </tr>
            <tr>
              <td><b>Пол:</b></td>
              <td>${petGender}</td>
              <td><b>Дата рождения / Возраст:</b></td>
              <td>${petBirthDate}</td>
            </tr>
            <tr>
              <td><b>Номер микрочипа ISO:</b></td>
              <td>${petMicrochip}</td>
              <td><b>Реестр ЗооМаяк (ZM-ID):</b></td>
              <td>ZM-${petMicrochip.slice(-6)}</td>
            </tr>
          </table>

          <div class="section-title">2. СТОИМОСТЬ И ПОРЯДОК РАСЧЕТОВ</div>
          <p>2.1. Стоимость питомца составляет <b>${formattedPrice} ( ${formattedPrice} ) рублей</b> (НДС не облагается).</p>
          <p>2.2. Расчет между Сторонами производится в полном объеме в день подписания настоящего Договора и фактической передачи питомца Покупателю.</p>

          <div class="section-title">3. ПРАВА И ОБЯЗАННОСТИ СТОРОН, ГАРАНТИИ ЗДОРОВЬЯ</div>
          <p>3.1. Продавец подтверждает, что питомец клинически здоров на момент передачи, свободен от экто- и эндопаразитов, привит по возрасту в соответствии с отметками в ветеринарном паспорте.</p>
          <p>3.2. Продавец обязуется одновременно с питомцем передать Покупателю международный ветеринарный паспорт с отметками о вакцинациях и дегельминтизации, а также передать права на управление карточкой питомца в сервисе «ЗооМаяк».</p>
          <p>3.3. Покупатель обязуется обеспечить надлежащие условия содержания, кормления и регулярного ветеринарного обслуживания питомца, гуманное обращение, а также своевременное обновление контактных данных в системе «ЗооМаяк».</p>

          <div class="section-title">4. ЗАКЛЮЧИТЕЛЬНЫЕ ПОЛОЖЕНИЯ</div>
          <p>4.1. Настоящий Договор составлен в двух экземплярах, имеющих равную юридическую силу, по одному для каждой из Сторон. Договор вступает в силу с момента его подписания Сторонами.</p>

          <table class="signatures-table">
            <tr>
              <td>
                <b>ПРОДАВЕЦ:</b><br><br>
                Подпись: __________________ / ${sellerName} /<br>
                <div class="stamp-box">✓ ПРОВЕРЕНО ЗООМАЯК · ВЕТПАСПОРТ ПРИЛАГАЕТСЯ</div>
              </td>
              <td>
                <b>ПОКУПАТЕЛЬ:</b><br><br>
                Подпись: __________________ / ${buyerName} /<br>
                <div class="stamp-box">✓ ПИТОМЕЦ ПРИНЯТ В ПОЛНОМ ПОРЯДКЕ</div>
              </td>
            </tr>
          </table>
        </body>
        </html>
      `;

      doc.open();
      doc.write(contractHTML);
      doc.close();

      setTimeout(() => {
        iframe.contentWindow?.focus();
        iframe.contentWindow?.print();
        setIsPrinting(false);
      }, 400);

    } catch (err) {
      console.error('Print iframe error, fallback to window.print', err);
      window.print();
      setIsPrinting(false);
    }
  };

  const handleDownloadTxt = () => {
    confetti({ particleCount: 40, spread: 60 });
    const textContent = `
ТИПОВОЙ ДОГОВОР КУПЛИ-ПРОДАЖИ (ПЕРЕДАЧИ) ПИТОМЦА № ${contractNumber}
Сервис верификации: ЗооМаяк (https://zoomayak.ru)
Дата заключения: ${currentDate}

1. СТОРОНЫ ДОГОВОРА
Продавец (Заводчик): ${sellerName}
Паспортные данные: ${sellerPassport}
Телефон: ${sellerPhone}
Адрес: ${sellerAddress}

Покупатель (Новый владелец): ${buyerName}
Паспортные данные: ${buyerPassport}
Телефон: ${buyerPhone}
Адрес: ${buyerAddress}

2. ПРЕДМЕТ ДОГОВОРА
2.1. Продавец передает в собственность, а Покупатель принимает и оплачивает питомца со следующими идентификационными данными:
- Вид: ${petSpecies}
- Порода: ${petBreed}
- Кличка: ${petName}
- Пол: ${petGender}
- Дата рождения / возраст: ${petBirthDate}
- Номер микрочипа ISO 11784: ${petMicrochip}
- Цифровой ZM-ID: ZM-${petMicrochip.slice(-6)}

3. ЦЕНА И ПОРЯДОК РАСЧЕТОВ
3.1. Стоимость питомца составляет ${petPrice} рублей.
3.2. Расчет производится в полном объеме при передаче питомца и подписании настоящего Договора.

4. ГАРАНТИИ ЗДОРОВЬЯ И ОБЯЗАТЕЛЬСТВА
4.1. Продавец гарантирует, что питомец клинически здоров на момент передачи, свободен от экто- и эндопаразитов, привит по возрасту согласно ветеринарному паспорту.
4.2. Покупатель обязуется обеспечить надлежащие условия содержания, регулярное ветеринарное наблюдение и зарегистрировать питомца в системе ЗооМаяк.

ПОДПИСИ СТОРОН:
Продавец: __________________ / ${sellerName} /
Покупатель: ________________ / ${buyerName} /
    `.trim();

    const blob = new Blob([textContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Договор_купли_продажи_ЗооМаяк_${petName}_${contractNumber}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleCopyText = () => {
    navigator.clipboard?.writeText(`Договор купли-продажи питомца № ${contractNumber} (ЗооМаяк) оформлен между ${sellerName} и ${buyerName}. Питомец: ${petBreed} (${petName}). Стоимость: ${petPrice} руб.`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div 
      className="fixed inset-0 z-[80] flex items-center justify-center p-3 sm:p-5 bg-slate-950/80 backdrop-blur-xl overflow-y-auto cursor-pointer"
      onClick={onClose}
      onMouseDown={onClose}
    >
      <div 
        className="relative w-full max-w-4xl bg-white dark:bg-slate-900 text-slate-900 dark:text-white border border-slate-200 dark:border-teal-500/40 rounded-3xl shadow-2xl overflow-hidden my-4 text-left animate-in fade-in zoom-in-95 duration-200 flex flex-col max-h-[90vh] cursor-default"
        onClick={e => e.stopPropagation()}
        onMouseDown={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-50 via-teal-50/60 to-cyan-50 dark:from-teal-950 dark:via-slate-900 dark:to-cyan-950 px-6 py-4 border-b border-slate-200 dark:border-teal-500/20 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 rounded-2xl bg-teal-500 text-white flex items-center justify-center shadow-md">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-black text-slate-900 dark:text-white">
                  Договор купли-продажи питомца
                </h3>
                <span className="bg-teal-500/10 text-teal-700 dark:text-teal-300 border border-teal-500/30 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" /> Стандарт ЗооМаяк
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                Юридически выверенный типовой бланк (ст. 454 ГК РФ) с печатью в PDF и на принтере
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              disabled={isPrinting}
              className="p-2.5 rounded-xl bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 transition cursor-pointer"
              title="Печать договора"
            >
              <Printer className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-2.5 rounded-xl bg-white dark:bg-slate-800 hover:bg-rose-100 hover:text-rose-600 dark:hover:bg-rose-950 dark:hover:text-rose-400 text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-700 transition cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Form & Contract Document Preview */}
        <div className="p-6 sm:p-8 space-y-6 overflow-y-auto">
          
          {/* Quick Info Alert */}
          <div className="p-4 rounded-2xl bg-teal-500/10 border border-teal-500/30 flex items-start gap-3">
            <Sparkles className="w-5 h-5 text-teal-600 dark:text-teal-400 shrink-0 mt-0.5" />
            <div className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
              <strong>Конструктор договора:</strong> Все заполненные ниже поля моментально отображаются в печатном бланке. Нажмите <b>«Распечатать договор»</b> для отправки на любой принтер или сохранения в PDF.
            </div>
          </div>

          {/* Form Parameters in 2 Columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Seller Info Box */}
            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800 space-y-3">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-teal-700 dark:text-teal-400">
                <User className="w-4 h-4" /> Данные Продавца (Заводчика)
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-500 dark:text-slate-400 block mb-1">ФИО Продавца</label>
                <input 
                  type="text" 
                  value={sellerName} 
                  onChange={e => setSellerName(e.target.value)} 
                  className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-500 dark:text-slate-400 block mb-1">Паспортные данные</label>
                <input 
                  type="text" 
                  value={sellerPassport} 
                  onChange={e => setSellerPassport(e.target.value)} 
                  className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[11px] font-bold text-slate-500 dark:text-slate-400 block mb-1">Телефон</label>
                  <input 
                    type="tel" 
                    value={sellerPhone} 
                    onChange={e => setSellerPhone(e.target.value)} 
                    className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-mono text-slate-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-slate-500 dark:text-slate-400 block mb-1">Город / Адрес</label>
                  <input 
                    type="text" 
                    value={sellerAddress} 
                    onChange={e => setSellerAddress(e.target.value)} 
                    className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-white"
                  />
                </div>
              </div>
            </div>

            {/* Buyer Info Box */}
            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800 space-y-3">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
                <User className="w-4 h-4" /> Данные Покупателя (Владельца)
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-500 dark:text-slate-400 block mb-1">ФИО Покупателя</label>
                <input 
                  type="text" 
                  value={buyerName} 
                  onChange={e => setBuyerName(e.target.value)} 
                  className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-500 dark:text-slate-400 block mb-1">Паспортные данные</label>
                <input 
                  type="text" 
                  value={buyerPassport} 
                  onChange={e => setBuyerPassport(e.target.value)} 
                  className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[11px] font-bold text-slate-500 dark:text-slate-400 block mb-1">Телефон</label>
                  <input 
                    type="tel" 
                    value={buyerPhone} 
                    onChange={e => setBuyerPhone(e.target.value)} 
                    className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-mono text-slate-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-slate-500 dark:text-slate-400 block mb-1">Город / Район</label>
                  <input 
                    type="text" 
                    value={buyerAddress} 
                    onChange={e => setBuyerAddress(e.target.value)} 
                    className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-white"
                  />
                </div>
              </div>
            </div>

          </div>

          {/* Pet & Deal Specs */}
          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800 space-y-4">
            <div className="text-xs font-black uppercase tracking-wider text-slate-700 dark:text-slate-300">
              Параметры питомца и условия сделки
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div>
                <label className="text-[11px] font-bold text-slate-500 dark:text-slate-400 block mb-1">Кличка</label>
                <input 
                  type="text" 
                  value={petName} 
                  onChange={e => setPetName(e.target.value)} 
                  className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-500 dark:text-slate-400 block mb-1">Порода</label>
                <input 
                  type="text" 
                  value={petBreed} 
                  onChange={e => setPetBreed(e.target.value)} 
                  className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-500 dark:text-slate-400 block mb-1">Микрочип (ISO)</label>
                <input 
                  type="text" 
                  value={petMicrochip} 
                  onChange={e => setPetMicrochip(e.target.value)} 
                  className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-mono font-bold text-teal-700 dark:text-teal-300"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-500 dark:text-slate-400 block mb-1">Сумма сделки (₽)</label>
                <input 
                  type="number" 
                  value={petPrice} 
                  onChange={e => setPetPrice(e.target.value)} 
                  className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-black text-emerald-600 dark:text-emerald-400"
                />
              </div>
            </div>
          </div>

          {/* Printable Formal Agreement Sheet View */}
          <div id="printable-contract" className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-700 shadow-inner font-serif text-slate-900 dark:text-slate-100 text-xs leading-relaxed space-y-4">
            
            <div className="flex items-center justify-between pb-3 border-b-2 border-slate-800 dark:border-slate-700">
              <div>
                <h4 className="text-base font-bold uppercase tracking-wider font-sans text-slate-900 dark:text-white">
                  ДОГОВОР КУПЛИ-ПРОДАЖИ ПИТОМЦА № {contractNumber}
                </h4>
                <div className="text-[11px] text-slate-500 dark:text-slate-400 font-sans mt-0.5">
                  г. Ярославль • {currentDate} • Платформа верификации: ЗооМаяк
                </div>
              </div>

              <div className="hidden sm:block">
                <ZoomayakQR
                  value={`${window.location.origin}/qr/ZM-${petMicrochip.slice(-6)}`}
                  size={50}
                  logoSize={14}
                  lightBackground={true}
                  showBorder={true}
                />
              </div>
            </div>

            <p>
              <strong>Продавец:</strong> {sellerName}, паспорт {sellerPassport}, проживающий(ая) по адресу: {sellerAddress}, тел. {sellerPhone}, с одной стороны, и
            </p>
            <p>
              <strong>Покупатель:</strong> {buyerName}, паспорт {buyerPassport}, проживающий(ая) по адресу: {buyerAddress}, тел. {buyerPhone}, с другой стороны, заключили настоящий Договор о нижеследующем:
            </p>

            <div className="space-y-1.5 pl-3 border-l-2 border-teal-500 font-sans text-[11px]">
              <p><strong>1. Предмет договора:</strong> Продавец обязуется передать в собственность Покупателя питомца ({petSpecies}, порода: {petBreed}, кличка: {petName}, пол: {petGender}, чип: {petMicrochip}), а Покупатель обязуется принять питомца и уплатить сумму в размере <strong>{Number(petPrice).toLocaleString('ru-RU')} рублей</strong>.</p>
              <p><strong>2. Гарантии здоровья:</strong> Продавец подтверждает, что животное клинически здорово, дегельминтизировано и имеет ветеринарный паспорт со всеми отметками по возрасту.</p>
              <p><strong>3. Ответственность:</strong> Покупатель гарантирует гуманное обращение, своевременную вакцинацию и внесение питомца в базу ЗооМаяк.</p>
            </div>

            {/* Signature fields */}
            <div className="pt-6 grid grid-cols-2 gap-8 font-sans text-xs">
              <div className="border-t border-slate-300 dark:border-slate-700 pt-2">
                <div className="font-bold">Продавец:</div>
                <div className="text-[11px] text-slate-500 mt-1">_________________ / {sellerName} /</div>
              </div>
              <div className="border-t border-slate-300 dark:border-slate-700 pt-2">
                <div className="font-bold">Покупатель:</div>
                <div className="text-[11px] text-slate-500 mt-1">_________________ / {buyerName} /</div>
              </div>
            </div>

          </div>

        </div>

        {/* Footer Actions */}
        <div className="p-4 sm:p-6 bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3 shrink-0">
          <div className="text-xs text-slate-500 dark:text-slate-400">
            Договор формируется в соответствии с ГК РФ (ст. 454)
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyText}
              className="px-4 py-2.5 rounded-xl bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold text-xs flex items-center gap-1.5 transition cursor-pointer"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Скопировано' : 'Скопировать текст'}</span>
            </button>

            <button
              onClick={handleDownloadTxt}
              className="px-4 py-2.5 rounded-xl bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold text-xs flex items-center gap-1.5 transition cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Скачать .TXT</span>
            </button>

            <button
              onClick={handlePrint}
              disabled={isPrinting}
              className="px-6 py-2.5 rounded-xl bg-teal-500 hover:bg-teal-600 text-white font-black text-xs shadow-md shadow-teal-500/20 flex items-center gap-1.5 transition cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>{isPrinting ? 'Отправляем на печать...' : 'Распечатать договор'}</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
