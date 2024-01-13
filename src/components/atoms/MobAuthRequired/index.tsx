import useAuth from '@/hooks/services/useAuth';

import { isClient } from '@/utils/is';
import { ReactNode } from 'react';
import Routes from '@/router/routes';
import { useRouter } from 'next/router';
import MobileContainer from '../MobileContainer';
import Loading from '../Loading';

interface Props {
  ciRequired?: boolean;
  children?: ReactNode;
  onAccessDenied?: () => void;
}

export default function MobAuthRequired({ ciRequired = false, onAccessDenied, children }: Props) {
  const router = useRouter();
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <MobileContainer>
        <div tw="py-20">
          <Loading />
        </div>
      </MobileContainer>
    );
  }

  if (!user) {
    onAccessDenied?.();
    if (isClient && router.isReady) {
      router.replace({
        pathname: `/${Routes.EntryMobile}/${Routes.Login}`,
        query: {
          redirect: router.asPath,
        },
      });
    }
    return <MobileContainer />;
  }

  if (ciRequired && !user.isVerified) {
    onAccessDenied?.();
    if (isClient && router.isReady) {
      router.replace({
        pathname: `/${Routes.EntryMobile}/${Routes.VerifyCi}`,
        query: {
          redirect: router.asPath,
        },
      });
    }
    return <MobileContainer />;
  }

  return children as JSX.Element;
}
