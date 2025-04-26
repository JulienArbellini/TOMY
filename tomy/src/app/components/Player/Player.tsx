import React, { useState, useRef, useEffect, use } from 'react';
import PlayerFrame from './PlayerFrame';
import PlayerControls from './PlayerControls';
/// <reference path="../../../types/youtube.d.ts" />

interface PlayerProps {
  className?: string;
  src: string;
  onClose: () => void;
  frameSrc?: string;
}

const Player: React.FC<PlayerProps> = ({ src, onClose, frameSrc = '/vectors/ELEMENTS/Cadres/Cadre1.avif' }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [player, setPlayer] = useState<any>(null);
  const [scale, setScale] = useState(1);
  const [isVideoEnded, setIsVideoEnded] = useState(false);
  const playerRef = useRef<HTMLIFrameElement | null>(null);
  const [videoKey, setVideoKey] = useState(0); // Force la recréation du lecteur
  const scriptAdded = useRef(false);

  const extractYouTubeVideoId = (url: string): string => {
    const regex = /(?:youtube\.com\/(?:.*v=|.*\/)|youtu\.be\/)([^&?/]+)/;
    const match = url.match(regex);
    return match ? match[1] : "";
  };

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

// Initialisation du lecteur YouTube
const initYouTubePlayer = () => {
  if (window.YT && playerRef.current) {
    console.log("🎬 Initialisation du lecteur YouTube...");

    const newPlayer = new window.YT.Player(playerRef.current, {
      videoId: extractYouTubeVideoId(src),
      events: {
        onReady: (event: any) => {
          setPlayer(event.target);
        },
        onStateChange: handleStateChange,
      },
      playerVars: {
        autoplay: 1,
        controls: 0,
        modestbranding: 1,
        rel: 0,
        showinfo: 0,
      },
    });
  } else {
    console.error("⚠️ API YouTube non disponible lors de l'initialisation.");
  }
};

  // Chargement de l'API YouTube et recréation du lecteur
  useEffect(() => {
    if (!window.YT && !scriptAdded.current) {
      scriptAdded.current = true;
      console.log("⏳ Chargement de l'API YouTube...");
      const script = document.createElement("script");
      script.src = "https://www.youtube.com/iframe_api";
      script.async = true;
      script.onload = () => {
        setTimeout(initYouTubePlayer, 500);
      };
      document.body.appendChild(script);
    } else {
      initYouTubePlayer();
    }
  }, [videoKey]); // Force la recréation du player

  // Détruit le lecteur lorsque l'utilisateur ferme la page
  useEffect(() => {
    return () => {
      if (player) {
        console.log("🗑️ Destruction du lecteur YouTube...");
        player.destroy();
        setPlayer(null);
      }
    };
  }, []);

  // Recréer la vidéo quand on revient sur la page
  useEffect(() => {
    setVideoKey((prev) => prev + 1);
  }, [src]);

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

  useEffect(() => {
    const interval = setInterval(() => {
      if (player) {
        const state = player.getPlayerState?.();
        if (state === window.YT.PlayerState.PLAYING) {
          setIsPlaying(true);
        }
      }
    }, 1000); // vérifie toutes les secondes (ajuste si tu veux)
  
    return () => clearInterval(interval);
  }, [player]);

  return (
    <div className="relative">
      <div className="relative">
        <PlayerFrame
          playerRef={playerRef}
          isPlayingAndDelay={!isPlaying}
          isVideoEnded={isVideoEnded}
          scale={scale}
          frameSrc={frameSrc}
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
          onClose={onClose}
          scale={scale}
        />
      </div>
    </div>
  );
};

export default Player;
