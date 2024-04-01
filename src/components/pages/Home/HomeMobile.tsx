import Home from '@/components/domains/home';

import MobileContainer from '@/components/atoms/MobileContainer';

import BottomGlobalNavigation from '@/components/organisms/global/BottomGlobalNavigation';

import useSyncronizer from '@/states/hooks/useSyncronizer';

export default function HomeMobile() {
  const { unreadChatCount } = useSyncronizer();

  return (
    <MobileContainer bottomNav={<BottomGlobalNavigation index={0} unreadChatCount={unreadChatCount} />}>
      <Home />
    </MobileContainer>
  );
}
