import { useEffect } from 'react';

export const useDisablePinchZoomEffect = () => {
  useEffect(() => {
    const disablePinchZoom = (e: TouchEvent) => {
      if (e.touches.length > 1) {
        e.preventDefault();
      }
    };
    document.addEventListener('touchmove', disablePinchZoom, {
      passive: false,
    });

    return () => {
      document.removeEventListener('touchmove', disablePinchZoom);
    };
  }, []);
};
