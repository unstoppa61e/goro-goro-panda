import { useEffect } from 'react';

export const useBodyStyling = (classNames: string[]) => {
  useEffect(() => {
    document.body.classList.add(...classNames);

    return () => {
      document.body.classList.remove(...classNames);
    };
  }, []);
};
