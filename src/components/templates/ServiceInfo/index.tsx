import { NavigationHeader } from '@/components/molecules';
import { ServiceInfoList } from '@/components/organisms';

export interface ServiceInfoProps {
  onClickBusinessInfo?: () => void;
  onClickTermsAndPolicy?: () => void;
  onClickOpenSourceLicense?: () => void;
  onClickVersionInfo?: () => void;
  onClickBack?: () => void;
}

export default function ServiceInfo({
  onClickBusinessInfo,
  onClickTermsAndPolicy,
  onClickOpenSourceLicense,
  onClickVersionInfo,
  onClickBack,
}: ServiceInfoProps) {
  return (
    <div tw="flex flex-col h-full">
      <NavigationHeader>
        {onClickBack && <NavigationHeader.BackButton onClick={onClickBack} />}
        <NavigationHeader.Title>서비스 정보</NavigationHeader.Title>
      </NavigationHeader>
      <ServiceInfoList>
        <ServiceInfoList.Item title="약관 및 정책" onClick={onClickTermsAndPolicy} />
        {onClickOpenSourceLicense && (
          <ServiceInfoList.Item title="오픈소스 라이선스" onClick={onClickOpenSourceLicense} />
        )}
        {onClickVersionInfo && <ServiceInfoList.Item title="버전정보" onClick={onClickVersionInfo} />}
        <ServiceInfoList.Item title="사업자정보" onClick={onClickBusinessInfo} />
      </ServiceInfoList>
    </div>
  );
}
