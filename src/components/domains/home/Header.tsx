import { useCallback } from 'react';

import { useRouter } from 'next/router';

import useAuth from '@/hooks/services/useAuth';

import useCheckPlatform from '@/hooks/useCheckPlatform';

import useSyncronizer from '@/states/hooks/useSyncronizer';

import { ButtonV2 } from '@/components/atoms';

import Routes from '@/router/routes';

import LogoIcon from '@/assets/icons/home_logo.svg';

import useAuthPopup from '@/states/hooks/useAuhPopup';

import useReturnUrl from '@/states/hooks/useReturnUrl';

import useInAppBroswerHandler from '@/hooks/useInAppBroswerHandler';

import HeaderNotificationButton from '@/components/organisms/global/HeaderNotificationButton';

export default function Header() {
  const { user } = useAuth();

  const { platform } = useCheckPlatform();

  const { openAuthPopup } = useAuthPopup();

  const { handleUpdateReturnUrl } = useReturnUrl();

  const router = useRouter();

  const { unreadNotificationCount } = useSyncronizer();

  const { inAppInfo, handleOpenAppInstallPopup } = useInAppBroswerHandler();

  const handleClickLogin = useCallback(() => {
    if (inAppInfo.isInAppBrowser) {
      handleOpenAppInstallPopup();
      return;
    }

    openAuthPopup('login');
    handleUpdateReturnUrl();
  }, [inAppInfo.isInAppBrowser, openAuthPopup, handleUpdateReturnUrl, handleOpenAppInstallPopup]);

  const handleClickNotification = useCallback(() => {
    if (platform === 'pc') {
      router.push(`/${Routes.My}/${Routes.NotificationList}`);
    } else if (platform === 'mobile') {
      router.push(`/${Routes.EntryMobile}/${Routes.NotificationList}`);
    }
  }, [router, platform]);

  return (
    <header tw="h-14 px-4 flex items-center justify-between z-[1000] bg-white">
      <LogoIcon />
      {!user ? (
        <ButtonV2
          size="small"
          variant="primaryOutline"
          radius="r100"
          tw="h-6 px-2 py-0.5 text-body_01"
          onClick={handleClickLogin}
        >
          로그인 | 회원가입
        </ButtonV2>
      ) : (
        <HeaderNotificationButton
          unreadNotificationCount={unreadNotificationCount}
          handleClick={handleClickNotification}
        />
      )}
    </header>
  );
}
