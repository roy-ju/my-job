import deregister from '@/apis/user/deregister';
import { useAPI_GetDeregisterStatus } from '@/apis/user/getDeregisterStatus';
import { deleteFcmToken } from '@/apis/user/updateFcmToken';
import { MobileContainer } from '@/components/atoms';
import { OverlayPresenter } from '@/components/molecules';
import { DeregisterDisclaimerPopup } from '@/components/organisms';
import { DeregisterDisclaimer } from '@/components/templates';
import Keys from '@/constants/storage_keys';

import Routes from '@/router/routes';
import { useRouter } from 'next/router';
import { useCallback, useState } from 'react';
import { toast } from 'react-toastify';
import { mutate } from 'swr';

export default function DeregisterDisclaimerWrraper() {
  const router = useRouter();

  const { data } = useAPI_GetDeregisterStatus();
  const [status, setStatus] = useState<'none' | 'confirm' | 'success'>('none');

  let deregisterReasons = router.query.deregisterReasons as string;

  if (router.query.extraReasons) {
    deregisterReasons = deregisterReasons?.concat(',', router.query.extraReasons as string);
  }

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
    localStorage.removeItem(Keys.REFRESH_TOKEN);

    if (deregistered) {
      await mutate(() => true, undefined);
      router.replace(`/${Routes.EntryMobile}/${Routes.My}`);
    } else {
      toast.error('Cannot deregister');
    }
  }, [deregisterReasons, router]);

  const handleStatusChange = useCallback(() => {
    switch (status) {
      case 'none':
        setStatus('confirm');
        break;
      case 'confirm':
        setStatus('success');
        break;
      case 'success':
        handleDeregister();
        break;
      default:
        throw Error('Invalid status');
    }
  }, [status, handleDeregister]);

  const handleClickCancel = useCallback(() => {
    setStatus('none');
  }, []);

  return (
    <MobileContainer>
      <DeregisterDisclaimer
        onClickBack={handleClickBackButton}
        onClickDeregister={handleStatusChange}
        canDeregister={data?.can_deregister ?? false}
      />
      {status === 'confirm' && (
        <OverlayPresenter>
          <DeregisterDisclaimerPopup.Confirm onClickCancel={handleClickCancel} onClickDeregister={handleStatusChange} />
        </OverlayPresenter>
      )}

      {status === 'success' && (
        <OverlayPresenter>
          <DeregisterDisclaimerPopup.Success onClickNavigateToHome={handleStatusChange} />
        </OverlayPresenter>
      )}
    </MobileContainer>
  );
}
