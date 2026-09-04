import React from 'react';

interface ZoomayakMarkProps {
  className?: string;
  title?: string;
}

/**
 * Matches the approved lockup: Labrador head left, cat head right,
 * solid lighthouse in the middle, heart at the base between the muzzles.
 */
export const ZoomayakMark: React.FC<ZoomayakMarkProps> = ({
  className = '',
  title = 'ЗооМаяк',
}) => (
  <svg
    className={`zm-mark ${className}`}
    viewBox="0 0 240 168"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    role="img"
    aria-label={title}
  >
    <title>{title}</title>

    {/* Beams — two thin rays, almost horizontal */}
    <g className="zm-beams" stroke="var(--zm-beam)" strokeLinecap="round">
      <path d="M108 22 L18 16" strokeWidth="2.4" />
      <path d="M132 22 L222 16" strokeWidth="2.4" />
    </g>

    {/* Solid lighthouse with level cut-outs */}
    <path
      className="zm-lighthouse"
      fill="var(--zm-accent)"
      fillRule="evenodd"
      d="M102 48 L138 48 L148 128 L92 128 Z
         M106 74 L134 74 L135 84 L105 84 Z
         M100 102 L140 102 L141 112 L99 112 Z
         M108 48 L108 20 Q108 12 120 12 Q132 12 132 20 L132 48 Z"
    />
    <rect x="100" y="44" width="40" height="8" rx="1.5" fill="var(--zm-accent)" />
    <circle className="zm-lamp" cx="120" cy="24" r="6.5" fill="var(--zm-beam)" />

    <g
      className="zm-outline"
      stroke="var(--zm-accent)"
      strokeWidth="5.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* Labrador head, facing the lighthouse */}
      <path d="M28 108
               C24 88 34 70 54 64
               C68 60 84 66 92 78
               C98 88 94 100 82 106
               C70 112 54 108 44 100
               C38 110 30 118 28 108 Z" />
      <path d="M42 74 C28 80 22 98 28 116" />
      <circle cx="72" cy="82" r="3" fill="var(--zm-accent)" stroke="none" />

      {/* Cat head, facing the lighthouse */}
      <circle cx="168" cy="86" r="22" />
      <path d="M154 72 L148 48 L166 70" />
      <path d="M176 70 L190 46 L186 74" />
      <circle cx="158" cy="84" r="3" fill="var(--zm-accent)" stroke="none" />
    </g>

    {/* Heart at the lighthouse base, between the muzzles */}
    <path
      className="zm-heart"
      d="M120 156
         C120 156 98 140 98 124
         C98 114 106 108 114 108
         C118 108 120 112 120 118
         C120 112 122 108 126 108
         C134 108 142 114 142 124
         C142 140 120 156 120 156 Z"
      fill="var(--zm-heart)"
    />
  </svg>
);
