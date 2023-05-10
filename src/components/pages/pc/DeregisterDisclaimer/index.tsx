import deregister from '@/apis/user/deregister';
import { useAPI_GetDeregisterStatus } from '@/apis/user/getDeregisterStatus';
import { deleteFcmToken } from '@/apis/user/updateFcmToken';
import { Panel } from '@/components/atoms';
import { DeregisterDisclaimer as DeregisterDisclaimerTemplate } from '@/components/templates';
import Keys from '@/constants/storage_keys';
import { useRouter } from '@/hooks/utils';
import Routes from '@/router/routes';
import { memo, useCallback } from 'react';
import { toast } from 'react-toastify';
import { mutate } from 'swr';

interface Props {
  depth: number;
  panelWidth?: string;
}

export default memo(({ depth, panelWidth }: Props) => {
  const router = useRouter(depth);

  const { data } = useAPI_GetDeregisterStatus();

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
    if (deregistered) {
      await mutate((key) => key !== '/my/user/deregister/status');

      await router.popAll();
    } else {
      toast.error('Cannot deregister');
    }
  }, [router, deregisterReasons]);

  return (
    <Panel width={panelWidth}>
      <DeregisterDisclaimerTemplate
        onClickBack={handleClickBackButton}
        onClickDeregister={handleDeregister}
        canDeregister={data?.can_deregister ?? false}
      />
    </Panel>
  );
});
