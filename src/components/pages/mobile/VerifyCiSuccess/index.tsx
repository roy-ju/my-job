import { MobVerifyCiSuccess } from '@/components/templates';
import Routes from '@/router/routes';
import { useRouter } from 'next/router';

import { useCallback } from 'react';

export default function VerifyCiSuccessWrraper() {
  const router = useRouter();

  const handleLeave = useCallback(() => {
    router.replace(`/${Routes.EntryMobile}/${Routes.Map}`);
  }, [router]);

  return <MobVerifyCiSuccess onClickLeave={handleLeave} />;
}
