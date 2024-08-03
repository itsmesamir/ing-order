import { create } from 'zustand';

import { Any, CartItem } from 'types/common';

interface TCartState {
  items: CartItem[];
  loading: boolean;
  error: boolean;
  errorData: Any;
}

interface Summary {
  total: number;
}

interface TCartStore extends TCartState {
  addItem: (item: CartItem) => void;
  removeItem: (id: number) => void;
  clearCart: () => void;
  loadCart: () => void;
  getSummary: (items: CartItem[]) => Summary;
}

const initialCartState: TCartState = {
  items: [],
  loading: false,
  error: false,
  errorData: null,
};

const localStorageKey = 'cartState';

const useCartStore = create<TCartStore>(set => ({
  ...initialCartState,

  addItem: (item: CartItem) =>
    set(state => {
      const updatedItems = [...state.items];
      const existingItemIndex = updatedItems.findIndex(i => i.item?.id === item.item?.id);

      if (existingItemIndex !== -1) {
        updatedItems[existingItemIndex].quantity += item.quantity;
      } else {
        updatedItems.push(item);
      }

      const newState = { ...state, items: updatedItems };

      localStorage.setItem(localStorageKey, JSON.stringify(newState));

      return newState;
    }),

  removeItem: (id: number) =>
    set(state => {
      const updatedItems = state.items.filter(item => item.item?.id !== id);

      const newState = { ...state, items: updatedItems };

      localStorage.setItem(localStorageKey, JSON.stringify(newState));

      return newState;
    }),

  clearCart: () =>
    set(state => {
      const newState = { ...state, items: [] };

      localStorage.setItem(localStorageKey, JSON.stringify(newState));

      return newState;
    }),

  loadCart: () =>
    set(() => {
      const storedState = localStorage.getItem(localStorageKey);

      if (storedState) {
        return JSON.parse(storedState);
      }

      return initialCartState;
    }),

  getSummary: items => {
    const total = items.reduce((accTotal, item) => accTotal + item.price * item.quantity, 0);

    return { total };
  },
}));

// Automatically load the cart from local storage on initialization
useCartStore.getState().loadCart();

export default useCartStore;
