import React from 'react';

interface ZoomayakMarkProps {
  className?: string;
  title?: string;
}

/**
 * Brand mark: Labrador outline on the left, cat outline on the right,
 * heart in the middle. Stroke-only so one drawing works in both themes.
 */
export const ZoomayakMark: React.FC<ZoomayakMarkProps> = ({
  className = '',
  title = 'ЗооМаяк',
}) => (
  <svg
    className={`zm-mark ${className}`}
    viewBox="0 0 260 200"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    role="img"
    aria-label={title}
  >
    <title>{title}</title>

    <g
      className="zm-outline"
      stroke="var(--zm-accent)"
      strokeWidth="6.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* Labrador sitting, facing the heart — blocky head, floppy ear, otter tail */}
      <path d="M24 178
               C22 152 28 130 42 118
               C38 102 42 86 58 76
               C70 68 86 72 92 84
               C102 80 114 86 118 96
               C122 104 118 112 108 114
               C100 116 94 110 90 106
               C86 120 80 142 76 162
               C84 158 92 164 88 178 Z" />
      <path d="M62 84 C50 90 44 108 48 122" />
      <path d="M30 138 C16 128 12 108 20 90" />
      <circle cx="100" cy="92" r="3" fill="var(--zm-accent)" stroke="none" />

      {/* Cat sitting, facing the heart — pointed ears, curled tail */}
      <path d="M236 178
               C238 152 232 130 218 118
               C222 102 218 86 202 76
               C190 68 174 72 168 84
               C158 80 146 86 142 96
               C138 104 142 112 152 114
               C160 116 166 110 170 106
               C174 120 180 142 184 162
               C176 158 168 164 172 178 Z" />
      <path d="M176 80 L170 54 L188 76" />
      <path d="M192 74 L206 50 L208 78" />
      <path d="M230 140 C246 128 250 106 238 88 C230 76 216 80 214 96" />
      <circle cx="160" cy="92" r="3" fill="var(--zm-accent)" stroke="none" />
    </g>

    {/* Heart in the middle */}
    <path
      className="zm-heart"
      d="M130 136
         C130 136 98 110 98 86
         C98 72 108 64 120 64
         C126 64 128 68 130 76
         C132 68 134 64 140 64
         C152 64 162 72 162 86
         C162 110 130 136 130 136 Z"
      fill="var(--zm-heart)"
      stroke="var(--zm-accent)"
      strokeWidth="4"
      strokeLinejoin="round"
    />
  </svg>
);
