import { useState } from 'react';

import useIsomorphicLayoutEffect from './useIsomorphicLayoutEffect';

export default function useRender() {
  const [render, setRender] = useState(false);

  useIsomorphicLayoutEffect(() => {
    setRender(true);
  }, []);

  return { render };
}
