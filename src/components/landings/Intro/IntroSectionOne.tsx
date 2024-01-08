import { useEffect, useState } from 'react';

import Link from 'next/link';

import Image from 'next/image';

import TitleImage from '@/../public/static/images/landing/intro_title.png';

import BigTitleImage from '@/../public/static/images/landing/intro_title_big_white.png';

import BigBannerImage from '@/../public/static/images/landing/intro_banner_big3.webp';

import AppleIcon from '@/assets/icons/apple_store.svg';

import GooglePlayIcon from '@/assets/icons/google_store.svg';

import AppleTextIcon from '@/assets/icons/apple_store_text.svg';

import GooglePlayTextIcon from '@/assets/icons/google_store_text.svg';

import tw from 'twin.macro';

const carouselItems = [
  {
    heading: '공인중개사가 말하는 부동산 협상',
    subHeading: '네고시오 협상스토리',
    body: '대부분의 부동산 거래는 협상의 결과입\n니다. 항상 모든 정보가 공개되는 것은\n아닙니다. 중개사는 가격결정에 생각보\n다 많은 영향을 미칩니다.',
    name: 'OOO 공인중개사',
    job: '분당 OO중개사무소',
  },
  {
    heading: '변호사가 말하는 협상 전략',
    subHeading: '네고시오 협상스토리',
    body: '최대한 정확한 정보를 파악한 후 협상하라\n지킬 것과 버릴 것을 확실하게 구분하라\n본인의 감정을 드러내지 않고 협상하라',
    name: '김경렬',
    job: 'K파트너스 법률사무소 대표 변호사',
  },
  {
    heading: '결정권을 쥐고 있는 의사결정자를 찾아라',
    subHeading: '협상의 원칙',
    body: '나의 의사가 거래당사자에게 제대로 전달되었\n을까 고민하지 말고, 이제 네고시오에서 내 집을\n구할 때도, 내놓을 때도, 서로 원하는 가격, 조건\n을 직접 확인하고 후회없는 거래하세요.',
    name: '스튜어트 다이아몬드',
    job: '협상전문가',
  },
];

export default function SectionOne({ isMobileSize }: { isMobileSize: boolean }) {
  const carouselItemWidth = isMobileSize ? 320 : 600;
  const carouselItemHeight = isMobileSize ? 240 : 452;
  const carouselItemGap = isMobileSize ? 16 : 72;

  const [carouselItemIndex, setCarouselItemIndex] = useState(0);

  const carouselX = -carouselItemIndex * (carouselItemWidth + carouselItemGap);

  const animationDuration = 500;

  useEffect(() => {
    const max = carouselItems.length;

    const intervalId = setInterval(() => {
      setCarouselItemIndex((prev) => {
        if (prev < max) {
          return prev + 1;
        }
        return prev;
      });
    }, 3000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  useEffect(() => {
    if (carouselItemIndex === 3) {
      setTimeout(() => setCarouselItemIndex(0), animationDuration);
    }
  }, [carouselItemIndex]);

  return (
    <section>
      <div tw="relative" style={{ height: isMobileSize ? '382px' : '745px' }}>
        <div tw="absolute inset-0">
          <Image
            tw="[object-fit: cover] w-full h-full"
            width={1920}
            priority
            alt=""
            placeholder="blur"
            src={BigBannerImage}
          />
        </div>
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundColor: '#090B2066',
          }}
        />
        <div tw="max-w-[1280px] xl:mx-auto md:flex md:flex-col md:gap-10 absolute top-[274px] left-0 right-0 justify-center md:top-0 md:bottom-0 md:left-10 xl:left-20">
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
              <p tw=" text-base leading-6 [letter-spacing: -0.25px] text-gray-900 mb-7 md:text-2xl md:leading-9 md:text-white">
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
        <div tw="max-w-[1200px] absolute left-0 right-0 -top-7 h-7 md:h-[50px] md:-top-[50px] rounded-t-[32px] md:rounded-t-[44px] bg-nego-100 md:left-10 md:right-10 xl:left-0 xl:right-0 xl:mx-auto">
          {!isMobileSize && (
            <Link
              tw=" block text-center py-4 text-2xl mx-5 mt-4 leading-[34px] [box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.14)]  border [border-color: #5661D1] [color: #5661D1] rounded-[44px] font-bold hover:opacity-70 transition-opacity"
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
        <div tw="md:mt-[150px]">
          <div tw="overflow-hidden">
            <div
              tw="flex overflow-x-visible w-fit"
              style={{
                columnGap: `${carouselItemGap}px`,
                transform: `translateX(calc(${carouselX}px - ${carouselItemWidth}px - ${carouselItemGap}px + 20vw))`,
                transition: carouselItemIndex === 0 ? '' : `transform ${animationDuration}ms ease-in-out`,
              }}
            >
              {carouselItems.map((item) => (
                <div
                  key={item.heading}
                  tw="flex flex-col shrink-0 [background: linear-gradient(90deg, #5661D1 0%, #715FE2 100%)] rounded-tr-[60px] md:rounded-tr-[120px] py-5 px-7 md:py-[60px] md:px-20 text-white"
                  style={{
                    width: `${carouselItemWidth}px`,
                    height: `${carouselItemHeight}px`,
                  }}
                >
                  <div tw="mb-3 md:mb-6">
                    <p tw="font-bold text-xs md:text-lg md:leading-[26px] leading-5 md:mb-0.5">{item.subHeading}</p>
                    <p tw="font-bold text-base md:text-[28px] md:leading-10  leading-6">{item.heading}</p>
                  </div>
                  <div tw="md:text-2xl text-sm md:leading-10 leading-[22px] [letter-spacing: -0.25px] whitespace-pre-wrap">
                    {item.body}
                  </div>
                  <div tw="mt-auto">
                    <p tw="font-bold text-xs md:text-lg md:leading-[26px] leading-5 md:mb-0.5">{item.name}</p>
                    <p tw="text-xs md:text-lg md:leading-[26px] leading-5">{item.job}</p>
                  </div>
                </div>
              ))}
              {carouselItems.map((item) => (
                <div
                  key={item.heading}
                  tw="flex flex-col shrink-0 [background: linear-gradient(90deg, #5661D1 0%, #715FE2 100%)] rounded-tr-[60px] md:rounded-tr-[120px] py-5 px-7 md:py-[60px] md:px-20 text-white"
                  style={{
                    width: `${carouselItemWidth}px`,
                    height: `${carouselItemHeight}px`,
                  }}
                >
                  <div tw="mb-3 md:mb-6">
                    <p tw="font-bold text-xs md:text-lg md:leading-[26px] leading-5 md:mb-0.5">{item.subHeading}</p>
                    <p tw="font-bold text-base md:text-[28px] md:leading-10  leading-6">{item.heading}</p>
                  </div>
                  <div tw="md:text-2xl text-sm md:leading-10 leading-[22px] [letter-spacing: -0.25px] whitespace-pre-wrap">
                    {item.body}
                  </div>
                  <div tw="mt-auto">
                    <p tw="font-bold text-xs md:text-lg md:leading-[26px] leading-5 md:mb-0.5">{item.name}</p>
                    <p tw="text-xs md:text-lg md:leading-[26px] leading-5">{item.job}</p>
                  </div>
                </div>
              ))}
              {carouselItems.map((item) => (
                <div
                  key={item.heading}
                  tw="flex flex-col shrink-0 [background: linear-gradient(90deg, #5661D1 0%, #715FE2 100%)] rounded-tr-[60px] md:rounded-tr-[120px] py-5 px-7 md:py-[60px] md:px-20 text-white"
                  style={{
                    width: `${carouselItemWidth}px`,
                    height: `${carouselItemHeight}px`,
                  }}
                >
                  <div tw="mb-3 md:mb-6">
                    <p tw="font-bold text-xs md:text-lg md:leading-[26px] leading-5 md:mb-0.5">{item.subHeading}</p>
                    <p tw="font-bold text-base md:text-[28px] md:leading-10  leading-6">{item.heading}</p>
                  </div>
                  <div tw="md:text-2xl text-sm md:leading-10 leading-[22px] [letter-spacing: -0.25px] whitespace-pre-wrap">
                    {item.body}
                  </div>
                  <div tw="mt-auto">
                    <p tw="font-bold text-xs md:text-lg md:leading-[26px] leading-5 md:mb-0.5">{item.name}</p>
                    <p tw="text-xs md:text-lg md:leading-[26px] leading-5">{item.job}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="intro-carousel-indicator" tw="flex gap-3 mt-10 md:gap-7 justify-center">
            {carouselItems.map((item, i) => (
              <button
                aria-label="slide-button"
                key={item.heading}
                css={[
                  tw`h-1.5 w-1.5 md:h-3.5 md:w-3.5 rounded-full [background-color: #D9D9D9] transition-colors`,
                  carouselItemIndex % carouselItems.length === i && tw`[background-color: #715FE2]`,
                ]}
                type="button"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
