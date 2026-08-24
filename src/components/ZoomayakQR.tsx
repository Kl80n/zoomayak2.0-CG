import React from 'react';
import { QRCodeCanvas } from 'qrcode.react';

/** Единственный утверждённый знак для QR: маяк, собака, кот и сердце. */
export const ZOOMAYAK_QR_LOGO_SRC = '/zoomayak-logo-approved-icon.png';

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
  // Level H plus an excavated centre keeps the larger brand mark scannable.
  // Do not let a caller cover more than 30% of either QR dimension.
  const computedLogoSize = Math.min(
    logoSize || Math.max(14, Math.round(size * 0.3)),
    Math.round(size * 0.3),
  );

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
      {/* Black-and-white QR with a reserved white centre for the official colour mark. */}
      <QRCodeCanvas
        value={value}
        size={size}
        level="H"
        includeMargin={true}
        marginSize={2}
        bgColor="#ffffff"
        fgColor="#111111"
        imageSettings={{
          src: ZOOMAYAK_QR_LOGO_SRC,
          height: computedLogoSize,
          width: computedLogoSize,
          excavate: true,
        }}
      />
    </div>
  );
};

