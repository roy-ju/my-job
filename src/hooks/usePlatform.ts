import { useMemo } from 'react';

import { useRouter } from 'next/router';

export default function usePlatform() {
  const { pathname } = useRouter();

  return useMemo(() => {
    const firstSegment = pathname.split('/')[1];

    if (firstSegment === 'm') return 'mobile';

    return 'pc';
  }, [pathname]);
}
