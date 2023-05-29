import React from 'react';
import LogoIcon from '@/assets/icons/home_logo.svg';
import Link from 'next/link';
import { useRouter } from 'next/router';
import tw from 'twin.macro';

export default function LandingHeader() {
  const { pathname } = useRouter();

  return (
    <header tw="flex items-center justify-between py-4 px-5 md:py-6 md:px-10 xl:px-20">
      <Link href="/intro">
        <LogoIcon tw="w-20 h-6 md:[width: 110px] md:[height: 34px]" />
      </Link>
      <div tw="flex gap-3 font-bold text-xs md:text-base leading-5 text-gray-800">
        <Link
          tw="[letter-spacing: -0.25px] hover:opacity-70 transition-opacity"
          css={pathname === '/intro' && tw`text-nego-1000`}
          href="/intro"
        >
          서비스 소개
        </Link>
        <Link
          tw="[letter-spacing: -0.25px] hover:opacity-70 transition-opacity"
          css={pathname === '/recommendation' && tw`text-nego-1000`}
          href="/recommendation"
        >
          매물 추천받기
        </Link>
        <Link tw="[letter-spacing: -0.25px] hover:opacity-70 transition-opacity" href="/">
          홈 바로가기
        </Link>
      </div>
    </header>
  );
}
