import React from "react";

interface VideoPlayerProps {
  src: string;
  autoplay?: boolean;
  loop?: boolean;
  controls?: boolean;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ src, autoplay = false, loop = false, controls = true }) => {
  return (
    <video
      src={src}
      autoPlay={autoplay}
      loop={loop}
      controls={controls}
      className="w-full h-auto"
    />
  );
};

export default VideoPlayer;