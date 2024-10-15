import React, { useState, useRef, useEffect } from 'react';
import PlayerFrame from './PlayerFrame';
import PlayerControls from './PlayerControls';

interface PlayerProps {
  className?: string;
  src?: string;
}

declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}

const Player: React.FC<PlayerProps> = ({ src }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPlayingAndDelay, setIsPlayingAndDelay] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [isVolumeDown, setVolumeDown] = useState(false);
  const [isVolumeUp, setVolumeUp] = useState(false);
  const [isRewinding, setIsRewinding] = useState(false);
  const [isForwarding, setIsForwarding] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const playerRef = useRef<HTMLIFrameElement | null>(null);
  const [player, setPlayer] = useState<any>(null);
  const [scale, setScale] = useState(1);
  const [isVideoEnded, setIsVideoEnded] = useState(false);


  const handleStateChange = (event: any) => {
    if (event.data === window.YT.PlayerState.PLAYING) {
      setIsPlayingAndDelay(false);
      setIsVideoEnded(false); // Réinitialise l'état si la vidéo recommence à jouer
    } else if (event.data === window.YT.PlayerState.ENDED) {
      setIsVideoEnded(true); // La vidéo est terminée, affichage de l'écran noir
    }
  };
  
  

  useEffect(() => {
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    const firstScriptTag = document.getElementsByTagName('script')[0];
    if (firstScriptTag && firstScriptTag.parentNode) {
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    }

    window.onYouTubeIframeAPIReady = () => {
      const newPlayer = new window.YT.Player(playerRef.current, {
        events: {
          onReady: (event: any) => {
            setPlayer(newPlayer);
          },
          onStateChange: handleStateChange,
        },
      });
    };

    const handleResize = () => {
      const windowHeight = window.innerHeight;
      const originalHeight = 555;
      const desiredHeight = windowHeight * 0.8;
      const newScale = desiredHeight / originalHeight;
      setScale(newScale);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handlePlayClick = () => {
    if (!player) return;
    setIsPlaying(!isPlaying);
    isPlaying ? player.pauseVideo() : player.playVideo();
  };

  const handleMuteClick = () => {
    if (!player) return;
  
    setIsMuted((prevState) => {
      if (prevState) {
        player.unMute(); // Unmute le lecteur
      } else {
        player.mute(); // Mute le lecteur
      }
      return !prevState;
    });
  };
  
  const handleVolumeDownClick = () => {
    if (!player) return;
    const currentVolume = player.getVolume();
    const newVolume = Math.max(currentVolume - 10, 0);
    player.setVolume(newVolume);
    setVolumeDown(true);
    setTimeout(() => setVolumeDown(false), 200);
  };
  
  const handleVolumeUpClick = () => {
    if (!player) return;
    const currentVolume = player.getVolume();
    const newVolume = Math.min(currentVolume + 10, 100);
    player.setVolume(newVolume);
    setVolumeUp(true);
    setTimeout(() => setVolumeUp(false), 200);
  };
  
  const handleRewindClick = () => {
    if (!player) return;
    const currentTime = player.getCurrentTime();
    const newTime = currentTime - 10; // Rewind de 10 secondes
    player.seekTo(Math.max(newTime, 0), true);
    setIsRewinding(!isRewinding);
    if (!isRewinding) {
      setIsForwarding(false); // Désactive Forward si Rewind est activé
    }
  };
  
  const handleForwardClick = () => {
    if (!player) return;
    const currentTime = player.getCurrentTime();
    const newTime = currentTime + 10; // Forward de 10 secondes
    player.seekTo(newTime, true);
    setIsForwarding(!isForwarding);
    if (!isForwarding) {
      setIsRewinding(false); // Désactive Rewind si Forward est activé
    }
  };
  

  return (
    <div className="absolute h-screen w-full flex justify-center items-center">
      <div className='relative'>
        <PlayerFrame playerRef={playerRef} isPlayingAndDelay={isPlayingAndDelay} isVideoEnded={isVideoEnded} scale={scale} src={src} />
        <PlayerControls
            handlePlayClick={handlePlayClick}
            handleMuteClick={handleMuteClick}
            handleVolumeDownClick={handleVolumeDownClick}
            handleVolumeUpClick={handleVolumeUpClick}
            handleRewindClick={handleRewindClick}
            handleForwardClick={handleForwardClick}
            isPlaying={isPlaying}
            isMuted={isMuted}
            isRewinding={isRewinding}
            isForwarding={isForwarding}
            scale={scale}
            isPressed={isPressed}
            isHovering={isHovering}
            handlePlayMouseDown={() => setIsPressed(true)}
            handlePlayMouseUp={() => setIsPressed(false)}
            handlePlayMouseEnter={() => setIsHovering(true)}
            handlePlayMouseLeave={() => setIsHovering(false)}
        />
      </div>
    </div>
  );
};

export default Player;
