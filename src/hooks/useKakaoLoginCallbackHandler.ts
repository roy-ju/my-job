import { useCallback } from 'react';

import { apiService } from '@/services';

import { isMobile } from '@/utils/is';

import Events, { NegocioLoginResponseEventPayload } from '@/constants/events';

import { SocialLoginType } from '@/constants/enums';

import getKakaoAccessToken from '@/apis/internal/getKakaoAccessToken';

export default function useKakaoLoginCallbackHandler({ ipAddress }: { ipAddress: any }) {
  const handleLoginPcOrNativeApp = useCallback(
    async (code: string) => {
      const kakaoAccessTokenResponse = await getKakaoAccessToken({
        code,
        redirectUri: `${window.location.origin}${window.location.pathname}`,
      });

      if (!kakaoAccessTokenResponse) {
        window.close();
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

  const handleEmailUpdatePcOrNativeApp = useCallback(async (code: string) => {
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

  const handleLoginMobileWeb = useCallback(() => {}, []);

  const handleEmailUpdateMobileWeb = useCallback(() => {}, []);

  return { handleLoginPcOrNativeApp, handleEmailUpdatePcOrNativeApp, handleLoginMobileWeb, handleEmailUpdateMobileWeb };
}
