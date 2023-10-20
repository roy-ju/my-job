import deregister from '@/apis/user/deregister';
import { useAPI_GetDeregisterStatus } from '@/apis/user/getDeregisterStatus';
import { deleteFcmToken } from '@/apis/user/updateFcmToken';
import { Panel } from '@/components/atoms';
import { DeregisterDisclaimer as DeregisterDisclaimerTemplate } from '@/components/templates';
import Keys from '@/constants/storage_keys';
import { useRouter } from '@/hooks/utils';
import Routes from '@/router/routes';
import { memo, useCallback, useState } from 'react';
import { toast } from 'react-toastify';
import { mutate } from 'swr';
import { DeregisterDisclaimerPopup } from '@/components/organisms';
import { OverlayPresenter } from '@/components/molecules';

interface Props {
  depth: number;
  panelWidth?: string;
}

export default memo(({ depth, panelWidth }: Props) => {
  const router = useRouter(depth);
  const { data } = useAPI_GetDeregisterStatus();
  const [status, setStatus] = useState<'none' | 'confirm' | 'success'>('none');

  let deregisterReasons = router.query.deregisterReasons as string;

  if (router.query.extraReasons) {
    deregisterReasons = deregisterReasons?.concat(',', router.query.extraReasons as string);
  }

  const handleClickBackButton = useCallback(() => {
    router.replace(Routes.Deregister, {
      state: {
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
      await mutate((key) => key !== '/my/user/deregister/status');

      await router.popAll();
    } else {
      toast.error('Cannot deregister');
    }
  }, [router, deregisterReasons]);

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
    <Panel width={panelWidth}>
      <DeregisterDisclaimerTemplate
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
    </Panel>
  );
});
