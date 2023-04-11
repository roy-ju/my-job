import { MobDeregister } from '@/components/templates';

import Routes from '@/router/routes';
import { useRouter } from 'next/router';
import { useCallback } from 'react';

export default function DeregisterWrraper() {
  const router = useRouter();

  const handleClickBackButton = useCallback(() => {
    router.replace(`/${Routes.EntryMobile}/${Routes.My}/${Routes.MyDetailMobile}`);
  }, [router]);

  const handleClickNext = useCallback(() => {
    router.replace(`/${Routes.EntryMobile}/${Routes.My}/${Routes.DeregisterDisclaimer}`);
  }, [router]);

  return <MobDeregister onClickBackButton={handleClickBackButton} onClickNext={handleClickNext} />;
}
