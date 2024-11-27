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
      const newScale = window.innerWidth / 1920; // Ajustez cette valeur en fonction de votre design de référence
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
        scale={scale}
        src={videoSrc}
      />
    </div>
  );
};

export default VideoPlayer;