import { useEffect, useRef } from 'react';

export default function useUnmount(fn: () => void) {
  const callbackRef = useRef(fn);
  useEffect(
    () => () => {
      callbackRef.current();
    },
    [],
  );
}
