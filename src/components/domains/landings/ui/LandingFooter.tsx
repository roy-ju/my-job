import Link from 'next/link';

import FacebookIcon from '@/assets/icons/facebook_black.svg';

import BlogIcon from '@/assets/icons/blog_black.svg';

import YoutubeIcon from '@/assets/icons/youtube_black.svg';

import InstagramIcon from '@/assets/icons/instagram_black.svg';

import AppleIcon from '@/assets/icons/apple_store.svg';

import GooglePlayIcon from '@/assets/icons/google_store.svg';

import AppleTextIcon from '@/assets/icons/apple_store_text.svg';

import GooglePlayTextIcon from '@/assets/icons/google_store_text.svg';

export default function LandingFooter() {
  return (
    <div tw=" bg-gray-300">
      <footer tw="max-w-[1280px] py-10 px-5 md:px-10 xl:px-20  xl:mx-auto ">
        <address tw="[font-style: normal]">
          <div tw="flex justify-between items-center mb-3">
            <div tw="font-bold text-base leading-6 text-gray-900">(주)네고시오</div>
            <div tw=" font-medium text-xs leading-5">
              <Link href="/my/serviceTerms">이용약관</Link> | <Link href="/my/privacyPolicy">개인정보 처리방침</Link>
            </div>
          </div>
          <div tw="flex flex-col gap-1 text-xs leading-5 text-gray-700 mb-7">
            <div>사업자등록번호: 130-88-0209 | 대표: 우성남</div>
            <div tw="[letter-spacing: -0.4px]">사업자명: 주식회사 네고시오 | 통신판매업신고: 2021-서울강남-04487호</div>
            <div>개인정보관리책임자: LEE SAM</div>
            <div>전화: 02-6956-0155 | E-mail: info@negocio.co.kr</div>
            <div>서울 강남구 선릉로94길 11, 4층 (삼성동, 삼성2빌딩)</div>
            <div>ⓒ2022 NEGOCIO. All rights reserved.</div>
          </div>
        </address>
        <nav tw="md:flex md:justify-between md:items-center">
          <div tw="flex gap-3 mb-7 md:mb-0">
            <a
              tw="hover:opacity-70 transition-opacity"
              target="_blank"
              href="https://www.facebook.com/profile.php?id=100081833845500"
              aria-label="네고시오 페이스북"
              rel="noopener noreferrer"
            >
              <FacebookIcon />
            </a>
            <a
              tw="hover:opacity-70 transition-opacity"
              target="_blank"
              href="https://blog.naver.com/negocio_official"
              aria-label="네고시오 블로그"
              rel="noopener noreferrer"
            >
              <BlogIcon />
            </a>
            <a
              tw="hover:opacity-70 transition-opacity"
              target="_blank"
              href="https://youtu.be/DRaGUpMo_bo"
              aria-label="네고시오 유튜브"
              rel="noopener noreferrer"
            >
              <YoutubeIcon />
            </a>
            <a
              tw="hover:opacity-70 transition-opacity"
              target="_blank"
              href="https://www.instagram.com/negocio.app/"
              aria-label="네고시오 인스타그램"
              rel="noopener noreferrer"
            >
              <InstagramIcon />
            </a>
          </div>
          <div tw="flex gap-2">
            <a
              tw="w-[166px] h-10 bg-gray-900 rounded-lg flex gap-2 justify-center items-center hover:opacity-70 transition-opacity"
              target="_blank"
              href="https://apps.apple.com/kr/app/%EB%84%A4%EA%B3%A0%EC%8B%9C%EC%98%A4/id6444820605"
              rel="noopener noreferrer"
              aria-label="앱스토어 바로가기"
            >
              <AppleIcon tw="w-5 h-5" />
              <AppleTextIcon />
            </a>
            <a
              tw="w-[166px] h-10 bg-gray-900 rounded-lg flex gap-2 justify-center items-center hover:opacity-70 transition-opacity"
              target="_blank"
              href="https://play.google.com/store/apps/details?id=kr.co.negocio.production&hl=ko"
              rel="noopener noreferrer"
              aria-label="구글플레이 바로가기"
            >
              <GooglePlayIcon tw="w-5 h-5" />
              <GooglePlayTextIcon />
            </a>
          </div>
        </nav>
      </footer>
    </div>
  );
}
