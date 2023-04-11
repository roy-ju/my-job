import { Button } from '@/components/atoms';

export interface VerifyCiSuccessProps {
  onClickLeave?: () => void;
}

export default function MobVerifyCiSuccess({ onClickLeave }: VerifyCiSuccessProps) {
  return (
    <div tw="w-full max-w-mobile mx-auto top-0 left-0 right-0 flex flex-col h-full px-5 pt-12 fixed bg-white">
      <div tw="text-h2 font-bold mb-1">본인인증 완료</div>
      <div tw="text-info text-gray-700 mb-7">자유로운 가격협상을 안전하게 이용해 보세요!</div>
      <Button size="bigger" tw="mb-3" onClick={onClickLeave}>
        네고시오 이용하러 가기
      </Button>
    </div>
  );
}
