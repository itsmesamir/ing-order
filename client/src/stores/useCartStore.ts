import { create } from 'zustand';

import { Any, OrderItem } from 'types/common';

interface TCartState {
  items: OrderItem[];
  loading: boolean;
  error: boolean;
  errorData: Any;
}

interface TCartStore extends TCartState {
  addItem: (item: OrderItem) => void;
  removeItem: (id: number) => void;
  clearCart: () => void;
  loadCart: () => void;
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

  addItem: (item: OrderItem) =>
    set(state => {
      const updatedItems = [...state.items];
      const existingItemIndex = updatedItems.findIndex(i => i.id === item.id);

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
      const updatedItems = state.items.filter(item => item.id !== id);

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
}));

// Automatically load the cart from local storage on initialization
useCartStore.getState().loadCart();

export default useCartStore;
