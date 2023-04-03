import deregister from '@/apis/user/deregister';
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

  const handleClickBackButton = useCallback(() => {
    router.replace(Routes.Deregister);
  }, [router]);

  const handleDeregister = useCallback(async () => {
    const deregistered = await deregister('');
    if (deregistered) {
      router.popAll();
      logout();
    } else {
      toast.error('Cannot deregister');
    }
  }, [logout, router]);

  return (
    <Panel width={panelWidth}>
      <DeregisterDisclaimerTemplate onClickBack={handleClickBackButton} onClickDeregister={handleDeregister} />
    </Panel>
  );
});
