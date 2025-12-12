import React, { useState } from "react";

export default function SearchBar({ onSearch, loading }) {
  const [q, setQ] = useState("");

  const submit = (e) => {
    e.preventDefault();
    onSearch(q);
  };

  return (
    <form onSubmit={submit} className="flex gap-2 items-center">
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Search by song, artist or album..."
        className="flex-1 p-3 border rounded shadow-sm"
      />
      <button
        type="submit"
        disabled={loading}
        className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-60"
      >
        {loading ? "Searching..." : "Search"}
      </button>
    </form>
  );
}
