import PersistentBottomBarV2 from '@/components/atoms/PersistentBottomBarV2';

import ButtonV2 from '@/components/atoms/ButtonV2';

type DocumentCreateProps = {
  handleClick: () => void;
};

export default function DocumentCreate({ handleClick }: DocumentCreateProps) {
  return (
    <PersistentBottomBarV2 tw="shadow-none">
      <ButtonV2 tw="w-full" size="bigger" onClick={handleClick}>
        조회하기
      </ButtonV2>
    </PersistentBottomBarV2>
  );
}
