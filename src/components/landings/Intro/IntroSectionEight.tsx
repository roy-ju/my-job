import Link from 'next/link';

import ArrowIcon from '@/assets/icons/arrow_right.svg';

export default function IntroSectionEight() {
  return (
    <section tw="flex flex-col items-center text-center py-[60px] md:py-[120px] px-5 md:px-10 xl:px-20 ">
      <div tw="flex gap-3 md:gap-10 justify-between md:justify-center mb-10 w-full md:mb-[120px]">
        <Link
          tw="max-w-[350px] flex-1 hover:opacity-70 transition-opacity px-3 py-2 md:py-5 md:px-8 md:text-2xl md:leading-10 text-xs leading-5 text-white [background: linear-gradient(180deg, #715FE2 0%, #5661D1 100%)] rounded-lg [box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.14)] [letter-spacing: -0.25px] md:rounded-2xl"
          href="/"
        >
          <div tw="text-left">네고시오 서비스</div>
          <div tw="flex items-center justify-between">
            <div>바로가기</div>
            <ArrowIcon tw="md:w-10 md:h-10" />
          </div>
        </Link>
        <a
          tw="max-w-[350px] flex-1 hover:opacity-70 transition-opacity px-3 py-2 md:py-5 md:px-8 md:text-2xl md:leading-10 text-xs leading-5 text-white [background: linear-gradient(180deg, #715FE2 0%, #5661D1 100%)] rounded-lg [box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.14)] [letter-spacing: -0.25px] md:rounded-2xl"
          target="_blank"
          href="https://agent.negocio.co.kr/"
          rel="noopener noreferrer"
        >
          <div tw="text-left">중개사 서비스</div>
          <div tw="flex items-center justify-between">
            <div>바로가기</div>
            <ArrowIcon tw="md:w-10 md:h-10" />
          </div>
        </a>
      </div>
      <h1 tw="font-bold text-lg leading-[32px] text-gray-800 md:text-4xl md:leading-[52px]">
        네고시오는 대한민국 최대 신용평가회사
        <br />
        NICE평가정보와 함께 합니다.
      </h1>
    </section>
  );
}
