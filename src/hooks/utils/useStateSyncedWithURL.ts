import { useEffect, useState } from 'react';

export default function useStateSyncedWithURL<T>(
  paramName: string,
  defaultValue: T,
): [T, (_: T | ((prev: T) => T)) => void] {
  const [state, setState] = useState(defaultValue);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.toString());
      const filterEncoded = url.searchParams.get(paramName);

      if (filterEncoded !== null) {
        const decoded = decodeURIComponent(filterEncoded);
        setState(JSON.parse(decoded) as T);
      }
    }
  }, [paramName]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stringified = JSON.stringify(state);
      const encoded = encodeURIComponent(stringified);

      const url = new URL(window.location.toString());
      url.searchParams.set(paramName, encoded);
      window.history.replaceState(window.history.state, '', url);
    }
  }, [paramName, state]);

  return [state, setState];
}
