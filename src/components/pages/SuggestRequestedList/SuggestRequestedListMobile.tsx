import { MobAuthRequired } from '@/components/atoms';
import MobileContainer from '@/components/atoms/MobileContainer';

import MySuggestRequestedList from '@/components/domains/my/MySuggestRequestedList';

export default function SuggestRequestedListMobile() {
  return (
    <MobAuthRequired>
      <MobileContainer>
        <MySuggestRequestedList />
      </MobileContainer>
    </MobAuthRequired>
  );
}
