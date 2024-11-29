// AudioPlayer.tsx
import React from "react";

interface AudioPlayerProps {
  src: string;
  autoplay?: boolean;
  controls?: boolean;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ src, autoplay, controls }) => {
  return (
    <audio
      src={src}
      autoPlay={autoplay}
      controls={controls}
      className="w-full h-full"
      style={{ objectFit: 'cover' }}
    />
  );
};

export default AudioPlayer;