import { Moment, Numeral } from '@/components/atoms';
import React from 'react';

interface StatusCardProps {
  statusText: string;
  isMonthlyRent: boolean;
  isPreContractCompleted: boolean;
  isContractCompleted: boolean;

  contractBiddingMonthlyRentFee: number;
  contractBiddingTradeOrDepositPrice: number;
  contractDate: string;
}

export default function StatusCard({
  statusText,
  isMonthlyRent = false,
  isPreContractCompleted,
  isContractCompleted,

  contractBiddingMonthlyRentFee,
  contractBiddingTradeOrDepositPrice,
  contractDate,
}: StatusCardProps) {
  return (
    <div tw="py-6 px-5 bg-gray-100 text-gray-1000">
      <div tw="mb-4 text-b1 font-bold">진행 상황</div>
      <div tw="flex flex-col gap-2">
        {(isPreContractCompleted || isContractCompleted) && (
          <>
            <div tw="text-b2 flex justify-between">
              <span>{isPreContractCompleted ? '거래성사일' : '체결일'}</span>
              <Moment format="YYYY.MM.DD">{contractDate}</Moment>
            </div>
            <div tw="text-b2 flex justify-between">
              <span>{isPreContractCompleted ? '거래성사 가격' : '체결가'}</span>
              {isMonthlyRent ? (
                <div>
                  <Numeral thousandsSeparated koreanNumber>
                    {contractBiddingTradeOrDepositPrice}
                  </Numeral>
                  {' / '}
                  <Numeral thousandsSeparated koreanNumber>
                    {contractBiddingMonthlyRentFee}
                  </Numeral>
                </div>
              ) : (
                <Numeral thousandsSeparated koreanNumber>
                  {contractBiddingTradeOrDepositPrice}
                </Numeral>
              )}
            </div>
          </>
        )}
        <div tw="text-b2 flex justify-between">
          <span tw="min-w-[74px] shrink-0 self-start">상태</span>
          <span tw="text-nego-800">{statusText}</span>
        </div>
      </div>
    </div>
  );
}
