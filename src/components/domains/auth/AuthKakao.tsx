import { useEffect } from 'react';

import { useRouter } from 'next/router';

import { loginWithKakao } from '@/lib/kakao';

import useIsNativeApp from '@/hooks/useIsNativeApp';

export default function AuthKakao() {
  const router = useRouter();

  const isNativeApp = useIsNativeApp();

  useEffect(() => {
    const loginType = router?.query?.type;

    const timeout = setTimeout(() => loginWithKakao(loginType === 'update' ? loginType : '', isNativeApp), 200);

    return () => clearTimeout(timeout);
  }, [router, isNativeApp]);

  return <div />;
}
