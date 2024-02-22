import { useState } from 'react';

import { useRouter } from 'next/router';

import dynamic from 'next/dynamic';

import Image from 'next/image';

import WomanImage from '@/../public/static/images/image_emoji_woman.png';

import useCheckPlatform from '@/hooks/useCheckPlatform';

import Routes from '@/router/routes';

import NavigationButton from './NavigationButton';

const DanjiListPopup = dynamic(() => import('@/components/organisms/popups/DanjiListPopup'), { ssr: false });

type NavigationGuideProps = { isInAppBrowser: boolean; handleOpenAppInstallPopup: () => void };

export default function NavigationGuide({ isInAppBrowser, handleOpenAppInstallPopup }: NavigationGuideProps) {
  const router = useRouter();

  const { platform } = useCheckPlatform();

  const [openDanjiList, setOpenDanjiList] = useState(false);

  const handleOpenDanjiListPopup = () => {
    setOpenDanjiList(true);
  };

  const handleCloseDanjiListPopup = () => {
    setOpenDanjiList(false);
  };

  const handleSummitDanji = (danjiID: number) => {
    handleCloseDanjiListPopup();

    if (platform === 'pc') {
      router.push(`/${Routes.DanjiDetail}/${Routes.DanjiRealPriceDetail}?danjiID=${danjiID}`);
    } else {
      router.push(`/${Routes.EntryMobile}/${Routes.DanjiRealPriceDetail}?danjiID=${danjiID}`);
    }
  };

  return (
    <>
      <section tw="px-5 py-10 flex flex-col gap-5">
        <div tw="flex items-center gap-2">
          <h2 tw="text-heading_02">네고시오를 이렇게 사용해보세요</h2>
          <Image width={20} height={20} quality={100} src={WomanImage} alt="" />
        </div>
        <div tw="grid grid-cols-2 grid-rows-2 gap-4">
          <NavigationButton variant="map" />
          <NavigationButton variant="realprice" handleOpenDanjiListPopup={handleOpenDanjiListPopup} />
          <NavigationButton variant="law" />
          <NavigationButton
            variant="register"
            isInAppBrowser={isInAppBrowser}
            handleOpenAppInstallPopup={handleOpenAppInstallPopup}
          />
        </div>
      </section>

      {openDanjiList && (
        <DanjiListPopup
          onClickClose={handleCloseDanjiListPopup}
          onSubmit={(v) => {
            handleSummitDanji(v);
          }}
        />
      )}
    </>
  );
}
