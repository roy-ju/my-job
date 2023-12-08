import { Button, Separator, Moment } from '@/components/atoms';
import { SocialLoginType } from '@/constants/enums';
import { NavigationHeader } from '@/components/molecules';

export interface MobReactivateProps {
  email?: string;
  inactive_time?: string;
  social_login_type?: number;
  onClickPhoneVerification?: () => void;
  onClickIPinVerification?: () => void;
  onClickBack?: () => void;
}

export default function MobReactivate({
  email,
  inactive_time,
  social_login_type,
  onClickIPinVerification,
  onClickPhoneVerification,
  onClickBack,
}: MobReactivateProps) {
  return (
    <div tw="w-full mx-auto bg-white h-full flex flex-col">
      <NavigationHeader>
        {onClickBack && <NavigationHeader.BackButton onClick={onClickBack} />}
        <NavigationHeader.Title> 휴면 계정 해제</NavigationHeader.Title>
      </NavigationHeader>

      <div tw=" px-5 ">
        <div tw="mb-7 leading-5 text-gray-700 text-info">본인인증으로 휴면 계정을 해제할 수 있습니다.</div>
        <div tw="flex flex-col gap-1">
          <div tw="leading-5 text-gray-600 text-info font-bold">
            휴면 전환일 {inactive_time && <Moment format="yyyy. MM. DD">{inactive_time}</Moment>}
          </div>
          <div tw="px-4 py-3 bg-gray-100 rounded-xl">
            <div tw="text-info leading-3 text-gray-600 [letter-spacing: -0.024px] mb-1">
              휴면 계정
              {social_login_type === SocialLoginType.Kakao
                ? '카카오'
                : social_login_type === SocialLoginType.Apple
                ? '애플'
                : ''}
            </div>
            <div tw="text-gray-700 text-base leading-4 [letter-spacing: -0.032px]">{email}</div>
          </div>
        </div>
      </div>
      <Separator tw="my-10" />
      <div tw="flex flex-col gap-4 px-5">
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
