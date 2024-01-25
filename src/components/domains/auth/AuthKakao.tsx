import { useEffect } from 'react';

import { useRouter } from 'next/router';

import { loginWithKakao } from '@/lib/kakao';

export default function AuthKakao() {
  const router = useRouter();

  const loginType = router?.query?.type;

  useEffect(() => {
    setTimeout(() => loginWithKakao(loginType === 'update' ? loginType : ''), 100);
  }, [loginType]);

  return <div />;
}
