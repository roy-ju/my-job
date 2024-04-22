import tw from 'twin.macro';

import { ButtonV2 } from '@/components/atoms';

import useCheckPlatform from '@/hooks/useCheckPlatform';

import { CtaWrraper } from './widget/RegionSelectWidget';

interface SubmitProps {
  onSubmit?: () => void;
  disabled?: boolean;
}

export default function Cta({ disabled, onSubmit }: SubmitProps) {
  const { platform } = useCheckPlatform();

  return (
    <CtaWrraper
      css={[
        platform === 'pc' ? tw`pb-5 [border-bottom-left-radius: 20px] [border-bottom-right-radius: 20px]` : tw`pb-3`,
      ]}
    >
      <ButtonV2 disabled={disabled} onClick={onSubmit} tw="w-full" size="bigger">
        선택 완료
      </ButtonV2>
    </CtaWrraper>
  );
}
