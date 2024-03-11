import { MobAuthRequired, MobileContainer } from '@/components/atoms';

import MyInterestedRealpriceList from '@/components/domains/my/MyInterestedRealpriceList';

export default function MyRealpriceListMobile() {
  return (
    <MobAuthRequired>
      <MobileContainer>
        <MyInterestedRealpriceList />
      </MobileContainer>
    </MobAuthRequired>
  );
}
