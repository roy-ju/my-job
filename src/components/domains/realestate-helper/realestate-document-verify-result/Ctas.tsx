import PersistentBottomBarV2 from '@/components/atoms/PersistentBottomBarV2';

import ButtonV2 from '@/components/atoms/ButtonV2';

type CtasProps = { type: 'findAddressOverTen' | 'notFoundAddress' | 'serviceError' | ''; handleClick: () => void };

export default function Ctas({ type, handleClick }: CtasProps) {
  return (
    <PersistentBottomBarV2 tw="shadow-none">
      <ButtonV2 tw="w-full" onClick={handleClick} size="bigger">
        {type === 'findAddressOverTen' && '주소지 선택'}
        {type === 'notFoundAddress' && '주소 다시 입력하기'}
        {type === 'serviceError' && '확인'}
      </ButtonV2>
    </PersistentBottomBarV2>
  );
}
