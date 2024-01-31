import { ButtonV2 } from '@/components/atoms';

import PersistentBottomBarV2 from '@/components/atoms/PersistentBottomBarV2';

export default function Ctas({ handleClick }: { handleClick: () => void }) {
  return (
    <PersistentBottomBarV2>
      <ButtonV2 size="bigger" onClick={handleClick} tw="w-full">
        휴대폰 본인인증
      </ButtonV2>
    </PersistentBottomBarV2>
  );
}
