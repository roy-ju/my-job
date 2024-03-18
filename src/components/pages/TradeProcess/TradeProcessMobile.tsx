import TradeProcess from '@/components/domains/realestate-helper/TradeProcess';

import MobAuthRequired from '@/components/atoms/MobAuthRequired';

import MobileContainer from '@/components/atoms/MobileContainer';

export default function TradeProcessMobile() {
  return (
    <MobAuthRequired>
      <MobileContainer>
        <TradeProcess />
      </MobileContainer>
    </MobAuthRequired>
  );
}
