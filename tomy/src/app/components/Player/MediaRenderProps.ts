// MediaRendererProps.ts

export interface VideoMediaProps {
  mediaType: 'video';
  src?: string;
  scale: number;
  playerRef: React.RefObject<HTMLIFrameElement>;
}

export interface ImageMediaProps {
  mediaType: 'image';
  src?: string;
  scale: number;
}

export interface TextMediaProps {
  mediaType: 'text';
  src?: string;
  scale: number;
}

export interface MusicMediaProps {
  mediaType: 'music';
  src?: string;
  scale: number;
  playerRef: React.RefObject<HTMLAudioElement>;
}

export interface MediaRendererProps {
  mediaType: 'image' | 'text' | 'music';
  src?: string;
  scale: number;
  playerRef?: React.RefObject<HTMLAudioElement>;
}

