import React from 'react';
import LogoIcon from '@/assets/icons/home_logo.svg';

export default function LandingHeader() {
  return (
    <div tw="flex items-center justify-between py-4 px-5">
      <LogoIcon tw="w-20 h-6" />
      <div tw="flex gap-3 font-bold text-xs leading-5 text-gray-800">
        <div>서비스 소개</div>
        <div>매물 추천받기</div>
        <div>홈 바로가기</div>
      </div>
    </div>
  );
}
