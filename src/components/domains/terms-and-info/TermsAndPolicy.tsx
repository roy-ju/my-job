import Container from '@/components/atoms/Container';

import { NavigationHeader } from '@/components/molecules';

import useTermsAndPolicy from './hooks/useTermsAndPolicy';

import List from './service-info/List';

export default function TermsAndPolicy() {
  const { handleClickBack, handleClickServiceTerms, handleClickPrivacyPolicy, handleClickLocationTerms } =
    useTermsAndPolicy();

  return (
    <Container>
      <NavigationHeader>
        <NavigationHeader.BackButton onClick={handleClickBack} />
        <NavigationHeader.Title>약관 및 정책</NavigationHeader.Title>
      </NavigationHeader>
      <List>
        <List.Item onClick={handleClickServiceTerms} title="서비스 이용약관" />
        <List.Item onClick={handleClickPrivacyPolicy} title="개인정보 처리방침" />
        <List.Item onClick={handleClickLocationTerms} title="위치기반 서비스 이용약관" />
      </List>
    </Container>
  );
}
