import Moment from '@/components/atoms/Moment';

import { SocialLoginType } from '@/constants/enums';

type ContentsProps = {
  email?: string;
  inactive_time?: string;
  social_login_type?: number;
};
export default function Contents({ email, inactive_time, social_login_type }: ContentsProps) {
  return (
    <div tw="px-5 py-10">
      <div tw="text-h2 font-bold mb-1">휴면 계정 해제</div>
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
  );
}
