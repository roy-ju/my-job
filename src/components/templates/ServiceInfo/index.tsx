import { NavigationHeader } from '@/components/molecules';
import { ServiceInfoList } from '@/components/organisms';

export interface ServiceInfoProps {
  onClickBusinessInfo?: () => void;
}

export default function ServiceInfo({ onClickBusinessInfo }: ServiceInfoProps) {
  return (
    <div tw="flex flex-col h-full">
      <NavigationHeader>
        <NavigationHeader.Title>서비스 정보</NavigationHeader.Title>
      </NavigationHeader>
      <ServiceInfoList>
        <ServiceInfoList.Item title="약관 및 정책" />
        <ServiceInfoList.Item title="오픈소스 라이선스" />
        <ServiceInfoList.Item title="버전정보" />
        <ServiceInfoList.Item title="사업자정보" onClick={onClickBusinessInfo} />
      </ServiceInfoList>
    </div>
  );
}
