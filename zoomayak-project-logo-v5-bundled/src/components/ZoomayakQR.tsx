import zoomayakQrMark from '../assets/zoomayak-qr-mark.png';
import React, { useEffect, useRef } from 'react';
import QRCode from 'qrcode';

interface ZoomayakQRProps {
  value: string;
  size?: number;
  logoSize?: number;
  className?: string;
}

export const ZoomayakQR: React.FC<ZoomayakQRProps> = ({
  value,
  size = 180,
  logoSize,
  className = '',
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current || !value) return;

    QRCode.toCanvas(canvasRef.current, value, {
      width: size,
      margin: 2,
      errorCorrectionLevel: 'H',
      color: {
        dark: '#111111',
        light: '#ffffff',
      },
    });
  }, [value, size]);

  const computedLogoSize = logoSize || Math.max(44, Math.round(size * 0.32));

  return (
    <div
      className={`relative inline-flex items-center justify-center ${className}`}
      style={{ width: size, height: size }}
    >
      <canvas
        ref={canvasRef}
        width={size}
        height={size}
        className="block"
        aria-label="QR-код ЗооМаяк"
      />

      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white flex items-center justify-center shadow-sm"
        style={{
          width: computedLogoSize + 8,
          height: computedLogoSize + 8,
          padding: 4,
        }}
      >
        <img
          src={zoomayakQrMark}
          alt="ЗооМаяк"
          style={{
            width: computedLogoSize,
            height: computedLogoSize,
            objectFit: 'contain',
            display: 'block',
          }}
        />
      </div>
    </div>
  );
};
