import ButtonV2 from '@/components/atoms/ButtonV2';

import AppleLogoIcon from '@/assets/icons/apple.svg';

import KakaoLogoIcon from '@/assets/icons/kakao_logo.svg';

type SocialLoginButtonProps = { type: 'kakao' | 'apple'; disabled: boolean; handleClick: () => void };

export default function SocialLoginButton({ type, disabled, handleClick }: SocialLoginButtonProps) {
  if (type === 'kakao') {
    return (
      <ButtonV2
        variant="ghost"
        tw="w-full text-black bg-yellow-kakao hover:bg-yellow-kakaoHover disabled:bg-yellow-kakao disabled:text-black"
        size="bigger"
        onClick={handleClick}
        disabled={disabled}
      >
        <KakaoLogoIcon tw="mr-2" />
        카카오로 시작하기
      </ButtonV2>
    );
  }

  if (type === 'apple') {
    return (
      <ButtonV2
        tw="w-full bg-black disabled:bg-black disabled:text-white"
        size="bigger"
        variant="secondary"
        onClick={handleClick}
        disabled={disabled}
      >
        <AppleLogoIcon tw="mr-2" /> Apple로 시작하기
      </ButtonV2>
    );
  }

  return null;
}
