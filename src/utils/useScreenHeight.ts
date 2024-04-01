import { useState, useEffect } from 'react';

export default function useScreenHeight() {
  const [screenHeight, setScreenHeight] = useState(typeof window !== 'undefined' ? window.innerHeight : 0);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const handleResize = () => {
        setScreenHeight(window?.screen?.height ?? 0);
      };

      window.addEventListener('resize', handleResize);

      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  return { height: screenHeight };
}
