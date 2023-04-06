import { Button, Ul } from '@/components/atoms';

export interface FindAccountProps {
  onClickPhoneVerification?: () => void;
  onClickIPinVerification?: () => void;
}

export default function FindAccount({ onClickIPinVerification, onClickPhoneVerification }: FindAccountProps) {
  return (
    <div tw="h-full flex flex-col px-5 py-12">
      <div tw="text-h2 font-bold mb-1">
        네고시오에 가입하셨으나 간편로그인 아이디 등이 기억나지 않으시면, 본인인증을 통하여 회원가입 정보를 확인할 수
        있습니다.
      </div>
      <Ul tw="mb-7">
        <li>네고시오에 이미 가입하시고 본인인증까지 마치신 분들만 이용할 수 있는 서비스 입니다.</li>
        <li>아직 네고시오 회원이 아니신 분은 먼저 네고시오에 회원가입을 해주세요</li>
        <li>아래 본인인증 방법을 선택해주세요.</li>
      </Ul>
      <div tw="flex flex-col gap-3">
        <Button size="bigger" onClick={onClickPhoneVerification}>
          휴대폰 본인인증
        </Button>
        <Button size="bigger" variant="outlined" onClick={onClickIPinVerification}>
          아이핀 본인인증
        </Button>
      </div>
    </div>
  );
}
