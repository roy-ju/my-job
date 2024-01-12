import { useRouter } from 'next/router';

import Image from 'next/image';

import tw, { styled } from 'twin.macro';

import { useRouter as useCustomRouter } from '@/hooks/utils';

import { useAuth } from '@/hooks/services';

import useMap from '@/states/map';

import useCheckPlatform from '@/hooks/utils/useCheckPlatform';

import GraphImage from '@/../public/static/images/home/image_graph.png';

import HomeImage from '@/../public/static/images/home/image_home.png';

import LawImage from '@/../public/static/images/home/image_law.png';

import MapImage from '@/../public/static/images/home/image_map.png';

import Routes from '@/router/routes';

type NavigationButtonProps = {
  variant: 'map' | 'realprice' | 'law' | 'register';
  handleOpenDanjiListPopup?: () => void;
  handleOpenNeedVerifyAddressPopup?: () => void;
};

const variants = {
  map: tw`bg-blue-100 hover:bg-blue-200`,
  realprice: tw`bg-green-100 hover:bg-green-200`,
  law: tw`bg-yellow-100 hover:bg-yellow-200`,
  register: tw`[background-color:rgba(255, 226, 228, 0.5)] hover:bg-red-100`,
};

const Button = styled.button<{ variant: 'map' | 'realprice' | 'law' | 'register' }>`
  ${tw`rounded-2xl [height: 174px] p-4 text-left`}
  ${tw`transition-all`}
  ${({ variant }) => variant && variants[variant]}
`;

export default function NavigationButton({ variant, handleOpenDanjiListPopup }: NavigationButtonProps) {
  const { user } = useAuth();

  const map = useMap();

  const { platform } = useCheckPlatform();

  const router = useRouter();

  const customRouter = useCustomRouter(0);

  const handleClickCounseling = () => {
    if (platform === 'pc') {
      customRouter.replace(Routes.LawQna);
    } else {
      router.push(`/${Routes.EntryMobile}/${Routes.LawQna}`);
    }
  };

  const handleClickMap = () => {
    if (platform === 'pc') {
      customRouter.replace(Routes.Map);
      map.naverMap?.setZoom(16, true);
      window.Negocio.callbacks.selectListingHomeButton();
    } else {
      router.push(
        { pathname: `/${Routes.EntryMobile}/${Routes.Map}`, query: { listing: 'listingBtn' } },
        `/${Routes.EntryMobile}/${Routes.Map}`,
      );
    }
  };

  const handleClickHomeRegister = () => {
    const pcRedirectURI = `/${Routes.My}?default=2`;
    const mobileRedirectURI = `/${Routes.EntryMobile}${pcRedirectURI}`;

    if (!user) {
      if (platform === 'pc') {
        customRouter.replace(Routes.Login, {
          persistParams: true,
          searchParams: { redirect: pcRedirectURI },
        });
      } else {
        router.push({
          pathname: `/${Routes.EntryMobile}/${Routes.Login}`,
          query: {
            redirect: mobileRedirectURI,
          },
        });
      }
      return;
    }

    if (!user?.isVerified) {
      if (platform === 'pc') {
        customRouter.replace(Routes.VerifyCi, {
          persistParams: true,
          searchParams: { redirect: pcRedirectURI },
        });
      } else {
        router.push({
          pathname: `/${Routes.EntryMobile}/${Routes.VerifyCi}`,
          query: {
            redirect: mobileRedirectURI,
          },
        });
      }
      return;
    }

    if (platform === 'pc') {
      customRouter.replace(Routes.My, {
        searchParams: { default: '2' },
      });
    } else {
      router.push(`/${Routes.EntryMobile}/${Routes.My}?default=2`);
    }
  };

  const ButtonObject = {
    map: {
      title: '지도 검색',
      description: '지도에서 검색해서\n집 구하기',
      path: MapImage,
      onClick: handleClickMap,
    },
    realprice: {
      title: '실거래가',
      description: '관심있는 단지의\n실거래가 분석하기',
      path: GraphImage,
      onClick: handleOpenDanjiListPopup,
    },
    law: {
      title: '무료 법률 상담',
      description: '어려운 부동산 법률,\n변호사에게 물어보기',
      path: LawImage,
      onClick: handleClickCounseling,
    },
    register: {
      title: '우리집 내놓기',
      description: '우리집 등록하고\n가격제안 받아보기',
      path: HomeImage,
      onClick: handleClickHomeRegister,
    },
  };

  return (
    <Button variant={variant} onClick={ButtonObject[variant].onClick}>
      <h3 tw="text-subhead_03 text-gray-900">{ButtonObject[variant].title}</h3>
      <p tw="px-1 mt-2 text-body_02 text-gray-700 whitespace-pre-line mb-1">{ButtonObject[variant].description}</p>
      <div tw="flex items-center justify-end">
        <Image width={58} height={58} quality={100} src={ButtonObject[variant].path} alt="" />
      </div>
    </Button>
  );
}
