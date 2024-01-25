import { useCallback } from 'react';

import { useRouter } from 'next/router';

import { useRecoilState, useResetRecoilState } from 'recoil';

import useNiceId, { NiceResponse } from '@/lib/nice/useNiceId';

import { apiService } from '@/services';

import useAuth from '@/hooks/services/useAuth';

import ErrorCodes from '@/constants/error_codes';

import Routes from '@/router/routes';

import Events from '@/constants/events';

import verifyCiPopupAtom from '../atom/verifyCiPopup';

import useAuthPopup from './useAuhPopup';

import useReturnUrl from './useReturnUrl';

export default function useVerifyCiPopup() {
  const [state, setState] = useRecoilState(verifyCiPopupAtom);

  const reset = useResetRecoilState(verifyCiPopupAtom);

  const router = useRouter();

  const { mutate: mutateAuth } = useAuth();

  const { openAuthPopup } = useAuthPopup();

  const { returnUrl } = useReturnUrl();

  const { request } = useNiceId();

  const closeVericyCiPopup = useCallback(() => {
    setState((prev) => ({ ...prev, open: false }));
  }, [setState]);

  const autoCloseVericyCiPopup = useCallback(() => {
    setState(() => ({ title: '', subTitle: '', open: false }));

    if (returnUrl) {
      router.replace(returnUrl);
    }
  }, [returnUrl, router, setState]);

  const handleNiceResponse = useCallback(
    async (res: NiceResponse) => {
      console.log(returnUrl);
      const updateCiRes = await apiService.updateCi({
        encData: res.encData,
        kie: res.kie,
        integrityValue: res.integrityValue,
        tokenVersionId: res.tokenVersionId,
        type: Number(res.type),
      });

      if (updateCiRes?.error_code === ErrorCodes.DUPLCATED_CI) {
        setState(() => ({
          open: true,
          title: '이미 가입된 계정',
          subTitle: '본인 인증이 완료된 다른 계정이 있습니다.',
          actionButtonTitle: '다른 계정 로그인',
          cancelButtonTitle: '취소',
          actionButtonEvent: () => {
            openAuthPopup('onlyLogin');
            closeVericyCiPopup();
          },
          cancelButtonEvent: () => closeVericyCiPopup(),
        }));
      }

      if (updateCiRes?.error_code === ErrorCodes.UNDER_NINETEEN) {
        setState(() => ({
          open: true,
          title: '19세 미만 회원',
          subTitle:
            '만 19세 미만의 회원은 매물 등록, 가격제안, 집 구해요 서비스를 이용할 수 없습니다.\n(그 외에 서비스는 계속해서 이용할 수 있습니다.)',
          actionButtonTitle: '확인',
          cancelButtonTitle: '',
          actionButtonEvent: () => closeVericyCiPopup(),
          cancelButtonEvent: undefined,
        }));
      }

      if (!updateCiRes?.error_code) {
        mutateAuth(false);

        if (returnUrl) {
          if (returnUrl.includes(Routes.SuggestForm) && router?.query?.params) {
            const event = new CustomEvent(Events.NEGOCIO_CREATE_SUGGEST, { detail: 'action' });
            window.dispatchEvent(event);
          } else {
            if (returnUrl === router.asPath) {
              return;
            }

            router.replace(returnUrl);
          }
        } else {
          router.replace('/');
        }

        closeVericyCiPopup();
      }
    },
    [closeVericyCiPopup, mutateAuth, openAuthPopup, returnUrl, router, setState],
  );

  const handleVerifyPhone = useCallback(async () => {
    request('phone', handleNiceResponse);
  }, [handleNiceResponse, request]);

  const openVerifyCiPopup = useCallback(() => {
    setState({
      open: true,
    });
  }, [setState]);

  return {
    isOpenVerifyCiPopup: state.open,
    title: state.title,
    subtitle: state.subTitle,
    actionButtonTitle: state.actionButtonTitle,
    actionButtonEvent: state.actionButtonEvent,
    cancelButtonTitle: state.cancelButtonTitle,
    cancelButtonEvent: state.cancelButtonEvent,
    openVerifyCiPopup,
    autoCloseVericyCiPopup,
    closeVericyCiPopup,
    handleVerifyPhone,
    reset,
  };
}
