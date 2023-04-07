import React from 'react';

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
    | '희망가';
  value?: number | number[] | { name: string; amount: number } | string | boolean;
}

export default function Item({ label, value }: ItemProps) {
  switch (label) {
    case '계약금': {
      return (
        <div tw="flex py-[0.5625rem]">
          <span tw="mr-3 items-start justify-self-start min-w-[5.25rem] text-b2 text-gray-700">{label}</span>
          <span tw="break-all flex">
            <span tw="text-b2">{`${value}억`}</span>&nbsp;
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
            <span tw="text-b2">{`${value}억`}</span>
            <span tw="text-info text-gray-700 ">지급일: 2022.03.03 이후</span>
          </span>
        </div>
      );
    }

    case '중도금': {
      return (
        <div tw="flex py-[0.5625rem]">
          <span tw="mr-3 items-start justify-self-start min-w-[5.25rem] text-b2 text-gray-700">{label}</span>
          <span tw="break-all flex flex-col">
            <div tw="flex">
              <span tw="text-b2">{`${value}억`}</span>&nbsp;
              <span tw="text-info text-gray-700 leading-6">*협의불가</span>
            </div>
            <span tw="text-info text-gray-700 ">지급일: 2022.03.03 이후</span>
          </span>
        </div>
      );
    }

    case '선순위담보권': {
      if (typeof value !== 'object' || !('name' in value)) return <></>;

      return (
        <div tw="flex py-[0.5625rem]">
          <span tw="mr-3 items-start justify-self-start min-w-[5.25rem] text-b2 text-gray-700">{value.name}</span>
          <span tw="break-all text-b2">{value.amount}</span>
        </div>
      );
    }

    case '거래종류': {
      if (typeof value === 'object') return <></>;

      return (
        <div tw="flex py-[0.5625rem]">
          <span tw="mr-3 items-start justify-self-start min-w-[5.25rem] text-b2 text-gray-700">{label}</span>
          <span tw="break-all text-b2">{value}</span>
        </div>
      );
    }

    case '실제지급총액': {
      if (typeof value === 'object') return <></>;

      return (
        <div tw="flex py-[0.5625rem]">
          <span tw="mr-3 items-start justify-self-start min-w-[5.25rem] text-b2 text-gray-700">{label}</span>
          <span tw="break-all text-b2">{`${value}억`}</span>
        </div>
      );
    }

    case '전세자금대출': {
      if (typeof value === 'object') return <></>;

      return (
        <div tw="flex py-[0.5625rem]">
          <span tw="mr-3 items-start justify-self-start min-w-[5.25rem] text-b2 text-gray-700">{label}</span>
          <span tw="break-all text-b2">{value ? '가능' : '불가'}</span>
        </div>
      );
    }

    case '입주가능시기': {
      if (typeof value === 'object') return <></>;

      return (
        <div tw="flex py-[0.5625rem]">
          <span tw="mr-3 items-start justify-self-start min-w-[5.25rem] text-b2 text-gray-700">{label}</span>
          <span tw="break-all text-b2">{value}</span>
        </div>
      );
    }

    case '임대기간': {
      if (typeof value === 'object') return <></>;

      return (
        <div tw="flex py-[0.5625rem]">
          <span tw="mr-3 items-start justify-self-start min-w-[5.25rem] text-b2 text-gray-700">{label}</span>
          <span tw="break-all text-b2">{`${value}년`}</span>
        </div>
      );
    }

    case '임대할부분': {
      if (typeof value === 'object') return <></>;

      return (
        <div tw="flex py-[0.5625rem]">
          <span tw="mr-3 items-start justify-self-start min-w-[5.25rem] text-b2 text-gray-700">{label}</span>
          <span tw="break-all text-b2">{value}</span>
        </div>
      );
    }

    case '특약조건': {
      if (typeof value === 'object') return <></>;

      return (
        <div tw="flex py-[0.5625rem]">
          <span tw="mr-3 items-start justify-self-start min-w-[5.25rem] text-b2 text-gray-700">{label}</span>
          <span tw="break-all text-b2">{value}</span>
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
