import { NavigationHeader, Table } from '@/components/molecules';

export default function BusinessInfo() {
  return (
    <div tw="h-full flex flex-col">
      <NavigationHeader>
        <NavigationHeader.Title>사업자정보</NavigationHeader.Title>
      </NavigationHeader>
      <div tw="flex-1 min-h-0 px-5 pt-2.5">
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
            <Table.Data>SAM LEE</Table.Data>
          </Table.Row>
          <Table.Row>
            <Table.Head>
              사업자
              <br />
              등록번호
            </Table.Head>
            <Table.Data>124354656867856</Table.Data>
          </Table.Row>
          <Table.Row>
            <Table.Head>
              통신판매업
              <br />
              신고번호
            </Table.Head>
            <Table.Data>124354656867856</Table.Data>
          </Table.Row>
          <Table.Row>
            <Table.Head>주소</Table.Head>
            <Table.Data>서울시 강남구 강남대로 94길 28, 612호</Table.Data>
          </Table.Row>
          <Table.Row>
            <Table.Head>이메일</Table.Head>
            <Table.Data>asdadf@negocio.co.kr</Table.Data>
          </Table.Row>
          <Table.Row>
            <Table.Head>전화</Table.Head>
            <Table.Data>02-6956-0155</Table.Data>
          </Table.Row>
        </Table>
      </div>
    </div>
  );
}
