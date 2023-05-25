import Image from 'next/image';
import React from 'react';
import TitleImage from '@/../public/static/images/landing/recommendation_title.png';
import PhoneImage from '@/../public/static/images/landing/recommendation_phone1.png';

export default function Main() {
  return (
    <div tw="px-[30px] pt-[60px] text-center [background-color: #F3F0FF] flex flex-col items-center">
      <div>
        <h1 tw="mb-7">
          <Image tw="mx-auto" width={178} height={112} alt="부동산 네고, 눈치보지 말고 쉽고 편하게" src={TitleImage} />
        </h1>
        <p tw="text-base leading-6 text-gray-900 mb-3">
          <span tw="text-nego-800 font-bold">100% 네고</span>가능한 매물을 찾아드려요!
        </p>
        <button
          tw="mb-5 bg-nego-800 text-white rounded-full w-[173px] py-3 font-bold text-sm leading-[22px]"
          type="button"
        >
          네고 매물 추천받기
        </button>
      </div>
      <div tw="h-[332px] overflow-hidden ">
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
    </div>
  );
}
