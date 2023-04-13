import React from 'react';
import { v4 as uuid4 } from 'uuid';
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
  interimAmount1?: number;
  interimAmount2?: number;
  interimAmount3?: number;
  interimAmountNegotiable1?: boolean;
  interimAmountNegotiable2?: boolean;
  interimAmountNegotiable3?: boolean;
  interimAmountPaymentTime1?: string;
  interimAmountPaymentTimeType1?: number;
  interimAmountPaymentTime2?: string;
  interimAmountPaymentTimeType2?: number;
  interimAmountPaymentTime3?: string;
  interimAmountPaymentTimeType3?: number;
  contractAmount?: number;
  contractAmountNegotiable?: boolean;
  remainingAmount?: number;
  remainingAmountPaymentTime?: string;
  remainingAmountPaymentTimeType?: number;
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
  interimAmount1,
  interimAmount2,
  interimAmount3,
  interimAmountNegotiable1,
  interimAmountNegotiable2,
  interimAmountNegotiable3,
  interimAmountPaymentTime1,
  interimAmountPaymentTimeType1,
  interimAmountPaymentTime2,
  interimAmountPaymentTimeType2,
  interimAmountPaymentTime3,
  interimAmountPaymentTimeType3,
  contractAmount,
  contractAmountNegotiable,
  remainingAmount,
  remainingAmountPaymentTime,
  remainingAmountPaymentTimeType,
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
              {!contractAmountNegotiable && <span tw="text-info text-gray-700 leading-6">*협의불가</span>}
            </div>
          </div>
        </div>
      );
    }

    case '중도금': {
      const interimAmountArray = [
        [interimAmount1, interimAmountNegotiable1, interimAmountPaymentTime1, interimAmountPaymentTimeType1],
        [interimAmount2, interimAmountNegotiable2, interimAmountPaymentTime2, interimAmountPaymentTimeType2],
        [interimAmount3, interimAmountNegotiable3, interimAmountPaymentTime3, interimAmountPaymentTimeType3],
      ];

      return (
        <div tw="flex py-[0.5625rem]">
          <div tw="mr-3 items-start justify-self-start min-w-[5.25rem] text-b2 text-gray-700">{label}</div>
          <div tw="break-all flex flex-col gap-[0.5625rem]">
            {interimAmountArray?.map(([amount, negotiable, paymentTime, paymentTimeType]) => {
              if (!amount) return null;

              return (
                <div key={uuid4()}>
                  <div tw="flex">
                    <div tw="text-b2">
                      <Numeral thousandsSeparated koreanNumber>
                        {amount as number}
                      </Numeral>
                    </div>
                    &nbsp;
                    {!negotiable && <span tw="text-info text-gray-700 leading-6">*협의불가</span>}
                  </div>
                  {!!paymentTime && (
                    <div tw="text-info text-gray-700 ">
                      <>
                        지급일: <Moment format="YYYY.MM.DD">{paymentTime as string}</Moment>{' '}
                        {dateType[`${paymentTimeType as 1 | 2}`]}
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
            </div>
            {!!remainingAmountPaymentTime && (
              <div tw="text-info text-gray-700 ">
                <>
                  지급일: <Moment format="YYYY.MM.DD">{remainingAmountPaymentTime}</Moment>{' '}
                  {dateType[`${remainingAmountPaymentTimeType as 1 | 2}`]}
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
            <div tw="flex py-[0.5625rem]" key={uuid4()}>
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
            <div tw="flex py-[0.5625rem]" key={uuid4()}>
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
      const totalAmount =
        (contractAmount ?? 0) +
        (interimAmount1 ?? 0) +
        (interimAmount2 ?? 0) +
        (interimAmount3 ?? 0) +
        (remainingAmount ?? 0);

      return (
        <div tw="flex py-[0.5625rem]">
          <span tw="mr-3 items-start justify-self-start min-w-[5.25rem] text-b2 text-gray-700">{label}</span>
          <span tw="break-all text-b2">
            <Numeral thousandsSeparated koreanNumber>
              {totalAmount}
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
