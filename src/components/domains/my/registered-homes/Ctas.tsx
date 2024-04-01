import ButtonV2 from '@/components/atoms/ButtonV2';

import PersistentBottomBarV2 from '@/components/atoms/PersistentBottomBarV2';

import PlusIcon from '@/assets/icons/plus_gray_16.svg';

type CtasProps = { handleClick: () => void };

export default function Ctas({ handleClick }: CtasProps) {
  return (
    <PersistentBottomBarV2 tw="shadow-none">
      <ButtonV2 tw="w-full gap-0.5" onClick={handleClick}>
        <PlusIcon />
        우리집 추가
      </ButtonV2>
      <p tw="text-b2 text-gray-700 text-center mt-3">공동소유의 집이나 대리인 인증도 가능해요.</p>
    </PersistentBottomBarV2>
  );
}
