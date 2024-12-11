import React, { CSSProperties, useState } from "react";

interface InteractiveButtonProps {
  defaultIcon: string;
  hoverIcon: string;
  clickedIcon: string;
  style: CSSProperties;
  onClick: () => void;
}

const InteractiveButton: React.FC<InteractiveButtonProps> = ({
  defaultIcon,
  hoverIcon,
  clickedIcon,
  style,
  onClick,
}) => {
  const [buttonState, setButtonState] = useState<"default" | "hover" | "clicked">("default");

  const handleMouseEnter = () => setButtonState("hover");
  const handleMouseLeave = () => setButtonState("default");
  const handleMouseDown = () => setButtonState("clicked");
  const handleMouseUp = () => setButtonState("hover");

  const currentIcon =
    buttonState === "clicked"
      ? clickedIcon
      : buttonState === "hover"
      ? hoverIcon
      : defaultIcon;

  return (
    <div
      className="bg-cover cursor-pointer"
      style={{
        ...style,
        backgroundImage: `url(${currentIcon})`,
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onClick={onClick}
    ></div>
  );
};

export default InteractiveButton;