import React from 'react';
import { Track } from '../types';
import { Play, Pause, Heart, MoreHorizontal } from 'lucide-react';

interface TrackListProps {
  tracks: Track[];
  currentTrack: Track | null;
  isPlaying: boolean;
  onPlay: (track: Track) => void;
  onTogglePlay: () => void;
}

export const TrackList: React.FC<TrackListProps> = ({ tracks, currentTrack, isPlaying, onPlay, onTogglePlay }) => {
  return (
    <div className="w-full">
      <div className="grid grid-cols-[auto_1fr_1fr_auto] gap-4 px-4 py-2 text-xs font-semibold text-slate-400 uppercase border-b border-slate-800">
        <span className="w-8 text-center">#</span>
        <span>Title</span>
        <span>Album</span>
        <span className="text-right">Time</span>
      </div>
      <div className="mt-2 space-y-1">
        {tracks.map((track, index) => {
          const isCurrent = currentTrack?.id === track.id;
          return (
            <div 
              key={track.id}
              className={`group grid grid-cols-[auto_1fr_1fr_auto] gap-4 px-4 py-3 rounded-md hover:bg-white/5 items-center text-sm transition-colors ${isCurrent ? 'text-purple-400 bg-white/10' : 'text-slate-200'}`}
            >
              <div className="w-8 flex items-center justify-center relative">
                <span className={`group-hover:hidden ${isCurrent && isPlaying ? 'hidden' : 'block'}`}>
                  {isCurrent && isPlaying ? '' : index + 1}
                </span>
                <button 
                  onClick={() => isCurrent ? onTogglePlay() : onPlay(track)}
                  className={`hidden group-hover:block ${isCurrent && isPlaying ? 'block' : ''}`}
                >
                  {isCurrent && isPlaying ? <Pause size={14} /> : <Play size={14} fill="currentColor" />}
                </button>
                {isCurrent && isPlaying && <div className="absolute inset-0 flex items-center justify-center group-hover:hidden">
                   <div className="w-3 h-3 animate-pulse bg-purple-500 rounded-full"></div>
                </div>}
              </div>
              
              <div className="flex items-center gap-3 overflow-hidden">
                <img src={track.coverUrl} alt={track.title} className="w-10 h-10 rounded shadow-md object-cover flex-shrink-0" />
                <div className="flex flex-col truncate">
                  <span className={`font-medium truncate ${isCurrent ? 'text-purple-400' : 'text-white'}`}>{track.title}</span>
                  <span className="text-xs text-slate-400 truncate">{track.artist}</span>
                </div>
              </div>
              
              <div className="text-slate-400 truncate hidden sm:block">
                {track.album}
              </div>
              
              <div className="flex items-center gap-4 justify-end text-slate-400">
                <button className="hidden group-hover:block hover:text-white"><Heart size={16} /></button>
                <span className="font-mono text-xs">{track.duration}</span>
                <button className="hidden group-hover:block hover:text-white"><MoreHorizontal size={16} /></button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
