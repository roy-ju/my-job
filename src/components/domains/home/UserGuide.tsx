import React from 'react';

import { useRouter } from 'next/router';

import Image from 'next/image';

import tw, { styled } from 'twin.macro';

import Routes from '@/router/routes';

import EyesImage from '@/../public/static/images/image_emoji_eyes.png';

import LogoImage from '@/../public/static/images/home/image_logo2.png';

const IntroButton = styled.button`
  ${tw`flex items-start gap-4 rounded-2xl [height: 112px] p-4 text-left bg-nego-100 hover:bg-nego-200`}
  ${tw`transition-all`}
`;

export default function UserGuide() {
  const router = useRouter();

  const handleClickGuide = () => {
    router.push(`/${Routes.Intro}`);
  };
  return (
    <section tw="py-10 px-5 flex flex-col gap-5">
      <div tw="flex items-center gap-2">
        <h2 tw="text-heading_02">네고시오 사용설명서</h2>
        <Image width={20} height={20} quality={100} src={EyesImage} alt="" />
      </div>

      <IntroButton onClick={handleClickGuide}>
        <Image width={80} height={80} src={LogoImage} alt="" />
        <p tw="flex flex-col gap-2">
          <span tw="text-subhead_03 text-gray-900">모아서 비교한다!</span>
          <span tw="text-body_02 text-gray-700">
            {'매물 검색만으로 집 구하는 것은 안녕!\n매물 추천받아 비교하고, 네고한다.'}
          </span>
        </p>
      </IntroButton>
    </section>
  );
}