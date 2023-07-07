import { LawSearchForm } from '@/components/organisms';
import { NavigationHeader } from '@/components/molecules';

export interface LegalCounselingDetailProps {
  onClickBack?: () => void;
}

export default function LegalCounselingDetail({ onClickBack }: LegalCounselingDetailProps) {
  return (
    <div tw="h-full flex flex-col">
      <NavigationHeader>
        {onClickBack && <NavigationHeader.BackButton onClick={onClickBack} />}
        <NavigationHeader.Title>부동산 법률 상담</NavigationHeader.Title>
      </NavigationHeader>
      <div tw="flex-1 min-h-0" />
    </div>
  );
}
