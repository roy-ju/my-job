import { useState } from 'react';

import { checkPlatform } from '@/utils/checkPlatform';

import useIsomorphicLayoutEffect from './useIsomorphicLayoutEffect';

export default function useCheckPlatform() {
  const [platform, setPlatform] = useState('');

  useIsomorphicLayoutEffect(() => {
    const value = checkPlatform();

    setPlatform(value);
  }, []);

  return { platform };
}
