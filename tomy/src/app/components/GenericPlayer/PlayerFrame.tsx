"use client";
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
  vitre?: boolean;
  children?: React.ReactNode; // Ajoutez cette ligne
}



const PlayerFrame: React.FC<PlayerFrameProps> = ({
  playerRef,
  isPlayingAndDelay = false,
  isVideoEnded = false,
  src,
  vitre = true,
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


  if(frameSrc == '/vectors/ELEMENTS/Cadres/Cadre1.avif' ||  
    frameSrc == '/vectors/ELEMENTS/Cadres/CadreBleu.avif' ||
    frameSrc == '/vectors/ELEMENTS/Cadres/CadreBois.avif' ||
    frameSrc == '/vectors/ELEMENTS/Cadres/CadrePlante.avif' ||
    frameSrc == '/vectors/ELEMENTS/Cadres/CadreSimple.avif' ||
    frameSrc == '/vectors/ELEMENTS/Cadres/CadreUltrasimple.avif'
  ){

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
        
          <img
            src="/vectors/ELEMENTS/Cadres/EcranNoir.avif"
            alt="Écran noir lorsque la vidéo est en pause ou terminée"
            className="absolute"
  
            style={{
              top: `${scaledValue(43)}px`,
              left: `${scaledValue(24)}px`,
              height: `${scaledValue(containerHeight+7)}px`,
              width: `${scaledValue(containerWidth+6)}px`,
              zIndex: isPlayingAndDelay || isVideoEnded ? 20 : 0,
            }}
          />
        
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
            left: `${scaledValue(27)}px`,
            height: `${scaledValue(containerHeight)}px`,
            width: `${scaledValue(containerWidth)}px`,
          }}
        >
          {/* Vitre alignée avec le conteneur */}
  
          {vitre && ( // Ajoutez cette ligne
            <img
              src="/vectors/ELEMENTS/Cadres/vitre.avif"
              alt="Vitre transparente"
              className="absolute z-10 opacity-0"
              style={{
                height: `${scaledValue(containerHeight)}px`,
                width: `${scaledValue(containerWidth)}px`,
              }}
            />
          )}
  
  
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
                src={`https://www.youtube.com/embed/${src}?enablejsapi=1&autoplay=1&mute=0&loop=1&playlist=${src}`}
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
  }
  else if(frameSrc == '/vectors/ELEMENTS/Cadres/CadreSurfy.avif'){
    return (
      <div
        className="relative flex justify-center items-center"
        style={{
          height: `${scaledValue(590)}px`,
          width: `${scaledValue(660)}px`,
        }}
      >
        {/* Cadre Principal */}
        <img
          src={frameSrc}
          alt="Cadre décoratif autour du contenu"
          style={{
            height: `${scaledValue(569)}px`,
            width: `${scaledValue(640)}px`,
          }}
        />
  
        {/* Écran Noir pour la Pause ou la Fin (uniquement pour la vidéo) */}
        
        <img
          src="/vectors/ELEMENTS/Cadres/EcranNoir.avif"
          alt="Écran noir lorsque la vidéo est en pause ou terminée"
          className="absolute"

          style={{
            top: `${scaledValue(72)}px`,
            left: `${scaledValue(32)}px`,
            height: `${scaledValue(containerHeight+8)}px`,
            width: `${scaledValue(containerWidth+7)}px`,
            zIndex: isPlayingAndDelay || isVideoEnded ? 20 : 0,
          }}
        />

              <ControlButton
          defaultIcon="/vectors/ELEMENTS/BoutonsPlayer/Exit.avif"
          hoverIcon="/vectors/ELEMENTS/BoutonsPlayer/ExitHover.avif"
          clickedIcon="/vectors/ELEMENTS/BoutonsPlayer/ExitClic.avif"
          onClick={handleExitClick}
          style={{
            position: "absolute",
            top: `${scaledValue(54)}px`,
            left: `${scaledValue(34)}px`,
            height: `${scaledValue(16)}px`,
            width: `${scaledValue(16)}px`,
            zIndex: 50,
          }}
        />
  
  
        {/* Conteneur du contenu */}
        <div
          className="absolute overflow-hidden"
          style={{
            top: `${scaledValue(77)}px`,
            left: `${scaledValue(36)}px`,
            height: `${scaledValue(containerHeight)}px`,
            width: `${scaledValue(containerWidth)}px`,
          }}
        >
          {/* Vitre alignée avec le conteneur */}
  
          {vitre && ( // Ajoutez cette ligne
            <img
              src="/vectors/ELEMENTS/Cadres/vitre.avif"
              alt="Vitre transparente"
              className="absolute z-10 opacity-0"
              style={{
                height: `${scaledValue(containerHeight)}px`,
                width: `${scaledValue(containerWidth)}px`,
              }}
            />
          )}
  
  
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
                src={`https://www.youtube.com/embed/${src}?enablejsapi=1&autoplay=1&mute=0&loop=1&playlist=${src}`}
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
  }
  else if(frameSrc == '/vectors/ELEMENTS/Cadres/CadreEdgy.avif'){
    return (
      <div
        className="relative flex justify-center items-center"
        style={{
          height: `${scaledValue(590)}px`,
          width: `${scaledValue(690)}px`,
        }}
      >
        {/* Cadre Principal */}
        <img
          src={frameSrc}
          alt="Cadre décoratif autour du contenu"
          style={{
            height: `${scaledValue(570)}px`,
            width: `${scaledValue(675)}px`,
          }}
        />
  
        {/* Écran Noir pour la Pause ou la Fin (uniquement pour la vidéo) */}
        
          <img
            src="/vectors/ELEMENTS/Cadres/EcranNoir.avif"
            alt="Écran noir lorsque la vidéo est en pause ou terminée"
            className="absolute"
  
            style={{
              top: `${scaledValue(65)}px`,
              left: `${scaledValue(48)}px`,
              height: `${scaledValue(containerHeight)+18}px`,
              width: `${scaledValue(containerWidth)+10}px`,
              zIndex: isPlayingAndDelay || isVideoEnded ? 20 : 0,
            }}
          />

              <ControlButton
          defaultIcon="/vectors/ELEMENTS/BoutonsPlayer/Exit.avif"
          hoverIcon="/vectors/ELEMENTS/BoutonsPlayer/ExitHover.avif"
          clickedIcon="/vectors/ELEMENTS/BoutonsPlayer/ExitClic.avif"
          onClick={handleExitClick}
          style={{
            position: "absolute",
            top: `${scaledValue(47)}px`,
            left: `${scaledValue(48)}px`,
            height: `${scaledValue(16)}px`,
            width: `${scaledValue(16)}px`,
            zIndex: 50,
          }}
        />
  
  
        {/* Conteneur du contenu */}
        <div
          className="absolute overflow-hidden"
          style={{
            top: `${scaledValue(70)}px`,
            left: `${scaledValue(50)}px`,
            height: `${scaledValue(containerHeight)}px`,
            width: `${scaledValue(containerWidth)}px`,
          }}
        >
          {/* Vitre alignée avec le conteneur */}
  
          {vitre && ( // Ajoutez cette ligne
            <img
              src="/vectors/ELEMENTS/Cadres/vitre.avif"
              alt="Vitre transparente"
              className="absolute z-10 opacity-0"
              style={{
                height: `${scaledValue(containerHeight)}px`,
                width: `${scaledValue(containerWidth)}px`,
              }}
            />
          )}
  
  
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
                src={`https://www.youtube.com/embed/${src}?enablejsapi=1&autoplay=1&mute=0&loop=1&playlist=${src}`}
                title="Lecteur vidéo YouTube"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; picture-in-picture"
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
  }

};

export default PlayerFrame;