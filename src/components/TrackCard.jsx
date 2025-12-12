import React from "react";
import usePlayerStore from "../store/usePlayerStore";

export default function TrackCard({ track, index }) {
  const playIndex = usePlayerStore((s) => s.playIndex);
  const currentIndex = usePlayerStore((s) => s.currentIndex);
  const playing = usePlayerStore((s) => s.playing);
  const isCurrent = currentIndex === index;

  return (
    <div className="flex items-center gap-4 p-3 bg-white rounded shadow">
      <img
        src={track.cover}
        alt={track.album}
        className="w-16 h-16 rounded object-cover"
      />
      <div className="flex-1">
        <div className="font-semibold">{track.title}</div>
        <div className="text-sm text-gray-600">
          {track.artist} — {track.album}
        </div>
      </div>
      <div>
        <button
          onClick={() => playIndex(index)}
          className="px-3 py-1 bg-blue-600 text-white rounded"
        >
          {isCurrent && playing ? "Playing" : "Play"}
        </button>
      </div>
    </div>
  );
}
