import { checkPlatform } from '@/utils/checkPlatform';
import { ReactNode, createContext, useMemo, useContext } from 'react';

export const PlatformContext = createContext<{ platform: string; depth?: number } | null>(null);

export default function Provider({ depth, children }: { depth?: number; children: ReactNode }) {
  const platform = useMemo(() => {
    if (typeof window !== 'undefined') {
      return { platform: checkPlatform(), depth };
    }

    return null;
  }, [depth]);

  return <PlatformContext.Provider value={platform}>{children}</PlatformContext.Provider>;
}

export function usePlatform() {
  return useContext(PlatformContext);
}
