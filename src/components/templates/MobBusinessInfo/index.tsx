import { MobGlobalHeader } from '@/components/organisms';
import { useEffect, useState } from 'react';
import tw, { styled } from 'twin.macro';

const Table = styled.table`
  ${tw`w-full text-b2`}
  tr:not(:last-of-type) {
    ${tw`border-b border-b-gray-100`}
  }
  th {
    ${tw`py-2 mr-3 font-normal text-start`}
  }
  td {
    ${tw`py-2 pl-3 align-top`}
  }
`;

export default function MobBusinessInfo() {
  const [render, setRender] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setRender(true), 100);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div tw="h-full flex flex-col">
      <MobGlobalHeader title="사업자정보" />
      <div tw="w-full max-w-mobile fixed flex-1 min-h-0 px-5 top-[3.5rem]">
        {render && (
          <Table>
            <tr>
              <th>회사명</th>
              <td>주식회사 네고시오</td>
            </tr>
            <tr>
              <th>대표</th>
              <td>우성남</td>
            </tr>
            <tr>
              <th>
                개인정보
                <br />
                관리 책임자
              </th>
              <td>SAM LEE</td>
            </tr>
            <tr>
              <th>
                사업자
                <br />
                등록번호
              </th>
              <td>124354656867856</td>
            </tr>
            <tr>
              <th>
                통신판매업
                <br />
                신고번호
              </th>
              <td>124354656867856</td>
            </tr>
            <tr>
              <th>주소</th>
              <td>서울시 강남구 강남대로 94길 28, 612호</td>
            </tr>
            <tr>
              <th>이메일</th>
              <td>asdadf@negocio.co.kr</td>
            </tr>
            <tr>
              <th>전화</th>
              <td>02-6956-0155</td>
            </tr>
          </Table>
        )}
      </div>
    </div>
  );
}
