import { MobRegisterSuccess } from '@/components/templates';

import Routes from '@/router/routes';
import { useRouter } from 'next/router';
import { useCallback } from 'react';

export default function SuccessWrraper() {
  const router = useRouter();

  const handleLeave = useCallback(() => {
    router.replace(`/${Routes.EntryMobile}/${Routes.Map}`);
  }, [router]);

  const navigateToVerifyCi = useCallback(() => {
    router.replace(`/${Routes.EntryMobile}/${Routes.VerifyCi}`);
  }, [router]);

  return <MobRegisterSuccess onClickLeave={handleLeave} onClickVerifyCi={navigateToVerifyCi} />;
}
