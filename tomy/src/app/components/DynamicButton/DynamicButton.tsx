"use client";

import React from 'react';

interface DynamicButtonProps {
  defaultIcon?: string;
  hoverIcon?: string;
  clickedIcon?: string;
  releasedIcon?: string;
  onClick: (e: React.MouseEvent<HTMLDivElement>) => void;
  buttonState?: 'default' | 'hover' | 'clicked' | 'released';
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  style?: {
    bottom?: string;
    left?: string;
    right?: string;
    top?: string;
    height: string;
    width: string;
    zIndex?: number;
  };
}

const DynamicButton: React.FC<DynamicButtonProps> = ({
  defaultIcon,
  hoverIcon,
  clickedIcon,
  releasedIcon,
  onClick,
  buttonState,
  onMouseEnter,
  onMouseLeave,
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
    <div onClick={onClick} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      <img
        src={currentIcon}
        alt="Dynamic Button"
        className="cursor-pointer w-36 h-36 object-contain"
      />
    </div>
  );
};

export default DynamicButton;