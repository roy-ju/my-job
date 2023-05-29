import Image from 'next/image';
import React from 'react';
import Phone1 from '@/../public/static/images/landing/intro_phone3.png';
// import Phone2 from '@/../public/static/images/landing/intro_phone4.png';

export default function IntroSectionFive() {
  return (
    <section tw="bg-nego-100">
      <div>
        <div>
          <p tw="font-bold text-base leading-6 text-nego-800 mb-2">#네고매물 #실매물</p>
          <h1 tw="font-bold text-2xl leading-[34px] text-gray-900 mb-4">
            실시간 제안중인 <br />
            &apos;중복&apos;없는 &apos;진짜&apos; 매물
          </h1>
          <p tw="text-sm leading-[22px] text-gray-900">
            허위매물/중복매물 걱정없이
            <br />
            가격비교하고, 제안해보세요.
          </p>
        </div>
        <div tw="mb-[60px]">
          <Image width={340} height={520} alt="" src={Phone1} />
        </div>
        <div>
          <p tw="text-gray-900 font-bold text-2xl leading-[34px]">네고시오만의 1매물 1등록 정책</p>
          <p tw="text-sm leading-[22px] text-gray-900">같은 매물을 다른 곳에서 가격 비교할 필요가 없어요</p>
        </div>
      </div>
    </section>
  );
}
