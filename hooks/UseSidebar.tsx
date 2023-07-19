import { create } from "zustand";

interface useSidebarStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useSidebar = create<useSidebarStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useSidebar;
