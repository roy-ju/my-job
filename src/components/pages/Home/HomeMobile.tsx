import Home from '@/components/domains/home';

import MobileContainer from '@/components/atoms/MobileContainer';

import MobGlobalNavigation from '@/components/organisms/MobGlobalNavigation';

import useSyncronizer from '@/states/syncronizer';

export default function HomeMobile() {
  const { unreadChatCount } = useSyncronizer();

  return (
    <MobileContainer bottomNav={<MobGlobalNavigation index={0} unreadChatCount={unreadChatCount} />}>
      <Home />
    </MobileContainer>
  );
}
