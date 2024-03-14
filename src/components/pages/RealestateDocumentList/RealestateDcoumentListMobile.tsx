import RealestateDocumentList from '@/components/domains/realestate-helper/RealestateDocumentList';

import MobAuthRequired from '@/components/atoms/MobAuthRequired';

import MobileContainer from '@/components/atoms/MobileContainer';

export default function RealestateDcoumentListMobile() {
  return (
    <MobAuthRequired>
      <MobileContainer>
        <RealestateDocumentList />
      </MobileContainer>
    </MobAuthRequired>
  );
}
