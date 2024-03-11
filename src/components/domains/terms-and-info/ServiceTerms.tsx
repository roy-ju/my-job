import Container from '@/components/atoms/Container';

import Separator from '@/components/atoms/Separator';

import { Dropdown, NavigationHeader } from '@/components/molecules';

import { FlexContents, Date, HtmlWrraper, DropdownTitle, DropdownWrraper, MarginLine } from './widget/TermsWidget';

import useServiceTerms from './hooks/useServiceTerms';

export default function ServiceTerms() {
  const { selectedTerms, html, handleChangeSelectedTerms, handleClickBack } = useServiceTerms();

  return (
    <Container>
      <NavigationHeader>
        <NavigationHeader.BackButton onClick={handleClickBack} />
        <NavigationHeader.Title>서비스 이용약관</NavigationHeader.Title>
      </NavigationHeader>

      <FlexContents>
        <Date>시행일자: {selectedTerms}</Date>
        <HtmlWrraper dangerouslySetInnerHTML={{ __html: html }} />
        <Separator />
        <MarginLine />
        <DropdownWrraper>
          <DropdownTitle>이전 약관 보기</DropdownTitle>
          <Dropdown value={selectedTerms} variant="outlined" onChange={handleChangeSelectedTerms}>
            <Dropdown.Option value="2022.10.17">2022.10.17</Dropdown.Option>
            <Dropdown.Option value="2022.11.03">2022.11.03</Dropdown.Option>
            <Dropdown.Option value="2022.12.08">2022.12.08</Dropdown.Option>
            <Dropdown.Option value="2023.03.22">2023.03.22</Dropdown.Option>
          </Dropdown>
        </DropdownWrraper>
      </FlexContents>
    </Container>
  );
}
