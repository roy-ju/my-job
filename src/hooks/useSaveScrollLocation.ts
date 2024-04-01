import { RefObject, useEffect } from 'react';

import { useRouter } from 'next/router';

export default function useSaveScrollLocation(elementRef: RefObject<HTMLDivElement>, key: string) {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = () => {
      // 페이지 전환 시 스크롤 위치 저장
      let scrollPosition = 0;

      if (elementRef?.current) {
        scrollPosition = elementRef.current.scrollTop;
      }

      sessionStorage.setItem(key, scrollPosition.toString());
    };

    router.events.on('routeChangeStart', handleRouteChange);

    return () => {
      router.events.off('routeChangeStart', handleRouteChange);
    };
  }, [elementRef, key, router.events]);
}
