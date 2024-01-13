import { Panel } from '@/components/atoms';
import { Reactivate } from '@/components/templates';
import { useRouter } from '@/hooks/utils';
import { memo, useCallback } from 'react';
import loginByCi from '@/apis/user/loginByCi';
import ErrorCodes from '@/constants/error_codes';
import { toast } from 'react-toastify';
import useNiceId, { NiceResponse } from '@/lib/nice/useNiceId';
import Routes from '@/router/routes';
import useAuth from '@/hooks/services/useAuth';

interface Props {
  depth: number;
  panelWidth?: string;
}

export default memo(({ depth, panelWidth }: Props) => {
  const { login } = useAuth();
  const router = useRouter(depth);
  const { request } = useNiceId();

  if (!router.query.email || !router.query.inactive_time || !router.query.social_login_type) {
    router.replace('/');
  }

  const handleNiceResponse = useCallback(
    async (res: NiceResponse) => {
      const loginRes = await loginByCi({
        encData: res.encData,
        kie: res.kie,
        integrityValue: res.integrityValue,
        tokenVersionId: res.tokenVersionId,
        type: Number(res.type),
      });
      if (loginRes?.error_code === ErrorCodes.USER_IS_NOT_REGISTERED_WITH_CI) {
        toast.error('미가입 회원입니다.');
      } else if (loginRes?.error_code) {
        toast.error(`Error Code ${loginRes.error_code}`);
      } else if (loginRes?.access_token) {
        if (loginRes?.access_token) {
          await login(loginRes.access_token, loginRes.refresh_token);
          router.replace(Routes.MyDetail);
        } else {
          toast.error('로그인에 실패하였습니다.');
        }
      }
    },
    [router, login],
  );

  const handleVerifyPhone = useCallback(() => {
    request('phone', handleNiceResponse);
  }, [handleNiceResponse, request]);

  const handleVerifyIPin = useCallback(() => {
    request('ipin', handleNiceResponse);
  }, [handleNiceResponse, request]);

  return (
    <Panel width={panelWidth}>
      <Reactivate
        email={router.query.email as string}
        inactive_time={router.query.inactive_time as string}
        social_login_type={Number(router.query.social_login_type)}
        onClickPhoneVerification={handleVerifyPhone}
        onClickIPinVerification={handleVerifyIPin}
      />
    </Panel>
  );
});
