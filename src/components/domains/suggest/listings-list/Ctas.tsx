import { ButtonV2 } from '@/components/atoms';

import PersistentBottomBarV2 from '@/components/atoms/PersistentBottomBarV2';

type CtasProps = {
  handleClickCta: () => void;
};

export default function Ctas({ handleClickCta }: CtasProps) {
  return (
    <PersistentBottomBarV2>
      <ButtonV2 size="bigger" tw="w-full" onClick={handleClickCta}>
        구해요 등록
      </ButtonV2>
    </PersistentBottomBarV2>
  );
}
