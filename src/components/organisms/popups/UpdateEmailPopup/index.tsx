import { Button } from '@/components/atoms';
import { Popup } from '@/components/molecules';
import KakaoLogoIcon from '@/assets/icons/kakao_logo.svg';
import AppleLogoIcon from '@/assets/icons/apple.svg';

export interface UpdateEmailPopupProps {
  onClickKakao?: () => void;
  onClickApple?: () => void;
  onClickCancel?: () => void;
}

export default function UpdateEmailPopup({ onClickKakao, onClickApple, onClickCancel }: UpdateEmailPopupProps) {
  return (
    <Popup>
      <Popup.ContentGroup tw="gap-5">
        <Popup.Title tw="text-center">간편로그인 방법</Popup.Title>
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
        <Popup.CancelButton onClick={onClickCancel}>취소</Popup.CancelButton>
      </Popup.ButtonGroup>
    </Popup>
  );
}
