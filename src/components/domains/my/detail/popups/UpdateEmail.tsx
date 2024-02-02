import { Button } from '@/components/atoms';

import { Popup } from '@/components/molecules';

import KakaoLogoIcon from '@/assets/icons/kakao_logo.svg';

import AppleLogoIcon from '@/assets/icons/apple.svg';

export interface UpdateEmailPopupProps {
  onClickKakao?: () => void;
  onClickApple?: () => void;
  onClickCancel?: () => void;
}

function UpdateEmailPopup({ onClickKakao, onClickApple, onClickCancel }: UpdateEmailPopupProps) {
  return (
    <Popup>
      <Popup.ContentGroup tw="gap-5">
        <Popup.SmallTitle tw="text-center">간편로그인 방법</Popup.SmallTitle>
        <Popup.Body tw="flex flex-col gap-3">
          <Button tw="bg-yellow-kakao hover:bg-yellow-kakaoHover text-gray-1000" size="bigger" onClick={onClickKakao}>
            <KakaoLogoIcon tw="mr-2" />
            카카오 계정으로 변경하기
          </Button>
          <Button size="bigger" onClick={onClickApple}>
            <AppleLogoIcon tw="mr-2" /> Apple 계정으로 변경하기
          </Button>
        </Popup.Body>
      </Popup.ContentGroup>
      <Popup.ButtonGroup>
        <Popup.ActionButton onClick={onClickCancel}>취소</Popup.ActionButton>
      </Popup.ButtonGroup>
    </Popup>
  );
}

interface SuccessProps {
  onClickClose?: () => void;
}

function Success({ onClickClose }: SuccessProps) {
  return (
    <Popup>
      <Popup.ContentGroup tw="gap-5 py-12">
        <Popup.SmallTitle tw="text-center">변경이 반영되었습니다.</Popup.SmallTitle>
      </Popup.ContentGroup>
      <Popup.ButtonGroup>
        <Popup.ActionButton onClick={onClickClose}>확인</Popup.ActionButton>
      </Popup.ButtonGroup>
    </Popup>
  );
}

interface DuplicatedCiProps {
  onClickClose?: () => void;
}

function DuplicatedCi({ onClickClose }: DuplicatedCiProps) {
  return (
    <Popup>
      <Popup.ContentGroup>
        <Popup.SmallTitle>변경 오류</Popup.SmallTitle>
        <Popup.Body>
          이미 다른 네고시오 계정에서 사용되고 있습니다.
          <br />
          다른 간편로그인 방법을 선택해주세요.
        </Popup.Body>
      </Popup.ContentGroup>
      <Popup.ButtonGroup>
        <Popup.ActionButton onClick={onClickClose}>확인</Popup.ActionButton>
      </Popup.ButtonGroup>
    </Popup>
  );
}

interface DuplicatedEmailProps {
  onClickClose?: () => void;
}

function DuplicatedEmail({ onClickClose }: DuplicatedEmailProps) {
  return (
    <Popup>
      <Popup.ContentGroup>
        <Popup.Title>간편로그인 방법 변경</Popup.Title>
        <Popup.Body>
          이미 다른 네고시오 계정에서 사용되고 있습니다.
          <br />
          해당계정을 삭제하고 간편로그인 방법 변경을 계속 진행하시겠습니까?
        </Popup.Body>
      </Popup.ContentGroup>
      <Popup.ButtonGroup>
        <Popup.ActionButton onClick={onClickClose}>확인</Popup.ActionButton>
      </Popup.ButtonGroup>
    </Popup>
  );
}

export default Object.assign(UpdateEmailPopup, {
  Success,
  DuplicatedCi,
  DuplicatedEmail,
});
