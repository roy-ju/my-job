import { useEffect, useState } from 'react';

export default function usePageVisibility() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    setIsVisible(!document.hidden);

    const cb = () => {
      setIsVisible(!document.hidden);
    };

    window.addEventListener('visibilitychange', cb);

    return () => {
      window.removeEventListener('visibilitychange', cb);
    };
  }, []);

  return isVisible;
}
