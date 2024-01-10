import { useState, useEffect } from 'react';

import Link from 'next/link';

import Image from 'next/image';

import TitleImage from '@/../public/static/images/landing/recommendation_title.png';

import TitleImage2 from '@/../public/static/images/landing/recommendation_title2.png';

import PhoneImage from '@/../public/static/images/landing/recommendation_phone1.png';

export default function SectionOne() {
  const [isMobileSize, setIsMobileSize] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const { innerWidth } = window;
      setIsMobileSize(innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div tw="[background-color: #F3F0FF]">
      <section tw="max-w-[1280px] xl:mx-auto px-[30px] md:px-10 xl:px-20 pt-[60px] md:py-[70px] text-center  flex flex-col md:flex-row items-center md:justify-between">
        <div>
          <h1 tw="mb-7 md:mb-[40px]">
            {isMobileSize ? (
              <Image
                tw="mx-auto"
                width={178}
                height={112}
                alt="부동산 네고, 눈치보지 말고 쉽고 편하게"
                src={TitleImage}
              />
            ) : (
              <Image tw="" width={348} height={200} alt="부동산 네고, 눈치보지 말고 쉽고 편하게" src={TitleImage2} />
            )}
          </h1>
          <p tw="text-center text-base md:text-left md:text-2xl md:leading-[34px] leading-6 text-gray-900 mb-3 md:mb-5">
            <span tw="text-nego-800 font-bold">100% 네고</span>가능한 매물을 찾아드려요!
          </p>
          <div tw="flex items-center gap-5">
            <Link
              tw="border border-nego-800 block mx-auto md:mr-auto md:ml-0 mb-5 bg-white text-nego-800 rounded-full w-[148px] md:w-[230px] py-3 md:py-[16px] font-bold md:text-[20px] text-sm leading-[22px] md:leading-[28px] hover:opacity-70 transition-opacity [box-shadow: 0px 4px 12px 0px rgba(0, 0, 0, 0.1)]"
              href="/"
            >
              네고시오 바로가기
            </Link>
            <Link
              tw="block mx-auto md:mr-auto md:ml-0 mb-5 bg-nego-800 text-white rounded-full w-[148px] md:w-[230px] py-3 md:py-[16px] font-bold md:text-[20px] text-sm leading-[22px] md:leading-[28px] hover:opacity-70 transition-opacity [box-shadow: 0px 4px 12px 0px rgba(0, 0, 0, 0.1)]"
              href="/suggestGuide"
            >
              네고 매물 추천받기
            </Link>
          </div>
        </div>
        <div tw="h-[332px] overflow-hidden md:h-auto ">
          <Image
            style={{
              display: 'block',
              boxShadow: '20px 32px 56px 0px rgba(0, 0, 0, 0.1)',
            }}
            width={320}
            height={620}
            alt="핸드폰 사진"
            src={PhoneImage.src}
          />
        </div>
      </section>
    </div>
  );
}
