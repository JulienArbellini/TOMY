import React from 'react';

interface PlayerFrameProps {
  playerRef: React.RefObject<HTMLIFrameElement>;
  isPlayingAndDelay: boolean;
  isVideoEnded: boolean;
  scale: number;
  src?: string;
}

const PlayerFrame: React.FC<PlayerFrameProps> = ({
  playerRef,
  isPlayingAndDelay,
  isVideoEnded,
  scale,
  src,
}) => {
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
        src="/vectors/ELEMENTS/Cadres/CadreUltrasimple.png"
        alt="Cadre décoratif autour de la vidéo"
        style={{
          height: `${scaledValue(538)}px`,
          width: `${scaledValue(638)}px`,
        }}
      />

      {/* Écran Noir pour la Pause ou la Fin */}
      {(isPlayingAndDelay || isVideoEnded) && (
        <img
          src="/vectors/ELEMENTS/Cadres/EcranNoir.png"
          alt="Écran noir lorsque la vidéo est en pause ou terminée"
          className="absolute"
          style={{
            top: `${scaledValue(43)}px`,
            left: `${scaledValue(26)}px`,
            height: `${scaledValue(444)}px`,
            width: `${scaledValue(592)}px`,
            zIndex: isPlayingAndDelay || isVideoEnded ? 20 : 0, // Affiche l'écran noir à la fin de la vidéo
          }}
        />
      )}

      {/* Conteneur de la Vidéo */}
      <div
        className="absolute overflow-hidden"
        style={{
          top: `${scaledValue(47)}px`,
          left: `${scaledValue(29)}px`,
          height: `${scaledValue(437)}px`,
          width: `${scaledValue(590)}px`,
        }}
      >

<img 
        src="/vectors/ELEMENTS/Cadres/vitre.png"
        alt="" 
        className="absolute z-10 opacity-0"
        style={{
          top: `${scaledValue(55)}px`,
          left: `${scaledValue(30)}px`,
          height: `${scaledValue(440)}px`,
          width: `${scaledValue(593)}px`,
        }}
      />
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
          title="Lecteur vidéo YouTube"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          style={{
            objectFit: 'cover',
          }}
        ></iframe>
        </div>
      </div>
    </div>
  );
};

export default PlayerFrame;
