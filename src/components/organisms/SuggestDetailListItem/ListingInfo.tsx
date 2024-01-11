import { useMemo } from 'react';

import { styled } from 'twin.macro';

import { Chip, Moment, Numeral } from '@/components/atoms';

import { GetSuggestDetailResponse } from '@/apis/suggest/getSuggestDetail';

import { BuyOrRent, DanjiOrRegionalType, RealestateType } from '@/constants/enums';

import { RealestateTypeChipVariant, RealestateTypeString, TimeTypeString } from '@/constants/strings';

import { Table } from '@/components/molecules';

interface Props {
  data?: GetSuggestDetailResponse | null;
}

const Wrraper = styled('div')``;

function PriceText({
  tradeOrDepositPrice,
  monthlyRentFee,
  quickSale,
}: {
  tradeOrDepositPrice: number;
  monthlyRentFee: number;
  quickSale: boolean;
}) {
  if (quickSale) return <span>급매 구해요</span>;

  if (monthlyRentFee) {
    return (
      <>
        <Numeral koreanNumber>{tradeOrDepositPrice}</Numeral> / <Numeral koreanNumber>{monthlyRentFee}</Numeral>
      </>
    );
  }
  return <Numeral koreanNumber>{tradeOrDepositPrice}</Numeral>;
}

function NegotiableChip() {
  return (
    <div tw="text-gray-900 rounded text-info [font-size: 11px] bg-white px-1.5 h-5 border border-gray-300">
      협의가능
    </div>
  );
}

export default function ListingInfo({ data }: Props) {
  const realestateTypes = useMemo(
    () =>
      Array.from(
        new Set(
          data?.realestate_types
            ?.split(',')
            .map((d) => Number(d))
            .map((d) => (d === RealestateType.Yunrip ? RealestateType.Dasaedae : d)) ?? [],
        ),
      ),
    [data?.realestate_types],
  );

  const buyOrRentText = Number(data?.buy_or_rents) === BuyOrRent.Buy ? '매매' : '전월세';

  return (
    <>
      <Wrraper tw="block mb-3 w-full">
        <div tw="mb-4 flex justify-between items-center">
          <div tw="flex items-center gap-1.5">
            {realestateTypes.map((type) => (
              <Chip key={type} variant={RealestateTypeChipVariant[type]}>
                {RealestateTypeString[type]}
              </Chip>
            ))}

            {data?.danji_or_regional === DanjiOrRegionalType.Danji ? (
              <span tw="text-gray-1000 text-info line-clamp-1">{data.request_target_text}</span>
            ) : (
              <span tw="text-gray-1000 text-info line-clamp-1">{data?.request_target_text.split(' ').slice(-1)}</span>
            )}
          </div>
        </div>

        <div tw="text-left">
          <div tw="flex items-center mb-1">
            <div tw="text-b1 font-bold text-gray-1000 mr-1">
              {buyOrRentText}&nbsp;
              <PriceText
                tradeOrDepositPrice={data?.trade_or_deposit_price ?? 0}
                monthlyRentFee={data?.monthly_rent_fee ?? 0}
                quickSale={data?.quick_sale ?? false}
              />
            </div>
            {data?.negotiable && <NegotiableChip />}
          </div>

          <Table>
            <Table.Body>
              {data?.pyoung_text && (
                <Table.Row tw="flex ">
                  <Table.Head tw="max-w-[84px] mr-1">찾는 평형</Table.Head>
                  <Table.Data tw="w-full">{data?.pyoung_text}</Table.Data>
                </Table.Row>
              )}

              {data?.move_in_date && (
                <Table.Row tw="flex ">
                  <Table.Head tw="max-w-[84px] mr-1">입주희망일</Table.Head>
                  <Table.Data tw="w-full">
                    <Moment format="YY년 MM월 DD일">{data?.move_in_date}</Moment>{' '}
                    {TimeTypeString[data.move_in_date_type]}
                  </Table.Data>
                </Table.Row>
              )}

              {data?.purpose === '투자' && (
                <Table.Row tw="flex ">
                  <Table.Head tw="max-w-[84px] mr-1">투자예산</Table.Head>
                  <Table.Data tw="w-full">
                    <Numeral koreanNumber>{data?.invest_amount}</Numeral>
                  </Table.Data>
                </Table.Row>
              )}

              {data?.note && data?.additional_conditions && (
                <>
                  <Table.Row tw="flex ">
                    <Table.Head tw="max-w-[84px] mr-1">요청사항1</Table.Head>
                    <Table.Data tw="w-full">{data.note}</Table.Data>
                  </Table.Row>
                  <Table.Row tw="flex ">
                    <Table.Head tw="max-w-[84px] mr-1">요청사항2</Table.Head>
                    <Table.Data tw="w-full">{data.additional_conditions.split(',').join(', ')}</Table.Data>
                  </Table.Row>
                </>
              )}

              {data?.note && !data?.additional_conditions && (
                <Table.Row tw="flex ">
                  <Table.Head tw="max-w-[84px] mr-1">요청사항1</Table.Head>
                  <Table.Data tw="w-full">{data?.note}</Table.Data>
                </Table.Row>
              )}

              {!data?.note && data?.additional_conditions && (
                <Table.Row tw="flex ">
                  <Table.Head tw="max-w-[84px] mr-1">요청사항1</Table.Head>
                  <Table.Data tw="w-full">{data.additional_conditions.split(',').join(', ')}</Table.Data>
                </Table.Row>
              )}
            </Table.Body>
          </Table>
        </div>
      </Wrraper>
    </>
  );
}
