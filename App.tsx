import React, { useState, useEffect, useCallback } from 'react';
import { HashRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { Home, Search, Library, PlusCircle, Disc, Sparkles, LogOut, Menu, X } from 'lucide-react';

import { Track, Playlist } from './types';
import { MOCK_TRACKS, MOCK_PLAYLISTS } from './constants';
import { Player } from './components/Player';
import { TrackList } from './components/TrackList';
import { Button } from './components/Button';
import { generateAIPlaylist } from './services/geminiService';

// --- Pages (Defined in App.tsx to keep file count under control as requested) ---

// 1. Home Page
const HomePage: React.FC<{ onPlay: (t: Track) => void, onToggle: () => void, currentTrack: Track | null, isPlaying: boolean }> = ({ onPlay, onToggle, currentTrack, isPlaying }) => {
  const greeting = new Date().getHours() < 12 ? 'Good morning' : new Date().getHours() < 18 ? 'Good afternoon' : 'Good evening';

  return (
    <div className="p-8 space-y-8 bg-gradient-to-b from-purple-900/40 to-slate-900/0">
      <h1 className="text-3xl font-bold mb-6">{greeting}</h1>
      
      <section>
        <h2 className="text-xl font-bold mb-4">Made for you</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {MOCK_PLAYLISTS.map(playlist => (
            <div key={playlist.id} className="bg-white/5 p-4 rounded-lg hover:bg-white/10 transition-colors group cursor-pointer">
              <div className="relative mb-4">
                 <img src={playlist.coverUrl} alt={playlist.name} className="w-full aspect-square object-cover rounded shadow-lg" />
                 <button 
                  onClick={() => onPlay(playlist.tracks[0])}
                  className="absolute bottom-2 right-2 w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center shadow-xl translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300"
                 >
                   <div className="ml-1 text-black"><svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg></div>
                 </button>
              </div>
              <h3 className="font-bold truncate">{playlist.name}</h3>
              <p className="text-sm text-slate-400 line-clamp-2">{playlist.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-xl font-bold mb-4">Trending Hits</h2>
        <TrackList 
          tracks={MOCK_TRACKS.slice(0, 5)} 
          currentTrack={currentTrack}
          isPlaying={isPlaying}
          onPlay={onPlay}
          onTogglePlay={onToggle}
        />
      </section>
    </div>
  );
};

// 2. AI Generator Page
const AIPlaylistPage: React.FC<{ onPlay: (t: Track) => void, onToggle: () => void, currentTrack: Track | null, isPlaying: boolean }> = ({ onPlay, onToggle, currentTrack, isPlaying }) => {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [generatedPlaylist, setGeneratedPlaylist] = useState<Playlist | null>(null);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setLoading(true);
    setGeneratedPlaylist(null);
    
    // Simulate thinking time if API is fast, for UX
    const result = await generateAIPlaylist(prompt);
    setLoading(false);
    
    if (result) {
      setGeneratedPlaylist(result);
    }
  };

  return (
    <div className="p-8 min-h-full bg-gradient-to-b from-indigo-900/30 to-slate-900">
      <div className="max-w-3xl mx-auto space-y-8">
        <div className="text-center space-y-4">
           <div className="inline-flex items-center justify-center p-3 bg-purple-600 rounded-full mb-4 shadow-lg shadow-purple-900/50">
             <Sparkles size={32} className="text-white" />
           </div>
           <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-300">
             AI Playlist Generator
           </h1>
           <p className="text-slate-300 text-lg">
             Describe your mood, activity, or a specific scenario, and let MuseAI create the perfect soundtrack.
           </p>
        </div>

        <form onSubmit={handleGenerate} className="relative">
          <input 
            type="text" 
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="e.g., 'A rainy Sunday morning with jazz' or 'Cyberpunk coding session'"
            className="w-full bg-slate-800/80 border border-slate-700 rounded-full py-4 px-6 pr-32 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-lg shadow-xl"
            disabled={loading}
          />
          <div className="absolute right-2 top-2 bottom-2">
            <Button type="submit" disabled={loading} size="sm" className="h-full">
              {loading ? 'Thinking...' : 'Generate'}
            </Button>
          </div>
        </form>

        {loading && (
          <div className="flex flex-col items-center justify-center py-20 space-y-4 animate-pulse">
            <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-slate-400">Curating tracks for you...</p>
          </div>
        )}

        {generatedPlaylist && (
          <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 shadow-2xl animate-fade-in-up">
            <div className="flex flex-col md:flex-row gap-6 mb-8">
               <img src={generatedPlaylist.coverUrl} className="w-48 h-48 rounded shadow-lg object-cover mx-auto md:mx-0" alt="AI Generated" />
               <div className="flex flex-col justify-end text-center md:text-left">
                  <span className="uppercase text-xs font-bold tracking-wider text-purple-400 mb-1">AI Generated Playlist</span>
                  <h2 className="text-3xl md:text-5xl font-bold mb-4">{generatedPlaylist.name}</h2>
                  <p className="text-slate-300 mb-4">{generatedPlaylist.description}</p>
                  <Button onClick={() => onPlay(generatedPlaylist.tracks[0])} className="w-fit mx-auto md:mx-0">
                    <div className="mr-2 fill-current"><svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg></div>
                    Play Mix
                  </Button>
               </div>
            </div>
            
            <TrackList 
              tracks={generatedPlaylist.tracks} 
              currentTrack={currentTrack}
              isPlaying={isPlaying}
              onPlay={onPlay}
              onTogglePlay={onToggle}
            />
          </div>
        )}
      </div>
    </div>
  );
};

// 3. Search Page (Simple Placeholder)
const SearchPage: React.FC = () => (
  <div className="p-8">
    <div className="max-w-xl">
      <h1 className="text-3xl font-bold mb-6">Search</h1>
      <input type="text" placeholder="What do you want to listen to?" className="w-full bg-white text-black rounded-full py-3 px-6 mb-8 focus:outline-none focus:ring-2 focus:ring-white" />
      
      <h2 className="text-lg font-bold mb-4">Browse all</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {['Pop', 'Rock', 'Hip-Hop', 'Electronic', 'Jazz', 'Classical', 'Focus', 'Gaming'].map(genre => (
          <div key={genre} className="aspect-video bg-slate-800 rounded-lg p-4 font-bold text-xl hover:bg-slate-700 cursor-pointer overflow-hidden relative">
            <span className="relative z-10">{genre}</span>
            <div className="absolute -bottom-4 -right-4 w-20 h-20 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full opacity-50 blur-xl"></div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

// --- Layout Components ---

const Sidebar: React.FC<{mobileOpen: boolean, setMobileOpen: (v: boolean) => void}> = ({ mobileOpen, setMobileOpen }) => {
  const location = useLocation();
  
  const NavItem = ({ to, icon: Icon, label }: { to: string, icon: any, label: string }) => {
    const isActive = location.pathname === to;
    return (
      <Link 
        to={to} 
        onClick={() => setMobileOpen(false)}
        className={`flex items-center gap-4 px-4 py-3 text-sm font-medium transition-colors rounded-md ${isActive ? 'text-white bg-white/10' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
      >
        <Icon size={24} />
        <span>{label}</span>
      </Link>
    );
  };

  return (
    <>
      {/* Mobile Overlay */}
      {mobileOpen && <div className="fixed inset-0 bg-black/50 z-40 md:hidden" onClick={() => setMobileOpen(false)} />}
      
      <aside className={`fixed top-0 left-0 bottom-24 w-64 bg-black p-6 flex flex-col gap-6 transition-transform duration-300 z-40 md:translate-x-0 ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex items-center gap-2 px-4 mb-2">
          <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
            <Disc size={20} className="text-white animate-spin-slow" />
          </div>
          <span className="text-xl font-bold tracking-tight">MuseAI</span>
        </div>

        <nav className="space-y-1">
          <NavItem to="/" icon={Home} label="Home" />
          <NavItem to="/search" icon={Search} label="Search" />
          <NavItem to="/library" icon={Library} label="Your Library" />
        </nav>

        <div className="pt-6 mt-6 border-t border-slate-800">
          <NavItem to="/create-playlist" icon={PlusCircle} label="Create Playlist" />
          <NavItem to="/ai-generator" icon={Sparkles} label="AI Generator" />
        </div>

        <div className="mt-auto">
           <button className="flex items-center gap-2 text-sm text-slate-400 hover:text-white px-4">
             <LogOut size={18} />
             <span>Log out</span>
           </button>
        </div>
      </aside>
    </>
  );
};


// --- Main App Component ---

const App: React.FC = () => {
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Initialize with a track but don't play automatically
  useEffect(() => {
    setCurrentTrack(MOCK_TRACKS[0]);
  }, []);

  const handlePlay = useCallback((track: Track) => {
    if (currentTrack?.id === track.id) {
      setIsPlaying(true);
    } else {
      setCurrentTrack(track);
      setIsPlaying(true);
    }
  }, [currentTrack]);

  const handleTogglePlay = useCallback(() => {
    setIsPlaying(prev => !prev);
  }, []);

  const handleNext = useCallback(() => {
    if (!currentTrack) return;
    const currentIndex = MOCK_TRACKS.findIndex(t => t.id === currentTrack.id);
    const nextTrack = MOCK_TRACKS[(currentIndex + 1) % MOCK_TRACKS.length];
    setCurrentTrack(nextTrack);
    setIsPlaying(true);
  }, [currentTrack]);

  const handlePrev = useCallback(() => {
    if (!currentTrack) return;
    const currentIndex = MOCK_TRACKS.findIndex(t => t.id === currentTrack.id);
    const prevTrack = MOCK_TRACKS[(currentIndex - 1 + MOCK_TRACKS.length) % MOCK_TRACKS.length];
    setCurrentTrack(prevTrack);
    setIsPlaying(true);
  }, [currentTrack]);

  return (
    <Router>
      <div className="h-screen flex flex-col bg-slate-900 text-white overflow-hidden">
        
        {/* Mobile Header */}
        <div className="md:hidden flex items-center justify-between p-4 bg-black sticky top-0 z-30">
          <div className="flex items-center gap-2">
             <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
                <Disc size={20} />
             </div>
             <span className="font-bold">MuseAI</span>
          </div>
          <button onClick={() => setMobileMenuOpen(true)}>
            <Menu size={24} />
          </button>
        </div>

        <div className="flex-1 flex overflow-hidden">
          <Sidebar mobileOpen={mobileMenuOpen} setMobileOpen={setMobileMenuOpen} />
          
          <main className="flex-1 overflow-y-auto md:ml-64 pb-24 relative bg-slate-900">
             <Routes>
               <Route path="/" element={<HomePage onPlay={handlePlay} onToggle={handleTogglePlay} currentTrack={currentTrack} isPlaying={isPlaying} />} />
               <Route path="/search" element={<SearchPage />} />
               <Route path="/ai-generator" element={<AIPlaylistPage onPlay={handlePlay} onToggle={handleTogglePlay} currentTrack={currentTrack} isPlaying={isPlaying} />} />
               <Route path="*" element={<div className="p-10 text-center">Page Not Found</div>} />
             </Routes>
          </main>
        </div>

        <Player 
          currentTrack={currentTrack} 
          isPlaying={isPlaying} 
          togglePlay={handleTogglePlay}
          playNext={handleNext}
          playPrev={handlePrev}
        />
      </div>
    </Router>
  );
};

export default App;
