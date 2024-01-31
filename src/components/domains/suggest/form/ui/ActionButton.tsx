import { memo } from 'react';

import dynamic from 'next/dynamic';

import ButtonV2 from '@/components/atoms/ButtonV2';

import PersistentBottomBarV2 from '@/components/atoms/PersistentBottomBarV2';
import GOOGLE_TAG_BUTTON_ID from '@/constants/gtag_id';

const ScrollUp = dynamic(() => import('./ScrollUp'));

type ActionButtonProps = {
  disabled: boolean;
  isRenderSummitButton: boolean;
  isRenderRevisionText: boolean;
  isRenderUpdateButton?: boolean;
  buttonId?: string;
  handleClick: () => void;
  handleClickBack?: () => void;
};

function ActionButton({
  disabled,
  isRenderSummitButton,
  isRenderRevisionText,
  isRenderUpdateButton = false,
  buttonId,
  handleClick,
  handleClickBack,
}: ActionButtonProps) {
  if (isRenderUpdateButton) {
    return (
      <div tw="w-full">
        <PersistentBottomBarV2>
          <ScrollUp isRender />
          <ButtonV2 tw="w-full" size="bigger" onClick={handleClick} disabled={disabled}>
            수정완료
          </ButtonV2>
        </PersistentBottomBarV2>
      </div>
    );
  }

  if (isRenderSummitButton) {
    return (
      <div tw="w-full">
        <PersistentBottomBarV2>
          <div tw="flex gap-3">
            {handleClickBack && (
              <ButtonV2
                variant="gray"
                tw="w-full text-gray-1000"
                size="bigger"
                onClick={handleClickBack}
                id={GOOGLE_TAG_BUTTON_ID.SUGGEST_FORM_SUMMARY_BACK}
              >
                뒤로가기
              </ButtonV2>
            )}
            <ButtonV2
              tw="w-full"
              size="bigger"
              onClick={handleClick}
              disabled={disabled}
              id={GOOGLE_TAG_BUTTON_ID.SUGGEST_FORM_SUMMARY_CREATE}
            >
              제출하기
            </ButtonV2>
          </div>
        </PersistentBottomBarV2>
      </div>
    );
  }

  return (
    <div tw="w-full">
      <PersistentBottomBarV2>
        <ScrollUp isRender={isRenderRevisionText} />
        <ButtonV2 tw="w-full" size="bigger" onClick={handleClick} disabled={disabled} id={buttonId ?? ''}>
          다음
        </ButtonV2>
      </PersistentBottomBarV2>
    </div>
  );
}

export default memo(ActionButton);
