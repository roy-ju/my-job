import { useCallback, useEffect } from 'react';

import { useRouter } from 'next/router';

import { toast } from 'react-toastify';

import useAuth from '@/hooks/services/useAuth';

import useCheckPlatform from '@/hooks/useCheckPlatform';

import useNiceId, { NiceResponse } from '@/lib/nice/useNiceId';

import Routes from '@/router/routes';

import ErrorCodes from '@/constants/error_codes';

import { apiService } from '@/services';

export default function useMyReActivate() {
  const { login } = useAuth();

  const router = useRouter();

  const { platform } = useCheckPlatform();

  const { request } = useNiceId();

  const handleClickBack = useCallback(() => {
    router.back();
  }, [router]);

  const email = (router?.query?.email as string) ?? '';

  const inactive_time = (router?.query?.inactive_time as string) ?? '';

  const social_login_type = Number(router?.query?.social_login_type ?? 0);

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

  const handleVerifyPhone = useCallback(() => {
    request('phone', handleNiceResponse);
  }, [handleNiceResponse, request]);

  useEffect(() => {
    if (!router.query.email || !router.query.inactive_time || !router.query.social_login_type) {
      if (platform === 'pc') {
        router.replace('/');
      }

      if (platform === 'mobile') {
        router.replace(`/${Routes.EntryMobile}`);
      }
    }
  }, [platform, router]);

  return { email, inactive_time, social_login_type, handleClickBack, handleVerifyPhone };
}
