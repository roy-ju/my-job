import { Button, Moment, Numeral, PersistentBottomBar, Separator } from '@/components/atoms';
import { NavigationHeader, Table } from '@/components/molecules';
import { RealestateTypeString, TimeTypeString } from '@/constants/strings';
import falsy from '@/utils/falsy';
import { useMemo } from 'react';
import tw, { styled } from 'twin.macro';

const StyledTable = styled.table`
  ${tw`w-full text-b2`}
  th {
    ${tw`py-2 text-gray-1000 w-21`}
  }
  td {
    ${tw`w-auto py-2 text-left`}
  }
  tbody tr:not(:last-of-type) {
    ${tw`border-b border-b-gray-300`}
  }
`;

interface Props {
  address?: string;
  realestateTypes?: string;
  buyOrRents?: string;
  price?: number;
  monthlyRentFee?: number;
  minArea?: string;
  maxArea?: string;
  purpose?: string;
  description?: string;
  moveInDate?: string;
  moveInDateType?: number;
  investAmount?: number;
  negotiable?: boolean;
  isNextButtonLoading?: boolean;
  onClickBack?: () => void;
  onClickNext?: () => void;
}

export default function SuggestRegionalSummary({
  address,
  realestateTypes,
  buyOrRents,
  price,
  monthlyRentFee,
  minArea,
  maxArea,
  purpose,
  description,
  moveInDate,
  moveInDateType,
  investAmount,
  negotiable,
  isNextButtonLoading,
  onClickBack,
  onClickNext,
}: Props) {
  const realestateTypesString = useMemo(
    () =>
      realestateTypes
        ?.split(',')
        .map((item) => RealestateTypeString[Number(item)])
        .join(', '),
    [realestateTypes],
  );

  return (
    <div tw="flex flex-col h-full">
      <NavigationHeader>
        <NavigationHeader.BackButton onClick={onClickBack} />
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
                  <Table.Data>{address?.split(' ').slice(1).join(' ')}</Table.Data>
                </Table.Row>
                <Table.Row>
                  <Table.Head>부동산 종류</Table.Head>
                  <Table.Data>{realestateTypesString}</Table.Data>
                </Table.Row>
                <Table.Row>
                  <Table.Head>거래 종류</Table.Head>
                  <Table.Data>{buyOrRents === '1' ? '매매' : '전월세'}</Table.Data>
                </Table.Row>
                <Table.Row>
                  <Table.Head>가격</Table.Head>
                  <Table.Data>
                    <span>
                      {monthlyRentFee ? (
                        <span>
                          <Numeral koreanNumber>{price}</Numeral> / <Numeral koreanNumber>{monthlyRentFee}</Numeral>{' '}
                          {negotiable && '(금액 협의 가능)'}
                        </span>
                      ) : (
                        <span>
                          <Numeral koreanNumber>{price}</Numeral> {negotiable && '(금액 협의 가능)'}
                        </span>
                      )}
                    </span>
                  </Table.Data>
                </Table.Row>
                {buyOrRents === '1' && (
                  <Table.Row>
                    <Table.Head>매매목적</Table.Head>
                    <Table.Data>{purpose}</Table.Data>
                  </Table.Row>
                )}
                {buyOrRents === '1' && purpose === '투자' && (
                  <Table.Row>
                    <Table.Head>투자 예산</Table.Head>
                    <Table.Data>
                      <Numeral koreanNumber>{investAmount}</Numeral>
                    </Table.Data>
                  </Table.Row>
                )}
                {moveInDate && (
                  <Table.Row>
                    <Table.Head>입주 가능 시기</Table.Head>
                    <Table.Data>
                      {moveInDate && (
                        <span>
                          <Moment format="yyyy.MM.DD">{moveInDate}</Moment>
                        </span>
                      )}{' '}
                      {moveInDateType && <span>{TimeTypeString[moveInDateType]}</span>}
                    </Table.Data>
                  </Table.Row>
                )}

                {minArea && !maxArea && (
                  <Table.Row>
                    <Table.Head>구하는 평형</Table.Head>
                    <Table.Data>{minArea}평 이상</Table.Data>
                  </Table.Row>
                )}
                {maxArea && !minArea && (
                  <Table.Row>
                    <Table.Head>구하는 평형</Table.Head>
                    <Table.Data>{maxArea}평 이하</Table.Data>
                  </Table.Row>
                )}
                {minArea && maxArea && (
                  <Table.Row>
                    <Table.Head>구하는 평형</Table.Head>
                    <Table.Data>
                      {minArea}평 ~ {maxArea}평
                    </Table.Data>
                  </Table.Row>
                )}

                <Table.Row>
                  <Table.Head>추가 조건</Table.Head>
                  <Table.Data>{falsy(description, '없음')}</Table.Data>
                </Table.Row>
              </Table.Body>
            </StyledTable>
          </div>
        </div>
      </div>
      <PersistentBottomBar>
        <div tw="flex gap-4">
          <Button tw="w-full" size="bigger" variant="outlined" onClick={onClickBack}>
            뒤로가기
          </Button>
          <Button tw="w-full" size="bigger" onClick={onClickNext} isLoading={isNextButtonLoading}>
            입력 완료
          </Button>
        </div>
      </PersistentBottomBar>
    </div>
  );
}
