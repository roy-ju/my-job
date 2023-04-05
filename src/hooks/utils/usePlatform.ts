import { useRouter } from 'next/router';
import { useMemo } from 'react';

export default function usePlatform() {
  const { pathname } = useRouter();
  return useMemo(() => {
    const firstSegment = pathname.split('/')[0];
    if (firstSegment === 'mobile') return 'mobile';
    return 'pc';
  }, [pathname]);
}
