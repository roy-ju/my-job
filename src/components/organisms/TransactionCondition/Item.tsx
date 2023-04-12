import React from 'react';
import { Moment, Numeral } from '@/components/atoms';

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
  value?: number | number[] | { name: string; amount: number }[] | string | boolean;
  value2?: number | number[] | { name: string; amount: number }[] | string | boolean;
}

export default function Item({ label, value, value2 }: ItemProps) {
  switch (label) {
    case '계약금': {
      return (
        <div tw="flex py-[0.5625rem]">
          <span tw="mr-3 items-start justify-self-start min-w-[5.25rem] text-b2 text-gray-700">{label}</span>
          <span tw="break-all flex">
            <span tw="text-b2">
              <Numeral thousandsSeparated koreanNumber>
                {value as number}
              </Numeral>
            </span>
            &nbsp;
            <span tw="text-info text-gray-700 leading-6">*협의불가</span>
          </span>
        </div>
      );
    }

    case '잔금': {
      return (
        <div tw="flex py-[0.5625rem]">
          <span tw="mr-3 items-start justify-self-start min-w-[5.25rem] text-b2 text-gray-700">{label}</span>
          <span tw="break-all flex flex-col">
            <span tw="text-b2">
              <Numeral thousandsSeparated koreanNumber>
                {value as number}
              </Numeral>
            </span>
            <span tw="text-info text-gray-700 ">지급일: 2022.03.03 이후</span>
          </span>
        </div>
      );
    }

    case '중도금': {
      return (
        <div tw="flex py-[0.5625rem]">
          <span tw="mr-3 items-start justify-self-start min-w-[5.25rem] text-b2 text-gray-700">{label}</span>
          <span tw="break-all flex flex-col gap-[0.5625rem]">
            {(value as number[]).map((amount) => (
              <div tw="flex " key={amount}>
                <span tw="text-b2">
                  <Numeral thousandsSeparated koreanNumber>
                    {amount}
                  </Numeral>
                </span>
                &nbsp;
                <span tw="text-info text-gray-700 leading-6">*협의불가</span>
              </div>
            ))}
            <span tw="text-info text-gray-700 ">지급일: 2022.03.03 이후</span>
          </span>
        </div>
      );
    }

    case '선순위담보권': {
      return (
        <>
          {(value as [])?.map(({ name, amount }) => (
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
          {(value as [])?.map(({ name, amount }) => (
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
          <span tw="break-all text-b2">{value as string}</span>
        </div>
      );
    }

    case '실제지급총액': {
      const debtSuccessionsTotal = (value2 as []).reduce((total, { amount: num }) => total + num, 0);

      return (
        <div tw="flex py-[0.5625rem]">
          <span tw="mr-3 items-start justify-self-start min-w-[5.25rem] text-b2 text-gray-700">{label}</span>
          <span tw="break-all text-b2">
            <Numeral thousandsSeparated koreanNumber>
              {(value as number) + debtSuccessionsTotal}
            </Numeral>
          </span>
        </div>
      );
    }

    case '희망가': {
      const content = value2 ? (
        <>
          <Numeral thousandsSeparated koreanNumber>
            {value as number}
          </Numeral>
          {' / '}
          <Numeral thousandsSeparated koreanNumber>
            {value2 as number}
          </Numeral>
        </>
      ) : (
        <Numeral thousandsSeparated koreanNumber>
          {value as number}
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
          <span tw="break-all text-b2">{(value as boolean) ? '가능' : '불가'}</span>
        </div>
      );
    }

    case '입주가능시기': {
      return (
        <div tw="flex py-[0.5625rem]">
          <span tw="mr-3 items-start justify-self-start min-w-[5.25rem] text-b2 text-gray-700">{label}</span>
          <span tw="break-all text-b2">
            <Moment format="YYYY년 M월 D일">{value as string}</Moment> 이전
          </span>
        </div>
      );
    }

    case '임대기간': {
      const content = value2 ? `${value}년 ${value2}개월` : `${value}년`;

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
          <span tw="break-all text-b2">{value as string}</span>
        </div>
      );
    }

    case '특약조건': {
      return (
        <div tw="flex py-[0.5625rem]">
          <span tw="mr-3 items-start justify-self-start min-w-[5.25rem] text-b2 text-gray-700">{label}</span>
          <span tw="break-all text-b2">{value as string}</span>
        </div>
      );
    }

    default: {
      if (typeof value === 'object') return <></>;

      return (
        <div tw="flex py-[0.5625rem]">
          <span tw="mr-3 items-start justify-self-start min-w-[5.25rem] text-b2 text-gray-700">{label}</span>
          <span tw="break-all text-b2">{value}</span>
        </div>
      );
    }
  }
}
