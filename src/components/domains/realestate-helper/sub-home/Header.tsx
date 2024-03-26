import { NavigationHeader } from '@/components/molecules';

import HeaderNotificationButton from '@/components/organisms/global/HeaderNotificationButton';

import useSyncronizer from '@/states/hooks/useSyncronizer';

import useHandleClickHeader from './hooks/useHandleClickHeader';

export default function Header() {
  const { loggedIn, renderBackButton, handleClickBack, handleGoNotificationList } = useHandleClickHeader();

  const { unreadNotificationCount } = useSyncronizer();

  return (
    <NavigationHeader>
      {renderBackButton && <NavigationHeader.BackButton onClick={handleClickBack} />}
      <NavigationHeader.Title>거래 도우미</NavigationHeader.Title>
      {loggedIn && (
        <HeaderNotificationButton
          unreadNotificationCount={unreadNotificationCount}
          handleClick={handleGoNotificationList}
        />
      )}
    </NavigationHeader>
  );
}
