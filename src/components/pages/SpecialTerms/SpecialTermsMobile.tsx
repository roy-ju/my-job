import SpecialTerms from '@/components/domains/realestate-helper/SpecialTerms';

import MobAuthRequired from '@/components/atoms/MobAuthRequired';

import MobileContainer from '@/components/atoms/MobileContainer';

export default function SpecialTermsMobile() {
  return (
    <MobAuthRequired>
      <MobileContainer>
        <SpecialTerms />
      </MobileContainer>
    </MobAuthRequired>
  );
}
