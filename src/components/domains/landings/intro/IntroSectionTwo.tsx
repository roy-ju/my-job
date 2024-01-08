import { useState, useEffect } from 'react';

import Image from 'next/image';

import tw, { styled } from 'twin.macro';

import PhoneImage from '@/../public/static/images/landing/intro_phone6.png';

import PopupImage1 from '@/../public/static/images/landing/intro_popup1.png';

import PopupImage2 from '@/../public/static/images/landing/intro_popup2.png';

import PopupImage3 from '@/../public/static/images/landing/intro_popup3.png';

const StyledP = styled.p`
  ${tw`text-sm md:text-2xl md:leading-10 leading-[22px] text-gray-900`}

  @media (min-width: 768px) {
    &::before {
      content: '- ';
    }
  }
`;

export default function IntroSectionTwo() {
  const [carouselItemIndex, setCarouselItemIndex] = useState(0);
  const carouselItemWidth = 220;
  const carouselItemGap = 16;
  const animationDuration = 500;
  const carouselX = -carouselItemIndex * (carouselItemWidth + carouselItemGap);

  useEffect(() => {
    const max = 3;

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
      setTimeout(() => setCarouselItemIndex(0), 500);
    }
  }, [carouselItemIndex]);

  return (
    <section tw="pt-[60px] md:py-[120px] md:px-10 xl:px-20 md:flex md:justify-between max-w-[1280px] xl:mx-auto">
      <div tw="flex flex-col text-center md:text-left gap-7 md:gap-[60px] mb-10 md:mb-0">
        <div>
          <p tw="font-bold text-base md:text-2xl md:leading-[34px] leading-6 text-nego-800 mb-2 md:mb-3">
            #비대면 #협상전문가
          </p>
          <h1 tw="font-bold text-2xl md:text-[44px] md:leading-[64px] leading-[34px]">
            원하는 가격을
            <br /> 편하게 제안하세요
          </h1>
        </div>
        <div>
          <p tw="font-bold text-base md:text-[28px] md:leading-[36px] md:mb-4 leading-6 text-gray-900 mb-2">
            Step 1. 매물 검색
          </p>
          <StyledP>지도/검색창을 통해 검색</StyledP>
        </div>
        <div>
          <p tw="font-bold text-base md:text-[28px] md:leading-[36px] md:mb-4 leading-6 text-gray-900 mb-2">
            Step 2. 가격 제안
          </p>
          <StyledP tw="text-sm md:text-2xl md:leading-10 leading-[22px] text-gray-900">가격 역제안</StyledP>

          <StyledP>네고를 위한 추가 조건 제시 (선택)</StyledP>
        </div>
        <div>
          <p tw="font-bold text-base md:text-[28px] md:leading-[36px] md:mb-4 leading-6 text-gray-900 mb-2">
            Step 3. 중개사와 협의
          </p>
          <StyledP>채팅을 통한 추가 협의/방문예약</StyledP>
        </div>
      </div>
      <div tw="mx-auto md:ml-auto md:mr-0 h-[232px] w-[320px] md:h-auto  relative overflow-hidden">
        <Image tw="mx-auto" alt="" width={320} height={620} src={PhoneImage} />
        <div tw="absolute top-[60px] md:[top: 170px] flex gap-4">
          <div tw="relative">
            <div
              tw="flex gap-4 justify-center"
              style={{
                transform: `translateX(${carouselX}px)`,
                transition: carouselItemIndex === 0 ? '' : `transform ${animationDuration}ms ease-in-out`,
              }}
            >
              <Image
                tw="mx-auto  [box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.32)] [border-radius: 20px]"
                width={220}
                height={152}
                alt=""
                src={PopupImage1}
              />
              <Image
                tw="mx-auto [box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.32)] [border-radius: 20px]"
                width={220}
                height={152}
                alt=""
                src={PopupImage2}
              />
              <Image
                tw="mx-auto [box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.32)] [border-radius: 20px]"
                width={220}
                height={152}
                alt=""
                src={PopupImage3}
              />

              <Image
                tw="mx-auto  [box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.32)] [border-radius: 20px]"
                width={220}
                height={152}
                alt=""
                src={PopupImage1}
              />

              <Image
                tw="mx-auto [box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.32)] [border-radius: 20px]"
                width={220}
                height={152}
                alt=""
                src={PopupImage2}
              />
              <Image
                tw="mx-auto [box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.32)] [border-radius: 20px]"
                width={220}
                height={152}
                alt=""
                src={PopupImage3}
              />
              <Image
                tw="mx-auto  [box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.32)] [border-radius: 20px]"
                width={220}
                height={152}
                alt=""
                src={PopupImage1}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
