import Button from '@/components/atoms/Button';

import PersistentBottomBar from '@/components/atoms/PersistentBottomBar';

type CtasProps = {
  isUpdating: boolean;
  handleClickCancel: () => void;
  handleClickNext: () => void;
};

export default function Ctas({ isUpdating, handleClickCancel, handleClickNext }: CtasProps) {
  return (
    <PersistentBottomBar>
      <div tw="flex gap-3">
        <Button variant="gray" size="bigger" tw="flex-1" onClick={handleClickCancel}>
          취소
        </Button>
        <Button isLoading={isUpdating} size="bigger" tw="flex-1" onClick={handleClickNext}>
          확인
        </Button>
      </div>
    </PersistentBottomBar>
  );
}
