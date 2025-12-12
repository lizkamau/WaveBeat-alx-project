import React, { useState } from "react";
import SearchBar from "./components/SearchBar";
import TrackList from "./components/TrackList";
import Player from "./components/Player";
import usePlayerStore from "./store/usePlayerStore";
import deezerService from "./services/deezerService";

export default function App() {
  const [loading, setLoading] = useState(false);
  const [queryError, setQueryError] = useState(null);
  const setQueue = usePlayerStore((s) => s.setQueue);

  const handleSearch = async (q) => {
    setQueryError(null);
    setLoading(true);
    try {
      const tracks = await deezerService.searchTracks(q);
      if (!tracks || tracks.length === 0) {
        setQueryError("No tracks found.");
        setQueue([], -1);
      } else {
        // Map only fields we need
        const mapped = tracks.map((t) => ({
          id: t.id,
          title: t.title,
          artist: t.artist?.name,
          album: t.album?.title,
          cover: t.album?.cover_small || t.album?.cover,
          preview: t.preview, // preview URL (30s)
        }));
        setQueue(mapped, 0);
      }
    } catch (err) {
      console.error(err);
      setQueryError("Network or API error. See console.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white shadow p-4">
        <h1 className="text-2xl font-semibold">WaveBeat — Music Player</h1>
      </header>

      <main className="flex-1 container mx-auto p-4">
        <SearchBar onSearch={handleSearch} loading={loading} />
        {queryError && <div className="mt-4 text-red-600">{queryError}</div>}
        <TrackList />
      </main>

      <footer className="bg-white border-t p-4">
        <Player />
      </footer>
    </div>
  );
}
