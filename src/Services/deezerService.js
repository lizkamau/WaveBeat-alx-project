import axios from 'axios';

/**
 * Deezer public search endpoint:
 * https://api.deezer.com/search?q=QUERY
 *
 * Note: Deezer sometimes enforces CORS; you may need to use a CORS proxy in dev
 * (see notes below). Keep queries simple: title, artist or album.
 */

const DEEZER_BASE = 'https://api.deezer.com';

export async function searchTracks(q) {
  if (!q || q.trim() === '') return [];
  // Deezer returns JSON when called server-side. For client-side, might need proxy.
  const url = `${DEEZER_BASE}/search?q=${encodeURIComponent(q)}`;
  const res = await axios.get(url);
  // res.data.data: array of tracks
  return res.data.data || [];
}

export async function getTrack(id) {
  const url = `${DEEZER_BASE}/track/${id}`;
  const res = await axios.get(url);
  return res.data;
}

export default { searchTracks, getTrack };
