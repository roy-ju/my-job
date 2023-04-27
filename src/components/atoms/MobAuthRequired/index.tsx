import { useAuth } from '@/hooks/services';

import { isClient } from '@/utils/is';
import { ReactNode } from 'react';
import Routes from '@/router/routes';
import { useRouter } from 'next/router';
import Panel from '../Panel';

interface Props {
  depth?: number;
  ciRequired?: boolean;
  children?: ReactNode;
  onAccessDenied?: () => void;
}

export default function MobAuthRequired({ ciRequired = false, onAccessDenied, children }: Props) {
  const router = useRouter();
  const { user } = useAuth();

  if (!user) {
    onAccessDenied?.();
    if (isClient && router.isReady) {
      router.replace(`/${Routes.EntryMobile}/${Routes.Login}`);
    }
    return <Panel />;
  }

  if (ciRequired && !user.isVerified) {
    onAccessDenied?.();
    if (isClient && router.isReady) {
      router.replace(`/${Routes.EntryMobile}/${Routes.VerifyCi}`);
    }
    return <Panel />;
  }

  return children as JSX.Element;
}
