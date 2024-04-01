import SubHome from '@/components/domains/realestate-helper/SubHome';

import MobileContainer from '@/components/atoms/MobileContainer';

import useSyncronizer from '@/states/hooks/useSyncronizer';

import BottomGlobalNavigation from '@/components/organisms/global/BottomGlobalNavigation';

export default function SubHomeMobile() {
  const { unreadChatCount } = useSyncronizer();

  return (
    <MobileContainer bottomNav={<BottomGlobalNavigation index={1} unreadChatCount={unreadChatCount} />}>
      <SubHome />
    </MobileContainer>
  );
}
