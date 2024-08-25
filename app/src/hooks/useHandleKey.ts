import { useEffect } from 'react';

export const useHandleKey = (callBack: () => void, key: string) => {
  useEffect(() => {
    function handleKey(event: KeyboardEvent) {
      if (event.code === key) {
        callBack();
      }
    }

    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, []);
};
