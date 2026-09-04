import React, { useState } from 'react';
import { QRCodeCanvas } from 'qrcode.react';

interface ZoomayakQRProps {
  value: string;
  size?: number;
  logoSize?: number;
  className?: string;
  showBorder?: boolean;
  lightBackground?: boolean;
  badgeShape?: 'rounded' | 'circle';
}

export const ZoomayakQR: React.FC<ZoomayakQRProps> = ({
  value,
  size = 120,
  logoSize,
  className = '',
  showBorder = false,
  lightBackground = true,
  badgeShape = 'rounded',
}) => {
  const [imgError, setImgError] = useState(false);

  // Optimal logo size for Level H (~24-26% of QR size ensures 100% scan reliability)
  const computedLogoSize = logoSize || Math.max(26, Math.round(size * 0.25));
  const badgeOuterSize = computedLogoSize + 8;

  return (
    <div
      className={`relative inline-flex items-center justify-center select-none ${
        showBorder ? 'p-2.5 rounded-2xl border border-slate-200/80 dark:border-slate-700/80 shadow-md' : ''
      } ${lightBackground ? 'bg-white' : 'bg-transparent'} ${className}`}
      style={{
        width: showBorder ? `${size + 20}px` : `${size}px`,
        height: showBorder ? `${size + 20}px` : `${size}px`,
      }}
    >
      {/* High error-correction QR code canvas with standard quiet-zone margin and embedded logo */}
      <QRCodeCanvas
        value={value}
        size={size}
        level="H"
        includeMargin={true}
        marginSize={2}
        bgColor="#ffffff"
        fgColor="#0a0f1d"
        imageSettings={{
          src: '/zoomayak-qr-mark.svg',
          height: computedLogoSize,
          width: computedLogoSize,
          excavate: true,
        }}
      />

      {/* Centered official Zoomayak Brand Emblem Plate overlay for crisp display */}
      <div
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white flex items-center justify-center shadow-[0_2px_8px_rgba(0,0,0,0.25)] border border-teal-600/40 overflow-hidden pointer-events-none z-10 ${
          badgeShape === 'circle' ? 'rounded-full' : 'rounded-lg'
        }`}
        style={{
          width: `${badgeOuterSize}px`,
          height: `${badgeOuterSize}px`,
        }}
      >
        {!imgError ? (
          <img
            src="/logo/zoomayak-master.png"
            alt="ЗооМаяк"
            className="w-full h-full object-contain p-0.5"
            loading="eager"
            onError={() => setImgError(true)}
          />
        ) : (
          /* High-contrast vector Lighthouse fallback */
          <svg viewBox="0 0 36 36" className="w-full h-full p-0.5 text-teal-600" fill="currentColor">
            <path d="M15 8h6l2 16H13l2-16Z" fill="#0d9488" />
            <path d="M12 24h12v4H12z" fill="#0f766e" />
            <circle cx="18" cy="6" r="3" fill="#14b8a6" />
            <path d="M7 6l5 2M29 6l-5 2" stroke="#14b8a6" strokeWidth="2" strokeLinecap="round" />
          </svg>
        )}
      </div>
    </div>
  );
};
