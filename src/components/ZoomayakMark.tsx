import React from 'react';

interface ZoomayakMarkProps {
  className?: string;
  title?: string;
}

/**
 * Brand mark: dog left, cat right, lighthouse in the middle
 * with a dog paw as the lamp. Colors come from CSS variables
 * so the same drawing works in light and dark themes.
 */
export const ZoomayakMark: React.FC<ZoomayakMarkProps> = ({
  className = '',
  title = 'ЗооМаяк',
}) => (
  <svg
    className={`zm-mark ${className}`}
    viewBox="0 0 240 240"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    role="img"
    aria-label={title}
  >
    <title>{title}</title>

    {/* Light beams from the paw-lamp */}
    <g className="zm-beams" stroke="var(--zm-beam)" strokeLinecap="round">
      <path d="M92 36 L28 14" strokeWidth="3.2" />
      <path d="M88 48 L22 44" strokeWidth="2.4" opacity="0.75" />
      <path d="M90 24 L48 4" strokeWidth="2" opacity="0.55" />
      <path d="M148 36 L212 14" strokeWidth="3.2" />
      <path d="M152 48 L218 44" strokeWidth="2.4" opacity="0.75" />
      <path d="M150 24 L192 4" strokeWidth="2" opacity="0.55" />
    </g>

    {/* Dog — sitting, facing the lighthouse */}
    <g className="zm-animal zm-dog">
      <path
        d="M22 200
           C18 176 22 152 36 138
           C44 128 52 126 60 132
           C62 114 70 100 86 92
           C98 86 108 92 112 104
           C116 114 112 122 104 128
           C110 132 112 142 106 154
           C100 148 90 148 84 154
           C80 168 72 184 64 200
           Z"
        fill="var(--zm-fill)"
        stroke="var(--zm-accent)"
        strokeWidth="3.2"
        strokeLinejoin="round"
      />
      <path
        d="M70 100 C60 106 52 122 54 138 C64 132 74 118 78 108 Z"
        fill="var(--zm-fill)"
        stroke="var(--zm-accent)"
        strokeWidth="2.4"
        strokeLinejoin="round"
      />
      <path
        d="M106 104 C118 102 126 108 128 114 C122 118 110 116 104 112 Z"
        fill="var(--zm-fill)"
        stroke="var(--zm-accent)"
        strokeWidth="2.2"
        strokeLinejoin="round"
      />
      <circle cx="126" cy="112" r="2.4" fill="var(--zm-accent)" />
      <circle cx="96" cy="102" r="3.2" fill="var(--zm-paw)" />
      <path
        d="M30 156 C16 146 10 126 18 108"
        stroke="var(--zm-accent)"
        strokeWidth="5"
        strokeLinecap="round"
        fill="none"
      />
    </g>

    {/* Cat — sitting, facing the lighthouse */}
    <g className="zm-animal zm-cat">
      <path
        d="M218 200
           C222 176 218 152 204 138
           C196 128 188 126 180 132
           C178 114 170 100 154 92
           C142 86 132 92 128 104
           C124 114 128 122 136 128
           C130 132 128 142 134 154
           C140 148 150 148 156 154
           C160 168 168 184 176 200
           Z"
        fill="var(--zm-fill)"
        stroke="var(--zm-accent)"
        strokeWidth="3.2"
        strokeLinejoin="round"
      />
      <path
        d="M140 96 L136 68 L156 90 Z"
        fill="var(--zm-fill)"
        stroke="var(--zm-accent)"
        strokeWidth="2.4"
        strokeLinejoin="round"
      />
      <path
        d="M164 88 L178 62 L182 94 Z"
        fill="var(--zm-fill)"
        stroke="var(--zm-accent)"
        strokeWidth="2.4"
        strokeLinejoin="round"
      />
      <circle cx="148" cy="102" r="3.2" fill="var(--zm-paw)" />
      <path
        d="M210 158 C226 148 232 126 222 108 C214 96 202 100 200 114"
        stroke="var(--zm-accent)"
        strokeWidth="5"
        strokeLinecap="round"
        fill="none"
      />
    </g>

    {/* Lighthouse tower */}
    <path
      d="M96 78 L144 78 L158 186 L82 186 Z"
      fill="var(--zm-fill)"
      stroke="var(--zm-accent)"
      strokeWidth="3.2"
      strokeLinejoin="round"
    />
    <path d="M90 118 L150 118 L152 136 L88 136 Z" fill="var(--zm-accent)" opacity="0.92" />
    <path d="M86 158 L154 158 L156 174 L84 174 Z" fill="var(--zm-accent)" opacity="0.92" />

    {/* Gallery / lantern housing */}
    <rect
      x="88"
      y="66"
      width="64"
      height="12"
      rx="2"
      fill="var(--zm-accent)"
    />
    <path
      d="M98 66 L98 28 Q98 18 108 18 H132 Q142 18 142 28 V66"
      fill="var(--zm-fill)"
      stroke="var(--zm-accent)"
      strokeWidth="3.2"
      strokeLinejoin="round"
    />

    {/* Paw instead of the lamp */}
    <g className="zm-paw">
      <ellipse cx="120" cy="48" rx="16" ry="12.5" fill="var(--zm-paw)" />
      <circle cx="102" cy="34" r="6.2" fill="var(--zm-paw)" />
      <circle cx="113" cy="26" r="6.6" fill="var(--zm-paw)" />
      <circle cx="127" cy="26" r="6.6" fill="var(--zm-paw)" />
      <circle cx="138" cy="34" r="6.2" fill="var(--zm-paw)" />
    </g>

    {/* Base connecting the three figures */}
    <path
      d="M28 204 C72 192 168 192 212 204 C168 200 72 200 28 204 Z"
      fill="var(--zm-accent)"
    />
  </svg>
);
