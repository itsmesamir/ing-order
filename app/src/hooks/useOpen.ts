import { useState } from 'react';

interface UseOpenReturn<T> {
  isOpen: boolean;
  state?: T;
  toggle: () => void;
  open: (newState?: T) => void;
  close: () => void;
}

/**
 * Creates a custom hook that manages the state for both a boolean (isOpen) and a generic value.
 *
 * @param {T} initialState - The initial state of the generic type.
 * @param {boolean} [initialIsOpen=false] - The initial state of the isOpen boolean.
 * @return {UseOpenReturn<T>} An object containing the isOpen value, the state, and functions for toggling, opening, and closing the element.
 */
const useOpen = <T>(initialIsOpen: boolean = false, initialState?: T): UseOpenReturn<T> => {
  const [isOpen, setIsOpen] = useState<boolean>(initialIsOpen);
  const [state, setState] = useState<T | undefined>(initialState);

  /**
   * Toggles the value of isOpen.
   *
   * @return {void} No return value.
   */
  const toggle = (): void => {
    setIsOpen(prev => !prev);
  };

  /**
   * Opens the component and sets a new state.
   *
   * @param {T} newState - The new state to set.
   * @return {void} No return value.
   */
  const open = (newState?: T): void => {
    if (newState) {
      setState(newState);
    }

    setIsOpen(true);
  };

  /**
   * Closes the component and resets the isOpen state to false.
   *
   * @return {void} No return value.
   */
  const close = (): void => {
    setState(undefined);

    setIsOpen(false);
  };

  return {
    isOpen,
    state,
    toggle,
    open,
    close,
  };
};

export default useOpen;
