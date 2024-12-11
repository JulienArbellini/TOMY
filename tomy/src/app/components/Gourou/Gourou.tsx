import React, { useState, useEffect } from "react";

const Gourou: React.FC = () => {
  const [message, setMessage] = useState("");
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [isMessageVisible, setIsMessageVisible] = useState(false);

  const handleClick = (event: React.MouseEvent) => {
    const { clientX, clientY } = event;

    // Positionner le message
    setCursorPosition({ x: clientX, y: clientY });

    // Définir et afficher le message
    setMessage("Voici un conseil de Gourou !");
    setIsMessageVisible(true);

    // Masquer le message après 5 secondes
    setTimeout(() => {
      setIsMessageVisible(false);
    }, 5000);
  };

  useEffect(() => {
    if (isMessageVisible) {
      const handleMouseMove = (e: MouseEvent) => {
        setCursorPosition({ x: e.clientX, y: e.clientY });
      };

      window.addEventListener("mousemove", handleMouseMove);

      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
      };
    }
  }, [isMessageVisible]);

  return (
    <div className="relative">
      {/* Icône Gourou */}
      <div
        className="cursor-pointer"
        onClick={handleClick}
      >
        <img src="/OPTIMIZED_ICONES/Gourou.avif" alt="Gourou Icon" />
      </div>

      {/* Message contextuel */}
      {isMessageVisible && (
        <div
          className="popup-message"
          style={{
            position: "absolute",
            left: cursorPosition.x + 10,
            top: cursorPosition.y + 10,
            background: "rgba(0, 0, 0, 0.8)",
            color: "white",
            padding: "10px",
            borderRadius: "5px",
            pointerEvents: "none",
            zIndex: 1000,
          }}
        >
          {message}
        </div>
      )}
    </div>
  );
};

export default Gourou;