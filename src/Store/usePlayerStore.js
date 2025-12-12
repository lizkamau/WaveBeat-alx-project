import create from 'zustand';

const usePlayerStore = create((set, get) => ({
  queue: [],             // list of track objects
  currentIndex: -1,      // index in queue
  playing: false,
  volume: 1,
  error: null,
  setQueue: (tracks, startIndex = 0) => set({ queue: tracks, currentIndex: startIndex }),
  playIndex: (index) => {
    const q = get().queue;
    if (!q || !q[index]) {
      set({ error: 'Track not found' });
      return;
    }
    set({ currentIndex: index, playing: true, error: null });
  },
  togglePlay: () => set((s) => ({ playing: !s.playing })),
  setPlaying: (val) => set({ playing: val }),
  setVolume: (v) => set({ volume: Math.min(1, Math.max(0, v)) }),
  next: () => {
    const { queue, currentIndex } = get();
    if (currentIndex + 1 < queue.length) {
      set({ currentIndex: currentIndex + 1, playing: true });
    }
  },
  prev: () => {
    const { currentIndex } = get();
    if (currentIndex > 0) set({ currentIndex: currentIndex - 1, playing: true });
  },
  setError: (err) => set({ error: err }),
}));

export default usePlayerStore;
