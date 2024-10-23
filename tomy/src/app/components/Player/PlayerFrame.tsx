import React from 'react';

interface PlayerFrameProps {
  playerRef?: React.RefObject<HTMLIFrameElement | HTMLAudioElement | null>;
  isPlayingAndDelay: boolean;
  isVideoEnded: boolean;
  scale: number;
  src?: string;
  mediaType: 'video' | 'image' | 'text' | 'music';
  children?: React.ReactNode;
}


const PlayerFrame: React.FC<PlayerFrameProps> = ({
  playerRef,
  isPlayingAndDelay,
  isVideoEnded,
  scale,
  src,
  mediaType,
  children,
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
        src="/vectors/ELEMENTS/Cadres/Cadre1.png"
        alt="Cadre décoratif autour du contenu"
        style={{
          height: `${scaledValue(538)}px`,
          width: `${scaledValue(638)}px`,
        }}
      />

      {/* Écran Noir pour la Pause ou la Fin (pour la vidéo uniquement) */}
      {mediaType === 'video' && (isPlayingAndDelay || isVideoEnded) && (
        <img
          src="/vectors/ELEMENTS/Cadres/EcranNoir.png"
          alt="Écran noir lorsque la vidéo est en pause ou terminée"
          className="absolute"
          style={{
            top: `${scaledValue(43)}px`,
            left: `${scaledValue(26)}px`,
            height: `${scaledValue(444)}px`,
            width: `${scaledValue(592)}px`,
            zIndex: 20,
          }}
        />
      )}

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
        {mediaType === 'video' ? (
          <iframe
            ref={playerRef as React.RefObject<HTMLIFrameElement>}
            src={`${src}?enablejsapi=1`}
            title="Lecteur vidéo YouTube"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          ></iframe>
        ) : (
          children
        )}
      </div>
    </div>
  );
};


export default PlayerFrame;
