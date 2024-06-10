import { ButtonV2 } from '@/components/atoms';

import { CtaWrraper } from './widget/RegionSelectWidget';

interface CtaProps {
  handleClick?: () => void;
  disabled?: boolean;
}

export default function Cta({ disabled, handleClick }: CtaProps) {
  return (
    <CtaWrraper>
      <ButtonV2 disabled={disabled} onClick={handleClick} tw="w-full" size="bigger">
        선택 완료
      </ButtonV2>
    </CtaWrraper>
  );
}
