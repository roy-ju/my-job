import { useAuth } from '@/hooks/services';
import { useRouter } from '@/hooks/utils';
import { isClient } from '@/utils/is';
import { ReactNode } from 'react';
import Routes from '@/router/routes';
import Panel from '../Panel';
import Loading from '../Loading';

interface Props {
  depth?: number;
  ciRequired?: boolean;
  children?: ReactNode;
  onAccessDenied?: () => void;
}

export default function AuthRequired({ depth = 1, ciRequired = false, onAccessDenied, children }: Props) {
  const router = useRouter(depth);
  const { user, isLoading } = useAuth();

  if (isLoading)
    return (
      <Panel>
        <div tw="py-20">
          <Loading />
        </div>
      </Panel>
    );

  if (!user) {
    onAccessDenied?.();
    if (isClient && router.isReady) {
      router.replace(Routes.Login, { persistParams: true });
    }
    return <Panel />;
  }

  if (ciRequired && !user.isVerified) {
    onAccessDenied?.();
    if (isClient && router.isReady) {
      router.replace(Routes.VerifyCi, { persistParams: true });
    }
    return <Panel />;
  }

  return children as JSX.Element;
}
