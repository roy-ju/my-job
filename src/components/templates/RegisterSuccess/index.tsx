import { Button } from '@/components/atoms';

export interface RegisterSuccessProps {
  onClickVerifyCi?: () => void;
  onClickLeave?: () => void;
}

export default function RegisterSuccess({ onClickVerifyCi, onClickLeave }: RegisterSuccessProps) {
  return (
    <div tw="relative flex flex-col h-full px-5 pt-12">
      <div tw="text-h2 font-bold mb-1">회원가입 완료</div>
      <div tw="text-info text-gray-700 mb-7">네고시오는 안전한 거래를 위해 본인인증이 필요합니다.</div>
      <Button size="bigger" tw="mb-3" onClick={onClickVerifyCi}>
        본인인증하기
      </Button>
      <Button variant="outlined" size="bigger" onClick={onClickLeave}>
        우선 네고시오를 둘러볼게요
      </Button>
    </div>
  );
}
