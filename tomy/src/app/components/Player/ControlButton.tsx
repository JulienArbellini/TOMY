import React, { useState } from 'react';

interface ControlButtonProps {
  defaultIcon: string;
  hoverIcon: string;
  clickedIcon: string;
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

const ControlButton: React.FC<ControlButtonProps> = ({
  defaultIcon,
  hoverIcon,
  clickedIcon,
  onClick,
  style,
}) => {
  const [buttonState, setButtonState] = useState<'default' | 'hover' | 'clicked'>('default');

  const handleMouseEnter = () => setButtonState('hover');
  const handleMouseLeave = () => setButtonState('default');
  const handleMouseDown = () => setButtonState('clicked');
  const handleMouseUp = () => setButtonState('hover');

  const currentIcon =
    buttonState === 'clicked' ? clickedIcon : buttonState === 'hover' ? hoverIcon : defaultIcon;

  return (
    <div
      className="absolute bg-cover cursor-pointer"
      style={{
        ...style,
        backgroundImage: `url(${currentIcon})`,
      }}
      onClick={onClick}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    ></div>
  );
};

export default ControlButton;
