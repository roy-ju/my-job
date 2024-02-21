import { MobAuthRequired, MobileContainer } from '@/components/atoms';

import MyDetail from '@/components/domains/my/MyDetail';

export default function MyDetailMobile() {
  return (
    <MobAuthRequired>
      <MobileContainer>
        <MyDetail />
      </MobileContainer>
    </MobAuthRequired>
  );
}
