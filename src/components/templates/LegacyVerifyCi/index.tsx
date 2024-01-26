import { Button } from '@/components/atoms';

export interface LegacyVerifyCiProps {
  subTitle?: string;
  onClickPhoneVerification?: () => void;
  onClickIPinVerification?: () => void;
}

export default function LegacyVerifyCi({
  subTitle = '',
  onClickIPinVerification,
  onClickPhoneVerification,
}: LegacyVerifyCiProps) {
  return (
    <div tw="h-full flex flex-col px-5 py-12">
      <div tw="text-h2 font-bold mb-1">본인인증</div>
      <div tw="text-info text-gray-700 mb-7">{subTitle}</div>
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
