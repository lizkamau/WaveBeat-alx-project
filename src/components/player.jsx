import React, { useEffect, useRef, useState } from "react";
import usePlayerStore from "../store/usePlayerStore";

export default function Player() {
  const audioRef = useRef(null);
  const queue = usePlayerStore((s) => s.queue);
  const currentIndex = usePlayerStore((s) => s.currentIndex);
  const playing = usePlayerStore((s) => s.playing);
  const volume = usePlayerStore((s) => s.volume);
  const next = usePlayerStore((s) => s.next);
  const prev = usePlayerStore((s) => s.prev);
  const setPlaying = usePlayerStore((s) => s.setPlaying);
  const setVolume = usePlayerStore((s) => s.setVolume);

  const [progress, setProgress] = useState(0);

  const current = queue && queue[currentIndex];

  // Sync play/pause to audio element
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = volume;
    if (playing) {
      audio.play().catch((e) => {
        console.error("Play failed:", e);
        setPlaying(false);
      });
    } else {
      audio.pause();
    }
  }, [playing, currentIndex, volume, setPlaying]);

  // When track changes, set src & reset progress
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (current) {
      audio.src = current.preview;
      setProgress(0);
      if (playing) audio.play().catch(() => setPlaying(false));
    } else {
      audio.src = "";
    }
  }, [currentIndex, current]);

  // Progress handler
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const onTime = () => setProgress(audio.currentTime / audio.duration || 0);
    const onEnded = () => next();
    audio.addEventListener("timeupdate", onTime);
    audio.addEventListener("ended", onEnded);
    return () => {
      audio.removeEventListener("timeupdate", onTime);
      audio.removeEventListener("ended", onEnded);
    };
  }, [next]);

  if (!current) {
    return <div className="text-gray-600">No track selected</div>;
  }

  return (
    <div className="flex items-center gap-4">
      <audio ref={audioRef} />
      <img
        src={current.cover}
        alt={current.album}
        className="w-14 h-14 rounded"
      />
      <div className="flex-1">
        <div className="font-semibold">{current.title}</div>
        <div className="text-sm text-gray-600">{current.artist}</div>
        <div className="h-2 bg-gray-200 rounded mt-2 relative">
          <div
            className="h-2 bg-blue-600 rounded"
            style={{ width: `${progress * 100}%` }}
          />
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button onClick={prev} className="px-3 py-1 bg-gray-200 rounded">
          Prev
        </button>
        <button
          onClick={() => setPlaying(!playing)}
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          {playing ? "Pause" : "Play"}
        </button>
        <button onClick={next} className="px-3 py-1 bg-gray-200 rounded">
          Next
        </button>
        <div className="flex items-center gap-2 ml-3">
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={(e) => setVolume(parseFloat(e.target.value))}
          />
        </div>
      </div>
    </div>
  );
}
