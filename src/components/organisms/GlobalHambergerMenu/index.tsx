import { OverlayPresenter, Popup } from '@/components/molecules';

import RefreshOrangeIcon from '@/assets/icons/refresh_orange.svg';

import HouseGreenCheckIcon from '@/assets/icons/house_green_check.svg';

import QuestionFlagIcon from '@/assets/icons/question_flag.svg';

import Menu from '@/assets/icons/menu.svg';

import useGlobalHamberMenu from './hooks/useGlobalHamberMenu';

export default function GlobalHambergerMenu() {
  const {
    styles,
    attributes,
    outsideRef,
    isOpen,
    openVerificationAddressPopup,
    openNeedMoreVerificationAddressPopup,
    handleHambergerButtonClick,
    setReferenceElement,
    setPopperElement,
    handleClickQna,
    handleClickListingCreateAddress,
    handleClickAgentSite,
    handleConfirmVerificationAddressPopup,
    handleConfirmNeedMoreVerificationAddressPopup,
    handleCloseVerificationAddressPopup,
    handleCloseNeedMoreVerificationAddressPopup,
  } = useGlobalHamberMenu();

  return (
    <>
      <button
        type="button"
        onClick={handleHambergerButtonClick}
        ref={setReferenceElement}
        tw="w-full h-[5.25rem] flex justify-center items-center py-5 mb-5 relative"
      >
        <Menu />
      </button>

      {isOpen && (
        <div ref={setPopperElement} style={styles.popper} {...attributes.popper} tw="z-50">
          <div ref={outsideRef} tw="bg-white rounded-lg py-1 flex flex-col shadow">
            <button
              type="button"
              tw="text-left  font-bold flex gap-2 py-4 px-4 text-b2 text-gray-1000 leading-4 hover:bg-gray-100"
              onClick={handleClickAgentSite}
            >
              <RefreshOrangeIcon /> 중개사 사이트
            </button>
            <button
              type="button"
              tw="py-4 text-left flex gap-2 font-bold px-4 text-b2 text-gray-1000 leading-4 hover:bg-gray-100"
              onClick={handleClickListingCreateAddress}
            >
              <HouseGreenCheckIcon /> 집 내놓기
            </button>
            <button
              type="button"
              tw="py-4 px-4 text-left flex gap-2 text-b2 font-bold text-gray-1000 leading-4 hover:bg-gray-100"
              onClick={handleClickQna}
            >
              <QuestionFlagIcon /> 1:1 문의
            </button>
          </div>
        </div>
      )}

      {openVerificationAddressPopup && (
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
              <Popup.CancelButton onClick={handleCloseVerificationAddressPopup}>취소</Popup.CancelButton>
              <Popup.ActionButton onClick={handleConfirmVerificationAddressPopup}>인증하기</Popup.ActionButton>
            </Popup.ButtonGroup>
          </Popup>
        </OverlayPresenter>
      )}

      {openNeedMoreVerificationAddressPopup && (
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
              <Popup.CancelButton onClick={handleCloseNeedMoreVerificationAddressPopup}>취소</Popup.CancelButton>
              <Popup.ActionButton onClick={handleConfirmNeedMoreVerificationAddressPopup}>인증하기</Popup.ActionButton>
            </Popup.ButtonGroup>
          </Popup>
        </OverlayPresenter>
      )}
    </>
  );
}
