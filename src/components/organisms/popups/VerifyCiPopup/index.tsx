import { Popup } from '@/components/molecules';

function VerifyCiPopup() {
  return null;
}

interface DuplicatedCiProps {
  onClickClose?: () => void;
}

function DuplicatedCi({ onClickClose }: DuplicatedCiProps) {
  return (
    <Popup>
      <Popup.ContentGroup>
        <Popup.Title>본인인증 오류</Popup.Title>
        <Popup.Body>이미 다른 네고시오 계정에서 사용되고 있습니다.</Popup.Body>
      </Popup.ContentGroup>
      <Popup.ButtonGroup>
        <Popup.ActionButton onClick={onClickClose}>확인</Popup.ActionButton>
      </Popup.ButtonGroup>
    </Popup>
  );
}

interface Under19Props {
  onClickClose?: () => void;
}

function Under19({ onClickClose }: Under19Props) {
  return (
    <Popup>
      <Popup.ContentGroup>
        <Popup.Title>본인인증 오류</Popup.Title>
        <Popup.Body>
          19세 미만은 매물등록, 거래참여
          <br />및 네고머니 관련 서비스를 이용할 수 없습니다.
        </Popup.Body>
      </Popup.ContentGroup>
      <Popup.ButtonGroup>
        <Popup.ActionButton onClick={onClickClose}>확인</Popup.ActionButton>
      </Popup.ButtonGroup>
    </Popup>
  );
}

export default Object.assign(VerifyCiPopup, {
  DuplicatedCi,
  Under19,
});
