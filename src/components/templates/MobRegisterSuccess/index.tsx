import { Button } from '@/components/atoms';

export interface RegisterSuccessProps {
  onClickVerifyCi?: () => void;
  onClickLeave?: () => void;
}

export default function MobRegisterSuccess({ onClickVerifyCi, onClickLeave }: RegisterSuccessProps) {
  return (
    <div tw="w-full mx-auto fixed top-0 left-0 right-0 flex flex-col h-full px-5 pt-12 bg-white">
      <div tw="text-h2 font-bold mb-1">회원가입 완료</div>
      <div tw="text-info text-gray-700 mb-7">네고시오는 안전한 거래를 위해 본인인증이 필요합니다.</div>
      <Button size="bigger" tw="mb-3" onClick={onClickVerifyCi}>
        본인인증하기
      </Button>
      <Button variant="outlined" size="bigger" onClick={onClickLeave}>
        둘러보기
      </Button>
    </div>
  );
}
