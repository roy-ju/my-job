import { useCallback } from 'react';

import { useRouter } from 'next/router';

import useAuth from '@/hooks/services/useAuth';

import useCheckPlatform from '@/hooks/useCheckPlatform';

import useSyncronizer from '@/states/hooks/useSyncronizer';

import { ButtonV2 } from '@/components/atoms';

import Routes from '@/router/routes';

import LogoIcon from '@/assets/icons/home_logo.svg';

import BellIcon from '@/assets/icons/bell.svg';

import useAuthPopup from '@/states/hooks/useAuhPopup';

import useReturnUrl from '@/states/hooks/useReturnUrl';

export default function Header() {
  const { user } = useAuth();

  const { platform } = useCheckPlatform();

  const { openAuthPopup } = useAuthPopup();

  const { handleUpdateReturnUrl } = useReturnUrl();

  const router = useRouter();

  const { unreadNotificationCount } = useSyncronizer();

  const handleClickLogin = useCallback(() => {
    openAuthPopup('onlyLogin');
    handleUpdateReturnUrl();
  }, [openAuthPopup, handleUpdateReturnUrl]);

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
        <button type="button" tw="relative" onClick={handleClickNotification}>
          <BellIcon />
          {unreadNotificationCount > 0 && (
            <span tw="absolute top-0 -right-0.5  animate-bounce text-[8px] text-white  font-bold leading-none px-1 h-3 bg-red rounded-full inline-flex items-center justify-center">
              {unreadNotificationCount}
            </span>
          )}
        </button>
      )}
    </header>
  );
}
