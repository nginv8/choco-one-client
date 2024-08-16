import { StateCreator } from 'zustand';

type SidebarState = {
  isSidebarOpen: boolean;
  openSidebar: () => void;
  closeSidebar: () => void;
};

const createSidebarSlice: StateCreator<SidebarState> = (set) => ({
  isSidebarOpen: false,
  openSidebar: () => set({ isSidebarOpen: true }),
  closeSidebar: () => set({ isSidebarOpen: false }),
});

export default createSidebarSlice;
