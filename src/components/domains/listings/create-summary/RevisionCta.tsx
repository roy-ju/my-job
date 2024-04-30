import { ButtonV2 } from '@/components/atoms';
import { RevisionCtaWrraper } from './widget/CreateSummaryWidget';

type RevisionCtaProps = {
  handleUpdate: () => void;
};

export default function RevisionCta({ handleUpdate }: RevisionCtaProps) {
  return (
    <RevisionCtaWrraper>
      <ButtonV2 variant="ghost" size="none" tw="underline text-info leading-4" onClick={handleUpdate}>
        입력정보 수정
      </ButtonV2>
    </RevisionCtaWrraper>
  );
}
