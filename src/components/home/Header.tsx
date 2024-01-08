import { useRouter } from '@/hooks/utils';

import { useRouter as useNextRouter } from 'next/router';

import { useAuth } from '@/hooks/services';

import useCheckPlatform from '@/hooks/utils/useCheckPlatform';

import useSyncronizer from '@/states/syncronizer';

import { Button } from '@/components/atoms';

import Routes from '@/router/routes';

import LogoIcon from '@/assets/icons/home_logo.svg';

import BellIcon from '@/assets/icons/bell.svg';

export default function Header() {
  const { user } = useAuth();

  const { platform } = useCheckPlatform();

  const router = useRouter(0);

  const nextRouter = useNextRouter();

  const { unreadNotificationCount } = useSyncronizer();

  const handleClickLogin = () => {
    if (platform === 'pc') {
      router.replace(Routes.Login);
    } else if (platform === 'mobile') {
      nextRouter.push(`/${Routes.EntryMobile}/${Routes.Login}`);
    }
  };

  const handleClickNotification = () => {
    if (platform === 'pc') {
      nextRouter.replace(`/${Routes.My}/${Routes.NotificationList}`);
    } else if (platform === 'mobile') {
      nextRouter.push(`/${Routes.EntryMobile}/${Routes.NotificationList}`);
    }
  };

  return (
    <header tw="h-14 px-4 flex items-center justify-between z-[1000] bg-white">
      <LogoIcon />
      {!user ? (
        <Button
          size="none"
          variant="ghost"
          tw="h-6 px-2.5 rounded-lg border border-nego-1000 text-nego-1000 text-info hover:bg-nego-100"
          onClick={handleClickLogin}
        >
          로그인
          <span tw="h-2 w-px bg-nego-1000 mx-1" />
          회원가입
        </Button>
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
