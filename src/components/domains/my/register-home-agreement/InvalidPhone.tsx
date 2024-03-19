import React from 'react';

import ErrorIcon from '@/assets/icons/error.svg';

export default function InvalidPhone() {
  return (
    <div tw="flex items-center gap-1 mt-2">
      <ErrorIcon />
      <span tw="text-info text-red-800 [line-height: 12px] [letter-spacing: -0.2px]">
        유효한 휴대폰 번호를 입력해주세요.
      </span>
    </div>
  );
}
