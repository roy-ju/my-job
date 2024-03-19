import RegisterHomeAddressDetail from '@/components/domains/my/RegisterHomeAddressDetail';

import MobAuthRequired from '@/components/atoms/MobAuthRequired';

import MobileContainer from '@/components/atoms/MobileContainer';

export default function MyAddressDetailMobile() {
  return (
    <MobAuthRequired>
      <MobileContainer>
        <RegisterHomeAddressDetail />
      </MobileContainer>
    </MobAuthRequired>
  );
}
