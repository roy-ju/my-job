import Image from 'next/image';

import PhoneImage from '@/../public/static/images/landing/recommendation_phone2.png';

import MypageImage from '@/../public/static/images/landing/recommendation_mypage.png';

export default function SectionTwo() {
  return (
    <section tw="py-[60px] flex flex-col items-center">
      <p tw="text-nego-800 font-bold text-base leading-6 mb-2">#중개사 #매물추천받기</p>
      <h1 tw="text-gray-900 font-bold text-2xl leading-[34px] text-center mb-7">
        원하는 가격에
        <br /> 매물을 추천 받으세요
      </h1>
      <div tw="mb-[60px]">
        <Image width={320} height={620} alt="핸드폰 사진" src={PhoneImage} />
      </div>
      <div tw="text-center">
        <div tw="mb-7">
          <strong tw="mb-2 text-gray-900 text-base leading-6 font-bold">Step 2. 추천 받은 매물 확인</strong>
          <p tw="text-sm leading-[22px] text-gray-900">마이페이지에서 확인</p>
          <p tw="text-sm leading-[22px] text-gray-900">매물상세 정보 확인</p>
          <p tw="text-sm leading-[22px] text-gray-900">바로 네고 협의 → 중개사와 채팅가능</p>
        </div>
        <div tw="mb-10">
          <strong tw="mb-2 text-gray-900 text-base leading-6 font-bold">Step 3. 중개사와 협의</strong>
          <p tw="text-sm leading-[22px] text-gray-900">채팅을 통한 추가 협의/방문예약</p>
        </div>
        <div>
          <Image alt="마이페이지" width={340} height={257} src={MypageImage} />
        </div>
      </div>
    </section>
  );
}
