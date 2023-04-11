import { Button } from '@/components/atoms';
import { NavigationHeader } from '@/components/molecules';

export interface VerifyCiProps {
  onClickPhoneVerification?: () => void;
  onClickIPinVerification?: () => void;
  onClickBack?: () => void;
}

export default function MobVerifyCi({ onClickBack, onClickIPinVerification, onClickPhoneVerification }: VerifyCiProps) {
  return (
    <div tw="w-full max-w-mobile h-full flex flex-col mx-auto fixed top-0 left-0 right-0 bg-white">
      <NavigationHeader>
        <NavigationHeader.BackButton onClick={onClickBack} />
        <NavigationHeader.Title>본인인증</NavigationHeader.Title>
      </NavigationHeader>
      <div tw="px-5">
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
    </div>
  );
}
