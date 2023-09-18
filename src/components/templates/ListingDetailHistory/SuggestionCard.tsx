import React from 'react';
import tw, { styled } from 'twin.macro';
import { Table } from '@/components/molecules';
import { Moment, Numeral } from '@/components/atoms';
import { TimeTypeString } from '@/constants/strings';

interface SuggestionCardProps {
  isMonthlyRent: boolean;
  biddingMonthlyRentFee: number;
  biddingTradeOrDepositPrice: number;

  moveInDate: string;
  moveInDateType: number;
  description: string;
  etcs: string;
}

const StyledTable = styled.table`
  ${tw`w-full table-fixed text-b2`}
  th {
    ${tw`text-gray-1000 w-[20%] py-1`}
  }
  td {
    ${tw`py-1 text-start w-[80%]`}
  }
`;

export default function SuggestionCard({
  isMonthlyRent,
  biddingMonthlyRentFee,
  biddingTradeOrDepositPrice,

  moveInDate,
  moveInDateType,
  description,
  etcs,
}: SuggestionCardProps) {
  const renderMonthlyRentFee = () => {
    if (biddingMonthlyRentFee === 0) return '0원';
    return (
      <Numeral thousandsSeparated koreanNumber>
        {biddingMonthlyRentFee}
      </Numeral>
    );
  };

  return (
    <>
      <div tw="text-b1 mb-4 font-bold">나의 제안 내용</div>
      <StyledTable>
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
                  {renderMonthlyRentFee()}
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
      </StyledTable>
    </>
  );
}
