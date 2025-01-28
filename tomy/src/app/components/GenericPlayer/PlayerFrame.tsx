import React, { useState, useRef, useEffect } from 'react';
import ControlButton from '../Player/ControlButton';

interface PlayerFrameProps {
  playerRef?: React.RefObject<HTMLIFrameElement>;
  isPlayingAndDelay?: boolean;
  isVideoEnded?: boolean;
  scale: number;
  controls?: boolean;
  src?: string;
  frameSrc?: string;
  onClose: () => void;
  children?: React.ReactNode; // Ajoutez cette ligne
}



const PlayerFrame: React.FC<PlayerFrameProps> = ({
  playerRef,
  isPlayingAndDelay = false,
  isVideoEnded = false,
  src,
  controls = true,
  frameSrc = '/vectors/ELEMENTS/Cadres/Cadre1.avif',
  onClose,
  children,
}) => {

const [scale, setScale] = useState(1);

useEffect(() => {
    const handleResize = () => {
        const windowHeight = window.innerHeight;
        const originalHeight = 555;
        const desiredHeight = windowHeight * 0.8;
        const newScale = desiredHeight / originalHeight;
        setScale(newScale);
      };
  
      handleResize();
      window.addEventListener('resize', handleResize);
  
      return () => window.removeEventListener('resize', handleResize);

}, []);
const handleExitClick = () => {
    onClose();
    };




    
  const scaledValue = (value: number) => value * scale;

  // Dimensions standard du conteneur contenant l'iframe ou le contenu
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
        src={frameSrc}
        alt="Cadre décoratif autour du contenu"
        style={{
          height: `${scaledValue(538)}px`,
          width: `${scaledValue(638)}px`,
        }}
      />

      {/* Écran Noir pour la Pause ou la Fin (uniquement pour la vidéo) */}
      {(isPlayingAndDelay || isVideoEnded) && (
        <img
          src="/vectors/ELEMENTS/Cadres/EcranNoir.avif"
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
            <ControlButton
        defaultIcon="/vectors/ELEMENTS/BoutonsPlayer/Exit.avif"
        hoverIcon="/vectors/ELEMENTS/BoutonsPlayer/ExitHover.avif"
        clickedIcon="/vectors/ELEMENTS/BoutonsPlayer/ExitClic.avif"
        onClick={handleExitClick}
        style={{
          position: "absolute",
          top: `${scaledValue(24)}px`,
          left: `${scaledValue(24)}px`,
          height: `${scaledValue(16)}px`,
          width: `${scaledValue(16)}px`,
          zIndex: 50,
        }}
      />


      {/* Conteneur du contenu */}
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
          src="/vectors/ELEMENTS/Cadres/vitre.avif"
          alt="Vitre transparente"
          className="absolute z-10 opacity-0"
          style={{
            height: `${scaledValue(containerHeight)}px`,
            width: `${scaledValue(containerWidth)}px`,
          }}
        />

        {/* Affichage du contenu */}
        {src && playerRef ? (
          // Afficher l'iframe pour la vidéo
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
        ) : (
          // Afficher les enfants pour les autres types de contenu
          <div
            className="absolute"
            style={{
              top: 0,
              left: 0,
              height: `${scaledValue(containerHeight)}px`,
              width: `${scaledValue(containerWidth)}px`,
            }}
          >
            {children}
          </div>
        )}
      </div>
    </div>
  );
};

export default PlayerFrame;