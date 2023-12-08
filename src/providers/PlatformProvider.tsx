import { ReactNode, createContext, useMemo, useContext } from 'react';

export const PlatformContext = createContext<{ platform: string; depth?: number } | null>(null);

export default function Provider({
  platform,
  depth,
  children,
}: {
  platform: string;
  depth?: number;
  children: ReactNode;
}) {
  const platformValue = useMemo(() => ({ platform, depth }), [platform, depth]);

  return <PlatformContext.Provider value={platformValue}>{children}</PlatformContext.Provider>;
}

export function usePlatform() {
  return useContext(PlatformContext);
}
