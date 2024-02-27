import { OverlayPresenter, Popup } from '@/components/molecules';

type NeedVerifyAddressPopupProps = { handleClickCancel: () => void; handleClickConfirm: () => void };

function NeedVerifyAddressPopup({ handleClickCancel, handleClickConfirm }: NeedVerifyAddressPopupProps) {
  return (
    <OverlayPresenter>
      <Popup>
        <Popup.ContentGroup tw="[text-align: center]">
          <Popup.SmallTitle>
            이 단지의 집주인만 매물추천이 가능합니다.
            <br />
            우리집 등록하고 집주인 인증하러 가시겠습니까?
          </Popup.SmallTitle>
        </Popup.ContentGroup>
        <Popup.ButtonGroup>
          <Popup.CancelButton onClick={handleClickCancel}>닫기</Popup.CancelButton>
          <Popup.ActionButton onClick={handleClickConfirm}>집주인 인증하기</Popup.ActionButton>
        </Popup.ButtonGroup>
      </Popup>
    </OverlayPresenter>
  );
}

export default NeedVerifyAddressPopup;
