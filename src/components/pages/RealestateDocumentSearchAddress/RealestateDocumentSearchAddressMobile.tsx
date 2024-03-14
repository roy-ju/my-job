import RealestateDocumentSearchAddress from '@/components/domains/realestate-helper/RealestateDocumentSearchAddress';

import MobAuthRequired from '@/components/atoms/MobAuthRequired';

import MobileContainer from '@/components/atoms/MobileContainer';

export default function RealestateDocumentSearchAddressMobile() {
  return (
    <MobAuthRequired>
      <MobileContainer>
        <RealestateDocumentSearchAddress />
      </MobileContainer>
    </MobAuthRequired>
  );
}
