"use client";

import React from 'react';

interface DynamicButtonMenuProps {
  defaultIcon?: string;
  hoverIcon?: string;
  clickedIcon?: string;
  releasedIcon?: string;
  onClick: (e: React.MouseEvent<HTMLDivElement>) => void;
  buttonState?: 'default' | 'hover' | 'clicked' | 'released';
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  className?: React.HTMLAttributes<HTMLDivElement>['className'];
  style?: React.CSSProperties; // Ajout de style ici
}

const DynamicButtonMenu: React.FC<DynamicButtonMenuProps> = ({
  defaultIcon,
  hoverIcon,
  clickedIcon,
  releasedIcon,
  onClick,
  buttonState,
  onMouseEnter,
  onMouseLeave,
  style,
}) => {
  const currentIcon =
    buttonState === 'clicked'
      ? clickedIcon
      : buttonState === 'hover'
      ? hoverIcon
      : buttonState === 'released'
      ? releasedIcon
      : defaultIcon;

  return (
    <div onClick={onClick} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} style={style} >
      <img
        src={currentIcon}
        alt="Dynamic Button"
        className="cursor-pointer w-full h-full justify-center items-center object-contain"
      />
    </div>
  );
};

export default DynamicButtonMenu;