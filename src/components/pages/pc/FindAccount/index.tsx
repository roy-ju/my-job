import loginByCi from '@/apis/user/loginByCi';
import { Panel } from '@/components/atoms';
import { FindAccount } from '@/components/templates';
import ErrorCodes from '@/constants/error_codes';
import Keys from '@/constants/storage_keys';
import { useAuth } from '@/hooks/services';
import { useRouter } from '@/hooks/utils';
import useNiceId, { NiceResponse } from '@/lib/nice/useNiceId';
import Routes from '@/router/routes';
import { memo, useCallback } from 'react';
import { toast } from 'react-toastify';

interface Props {
  depth: number;
  panelWidth?: string;
}

export default memo(({ depth, panelWidth }: Props) => {
  const { mutate } = useAuth();
  const router = useRouter(depth);
  const { request } = useNiceId();

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
          localStorage.setItem(Keys.ACCESS_TOKEN, JSON.stringify(loginRes.access_token));
          localStorage.setItem(Keys.REFRESH_TOKEN, JSON.stringify(loginRes.refresh_token));
          await mutate();
          router.replace(Routes.MyDetail);
        } else {
          toast.error('로그인에 실패하였습니다.');
        }
      }
    },
    [router, mutate],
  );

  const handleVerifyPhone = useCallback(() => {
    request('phone', handleNiceResponse);
  }, [handleNiceResponse, request]);

  const handleVerifyIPin = useCallback(() => {
    request('ipin', handleNiceResponse);
  }, [handleNiceResponse, request]);

  return (
    <Panel width={panelWidth}>
      <FindAccount onClickPhoneVerification={handleVerifyPhone} onClickIPinVerification={handleVerifyIPin} />
    </Panel>
  );
});
