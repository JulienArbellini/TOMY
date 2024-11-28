// VideoPlayer.tsx

import React, { useEffect, useRef, useState } from 'react';
import PlayerFrame from '../Player/PlayerFrame';

const VideoPlayer: React.FC = () => {
  const playerRef = useRef<HTMLIFrameElement>(null);
  const [isPlayingAndDelay, setIsPlayingAndDelay] = useState(false);
  const [isVideoEnded, setIsVideoEnded] = useState(false);
  const [scale, setScale] = useState(1);

  // Ajoutez le paramètre autoplay=1 pour démarrer automatiquement la lecture
  const videoSrc = 'https://www.youtube.com/embed/2S3Pt8k344k?autoplay=1&mute=1';

  useEffect(() => {
    // Gestion de la mise à l'échelle en fonction de la taille de la fenêtre
    const handleResize = () => {
      const factor = 1.8; // Augmentez ce facteur pour rendre la vidéo plus grande
      const newScale = Math.min(window.innerWidth / 1920, window.innerHeight / 1080) * factor; // Respect du ratio avec facteur
      setScale(newScale);
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Appel initial pour définir l'échelle

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div>
      <PlayerFrame
        playerRef={playerRef}
        isPlayingAndDelay={isPlayingAndDelay}
        isVideoEnded={isVideoEnded}
        scale={scale} // Utilisation du scale dynamique ajusté
        src={videoSrc}
        frameSrc = '/vectors/ELEMENTS/Cadres/CadreUltrasimple.png'
      />
    </div>
  );
};

export default VideoPlayer;