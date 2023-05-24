import { GetRealestateDocumentResponse } from '@/apis/listing/getRealestateDocument';
import { Button, Moment } from '@/components/atoms';
import { memo } from 'react';
import QuestionIcon from '@/assets/icons/question.svg';
import tw, { styled } from 'twin.macro';
import useTooltip from '@/states/tooltip';

const StyledTable = styled.table`
  width: 100%;

  tr:not(:last-of-type) {
    ${tw`border-b border-b-gray-300`}
  }

  th {
    ${tw`py-2 font-normal text-gray-700 text-b2 text-start`}
    vertical-align: top;
  }

  td {
    ${tw`py-2 text-b2 text-gray-1000 text-start`}
    vertical-align: top;
    min-width: 84px;
  }
`;

interface Props {
  data?: GetRealestateDocumentResponse | null;
}

const StrikeOut = memo(({ str }: { str: string }) => {
  const resultString = str.replace(/&/g, '<strike>').replace(/&/g, '</strike>');

  // eslint-disable-next-line react/no-danger
  return <span dangerouslySetInnerHTML={{ __html: resultString }} />;
});

export default function RealestateDocument({ data }: Props) {
  const { openTooltip } = useTooltip();

  return (
    <div>
      <div tw="flex items-center gap-1">
        <div tw="text-b1 font-bold">등기상 권리관계</div>
        <Button variant="ghost" size="none" tw="pb-0.5" onClick={() => openTooltip('realestateDocument')}>
          <QuestionIcon />
        </Button>
      </div>
      <div tw="text-info text-gray-700 mb-4">
        등기조회 기준일 <Moment format="yyyy.MM.DD">{data?.created_time ?? ''}</Moment>
      </div>
      {data?.owner_list && (
        <div>
          <div tw="text-b2">소유자지분</div>
          <StyledTable tw="mb-10">
            <tbody>
              <tr>
                <th>순위</th>
                <th>정보</th>
              </tr>
              {data?.owner_list?.map((item) => (
                <tr key={item.number + item.owner}>
                  <td>{item.number}</td>
                  <td>
                    이름: {item.owner}
                    <br />
                    (주민)등록번호: {item.registration_number}
                    <br />
                    최종지분: {item.share}
                    <br />
                    주소: {item.address}
                  </td>
                </tr>
              ))}
            </tbody>
          </StyledTable>
        </div>
      )}
      <div>
        <div tw="text-b2">소유자지분 제외 권리</div>
        {data?.debt_list1 ? (
          <StyledTable tw="mb-10">
            <tbody>
              <tr>
                <th>순위</th>
                <th>정보</th>
              </tr>
              {data?.debt_list1?.map((item) => (
                <tr key={item.number + item.purpose}>
                  <td>{item.number}</td>
                  <td>
                    등기목적: {item.purpose}
                    <br />
                    접수: {item.application_info}
                    <br />
                    주요 등기사항: <StrikeOut str={item.description} />
                  </td>
                </tr>
              ))}
            </tbody>
          </StyledTable>
        ) : (
          <div tw="mb-10 text-info text-gray-700">기록사항이 없습니다.</div>
        )}
      </div>
      <div>
        <div tw="text-b2">(근)저당권 및 전세권</div>
        {data?.debt_list2 ? (
          <StyledTable>
            <tbody>
              <tr>
                <th>순위</th>
                <th>정보</th>
              </tr>
              {data?.debt_list2?.map((item) => (
                <tr key={item.number + item.purpose}>
                  <td>{item.number}</td>
                  <td>
                    등기목적: {item.purpose}
                    <br />
                    접수: {item.application_info}
                    <br />
                    주요 등기사항: <StrikeOut str={item.description} />
                  </td>
                </tr>
              ))}
            </tbody>
          </StyledTable>
        ) : (
          <div tw="text-info text-gray-700">기록사항이 없습니다.</div>
        )}
      </div>
    </div>
  );
}
