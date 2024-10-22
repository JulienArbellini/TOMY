// MediaRenderer.tsx

import React from 'react';
import VideoContent from './VideoContent';
import ImageContent from './ImageContent';
import TextContent from './TextContent';
import MusicContent from './MusicContent';
import { MediaRendererProps } from './MediaRenderProps'

const MediaRenderer: React.FC<MediaRendererProps> = (props) => {
  switch (props.mediaType) {
    case 'video': {
      // TypeScript sait que props est de type VideoMediaProps
      const { src, scale, playerRef } = props;
      return (
        <VideoContent
          src={src}
          scale={scale}
          playerRef={playerRef}
        />
      );
    }
    case 'image': {
      const { src, scale } = props;
      return <ImageContent src={src} scale={scale} />;
    }
    case 'text': {
      const { src, scale } = props;
      return <TextContent src={src} scale={scale} />;
    }
    case 'music': {
      // TypeScript sait que props est de type MusicMediaProps
      const { src, scale, playerRef } = props;
      return (
        <MusicContent
          src={src}
          scale={scale}
          playerRef={playerRef}
        />
      );
    }
    default:
      return null;
  }
};

export default MediaRenderer;
