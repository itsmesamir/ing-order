import { create } from 'zustand';

import { Any, CartItem } from 'types/common';

interface TCartState {
  items: CartItem[];
  loading: boolean;
  error: boolean;
  errorData: Any;
  summary: Summary;
}

interface Summary {
  total: number;
  tax: number;
  subTotal: number;
  quantity?: number;
}

interface TCartStore extends TCartState {
  addItem: (item: CartItem) => void;
  updateItemCount: (id: number, quantity: number) => void;
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
  summary: { total: 0, tax: 0, subTotal: 0, quantity: 0 },
};

const localStorageKey = 'cartState';

const useCartStore = create<TCartStore>((set, get) => ({
  ...initialCartState,

  addItem: (item: CartItem) =>
    set(state => {
      const updatedItems = [...state.items];
      const existingItemIndex = updatedItems.findIndex(i => i.menu?.id === item.menu?.id);

      if (existingItemIndex !== -1) {
        updatedItems[existingItemIndex].quantity += item.quantity;
      } else {
        updatedItems.push(item);
      }

      const newState = {
        ...state,
        items: updatedItems,
        summary: get().getSummary(updatedItems),
      };

      localStorage.setItem(localStorageKey, JSON.stringify(newState.items));

      return newState;
    }),

  updateItemCount: (id: number, quantity: number) =>
    set(state => {
      const updatedItems = [...state.items];
      const existingItemIndex = updatedItems.findIndex(i => i.menu?.id === id);

      if (existingItemIndex !== -1) {
        updatedItems[existingItemIndex].quantity = quantity;
      }

      const newState = {
        ...state,
        items: updatedItems,
        summary: get().getSummary(updatedItems),
      };

      localStorage.setItem(localStorageKey, JSON.stringify(newState.items));

      return newState;
    }),

  removeItem: (id: number) =>
    set(state => {
      const updatedItems = state.items.filter(item => item.menu?.id !== id);

      const newState = {
        ...state,
        items: updatedItems,
        summary: get().getSummary(updatedItems),
      };

      localStorage.setItem(localStorageKey, JSON.stringify(newState.items));

      return newState;
    }),

  clearCart: () =>
    set(state => {
      const newState = { ...state, items: [], summary: get().getSummary([]) };

      localStorage.setItem(localStorageKey, JSON.stringify(newState.items));

      return newState;
    }),

  loadCart: () =>
    set(() => {
      const storedState = localStorage.getItem(localStorageKey);

      if (storedState) {
        const items: CartItem[] = JSON.parse(storedState);

        const summary = get()?.getSummary(items || []);

        return { ...initialCartState, items, summary };
      }

      return initialCartState;
    }),

  getSummary: items => {
    const subTotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const taxRate = 0.1; // Example tax rate
    const tax = subTotal * taxRate;
    const total = subTotal + tax;
    const quantity = items.reduce((acc, item) => acc + item.quantity, 0);

    return { total, tax, subTotal, quantity };
  },
}));

// Automatically load the cart from local storage on initialization
useCartStore.getState().loadCart();

export default useCartStore;
