import React from 'react';
import masterLogo from '../assets/zoomayak-master.png';
import qrMark from '../assets/zoomayak-qr-mark.png';

interface ZoomayakLogoProps {
  className?: string;
  compact?: boolean;
  showSlogan?: boolean;
}

/** Единый утверждённый master-логотип. Один artwork для светлой и тёмной темы. */
export const ZoomayakLogo: React.FC<ZoomayakLogoProps> = ({
  className = '',
  compact = false,
  showSlogan = true,
}) => {
  return (
    <span
      className={`zoomayak-master-logo ${compact ? 'is-compact' : ''} ${className}`}
      aria-label="ЗооМаяк — Ваш ориентир в мире питомцев"
    >
      <img
        src={compact ? qrMark : masterLogo}
        alt={compact ? '' : 'ЗооМаяк — Ваш ориентир в мире питомцев'}
        className="zoomayak-master-logo-img"
        aria-hidden={compact ? true : undefined}
      />
    </span>
  );
};
