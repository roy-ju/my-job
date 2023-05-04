import { useState, useEffect } from 'react';

export function useNetwork() {
  const [online, setOnline] = useState(window.navigator.onLine);

  useEffect(() => {
    const cb = () => {
      setOnline(window.navigator.onLine);
    };

    window.addEventListener('online', cb);
    window.addEventListener('offline', cb);

    return () => {
      window.removeEventListener('online', cb);
      window.removeEventListener('offline', cb);
    };
  }, []);

  return online;
}
