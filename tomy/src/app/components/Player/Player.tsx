import React, { useState, useRef, useEffect } from 'react';
import PlayerFrame from './PlayerFrame';
import PlayerControls from './PlayerControls';
import MediaRenderer from './MediaRenderer';

interface PlayerProps {
  className?: string;
  src?: string;
  mediaType: 'video' | 'image' | 'text' | 'music';
}

const Player: React.FC<PlayerProps> = ({ src, mediaType }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [player, setPlayer] = useState<any>(null);
  const [scale, setScale] = useState(1);
  const [isVideoEnded, setIsVideoEnded] = useState(false);

  const playerRef = useRef<HTMLIFrameElement | HTMLAudioElement | null>(null);


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

  useEffect(() => {
    if (mediaType === 'video') {
      // Votre code d'initialisation du lecteur vidéo
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      const firstScriptTag = document.getElementsByTagName('script')[0];
      if (firstScriptTag && firstScriptTag.parentNode) {
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
      }

      window.onYouTubeIframeAPIReady = () => {
        const newPlayer = new window.YT.Player(playerRef.current, {
          events: {
            onReady: () => {
              setPlayer(newPlayer);
            },
            onStateChange: handleStateChange,
          },
        });
      };
    } else if (mediaType === 'music') {}

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
  }, [mediaType]);

  const handlePlayClick = () => {
    if (!player) return;
    isPlaying ? player.pauseVideo() : player.playVideo();
  };

  const handleMuteClick = () => {
    if (!player) return;
    isMuted ? player.unMute() : player.mute();
    setIsMuted(!isMuted);
  };

  const handleVolumeDownClick = () => {
    if (!player) return;
    const newVolume = Math.max(player.getVolume() - 10, 0);
    player.setVolume(newVolume);
  };

  const handleVolumeUpClick = () => {
    if (!player) return;
    const newVolume = Math.min(player.getVolume() + 10, 100);
    player.setVolume(newVolume);
  };

  const handleRewindClick = () => {
    if (!player) return;
    const newTime = Math.max(player.getCurrentTime() - 10, 0);
    player.seekTo(newTime, true);
  };

  const handleForwardClick = () => {
    if (!player) return;
    const newTime = Math.min(player.getCurrentTime() + 10, player.getDuration());
    player.seekTo(newTime, true);
  };

  // Déterminer les contrôles à afficher en fonction du type de média
  const controlsToShow = () => {
    if (mediaType === 'video') {
      return ['play', 'mute', 'volume', 'rewind', 'forward', 'exit'];
    } else if (mediaType === 'music') {
      
      return ['play', 'mute', 'volume', 'exit'];
    } else {
      return ['exit'];
    }
  };

  return (
    <div className="absolute h-screen w-full flex justify-center items-center">
      <div className="relative">
      <PlayerFrame
  playerRef={mediaType === 'video' ? playerRef : undefined}
  isPlayingAndDelay={!isPlaying}
  isVideoEnded={isVideoEnded}
  scale={scale}
  src={src}
  mediaType={mediaType}
>
  {mediaType !== 'video' && (
    <MediaRenderer
      mediaType={mediaType}
      src={src}
      scale={scale}
      playerRef={mediaType === 'music' ? playerRef : undefined}
    />
  )}
</PlayerFrame>

        {mediaType === 'video' && (
          <PlayerControls
            handlePlayClick={handlePlayClick}
            handleMuteClick={handleMuteClick}
            handleVolumeDownClick={handleVolumeDownClick}
            handleVolumeUpClick={handleVolumeUpClick}
            handleRewindClick={handleRewindClick}
            handleForwardClick={handleForwardClick}
            isPlaying={isPlaying}
            isMuted={isMuted}
            scale={scale}
            controlsToShow={controlsToShow()}
          />
        )}
        {/* Si vous souhaitez afficher des contrôles différents pour les autres médias, vous pouvez les ajouter ici */}
      </div>
    </div>
  );
};

export default Player;
