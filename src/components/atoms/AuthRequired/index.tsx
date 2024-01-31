import { ReactNode, useEffect } from 'react';

import { useRouter } from 'next/router';

import { useRouter as useCustomRouter } from '@/hooks/utils';

import useAuth from '@/hooks/services/useAuth';

import { isClient } from '@/utils/is';

import useAuthPopup from '@/states/hooks/useAuhPopup';

import useReturnUrl from '@/states/hooks/useReturnUrl';

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
  const router = useRouter();

  const customRouter = useCustomRouter(depth);

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
  }, [ciRequired, depth, router.isReady, user, isLoading, customRouter, openAuthPopup, handleUpdateReturnUrl]);

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

    if (router.query.depth1 && router.query.depth2) {
      if (depth === 1) {
        const depth2 = router.query.depth2;

        const query = router.query;

        delete query.depth1;
        delete query.depth2;

        router.replace({ pathname: `/${depth2}`, query });
      }

      if (depth === 2) {
        const depth1 = router.query.depth1;

        const query = router.query;

        delete query.depth1;
        delete query.depth2;

        router.replace({ pathname: `/${depth1}`, query });
      }
    }

    if (router.query.depth1 && !router.query.depth2) {
      router.replace({ pathname: `/` });
    }

    return (
      <Panel>
        <div tw="py-20">
          <Loading />
        </div>
      </Panel>
    );
  }

  if (ciRequired && !user.isVerified) {
    onAccessDenied?.();

    if (router.query.depth1 && router.query.depth2) {
      if (depth === 1) {
        const depth2 = router.query.depth2;
        const query = router.query;

        delete query.depth1;
        delete query.depth2;

        router.replace({ pathname: `/${depth2}/${Routes.VerifyCi}` });
      }

      if (depth === 2) {
        const depth1 = router.query.depth1;

        const query = router.query;

        delete query.depth1;
        delete query.depth2;

        router.replace({ pathname: `/${depth1}/${Routes.VerifyCi}` });
      }
    }

    if (router.query.depth1 && !router.query.depth2) {
      router.replace({ pathname: `/${Routes.VerifyCi}` });
    }

    return (
      <Panel>
        <div tw="py-20">
          <Loading />
        </div>
      </Panel>
    );
  }

  return children as JSX.Element;
}
