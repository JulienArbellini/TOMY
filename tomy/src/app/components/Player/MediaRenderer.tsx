// MediaRenderer.tsx

import React from 'react';
import ImageContent from './ImageContent';
import TextContent from './TextContent';
import MusicContent from './MusicContent';
import { MediaRendererProps } from './MediaRenderProps'

const MediaRenderer: React.FC<MediaRendererProps> = ({
  mediaType,
  src,
  scale,
  playerRef,
}) => {
  switch (mediaType) {
    case 'image':
      return <ImageContent src={src} scale={scale} />;
    case 'text':
      return <TextContent src={src} scale={scale} />;
    case 'music':
      return <MusicContent src={src} scale={scale} playerRef={playerRef} />;
    default:
      return null;
  }
};


export default MediaRenderer;
