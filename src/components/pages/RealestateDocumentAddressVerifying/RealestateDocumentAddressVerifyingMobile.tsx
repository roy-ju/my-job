import RealestateDocumentVerifying from '@/components/domains/realestate-helper/RealestateDocumentVerifying';

import MobAuthRequired from '@/components/atoms/MobAuthRequired';

import MobileContainer from '@/components/atoms/MobileContainer';

export default function RealestateDocumentAddressVerifyingMobile() {
  return (
    <MobAuthRequired>
      <MobileContainer>
        <RealestateDocumentVerifying />
      </MobileContainer>
    </MobAuthRequired>
  );
}
