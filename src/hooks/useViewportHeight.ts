import { useState, useEffect } from 'react';

export default function useViewportHeight() {
  const [viewportHeight, setViewportHeight] = useState(typeof window !== 'undefined' ? window.innerHeight : 0);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const handleResize = () => {
        setViewportHeight(window.innerHeight);
      };

      window.addEventListener('resize', handleResize);

      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  return { height: viewportHeight };
}
