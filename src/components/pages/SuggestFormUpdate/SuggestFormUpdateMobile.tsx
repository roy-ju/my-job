import SuggestFormUpdate from '@/components/domains/suggest/SuggestFormUpdate';

import MobAuthRequired from '@/components/atoms/MobAuthRequired';

import MobileContainer from '@/components/atoms/MobileContainer';

export default function SuggestFormUpdateMobile() {
  return (
    <MobAuthRequired ciRequired>
      <MobileContainer>
        <SuggestFormUpdate />
      </MobileContainer>
    </MobAuthRequired>
  );
}
