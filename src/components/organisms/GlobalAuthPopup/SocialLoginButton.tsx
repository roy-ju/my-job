import ButtonV2 from '@/components/atoms/ButtonV2';

import AppleLogoIcon from '@/assets/icons/apple.svg';

import KakaoLogoIcon from '@/assets/icons/kakao_logo.svg';

type SocialLoginButtonProps = { type: 'kakao' | 'apple'; handleClick: () => void };

export default function SocialLoginButton({ type, handleClick }: SocialLoginButtonProps) {
  if (type === 'kakao') {
    return (
      <ButtonV2
        variant="ghost"
        tw="w-full bg-yellow-kakao hover:bg-yellow-kakaoHover"
        size="bigger"
        onClick={handleClick}
      >
        <KakaoLogoIcon tw="mr-2" />
        카카오로 시작하기
      </ButtonV2>
    );
  }

  if (type === 'apple') {
    return (
      <ButtonV2 tw="w-full" size="bigger" variant="secondary" onClick={handleClick}>
        <AppleLogoIcon tw="mr-2" /> Apple로 시작하기
      </ButtonV2>
    );
  }

  return null;
}
