import { useCallback } from 'react';

import { useRouter } from 'next/router';

import MobileContainer from '@/components/atoms/MobileContainer';

import { MobRegisterSuccess } from '@/components/templates';

import Routes from '@/router/routes';

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

  return (
    <MobileContainer>
      <MobRegisterSuccess onClickLeave={handleLeave} onClickVerifyCi={navigateToVerifyCi} />
    </MobileContainer>
  );
}
