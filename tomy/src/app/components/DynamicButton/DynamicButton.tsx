"use client";

import React, { useState } from 'react';

interface DynamicButtonProps {
  defaultIcon: string;
  hoverIcon: string;
  clickedIcon: string;
  releasedIcon: string;
  onClick: () => void;
  style: {
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
  style,
}) => {
  const [buttonState, setButtonState] = useState<'default' | 'hover' | 'clicked' | 'released'>('default');

  const handleMouseEnter = () => setButtonState('hover');
  const handleMouseLeave = () => setButtonState('default');
  const handleMouseDown = () => setButtonState('clicked');
  const handleMouseUp = () => {
    setButtonState('released');
    onClick();
  };

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
      className="absolute cursor-pointer"
      style={style}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onClick={onClick}
    />
  );
};

export default DynamicButton;
