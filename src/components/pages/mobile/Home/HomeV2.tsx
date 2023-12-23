import { MobileContainer } from '@/components/atoms';

import { MobGlobalNavigation } from '@/components/organisms';

import HomeV2Template from '@/components/templates/Home/v2';

import useSyncronizer from '@/states/syncronizer';

export default function HomeV2() {
  const { unreadChatCount } = useSyncronizer();

  return (
    <MobileContainer bottomNav={<MobGlobalNavigation index={0} unreadChatCount={unreadChatCount} />}>
      <HomeV2Template />
    </MobileContainer>
  );
}
