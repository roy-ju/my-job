import ListingCheckList from '@/components/domains/realestate-helper/ListingCheckList';

import MobAuthRequired from '@/components/atoms/MobAuthRequired';

import MobileContainer from '@/components/atoms/MobileContainer';

export default function ListingCheckListMobile() {
  return (
    <MobAuthRequired>
      <MobileContainer>
        <ListingCheckList />
      </MobileContainer>
    </MobAuthRequired>
  );
}
