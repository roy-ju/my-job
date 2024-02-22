import SocialLoginButton from './SocialLoginButton';

import EtcButton from './EtcButton';

type CtasProps = {
  isKakaoLoginButtonClicked: boolean;
  isAppleLoginButtonClicked: boolean;
  handleClickKakaoLogin: () => void;
  handleClickAppleLogin: () => void;
  handleClickForgotPassword: () => void;
};

export default function Ctas({
  isKakaoLoginButtonClicked,
  isAppleLoginButtonClicked,
  handleClickKakaoLogin,
  handleClickAppleLogin,
  handleClickForgotPassword,
}: CtasProps) {
  return (
    <div tw="flex flex-col gap-4 px-5">
      <div tw="flex flex-col gap-3">
        <SocialLoginButton type="kakao" handleClick={handleClickKakaoLogin} disabled={isKakaoLoginButtonClicked} />
        <SocialLoginButton type="apple" handleClick={handleClickAppleLogin} disabled={isAppleLoginButtonClicked} />
      </div>
      <div tw="flex items-center justify-center">
        <EtcButton title="계정 정보를 잃어버리셨나요?" handleClick={handleClickForgotPassword} />
      </div>
    </div>
  );
}
