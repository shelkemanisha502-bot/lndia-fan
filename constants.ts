import { Track, Playlist } from './types';

export const MOCK_TRACKS: Track[] = [
  {
    id: '1',
    title: 'Midnight City',
    artist: 'Neon Dreams',
    album: 'Synthwave Horizons',
    coverUrl: 'https://picsum.photos/id/10/300/300',
    duration: '3:45',
  },
  {
    id: '2',
    title: 'Solar Flare',
    artist: 'Cosmic Rays',
    album: 'Galactic Beats',
    coverUrl: 'https://picsum.photos/id/20/300/300',
    duration: '4:12',
  },
  {
    id: '3',
    title: 'Deep Ocean',
    artist: 'Blue Whale',
    album: 'Ambient Waters',
    coverUrl: 'https://picsum.photos/id/30/300/300',
    duration: '5:30',
  },
  {
    id: '4',
    title: 'Urban Jungle',
    artist: 'Metro Pulse',
    album: 'City Lights',
    coverUrl: 'https://picsum.photos/id/40/300/300',
    duration: '2:58',
  },
  {
    id: '5',
    title: 'Retro Grade',
    artist: 'Analog Soul',
    album: 'Tape Deck',
    coverUrl: 'https://picsum.photos/id/50/300/300',
    duration: '3:22',
  },
    {
    id: '6',
    title: 'Lost in Time',
    artist: 'The Travelers',
    album: 'Chronicles',
    coverUrl: 'https://picsum.photos/id/60/300/300',
    duration: '4:05',
  },
  {
    id: '7',
    title: 'Neon Nights',
    artist: 'Cyber Punk',
    album: 'Future City',
    coverUrl: 'https://picsum.photos/id/70/300/300',
    duration: '3:15',
  },
  {
    id: '8',
    title: 'Golden Hour',
    artist: 'Sunset Vibes',
    album: 'Chill Horizons',
    coverUrl: 'https://picsum.photos/id/80/300/300',
    duration: '3:40',
  }
];

export const MOCK_PLAYLISTS: Playlist[] = [
  {
    id: 'p1',
    name: 'Top Hits 2024',
    description: 'The hottest tracks right now.',
    coverUrl: 'https://picsum.photos/id/100/300/300',
    tracks: [MOCK_TRACKS[0], MOCK_TRACKS[1], MOCK_TRACKS[3]],
  },
  {
    id: 'p2',
    name: 'Focus Flow',
    description: 'Instrumentals to help you concentrate.',
    coverUrl: 'https://picsum.photos/id/101/300/300',
    tracks: [MOCK_TRACKS[2], MOCK_TRACKS[4]],
  },
  {
    id: 'p3',
    name: 'Workout Energy',
    description: 'High BPM for high intensity.',
    coverUrl: 'https://picsum.photos/id/102/300/300',
    tracks: [MOCK_TRACKS[1], MOCK_TRACKS[3], MOCK_TRACKS[5]],
  }
];
