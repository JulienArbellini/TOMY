import React from 'react';

interface PlayerFrameProps {
  playerRef: React.RefObject<HTMLIFrameElement>;
  isPlayingAndDelay: boolean;
  isVideoEnded: boolean;
  scale: number;
  src?: string;
  frameSrc?: string; // Nouvelle prop pour le chemin du cadre
}

const PlayerFrame: React.FC<PlayerFrameProps> = ({
  playerRef,
  isPlayingAndDelay,
  isVideoEnded,
  scale,
  src,
  frameSrc = '/vectors/ELEMENTS/Cadres/Cadre1.png', // Valeur par défaut
}) => {
  const scaledValue = (value: number) => value * scale;

  // Dimensions standard du conteneur contenant l'iframe
  const containerWidth = 590; // Largeur du conteneur en px
  const containerHeight = 437; // Hauteur du conteneur en px

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
        src={frameSrc} // Utilisation de la prop frameSrc
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
            top: `${scaledValue(47)}px`,
            left: `${scaledValue(29)}px`,
            height: `${scaledValue(containerHeight)}px`,
            width: `${scaledValue(containerWidth)}px`,
            zIndex: isPlayingAndDelay || isVideoEnded ? 20 : 0,
          }}
        />
      )}

      {/* Conteneur de la Vidéo */}
      <div
        className="absolute overflow-hidden"
        style={{
          top: `${scaledValue(47)}px`,
          left: `${scaledValue(29)}px`,
          height: `${scaledValue(containerHeight)}px`,
          width: `${scaledValue(containerWidth)}px`,
        }}
      >
        {/* Vitre alignée avec le conteneur */}
        <img
          src="/vectors/ELEMENTS/Cadres/vitre.png"
          alt="Vitre transparente"
          className="absolute z-10 opacity-0"
          style={{
            height: `${scaledValue(containerHeight)}px`, // Alignée avec la hauteur du conteneur
            width: `${scaledValue(containerWidth)}px`, // Alignée avec la largeur du conteneur
          }}
        />
        <div
          className="absolute"
          style={{
            top: `${scaledValue(-653)}px`,
            left: 0,
            height: `${scaledValue(containerHeight)}px`,
            width: `${scaledValue(containerWidth)}px`,
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