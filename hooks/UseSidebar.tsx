import { create } from "zustand";

interface useSideBarStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useSideBar = create<useSideBarStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useSideBar;
