import React, { useCallback, useEffect, useRef, useState } from 'react';
import { X, QrCode, Camera, Search, Phone, Check, AlertCircle, RefreshCw, SwitchCamera } from 'lucide-react';
import confetti from 'canvas-confetti';
import { BrowserQRCodeReader, IScannerControls } from '@zxing/browser';
import { Pet } from '../types';

interface ScanModalProps {
  isOpen: boolean;
  onClose: () => void;
  pets: Pet[];
  onOpenPetProfile: (pet: Pet) => void;
}

export const ScanModal: React.FC<ScanModalProps> = ({ isOpen, onClose, pets, onOpenPetProfile }) => {
  const [searchInput, setSearchInput] = useState('');
  const [scannedPet, setScannedPet] = useState<Pet | null>(null);
  const [isScanning, setIsScanning] = useState(true);
  const [cameraState, setCameraState] = useState<'starting' | 'ready' | 'denied' | 'unsupported' | 'error'>('starting');
  const [cameraMessage, setCameraMessage] = useState('Запрашиваем доступ к камере…');
  const [cameraFacing, setCameraFacing] = useState<'environment' | 'user'>('environment');
  const [cameraDevices, setCameraDevices] = useState<MediaDeviceInfo[]>([]);
  const [cameraDeviceIndex, setCameraDeviceIndex] = useState(0);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const controlsRef = useRef<IScannerControls | null>(null);
  const readerRef = useRef<BrowserQRCodeReader | null>(null);

  const stopCamera = useCallback(() => {
    controlsRef.current?.stop();
    controlsRef.current = null;
    const stream = videoRef.current?.srcObject as MediaStream | null;
    stream?.getTracks().forEach(track => track.stop());
    if (videoRef.current) videoRef.current.srcObject = null;
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const findPetFromQr = useCallback((raw: string) => {
    const value = raw.trim();
    const normalized = value.toLowerCase();
    let urlId = '';
    try {
      const parsed = new URL(value);
      const match = parsed.pathname.match(/^\/qr\/([^/]+)/i);
      if (match) urlId = decodeURIComponent(match[1]).toLowerCase();
    } catch { /* plain ZM-ID */ }
    const candidate = urlId || normalized;
    return pets.find(p =>
      p.zmId.toLowerCase() === candidate ||
      p.microchipId === value ||
      p.zmId.toLowerCase().includes(candidate) ||
      p.microchipId.includes(value)
    ) ?? null;
  }, [pets]);

  const handleDecodedText = useCallback((raw: string) => {
    const found = findPetFromQr(raw);
    if (!found) {
      setCameraMessage(`QR считан: ${raw.slice(0, 70)}${raw.length > 70 ? '…' : ''}`);
      return;
    }
    stopCamera();
    setIsScanning(false);
    setScannedPet(found);
    confetti({ particleCount: 40 });
  }, [findPetFromQr, stopCamera]);

  const startCamera = useCallback(async (requestedFacing: 'environment' | 'user' = 'environment', requestedIndex = 0) => {
    stopCamera();
    setCameraState('starting');
    setCameraMessage('Запрашиваем доступ к камере…');

    if (!navigator.mediaDevices?.getUserMedia) {
      setCameraState('unsupported');
      setCameraMessage('Браузер не поддерживает доступ к камере. Используйте HTTPS и современный браузер.');
      return;
    }

    try {
      const permissionStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: { ideal: requestedFacing } },
        audio: false,
      });
      permissionStream.getTracks().forEach(track => track.stop());

      const devices = (await navigator.mediaDevices.enumerateDevices()).filter(d => d.kind === 'videoinput');
      setCameraDevices(devices);
      const index = requestedIndex ?? cameraDeviceIndex;
      const selectedDevice = devices[index] ?? devices[0];

      const reader = readerRef.current ?? new BrowserQRCodeReader();
      readerRef.current = reader;
      const video = videoRef.current;
      if (!video) return;

      const videoConstraint = selectedDevice
        ? { deviceId: { exact: selectedDevice.deviceId } }
        : { facingMode: { ideal: requestedFacing } };

      const controls = await reader.decodeFromConstraints(
        { video: videoConstraint, audio: false },
        video,
        (result) => {
          if (result) handleDecodedText(result.getText());
        },
      );

      controlsRef.current = controls;
      setCameraState('ready');
      setCameraMessage('Наведите камеру на QR-адресник');
    } catch (error) {
      console.error('QR camera error:', error);
      const name = error instanceof DOMException ? error.name : '';
      if (name === 'NotAllowedError' || name === 'SecurityError') {
        setCameraState('denied');
        setCameraMessage('Доступ к камере запрещён в браузере.');
      } else if (name === 'NotFoundError' || name === 'OverconstrainedError') {
        setCameraState('error');
        setCameraMessage('Камера не найдена или недоступна.');
      } else {
        setCameraState('error');
        setCameraMessage('Не удалось запустить камеру.');
      }
    }
  }, [cameraDeviceIndex, handleDecodedText, stopCamera]);

  useEffect(() => {
    if (!isOpen) {
      stopCamera();
      return;
    }
    setScannedPet(null);
    setIsScanning(true);
    const timer = window.setTimeout(() => { void startCamera(); }, 120);
    return () => {
      window.clearTimeout(timer);
      stopCamera();
    };
  }, [isOpen, startCamera, stopCamera]);

  const resetScanner = () => {
    setScannedPet(null);
    setIsScanning(true);
    void startCamera(cameraFacing, cameraDeviceIndex);
  };

  const switchCamera = async () => {
    if (cameraDevices.length > 1) {
      const nextIndex = (cameraDeviceIndex + 1) % cameraDevices.length;
      setCameraDeviceIndex(nextIndex);
      await startCamera(cameraFacing, nextIndex);
      return;
    }

    const nextFacing = cameraFacing === 'environment' ? 'user' : 'environment';
    setCameraFacing(nextFacing);
    setCameraDeviceIndex(0);
    await startCamera(nextFacing, 0);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchInput.trim()) return;
    const found = findPetFromQr(searchInput);
    if (found) {
      stopCamera();
      setIsScanning(false);
      setScannedPet(found);
      confetti({ particleCount: 40 });
    } else {
      alert('Питомец с таким ZM-ID или чипом не найден.');
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/80 backdrop-blur-xl overflow-y-auto cursor-pointer"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-xl bg-white dark:bg-slate-900 text-slate-900 dark:text-white border border-slate-200 dark:border-teal-500/40 rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden my-1 sm:my-6 text-left cursor-default"
        onClick={e => e.stopPropagation()}
      >
        <div className="bg-gradient-to-r from-emerald-50 via-teal-50/60 to-cyan-50 dark:from-teal-950 dark:via-slate-900 dark:to-cyan-950 px-4 sm:px-6 py-3 sm:py-4 border-b border-slate-200 dark:border-teal-500/20 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-9 h-9 sm:w-10 sm:h-10 shrink-0 rounded-xl bg-teal-500 flex items-center justify-center text-white shadow-md">
              <QrCode className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <h3 className="text-base sm:text-lg font-extrabold text-slate-900 dark:text-white truncate">Сканер QR-Маяка</h3>
              <p className="text-[10px] sm:text-xs text-teal-700 dark:text-teal-300 font-medium truncate">Наведите камеру на QR-адресник</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-xl bg-white dark:bg-slate-800 hover:bg-rose-100 hover:text-rose-600 dark:hover:bg-rose-950 dark:hover:text-rose-400 text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-700 shrink-0 cursor-pointer" aria-label="Закрыть">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-3 sm:p-6 space-y-4 sm:space-y-6">
          {isScanning && (
            <div className="relative h-[min(62vh,420px)] sm:h-80 rounded-2xl bg-black border-2 border-teal-500/40 overflow-hidden">
              <video ref={videoRef} className="absolute inset-0 w-full h-full object-cover" muted playsInline autoPlay />
              <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-black/20 via-transparent to-black/40" />
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-[min(72vw,260px)] aspect-square border-2 border-teal-300/80 rounded-2xl shadow-[0_0_0_999px_rgba(0,0,0,.32)] relative overflow-hidden">
                  <span className="absolute -top-1 -left-1 w-7 h-7 border-t-4 border-l-4 border-teal-300 rounded-tl-xl z-20" />
                  <span className="absolute -top-1 -right-1 w-7 h-7 border-t-4 border-r-4 border-teal-300 rounded-tr-xl z-20" />
                  <span className="absolute -bottom-1 -left-1 w-7 h-7 border-b-4 border-l-4 border-teal-300 rounded-bl-xl z-20" />
                  <span className="absolute -bottom-1 -right-1 w-7 h-7 border-b-4 border-r-4 border-teal-300 rounded-br-xl z-20" />
                  
                  {/* Active Moving Laser Scan Beam */}
                  <div className="scanner-laser-beam" />
                </div>
              </div>
              <div className="absolute top-3 right-3 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => void switchCamera()}
                  className="rounded-full bg-black/65 backdrop-blur px-3 py-2 text-[10px] sm:text-xs text-white flex items-center gap-2 border border-white/15 hover:bg-black/80"
                  aria-label="Переключить камеру"
                >
                  <SwitchCamera className="w-4 h-4" /> Камера
                </button>
              </div>
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between gap-2">
                <span className="rounded-full bg-black/60 backdrop-blur px-3 py-1.5 text-[10px] sm:text-xs text-white flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${cameraState === 'ready' ? 'bg-emerald-400' : 'bg-amber-400'}`} />
                  {cameraMessage}
                </span>
                {(cameraState === 'denied' || cameraState === 'error' || cameraState === 'unsupported') && (
                  <button onClick={resetScanner} className="rounded-full bg-teal-400 text-slate-950 px-3 py-1.5 text-[10px] font-extrabold flex items-center gap-1.5 cursor-pointer">
                    <RefreshCw className="w-3.5 h-3.5" /> Повторить
                  </button>
                )}
              </div>
            </div>
          )}

          {isScanning && (
            <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/60 p-3 text-[11px] sm:text-xs text-slate-600 dark:text-slate-400 flex gap-2 items-start">
              <Camera className="w-4 h-4 text-teal-600 dark:text-teal-400 shrink-0 mt-0.5" />
              <span>Камера работает прямо в браузере. Разрешите доступ к камере в браузере при запросе.</span>
            </div>
          )}

          {isScanning && (
            <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-2">
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="ZM-ID или номер микрочипа"
                className="flex-1 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-3 text-xs text-slate-900 dark:text-white focus:border-teal-500 focus:outline-none font-mono"
              />
              <button type="submit" className="px-5 py-3 rounded-xl bg-teal-500 hover:bg-teal-600 text-white font-extrabold text-xs flex items-center justify-center gap-2 shadow-md transition cursor-pointer">
                <Search className="w-4 h-4" /> Найти
              </button>
            </form>
          )}

          {scannedPet && (
            <div className="p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-slate-50 dark:bg-slate-950 border-2 border-emerald-500/50 shadow-xl space-y-4">
              <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 text-xs font-bold uppercase tracking-wider">
                <Check className="w-4 h-4" /> Питомец успешно опознан
              </div>
              <div className="flex items-center gap-4">
                <img src={scannedPet.photoUrl} alt={scannedPet.name} className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover ring-2 ring-emerald-500 shadow-md" />
                <div className="min-w-0">
                  <h4 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">{scannedPet.name}</h4>
                  <p className="text-xs font-semibold text-slate-600 dark:text-slate-300">{scannedPet.breed} • {scannedPet.ageText}</p>
                  <p className="text-xs font-mono text-teal-700 dark:text-teal-400 mt-0.5 truncate font-bold">ID: {scannedPet.zmId}</p>
                </div>
              </div>
              <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300 space-y-1 shadow-xs">
                <div><strong>Владелец:</strong> {scannedPet.emergencyContacts[0]?.name}</div>
                <div><strong>Особые приметы:</strong> {scannedPet.specialNotes}</div>
                {scannedPet.allergies.length > 0 && <div className="text-amber-600 dark:text-amber-400 font-semibold flex gap-1"><AlertCircle className="w-4 h-4 shrink-0" /> Внимание: {scannedPet.allergies.join(', ')}</div>}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
                <a href={`tel:${scannedPet.emergencyContacts[0]?.phone}`} className="py-3 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold text-xs flex items-center justify-center gap-2 shadow-md transition">
                  <Phone className="w-4 h-4" /> Позвонить владельцу
                </a>
                <button onClick={() => { onClose(); onOpenPetProfile(scannedPet); }} className="py-3 rounded-xl bg-slate-200 dark:bg-slate-800 text-teal-800 dark:text-teal-300 text-xs font-bold hover:bg-slate-300 dark:hover:bg-slate-700 transition cursor-pointer">Полный паспорт</button>
              </div>
              <button onClick={resetScanner} className="w-full text-center text-xs text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white pt-1 cursor-pointer">Сканировать другого питомца</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
