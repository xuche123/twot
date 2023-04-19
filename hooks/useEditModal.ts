import { create } from "zustand";

interface EditModalState {
  isOpen: boolean;
  open: () => void;
  close: () => void;
}

const useEditModal = create<EditModalState>((set) => ({
  isOpen: false,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
}));

export default useEditModal;