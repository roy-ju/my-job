import { useState } from 'react';

import { useRouter } from 'next/router';

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

  const [openNeedVerifyAddress, setOpenNeedVerifyAddress] = useState(false);

  const [openDanjiList, setOpenDanjiList] = useState(false);

  const handleOpenDanjiListPopup = () => {
    setOpenDanjiList(true);
  };

  const handleCloseDanjiListPopup = () => {
    setOpenDanjiList(false);
  };

  const handleOpenNeedVerifyAddressPopup = () => {
    setOpenNeedVerifyAddress(true);
  };

  const handleCloseNeedVerifyAddressPopup = () => {
    setOpenNeedVerifyAddress(false);
  };

  const handleVerify = () => {
    handleCloseNeedVerifyAddressPopup();

    if (platform === 'pc') {
      router.push(`/${Routes.My}/${Routes.MyAddress}?origin=${router.asPath}`);
    } else {
      router.push(`/${Routes.EntryMobile}/${Routes.MyAddress}?origin=${router.asPath}`);
    }
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
      <div tw="h-full flex flex-col">
        <Header />
        <div tw="relative flex-1 min-h-0 overflow-y-auto overflow-x-hidden">
          <Contents
            handleOpenDanjiListPopup={handleOpenDanjiListPopup}
            handleOpenNeedVerifyAddressPopup={handleOpenNeedVerifyAddressPopup}
          />
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

      {openNeedVerifyAddress && (
        <OverlayPresenter>
          <Popup>
            <Popup.ContentGroup tw="[text-align: center]">
              <Popup.SubTitle>
                매물등록을 위해서는 집주인 인증이 필요합니다.
                <br />
                우리집을 인증하시겠습니까?
              </Popup.SubTitle>
            </Popup.ContentGroup>
            <Popup.ButtonGroup>
              <Popup.CancelButton onClick={handleCloseNeedVerifyAddressPopup}>취소</Popup.CancelButton>
              <Popup.ActionButton onClick={handleVerify}>인증하기</Popup.ActionButton>
            </Popup.ButtonGroup>
          </Popup>
        </OverlayPresenter>
      )}
    </>
  );
}
