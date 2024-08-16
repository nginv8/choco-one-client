import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import createAlertSlice from './slices/alertSlice';
import createAccountTabsSlice from './slices/accountTabsSlice';
import createAuthSlice from './slices/authSlice';
import createCartSlice from './slices/cartSlice';
import createSidebarSlice from './slices/sidebarSlice';

type BoundStoreState = ReturnType<typeof createCartSlice> &
  ReturnType<typeof createAuthSlice> &
  ReturnType<typeof createAlertSlice> &
  ReturnType<typeof createAccountTabsSlice> &
  ReturnType<typeof createSidebarSlice>;

const useBoundStore = create<BoundStoreState>()(
  persist(
    (set, get, store) => ({
      ...createAlertSlice(set, get, store),
      ...createAccountTabsSlice(set, get, store),
      ...createSidebarSlice(set, get, store),
      ...createAuthSlice(set, get, store),
      ...createCartSlice(set, get, store),
    }),
    {
      name: 'bound-store',
      partialize: (state) => ({
        jwt: state.rememberMe ? state.jwt : null,
        rememberMe: state.rememberMe,
        cartItems: state.cartItems,
        cartItemsQuantity: state.cartItemsQuantity,
      }),
    }
  )
);

export default useBoundStore;
