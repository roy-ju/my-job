import { MobRegisterSuccess } from '@/components/templates';

import Routes from '@/router/routes';
import { useRouter } from 'next/router';
import { useCallback } from 'react';

export default function SuccessWrraper() {
  const router = useRouter();

  const handleLeave = useCallback(() => {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const redirect = urlSearchParams.get('redirect');
    if (redirect) {
      router.replace(redirect);
    } else {
      router.replace(`/${Routes.EntryMobile}/${Routes.My}`);
    }
  }, [router]);

  const navigateToVerifyCi = useCallback(() => {
    router.replace({
      pathname: `/${Routes.EntryMobile}/${Routes.VerifyCi}`,
      query: {
        redirect: router.query.redirect ?? '',
      },
    });
  }, [router]);

  return <MobRegisterSuccess onClickLeave={handleLeave} onClickVerifyCi={navigateToVerifyCi} />;
}
