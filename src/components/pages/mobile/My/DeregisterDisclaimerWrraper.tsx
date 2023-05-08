import deregister from '@/apis/user/deregister';
import { useAPI_GetDeregisterStatus } from '@/apis/user/getDeregisterStatus';
import { MobileContainer } from '@/components/atoms';
import { DeregisterDisclaimer } from '@/components/templates';
import { useAuth } from '@/hooks/services';

import Routes from '@/router/routes';
import { useRouter } from 'next/router';
import { useCallback } from 'react';
import { toast } from 'react-toastify';

export default function DeregisterDisclaimerWrraper() {
  const router = useRouter();
  const { logout } = useAuth();

  const { data } = useAPI_GetDeregisterStatus();

  const deregisterReasons = router.query.deregisterReasons as string;

  const handleClickBackButton = useCallback(() => {
    router.replace({
      pathname: `/${Routes.EntryMobile}/${Routes.Deregister}`,
      query: {
        deregisterReasons: router.query.deregisterReasons as string,
        extraReasons: router.query.extraReasons as string,
      },
    });
  }, [router]);

  const handleDeregister = useCallback(async () => {
    const deregistered = await deregister(deregisterReasons);
    if (deregistered) {
      logout();
      router.replace(`/${Routes.EntryMobile}/${Routes.My}`);
    } else {
      toast.error('Cannot deregister');
    }
  }, [deregisterReasons, logout, router]);

  return (
    <MobileContainer>
      <DeregisterDisclaimer
        onClickBack={handleClickBackButton}
        onClickDeregister={handleDeregister}
        canDeregister={data?.can_deregister ?? false}
      />
    </MobileContainer>
  );
}
