import RegisterHomeSearchAddress from '@/components/domains/my/RegisterHomeSearchAddress';

import MobAuthRequired from '@/components/atoms/MobAuthRequired';

import MobileContainer from '@/components/atoms/MobileContainer';

export default function MyAddressMobile() {
  return (
    <MobAuthRequired ciRequired>
      <MobileContainer>
        <RegisterHomeSearchAddress />
      </MobileContainer>
    </MobAuthRequired>
  );
}
