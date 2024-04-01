import MyRegisteredHomes from '@/components/domains/my/MyRegisteredHomes';

import MobileContainer from '@/components/atoms/MobileContainer';

import MobAuthRequired from '@/components/atoms/MobAuthRequired';

export default function MyRegisteredListingsMobile() {
  return (
    <MobAuthRequired ciRequired>
      <MobileContainer>
        <MyRegisteredHomes />
      </MobileContainer>
    </MobAuthRequired>
  );
}
