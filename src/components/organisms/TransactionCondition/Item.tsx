import React from 'react';
import { Moment, Numeral } from '@/components/atoms';
import { BuyOrRentString } from '@/constants/strings';

interface ItemProps {
  label?:
    | '거래종류'
    | '매매가'
    | '전세금'
    | '월세'
    | '계약금'
    | '중도금'
    | '잔금'
    | '실제지급총액'
    | '선순위담보권'
    | '입주가능시기'
    | '전세자금대출'
    | '임대기간'
    | '임대할부분'
    | '특약조건'
    | '희망가'
    | '채무승계희망금액';

  buyOrRent?: number;
  tradePrice?: number;
  deposit?: number;
  monthlyRentFee?: number;
  contractAmount?: number;
  remainingAmount?: number;
  interimAmount1?: number;
  interimAmount2?: number;
  interimAmount3?: number;
  interimAmountNegotiable1?: boolean;
  interimAmountPaymentTime?: string;
  interimAmountPaymentTimeType?: number;
  debtSuccessions?: { name: string; amount: number }[];
  collaterals?: { name: string; amount: number }[];
  moveInDate?: string;
  moveInDateType?: number; // dateType = 1 : 이전,  2: 이후
  rentTermYear?: number;
  rentTermMonth?: number;
  rentArea?: string;
  specialTerms?: string;
  jeonsaeLoan?: boolean;
}

export default function Item({
  label,

  buyOrRent,
  tradePrice,
  deposit,
  monthlyRentFee,
  contractAmount,
  remainingAmount,
  interimAmount1,
  interimAmount2,
  interimAmount3,
  interimAmountNegotiable1,
  interimAmountPaymentTime,
  interimAmountPaymentTimeType,
  debtSuccessions,
  collaterals,
  moveInDate,
  moveInDateType,
  rentTermYear,
  rentTermMonth,
  rentArea,
  specialTerms,
  jeonsaeLoan,
}: ItemProps) {
  const dateType = {
    1: '이전',
    2: '이후',
  };

  switch (label) {
    case '계약금': {
      return (
        <div tw="flex py-[0.5625rem]">
          <div tw="mr-3 items-start justify-self-start min-w-[5.25rem] text-b2 text-gray-700">{label}</div>
          <div tw="break-all flex flex-col">
            <div tw="flex">
              <div tw="text-b2">
                <Numeral thousandsSeparated koreanNumber>
                  {contractAmount}
                </Numeral>
              </div>
              &nbsp;
              {!interimAmountNegotiable1 && <span tw="text-info text-gray-700 leading-6">*협의불가</span>}
            </div>
            {!!interimAmountPaymentTime && (
              <div tw="text-info text-gray-700 ">
                <>
                  지급일: <Moment format="YYYY.MM.DD">{interimAmountPaymentTime}</Moment>{' '}
                  {dateType[`${interimAmountPaymentTimeType as 1 | 2}`]}
                </>
              </div>
            )}
          </div>
        </div>
      );
    }

    case '중도금': {
      return (
        <div tw="flex py-[0.5625rem]">
          <div tw="mr-3 items-start justify-self-start min-w-[5.25rem] text-b2 text-gray-700">{label}</div>
          <div tw="break-all flex flex-col gap-[0.5625rem]">
            {[interimAmount1, interimAmount2, interimAmount3]?.map((amount) => {
              if (!amount) return null;

              return (
                <div key={amount}>
                  <div tw="flex">
                    <div tw="text-b2">
                      <Numeral thousandsSeparated koreanNumber>
                        {remainingAmount}
                      </Numeral>
                    </div>
                    &nbsp;
                    {!interimAmountNegotiable1 && <span tw="text-info text-gray-700 leading-6">*협의불가</span>}
                  </div>
                  {!!interimAmountPaymentTime && (
                    <div tw="text-info text-gray-700 ">
                      <>
                        지급일: <Moment format="YYYY.MM.DD">{interimAmountPaymentTime}</Moment>{' '}
                        {dateType[`${interimAmountPaymentTimeType as 1 | 2}`]}
                      </>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      );
    }

    case '잔금': {
      return (
        <div tw="flex py-[0.5625rem]">
          <div tw="mr-3 items-start justify-self-start min-w-[5.25rem] text-b2 text-gray-700">{label}</div>
          <div tw="break-all flex flex-col">
            <div tw="flex">
              <div tw="text-b2">
                <Numeral thousandsSeparated koreanNumber>
                  {remainingAmount}
                </Numeral>
              </div>
              &nbsp;
              {!interimAmountNegotiable1 && <span tw="text-info text-gray-700 leading-6">*협의불가</span>}
            </div>
            {!!interimAmountPaymentTime && (
              <div tw="text-info text-gray-700 ">
                <>
                  지급일: <Moment format="YYYY.MM.DD">{interimAmountPaymentTime}</Moment>{' '}
                  {dateType[`${interimAmountPaymentTimeType as 1 | 2}`]}
                </>
              </div>
            )}
          </div>
        </div>
      );
    }

    case '선순위담보권': {
      return (
        <>
          {collaterals?.map(({ name, amount }) => (
            <div tw="flex py-[0.5625rem]" key={name}>
              <span tw="mr-3 items-start justify-self-start min-w-[5.25rem] text-b2 text-gray-700">{name}</span>
              <span tw="break-all text-b2">
                <Numeral thousandsSeparated koreanNumber>
                  {amount}
                </Numeral>
              </span>
            </div>
          ))}
        </>
      );
    }

    case '채무승계희망금액': {
      return (
        <>
          {debtSuccessions?.map(({ name, amount }) => (
            <div tw="flex py-[0.5625rem]" key={name}>
              <span tw="mr-3 items-start justify-self-start min-w-[5.25rem] text-b2 text-gray-700">{name}</span>
              <span tw="break-all text-b2">
                <Numeral thousandsSeparated koreanNumber>
                  {amount}
                </Numeral>
              </span>
            </div>
          ))}
        </>
      );
    }

    case '거래종류': {
      return (
        <div tw="flex py-[0.5625rem]">
          <span tw="mr-3 items-start justify-self-start min-w-[5.25rem] text-b2 text-gray-700">{label}</span>
          <span tw="break-all text-b2">{BuyOrRentString[buyOrRent as number]}</span>
        </div>
      );
    }

    case '실제지급총액': {
      const debtSuccessionsTotal = debtSuccessions?.reduce((total, { amount: num }) => total + num, 0) as number;

      return (
        <div tw="flex py-[0.5625rem]">
          <span tw="mr-3 items-start justify-self-start min-w-[5.25rem] text-b2 text-gray-700">{label}</span>
          <span tw="break-all text-b2">
            <Numeral thousandsSeparated koreanNumber>
              {((tradePrice || deposit) as number) + debtSuccessionsTotal}
            </Numeral>
          </span>
        </div>
      );
    }

    case '희망가': {
      const content = monthlyRentFee ? (
        <>
          <Numeral thousandsSeparated koreanNumber>
            {tradePrice || deposit}
          </Numeral>
          {' / '}
          <Numeral thousandsSeparated koreanNumber>
            {monthlyRentFee}
          </Numeral>
        </>
      ) : (
        <Numeral thousandsSeparated koreanNumber>
          {tradePrice || deposit}
        </Numeral>
      );

      return (
        <div tw="flex py-[0.5625rem]">
          <span tw="mr-3 items-start justify-self-start min-w-[5.25rem] text-b2 text-gray-700">{label}</span>
          <span tw="break-all text-b2">{content}</span>
        </div>
      );
    }

    case '전세자금대출': {
      return (
        <div tw="flex py-[0.5625rem]">
          <span tw="mr-3 items-start justify-self-start min-w-[5.25rem] text-b2 text-gray-700">{label}</span>
          <span tw="break-all text-b2">{jeonsaeLoan ? '가능' : '불가'}</span>
        </div>
      );
    }

    case '입주가능시기': {
      return (
        <div tw="flex py-[0.5625rem]">
          <span tw="mr-3 items-start justify-self-start min-w-[5.25rem] text-b2 text-gray-700">{label}</span>
          <span tw="break-all text-b2">
            <>
              <Moment format="YYYY.MM.DD">{moveInDate}</Moment> {dateType[`${moveInDateType as 1 | 2}`]}
            </>
          </span>
        </div>
      );
    }

    case '임대기간': {
      const content = rentTermMonth ? `${rentTermYear}년 ${rentTermMonth}개월` : `${rentTermYear}년`;

      return (
        <div tw="flex py-[0.5625rem]">
          <span tw="mr-3 items-start justify-self-start min-w-[5.25rem] text-b2 text-gray-700">{label}</span>
          <span tw="break-all text-b2">{content}</span>
        </div>
      );
    }

    case '임대할부분': {
      return (
        <div tw="flex py-[0.5625rem]">
          <span tw="mr-3 items-start justify-self-start min-w-[5.25rem] text-b2 text-gray-700">{label}</span>
          <span tw="break-all text-b2">{rentArea}</span>
        </div>
      );
    }

    case '특약조건': {
      return (
        <div tw="flex py-[0.5625rem]">
          <span tw="mr-3 items-start justify-self-start min-w-[5.25rem] text-b2 text-gray-700">{label}</span>
          <span tw="break-all text-b2">{specialTerms}</span>
        </div>
      );
    }

    default: {
      return (
        <div tw="flex py-[0.5625rem]">
          <span tw="mr-3 items-start justify-self-start min-w-[5.25rem] text-b2 text-gray-700">{label}</span>
          <span tw="break-all text-b2" />
        </div>
      );
    }
  }
}
