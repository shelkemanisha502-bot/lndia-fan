export interface Track {
  id: string;
  title: string;
  artist: string;
  album: string;
  coverUrl: string;
  duration: string; // Display string "3:45"
  audioUrl?: string; // Optional real URL, mocked for this demo
}

export interface Playlist {
  id: string;
  name: string;
  description: string;
  coverUrl: string;
  tracks: Track[];
  isAiGenerated?: boolean;
}

export interface PlayerState {
  currentTrack: Track | null;
  isPlaying: boolean;
  volume: number;
  progress: number; // 0 to 100
  isShuffling: boolean;
  isRepeating: boolean;
  queue: Track[];
}

export enum ViewState {
  HOME = 'HOME',
  SEARCH = 'SEARCH',
  LIBRARY = 'LIBRARY',
  AI_GENERATOR = 'AI_GENERATOR',
  PLAYLIST_DETAILS = 'PLAYLIST_DETAILS'
}
