import React from 'react';

interface ZoomayakLogoProps {
  className?: string;
  showSlogan?: boolean;
}

export const ZoomayakLogo: React.FC<ZoomayakLogoProps> = ({
  className = '',
  showSlogan = true,
}) => {
  return (
    <div className={`flex items-center select-none ${className}`}>
      <img
        src="/logo/zoomayak-master.png"
        alt="ЗооМаяк — Ваш ориентир в мире питомцев"
        className="w-44 sm:w-52 h-auto object-contain block"
      />
    </div>
  );
};
