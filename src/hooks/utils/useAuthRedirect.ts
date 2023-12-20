import Routes from '@/router/routes';
import { useRouter } from 'next/router';
import { useCallback } from 'react';

export default function useAuthRedirect() {
  const router = useRouter();

  const handleLogin = useCallback(() => {
    router.push({
      pathname: `/${Routes.EntryMobile}/${Routes.Login}`,
      query: {
        redirect: router.asPath,
      },
    });
  }, [router]);

  const handleVerified = useCallback(() => {
    router.push({
      pathname: `/${Routes.EntryMobile}/${Routes.VerifyCi}`,
      query: {
        redirect: router.asPath,
      },
    });
  }, [router]);

  return { handleLogin, handleVerified };
}
