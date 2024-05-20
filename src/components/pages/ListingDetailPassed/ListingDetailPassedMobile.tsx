import { MobAuthRequired } from '@/components/atoms';

import MobileContainer from '@/components/atoms/MobileContainer';

import ListingDetailPassed from '@/components/domains/listings/ListingDetailPassed';

export default function ListingDetailPassedMobile() {
  return (
    <MobAuthRequired>
      <MobileContainer>
        <ListingDetailPassed />
      </MobileContainer>
    </MobAuthRequired>
  );
}
