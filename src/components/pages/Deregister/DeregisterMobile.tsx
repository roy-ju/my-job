import { MobAuthRequired, MobileContainer } from '@/components/atoms';

import MyDeregister from '@/components/domains/my/MyDeregister';

export default function DeregisterMobile() {
  return (
    <MobAuthRequired>
      <MobileContainer>
        <MyDeregister />
      </MobileContainer>
    </MobAuthRequired>
  );
}
