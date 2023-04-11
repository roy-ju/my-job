import { LoginForm } from '@/components/organisms';

export interface LoginProps {
  onClickKakaoLogin?: () => void;
  onClickAppleLogin?: () => void;
  onClickForgotMyAccount?: () => void;
}

export default function MobLogin({ onClickKakaoLogin, onClickAppleLogin, onClickForgotMyAccount }: LoginProps) {
  return (
    <div tw="fixed top-0 left-0 right-0 py-12 px-5 h-full bg-white w-full max-w-mobile mx-auto">
      <div tw="mb-7">
        <div tw="text-h2 font-bold">부동산 네고 쉽고 빠르게</div>
        <div tw="text-info text-gray-700 mt-1">내 인생 가장 큰 거래 부동산. 꼭 네고하세요!</div>
      </div>
      <LoginForm
        onClickKakaoLogin={onClickKakaoLogin}
        onClickAppleLogin={onClickAppleLogin}
        onClickForgotMyAccount={onClickForgotMyAccount}
      />
    </div>
  );
}
