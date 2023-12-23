import { useState } from 'react';

import { useRouter } from 'next/router';

import { useRouter as useCustomRouter } from '@/hooks/utils';

import useCheckPlatform from '@/hooks/utils/useCheckPlatform';

import { OverlayPresenter, Popup } from '@/components/molecules';

import Routes from '@/router/routes';

import { DanjiList } from '@/components/organisms';

import Header from './components/Header';

import Contents from './components/Contents';

import Footer from './components/Footer';

export default function HomeV2Template() {
  const { platform } = useCheckPlatform();

  const router = useRouter();

  const customRouter = useCustomRouter(0);

  const [openRegisterMyHomePopup, setOpenRegisterMyHome] = useState(false);

  const [openDanjiList, setOpenDanjiList] = useState(false);

  const handleOpenRegisterMyHomePopup = () => {
    setOpenRegisterMyHome(true);
  };

  const handleCloseRegisterMyHomePopup = () => {
    setOpenRegisterMyHome(false);
  };

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

  const handleClickActionButton = () => {
    if (platform === 'pc') {
      customRouter.replace(Routes.My, { searchParams: { default: '2' }, persistParams: true });
    } else {
      router.push(`/${Routes.EntryMobile}/${Routes.My}?default=2`);
    }
  };

  return (
    <>
      <div tw="h-full flex flex-col">
        <Header />
        <div tw="relative flex-1 min-h-0 overflow-y-auto overflow-x-hidden">
          <Contents
            handleOpenRegisterMyHomePopup={handleOpenRegisterMyHomePopup}
            handleOpenDanjiListPopup={handleOpenDanjiListPopup}
          />
          <Footer />
        </div>
      </div>

      {openRegisterMyHomePopup && (
        <OverlayPresenter>
          <Popup>
            <Popup.ContentGroup tw="py-6">
              <Popup.SubTitle tw="text-center">
                이미 등록된 주소가 있습니다.
                <br />
                우리집 추가는 마이페이지에서 가능합니다.
              </Popup.SubTitle>
            </Popup.ContentGroup>
            <Popup.ButtonGroup>
              <Popup.CancelButton onClick={handleCloseRegisterMyHomePopup}>닫기</Popup.CancelButton>
              <Popup.ActionButton onClick={handleClickActionButton}>마이페이지 이동</Popup.ActionButton>
            </Popup.ButtonGroup>
          </Popup>
        </OverlayPresenter>
      )}

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
