import React from 'react';

import ButtonV2 from '@/components/atoms/ButtonV2';

import PersistentBottomBarV2 from '@/components/atoms/PersistentBottomBarV2';

import GOOGLE_TAG_BUTTON_ID from '@/constants/gtag_id';

type CtaProps = {
  isLoading: boolean;
  disabled: boolean;
  onClickNext: () => void;
};

export default function Cta({ isLoading, disabled, onClickNext }: CtaProps) {
  return (
    <PersistentBottomBarV2 tw="px-5">
      <ButtonV2
        isLoading={isLoading}
        disabled={disabled}
        tw="w-full"
        size="bigger"
        onClick={onClickNext}
        id={GOOGLE_TAG_BUTTON_ID.REGISTER_CTA}
      >
        가입하기
      </ButtonV2>
    </PersistentBottomBarV2>
  );
}
