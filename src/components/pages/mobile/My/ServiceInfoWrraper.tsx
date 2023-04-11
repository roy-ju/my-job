import { MobServiceInfo } from '@/components/templates';
import Routes from '@/router/routes';
import { useRouter } from 'next/router';
import { useCallback } from 'react';

export default function ServiceInfoWrraper() {
  const router = useRouter();

  const handleClickBusinessInfo = useCallback(() => {
    router.replace(`/${Routes.EntryMobile}/${Routes.My}/${Routes.BusinessInfo}`);
  }, [router]);

  return <MobServiceInfo onClickBusinessInfo={handleClickBusinessInfo} />;
}
