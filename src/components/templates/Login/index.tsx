import { NavigationHeader } from '@/components/molecules';
import { LoginForm } from '@/components/organisms';

export interface LoginProps {
  onClickKakaoLogin?: () => void;
  onClickAppleLogin?: () => void;
  onClickForgotMyAccount?: () => void;
  onClickBack?: () => void;
  onClickFAQ?: () => void;
}

export default function Login({
  onClickKakaoLogin,
  onClickAppleLogin,
  onClickForgotMyAccount,
  onClickBack,
  onClickFAQ,
}: LoginProps) {
  return (
    <div>
      <NavigationHeader>{onClickBack && <NavigationHeader.BackButton onClick={onClickBack} />}</NavigationHeader>
      <div tw="pt-2 pb-12 px-5">
        <div tw="mb-7">
          <div tw="text-h2 font-bold">부동산 네고 쉽고 빠르게</div>
          <div tw="text-info text-gray-700 mt-1">내 인생 가장 큰 거래 부동산. 꼭 네고하세요!</div>
        </div>
        <LoginForm
          onClickKakaoLogin={onClickKakaoLogin}
          onClickAppleLogin={onClickAppleLogin}
          onClickForgotMyAccount={onClickForgotMyAccount}
          onClickFAQ={onClickFAQ}
        />
      </div>
    </div>
  );
}
