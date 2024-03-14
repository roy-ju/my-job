import RealestateDocumentVerifyResult from '@/components/domains/realestate-helper/RealestateDocumentVerifyResult';

import MobAuthRequired from '@/components/atoms/MobAuthRequired';

import MobileContainer from '@/components/atoms/MobileContainer';

export default function RealestateDocumentVerifyResultMobile() {
  return (
    <MobAuthRequired>
      <MobileContainer>
        <RealestateDocumentVerifyResult />
      </MobileContainer>
    </MobAuthRequired>
  );
}
