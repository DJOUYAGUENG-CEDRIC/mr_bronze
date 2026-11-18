'use client';

import { useRef, useState } from 'react';

const WAVEFORM = [4, 8, 13, 7, 17, 10, 22, 14, 8, 18, 12, 25, 16, 9, 20, 13, 27, 16, 10, 22, 13, 7, 18, 11, 24, 15, 8, 19, 12, 6, 16, 10, 21, 13, 7, 17, 11, 23, 14, 8];

function formatTime(seconds) {
  if (!Number.isFinite(seconds)) return '0:00';
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes}:${String(remainingSeconds).padStart(2, '0')}`;
}

export default function VoiceMessage() {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [hasError, setHasError] = useState(false);
  const progress = duration ? currentTime / duration : 0;

  const togglePlayback = async () => {
    const audio = audioRef.current;
    if (!audio || hasError) return;

    if (audio.paused) {
      try {
        await audio.play();
      } catch {
        setHasError(true);
      }
    } else {
      audio.pause();
    }
  };

  const seek = (event) => {
    const audio = audioRef.current;
    if (!audio || !duration) return;

    const nextTime = Number(event.target.value);
    audio.currentTime = nextTime;
    setCurrentTime(nextTime);
  };

  return (
    <div className="voice-message" role="group" aria-label="Message vocal de bienvenue">
      <audio
        ref={audioRef}
        src="/welcome.ogg"
        preload="metadata"
        className="hidden"
        onLoadedMetadata={(event) => setDuration(event.currentTarget.duration)}
        onTimeUpdate={(event) => setCurrentTime(event.currentTarget.currentTime)}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onEnded={() => setIsPlaying(false)}
        onError={() => setHasError(true)}
      />

      <button
        type="button"
        className="voice-play-button"
        onClick={togglePlayback}
        disabled={hasError}
        aria-label={isPlaying ? 'Mettre le vocal en pause' : 'Écouter le vocal'}
      >
        {isPlaying ? (
          <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M7 5h4v14H7zm6 0h4v14h-4z" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M8 5v14l11-7z" />
          </svg>
        )}
      </button>

      <div className="voice-track">
        <div className="voice-waveform" aria-hidden="true">
          {WAVEFORM.map((height, index) => (
            <span
              key={index}
              className="voice-waveform-bar"
              style={{
                height,
                background: index / WAVEFORM.length < progress ? '#b45309' : '#cbd5e1',
              }}
            />
          ))}
          <input
            type="range"
            min="0"
            max={duration || 0}
            step="0.1"
            value={currentTime}
            onChange={seek}
            disabled={!duration || hasError}
            aria-label="Position dans le message vocal"
            aria-valuetext={`${formatTime(currentTime)} sur ${formatTime(duration)}`}
          />
        </div>
        <span className="voice-time" aria-live="off">
          {hasError ? 'Audio indisponible' : formatTime(isPlaying ? currentTime : duration)}
        </span>
      </div>
    </div>
  );
}
