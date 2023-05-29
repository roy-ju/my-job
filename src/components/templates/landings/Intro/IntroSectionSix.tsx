import Image from 'next/image';
import React from 'react';
import Chat1 from '@/../public/static/images/landing/intro_chat_recieve1.png';
import Chat2 from '@/../public/static/images/landing/intro_chat_send1.png';
import Chat3 from '@/../public/static/images/landing/intro_chat_recieve2.png';
import Chat4 from '@/../public/static/images/landing/intro_chat_send2.png';

export default function IntroSectionSix() {
  return (
    <section tw=" px-5 py-[60px] md:py-[120px] md:px-10 xl:px-20 md:flex md:justify-between md:items-center">
      <div tw="mb-10 md:mb-0 md:self-start md:w-1/2">
        <p tw="text-nego-800 font-bold text-base leading-6 mb-2 md:mb-3 md:text-2xl md:leading-[34px]">
          #개인정보보호 #채팅문의
        </p>
        <h1 tw="text-gray-900 font-bold text-2xl leading-[34px] mb-4 md:mb-10 md:text-[44px] md:leading-[64px]">
          문의는 안전하게
          <br />
          방문예약은 간편하게
        </h1>
        <p tw="text-gray-900 text-sm leading-[22px] md:text-2xl md:leading-10">
          이름, 전화번호 공유없이 문의하고
          <br /> 간편하게 방문예약까지 할 수 있어요.
        </p>
      </div>
      <div tw="flex flex-col gap-6 md:gap-10 md:flex-1">
        <div>
          <Image width={340} height={62} alt="" src={Chat1} />
        </div>
        <div>
          <Image tw="md:ml-auto" width={340} height={36} alt="" src={Chat2} />
        </div>
        <div>
          <Image width={340} height={62} alt="" src={Chat3} />
        </div>
        <div>
          <Image tw="md:ml-auto" width={340} height={36} alt="" src={Chat4} />
        </div>
      </div>
    </section>
  );
}
