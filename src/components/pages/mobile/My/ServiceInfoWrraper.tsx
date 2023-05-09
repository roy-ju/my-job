import { MobServiceInfo } from '@/components/templates';
import Routes from '@/router/routes';
import { useRouter } from 'next/router';
import { useCallback } from 'react';

export default function ServiceInfoWrraper() {
  const router = useRouter();

  const handleClickBusinessInfo = useCallback(() => {
    router.push(`/${Routes.EntryMobile}/${Routes.BusinessInfo}`);
  }, [router]);

  const handleClickBack = () => {
    router.back();
  };

  return <MobServiceInfo onClickBusinessInfo={handleClickBusinessInfo} onClickBack={handleClickBack} />;
}
