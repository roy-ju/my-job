import { Dropdown, NavigationHeader } from '@/components/molecules';

import Container from '@/components/atoms/Container';

import Separator from '@/components/atoms/Separator';

import usePrivacyPolicy from './hooks/usePrivacyPolicy';

import { DropdownTitle, DropdownWrraper, FlexContents, HtmlWrraper, MarginLine, Date } from './widget/TermsWidget';

export default function PrivacyPolicy() {
  const { html, selectedTerms, handleChangeSelectedTerms, handleClickBack } = usePrivacyPolicy();

  return (
    <Container>
      <NavigationHeader>
        <NavigationHeader.BackButton onClick={handleClickBack} />
        <NavigationHeader.Title>개인정보 처리방침</NavigationHeader.Title>
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
            <Dropdown.Option value="2023.12.11">2023.12.11</Dropdown.Option>
            <Dropdown.Option value="2024.02.13">2024.02.13</Dropdown.Option>
          </Dropdown>
        </DropdownWrraper>
      </FlexContents>
    </Container>
  );
}
