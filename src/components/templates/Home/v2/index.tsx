import { useState } from 'react';

import { useRouter } from 'next/router';

import { useRouter as useCustomRouter } from '@/hooks/utils';

import useCheckPlatform from '@/hooks/utils/useCheckPlatform';

import { OverlayPresenter } from '@/components/molecules';

import Routes from '@/router/routes';

import { DanjiList } from '@/components/organisms';

import Header from './components/Header';

import Contents from './components/Contents';

import Footer from './components/Footer';

export default function HomeV2Template() {
  const { platform } = useCheckPlatform();

  const router = useRouter();

  const customRouter = useCustomRouter(0);

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
      customRouter.replace(Routes.DanjiDetail, {
        searchParams: {
          danjiID: `${danjiID}`,
        },
      });
    } else {
      router.push(`/${Routes.EntryMobile}/${Routes.DanjiDetail}?danjiID=${danjiID}`);
    }
  };

  return (
    <>
      <div tw="h-full flex flex-col">
        <Header />
        <div tw="relative flex-1 min-h-0 overflow-y-auto overflow-x-hidden">
          <Contents handleOpenDanjiListPopup={handleOpenDanjiListPopup} />
          <Footer />
        </div>
      </div>

      {openDanjiList && (
        <OverlayPresenter>
          <div tw="bg-white w-[380px] h-[600px] rounded-lg shadow">
            <DanjiList tw="h-full">
              <DanjiList.Header onClickClose={handleCloseDanjiListPopup} />
              <DanjiList.AddressSearchForm
                onSubmit={(danjiID) => {
                  handleSummitDanji(danjiID);
                }}
              />
            </DanjiList>
          </div>
        </OverlayPresenter>
      )}
    </>
  );
}
