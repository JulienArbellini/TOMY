// VideoContent.tsx

import React from 'react';

interface VideoContentProps {
  src?: string;
  scale: number;
  playerRef: React.RefObject<HTMLIFrameElement>;
}

const VideoContent: React.FC<VideoContentProps> = ({ src, scale, playerRef }) => {
  return (
    <iframe
      ref={playerRef}
      src={`${src}?enablejsapi=1`}
      title="Lecteur vidéo YouTube"
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      style={{
        width: '100%',
        height: '100%',
        objectFit: 'cover',
      }}
    ></iframe>
  );
};

export default VideoContent;
