import { memo } from 'react';

import { Button } from '@/components/atoms';

type ViewAllButtonsProps = {
  type: 'suggest' | 'listing';
  isRender: boolean;
  onClickViewAllButtons: () => void;
};

function ViewAllButtons({ type, isRender, onClickViewAllButtons }: ViewAllButtonsProps) {
  if (!isRender) return null;

  return type === 'suggest' ? (
    <Button variant="outlined" tw="h-9" onClick={onClickViewAllButtons}>
      구해요 전체보기
    </Button>
  ) : (
    <Button variant="outlined" tw="h-9" onClick={onClickViewAllButtons}>
      매물 전체보기
    </Button>
  );
}

export default memo(ViewAllButtons);
