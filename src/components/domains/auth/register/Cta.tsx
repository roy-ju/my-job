import ButtonV2 from '@/components/atoms/ButtonV2';

import PersistentBottomBarV2 from '@/components/atoms/PersistentBottomBarV2';

import GOOGLE_TAG_BUTTON_ID from '@/constants/gtag_id';

type CtaProps = {
  isRenderCta: boolean;
  title: string;
  isLoading: boolean;
  disabled: boolean;
  handleClick: () => void;
};

export default function Cta({ isRenderCta, title, isLoading, disabled, handleClick }: CtaProps) {
  if (!isRenderCta) return null;

  return (
    <PersistentBottomBarV2 tw="px-5 shadow-none">
      <ButtonV2
        isLoading={isLoading}
        disabled={disabled}
        tw="w-full"
        size="bigger"
        onClick={handleClick}
        id={GOOGLE_TAG_BUTTON_ID.REGISTER_CTA}
      >
        {title}
      </ButtonV2>
    </PersistentBottomBarV2>
  );
}
