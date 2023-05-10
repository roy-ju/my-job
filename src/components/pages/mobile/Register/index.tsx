import checkNickname from '@/apis/user/checkNickname';
import login from '@/apis/user/login';
import { TermsState } from '@/components/organisms/RegisterForm';
import { MobRegister } from '@/components/templates';
import { PrivacyRetentionType } from '@/constants/enums';
import { useAuth } from '@/hooks/services';
import Routes from '@/router/routes';
import { useRouter } from 'next/router';
import { ChangeEventHandler, useCallback, useEffect, useMemo, useState } from 'react';

export default function RegisterWrraper() {
  const { login: handleLogin } = useAuth();

  const router = useRouter();

  const [email] = useState(`${router.query.email}`);
  const [nickname, setNickname] = useState('');
  const [nicknameErrMsg, setNickNameErrMsg] = useState('');

  const [privacyRetention, setPrivacyRetention] = useState('탈퇴시까지');
  const [isLoading, setIsLoading] = useState(false);

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
      email.length > 0 &&
      nickname.length > 0 &&
      terms.over19 &&
      terms.service &&
      terms.privacy &&
      terms.location &&
      terms.notification,
    [email, nickname, terms],
  );

  const handleChangeNickname = useCallback<ChangeEventHandler<HTMLInputElement>>((e) => {
    setNickname(e.target.value);
  }, []);

  const handleChangePrivacyRetention = useCallback((value: string) => {
    setPrivacyRetention(value);
  }, []);

  const handleChangeTerms = useCallback((newTerms: TermsState) => {
    setTerms(newTerms);
  }, []);

  const handleClickBack = useCallback(() => {
    router.replace(`/${Routes.EntryMobile}/${Routes.My}`);
  }, [router]);

  const handleClickNext = useCallback(async () => {
    setNickNameErrMsg('');
    setIsLoading(true);
    const checkNicknameResponse = await checkNickname(nickname);
    if (checkNicknameResponse?.error_code === 1009) {
      setNickNameErrMsg('중복된 닉네임 입니다.');
      setIsLoading(false);
      return;
    }

    let privacyRetentionType = PrivacyRetentionType.Deregister;

    if (privacyRetention === '1년') {
      privacyRetentionType = PrivacyRetentionType.OneYear;
    } else if (privacyRetention === '3년') {
      privacyRetentionType = PrivacyRetentionType.ThreeYear;
    } else if (privacyRetention === '5년') {
      privacyRetentionType = PrivacyRetentionType.FiveYear;
    }

    const loginResponse = await login({
      email,
      marketing: terms.marketing,
      nickname,
      privacyRetentionType,
      socialLoginType: Number(router.query.socialLoginType),
      token: router.query.token as string,
    });

    if (loginResponse?.access_token) {
      handleLogin(loginResponse.access_token, loginResponse.refresh_token);
    }

    setIsLoading(false);
    router.replace({
      pathname: `/${Routes.EntryMobile}/${Routes.RegisterSuccess}`,
      query: {
        redirect: router.query.redirect ?? '',
      },
    });
  }, [email, terms, privacyRetention, nickname, router, handleLogin]);

  useEffect(() => {
    if (!router.query.email || !router.query.token || !router.query.socialLoginType) {
      router.replace('/');
    }
  }, [router]);

  return (
    <MobRegister
      email={email}
      nickname={nickname}
      nicknameErrorMessage={nicknameErrMsg}
      privacyRetention={privacyRetention}
      terms={terms}
      formValid={formValid}
      isLoading={isLoading}
      onChangeNickname={handleChangeNickname}
      onChangePrivacyRetention={handleChangePrivacyRetention}
      onChangeTerms={handleChangeTerms}
      onClickNext={handleClickNext}
      onClickBackButton={handleClickBack}
    />
  );
}
