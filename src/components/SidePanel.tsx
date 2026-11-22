import React, { useRef } from 'react';
import { usePlayer } from '../context/PlayerContext';
import { TRACKS } from '../data/sidejobData';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

export const SidePanel: React.FC = () => {
  const {
    isOpen,
    setIsOpen,
    currentTrack,
    currentTrackIndex,
    isPlaying,
    togglePlay,
    playTrack,
    nextTrack,
    prevTrack,
    currentTime,
    duration,
    seek
  } = usePlayer();

  const containerRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

  // Format seconds to mm:ss
  const formatTime = (seconds: number) => {
    if (isNaN(seconds) || seconds < 0) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  const handleTimelineClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!timelineRef.current) return;
    const rect = timelineRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const pct = Math.max(0, Math.min(100, (clickX / rect.width) * 100));
    seek(pct);
  };

  useGSAP(() => {
    if (isOpen) {
      gsap.fromTo(
        '.side-panel-content',
        { opacity: 0, x: 20 },
        { opacity: 1, x: 0, duration: 0.45, ease: 'power2.out', stagger: 0.05 }
      );
    }
  }, { scope: containerRef, dependencies: [isOpen] });

  if (!isOpen) return null;

  return (
    <aside
      ref={containerRef}
      className="side-panel p-[1.5vw] text-secondary select-none"
      aria-label="Side panel media player"
    >
      {/* Top Header */}
      <div className="side-panel-content flex items-center justify-between pb-[1vw] border-b border-secondary/10">
        <div className="flex items-center gap-[0.4vw]">
          <span className="w-[0.6vw] h-[0.6vw] bg-yellow rounded-full animate-pulse" />
          <span className="extraSmallText uppercase tracking-wider text-secondary/60">
            Sidejob Radio
          </span>
        </div>
        <button
          onClick={() => setIsOpen(false)}
          className="extraSmallText text-secondary/40 hover:text-secondary cursor-pointer transition-colors"
          title="Press Esc to close"
        >
          'esc' to close [×]
        </button>
      </div>

      {/* Now Playing Featured Unit */}
      <div className="side-panel-content player-main my-[1.5vw]">
        <div className="now-playing flex items-center gap-[1vw]">
          <div className="w-[4.5vw] h-[4.5vw] sm:w-[5vw] sm:h-[5vw] rounded-[0.4vw] overflow-hidden bg-secondary/10 flex-shrink-0 shadow-md">
            <img
              src={currentTrack.image}
              alt={currentTrack.title}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="min-w-0 flex-1">
            <h4 className="smallText font-medium truncate text-secondary">
              {currentTrack.title}
            </h4>
            <p className="extraSmallText text-secondary/50 truncate">
              {currentTrack.author}
            </p>
          </div>
        </div>

        {/* Progress Bar & Timers */}
        <div className="mt-[1.2vw]">
          <div
            ref={timelineRef}
            onClick={handleTimelineClick}
            className="w-full h-[0.35vw] bg-secondary/10 hover:h-[0.5vw] rounded-full cursor-pointer relative overflow-hidden transition-all"
          >
            <div
              className="h-full bg-yellow rounded-full transition-transform duration-100 ease-linear"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <div className="flex justify-between detailText text-secondary/40 mt-[0.4vw]">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        {/* Audio Controls */}
        <div className="flex items-center justify-center gap-[1.2vw] mt-[0.8vw]">
          <button
            onClick={prevTrack}
            className="hover:scale-110 active:scale-95 transition-transform text-secondary/70 hover:text-secondary cursor-pointer"
            aria-label="Previous track"
          >
            <svg width="1.2vw" height="1.2vw" viewBox="0 0 24 24" fill="currentColor">
              <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z" />
            </svg>
          </button>
          <button
            onClick={togglePlay}
            className="w-[2.6vw] h-[2.6vw] rounded-full bg-yellow text-secondary flex items-center justify-center hover:scale-105 active:scale-95 shadow-md transition-all cursor-pointer"
            aria-label={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? (
              <svg width="1.2vw" height="1.2vw" viewBox="0 0 24 24" fill="currentColor">
                <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
              </svg>
            ) : (
              <svg width="1.2vw" height="1.2vw" viewBox="0 0 24 24" fill="currentColor" className="translate-x-[0.08vw]">
                <path d="M8 5v14l11-7z" />
              </svg>
            )}
          </button>
          <button
            onClick={nextTrack}
            className="hover:scale-110 active:scale-95 transition-transform text-secondary/70 hover:text-secondary cursor-pointer"
            aria-label="Next track"
          >
            <svg width="1.2vw" height="1.2vw" viewBox="0 0 24 24" fill="currentColor">
              <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Playlist Section */}
      <div className="side-panel-content flex-1 min-h-0 flex flex-col pt-[1vw] border-t border-secondary/10">
        <span className="extraSmallText font-medium text-secondary/40 mb-[0.6vw]">
          TRACKLIST ({TRACKS.length})
        </span>
        <div className="track-list overflow-y-auto pr-[0.3vw] space-y-[0.3vw] flex-1">
          {TRACKS.map((track, idx) => {
            const isActive = idx === currentTrackIndex;
            return (
              <div
                key={idx}
                onClick={() => playTrack(idx)}
                className={`p-[0.5vw] rounded-[0.3vw] cursor-pointer flex items-center justify-between transition-colors ${
                  isActive
                    ? 'bg-secondary text-primary font-medium'
                    : 'hover:bg-secondary/5 text-secondary'
                }`}
              >
                <div className="flex items-center gap-[0.6vw] min-w-0">
                  <span className={`detailText ${isActive ? 'text-yellow' : 'text-secondary/40'}`}>
                    {(idx + 1).toString().padStart(2, '0')}
                  </span>
                  <div className="truncate">
                    <p className="extraSmallText truncate">{track.title}</p>
                    <p className={`detailText truncate ${isActive ? 'text-primary/70' : 'text-secondary/50'}`}>
                      {track.author}
                    </p>
                  </div>
                </div>
                {isActive && isPlaying && (
                  <span className="flex items-end gap-[1px] h-[0.8vw] pr-[0.3vw]">
                    <span className="w-[2px] h-[0.8vw] bg-yellow animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-[2px] h-[0.5vw] bg-yellow animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-[2px] h-[0.7vw] bg-yellow animate-bounce" style={{ animationDelay: '300ms' }} />
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </aside>
  );
};
