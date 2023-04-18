import { create } from "zustand";

interface FetchState {
  shouldFetch: boolean;
  yesFetch: () => void;
  noFetch: () => void;
}

const useShouldFetch = create<FetchState>((set) => ({
  shouldFetch: false,
  yesFetch: () => set({ shouldFetch: true }),
  noFetch: () => set({ shouldFetch: false }),
}));

export default useShouldFetch;