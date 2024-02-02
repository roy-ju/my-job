import { useCallback } from 'react';

import { useRouter } from 'next/router';

import { loginWithKakao } from '@/lib/kakao';

import { useTimeout } from '@/hooks/useTimeout';

export default function AuthKakao() {
  const router = useRouter();

  const handleLoginWithKakao = useCallback(() => {
    const type = router?.query?.type;
    loginWithKakao(type === 'update' ? type : '');
  }, [router]);

  useTimeout(handleLoginWithKakao, 100);

  return <div />;
}
