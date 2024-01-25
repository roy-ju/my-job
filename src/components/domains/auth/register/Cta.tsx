import React from 'react';

import ButtonV2 from '@/components/atoms/ButtonV2';

import PersistentBottomBarV2 from '@/components/atoms/PersistentBottomBarV2';

type CtaProps = {
  isLoading: boolean;
  disabled: boolean;
  onClickNext: () => void;
};

export default function Cta({ isLoading, disabled, onClickNext }: CtaProps) {
  return (
    <PersistentBottomBarV2 tw="px-5">
      <ButtonV2 isLoading={isLoading} disabled={disabled} tw="w-full" size="bigger" onClick={onClickNext}>
        다음
      </ButtonV2>
    </PersistentBottomBarV2>
  );
}
