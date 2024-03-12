import MyRegisteredListings from '@/components/domains/my/MyRegisteredListings';

import MobileContainer from '@/components/atoms/MobileContainer';

import MobAuthRequired from '@/components/atoms/MobAuthRequired';

export default function MyRegisteredListingsMobile() {
  return (
    <MobAuthRequired>
      <MobileContainer>
        <MyRegisteredListings />
      </MobileContainer>
    </MobAuthRequired>
  );
}
