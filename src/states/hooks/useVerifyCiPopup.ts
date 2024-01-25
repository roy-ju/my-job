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

import useReturnUrl from './useReturnUrl';

export default function useVerifyCiPopup() {
  const [state, setState] = useRecoilState(verifyCiPopupAtom);

  const reset = useResetRecoilState(verifyCiPopupAtom);

  const router = useRouter();

  const { mutate: mutateAuth } = useAuth();

  const { returnUrl, handleUpdateReturnUrl } = useReturnUrl();

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
      const updateCiRes = await apiService.updateCi({
        encData: res.encData,
        kie: res.kie,
        integrityValue: res.integrityValue,
        tokenVersionId: res.tokenVersionId,
        type: Number(res.type),
      });

      if (updateCiRes?.error_code === ErrorCodes.DUPLCATED_CI) {
        setState((prev) => ({
          ...prev,
          title: '본인인증 오류',
          subTitle: '이미 다른 네고시오 계정에서 사용되고 있습니다.',
          actionButtonTitle: '확인',
          cancelButtonTitle: '',
          actionButtonEvent: () => closeVericyCiPopup(),
          cancelButtonEvent: undefined,
        }));
      }

      if (updateCiRes?.error_code === ErrorCodes.UNDER_NINETEEN) {
        setState((prev) => ({
          ...prev,
          title: '본인인증 오류',
          subTitle: '19세 미만은 매물등록, 거래참여\n및 네고머니 관련 서비스를 이용할 수 없습니다.',
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
            router.replace(returnUrl);
          }
        } else {
          router.replace('/');
        }

        closeVericyCiPopup();
      }
    },
    [closeVericyCiPopup, mutateAuth, returnUrl, router, setState],
  );

  const handleVerifyPhone = useCallback(() => {
    request('phone', handleNiceResponse);
  }, [handleNiceResponse, request]);

  const openVerifyCiPopup = useCallback(() => {
    if (!returnUrl) {
      handleUpdateReturnUrl();
    }

    setState({
      open: true,
      title: '본인인증',
      subTitle: '본인인증을 진행하고 있어요!',
      actionButtonTitle: '본인인증하기',
      cancelButtonTitle: '취소',
      actionButtonEvent: () => handleVerifyPhone(),
      cancelButtonEvent: () => closeVericyCiPopup(),
    });
  }, [closeVericyCiPopup, handleUpdateReturnUrl, handleVerifyPhone, returnUrl, setState]);

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
