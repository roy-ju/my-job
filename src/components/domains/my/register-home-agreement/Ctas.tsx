import ButtonV2 from '@/components/atoms/ButtonV2';

import PersistentBottomBarV2 from '@/components/atoms/PersistentBottomBarV2';

type CtasProps = { disabled: boolean; handleClick: () => void };

export default function Ctas({ disabled, handleClick }: CtasProps) {
  return (
    <PersistentBottomBarV2 tw="shadow-none">
      <ButtonV2 tw="w-full" disabled={disabled} onClick={handleClick}>
        소유자 정보 입력 완료
      </ButtonV2>
    </PersistentBottomBarV2>
  );
}
