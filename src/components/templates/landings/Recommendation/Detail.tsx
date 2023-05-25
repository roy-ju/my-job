import React from 'react';
import PhoneImage from '@/../public/static/images/landing/recommendation_phone2.png';
import Image from 'next/image';

export default function Detail() {
  return (
    <div tw="py-[60px] flex flex-col items-center">
      <p tw="text-nego-800 font-bold text-base leading-6 mb-2">#중개사 #매물추천받기</p>
      <h2 tw="text-gray-900 font-bold text-2xl leading-[34px] text-center mb-7">
        원하는 가격에
        <br /> 매물을 추천 받으세요
      </h2>
      <div>
        <Image alt="핸드폰 사진" src={PhoneImage} />
      </div>
    </div>
  );
}
