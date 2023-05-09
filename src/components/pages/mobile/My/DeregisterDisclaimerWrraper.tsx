import deregister from '@/apis/user/deregister';
import { useAPI_GetDeregisterStatus } from '@/apis/user/getDeregisterStatus';
import { deleteFcmToken } from '@/apis/user/updateFcmToken';
import { MobileContainer } from '@/components/atoms';
import { DeregisterDisclaimer } from '@/components/templates';
import Keys from '@/constants/storage_keys';

import Routes from '@/router/routes';
import { useRouter } from 'next/router';
import { useCallback } from 'react';
import { toast } from 'react-toastify';
import { mutate } from 'swr';

export default function DeregisterDisclaimerWrraper() {
  const router = useRouter();

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
    const fcmToken = localStorage.getItem(Keys.FCM_TOKEN);
    if (fcmToken) {
      await deleteFcmToken({ token: fcmToken });
    }
    const deregistered = await deregister(deregisterReasons);
    localStorage.removeItem(Keys.ACCESS_TOKEN);
    if (deregistered) {
      await mutate(() => true, undefined);
      router.replace(`/${Routes.EntryMobile}/${Routes.My}`);
    } else {
      toast.error('Cannot deregister');
    }
  }, [deregisterReasons, router]);

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
