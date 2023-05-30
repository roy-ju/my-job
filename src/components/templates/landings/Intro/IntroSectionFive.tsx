import Image from 'next/image';
import React from 'react';
import Phone1 from '@/../public/static/images/landing/intro_phone3.png';
import Phone2 from '@/../public/static/images/landing/intro_phone4.png';

export default function IntroSectionFive({ isMobileSize }: { isMobileSize: boolean }) {
  return (
    <section tw="bg-nego-100 py-[60px] md:pt-[120px] md:pb-0 md:px-10 xl:px-20  px-5">
      <div tw="mb-10 md:h-[705px] md:flex md:flex-col md:flex-wrap md:mb-0">
        <div tw="mb-10 md:order-1 md:mb-[120px]">
          <p tw="font-bold text-base md:text-2xl md:leading-[34px] leading-6 text-nego-800 mb-2 md:mb-3">
            #네고매물 #실매물
          </p>
          <h1 tw="font-bold text-2xl leading-[34px] text-gray-900 mb-4 md:mb-10 md:text-[44px] md:leading-[64px]">
            실시간 제안중인 <br />
            &apos;중복&apos;없는 &apos;진짜&apos; 매물
          </h1>
          <p tw="text-sm md:text-2xl md:leading-10 leading-[22px] text-gray-900">
            허위매물/중복매물 걱정없이
            <br />
            가격비교하고, 제안해보세요.
          </p>
        </div>
        <div tw="mb-[60px] md:order-3">
          {isMobileSize ? (
            <Image width={340} height={520} alt="" src={Phone1} />
          ) : (
            <Image height={705} tw="ml-auto" alt="" src={Phone2} />
          )}
        </div>
        <div tw="md:order-2">
          <p tw="text-gray-900 font-bold text-2xl md:text-4xl md:leading-[52px] leading-[34px] mb-4 md:mb-10">
            네고시오만의 1매물 1등록 정책
          </p>
          <p tw="text-sm leading-[22px] md:text-2xl md:leading-10 text-gray-900">
            같은 매물을 다른 곳에서 가격 비교할 필요가 없어요
          </p>
        </div>
      </div>
      <div className="carousel" tw="-translate-y-[calc(50% - 30px)]">
        <div
          className="item"
          tw="p-5 md:p-10 w-[320px] md:w-[540px] [border-radius: 92px] [background: rgba(243, 240, 255, 0.8)] [backdrop-filter: blur(2px)]"
        >
          <p tw="text-sm md:text-base md:leading-6 leading-[22px] text-nego-1000">Dofe***@naver.com l 2022-06-10</p>
          <div role="presentation" tw="my-4 h-[1px] [background-color:  #5F3DC4] scale-y-50" />
          <p tw="text-sm md:text-2xl md:leading-10 leading-[22px] font-light text-nego-1000">
            다른 서비스는 <span tw="font-medium">같은 매물이 여러개 올라와</span> 있어서 혼란스러운데 네고시오에서는{' '}
            <span tw="font-medium">바로 집주인이랑 가격 결정</span>을 하니
            <span tw="font-medium">이곳저곳 볼 필요가 없어요.</span>
          </p>
        </div>
      </div>
    </section>
  );
}
