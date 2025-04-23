export type MediaType = "audio" | "video";

export interface Track {
  src: string;
  title: string;
  type: MediaType;
}

export interface PlayerConfig {
  type: "media"; // ✅ ou "mixed"
  tracks: Track[];
  autoplay?: boolean;
  controls?: boolean;
}

export interface PlaylistItem {
  name: string;
  type: string;
  playerConfig: PlayerConfig;
}