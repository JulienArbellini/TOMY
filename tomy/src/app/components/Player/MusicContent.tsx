import React from 'react';

interface MusicContentProps {
  src?: string;
  scale: number;
  playerRef?: React.RefObject<HTMLAudioElement>;
}

const MusicContent: React.FC<MusicContentProps> = ({ src, playerRef }) => {
  return (
    <audio ref={playerRef} controls style={{ width: '100%' }}>
      <source src={src} />
      Votre navigateur ne supporte pas la lecture audio.
    </audio>
  );
};

export default MusicContent;
