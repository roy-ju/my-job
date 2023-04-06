import { Button } from '@/components/atoms';

export interface VerifyCiProps {
  onClickPhoneVerification?: () => void;
  onClickIPinVerification?: () => void;
}

export default function VerifyCi({ onClickIPinVerification, onClickPhoneVerification }: VerifyCiProps) {
  return (
    <div tw="h-full flex flex-col px-5 py-12">
      <div tw="text-h2 font-bold mb-1">본인인증</div>
      <div tw="text-info text-gray-700 mb-7">네고시오는 안전한 거래를 위해 본인인증이 필요합니다.</div>
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
