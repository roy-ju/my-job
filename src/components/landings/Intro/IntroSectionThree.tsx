import { useEffect, useState } from 'react';

import Image from 'next/image';

import tw, { styled } from 'twin.macro';

import { motion } from 'framer-motion';

import PhoneImage from '@/../public/static/images/landing/intro_phone2.png';

import MypageImage from '@/../public/static/images/landing/intro_mypage.png';

import MypageImage2 from '@/../public/static/images/landing/intro_mypage2.png';

const StyledP = styled.p`
  ${tw`text-sm md:text-2xl md:leading-10 leading-[22px] text-gray-900`}

  @media (min-width: 768px) {
    &::before {
      content: '- ';
    }
  }
`;

export default function IntroSectionThree({ recommend }: { recommend?: boolean }) {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  const cardWidth = 320;
  const gap = 16;
  const translateDuration = 500;
  const carouselX = -currentSlideIndex * (cardWidth + gap);

  useEffect(() => {
    const max = 2;

    const intervalId = setInterval(() => {
      setCurrentSlideIndex((prev) => {
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
    if (currentSlideIndex === 2) {
      setTimeout(() => setCurrentSlideIndex(0), translateDuration);
    }
  }, [translateDuration, currentSlideIndex]);

  const slide1 = (
    <>
      <motion.div tw="shrink-0 [border-radius: 32px] overflow-hidden [box-shadow: -8px 12px 16px rgba(0, 0, 0, 0.15)]">
        <Image
          tw="[box-shadow: -8px 12px 16px rgba(0, 0, 0, 0.15)] [border-radius: 32px] h-full"
          alt=""
          width={320}
          height={257}
          src={MypageImage}
        />
      </motion.div>
      <motion.div tw="shrink-0 [border-radius: 32px] overflow-hidden [box-shadow: -8px 12px 16px rgba(0, 0, 0, 0.15)]">
        <Image
          tw="[box-shadow: -8px 12px 16px rgba(0, 0, 0, 0.15)] [border-radius: 32px] h-full"
          alt=""
          width={320}
          height={257}
          src={MypageImage2}
        />
      </motion.div>

      <motion.div tw="shrink-0 [border-radius: 32px] overflow-hidden [box-shadow: -8px 12px 16px rgba(0, 0, 0, 0.15)]">
        <Image
          tw="[box-shadow: -8px 12px 16px rgba(0, 0, 0, 0.15)] [border-radius: 32px] h-full"
          alt=""
          width={320}
          height={257}
          src={MypageImage}
        />
      </motion.div>

      <motion.div tw="shrink-0 [border-radius: 32px] overflow-hidden [box-shadow: -8px 12px 16px rgba(0, 0, 0, 0.15)]">
        <Image
          tw="[box-shadow: -8px 12px 16px rgba(0, 0, 0, 0.15)] [border-radius: 32px] h-full"
          alt=""
          width={320}
          height={257}
          src={MypageImage2}
        />
      </motion.div>
    </>
  );

  return (
    <div css={recommend ? tw`bg-white` : tw`bg-nego-100`} tw="overflow-hidden relative">
      <section tw="max-w-[1280px] xl:mx-auto  px-5 py-[60px]  text-center md:text-left md:py-[120px] md:pl-10  xl:pl-20 md:pr-0 xl:pr-0 md:flex md:flex-col md:flex-wrap md:[height: 1157px] overflow-hidden">
        <div tw="mb-7 md:order-1 md:mb-[60px]">
          <p tw="font-bold text-base md:text-2xl md:leading-[34px] leading-6 text-nego-800 mb-2 md:mb-3">
            #중개사 #매물추천받기
          </p>
          <h1 tw="font-bold text-2xl md:text-[44px] md:leading-[64px] leading-[34px]">
            원하는 가격에
            <br /> 매물을 추천 받으세요
          </h1>
        </div>
        <div tw="mb-[60px] md:order-3 md:ml-auto md:pr-10  xl:pr-20">
          <Image tw="mx-auto" alt="" width={320} height={620} src={PhoneImage} />
        </div>
        <div tw="flex flex-col gap-7 md:gap-10  mb-10 md:mb-0 md:order-2">
          <div>
            <p tw="font-bold text-base md:text-[28px] md:leading-[36px]  leading-6 text-gray-900 mb-2 md:mb-4">
              Step 1. 추천 요청 발송
            </p>
            <StyledP>매물 추천 받을 지역/단지 선택</StyledP>
            <StyledP>매물 종류 선택</StyledP>
            <StyledP>원하는 가격 넣기</StyledP>
          </div>
          <div>
            <p tw="font-bold text-base md:text-[28px] md:leading-[36px]  leading-6 text-gray-900 mb-2 md:mb-4">
              Step 2. 가격 제안
            </p>
            <StyledP>마이페이지에서 확인</StyledP>
            <StyledP>매물상세 정보 확인</StyledP>
            <StyledP>바로 네고 협의 → 중개사와 채팅가능</StyledP>
          </div>
          <div>
            <p tw="font-bold text-base md:text-[28px] md:leading-[36px] leading-6 text-gray-900 mb-2 md:mb-4">
              Step 3. 중개사와 협의
            </p>
            <StyledP>채팅을 통한 추가 협의/방문예약</StyledP>
          </div>
        </div>
        <div tw="md:order-4 overflow-hidden flex">
          <div tw="mx-auto w-[320px] md:w-[360px] xl:w-[400px] h-[257px] overflow-hidden md:ml-auto md:mr-0 rounded-l-[32px] [box-shadow: -8px 12px 16px rgba(0, 0, 0, 0.15)]">
            <div
              tw="flex gap-4  "
              style={{
                transform: `translateX(calc(${carouselX}px))`,
                transition: currentSlideIndex === 0 ? '' : `transform ${translateDuration}ms ease-in-out`,
              }}
            >
              {slide1}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
