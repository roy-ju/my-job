import { Chip } from '@/components/atoms';
import TransactionHistoryDetail from '@/components/organisms/TransactionHistoryDetail';
import React from 'react';

function DetailItem() {
  return (
    <div tw="px-5">
      <div tw="flex gap-3 py-5  bg-white">
        <div tw="w-12 h-12 bg-gray-600 rounded-lg" />
        <div tw="basis-64">
          <strong tw="text-b2 text-left mb-2 break-all">월세 신갈현대아파트 102동</strong>
          <span tw="text-info text-gray-1000 text-left block">
            경기 성남시 분당구 동판교로 122{' '}
            <Chip variant="gray" tw="ml-1">
              상세주소 미공개
            </Chip>
          </span>
        </div>
      </div>
    </div>
  );
}

export default function DetailHistory() {
  return (
    <div tw="flex-1">
      <div tw="mt-6 border-b border-gray-300">
        <DetailItem />
      </div>
      <div tw="mt-6 ml-5">
        <TransactionHistoryDetail />
      </div>
    </div>
  );
}
