import { useRouter } from 'next/router';

import { useRouter as useCustomRouter } from '@/hooks/utils';

import Image from 'next/image';

import tw, { styled } from 'twin.macro';

import { Button, Separator } from '@/components/atoms';

import useCheckPlatform from '@/hooks/utils/useCheckPlatform';

import Routes from '@/router/routes';

import Paths from '@/constants/paths';

import EyesImage from '@/../public/static/images/image_emoji_eyes.png';

import LogoImage from '@/../public/static/images/image_logo2.png';

import InstagramIcon from '@/assets/icons/instagram_color.svg';

import NaverBlogIcon from '@/assets/icons/blog_color.svg';

const IntroButton = styled.button`
  ${tw`flex items-start gap-4 rounded-2xl [height: 112px] p-4 text-left bg-nego-100 hover:bg-nego-200`}
  ${tw`transition-all`}
`;

export default function Footer() {
  const { platform } = useCheckPlatform();

  const router = useRouter();

  const customRouter = useCustomRouter(0);

  const handleClickGuide = () => {
    router.push(`/${Routes.Intro}`);
  };

  const handleClickInstagram = () => {
    window.open(Paths.INSTAGRAM, '_blank');
  };

  const handleClickNaverBlog = () => {
    window.open(Paths.NAVER_BLOG, '_blank');
  };

  const handleClickTermsAndPolicy = () => {
    if (platform === 'pc') {
      customRouter.replace(Routes.TermsAndPolicy);
    } else {
      router.replace(Routes.TermsAndPolicy);
    }
  };

  const handleClickPrivacyPolicy = () => {
    if (platform === 'pc') {
      customRouter.replace(Routes.PrivacyPolicy);
    } else {
      router.replace(Routes.PrivacyPolicy);
    }
  };

  return (
    <div>
      <Separator tw="h-2 bg-gray-200" />
      <div tw="px-5 py-10 flex flex-col gap-5">
        <div tw="flex items-center gap-2">
          <h2 tw="text-heading_02">네고시오 사용설명서</h2>
          <Image width={20} height={20} quality={100} src={EyesImage} alt="" />
        </div>

        <IntroButton onClick={handleClickGuide}>
          <Image width={80} height={80} src={LogoImage} alt="" />
          <p tw="flex flex-col gap-2">
            <span tw="text-subhead_03 text-gray-900">모아서 비교한다!</span>
            <span tw="text-body_02 text-gray-700">
              이젠 집 찾지 말고 추천받아 비교하는 새로운 부동산 추천 플랫폼, 네고시오
            </span>
          </p>
        </IntroButton>

        <div tw="flex flex-col py-10 mt-5">
          <div tw="flex gap-5 justify-center mb-5">
            <Button size="none" variant="ghost" onClick={handleClickInstagram}>
              <InstagramIcon />
            </Button>
            <Button size="none" variant="ghost" onClick={handleClickNaverBlog}>
              <NaverBlogIcon />
            </Button>
          </div>

          <div tw="flex items-center justify-center mb-3">
            <Button size="none" variant="ghost" tw="text-body_02 text-gray-700" onClick={handleClickPrivacyPolicy}>
              개인정보처리방침
            </Button>
            <span tw="h-3 w-px bg-gray-700 mx-2" />
            <Button size="none" variant="ghost" tw="text-body_02 text-gray-700" onClick={handleClickTermsAndPolicy}>
              이용약관
            </Button>
          </div>

          <div tw="text-center text-body_01 text-gray-600">ⓒ 2023. Negocio All rights reserved.</div>
        </div>
      </div>
    </div>
  );
}
