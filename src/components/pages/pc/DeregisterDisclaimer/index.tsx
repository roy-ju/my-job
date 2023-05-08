import deregister from '@/apis/user/deregister';
import { useAPI_GetDeregisterStatus } from '@/apis/user/getDeregisterStatus';
import { Panel } from '@/components/atoms';
import { DeregisterDisclaimer as DeregisterDisclaimerTemplate } from '@/components/templates';
import { useAuth } from '@/hooks/services';
import { useRouter } from '@/hooks/utils';
import Routes from '@/router/routes';
import { memo, useCallback } from 'react';
import { toast } from 'react-toastify';

interface Props {
  depth: number;
  panelWidth?: string;
}

export default memo(({ depth, panelWidth }: Props) => {
  const router = useRouter(depth);
  const { logout } = useAuth();

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
    const deregistered = await deregister(deregisterReasons);
    if (deregistered) {
      await router.popAll();
      logout();
    } else {
      toast.error('Cannot deregister');
    }
  }, [logout, router, deregisterReasons]);

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
