import React from 'react';

interface ZoomayakMarkProps {
  className?: string;
  title?: string;
}

/**
 * Labrador outline left, cat outline right, lighthouse in the middle,
 * heart at the lighthouse base between the two muzzles.
 */
export const ZoomayakMark: React.FC<ZoomayakMarkProps> = ({
  className = '',
  title = 'ЗооМаяк',
}) => (
  <svg
    className={`zm-mark ${className}`}
    viewBox="0 0 280 210"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    role="img"
    aria-label={title}
  >
    <title>{title}</title>

    {/* Light rays from the lantern */}
    <g className="zm-beams" stroke="var(--zm-beam)" strokeLinecap="round">
      <path d="M128 28 L48 8" strokeWidth="3" />
      <path d="M124 38 L40 36" strokeWidth="2.2" opacity="0.7" />
      <path d="M152 28 L232 8" strokeWidth="3" />
      <path d="M156 38 L240 36" strokeWidth="2.2" opacity="0.7" />
    </g>

    {/* Lighthouse */}
    <g className="zm-lighthouse">
      <path
        d="M118 62 L162 62 L174 158 L106 158 Z"
        fill="var(--zm-fill)"
        stroke="var(--zm-accent)"
        strokeWidth="5.5"
        strokeLinejoin="round"
      />
      <path d="M112 96 L168 96 L170 112 L110 112 Z" fill="var(--zm-accent)" />
      <path d="M108 132 L172 132 L173 146 L107 146 Z" fill="var(--zm-accent)" />
      <rect x="112" y="54" width="56" height="10" rx="2" fill="var(--zm-accent)" />
      <path
        d="M124 54 L124 22 Q124 12 140 12 Q156 12 156 22 L156 54"
        fill="var(--zm-fill)"
        stroke="var(--zm-accent)"
        strokeWidth="5.5"
        strokeLinejoin="round"
      />
      <circle className="zm-lamp" cx="140" cy="30" r="8" fill="var(--zm-beam)" />
    </g>

    {/* Labrador + cat outlines, muzzles pointing at the heart */}
    <g
      className="zm-outline"
      stroke="var(--zm-accent)"
      strokeWidth="6.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* Labrador sitting, facing the lighthouse */}
      <path d="M18 188 C14 160 22 136 42 126 C54 120 64 128 66 142 C68 158 58 172 46 188 Z" />
      <path d="M62 146 L66 188" />
      <path d="M74 150 L76 188" />
      <path d="M56 128 C60 112 70 100 84 96" />
      <path d="M76 100 C76 84 90 74 104 76 C116 78 126 86 128 96 C130 104 126 110 116 114 C106 118 96 116 88 110 C82 116 76 110 76 100 Z" />
      <path d="M86 84 C74 88 68 104 72 120 C80 114 88 100 90 90" />
      <path d="M22 144 C8 134 2 114 10 96" />
      <circle cx="112" cy="92" r="3.2" fill="var(--zm-accent)" stroke="none" />

      {/* Cat sitting, facing the lighthouse */}
      <path d="M262 188 C266 160 258 136 238 126 C226 120 216 128 214 142 C212 158 222 172 234 188 Z" />
      <path d="M218 146 L214 188" />
      <path d="M206 150 L204 188" />
      <path d="M224 128 C220 112 210 100 196 96" />
      <circle cx="188" cy="94" r="20" />
      <path d="M174 82 L168 58 L186 78" />
      <path d="M198 78 L212 56 L208 82" />
      <path d="M258 144 C274 134 280 112 268 94 C260 82 246 86 244 102" />
      <circle cx="180" cy="92" r="3.2" fill="var(--zm-accent)" stroke="none" />
    </g>

    {/* Heart at the lighthouse base, between the two muzzles */}
    <path
      className="zm-heart"
      d="M140 196
         C140 196 116 178 116 160
         C116 150 123 144 131 144
         C136 144 139 148 140 154
         C141 148 144 144 149 144
         C157 144 164 150 164 160
         C164 178 140 196 140 196 Z"
      fill="var(--zm-heart)"
      stroke="var(--zm-accent)"
      strokeWidth="3.5"
      strokeLinejoin="round"
    />
  </svg>
);
