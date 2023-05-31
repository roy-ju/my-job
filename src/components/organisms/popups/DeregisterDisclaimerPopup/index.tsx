import { Popup } from '@/components/molecules';

interface ConfirmProps {
  onClickCancel?: () => void;
  onClickDeregister?: () => void;
}

function DeregisterDisclaimerPopup() {
  return null;
}

function Confirm({ onClickCancel, onClickDeregister }: ConfirmProps) {
  return (
    <Popup>
      <Popup.ContentGroup>
        <Popup.Title tw="text-b2 text-gray-1000 text-center">
          정말 회원탈퇴를 진행하시겠습니까?
          <br />
          회원 데이터는 복구되지 않습니다.
        </Popup.Title>
      </Popup.ContentGroup>
      <Popup.ButtonGroup>
        <Popup.CancelButton onClick={onClickCancel}>취소</Popup.CancelButton>
        <Popup.ActionButton onClick={onClickDeregister}>탈퇴하기</Popup.ActionButton>
      </Popup.ButtonGroup>
    </Popup>
  );
}

interface SuccessProps {
  onClickNavigateToHome?: () => void;
}

function Success({ onClickNavigateToHome }: SuccessProps) {
  return (
    <Popup>
      <Popup.ContentGroup tw="gap-2">
        <Popup.Title tw="text-gray-1000">회원탈퇴 완료</Popup.Title>
        <Popup.Body>다음에 네고시오를 다시 찾아주세요.</Popup.Body>
      </Popup.ContentGroup>
      <Popup.ButtonGroup>
        <Popup.ActionButton onClick={onClickNavigateToHome}>확인</Popup.ActionButton>
      </Popup.ButtonGroup>
    </Popup>
  );
}

export default Object.assign(DeregisterDisclaimerPopup, {
  Confirm,
  Success,
});
