import RegisterHomeAgreement from '@/components/domains/my/RegisterHomeAgreement';

import MobAuthRequired from '@/components/atoms/MobAuthRequired';

import MobileContainer from '@/components/atoms/MobileContainer';

export default function MyAddressAgreementMobile() {
  return (
    <MobAuthRequired ciRequired>
      <MobileContainer>
        <RegisterHomeAgreement />
      </MobileContainer>
    </MobAuthRequired>
  );
}
