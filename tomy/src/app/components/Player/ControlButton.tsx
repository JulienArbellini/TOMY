import React from 'react';

interface ControlButtonProps {
  defaultIcon: string;
  hoverIcon: string;
  clickedIcon: string;
  onClick: () => void;
  onMouseDown?: () => void;
  onMouseUp?: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  style: {
    bottom?: string;
    left?: string;
    right?: string;
    height: string;
    width: string;
  };
}

const ControlButton: React.FC<ControlButtonProps> = ({
  defaultIcon,
  hoverIcon,
  clickedIcon,
  onClick,
  onMouseDown,
  onMouseUp,
  onMouseEnter,
  onMouseLeave,
  style,
}) => {
  return (
    <div
      className="absolute bg-cover hover:cursor-pointer"
      style={{
        ...style,
        backgroundImage: `url(${defaultIcon})`,
      }}
      onClick={onClick}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    ></div>
  );
};

export default ControlButton;
