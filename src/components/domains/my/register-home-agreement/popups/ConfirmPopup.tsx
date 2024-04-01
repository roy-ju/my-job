import { OverlayPresenter, Popup } from '@/components/molecules';

import { CommonPopupProps } from '@/types/popups';

import { autoHyphenPhone } from '@/utils/autoHypenPhone';

interface ConfirmPopupProps extends CommonPopupProps {
  name: string;
  phone: string;
}

export default function ConfirmPopup({ name, phone, handleCancel, handleConfirm }: ConfirmPopupProps) {
  return (
    <OverlayPresenter>
      <Popup>
        <Popup.ContentGroup tw="py-6">
          <Popup.SubTitle tw="text-center">소유자 정보 확인</Popup.SubTitle>
          <Popup.Body>
            아래의 정보로 소유자 동의를 위한 문자가 전송됩니다.
            <br />
            <br />
            소유자 성명 : {name}
            <br />
            휴대폰 번호 : {autoHyphenPhone(phone)}
          </Popup.Body>
        </Popup.ContentGroup>
        <Popup.ButtonGroup>
          <Popup.CancelButton onClick={handleCancel}>수정하기</Popup.CancelButton>
          <Popup.ActionButton onClick={handleConfirm}>확인</Popup.ActionButton>
        </Popup.ButtonGroup>
      </Popup>
    </OverlayPresenter>
  );
}
