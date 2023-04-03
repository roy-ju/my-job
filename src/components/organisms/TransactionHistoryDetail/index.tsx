import React from 'react';

export default function TransactionHistoryDetail() {
  return (
    <>
      <div tw="bg-white">
        <strong tw="text-b1 mb-4 block">참여 결과</strong>
        <div tw="text-b2 text-gray-1000">
          <div tw="flex py-2 gap-3 border-b border-gray-100">
            <dt tw="flex items-center min-w-[5rem]">거래번호</dt>
            <dd tw="flex items-center ">20220224121138</dd>
          </div>
          <div tw="flex py-2 gap-3 border-b border-gray-100">
            <dt tw="flex items-center min-w-[5rem]">상세내용</dt>
            <dd tw="flex items-center ">변경조건 미동의로 인한 참여취소</dd>
          </div>
        </div>
      </div>
    </>
  );
}
