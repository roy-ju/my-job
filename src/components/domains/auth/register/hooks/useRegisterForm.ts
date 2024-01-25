import { ChangeEventHandler, useCallback, useMemo, useRef, useState } from 'react';

import { useRouter } from 'next/router';

import useCheckPlatform from '@/hooks/useCheckPlatform';

import useAuth from '@/hooks/services/useAuth';

import { NICKNAME_REGEX } from '@/constants/regex';

import { apiService } from '@/services';

import Routes from '@/router/routes';

import convertSignupPass from '../utils/convertSignupPass';

import { TermsState } from '../Terms';

export default function useRegisterForm() {
  const { login: handleLogin } = useAuth();

  const router = useRouter();

  const { platform } = useCheckPlatform();

  const email = `${router.query.email}`;

  const nickNameRef = useRef<HTMLDivElement | null>(null);

  const [nickname, setNickname] = useState('');

  const [nicknameErrMsg, setNickNameErrMsg] = useState('');

  const [funnelInfo, setFunnelInfo] = useState('');

  const [isLoading, setIsLoading] = useState(false);

  const [focus, setFocus] = useState(false);

  const [terms, setTerms] = useState<TermsState>({
    over19: false,
    service: false,
    privacy: false,
    location: false,
    notification: false,
    marketing: false,
  });

  const formValid = useMemo(
    () =>
      !focus &&
      email.length > 0 &&
      nickname.length > 0 &&
      !nicknameErrMsg &&
      funnelInfo.length > 0 &&
      terms.over19 &&
      terms.service &&
      terms.privacy &&
      terms.location &&
      terms.notification,
    [
      focus,
      email.length,
      nickname.length,
      nicknameErrMsg,
      funnelInfo.length,
      terms.over19,
      terms.service,
      terms.privacy,
      terms.location,
      terms.notification,
    ],
  );

  const handleChangeNickname = useCallback<ChangeEventHandler<HTMLInputElement>>((e) => {
    const newValue = e.target.value;

    if (newValue.length === 0) {
      setNickname('');
      setNickNameErrMsg('');
    } else if (newValue.length <= 20 && NICKNAME_REGEX.validCharactersRegex.test(newValue)) {
      setNickname(newValue);
    }
  }, []);

  const handleResetNickNameErrorMsg = useCallback(() => {
    setFocus(true);
  }, []);

  const handleResetNickName = useCallback(() => {
    setNickname('');
    setNickNameErrMsg('');
    setFocus(true);
  }, []);

  const handleNickNameClientValidation = useCallback(() => {
    if (nickname.length < 3) {
      setNickNameErrMsg('3자 이상 20자 이하의 한글, 영문, 숫자만 사용 가능해요!');
    } else if (!NICKNAME_REGEX.general.test(nickname)) {
      setNickNameErrMsg('공백, 특수문자, 이모티콘 등은 사용할 수 없습니다.');
    } else {
      setNickNameErrMsg('');
    }
    setFocus(false);
  }, [nickname]);

  const handleChangeFunnelInfo = useCallback<ChangeEventHandler<HTMLInputElement>>((e) => {
    setFunnelInfo(e.target.value);
  }, []);

  const handleChangeTerms = useCallback((newTerms: TermsState) => {
    setTerms(newTerms);
  }, []);

  const handleClickRegister = useCallback(async () => {
    setIsLoading(true);

    const checkNicknameResponse = await apiService.checkNickname(nickname);

    if (checkNicknameResponse?.error_code === 1009) {
      setNickNameErrMsg('이미 사용 중인 닉네임이에요!');

      setIsLoading(false);

      nickNameRef.current?.scrollIntoView({ behavior: 'smooth' });

      return;
    }

    const loginResponse = await apiService.login({
      email,
      marketing: terms.marketing,
      nickname,
      socialLoginType: Number(router.query.socialLoginType),
      token: router.query.token as string,
      signUpSource: convertSignupPass(funnelInfo),
    });

    if (loginResponse?.access_token) {
      handleLogin(loginResponse.access_token, loginResponse.refresh_token);
    }

    setIsLoading(false);

    if (platform === 'pc') {
      const depth1 = router?.query.depth1;
      const depth2 = router?.query.depth2;

      let path = '';

      if (depth1 && depth2) {
        if (depth1 === Routes.Register) {
          path = `/${Routes.RegisterSuccess}`;
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
  }, [nickname, email, terms.marketing, router, funnelInfo, platform, handleLogin]);

  return {
    email,
    nickname,
    nickNameRef,
    nicknameErrMsg,
    funnelInfo,
    terms,
    formValid,
    isLoading,
    handleNickNameClientValidation,
    handleResetNickName,
    handleResetNickNameErrorMsg,
    handleChangeFunnelInfo,
    handleChangeNickname,
    handleChangeTerms,
    handleClickRegister,
  };
}
