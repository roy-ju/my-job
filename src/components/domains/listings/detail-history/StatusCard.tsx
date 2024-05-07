import React from 'react';

import { Moment, Numeral } from '@/components/atoms';

import useMonthlyRentFee from './hooks/useMonthlyRentFee';

import {
  StatusCardTitle,
  StatusCardWrraper,
  StatusContentsWrraper,
  StatusContentsText,
  StatusTitle,
} from './widget/ListingDetailHistoryWidget';

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
  const { renderMonthlyRentFee } = useMonthlyRentFee();

  return (
    <StatusCardWrraper>
      <StatusCardTitle>진행 상황</StatusCardTitle>
      <StatusContentsWrraper>
        {(isPreContractCompleted || isContractCompleted) && (
          <>
            <StatusContentsText>
              <StatusTitle>{isPreContractCompleted ? '거래성사일' : '체결일'}</StatusTitle>
              <Moment format="YYYY.MM.DD">{contractDate}</Moment>
            </StatusContentsText>

            <StatusContentsText>
              <StatusTitle>{isPreContractCompleted ? '거래성사 가격' : '체결가'}</StatusTitle>
              {isMonthlyRent ? (
                <div>
                  <Numeral thousandsSeparated koreanNumber>
                    {contractBiddingTradeOrDepositPrice}
                  </Numeral>
                  {' / '}
                  {renderMonthlyRentFee(contractBiddingMonthlyRentFee)}
                </div>
              ) : (
                <Numeral thousandsSeparated koreanNumber>
                  {contractBiddingTradeOrDepositPrice}
                </Numeral>
              )}
            </StatusContentsText>
          </>
        )}
        <StatusContentsText>
          <StatusTitle tw="shrink-0 self-start">상태</StatusTitle>
          <span tw="text-nego-800">{statusText}</span>
        </StatusContentsText>
      </StatusContentsWrraper>
    </StatusCardWrraper>
  );
}
