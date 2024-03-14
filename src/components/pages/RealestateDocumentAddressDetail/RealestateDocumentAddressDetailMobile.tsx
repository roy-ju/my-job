import RealestateDocumentAddressDetail from '@/components/domains/realestate-helper/RealestateDocumentAddressDetail';

import MobAuthRequired from '@/components/atoms/MobAuthRequired';

import MobileContainer from '@/components/atoms/MobileContainer';

export default function RealestateDocumentAddressDetailMobile() {
  return (
    <MobAuthRequired>
      <MobileContainer>
        <RealestateDocumentAddressDetail />
      </MobileContainer>
    </MobAuthRequired>
  );
}
