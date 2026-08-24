import React from 'react';

interface ZoomayakLogoProps {
  className?: string;
  compact?: boolean;
  showSlogan?: boolean;
}

/**
 * ЗооМаяк — утверждённый master lockup.
 * Светлая и тёмная версии имеют один и тот же холст 242×86,
 * поэтому в header они занимают абсолютно одинаковое место.
 * Artwork животных/маяка не перерисовывается.
 */
export const ZoomayakLogo: React.FC<ZoomayakLogoProps> = ({
  className = '',
  compact = false,
  showSlogan = true,
}) => {
  if (compact) {
    return (
      <span className={`zoomayak-logo-compact bg-transparent ${className}`} aria-label="ЗооМаяк">
        <img
          src="/zoomayak-logo-approved-icon.png"
          alt=""
          className="zoomayak-logo-icon zoomayak-logo-light bg-transparent mix-blend-multiply dark:mix-blend-normal"
          aria-hidden="true"
        />
        <img
          src="/zoomayak-logo-dark-icon.png"
          alt=""
          className="zoomayak-logo-icon zoomayak-logo-dark bg-transparent"
          aria-hidden="true"
        />
      </span>
    );
  }

  return (
    <span
      className={`zoomayak-approved-logo bg-transparent ${className}`}
      aria-label="ЗооМаяк — Ваш ориентир в мире питомцев"
    >
      <img
        src="/zoomayak-logo-approved.png"
        alt="ЗооМаяк — Ваш ориентир в мире питомцев"
        className="zoomayak-approved-logo-img zoomayak-logo-light bg-transparent mix-blend-multiply dark:mix-blend-normal"
      />
      <img
        src="/zoomayak-logo-dark-neon-approved.png"
        alt="ЗооМаяк — Ваш ориентир в мире питомцев"
        className={`zoomayak-approved-logo-img zoomayak-logo-dark bg-transparent${showSlogan ? '' : ' zoomayak-no-slogan'}`}
      />
    </span>
  );
};
