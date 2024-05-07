import { Button, Moment, Numeral } from '@/components/atoms';

import { Table } from '@/components/molecules';

import { TimeTypeString } from '@/constants/strings';

import useMonthlyRentFee from './hooks/useMonthlyRentFee';

import { SuggestionCardTableContainer, SuggestionCardTitle } from './widget/ListingDetailHistoryWidget';

interface SuggestionCardProps {
  isMonthlyRent: boolean;
  biddingMonthlyRentFee: number;
  biddingTradeOrDepositPrice: number;

  moveInDate: string;
  moveInDateType: number;
  description: string;
  etcs: string;

  openPopup?: () => void;
}

export default function SuggestionCard({
  isMonthlyRent,
  biddingMonthlyRentFee,
  biddingTradeOrDepositPrice,

  moveInDate,
  moveInDateType,
  description,
  etcs,

  openPopup,
}: SuggestionCardProps) {
  const { renderMonthlyRentFee } = useMonthlyRentFee();

  return (
    <>
      <SuggestionCardTitle>
        나의 제안 내용
        <Button variant="outlined" size="small" tw="ml-auto font-normal" onClick={openPopup}>
          제안 취소
        </Button>
      </SuggestionCardTitle>

      <SuggestionCardTableContainer>
        <Table.Body tw="text-b2 text-gray-1000 flex flex-col gap-2">
          <Table.Row tw="flex">
            <Table.Head tw="self-start min-w-[84px]">가격</Table.Head>
            <Table.Data tw="pl-0">
              {isMonthlyRent ? (
                <div>
                  <Numeral thousandsSeparated koreanNumber>
                    {biddingTradeOrDepositPrice}
                  </Numeral>
                  {' / '}
                  {renderMonthlyRentFee(biddingMonthlyRentFee)}
                </div>
              ) : (
                <Numeral thousandsSeparated koreanNumber>
                  {biddingTradeOrDepositPrice}
                </Numeral>
              )}
            </Table.Data>
          </Table.Row>
          {moveInDate && (
            <Table.Row tw="flex justify-between">
              <Table.Head tw="self-start min-w-fit">입주가능시기</Table.Head>
              <Table.Data>
                <Moment format="YYYY년 MM월 DD일">{moveInDate}</Moment> {TimeTypeString[moveInDateType]}
              </Table.Data>
            </Table.Row>
          )}
          {etcs && (
            <Table.Row tw="flex justify-between">
              <Table.Head tw="self-start">추가 조건</Table.Head>
              <Table.Data>{etcs}</Table.Data>
            </Table.Row>
          )}
          {description && (
            <Table.Row tw="flex justify-between">
              <Table.Head tw="self-start">추가 조건</Table.Head>
              <Table.Data>{description}</Table.Data>
            </Table.Row>
          )}
        </Table.Body>
      </SuggestionCardTableContainer>
    </>
  );
}
