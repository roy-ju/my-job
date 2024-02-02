import { useEffect } from 'react';

import { useRouter } from 'next/router';

import { loginWithKakao } from '@/lib/kakao';

export default function AuthKakao() {
  const router = useRouter();

  useEffect(() => {
    const type = router.query.type;

    const timeout = setTimeout(() => loginWithKakao(type === 'update' ? type : ''), 100);

    return () => {
      clearTimeout(timeout);
    };
  }, [router.query.type]);

  return <div />;
}
