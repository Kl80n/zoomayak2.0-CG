import React from 'react';

interface ZoomayakMarkProps {
  className?: string;
  title?: string;
}

/**
 * Outline mark: Labrador on the left, cat on the right, heart in the middle.
 */
export const ZoomayakMark: React.FC<ZoomayakMarkProps> = ({
  className = '',
  title = 'ЗооМаяк',
}) => (
  <svg
    className={`zm-mark ${className}`}
    viewBox="0 0 280 200"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    role="img"
    aria-label={title}
  >
    <title>{title}</title>

    <g
      className="zm-outline"
      stroke="var(--zm-accent)"
      strokeWidth="7"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <g transform="translate(-10 0)">
        {/* Labrador sitting, facing the heart */}
        <path d="M28 172 C22 142 32 118 54 112 C68 108 78 118 80 132 C82 148 74 160 62 172 Z" />
        <path d="M78 136 L82 172" />
        <path d="M90 140 L92 172" />
        <path d="M70 118 C74 102 82 90 96 86" />
        <path d="M88 90 C88 74 102 64 116 66 C128 68 138 76 140 86 C142 94 138 100 128 104 C118 108 108 106 100 100 C94 106 88 100 88 90 Z" />
        <path d="M98 74 C86 78 80 94 84 110 C92 104 100 90 102 80" />
        <path d="M32 128 C18 120 10 100 18 82" />
        <circle cx="124" cy="82" r="3.4" fill="var(--zm-accent)" stroke="none" />
      </g>

      <g transform="translate(10 0)">
        {/* Cat sitting, facing the heart */}
        <path d="M252 172 C258 142 248 118 226 112 C212 108 202 118 200 132 C198 148 206 160 218 172 Z" />
        <path d="M202 136 L198 172" />
        <path d="M190 140 L188 172" />
        <path d="M210 118 C206 102 198 90 184 86" />
        <circle cx="176" cy="84" r="22" />
        <path d="M162 70 L156 46 L174 66" />
        <path d="M186 66 L200 44 L196 70" />
        <path d="M248 128 C264 118 270 96 258 78 C250 66 236 70 234 86" />
        <circle cx="168" cy="82" r="3.4" fill="var(--zm-accent)" stroke="none" />
      </g>
    </g>

    <path
      className="zm-heart"
      d="M140 138
         C140 138 110 114 110 90
         C110 78 118 70 128 70
         C134 70 138 74 140 82
         C142 74 146 70 152 70
         C162 70 170 78 170 90
         C170 114 140 138 140 138 Z"
      fill="var(--zm-heart)"
      stroke="var(--zm-accent)"
      strokeWidth="4.5"
      strokeLinejoin="round"
    />
  </svg>
);
