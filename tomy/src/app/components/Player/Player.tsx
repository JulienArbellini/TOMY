import React, { useState, useRef, useEffect } from 'react';
import PlayerFrame from './PlayerFrame';
import PlayerControls from './PlayerControls';
import MediaRenderer from './MediaRenderer';
import { MediaRendererProps } from './MediaRenderProps';


interface PlayerProps {
  className?: string;
  src?: string;
  mediaType: 'video' | 'image' | 'text' | 'music';
}

const Player: React.FC<PlayerProps> = ({ src, mediaType }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [scale, setScale] = useState(1);
  const [isVideoEnded, setIsVideoEnded] = useState(false);
  const playerRef = useRef<HTMLIFrameElement>(null); // Pour la vidéo
  const audioRef = useRef<HTMLAudioElement>(null); // Pour la musique
    // Préparez les props pour MediaRenderer

  // Gestion spécifique au média vidéo
  // Initialisation du lecteur vidéo ou audio en fonction du mediaType
  useEffect(() => {
    if (mediaType === 'video') {
      // Initialisation du lecteur YouTube
    } else if (mediaType === 'music') {
      // Initialisation du lecteur audio
    }
  }, [mediaType]);

  let mediaRendererProps: MediaRendererProps;
  switch (mediaType) {
    case 'video':
      mediaRendererProps = {
        mediaType: 'video',
        src,
        scale,
        playerRef: playerRef,
      };
      break;
    case 'music':
      mediaRendererProps = {
        mediaType: 'music',
        src,
        scale,
        playerRef: audioRef,
      };
      break;
    case 'image':
      mediaRendererProps = {
        mediaType: 'image',
        src,
        scale,
      };
      break;
    case 'text':
      mediaRendererProps = {
        mediaType: 'text',
        src,
        scale,
      };
      break;
    default:
      throw new Error(`Type de média non supporté : ${mediaType}`);
  }
  // Fonctions de contrôle spécifiques
  const handlePlayClick = () => {
    if (mediaType === 'video' && playerRef.current) {
      // Contrôler la lecture vidéo
    } else if (mediaType === 'music' && audioRef.current) {
      // Contrôler la lecture audio
    }
  };

  // Autres fonctions de contrôle...

  // Déterminer les contrôles à afficher en fonction du type de média
  const controlsToShow = () => {
    switch (mediaType) {
      case 'video':
        return ['play', 'mute', 'volume', 'rewind', 'forward', 'exit'];
      case 'music':
        return ['play', 'mute', 'volume', 'exit'];
      case 'image':
      case 'text':
        return ['exit'];
      default:
        return [];
    }
  };

  return (
    <div className="absolute h-screen w-full flex justify-center items-center">
    <div className="relative">
      <PlayerFrame scale={scale}>
        <MediaRenderer {...mediaRendererProps} />
      </PlayerFrame>
      <PlayerControls
        handlePlayClick={handlePlayClick}
        // Passez les autres gestionnaires de contrôle nécessaires
        isPlaying={isPlaying}
        isMuted={isMuted}
        scale={scale}
        controlsToShow={controlsToShow()}
      />
    </div>
  </div>
  );
};

export default Player;
