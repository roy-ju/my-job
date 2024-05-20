import MobAuthRequired from '@/components/atoms/MobAuthRequired';

import MobileContainer from '@/components/atoms/MobileContainer';

import ListingQnaCreate from '@/components/domains/listings/ListingQnaCreate';

export default function ListingQnaCreateMobile() {
  return (
    <MobAuthRequired ciRequired>
      <MobileContainer>
        <ListingQnaCreate />
      </MobileContainer>
    </MobAuthRequired>
  );
}
