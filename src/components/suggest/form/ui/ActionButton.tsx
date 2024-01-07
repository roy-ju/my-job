import { memo } from 'react';

import ButtonV2 from '@/components/atoms/ButtonV2';

import PersistentBottomBar from '@/components/atoms/PersistentBottomBar';

import ScrollUp from './ScrollUp';

type ActionButtonProps = {
  disabled: boolean;
  isRenderRevisionText: boolean;
  handleClick: () => void;
};

function ActionButton({ disabled, isRenderRevisionText, handleClick }: ActionButtonProps) {
  console.log('render ActionButton');

  return (
    <div tw="w-full">
      <PersistentBottomBar>
        <ScrollUp isRender={isRenderRevisionText} />
        <ButtonV2 tw="w-full" size="bigger" onClick={handleClick} disabled={disabled}>
          다음
        </ButtonV2>
        <div tw="[min-height: 18px]" />
      </PersistentBottomBar>
    </div>
  );
}

export default memo(ActionButton);
