import { Button } from '@/components/atoms';

export interface VerifyCiSuccessProps {
  onClickLeave?: () => void;
}

export default function VerifyCiSuccess({ onClickLeave }: VerifyCiSuccessProps) {
  return (
    <div tw="relative flex flex-col h-full px-5 pt-12">
      <div tw="text-h2 font-bold mb-1">본인인증 완료</div>
      <div tw="text-info text-gray-700 mb-7">자유로운 가격협상을 안전하게 이용해 보세요!</div>
      <Button size="bigger" tw="mb-3" onClick={onClickLeave}>
        네고시오 이용하러 가기
      </Button>
    </div>
  );
}
