import { NavigationHeader } from '@/components/molecules';
import { ServiceInfoList } from '@/components/organisms';

export interface TermsAndPolicyProps {
  onClickGoBack?: () => void;
  onClickServiceTerms?: () => void;
  onClickPrivacyTerms?: () => void;
  onClickLocationTerms?: () => void;
}

export default function TermsAndPolicy({
  onClickGoBack,
  onClickServiceTerms,
  onClickPrivacyTerms,
  onClickLocationTerms,
}: TermsAndPolicyProps) {
  return (
    <div tw="flex flex-col h-full">
      <NavigationHeader>
        <NavigationHeader.BackButton onClick={onClickGoBack} />
        <NavigationHeader.Title>약관 및 정책</NavigationHeader.Title>
      </NavigationHeader>
      <ServiceInfoList>
        <ServiceInfoList.Item onClick={onClickServiceTerms} title="서비스 이용약관" />
        <ServiceInfoList.Item onClick={onClickPrivacyTerms} title="개인정보 처리방침" />
        <ServiceInfoList.Item onClick={onClickLocationTerms} title="위치기반 서비스 이용약관" />
      </ServiceInfoList>
    </div>
  );
}
