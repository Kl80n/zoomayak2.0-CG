import React from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import { ZOOMAYAK_QR_LOGO_SRC } from './ZoomayakQR';

export type TagShape = 'circle' | 'paw' | 'shield';
export type TagMaterial = 'silver' | 'black' | 'gold' | 'copper';

interface RealisticMetalTagProps {
  shape: TagShape;
  material?: TagMaterial;
  side?: 'front' | 'back';
  petName?: string;
  phone?: string;
  zmId?: string;
  extraText?: string;
  size?: number; // base render width in pixels
  className?: string;
  onClick?: () => void;
  showShadow?: boolean;
  selected?: boolean;
}

export const RealisticMetalTag: React.FC<RealisticMetalTagProps> = ({
  shape,
  material = 'silver',
  side = 'front',
  petName = 'Барни',
  phone = '+7 (905) 123-45-67',
  zmId = 'ZM-2025-0001',
  extraText = 'Если я потерялся, просканируйте QR или перейдите по ссылке:',
  size = 280,
  className = '',
  onClick,
  showShadow = true,
  selected = false,
}) => {
  // Unique gradient IDs per material/shape/side to avoid SVG collisions
  const gradId = `metal-grad-${shape}-${material}-${side}-${Math.round(size)}`;
  const brushId = `brush-pattern-${material}-${Math.round(size)}`;

  // Material color definitions
  const getMatColors = () => {
    switch (material) {
      case 'black':
        return {
          id: 'black',
          name: 'Черный Оникс (DLC)',
          gradStart: '#3a3c40',
          gradMid: '#242629',
          gradEnd: '#131416',
          strokeColor: '#5a5d63',
          innerStroke: '#151618',
          engraveColor: '#0a0b0d',
          engraveText: '#d8dcde',
          qrBg: '#ffffff',
          qrFg: '#0f1115',
          holeRim: '#484b50',
          brushOpacity: 0.22,
          swatchBg: '#2b2d30',
        };
      case 'gold':
        return {
          id: 'gold',
          name: 'Золото 24K (PVD)',
          gradStart: '#f3d683',
          gradMid: '#d8aa49',
          gradEnd: '#9e731b',
          strokeColor: '#fae6a6',
          innerStroke: '#7a5407',
          engraveColor: '#422a03',
          engraveText: '#3a2403',
          qrBg: '#ffffff',
          qrFg: '#241703',
          holeRim: '#f0d27c',
          brushOpacity: 0.18,
          swatchBg: '#cf9e46',
        };
      case 'copper':
        return {
          id: 'copper',
          name: 'Медь / Розовое золото',
          gradStart: '#e49a8c',
          gradMid: '#bf7062',
          gradEnd: '#873f32',
          strokeColor: '#f1bcb2',
          innerStroke: '#5a2219',
          engraveColor: '#3d1610',
          engraveText: '#2e0f0a',
          qrBg: '#ffffff',
          qrFg: '#260b07',
          holeRim: '#df9c90',
          brushOpacity: 0.2,
          swatchBg: '#b86b5c',
        };
      case 'silver':
      default:
        return {
          id: 'silver',
          name: 'Сатинированная сталь 316L',
          gradStart: '#f0f2f4',
          gradMid: '#d7dbdf',
          gradEnd: '#aeb4ba',
          strokeColor: '#ffffff',
          innerStroke: '#7d8389',
          engraveColor: '#1d2228',
          engraveText: '#181d22',
          qrBg: '#ffffff',
          qrFg: '#11161d',
          holeRim: '#e8eaec',
          brushOpacity: 0.28,
          swatchBg: '#cbcfd3',
        };
    }
  };

  const mat = getMatColors();

  // Shape geometric paths & dimensional metadata based on the prototype screenshot
  const getShapeData = () => {
    switch (shape) {
      case 'circle':
        return {
          title: 'КРУГ',
          dim: 'Ø 30 мм',
          subtitle: 'Классика и универсальность',
          // Symmetrical round medallion
          path: 'M 150 44 C 220 44 274 98 274 168 C 274 238 220 292 150 292 C 80 292 26 238 26 168 C 26 98 80 44 150 44 Z',
          hole: { cx: 150, cy: 68, r: 12 },
          front: {
            qrY: 160,
            qrSize: 108,
            brandY: 238,
            brandSize: 14.5,
          },
          back: {
            textStartY: 122,
            lineSpacing: 18,
            textSize: 12,
            linkSize: 12.5,
            pawY: 228,
            pawSize: 26,
          },
        };

      case 'paw':
        return {
          title: 'ЛАПА',
          dim: '30 × 32 мм',
          subtitle: 'Дружелюбно и мило',
          // Symmetrical 4-toed pet paw medal with top central mounting toe
          path: 'M 150 26 C 165 26 175 38 175 54 C 190 45 214 44 228 58 C 244 74 239 100 227 114 C 248 119 268 138 268 163 C 268 190 248 210 228 216 C 238 240 226 270 196 285 C 172 297 150 297 150 297 C 150 297 128 297 104 285 C 74 270 62 240 72 216 C 52 210 32 190 32 163 C 32 138 52 119 73 114 C 61 100 56 74 72 58 C 86 44 110 45 125 54 C 125 38 135 26 150 26 Z',
          hole: { cx: 150, cy: 50, r: 11 },
          front: {
            qrY: 158,
            qrSize: 106,
            brandY: 240,
            brandSize: 14,
          },
          back: {
            textStartY: 126,
            lineSpacing: 18,
            textSize: 11.5,
            linkSize: 12,
            pawY: 232,
            pawSize: 25,
          },
        };

      case 'shield':
      default:
        return {
          title: 'ЩИТ',
          dim: '28 × 34 мм',
          subtitle: 'Надёжно и стильно',
          // Knight shield with curved top edge and point at bottom
          path: 'M 150 32 C 162 32 200 40 236 50 C 248 53 254 60 254 74 C 254 132 248 186 220 236 C 190 282 156 302 150 306 C 144 302 110 282 80 236 C 52 186 46 132 46 74 C 46 60 52 53 64 50 C 100 40 138 32 150 32 Z',
          hole: { cx: 150, cy: 56, r: 12 },
          front: {
            qrY: 158,
            qrSize: 108,
            brandY: 240,
            brandSize: 14.5,
          },
          back: {
            textStartY: 120,
            lineSpacing: 18,
            textSize: 12,
            linkSize: 12.5,
            pawY: 228,
            pawSize: 26,
          },
        };
    }
  };

  const shapeData = getShapeData();
  const displayZmId = zmId || 'ZM-2025-0001';
  const qrTargetUrl = `${window.location.origin}/qr/${encodeURIComponent(displayZmId)}`;

  return (
    <div
      className={`relative inline-flex flex-col items-center select-none transition-transform duration-200 ${
        selected ? 'scale-[1.03]' : ''
      } ${className}`}
      style={{ width: `${size}px` }}
      onClick={onClick}
    >
      <div className="relative w-full aspect-[300/320] flex items-center justify-center">
        {/* Photorealistic Vector Metal Tag SVG */}
        <svg
          viewBox="0 0 300 320"
          className="w-full h-full drop-shadow-[0_16px_22px_rgba(0,0,0,0.38)]"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Linear Metallic Surface Gradient */}
            <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={mat.gradStart} />
              <stop offset="28%" stopColor={mat.gradMid} />
              <stop offset="52%" stopColor={mat.gradStart} />
              <stop offset="78%" stopColor={mat.gradMid} />
              <stop offset="100%" stopColor={mat.gradEnd} />
            </linearGradient>

            {/* Brushed metal fine texture pattern */}
            <pattern
              id={brushId}
              width="80"
              height="3"
              patternUnits="userSpaceOnUse"
            >
              <line
                x1="0"
                y1="1"
                x2="80"
                y2="1"
                stroke="#000000"
                strokeWidth="0.6"
                opacity={mat.brushOpacity}
              />
              <line
                x1="0"
                y1="2.5"
                x2="80"
                y2="2.5"
                stroke="#ffffff"
                strokeWidth="0.4"
                opacity={mat.brushOpacity * 1.2}
              />
            </pattern>

            {/* Hole Depth Shadow */}
            <linearGradient
              id={`hole-grad-${gradId}`}
              x1="0%"
              y1="0%"
              x2="0%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#141518" />
              <stop offset="60%" stopColor="#2a2e34" />
              <stop offset="100%" stopColor="#4c525b" />
            </linearGradient>

            {/* Subtle laser engraving edge filter */}
            <filter id={`laser-filter-${gradId}`} x="-10%" y="-10%" width="120%" height="120%">
              <feDropShadow
                dx="0"
                dy="0.6"
                stdDeviation="0.3"
                floodColor="rgba(255,255,255,0.4)"
                floodOpacity="0.7"
              />
            </filter>
          </defs>

          {/* Solid Cast Metal Body */}
          <path
            d={shapeData.path}
            fill={`url(#${gradId})`}
            stroke={mat.strokeColor}
            strokeWidth="1.8"
            strokeLinejoin="round"
          />

          {/* Brushed Satin Texture Overlay */}
          <path
            d={shapeData.path}
            fill={`url(#${brushId})`}
            style={{ mixBlendMode: 'overlay' }}
            pointerEvents="none"
          />

          {/* Chamfered Outer Bevel for Real 1.5mm Thickness */}
          <path
            d={shapeData.path}
            fill="none"
            stroke={mat.innerStroke}
            strokeWidth="1.2"
            opacity="0.5"
            transform="scale(0.982) translate(2.7, 2.8)"
          />

          {/* Top Ring/Hanging Hole with Chamfered Metal Ring */}
          <g>
            <circle
              cx={shapeData.hole.cx}
              cy={shapeData.hole.cy}
              r={shapeData.hole.r + 2.5}
              fill="none"
              stroke={mat.holeRim}
              strokeWidth="1.5"
              opacity="0.9"
            />
            <circle
              cx={shapeData.hole.cx}
              cy={shapeData.hole.cy}
              r={shapeData.hole.r}
              fill={`url(#hole-grad-${gradId})`}
              stroke="#0a0a0d"
              strokeWidth="1.2"
            />
            <circle
              cx={shapeData.hole.cx}
              cy={shapeData.hole.cy + 0.8}
              r={shapeData.hole.r - 1}
              fill="none"
              stroke="rgba(255,255,255,0.45)"
              strokeWidth="0.8"
            />
          </g>

          {/* CONTENT: FRONT (QR Prototype with Lighthouse Center & ♥ ЗооМаяк ♥) vs BACK (Lost Pet Notice & Link & Paw) */}
          {side === 'front' ? (
            /* FRONT FACE (Лицевая сторона) EXACTLY AS IN UPLOADED PROTOTYPE */
            <g>
              {/* White high-contrast rounded background card for 100% QR Scan Reliability */}
              <rect
                x={150 - shapeData.front.qrSize / 2 - 3}
                y={shapeData.front.qrY - shapeData.front.qrSize / 2 - 3}
                width={shapeData.front.qrSize + 6}
                height={shapeData.front.qrSize + 6}
                rx="8"
                fill="#ffffff"
                stroke="#c5cbd2"
                strokeWidth="1.2"
                filter="drop-shadow(0 2px 5px rgba(0,0,0,0.22))"
              />

              {/* QR Code HTML Canvas embedded in SVG with high error correction (Level H) */}
              <foreignObject
                x={150 - shapeData.front.qrSize / 2}
                y={shapeData.front.qrY - shapeData.front.qrSize / 2}
                width={shapeData.front.qrSize}
                height={shapeData.front.qrSize}
              >
                <div className="w-full h-full flex items-center justify-center bg-white rounded-md relative select-none">
                  <QRCodeCanvas
                    value={qrTargetUrl}
                    size={shapeData.front.qrSize}
                    level="H"
                    includeMargin={true}
                    marginSize={1}
                    bgColor="#ffffff"
                    fgColor="#111111"
                    imageSettings={{
                      src: ZOOMAYAK_QR_LOGO_SRC,
                      height: Math.round(shapeData.front.qrSize * 0.3),
                      width: Math.round(shapeData.front.qrSize * 0.3),
                      excavate: true,
                    }}
                  />
                </div>
              </foreignObject>

              {/* Laser Engraved Brand Line: "♥ ЗооМаяк ♥" with hearts */}
              <g
                transform={`translate(150, ${shapeData.front.brandY})`}
                textAnchor="middle"
                filter={`url(#laser-filter-${gradId})`}
              >
                <text
                  x="0"
                  y="0"
                  dominantBaseline="central"
                  fill={mat.engraveText}
                  fontFamily="'Nunito', 'Segoe UI', system-ui, -apple-system, sans-serif"
                  fontSize={shapeData.front.brandSize}
                  fontWeight="900"
                  letterSpacing="0.2"
                >
                  ♥ ЗооМаяк ♥
                </text>
              </g>
            </g>
          ) : (
            /* BACK FACE (Обратная сторона) EXACTLY AS IN UPLOADED PROTOTYPE */
            <g
              transform="translate(150, 0)"
              textAnchor="middle"
              filter={`url(#laser-filter-${gradId})`}
            >
              {/* Line 1: Если я потерялся, */}
              <text
                x="0"
                y={shapeData.back.textStartY}
                dominantBaseline="central"
                fill={mat.engraveText}
                fontFamily="'Nunito', 'Segoe UI', system-ui, -apple-system, sans-serif"
                fontSize={shapeData.back.textSize}
                fontWeight="700"
              >
                Если я потерялся,
              </text>

              {/* Line 2: просканируйте QR */}
              <text
                x="0"
                y={shapeData.back.textStartY + shapeData.back.lineSpacing}
                dominantBaseline="central"
                fill={mat.engraveText}
                fontFamily="'Nunito', 'Segoe UI', system-ui, -apple-system, sans-serif"
                fontSize={shapeData.back.textSize}
                fontWeight="700"
              >
                просканируйте QR
              </text>

              {/* Line 3: или перейдите по ссылке: */}
              <text
                x="0"
                y={shapeData.back.textStartY + shapeData.back.lineSpacing * 2}
                dominantBaseline="central"
                fill={mat.engraveText}
                fontFamily="'Nunito', 'Segoe UI', system-ui, -apple-system, sans-serif"
                fontSize={shapeData.back.textSize * 0.95}
                fontWeight="600"
                opacity="0.95"
              >
                или перейдите по ссылке:
              </text>

              {/* Line 4: zoomayak.ru/ZM-2025-0001 */}
              <text
                x="0"
                y={shapeData.back.textStartY + shapeData.back.lineSpacing * 3.2}
                dominantBaseline="central"
                fill={mat.engraveText}
                fontFamily="ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace"
                fontSize={shapeData.back.linkSize}
                fontWeight="900"
                letterSpacing="0.1"
              >
                zoomayak.ru/{displayZmId}
              </text>

              {/* Paw Icon Laser Engraved at the bottom 🐾 */}
              <g transform={`translate(0, ${shapeData.back.pawY})`}>
                {/* Main Palm Pad */}
                <ellipse
                  cx="0"
                  cy="4"
                  rx={shapeData.back.pawSize * 0.38}
                  ry={shapeData.back.pawSize * 0.28}
                  fill={mat.engraveText}
                />
                {/* 4 Toe Pads */}
                <ellipse
                  cx={-shapeData.back.pawSize * 0.36}
                  cy={-shapeData.back.pawSize * 0.18}
                  rx={shapeData.back.pawSize * 0.12}
                  ry={shapeData.back.pawSize * 0.16}
                  fill={mat.engraveText}
                />
                <ellipse
                  cx={-shapeData.back.pawSize * 0.13}
                  cy={-shapeData.back.pawSize * 0.32}
                  rx={shapeData.back.pawSize * 0.13}
                  ry={shapeData.back.pawSize * 0.18}
                  fill={mat.engraveText}
                />
                <ellipse
                  cx={shapeData.back.pawSize * 0.13}
                  cy={-shapeData.back.pawSize * 0.32}
                  rx={shapeData.back.pawSize * 0.13}
                  ry={shapeData.back.pawSize * 0.18}
                  fill={mat.engraveText}
                />
                <ellipse
                  cx={shapeData.back.pawSize * 0.36}
                  cy={-shapeData.back.pawSize * 0.18}
                  rx={shapeData.back.pawSize * 0.12}
                  ry={shapeData.back.pawSize * 0.16}
                  fill={mat.engraveText}
                />
              </g>
            </g>
          )}
        </svg>
      </div>

      {/* Surface Contact Shadow */}
      {showShadow && (
        <div
          className="w-[74%] h-4 rounded-full blur-md -mt-2 pointer-events-none opacity-55"
          style={{
            background:
              'radial-gradient(ellipse at center, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0) 75%)',
          }}
        />
      )}
    </div>
  );
};

