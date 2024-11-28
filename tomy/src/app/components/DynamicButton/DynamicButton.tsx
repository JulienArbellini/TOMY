"use client";

import React from 'react';

interface DynamicButtonProps {
  defaultIcon: string;
  hoverIcon: string;
  clickedIcon: string;
  releasedIcon: string;
  onClick: () => void;
  buttonState: 'default' | 'hover' | 'clicked' | 'released';
  onMouseEnter: () => void;
  onMouseLeave: () => void;
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
    <img
      src={currentIcon}
      alt="Dynamic Button"
      className="cursor-pointer w-36 h-36 object-contain"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
    />
  );
};

export default DynamicButton;