import MySuggsetDetail from '@/components/domains/my/MySuggsetDetail';

import MobAuthRequired from '@/components/atoms/MobAuthRequired';

import MobileContainer from '@/components/atoms/MobileContainer';

export default function MySuggestDetailMobile() {
  return (
    <MobAuthRequired>
      <MobileContainer>
        <MySuggsetDetail />
      </MobileContainer>
    </MobAuthRequired>
  );
}
