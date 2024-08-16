import { StateCreator } from 'zustand';

type TabState = 'profile' | 'orders' | 'address' | 'support';

type AccountTabsState = {
  activeTab: TabState;
  setActiveTab: (tab: TabState) => void;
};

const createAccountTabsSlice: StateCreator<AccountTabsState> = (set) => ({
  activeTab: 'profile',
  setActiveTab: (tab) => set({ activeTab: tab }),
});

export default createAccountTabsSlice;
