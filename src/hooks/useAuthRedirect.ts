import { useRouter } from 'next/router';

import Routes from '@/router/routes';

import useCheckPlatform from './utils/useCheckPlatform';

export default function useAuthRedirect() {
  const router = useRouter();

  const { platform } = useCheckPlatform();

  const handleLogin = (redirectPath?: string) => {
    if (platform === 'mobile') {
      router.push({
        pathname: `/${Routes.EntryMobile}/${Routes.Login}`,
        query: {
          redirect: redirectPath || router.asPath,
        },
      });
    } else {
      // TO DO PC Hanlder
    }
  };

  const handleVerified = (redirectPath?: string) => {
    if (platform === 'mobile') {
      router.push({
        pathname: `/${Routes.EntryMobile}/${Routes.VerifyCi}`,
        query: {
          redirect: redirectPath || router.asPath,
        },
      });
    } else {
      // TO DO PC Hanlder
    }
  };

  return { handleLogin, handleVerified };
}
