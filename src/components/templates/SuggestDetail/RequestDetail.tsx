import { GetMySuggestDetailResponse } from '@/apis/suggest/getMySuggestDetail';
import { Moment, Numeral } from '@/components/atoms';
import { Table } from '@/components/molecules';
import { RealestateType } from '@/constants/enums';
import { RealestateTypeString, TimeTypeString } from '@/constants/strings';
import falsy from '@/utils/falsy';
import { useMemo } from 'react';
import tw, { styled } from 'twin.macro';

const StyledTable = styled.table`
  ${tw`w-full text-b2`}
  th {
    ${tw`py-1 text-gray-1000`}
  }
  td {
    ${tw`py-1 text-end`}
  }
`;

interface RequestDetailProps {
  suggestData?: GetMySuggestDetailResponse | null;
}

export default function RequestDetail({ suggestData }: RequestDetailProps) {
  const realestateTypes = useMemo(
    () =>
      Array.from(
        new Set(
          suggestData?.realestate_types
            ?.split(',')
            .map((d) => Number(d))
            .map((d) => (d === RealestateType.Yunrip ? RealestateType.Dasaedae : d)) ?? [],
        ),
      )
        .map((item) => RealestateTypeString[item])
        .join(', '),
    [suggestData?.realestate_types],
  );

  return (
    <div>
      {suggestData?.suggest_danji_summary && (
        <div tw="px-5 py-7 border-b border-b-gray-300">
          <div tw="text-b1 font-bold">{suggestData?.suggest_danji_summary?.name}</div>
          <div tw="text-info">{suggestData?.suggest_danji_summary?.road_name_address}</div>
          <div tw="text-info text-gray-700">
            <span>{suggestData?.suggest_danji_summary?.saedae_count}세대</span>
            <span tw="w-px h-2 bg-gray-300 mx-1" />
            <span>{suggestData?.suggest_danji_summary?.use_accepted_year} 준공</span>
            <span tw="w-px h-2 bg-gray-300 mx-1" />
            <span>
              전용 {suggestData?.suggest_danji_summary?.jeonyong_min}~{suggestData?.suggest_danji_summary?.jeonyong_max}
              ㎡
            </span>
          </div>
        </div>
      )}
      <div tw="px-5 mt-7 mb-4 text-b1 font-bold">추천 요청내용</div>
      <div tw="px-5">
        <StyledTable>
          <Table.Body>
            <Table.Row>
              <Table.Head>요청번호</Table.Head>
              <Table.Data>{suggestData?.request_number}</Table.Data>
            </Table.Row>
            <Table.Row>
              <Table.Head>지역</Table.Head>
              <Table.Data>{suggestData?.request_target_text}</Table.Data>
            </Table.Row>
            <Table.Row>
              <Table.Head>부동산 유형</Table.Head>
              <Table.Data tw="whitespace-nowrap">{realestateTypes}</Table.Data>
            </Table.Row>
            <Table.Row>
              <Table.Head>거래 종류</Table.Head>
              <Table.Data>{suggestData?.buy_or_rents === '1' ? '매매' : '전월세'}</Table.Data>
            </Table.Row>
            <Table.Row>
              <Table.Head>가격</Table.Head>
              <Table.Data>
                {suggestData?.monthly_rent_fee === 0 && suggestData?.trade_or_deposit_price === 0 ? (
                  <span>급매물 전체</span>
                ) : (
                  <span>
                    {suggestData?.monthly_rent_fee ? (
                      <span>
                        <Numeral koreanNumber>{suggestData?.trade_or_deposit_price}</Numeral> /{' '}
                        <Numeral koreanNumber>{suggestData?.monthly_rent_fee}</Numeral>
                      </span>
                    ) : (
                      <span>
                        <Numeral koreanNumber>{suggestData?.trade_or_deposit_price}</Numeral>
                      </span>
                    )}
                  </span>
                )}
              </Table.Data>
            </Table.Row>
            {suggestData?.pyoung_text && (
              <Table.Row>
                <Table.Head>관심있는 평수</Table.Head>
                <Table.Data>{suggestData?.pyoung_text}</Table.Data>
              </Table.Row>
            )}
            {suggestData?.buy_or_rents === '1' && (
              <Table.Row>
                <Table.Head>매매거래 목적</Table.Head>
                <Table.Data>
                  <span>{suggestData?.purpose}</span>
                  <span> </span>
                  {suggestData?.remaining_amount_payment_time && (
                    <span>
                      잔금일:
                      <Moment format="yyyy.MM.DD">{suggestData?.remaining_amount_payment_time}</Moment>
                    </span>
                  )}
                  {suggestData?.move_in_date && (
                    <span>
                      입주일:
                      <Moment format="yyyy.MM.DD">{suggestData?.move_in_date}</Moment>
                    </span>
                  )}
                  <span> </span>
                  {suggestData?.remaining_amount_payment_time_type && (
                    <span>{TimeTypeString[suggestData?.remaining_amount_payment_time_type]}</span>
                  )}
                  {suggestData?.move_in_date_type && <span>{TimeTypeString[suggestData?.move_in_date_type]}</span>}
                </Table.Data>
              </Table.Row>
            )}
            <Table.Row>
              <Table.Head>관심있는 층수</Table.Head>
              <Table.Data>{suggestData?.floors}</Table.Data>
            </Table.Row>
            <Table.Row>
              <Table.Head>추가 조건</Table.Head>
              <Table.Data>{falsy(suggestData?.note, '없음')}</Table.Data>
            </Table.Row>
          </Table.Body>
        </StyledTable>
      </div>
    </div>
  );
}
