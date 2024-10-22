import React from 'react';

interface PlayerFrameProps {
  scale: number;
  children: React.ReactNode;
}

const PlayerFrame: React.FC<PlayerFrameProps> = ({ scale, children }) => {
  const scaledValue = (value: number) => value * scale;

  return (
    <div
      className="relative flex justify-center items-center"
      style={{
        height: `${scaledValue(550)}px`,
        width: `${scaledValue(640)}px`,
      }}
    >
      {/* Cadre Principal */}
      <img
        src="/vectors/ELEMENTS/Cadres/Cadre1.png"
        alt="Cadre décoratif autour du contenu"
        style={{
          height: `${scaledValue(538)}px`,
          width: `${scaledValue(638)}px`,
        }}
      />

      {/* Conteneur du Contenu */}
      <div
        className="absolute overflow-hidden"
        style={{
          top: `${scaledValue(47)}px`,
          left: `${scaledValue(29)}px`,
          height: `${scaledValue(437)}px`,
          width: `${scaledValue(590)}px`,
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default PlayerFrame;
