import { Button, Moment, Numeral, PersistentBottomBar, Separator } from '@/components/atoms';
import { NavigationHeader, Table } from '@/components/molecules';
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

interface Props {
  address?: string;
  realestateTypes?: string;
  buyOrRents?: string;
  price?: number;
  monthlyRentFee?: number;
  minArea?: string;
  maxArea?: string;
  purpose?: string;
  floor?: string;
  description?: string;
  remainingAmountPaymentTime?: string;
  remainingAmountPaymentTimeType?: number;
  moveInDate?: string;
  moveInDateType?: number;
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
  floor,
  description,
  remainingAmountPaymentTime,
  remainingAmountPaymentTimeType,
  moveInDate,
  moveInDateType,
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
        <NavigationHeader.Title>지역 매물 추천받기</NavigationHeader.Title>
      </NavigationHeader>
      <div tw="flex-1 min-h-0 overflow-auto">
        <div tw="py-7 px-5">
          <div tw="font-bold">입력한 내용으로 매물추천을 받아 볼래요.</div>
        </div>
        <Separator />
        <div tw="py-7 px-5">
          <div tw="font-bold mb-4">원하는 매물</div>
          <div>
            <StyledTable>
              <Table.Body>
                <Table.Row>
                  <Table.Head>지역</Table.Head>
                  <Table.Data>{address}</Table.Data>
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
                    {monthlyRentFee ? (
                      <span>
                        <Numeral koreanNumber>{price}</Numeral> / <Numeral koreanNumber>{monthlyRentFee}</Numeral>
                      </span>
                    ) : (
                      <span>
                        <Numeral koreanNumber>{price}</Numeral>
                      </span>
                    )}
                  </Table.Data>
                </Table.Row>
                {minArea && !maxArea && (
                  <Table.Row>
                    <Table.Head>관심있는 평수</Table.Head>
                    <Table.Data>{minArea}평</Table.Data>
                  </Table.Row>
                )}
                {maxArea && !minArea && (
                  <Table.Row>
                    <Table.Head>관심있는 평수</Table.Head>
                    <Table.Data>{maxArea}평</Table.Data>
                  </Table.Row>
                )}
                {minArea && maxArea && (
                  <Table.Row>
                    <Table.Head>관심있는 평수</Table.Head>
                    <Table.Data>
                      {minArea}평 ~ {maxArea}평
                    </Table.Data>
                  </Table.Row>
                )}

                {buyOrRents === '1' && (
                  <Table.Row>
                    <Table.Head>매매거래 목적</Table.Head>
                    <Table.Data>
                      <span>{purpose}</span>
                      <span> </span>
                      {remainingAmountPaymentTime && (
                        <span>
                          잔금일:
                          <Moment format="yyyy.MM.DD">{remainingAmountPaymentTime}</Moment>
                        </span>
                      )}
                      {moveInDate && (
                        <span>
                          입주일:
                          <Moment format="yyyy.MM.DD">{moveInDate}</Moment>
                        </span>
                      )}
                      <span> </span>
                      {remainingAmountPaymentTimeType && <span>{TimeTypeString[remainingAmountPaymentTimeType]}</span>}
                      {moveInDateType && <span>{TimeTypeString[moveInDateType]}</span>}
                    </Table.Data>
                  </Table.Row>
                )}
                <Table.Row>
                  <Table.Head>관심있는 층 수</Table.Head>
                  <Table.Data>{floor}</Table.Data>
                </Table.Row>
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
        <Button tw="w-full" size="bigger" onClick={onClickNext} isLoading={isNextButtonLoading}>
          추천 받기
        </Button>
      </PersistentBottomBar>
    </div>
  );
}
