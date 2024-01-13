import loginByCi from '@/apis/user/loginByCi';
import { MobileContainer } from '@/components/atoms';
import { MobFindAccount } from '@/components/templates';
import ErrorCodes from '@/constants/error_codes';
import useAuth from '@/hooks/services/useAuth';
import useNiceId, { NiceResponse } from '@/lib/nice/useNiceId';
import Routes from '@/router/routes';
import { useRouter } from 'next/router';
import { useCallback } from 'react';
import { toast } from 'react-toastify';

export default function FindAccountWrraper() {
  const { login } = useAuth();
  const router = useRouter();
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
          await login(loginRes.access_token, loginRes.refresh_token);
          router.replace(`/${Routes.EntryMobile}/${Routes.MyDetail}`);
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

  const handleClickBack = useCallback(() => {
    router.back();
  }, [router]);

  return (
    <MobileContainer>
      <MobFindAccount
        onClickPhoneVerification={handleVerifyPhone}
        onClickIPinVerification={handleVerifyIPin}
        onClickBack={handleClickBack}
      />
    </MobileContainer>
  );
}
