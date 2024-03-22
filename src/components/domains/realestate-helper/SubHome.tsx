import Container from '@/components/atoms/Container';

import FlexContents from '@/components/atoms/FlexContents';

import { NavigationHeader } from '@/components/molecules';

import Preview from './sub-home/Preview';

export default function SubHome() {
  return (
    <Container>
      <NavigationHeader>
        <NavigationHeader.BackButton />
        <NavigationHeader.Title>부동산 거래 도우미</NavigationHeader.Title>
      </NavigationHeader>
      <FlexContents>
        <Preview />
      </FlexContents>
    </Container>
  );
}
