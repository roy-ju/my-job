import deregister from '@/apis/user/deregister';
import { useAPI_GetDeregisterStatus } from '@/apis/user/getDeregisterStatus';
import { MobDeregisterDisclaimer } from '@/components/templates';
import { useAuth } from '@/hooks/services';

import Routes from '@/router/routes';
import { useRouter } from 'next/router';
import { useCallback } from 'react';
import { toast } from 'react-toastify';

export default function DeregisterDisclaimerWrraper() {
  const router = useRouter();
  const { logout } = useAuth();

  const { data } = useAPI_GetDeregisterStatus();

  const handleClickBackButton = useCallback(() => {
    router.replace(`/${Routes.EntryMobile}/${Routes.My}/${Routes.Deregister}`);
  }, [router]);

  const handleDeregister = useCallback(async () => {
    const deregistered = await deregister('');
    if (deregistered) {
      logout();
      router.replace(`/${Routes.EntryMobile}/${Routes.My}`);
    } else {
      toast.error('Cannot deregister');
    }
  }, [logout, router]);

  return (
    <MobDeregisterDisclaimer
      onClickBack={handleClickBackButton}
      onClickDeregister={handleDeregister}
      canDeregister={data?.can_deregister ?? false}
    />
  );
}
