import MyFavoriteList from '@/components/domains/my/MyFavoriteList';

import MobileContainer from '@/components/atoms/MobileContainer';

import BottomGlobalNavigation from '@/components/organisms/global/BottomGlobalNavigation';

import useSyncronizer from '@/states/hooks/useSyncronizer';

export default function MyFavoriteListMobile() {
  const { unreadChatCount } = useSyncronizer();

  return (
    <MobileContainer bottomNav={<BottomGlobalNavigation index={1} unreadChatCount={unreadChatCount} />}>
      <MyFavoriteList />
    </MobileContainer>
  );
}
