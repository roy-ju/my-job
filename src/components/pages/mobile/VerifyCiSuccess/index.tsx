import { MobVerifyCiSuccess } from '@/components/templates';
import Routes from '@/router/routes';
import { useRouter } from 'next/router';

import { useCallback } from 'react';

export default function VerifyCiSuccessWrraper() {
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

  return <MobVerifyCiSuccess onClickLeave={handleLeave} />;
}
