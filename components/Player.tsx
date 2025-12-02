import React from 'react';
import { Track } from '../types';
import { Play, Pause, SkipBack, SkipForward, Repeat, Shuffle, Volume2, Mic2, ListMusic, Maximize2 } from 'lucide-react';

interface PlayerProps {
  currentTrack: Track | null;
  isPlaying: boolean;
  togglePlay: () => void;
  playNext: () => void;
  playPrev: () => void;
}

export const Player: React.FC<PlayerProps> = ({ currentTrack, isPlaying, togglePlay, playNext, playPrev }) => {
  if (!currentTrack) return null;

  return (
    <div className="h-24 bg-slate-900 border-t border-slate-800 px-4 flex items-center justify-between sticky bottom-0 z-50">
      {/* Current Track Info */}
      <div className="flex items-center gap-4 w-1/3 min-w-[200px]">
        <img 
          src={currentTrack.coverUrl} 
          alt={currentTrack.title} 
          className="w-14 h-14 rounded-md shadow-lg object-cover"
        />
        <div className="flex flex-col overflow-hidden">
          <span className="text-white text-sm font-medium truncate hover:underline cursor-pointer">
            {currentTrack.title}
          </span>
          <span className="text-slate-400 text-xs truncate hover:underline cursor-pointer">
            {currentTrack.artist}
          </span>
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-col items-center gap-2 w-1/3">
        <div className="flex items-center gap-6">
          <button className="text-slate-400 hover:text-white transition-colors">
            <Shuffle size={18} />
          </button>
          <button onClick={playPrev} className="text-slate-200 hover:text-white transition-colors">
            <SkipBack size={24} fill="currentColor" />
          </button>
          <button 
            onClick={togglePlay} 
            className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:scale-105 transition-transform text-black"
          >
            {isPlaying ? <Pause size={20} fill="currentColor" /> : <Play size={20} fill="currentColor" className="ml-0.5" />}
          </button>
          <button onClick={playNext} className="text-slate-200 hover:text-white transition-colors">
            <SkipForward size={24} fill="currentColor" />
          </button>
          <button className="text-slate-400 hover:text-white transition-colors">
            <Repeat size={18} />
          </button>
        </div>
        
        <div className="w-full max-w-md flex items-center gap-2 text-xs text-slate-400 font-mono">
          <span>0:00</span>
          <div className="h-1 flex-1 bg-slate-700 rounded-full cursor-pointer relative group">
            <div className="absolute h-full w-1/3 bg-white rounded-full group-hover:bg-purple-500"></div>
          </div>
          <span>{currentTrack.duration}</span>
        </div>
      </div>

      {/* Volume / Extra Actions */}
      <div className="flex items-center justify-end gap-3 w-1/3 min-w-[200px] text-slate-400">
         <button className="hover:text-white"><Mic2 size={18} /></button>
         <button className="hover:text-white"><ListMusic size={18} /></button>
         <div className="flex items-center gap-2 w-24">
            <Volume2 size={18} />
            <div className="h-1 flex-1 bg-slate-700 rounded-full cursor-pointer">
              <div className="h-full w-2/3 bg-slate-200 rounded-full hover:bg-white"></div>
            </div>
         </div>
         <button className="hover:text-white"><Maximize2 size={16} /></button>
      </div>
    </div>
  );
};
