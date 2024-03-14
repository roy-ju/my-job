import RealestateDocumentDetail from '@/components/domains/realestate-helper/RealestateDocumentDetail';

import MobAuthRequired from '@/components/atoms/MobAuthRequired';

import MobileContainer from '@/components/atoms/MobileContainer';

export default function RealestateDocumentDetailMobile() {
  return (
    <MobAuthRequired>
      <MobileContainer>
        <RealestateDocumentDetail />
      </MobileContainer>
    </MobAuthRequired>
  );
}
