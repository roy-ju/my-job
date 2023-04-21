import React from 'react';

import ExclamationMark from '@/assets/icons/exclamation_mark_outlined.svg';

export default function DanjiChartNodata() {
  return (
    <div tw="flex flex-row items-center justify-center gap-1">
      <ExclamationMark />
      <span tw="text-gray-600">실거래 기록이 없습니다.</span>
    </div>
  );
}
