import { ReactNode, useEffect } from 'react';

import { useRouter } from 'next/router';

import useAuth from '@/hooks/services/useAuth';

import { isClient } from '@/utils/is';

import useAuthPopup from '@/states/hooks/useAuhPopup';

import useReturnUrl from '@/states/hooks/useReturnUrl';

import Routes from '@/router/routes';
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

  const { openAuthPopup } = useAuthPopup();

  const { handleUpdateReturnUrl } = useReturnUrl();

  useEffect(() => {
    if (isClient && router.isReady) {
      if (!isLoading && !user) {
        if (ciRequired) {
          openAuthPopup('needVerify');
        } else {
          openAuthPopup('login');
        }

        handleUpdateReturnUrl();

        return;
      }

      if (!isLoading && user && ciRequired && !user.isVerified) {
        handleUpdateReturnUrl();
      }
    }
  }, [ciRequired, router.isReady, user, isLoading, openAuthPopup, handleUpdateReturnUrl]);

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
      router.replace({ pathname: `/` });
    }

    return (
      <MobileContainer>
        <div tw="py-20">
          <Loading />
        </div>
      </MobileContainer>
    );
  }

  if (ciRequired && !user.isVerified) {
    onAccessDenied?.();

    if (isClient && router.isReady) {
      router.replace({ pathname: `/${Routes.EntryMobile}/${Routes.VerifyCi}` });
    }

    return (
      <MobileContainer>
        <div tw="py-20">
          <Loading />
        </div>
      </MobileContainer>
    );
  }

  return children as JSX.Element;
}
