import { memo, useCallback } from 'react';

import { mutate } from 'swr';

import { toast } from 'react-toastify';

import { useRouter } from '@/hooks/utils';

import { OverlayPresenter } from '@/components/molecules';

import { Panel } from '@/components/atoms';

import Keys from '@/constants/storage_keys';

import Routes from '@/router/routes';

import { apiService } from '@/services';

import MyDeregisterDisclaimer from '@/components/domains/my/MyDeregisterClaimer';

import DergisterDisclaimer from '@/components/domains/my/dergister-disclaimer/popups/DergisterDisclaimer';

import useFetchDergisterStatus from '@/services/my/useFetchDergisterStatus';

import useMyDeregisterClaimer from '@/components/domains/my/dergister-disclaimer/hooks/useMyDeregisterClaimer';

interface Props {
  depth: number;
  panelWidth?: string;
}

function DeregisterDisclaimerPc({ depth, panelWidth }: Props) {
  const { status, setStatus, handleClickCancel } = useMyDeregisterClaimer();

  const { data } = useFetchDergisterStatus();

  const router = useRouter(depth);

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
      await apiService.deleteFcmToken({ token: fcmToken });
    }

    const deregistered = await apiService.deregister(deregisterReasons);

    localStorage.removeItem(Keys.ACCESS_TOKEN);
    localStorage.removeItem(Keys.REFRESH_TOKEN);

    if (deregistered) {
      await mutate(() => true, undefined);
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
  }, [status, setStatus, handleDeregister]);

  return (
    <Panel width={panelWidth}>
      <MyDeregisterDisclaimer
        onClickBack={handleClickBackButton}
        onClickDeregister={handleStatusChange}
        canDeregister={data?.can_deregister ?? false}
      />

      {status === 'confirm' && (
        <OverlayPresenter>
          <DergisterDisclaimer.Confirm onClickCancel={handleClickCancel} onClickDeregister={handleStatusChange} />
        </OverlayPresenter>
      )}

      {status === 'success' && (
        <OverlayPresenter>
          <DergisterDisclaimer.Success onClickNavigateToHome={handleStatusChange} />
        </OverlayPresenter>
      )}
    </Panel>
  );
}

export default memo(DeregisterDisclaimerPc);
