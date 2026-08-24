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
      <span className={`zoomayak-logo-compact bg-white overflow-hidden rounded-full ${className}`} aria-label="ЗооМаяк">
        <img
          src="/zoomayak-logo-approved-icon.png"
          alt="ЗооМаяк"
          className="zoomayak-logo-icon w-full h-full object-contain"
          aria-hidden="true"
        />
      </span>
    );
  }

  return (
    <span
      className={`zoomayak-approved-logo inline-flex items-center gap-2.5 ${className}`}
      aria-label="ЗооМаяк — Ваш ориентир в мире питомцев"
    >
      <span className="w-10 h-10 shrink-0 rounded-full overflow-hidden bg-white p-0.5">
        <img src="/zoomayak-logo-approved-icon.png" alt="" className="w-full h-full object-contain" aria-hidden="true" />
      </span>
      <span className="flex flex-col leading-tight">
        <span className="text-lg font-black tracking-tight text-slate-950 dark:text-white">
          Зоо<span className="text-teal-600 dark:text-teal-400">Маяк</span>
        </span>
        {showSlogan && <span className="text-[10px] font-semibold text-slate-600 dark:text-slate-300">Ваш ориентир в мире питомцев</span>}
      </span>
    </span>
  );
};

