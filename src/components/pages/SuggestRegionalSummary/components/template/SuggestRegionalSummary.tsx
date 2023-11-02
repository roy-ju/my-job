import { useMemo } from 'react';

import tw, { styled } from 'twin.macro';

import { Button, Moment, Numeral, PersistentBottomBar, Separator } from '@/components/atoms';

import { NavigationHeader, Table } from '@/components/molecules';

import { RealestateTypeString, TimeTypeString } from '@/constants/strings';

import falsy from '@/utils/falsy';

import useSummaryForm from '../../hooks/useSummaryForm';

import useHandleSummaryForm from '../../hooks/useHandleSummaryForm';

import useRedirect from '../../hooks/useRedirect';

const StyledTable = styled.table`
  ${tw`w-full text-b2`}
  th {
    ${tw`w-24 py-2 text-gray-700`}
  }
  td {
    ${tw`w-auto py-2 text-left`}
  }
  tbody tr:not(:last-of-type) {
    ${tw`border-b border-b-gray-300`}
  }
`;

export default function SuggestRegionalSummary() {
  useRedirect();

  const form = useSummaryForm();

  const { handleClickBack, handleSuggestForm, loading } = useHandleSummaryForm();

  const realestateTypesString = useMemo(() => {
    if (form?.realestate_types) {
      return form?.realestate_types
        ?.split(',')
        .map((item) => RealestateTypeString[Number(item)])
        .join(', ');
    }
    return '';
  }, [form?.realestate_types]);

  if (!form) return null;

  return (
    <div tw="flex flex-col h-full">
      <NavigationHeader>
        <NavigationHeader.BackButton onClick={handleClickBack} />
        <NavigationHeader.Title>매물 구해요</NavigationHeader.Title>
      </NavigationHeader>
      <div tw="flex-1 min-h-0 overflow-auto">
        <div tw="py-7 px-5">
          <div tw="font-bold mb-1">구하는 내용을 최종 확인해주세요.</div>
          <p tw="text-gray-700 text-info">
            등록하신 정보의 수정 및 추천된 매물의 확인은
            <br />
            &#39;마이페이지 &gt; 구해요 &gt; 내가 등록한 구하기&#39; 에서 가능합니다.
          </p>
        </div>
        <Separator />
        <div tw="py-7 px-5">
          <div tw="font-bold mb-4">구하는 내용</div>
          <div>
            <StyledTable>
              <Table.Body>
                <Table.Row>
                  <Table.Head>구하는 위치</Table.Head>
                  <Table.Data>{form?.address?.split(' ').slice(1).join(' ')}</Table.Data>
                </Table.Row>

                <Table.Row>
                  <Table.Head>부동산 종류</Table.Head>
                  <Table.Data>{realestateTypesString}</Table.Data>
                </Table.Row>

                <Table.Row>
                  <Table.Head>거래 종류</Table.Head>
                  <Table.Data>{form?.buy_or_rents === '1' ? '매매' : '전월세'}</Table.Data>
                </Table.Row>

                <Table.Row>
                  <Table.Head>가격</Table.Head>
                  <Table.Data>
                    <span>
                      {form?.monthly_rent_fee ? (
                        <span>
                          <Numeral koreanNumber>{form?.deposit}</Numeral> /{' '}
                          <Numeral koreanNumber>{form?.monthly_rent_fee}</Numeral>{' '}
                          {form?.negotiable && '(금액 협의 가능)'}
                        </span>
                      ) : (
                        <span>
                          <Numeral koreanNumber>{form?.trade_price}</Numeral> {form?.negotiable && '(금액 협의 가능)'}
                        </span>
                      )}
                    </span>
                  </Table.Data>
                </Table.Row>

                {form?.buy_or_rents === '1' && (
                  <Table.Row>
                    <Table.Head>매매목적</Table.Head>
                    <Table.Data>{form?.purpose}</Table.Data>
                  </Table.Row>
                )}

                {form?.buy_or_rents === '1' && form?.purpose === '투자' && (
                  <Table.Row>
                    <Table.Head>투자 예산</Table.Head>
                    <Table.Data>
                      <Numeral koreanNumber>{form?.invest_amount}</Numeral>
                    </Table.Data>
                  </Table.Row>
                )}

                {form?.move_in_date && (
                  <Table.Row>
                    <Table.Head>입주 가능 시기</Table.Head>
                    <Table.Data>
                      {form?.move_in_date && (
                        <span>
                          <Moment format="yyyy.MM.DD">{form?.move_in_date}</Moment>
                        </span>
                      )}{' '}
                      {form?.move_in_date_type && <span>{TimeTypeString[form?.move_in_date_type]}</span>}
                    </Table.Data>
                  </Table.Row>
                )}

                {form?.pyoung_from && !form?.pyoung_to && (
                  <Table.Row>
                    <Table.Head>구하는 평형</Table.Head>
                    <Table.Data>{form?.pyoung_from}평 이상</Table.Data>
                  </Table.Row>
                )}

                {!form?.pyoung_from && form?.pyoung_to && (
                  <Table.Row>
                    <Table.Head>구하는 평형</Table.Head>
                    <Table.Data>{form?.pyoung_to}평 이하</Table.Data>
                  </Table.Row>
                )}

                {form?.pyoung_from && form?.pyoung_to && (
                  <Table.Row>
                    <Table.Head>구하는 평형</Table.Head>
                    <Table.Data>
                      {form?.pyoung_from}평 ~ {form?.pyoung_to}평
                    </Table.Data>
                  </Table.Row>
                )}

                <Table.Row>
                  <Table.Head>추가 조건</Table.Head>
                  <Table.Data>{falsy(form?.note, '없음')}</Table.Data>
                </Table.Row>

                <Table.Row>
                  <Table.Head>인터뷰 가능 시간</Table.Head>
                  <Table.Data>{form?.interview_available_times || ''}</Table.Data>
                </Table.Row>
              </Table.Body>
            </StyledTable>
          </div>
        </div>
      </div>
      <PersistentBottomBar>
        <div tw="flex gap-4">
          <Button tw="w-full" size="bigger" variant="outlined" onClick={handleClickBack}>
            뒤로가기
          </Button>
          <Button tw="w-full" size="bigger" onClick={handleSuggestForm} isLoading={loading}>
            입력 완료
          </Button>
        </div>
      </PersistentBottomBar>
    </div>
  );
}
