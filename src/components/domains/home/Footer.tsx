import { useRouter } from 'next/router';

import { Button } from '@/components/atoms';

import useCheckPlatform from '@/hooks/useCheckPlatform';

import useIsNativeApp from '@/hooks/useIsNativeApp';

import Routes from '@/router/routes';

import Paths from '@/constants/paths';

import NaverBlogIcon from '@/assets/icons/blog_color.svg';

import KakaoChanelIcon from '@/assets/icons/kakao_chanel.svg';

import InstagramIcon from '@/assets/icons/instagram_color.svg';

import FacebookIcon from '@/assets/icons/facebook_color.svg';

import AppleIcon from '@/assets/icons/apple_store.svg';

import GooglePlayIcon from '@/assets/icons/google_store.svg';

import { MarginTopFourty, MarginTopTwenty, MarginTopTwentyFour } from '@/components/atoms/Margin';

import GoAgentSite from './GoAgentSite';

export default function Footer() {
  const { platform } = useCheckPlatform();

  const isNativeApp = useIsNativeApp();

  const router = useRouter();

  const handleClickInstagram = () => {
    window.open(Paths.INSTAGRAM, '_blank');
  };

  const handleClickNaverBlog = () => {
    window.open(Paths.NAVER_BLOG, '_blank');
  };

  const handleClickFacebook = () => {
    window.open(Paths.FACEBOOK, '_blank');
  };

  const handleClickKakaoChanel = () => {
    window.open(Paths.KAKAO_CHANEL, '_blank');
  };

  const handleClickTermsAndPolicy = () => {
    if (platform === 'pc') {
      router.push(`/${Routes.TermsAndPolicy}?entry=${Routes.Home}`);
    } else {
      router.push(`/${Routes.EntryMobile}/${Routes.TermsAndPolicy}`);
    }
  };

  const handleClickPrivacyPolicy = () => {
    if (platform === 'pc') {
      router.push(`/${Routes.PrivacyPolicy}?entry=${Routes.Home}`);
    } else {
      router.push(`/${Routes.EntryMobile}/${Routes.PrivacyPolicy}`);
    }
  };

  const handleClickServicePage = () => {
    if (platform === 'pc') {
      router.push(`/${Routes.Intro}`);
    } else {
      router.push(`/${Routes.EntryMobile}/${Routes.Intro}`);
    }
  };

  const handleClickAppStore = () => {
    window.open(Paths.APP_STORE, '_blank');
  };

  const handleClickGooglePlay = () => {
    window.open(Paths.GOOGLE_PLAY_STORE, '_blank');
  };

  return (
    <footer tw="pb-10 flex flex-col bg-gray-100">
      <MarginTopTwentyFour />
      <GoAgentSite />
      <MarginTopFourty />

      <div tw="flex gap-5 justify-center px-5 pt-10">
        <Button size="none" variant="ghost" onClick={handleClickNaverBlog}>
          <NaverBlogIcon />
        </Button>
        <Button size="none" variant="ghost" onClick={handleClickKakaoChanel}>
          <KakaoChanelIcon />
        </Button>
        <Button size="none" variant="ghost" onClick={handleClickInstagram}>
          <InstagramIcon />
        </Button>
        <Button size="none" variant="ghost" onClick={handleClickFacebook}>
          <FacebookIcon />
        </Button>
      </div>

      <MarginTopTwenty />

      {!isNativeApp && platform === 'mobile' && (
        <div>
          <div tw="flex gap-3 px-5">
            <Button tw="flex-1 p-0" variant="outlined" size="big" onClick={handleClickAppStore}>
              <AppleIcon tw="w-6 h-6 mr-2" />
              <span tw="whitespace-nowrap">앱스토어에서 설치</span>
            </Button>
            <Button tw="flex-1 p-0" variant="outlined" size="big" onClick={handleClickGooglePlay}>
              <GooglePlayIcon tw="w-6 h-6 mr-2" />
              <span tw="whitespace-nowrap">구글플레이에서 설치</span>
            </Button>
          </div>
          <MarginTopTwenty />
        </div>
      )}

      <div tw="flex items-center justify-center px-5 mb-3">
        <Button size="none" variant="ghost" tw="text-body_02 text-gray-700" onClick={handleClickServicePage}>
          서비스 소개
        </Button>
        <span tw="h-3 w-px bg-gray-700 mx-2" />
        <Button size="none" variant="ghost" tw="text-body_02 text-gray-700" onClick={handleClickPrivacyPolicy}>
          개인정보처리방침
        </Button>
        <span tw="h-3 w-px bg-gray-700 mx-2" />
        <Button size="none" variant="ghost" tw="text-body_02 text-gray-700" onClick={handleClickTermsAndPolicy}>
          이용약관
        </Button>
      </div>
      <div tw="text-center text-body_01 text-gray-600 px-5">ⓒ 2023. Negocio All rights reserved.</div>
    </footer>
  );
}
