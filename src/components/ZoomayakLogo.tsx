import React from 'react';
import { LOGO_FULL, LOGO_MARK } from '../brand';

export const ZoomayakLogo: React.FC<{ className?: string; compact?: boolean }> = ({ className = '', compact = false }) => (
  <span className={`zoomayak-approved-logo ${compact ? 'is-compact' : ''} ${className}`}>
    <img
      src={compact ? LOGO_MARK : LOGO_FULL}
      alt="ЗооМаяк — помогаем найти, соединяем сердца"
      className="zoomayak-approved-logo-img"
      draggable={false}
    />
  </span>
);
