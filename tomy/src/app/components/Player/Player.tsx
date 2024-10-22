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
  const [isMuted, setIsMuted] = useState(false);
  const [player, setPlayer] = useState<any>(null);
  const [scale, setScale] = useState(1);
  const [isVideoEnded, setIsVideoEnded] = useState(false);
  const playerRef = useRef<HTMLIFrameElement | null>(null);

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

  return (
    <div className="absolute h-screen w-full flex justify-center items-center">
      <div className="relative">
        <PlayerFrame
          playerRef={playerRef}
          isPlayingAndDelay={!isPlaying}
          isVideoEnded={isVideoEnded}
          scale={scale}
          src={src}
        />
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
        />
      </div>
    </div>
  );
};

export default Player;
