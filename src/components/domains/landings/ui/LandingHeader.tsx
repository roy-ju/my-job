import React from 'react';
import LogoIcon from '@/assets/icons/home_logo.svg';
import Link from 'next/link';
import { useRouter } from 'next/router';
import tw from 'twin.macro';

export default function LandingHeader() {
  const { pathname, push } = useRouter();

  return (
    <div tw="max-w-[1280px] xl:mx-auto">
      <header tw="flex items-center justify-between py-4 px-5 md:py-6 md:px-10 xl:px-20">
        <button type="button" onClick={() => push('/')} aria-label="네고시오 로고">
          <LogoIcon tw="w-20 h-6 md:[width: 110px] md:[height: 34px]" />
        </button>
        <div tw="flex gap-3 font-bold text-xs md:text-base leading-5 text-gray-800">
          <Link
            tw="[letter-spacing: -0.25px] hover:opacity-70 transition-opacity"
            css={pathname.includes('/') && tw`text-nego-1000`}
            href="/intro"
          >
            서비스 소개
          </Link>
          <Link
            tw="[letter-spacing: -0.25px] hover:opacity-70 transition-opacity"
            css={pathname.includes('/recommendation') && tw`text-nego-1000`}
            href="/recommendation"
          >
            매물 추천받기
          </Link>
          <Link tw="[letter-spacing: -0.25px] hover:opacity-70 transition-opacity" href="/">
            홈 바로가기
          </Link>
        </div>
      </header>
    </div>
  );
}
