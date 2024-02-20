import { useCallback, useEffect, useMemo } from 'react';

import { useRouter } from 'next/router';

import { toast } from 'react-toastify';

import useAuthPopup from '@/states/hooks/useAuhPopup';

import useCheckPlatform from '@/hooks/useCheckPlatform';

import useAuth from '@/hooks/services/useAuth';

import { apiService } from '@/services';

import { loginWithApple } from '@/lib/apple/login';

import Events, { NegocioLoginResponseEventPayload } from '@/constants/events';

import { SocialLoginType } from '@/constants/enums';

import ErrorCodes from '@/constants/error_codes';

import Routes from '@/router/routes';

import useVerifyCiPopup from '@/states/hooks/useVerifyCiPopup';

import useReturnUrl from '@/states/hooks/useReturnUrl';

import adjustWindowPopup from '@/utils/adjustWindowPopup';

import useDanjiFavoriteAdd from '@/components/domains/danji/hooks/useDanjiFavoriteAdd';

import useCreateSuggestForm from '@/components/domains/suggest/form/hooks/useCreateSuggestForm';

interface LoginCustomEventDetail extends NegocioLoginResponseEventPayload {
  error_code: number;
  error_message: string;
  fields: {
    email: string;
    inactive_time: Date;
    social_login_type: number;
  };
}

export default function useLoginCtas({ ipAddress }: { ipAddress?: string }) {
  const { login, user } = useAuth();

  const { closeAuthPopup, authType } = useAuthPopup();

  const { returnUrl, handleUpdateReturnUrl } = useReturnUrl();

  const { openVerifyCiPopup } = useVerifyCiPopup();

  const { platform } = useCheckPlatform();

  const { danjiFavoriteAdd } = useDanjiFavoriteAdd();

  const { createSuggest } = useCreateSuggestForm();

  const router = useRouter();

  const device = useMemo(() => (platform === 'pc' ? 'MOBILE' : 'PC'), [platform]);

  const handleClickKakaoLogin = useCallback(async () => {
    if (platform === 'pc') {
      const { width, height, left, top } = adjustWindowPopup({ w: 612 });

      window.open(
        `${window.location.origin}/auth/kakao`,
        '_blank',
        `width=${width}, height=${height}, top=${top}, left=${left}`,
      );
    }

    if (platform === 'mobile') {
      window.open(`${window.location.origin}/auth/kakao`, '_blank');
    }
  }, [platform]);

  const handleClickAppleLogin = useCallback(async () => {
    const res = await loginWithApple();

    if (res && !res.error) {
      const idToken = res.authorization.id_token;

      const detail = await apiService.login({
        browser: navigator.userAgent,
        device,
        ipAddress,
        socialLoginType: SocialLoginType.Apple,
        token: idToken,
      });

      const payload: NegocioLoginResponseEventPayload = {
        ...detail,
        snsToken: idToken,
        socialLoginType: SocialLoginType.Apple,
      };

      window.dispatchEvent(new CustomEvent(Events.NEGOCIO_LOGIN_RESPONSE_EVENT, { detail: payload }));
    }
  }, [device, ipAddress]);

  useEffect(() => {
    if (!platform) return;

    const handleOnlyLoginOrLogin = async () => {
      if (returnUrl) {
        if (returnUrl?.includes(Routes.SuggestForm) && router?.query?.params) {
          await createSuggest();
        }

        await danjiFavoriteAdd();

        if (returnUrl !== router.asPath) {
          router.push(returnUrl);
        }
      }
    };

    if (user && (authType === 'onlyLogin' || authType === 'login')) {
      handleOnlyLoginOrLogin();
    }
  }, [authType, createSuggest, danjiFavoriteAdd, platform, returnUrl, router, user]);

  useEffect(() => {
    if (!platform) return;

    if (user && authType === 'needVerify') {
      const { isVerified } = user;

      if (isVerified) {
        if (returnUrl) {
          router.push(returnUrl);
        }

        return;
      }

      if (!isVerified) {
        if (returnUrl) {
          if (platform === 'pc') {
            const depth1 = router?.query?.depth1;
            const depth2 = router?.query?.depth2;
            const query = router.query;

            delete query.depth1;
            delete query.depth2;

            if (depth1 && depth2) {
              if (depth1 === Routes.MapListingList) {
                router.push({
                  pathname: `/${Routes.VerifyCi}/${depth2}`,
                  query,
                });
              } else if (depth1 === Routes.DanjiListings) {
                router.push({
                  pathname: `/${Routes.VerifyCi}/${depth2}`,
                  query,
                });
              } else {
                router.push({
                  pathname: `/${depth1}/${Routes.VerifyCi}`,
                  query,
                });
              }
            }

            if (depth1 && !depth2) {
              if (depth1 === Routes.MapListingList) {
                router.push({
                  pathname: `/${Routes.VerifyCi}`,
                  query,
                });
              } else if (depth1 === Routes.DanjiListings) {
                router.push({
                  pathname: `/${Routes.VerifyCi}`,
                  query,
                });
              } else {
                router.push({
                  pathname: `/${depth1}/${Routes.VerifyCi}`,
                  query,
                });
              }
            }

            return;
          }

          if (platform === 'mobile') {
            router.push({
              pathname: `/${Routes.EntryMobile}/${Routes.VerifyCi}`,
              query: router.query,
            });
          }

          return;
        }

        if (platform === 'pc') {
          router.push('/');
        }

        if (platform === 'mobile') {
          router.push('/');
        }
      }
    }
  }, [authType, platform, returnUrl, router, user]);

  useEffect(() => {
    if (!platform) return;

    if (user) return;

    const handleLoginResponse: EventListenerOrEventListenerObject = async (event) => {
      const detail = (event as CustomEvent).detail as LoginCustomEventDetail;

      if (detail?.access_token && detail?.refresh_token) {
        await login(detail.access_token, detail.refresh_token);
      } else if (detail?.new_registration && detail.email && detail.snsToken && detail.socialLoginType) {
        if (platform === 'pc') {
          const depth1 = router?.query?.depth1;
          const depth2 = router?.query?.depth2;
          const query = router.query;

          delete query.depth1;
          delete query.depth2;

          query.email = detail.email;
          query.token = detail.snsToken;
          query.socialLoginType = `${detail.socialLoginType}`;

          if (detail.name) {
            query.name = `${detail.name}`;
          }
          if (detail.phone) {
            query.phone = `${detail.phone}`;
          }

          if (depth1 && depth2) {
            if (depth1 === Routes.MapListingList) {
              router.push({
                pathname: `/${Routes.Register}/${depth2}`,
                query,
              });
            } else if (depth1 === Routes.DanjiListings) {
              router.push({
                pathname: `/${Routes.Register}/${depth2}`,
                query,
              });
            } else {
              router.push({
                pathname: `/${depth1}/${Routes.Register}`,
                query,
              });
            }
          }

          if (depth1 && !depth2) {
            if (depth1 === Routes.SuggestForm) {
              router.push({
                pathname: `/${Routes.Register}`,
                query,
              });
            } else if (depth1 === Routes.MapListingList) {
              router.push({
                pathname: `/${Routes.Register}`,
                query,
              });
            } else if (depth1 === Routes.DanjiListings) {
              router.push({
                pathname: `/${Routes.Register}`,
                query,
              });
            } else {
              router.push({
                pathname: `/${depth1}/${Routes.Register}`,
                query,
              });
            }
          }

          if (!depth1 && !depth2) {
            router.push({
              pathname: `/${Routes.Register}`,
              query,
            });
          }
        }

        if (platform === 'mobile') {
          router.push({
            pathname: `/${Routes.EntryMobile}/${Routes.Register}`,
            query: {
              email: detail.email,
              token: detail.snsToken,
              socialLoginType: `${detail.socialLoginType}`,
              ...(detail.name ? { name: `${detail.name}` } : {}),
              ...(detail.phone ? { phone: `${detail.phone}` } : {}),
              ...router.query,
            },
          });
        }
      } else if (detail?.error_code === ErrorCodes.USER_IS_INACTIVE) {
        if (platform === 'pc') {
          const depth1 = router?.query?.depth1;

          const depth2 = router?.query?.depth2;

          const query = router.query;

          delete query.depth1;

          delete query.depth2;

          query.email = detail?.fields?.email;

          query.inactive_time = `${detail?.fields?.inactive_time}`;

          query.social_login_type = `${detail?.socialLoginType}`;

          if (depth1 && depth2) {
            router.push({
              pathname: `/${depth1}/${Routes.Reactivate}`,
              query,
            });
          }

          if (depth1 && !depth2) {
            router.push({
              pathname: `/${Routes.Reactivate}`,
              query,
            });
          }

          if (!depth1 && !depth2) {
            router.push({
              pathname: `/${Routes.Reactivate}`,
              query,
            });
          }
        }
        if (platform === 'mobile') {
          router.push({
            pathname: `/${Routes.EntryMobile}/${Routes.Reactivate}`,
            query: {
              email: detail?.fields?.email,
              inactive_time: `${detail?.fields?.inactive_time}`,
              social_login_type: `${detail?.socialLoginType}`,
            },
          });
        }
      } else {
        toast.error(`문제가 발생했습니다. 잠시 뒤 다시 시도해 주세요. error_code: ${detail?.error_code}`);
      }

      closeAuthPopup();
    };

    window.addEventListener(Events.NEGOCIO_LOGIN_RESPONSE_EVENT, handleLoginResponse);

    return () => {
      window.removeEventListener(Events.NEGOCIO_LOGIN_RESPONSE_EVENT, handleLoginResponse);
    };
  }, [router, platform, returnUrl, user, authType, login, closeAuthPopup, openVerifyCiPopup, handleUpdateReturnUrl]);

  return { handleClickKakaoLogin, handleClickAppleLogin };
}
