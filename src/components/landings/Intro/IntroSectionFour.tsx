import Image from 'next/image';

import BubbleImage1 from '@/../public/static/images/landing/intro_bubble1.png';

import BubbleImage2 from '@/../public/static/images/landing/intro_bubble2.png';

export default function introSectionFour() {
  return (
    <section tw="flex flex-col items-center text-center pt-[120px]">
      <div tw="mb-10 md:mb-[72px]">
        <p tw="font-bold text-base md:text-2xl md:leading-[34px] leading-6 text-nego-800 mb-2">#헛걸음방지 #시간절약</p>
        <h1 tw="font-bold text-2xl md:text-[44px] md:leading-[64px] leading-[34px] text-gray-900 mb-4">
          거래조건을 <br />
          미리 알려드려요
        </h1>
        <p tw="text-sm md:text-2xl md:leading-10 leading-[22px] text-gray-900">
          네고시오가 협상에 필요한 모든 거래 조건을 알려드려요.
          <br />
          상대방이 원하는 조건을 확인하고 헛걸음을 방지할 수 있어요.
        </p>
      </div>
      <div tw="flex flex-col gap-10 md:flex-row md:gap-[120px] md:justify-between">
        <div>
          <Image width={340} height={356} alt="" src={BubbleImage1} />
        </div>
        <div>
          <Image width={340} height={356} alt="" src={BubbleImage2} />
        </div>
      </div>
    </section>
  );
}
