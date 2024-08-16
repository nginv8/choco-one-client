import { StateCreator } from 'zustand';
import { CartItemType, ProductType } from '@/types';

type CartState = {
  cartStep: 'cart' | 'checkout' | 'order success' | 'order failure';
  cartItems: Record<number, CartItemType>;
  cartSummary: {
    deliveryPrice: number;
  };
  cartItemsQuantity: number;
  addCartItem: (item: CartItemType) => void;
  removeCartItem: (itemId: number) => void;
  isItemInCart: (productId: ProductType['id']) => boolean;
  updateCartSummary: (summary: CartState['cartSummary']) => void;
  setCartStep: (step: CartState['cartStep']) => void;
  resetCartStep: () => void;
  purgeCart: () => void;
};

const initialState = {
  cartStep: 'cart' as CartState['cartStep'],
  cartItems: {},
  cartSummary: { deliveryPrice: 0 },
  cartItemsQuantity: 0,
};

const createCartSlice: StateCreator<CartState> = (set, get) => ({
  cartItems: initialState.cartItems,
  cartSummary: initialState.cartSummary,
  cartItemsQuantity: initialState.cartItemsQuantity,
  cartStep: initialState.cartStep,

  addCartItem: (item) => {
    set((state) => {
      const newItems = { ...state.cartItems, [item.id]: item };
      return { cartItems: newItems, cartItemsQuantity: Object.keys(newItems).length };
    });
  },

  removeCartItem: (itemId) => {
    set((state) => {
      const { [itemId]: removedItem, ...newItems } = state.cartItems;
      return { cartItems: newItems, cartItemsQuantity: Object.keys(newItems).length };
    });
  },

  isItemInCart: (productId) => !!get().cartItems[productId],
  updateCartSummary: (summary) => set({ cartSummary: summary }),
  setCartStep: (step) => set({ cartStep: step }),
  resetCartStep: () => set({ cartStep: initialState.cartStep }),
  purgeCart: () =>
    set({ cartItems: initialState.cartItems, cartItemsQuantity: initialState.cartItemsQuantity }),
});

export default createCartSlice;
