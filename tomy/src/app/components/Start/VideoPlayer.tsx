import React, { useEffect, useRef, useState } from 'react';
import PlayerFrame from '../Player/PlayerFrame';

const VideoPlayer: React.FC = () => {
  const playerRef = useRef<HTMLIFrameElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isVideoEnded, setIsVideoEnded] = useState(false);
  const [scale, setScale] = useState(1);

  const videoSrc = 'https://www.youtube.com/embed/2S3Pt8k344k?enablejsapi=1&autoplay=1&mute=1';

  useEffect(() => {
    const handleStateChange = (event: any) => {
      if (event.data === window.YT.PlayerState.PLAYING) {
        setIsPlaying(true);
        setIsVideoEnded(false);
      } else if (event.data === window.YT.PlayerState.PAUSED) {
        setIsPlaying(false);
      } else if (event.data === window.YT.PlayerState.ENDED) {
        setIsPlaying(false);
        setIsVideoEnded(true);
      }
    };

    const initializePlayer = () => {
      if (playerRef.current && playerRef.current.contentWindow) {
        new window.YT.Player(playerRef.current, {
          events: {
            onStateChange: handleStateChange,
          },
        });
      }
    };

    const loadYouTubeAPI = () => {
      if (!window.YT) {
        const tag = document.createElement('script');
        tag.src = 'https://www.youtube.com/iframe_api';
        document.body.appendChild(tag);

        window.onYouTubeIframeAPIReady = () => {
          initializePlayer(); // Appeler initializePlayer une fois l'API chargée
        };
      } else {
        initializePlayer(); // Si l'API est déjà chargée
      }
    };

    loadYouTubeAPI();

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
alert("ici");
  return (
    <div>
      <PlayerFrame
        playerRef={playerRef}
        isPlayingAndDelay={!isPlaying}
        isVideoEnded={isVideoEnded}
        scale={scale}
        src={videoSrc}
        frameSrc={'/vectors/ELEMENTS/Cadres/CadreUltrasimple.avif'}
      />
    </div>
  );
};

export default VideoPlayer;