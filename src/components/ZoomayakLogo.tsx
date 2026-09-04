import React from 'react';
import { ZoomayakMark } from './ZoomayakMark';

interface ZoomayakLogoProps {
  className?: string;
  compact?: boolean;
  showSlogan?: boolean;
}

export const ZoomayakLogo: React.FC<ZoomayakLogoProps> = ({
  className = '',
  compact = false,
  showSlogan = true,
}) => {
  if (compact) {
    return (
      <span className={`zm-logo zm-logo--compact ${className}`} aria-label="ЗооМаяк">
        <ZoomayakMark className="zm-logo-mark" />
      </span>
    );
  }

  return (
    <span
      className={`zm-logo ${showSlogan ? '' : 'zm-logo--no-slogan'} ${className}`}
      aria-label="ЗооМаяк — Ваш ориентир в мире питомцев"
    >
      <ZoomayakMark className="zm-logo-mark" />
      <span className="zm-logo-text">
        <span className="zm-logo-word">
          Зоо<span>Маяк</span>
        </span>
        {showSlogan && (
          <span className="zm-logo-slogan">Ваш ориентир в мире питомцев</span>
        )}
      </span>
    </span>
  );
};
