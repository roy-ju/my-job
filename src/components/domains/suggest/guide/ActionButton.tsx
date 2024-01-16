import ButtonV2 from '@/components/atoms/ButtonV2';

import PersistentBottomBarV2 from '@/components/atoms/PersistentBottomBarV2';

type ActionButtonProps = {
  handleClick: () => void;
};

export default function ActionButton({ handleClick }: ActionButtonProps) {
  return (
    <div tw="w-full">
      <PersistentBottomBarV2 tw="py-6">
        <ButtonV2 tw="w-full" size="bigger" onClick={handleClick}>
          집 구해요
        </ButtonV2>
      </PersistentBottomBarV2>
    </div>
  );
}
