import { NavigationHeader, Table } from '@/components/molecules';
import styled from '@emotion/styled';
import tw from 'twin.macro';

const StyledTable = styled.table`
  & > table > tr:not(:first-of-type) {
    ${tw`border-t border-gray-300`}
  }
`;

export default function BusinessInfo({ onClickGoBack }: { onClickGoBack?: () => void }) {
  return (
    <div tw="h-full flex flex-col">
      <NavigationHeader>
        <NavigationHeader.BackButton onClick={onClickGoBack} />
        <NavigationHeader.Title>사업자정보</NavigationHeader.Title>
      </NavigationHeader>
      <div tw="flex-1 min-h-0 px-5 pt-2.5">
        <StyledTable>
          <Table>
            <Table.Row>
              <Table.Head>회사명</Table.Head>
              <Table.Data>주식회사 네고시오</Table.Data>
            </Table.Row>
            <Table.Row>
              <Table.Head>대표</Table.Head>
              <Table.Data>우성남</Table.Data>
            </Table.Row>
            <Table.Row>
              <Table.Head>
                개인정보
                <br />
                관리 책임자
              </Table.Head>
              <Table.Data>Lee Sam</Table.Data>
            </Table.Row>
            <Table.Row>
              <Table.Head>
                사업자
                <br />
                등록번호
              </Table.Head>
              <Table.Data>130-88-02097</Table.Data>
            </Table.Row>
            <Table.Row>
              <Table.Head>
                통신판매업
                <br />
                신고번호
              </Table.Head>
              <Table.Data>2021-서울강남-04487 호</Table.Data>
            </Table.Row>
            <Table.Row>
              <Table.Head>주소</Table.Head>
              <Table.Data>서울 강남구 선릉로94번길 11, 4층 (삼성동, 삼성2빌딩)</Table.Data>
            </Table.Row>
            <Table.Row>
              <Table.Head>이메일</Table.Head>
              <Table.Data>info@negocio.co.kr</Table.Data>
            </Table.Row>
            <Table.Row>
              <Table.Head>전화</Table.Head>
              <Table.Data>02-6956-0155</Table.Data>
            </Table.Row>
          </Table>
        </StyledTable>
      </div>
    </div>
  );
}
