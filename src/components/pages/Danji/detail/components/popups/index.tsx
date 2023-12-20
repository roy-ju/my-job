import { OverlayPresenter, Popup } from '@/components/molecules';

import { SharePopup } from '@/components/organisms';

import { usePopupDisaptchStore, usePopupStore } from '@/providers/PopupProvider';

import { useCallback } from 'react';

import useDanjiDetailStore from '../../hooks/useDanjiDetailStore';

import useDanjiShareHandler from '../../hooks/useDanjiShareHandler';

export default function Popups() {
  const store = useDanjiDetailStore();

  const popup = usePopupStore();

  const popupDispatch = usePopupDisaptchStore();

  const { onClickShare, setCopyUrl } = useDanjiShareHandler();

  const handleClosePopup = useCallback(() => {
    popupDispatch?.('');
  }, [popupDispatch]);

  if (popup === 'danjiShared') {
    return (
      <OverlayPresenter>
        <SharePopup
          onClickOutside={handleClosePopup}
          onClickShareViaKakao={() => onClickShare(store?.danji, handleClosePopup)}
          onClickCopyUrl={() => setCopyUrl(store?.danji, handleClosePopup)}
        />
      </OverlayPresenter>
    );
  }

  if (popup === 'impossibleRecommendation') {
    return (
      <OverlayPresenter>
        <Popup>
          <Popup.ContentGroup tw="[text-align: center]">
            <Popup.SmallTitle>해당 지역은 서비스 준비중입니다.</Popup.SmallTitle>
          </Popup.ContentGroup>
          <Popup.ButtonGroup>
            <Popup.ActionButton onClick={handleClosePopup}>확인</Popup.ActionButton>
          </Popup.ButtonGroup>
        </Popup>
      </OverlayPresenter>
    );
  }

  if (popup === 'needMoreVerificationAddress') {
    return (
      <OverlayPresenter>
        <Popup>
          <Popup.ContentGroup tw="[text-align: center]">
            <Popup.SubTitle>
              이 단지의 집주인만 매물등록이 가능합니다.
              <br />
              우리집을 인증하시겠습니까?
            </Popup.SubTitle>
          </Popup.ContentGroup>
          <Popup.ButtonGroup>
            <Popup.CancelButton onClick={handleClosePopup}>취소</Popup.CancelButton>
            <Popup.ActionButton
              onClick={() => {
                handleClosePopup();

                // router.push({
                //   pathname: `/${Routes.EntryMobile}/${Routes.MyAddress}`,
                //   query: {
                //     origin: router.asPath,
                //     ...(router?.query?.danjiID ? { danjiID: router?.query?.danjiID } : {}),
                //   },
                // });
              }}
            >
              인증하기
            </Popup.ActionButton>
          </Popup.ButtonGroup>
        </Popup>
      </OverlayPresenter>
    );
  }

  if (popup === 'verificationAddress') {
    return (
      <OverlayPresenter>
        <Popup>
          <Popup.ContentGroup tw="[text-align: center]">
            <Popup.SubTitle>
              추가로 매물등록이 가능한 우리집 정보가 없습니다.
              <br />
              우리집을 추가 인증하시겠습니까?
            </Popup.SubTitle>
          </Popup.ContentGroup>
          <Popup.ButtonGroup>
            <Popup.CancelButton onClick={handleClosePopup}>취소</Popup.CancelButton>
            <Popup.ActionButton
              onClick={() => {
                handleClosePopup();

                // router.push({
                //   pathname: `/${Routes.EntryMobile}/${Routes.MyAddress}`,
                //   query: {
                //     origin: router.asPath,
                //     ...(router?.query?.danjiID ? { danjiID: router?.query?.danjiID } : {}),
                //   },
                // });
              }}
            >
              인증하기
            </Popup.ActionButton>
          </Popup.ButtonGroup>
        </Popup>
      </OverlayPresenter>
    );
  }

  return null;
}
