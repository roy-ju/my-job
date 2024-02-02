import { useEffect, useMemo } from 'react';

import { useRouter } from 'next/router';

import { loginWithKakao } from '@/lib/kakao';

import useIsNativeApp from '@/hooks/useIsNativeApp';

export default function AuthKakao() {
  const router = useRouter();

  const isNativeApp = useIsNativeApp();

  const type = useMemo(() => router?.query?.type ?? '', [router]);

  useEffect(() => {
    const timeout = setTimeout(() => loginWithKakao(type === 'update' ? type : '', isNativeApp), 200);

    return () => {
      clearTimeout(timeout);
    };
  }, [type, isNativeApp]);

  return <div />;
}
