import { useCallback } from 'react';

import { toast } from 'react-toastify';

import { apiService } from '@/services';

import { isMobile } from '@/utils/is';

import Events, { NegocioLoginResponseEventPayload } from '@/constants/events';

import { SocialLoginType } from '@/constants/enums';

import getKakaoAccessToken from '@/apis/internal/getKakaoAccessToken';

export default function useKakaoLoginCallbackHandler({ ipAddress }: { ipAddress: any }) {
  const handleLogin = useCallback(
    async (code: string) => {
      const kakaoAccessTokenResponse = await getKakaoAccessToken({
        code,
        redirectUri: `${window.location.origin}${window.location.pathname}`,
      });

      if (!kakaoAccessTokenResponse) {
        toast.error('카카오 서버 쪽 문제가 발생했습니다. 다시 시도해 주세요.');
        // window.close();
        return false;
      }

      const detail = await apiService.login({
        browser: navigator.userAgent,
        device: isMobile(navigator.userAgent) ? 'MOBILE' : 'PC',
        ipAddress: ipAddress ?? null,
        socialLoginType: SocialLoginType.Kakao,
        token: kakaoAccessTokenResponse.accessToken,
      });

      const payload: NegocioLoginResponseEventPayload = {
        ...detail,
        snsToken: kakaoAccessTokenResponse.accessToken,
        socialLoginType: SocialLoginType.Kakao,
      };

      window.opener?.dispatchEvent(new CustomEvent(Events.NEGOCIO_LOGIN_RESPONSE_EVENT, { detail: payload }));

      return true;
    },
    [ipAddress],
  );

  const handleEmailUpdate = useCallback(async (code: string) => {
    const kakaoAccessTokenResponse = await getKakaoAccessToken({
      code,
      redirectUri: `${window.location.origin}${window.location.pathname}`,
    });

    if (!kakaoAccessTokenResponse) {
      window.close();
      return false;
    }

    const detail = await apiService.updateEmail(kakaoAccessTokenResponse.accessToken, SocialLoginType.Kakao);

    window.opener?.dispatchEvent(new CustomEvent(Events.NEGOCIO_UPDATE_EMAIL_RESPONSE_EVENT, { detail }));

    return true;
  }, []);

  return { handleLogin, handleEmailUpdate };
}
