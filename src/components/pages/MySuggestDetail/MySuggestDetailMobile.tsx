import MySuggestDetail from '@/components/domains/my/MySuggestDetail';

import MobAuthRequired from '@/components/atoms/MobAuthRequired';

import MobileContainer from '@/components/atoms/MobileContainer';

export default function MySuggestDetailMobile() {
  return (
    <MobAuthRequired>
      <MobileContainer>
        <MySuggestDetail />
      </MobileContainer>
    </MobAuthRequired>
  );
}
