import { LawSearchForm } from '@/components/organisms';

export interface LegalCounselingSearchProps {
  onSubmit?: (value: string) => void;
  onClickBack?: () => void;
}

export default function LegalCounselingSearch({ onSubmit, onClickBack }: LegalCounselingSearchProps) {
  return (
    <div tw="h-full flex flex-col">
      {/* <div tw="flex-1 min-h-0"> */}
      <LawSearchForm onSubmit={onSubmit} onClickBack={onClickBack} />
      {/* </div> */}
    </div>
  );
}
