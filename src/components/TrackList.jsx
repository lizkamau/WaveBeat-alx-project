import React from "react";
import usePlayerStore from "../store/usePlayerStore";
import TrackCard from "./TrackCard";

export default function TrackList() {
  const queue = usePlayerStore((s) => s.queue);
  const error = usePlayerStore((s) => s.error);

  if (error) {
    return <div className="text-red-600 mt-4">{error}</div>;
  }

  if (!queue || queue.length === 0) {
    return (
      <div className="mt-6 text-gray-600">
        No results. Try searching for an artist or song.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
      {queue.map((t, i) => (
        <TrackCard key={t.id} track={t} index={i} />
      ))}
    </div>
  );
}
