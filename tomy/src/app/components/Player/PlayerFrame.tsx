import React from 'react';

interface PlayerFrameProps {
  playerRef: React.RefObject<HTMLIFrameElement>;
  isPlayingAndDelay: boolean;
  isVideoEnded: boolean;
  scale: number;
  src?: string;
}

const PlayerFrame: React.FC<PlayerFrameProps> = ({ playerRef, isPlayingAndDelay, isVideoEnded, scale, src }) => {
  const scaledValue = (value: number) => value * scale;

  return (
    <div
      className="relative flex justify-center items-center"
      style={{
        height: `${scaledValue(550)}px`,
        width: `${scaledValue(640)}px`,
      }}
    >
    <img
    src="/vectors/ELEMENTS/Cadres/Cadre1.png"
    alt=""
    style={{
        height: `${scaledValue(560)}px`,
        width: `${scaledValue(635)}px`,
    }}
    />
    <img
    src="/vectors/ELEMENTS/Cadres/EcranNoir.png"
    alt=""
    className={`absolute`}
    style={{
        top: `${scaledValue(45)}px`,
        left: `${scaledValue(26)}px`,
        height: `${scaledValue(446)}px`,
        width: `${scaledValue(592)}px`,
        zIndex: isPlayingAndDelay || isVideoEnded ? 20 : 0, // Affiche l'écran noir à la fin de la vidéo
    }}
    />

      <img 
        src="/vectors/ELEMENTS/Cadres/vitre.png"
        alt="" 
        className="absolute z-10 opacity-5"
        style={{
          top: `${scaledValue(55)}px`,
          left: `${scaledValue(30)}px`,
          height: `${scaledValue(400)}px`,
          width: `${scaledValue(593)}px`,
        }}
      />
      <div
        className="absolute overflow-hidden"
        style={{
          top: `${scaledValue(50)}px`,
          left: `${scaledValue(28)}px`,
          height: `${scaledValue(437)}px`,
          width: `${scaledValue(590)}px`,
        }}
      >
        <div
          className="absolute"
          style={{
            top: `${scaledValue(-653)}px`,
            left: 0,
            height: `${scaledValue(435)}px`,
            width: `${scaledValue(586)}px`,
          }}
        >
          <iframe
            ref={playerRef}
            width="100%"
            height="400%"
            src={`${src}?enablejsapi=1`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default PlayerFrame;
