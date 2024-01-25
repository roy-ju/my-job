import { memo, useMemo } from 'react';

import dynamic from 'next/dynamic';

import ButtonV2 from '@/components/atoms/ButtonV2';

import PersistentBottomBarV2 from '@/components/atoms/PersistentBottomBarV2';
import useAuth from '@/hooks/services/useAuth';

const ScrollUp = dynamic(() => import('./ScrollUp'));

type ActionButtonProps = {
  disabled: boolean;
  isRenderSummitButton: boolean;
  isRenderRevisionText: boolean;
  isRenderUpdateButton?: boolean;
  handleClick: () => void;
  handleClickBack?: () => void;
};

function ActionButton({
  disabled,
  isRenderSummitButton,
  isRenderRevisionText,
  isRenderUpdateButton = false,
  handleClick,
  handleClickBack,
}: ActionButtonProps) {
  const { user } = useAuth();

  const submmitTitle = useMemo(() => {
    if (!user) return '로그인하고 제출하기';

    if (user?.isVerified) return '제출하기';

    if (user && !user?.isVerified) return '본인인증 후 제출하기';
  }, [user]);

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
              <ButtonV2 variant="gray" tw="w-full text-gray-1000" size="bigger" onClick={handleClickBack}>
                뒤로가기
              </ButtonV2>
            )}
            <ButtonV2 tw="w-full" size="bigger" onClick={handleClick} disabled={disabled}>
              {submmitTitle}
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
        <ButtonV2 tw="w-full" size="bigger" onClick={handleClick} disabled={disabled}>
          다음
        </ButtonV2>
      </PersistentBottomBarV2>
    </div>
  );
}

export default memo(ActionButton);
