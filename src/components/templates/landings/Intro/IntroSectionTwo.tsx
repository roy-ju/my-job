import React from 'react';
import PhoneImage from '@/../public/static/images/landing/intro_phone1.png';
import Image from 'next/image';

import tw, { styled } from 'twin.macro';

const StyledP = styled.p`
  ${tw`text-sm md:text-2xl md:leading-10 leading-[22px] text-gray-900`}

  @media (min-width: 768px) {
    &::before {
      content: '- ';
    }
  }
`;

export default function IntroSectionTwo() {
  return (
    <section tw="pt-[60px] md:py-[120px] md:px-10 xl:px-20 md:flex md:justify-between">
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
      <div tw="h-[232px] md:h-auto overflow-hidden">
        <Image tw="mx-auto" alt="" width={320} height={620} src={PhoneImage} />
      </div>
    </section>
  );
}
