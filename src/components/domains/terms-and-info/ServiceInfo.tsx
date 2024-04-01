import Container from '@/components/atoms/Container';

import { NavigationHeader } from '@/components/molecules';

import List from './service-info/List';

import useServiceInfo from './hooks/useServiceInfo';

export default function ServiceInfo() {
  const {
    platform,
    isNativeApp,
    handleClickBack,
    handleClickBusinessInfo,
    handleClickOpenSourceLicense,
    handleClickTermsAndPolicy,
    handleClickVersionInfo,
  } = useServiceInfo();

  return (
    <Container>
      <NavigationHeader>
        <NavigationHeader.BackButton onClick={handleClickBack} />
        <NavigationHeader.Title>서비스 정보</NavigationHeader.Title>
      </NavigationHeader>

      <List>
        <List.Item title="약관 및 정책" onClick={handleClickTermsAndPolicy} />
        {isNativeApp && <List.Item title="오픈소스 라이선스" onClick={handleClickOpenSourceLicense} />}
        {platform === 'mobile' && <List.Item title="버전정보" onClick={handleClickVersionInfo} />}
        <List.Item title="사업자정보" onClick={handleClickBusinessInfo} />
      </List>
    </Container>
  );
}
