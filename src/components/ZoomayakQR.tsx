import React from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import { QR_MARK } from '../brand';
import { ZoomayakMark } from './ZoomayakMark';

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
      <QRCodeCanvas
        value={value}
        size={size}
        level="H"
        includeMargin={true}
        marginSize={2}
        bgColor="#ffffff"
        fgColor="#0a0f1d"
        imageSettings={{
          src: QR_MARK,
          height: computedLogoSize,
          width: computedLogoSize,
          excavate: true,
        }}
      />

      <div
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white flex items-center justify-center shadow-[0_2px_8px_rgba(0,0,0,0.25)] border border-teal-600/40 overflow-hidden pointer-events-none z-10 ${
          badgeShape === 'circle' ? 'rounded-full' : 'rounded-lg'
        }`}
        style={{
          width: `${badgeOuterSize}px`,
          height: `${badgeOuterSize}px`,
          // Force the light-theme mark colors inside the white QR plate.
          ['--zm-fill' as string]: '#0f172a',
          ['--zm-accent' as string]: '#0d9488',
          ['--zm-paw' as string]: '#14b8a6',
          ['--zm-beam' as string]: '#f59e0b',
        }}
      >
        <ZoomayakMark className="w-full h-full p-[6%]" />
      </div>
    </div>
  );
};
