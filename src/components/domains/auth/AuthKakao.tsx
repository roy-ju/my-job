import { useCallback } from 'react';

import { useRouter } from 'next/router';

import { useTimeout } from '@/hooks/useTimeout';

export default function AuthKakao() {
  const router = useRouter();

  const handleLoginWithKakao = useCallback(() => {
    const type = (router?.query?.type as string) ?? '';

    if (typeof window !== 'undefined' && typeof Kakao !== 'undefined') {
      Kakao.Auth.authorize({
        redirectUri: `${window.location.origin}/callback/kakaoLogin`,
        state: type,
      });
    }
  }, [router]);

  useTimeout(handleLoginWithKakao, 300);

  return <div />;
}
