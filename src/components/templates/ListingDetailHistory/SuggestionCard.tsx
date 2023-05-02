import React from 'react';
import tw, { styled } from 'twin.macro';
import { Table } from '@/components/molecules';
import { Moment, Numeral } from '@/components/atoms';
import { TimeTypeString } from '@/constants/strings';

interface SuggestionCardProps {
  isMonthlyRent: boolean;
  biddingMonthlyRentFee: number;
  biddingTradeOrDepositPrice: number;

  canHaveEarlierMoveInDate: boolean;
  canHaveEarlierRemainingAmountPaymentTime: boolean;
  canHaveMoreContractAmount: boolean;
  canHaveMoreInterimAmount: boolean;
  contractAmount: number;
  interimAmount: number;
  moveInDate: string;
  moveInDateType: number;
  description: string;
  etcs: string;

  remainingAmountPaymentTime: string;
  remainingAmountPaymentTimeType: number;
}

const StyledTable = styled.table`
  ${tw`w-full table-fixed text-b2`}
  th {
    ${tw`text-gray-1000 w-[20%] py-1`}
  }
  td {
    ${tw`py-1 text-end w-[80%]`}
  }
`;

export default function SuggestionCard({
  isMonthlyRent,
  biddingMonthlyRentFee,
  biddingTradeOrDepositPrice,

  canHaveEarlierMoveInDate,
  canHaveEarlierRemainingAmountPaymentTime,
  canHaveMoreContractAmount,
  canHaveMoreInterimAmount,
  contractAmount,
  interimAmount,
  moveInDate,
  moveInDateType,
  description,
  etcs,

  remainingAmountPaymentTime,
  remainingAmountPaymentTimeType,
}: SuggestionCardProps) {
  return (
    <>
      <div tw="text-b1 mb-4 font-bold">나의 제안 내용</div>
      <StyledTable>
        <Table.Body tw="text-b2 text-gray-1000 flex flex-col gap-2">
          <Table.Row tw="flex justify-between">
            <Table.Head tw="self-start">가격</Table.Head>
            <Table.Data>
              {isMonthlyRent ? (
                <div>
                  <Numeral thousandsSeparated koreanNumber>
                    {biddingTradeOrDepositPrice}
                  </Numeral>
                  {' / '}
                  <Numeral thousandsSeparated koreanNumber>
                    {biddingMonthlyRentFee}
                  </Numeral>
                </div>
              ) : (
                <Numeral thousandsSeparated koreanNumber>
                  {biddingTradeOrDepositPrice}
                </Numeral>
              )}
            </Table.Data>
          </Table.Row>
          {canHaveMoreInterimAmount && (
            <Table.Row tw="flex justify-between">
              <Table.Head tw="self-start">중도금</Table.Head>
              <Table.Data>
                최대{' '}
                <Numeral thousandsSeparated koreanNumber>
                  {interimAmount}
                </Numeral>{' '}
                원까지 지급 가능
              </Table.Data>
            </Table.Row>
          )}
          {canHaveMoreContractAmount && (
            <Table.Row tw="flex justify-between">
              <Table.Head tw="self-start">중도금</Table.Head>
              <Table.Data>
                최대{' '}
                <Numeral thousandsSeparated koreanNumber>
                  {contractAmount}
                </Numeral>{' '}
                원까지 지급 가능
              </Table.Data>
            </Table.Row>
          )}
          {canHaveEarlierMoveInDate && (
            <Table.Row tw="flex justify-between">
              <Table.Head tw="self-start">입주가능시기</Table.Head>
              <Table.Data>
                <Moment format="YYYY년 MM월 DD일">{moveInDate}</Moment> {TimeTypeString[moveInDateType]}
              </Table.Data>
            </Table.Row>
          )}
          {canHaveEarlierRemainingAmountPaymentTime && (
            <Table.Row tw="flex justify-between">
              <Table.Head tw="self-start">잔금</Table.Head>
              <Table.Data>
                잔금 지급 가능한 날: <Moment format="YYYY년 MM월 DD일">{remainingAmountPaymentTime}</Moment>{' '}
                {TimeTypeString[remainingAmountPaymentTimeType]}
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
        <div tw="border-t border-gray-300 absolute left-0 right-0 mt-7" />
      </StyledTable>
    </>
  );
}
