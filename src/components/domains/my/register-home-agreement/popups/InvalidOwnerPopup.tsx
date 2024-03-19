import { OverlayPresenter, Popup } from '@/components/molecules';

import { CommonPopupProps } from '@/types/popups';

interface InvalidOwnerPopupProps extends CommonPopupProps {
  name: string;
}

export default function InvalidOwnerPopup({ name, handleConfirm }: InvalidOwnerPopupProps) {
  return (
    <OverlayPresenter>
      <Popup>
        <Popup.ContentGroup tw="py-6">
          <Popup.SubTitle tw="text-center">소유자 정보 확인</Popup.SubTitle>
          <Popup.Body>
            아래의 입력하신 소유자 성명이 등기부상의 소유자와 일치하지 않습니다. 확인 후 다시 입력해주세요.
            <br />
            <br />
            입력하신 소유자 성명 : {name}
          </Popup.Body>
        </Popup.ContentGroup>
        <Popup.ButtonGroup>
          <Popup.ActionButton onClick={handleConfirm}>확인</Popup.ActionButton>
        </Popup.ButtonGroup>
      </Popup>
    </OverlayPresenter>
  );
}
