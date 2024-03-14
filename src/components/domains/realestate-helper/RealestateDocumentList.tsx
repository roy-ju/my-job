import Container from '@/components/atoms/Container';

import { NavigationHeader } from '@/components/molecules';

import List from './realestate-document-list/List';

// import Nodata from './realestate-document-list/Nodata';

import { FlexContents, MarginTopEight } from './realestate-document-list/widget/RealestateDocumentListWidget';

export default function RealestateDocumentList() {
  return (
    <Container id="negocio-realestate-document-list">
      <NavigationHeader>
        <NavigationHeader.BackButton />
        <NavigationHeader.Title>조회한 등기부 목록</NavigationHeader.Title>
      </NavigationHeader>
      <MarginTopEight />
      <FlexContents>
        {/* <Nodata /> */}
        <List />
      </FlexContents>
    </Container>
  );
}
