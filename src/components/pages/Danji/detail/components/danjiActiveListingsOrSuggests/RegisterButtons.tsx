import React, { memo, useCallback } from 'react';

import { Button } from '@/components/atoms';

import NaverMapButton from './NaverMapButton';

type RegisterButtonsProps = {
  type: 'suggest' | 'listing';
  naverRealestateUrl: string;
  onClickRegister: () => void;
  handleOpenNaverRealestate: (url?: string | undefined) => void;
};

function RegisterButtons({
  type,
  naverRealestateUrl,
  onClickRegister,
  handleOpenNaverRealestate,
}: RegisterButtonsProps) {
  const renderConditionNaverButton = !!naverRealestateUrl;

  const onClickNaverRealestateButton = useCallback(() => {
    handleOpenNaverRealestate(naverRealestateUrl);
  }, [handleOpenNaverRealestate, naverRealestateUrl]);

  return (
    <div tw="w-full pt-5 px-5 flex flex-col gap-4">
      {type === 'suggest' ? (
        <Button tw="w-full" onClick={onClickRegister} size="bigger">
          구해요 등록
        </Button>
      ) : (
        <Button tw="w-full" onClick={onClickRegister} size="bigger">
          매물 등록
        </Button>
      )}

      <NaverMapButton
        renderConditionNaverButton={renderConditionNaverButton}
        openNaverRealestate={onClickNaverRealestateButton}
      />
    </div>
  );
}

export default memo(RegisterButtons);
