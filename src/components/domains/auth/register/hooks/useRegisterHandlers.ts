import { useCallback, useEffect, useMemo, useState } from 'react';

import { useRouter } from 'next/router';

import useCheckPlatform from '@/hooks/useCheckPlatform';

import useRemoveSessionKey from '@/hooks/useRemoveSessionKey';

import useAuth from '@/hooks/services/useAuth';

import { apiService } from '@/services';

import Routes from '@/router/routes';

import Actions from '@/constants/actions';

import { SendPhoneVerificationCodeForRegisterResponse } from '@/services/auth/types';

import convertSignupPass from '../utils/convertSignupPass';

import TermsState from '../types/Terms';

import REGISTER_STEP from '../constants/registerStep';

import PHONE_VERIFY_STATUS from '../constants/phoneVerifyStatus';

export default function useRegisterHandlers({
  step,
  verifyStatus,
  name,
  phone,
  terms,
  updateStepFunc,
  sendSmsCodeFunc,
}: {
  step: number;
  verifyStatus: number;
  name: string;
  phone: string;
  terms: TermsState;
  updateStepFunc: (v: number) => void;
  sendSmsCodeFunc: () => Promise<SendPhoneVerificationCodeForRegisterResponse | null>;
}) {
  const router = useRouter();

  const { login: handleLogin } = useAuth();

  const { platform } = useCheckPlatform();

  const { removeSessionKey } = useRemoveSessionKey();

  const [isLoadingRegister, setIsLoadingRegister] = useState(false);

  const isRenderCta = useMemo(() => {
    if (step === REGISTER_STEP.NONE) return false;

    if (step === REGISTER_STEP.PHONE && verifyStatus > PHONE_VERIFY_STATUS.DEFAULT) return false;

    return true;
  }, [step, verifyStatus]);

  const ctaTitle = useMemo(() => {
    if (step === REGISTER_STEP.NAME) return '확인';

    if (step === REGISTER_STEP.PHONE) return '인증번호 받기';

    if (step === REGISTER_STEP.TERMS) return '동의하고 가입하기';

    return '';
  }, [step]);

  const disabledRegister = useMemo(() => {
    if (step === REGISTER_STEP.NONE) return false;

    if (step === REGISTER_STEP.NAME) {
      return true;
    }

    if (step === REGISTER_STEP.PHONE) {
      if (phone.length === 13) {
        return true;
      }

      return false;
    }

    if (step === REGISTER_STEP.TERMS) {
      return terms.over19 && terms.service && terms.privacy && terms.location && terms.notification;
    }
  }, [phone.length, step, terms.location, terms.notification, terms.over19, terms.privacy, terms.service]);

  /** 마지막 단계 또는 카카오 정보가 모두 존재할때 */
  const handleClickRegister = useCallback(async () => {
    setIsLoadingRegister(true);

    const loginResponse = await apiService.login({
      email: router?.query?.email ? (router.query.email as string) : '',
      marketing: terms.marketing,
      name: name || 'anonymous',
      phone: phone.replaceAll('-', ''),
      signUpSource: convertSignupPass('sns'),
      socialLoginType: Number(router.query.socialLoginType),
      token: router.query.token as string,
    });

    if (loginResponse?.access_token) {
      handleLogin(loginResponse.access_token, loginResponse.refresh_token);
    }

    setIsLoadingRegister(false);

    if (platform === 'pc') {
      const depth1 = router?.query.depth1;
      const depth2 = router?.query.depth2;

      let path = '';

      if (depth1 && depth2) {
        if (depth1 === Routes.Register) {
          path = `/${Routes.RegisterSuccess}/${depth2}`;
        } else if (depth2 === Routes.Register) {
          path = `/${depth1}/${Routes.RegisterSuccess}`;
        } else {
          path = `/${Routes.RegisterSuccess}`;
        }
      } else if (depth1 && !depth2) {
        if (depth1 === Routes.Register) {
          path = `/${Routes.RegisterSuccess}`;
        } else {
          path = `/${depth1}/${Routes.RegisterSuccess}`;
        }
      } else {
        path = `/${Routes.RegisterSuccess}`;
      }

      const query = router.query;

      delete query.depth1;
      delete query.depth2;

      router.replace({ pathname: path, query });
    } else {
      const query = router.query;

      router.replace({ pathname: `/${Routes.EntryMobile}/${Routes.RegisterSuccess}`, query });
    }
  }, [router, terms.marketing, name, phone, platform, handleLogin]);

  const handleRegisterCtas = useCallback(async () => {
    if (step === REGISTER_STEP.NONE) {
      return;
    }

    if (step === REGISTER_STEP.NAME) {
      updateStepFunc(REGISTER_STEP.PHONE);
      return;
    }

    if (step === REGISTER_STEP.PHONE) {
      sendSmsCodeFunc();
      return;
    }

    if (step === REGISTER_STEP.TERMS) {
      handleClickRegister();
    }
  }, [step, updateStepFunc, sendSmsCodeFunc, handleClickRegister]);

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      if (!url?.includes(Routes.RegisterSuccess)) {
        removeSessionKey(Actions.Danji_Favorite.key);
      }
    };

    router.events.on('routeChangeStart', handleRouteChange);

    return () => {
      router.events.off('routeChangeStart', handleRouteChange);
    };
  }, [removeSessionKey, router]);

  return {
    isRenderCta,
    ctaTitle,
    disabledRegister,
    isLoadingRegister,
    handleRegisterCtas,
  };
}
