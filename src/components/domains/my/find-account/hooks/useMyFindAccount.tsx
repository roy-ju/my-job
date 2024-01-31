import { useCallback } from 'react';

import { useRouter } from 'next/router';

import { toast } from 'react-toastify';

import useAuth from '@/hooks/services/useAuth';

import { apiService } from '@/services';

import useNiceId, { NiceResponse } from '@/lib/nice/useNiceId';

import ErrorCodes from '@/constants/error_codes';

import Routes from '@/router/routes';

import useCheckPlatform from '@/hooks/useCheckPlatform';

export default function useMyFindAccount() {
  const router = useRouter();

  const { platform } = useCheckPlatform();

  const { login } = useAuth();

  const { request } = useNiceId();

  const handleNiceResponse = useCallback(
    async (res: NiceResponse) => {
      const loginRes = await apiService.loginCi({
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
          if (platform === 'pc') {
            router.replace(`/${Routes.MyDetail}`);
          }
          if (platform === 'mobile') {
            router.replace(`/${Routes.EntryMobile}/${Routes.MyDetail}`);
          }
        } else {
          toast.error('로그인에 실패하였습니다.');
        }
      }
    },
    [login, platform, router],
  );

  const handleClickBack = useCallback(() => {
    router.back();
  }, [router]);

  const handleVerifyPhone = useCallback(() => {
    request('phone', handleNiceResponse);
  }, [handleNiceResponse, request]);

  return { handleVerifyPhone, handleClickBack };
}
