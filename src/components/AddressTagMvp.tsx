import React, { useEffect, useRef, useState } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import { Pet } from '../types';

const TAG_MM = 30;
const QR_MM = 20;

export const AddressTagMvp: React.FC<{ pet: Pet }> = ({ pet }) => {
  const [side, setSide] = useState<'front' | 'back'>('front');
  const boxRef = useRef<HTMLDivElement>(null);
  const [tagPx, setTagPx] = useState(280);

  useEffect(() => {
    const el = boxRef.current;
    if (!el) return;
    const update = () => setTagPx(el.clientWidth);
    update();
    const observer = new ResizeObserver(update);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const qrPx = Math.max(72, Math.round(tagPx * (QR_MM / TAG_MM)));
  const emblemMax = Math.round(qrPx * 0.25);
  const emblemWidth = emblemMax;
  const emblemHeight = Math.round((emblemMax * 467) / 540);
  const excavateSize = emblemMax + 8;
  const qrValue = `${window.location.origin}/${encodeURIComponent(pet.zmId)}`;
  const qrMarkSrc = '/logo/zoomayak-qr-mark.png';
  const tagMarkSrc = '/logo/zoomayak-tag-mark.png';

  return (
    <div className="min-h-screen bg-[#eef2f4] text-slate-900 p-4 sm:p-8 overflow-x-hidden">
      <div className="max-w-lg mx-auto space-y-6">
        <div>
          <a href="/" className="text-xs font-bold text-teal-700 hover:underline">
            ← На главную
          </a>
          <h1 className="text-2xl font-black mt-2">Адресная бирка</h1>
          <p className="text-sm text-slate-500 mt-1">Круг · 30 мм · QR 20 мм · предпросмотр</p>
        </div>

        <div className="flex rounded-xl overflow-hidden border border-slate-200 bg-white">
          <button
            type="button"
            onClick={() => setSide('front')}
            className={`flex-1 py-2.5 text-sm font-extrabold ${
              side === 'front' ? 'bg-slate-900 text-white' : 'text-slate-600'
            }`}
          >
            Лицевая сторона
          </button>
          <button
            type="button"
            onClick={() => setSide('back')}
            className={`flex-1 py-2.5 text-sm font-extrabold ${
              side === 'back' ? 'bg-slate-900 text-white' : 'text-slate-600'
            }`}
          >
            Оборотная сторона
          </button>
        </div>

        <div className="flex justify-center py-4">
          <div ref={boxRef} className="relative w-full max-w-[320px] aspect-square">
            <div
              className="absolute inset-0 rounded-full overflow-hidden"
              style={{
                background:
                  'radial-gradient(circle at 32% 28%, #f4f6f8 0%, #cfd5db 42%, #9aa3ab 78%, #d7dde2 100%)',
                boxShadow:
                  'inset 0 1px 2px rgba(255,255,255,.7), inset 0 -10px 18px rgba(0,0,0,.18), 0 18px 40px rgba(15,23,42,.22)',
              }}
            >
              <div
                className="absolute left-1/2 -translate-x-1/2 rounded-full"
                style={{
                  top: '3.2%',
                  width: '7.5%',
                  height: '7.5%',
                  background: '#eef2f4',
                  boxShadow: 'inset 0 0 0 2px #b7bec5, 0 0 0 1px #8e969d',
                }}
              />

              {side === 'front' ? (
                <>
                  <div
                    className="absolute left-0 right-0 text-center font-black uppercase tracking-wide text-slate-900"
                    style={{ top: '12.5%', fontSize: tagPx * 0.048, lineHeight: 1 }}
                  >
                    {pet.name}
                  </div>
                  <div
                    className="absolute bg-white"
                    style={{
                      width: qrPx,
                      height: qrPx,
                      left: '50%',
                      top: '50%',
                      transform: 'translate(-50%, -50%)',
                    }}
                  >
                    <QRCodeCanvas
                      value={qrValue}
                      size={qrPx}
                      level="H"
                      includeMargin={true}
                      marginSize={4}
                      bgColor="#ffffff"
                      fgColor="#000000"
                      imageSettings={{
                        src: qrMarkSrc,
                        height: excavateSize,
                        width: excavateSize,
                        excavate: true,
                      }}
                    />
                    <div
                      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white flex items-center justify-center pointer-events-none"
                      style={{ width: excavateSize, height: excavateSize }}
                    >
                      <img
                        src={qrMarkSrc}
                        alt=""
                        className="object-contain"
                        style={{ width: emblemWidth, height: emblemHeight }}
                      />
                    </div>
                  </div>
                  <div
                    className="absolute left-0 right-0 text-center font-mono font-black text-slate-900 tracking-wide"
                    style={{ bottom: '8%', fontSize: tagPx * 0.04 }}
                  >
                    {pet.zmId}
                  </div>
                </>
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-[12%]">
                  <img
                    src={tagMarkSrc}
                    alt=""
                    className="object-contain rounded-full"
                    style={{
                      width: '40%',
                      height: '40%',
                      background: '#111111',
                      filter: 'brightness(9)',
                    }}
                  />
                  <div
                    className="font-extrabold text-slate-900 mt-3"
                    style={{ fontSize: tagPx * 0.05 }}
                  >
                    Нашли питомца?
                  </div>
                  <div className="font-black text-slate-900 mt-1" style={{ fontSize: tagPx * 0.045 }}>
                    zoomayak.ru
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
