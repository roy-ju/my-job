import Image from 'next/image';
import React from 'react';
import TitleImage from '@/../public/static/images/landing/intro_title.png';
import BigTitleImage from '@/../public/static/images/landing/intro_title_big_white.png';
import BannerImage from '@/../public/static/images/landing/intro_banner.png';
import BigBannerImage from '@/../public/static/images/landing/intro_banner_big.png';
import AppleIcon from '@/assets/icons/apple_store.svg';
import GooglePlayIcon from '@/assets/icons/google_store.svg';
import AppleTextIcon from '@/assets/icons/apple_store_text.svg';
import GooglePlayTextIcon from '@/assets/icons/google_store_text.svg';
import Link from 'next/link';

export default function SectionOne({ isMobileSize }: { isMobileSize: boolean }) {
  return (
    <section>
      <div
        tw="relative"
        style={{
          height: isMobileSize ? '382px' : '745px',
          backgroundImage: isMobileSize ? `url(${BannerImage.src})` : `url(${BigBannerImage.src})`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundColor: '#090B2066',
          }}
        />
        <div tw="md:flex md:flex-col md:gap-10 absolute top-[274px] left-0 right-0 justify-center md:top-0 md:bottom-0 md:left-10 xl:left-20">
          {!isMobileSize && (
            <>
              <h1>
                <Image
                  width={708}
                  height={116}
                  alt="네고가 필요한 순간 부동산 가격협상 플랫폼 네고시오"
                  src={BigTitleImage}
                />
              </h1>
              <p tw="text-base leading-6 [letter-spacing: -0.25px] text-gray-900 mb-7 md:text-2xl md:leading-9 md:text-white">
                내 집을 구해야 할 때, 내 집을 내놓을 때에도
                <br /> 거래를 잘 하고 싶다면, 협상은 필수입니다.
                <br /> 마음 졸이며 협상하지 말고 온라인에서 네고하세요.
              </p>
            </>
          )}
          <div tw="flex gap-2 justify-center md:[justify-content: flex-start]">
            <a
              tw="w-[166px] h-10 bg-gray-900 rounded-lg flex gap-2 justify-center items-center hover:opacity-70 transition-opacity"
              target="_blank"
              href="https://apps.apple.com/kr/app/%EB%84%A4%EA%B3%A0%EC%8B%9C%EC%98%A4/id6444820605"
              rel="noopener noreferrer"
            >
              <AppleIcon tw="w-5 h-5" />
              <AppleTextIcon />
            </a>
            <a
              tw="w-[166px] h-10 bg-gray-900 rounded-lg flex gap-2 justify-center items-center hover:opacity-70 transition-opacity"
              target="_blank"
              href="https://play.google.com/store/apps/details?id=kr.co.negocio.production&hl=ko"
              rel="noopener noreferrer"
            >
              <GooglePlayIcon tw="w-5 h-5" />
              <GooglePlayTextIcon />
            </a>
          </div>
        </div>
      </div>
      <div tw="relative pb-[60px] md:pb-[100px] bg-nego-100 flex flex-col justify-items-start">
        <div tw=" absolute left-0 right-0 -top-7 h-7 md:h-[50px] md:-top-[50px] rounded-t-[32px] md:rounded-t-[44px] bg-nego-100 md:left-10 md:right-10 xl:left-20 xl:right-20">
          {!isMobileSize && (
            <Link
              tw="block text-center py-4 text-2xl mx-5 mt-4 leading-[34px] [box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.14)]  border [border-color: #5661D1] [color: #5661D1] rounded-[44px] font-bold hover:opacity-70 transition-opacity"
              href="/"
            >
              네고시오 홈 바로가기
            </Link>
          )}
        </div>
        <div tw="px-5">
          {isMobileSize && (
            <>
              <h1 tw="mb-[18px]">
                <Image
                  width={324}
                  height={58}
                  alt="네고가 필요한 순간 부동산 가격협상 플랫폼 네고시오"
                  src={TitleImage}
                />
              </h1>
              <p tw="text-base leading-6 [letter-spacing: -0.25px] text-gray-900 mb-7">
                내 집을 구해야 할 때, 내 집을 내놓을 때에도
                <br /> 거래를 잘 하고 싶다면, 협상은 필수입니다.
                <br /> 마음 졸이며 협상하지 말고 온라인에서 네고하세요.
              </p>
            </>
          )}
          {isMobileSize && (
            <Link
              tw="block text-center py-4 text-sm mb-[60px] leading-[22px] [box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.14)]  border [border-color: #5661D1] [color: #5661D1] rounded-[44px] font-bold hover:opacity-70 transition-opacity"
              href="/"
            >
              네고시오 홈 바로가기
            </Link>
          )}
        </div>
        <div className="intro-carousel-container" tw="md:mt-[150px]">
          <div className="intro-carousel" tw="mb-5 md:mb-10">
            <div
              className="intro-carousel-item"
              tw="max-w-[320px] md:max-w-[538px] [background: linear-gradient(90deg, #5661D1 0%, #715FE2 100%)] rounded-tr-[60px] md:rounded-tr-[120px] py-5 pl-7 md:py-[60px] md:pl-20 text-white"
            >
              <div tw="mb-3 md:mb-6">
                <p tw="font-bold text-xs md:text-lg md:leading-[26px] leading-5 md:mb-0.5">네고시오 협상스토리</p>
                <p tw="font-bold text-base md:text-[28px] md:leading-10  leading-6">변호사가 말하는 협상 전략</p>
              </div>
              <div tw="mb-[38px] md:mb-[62px] md:text-2xl text-sm md:leading-10 leading-[22px] [letter-spacing: -0.25px]">
                최대한 정확한 정보를 파악한 후 협상하라
                <br /> 지킬 것과 버릴 것을 확실하게 구분하라
                <br /> 본인의 감정을 드러내지 않고 협상하라
              </div>
              <div>
                <p tw="font-bold text-xs md:text-lg md:leading-[26px] leading-5 md:mb-0.5">김경렬</p>
                <p tw="text-xs md:text-lg md:leading-[26px] leading-5">K파트너스 법률사무소 대표 변호사</p>
              </div>
            </div>
          </div>
          <div className="intro-carousel-indicator" tw="flex gap-3 md:gap-7 justify-center">
            <button aria-label="슬라이드1" tw="h-1.5 w-1.5 rounded-full [background-color: #D9D9D9]" type="button" />
            <button aria-label="슬라이드2" tw="h-1.5 w-1.5 rounded-full [background-color: #D9D9D9]" type="button" />
            <button aria-label="슬라이드3" tw="h-1.5 w-1.5 rounded-full [background-color: #D9D9D9]" type="button" />
          </div>
        </div>
      </div>
    </section>
  );
}
