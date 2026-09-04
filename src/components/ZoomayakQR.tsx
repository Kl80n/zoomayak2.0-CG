import React from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import { QR_MARK } from '../brand';

interface ZoomayakQRProps {
  value: string;
  size?: number;
  logoSize?: number;
  className?: string;
}

export const ZoomayakQR: React.FC<ZoomayakQRProps> = ({
  value,
  size = 120,
  logoSize,
  className = '',
}) => {
  const mark = logoSize || Math.max(18, Math.round(size * 0.22));
  return (
    <div className={`zoomayak-qr ${className}`} style={{ width: size, height: size }}>
      <QRCodeCanvas
        value={value}
        size={size}
        level="H"
        includeMargin={false}
        bgColor="#ffffff"
        fgColor="#0a1a14"
        imageSettings={{
          src: QR_MARK,
          height: mark,
          width: mark,
          excavate: true,
        }}
      />
    </div>
  );
};
