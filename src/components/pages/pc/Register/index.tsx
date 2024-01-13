import checkNickname from '@/apis/user/checkNickname';
import login from '@/apis/user/login';
import { Panel } from '@/components/atoms';
import { TermsState } from '@/components/organisms/RegisterForm';
import { Register } from '@/components/templates';
import { NICKNAME_REGEX } from '@/constants/regex';
import useAuth from '@/hooks/services/useAuth';
import { useRouter } from '@/hooks/utils';
import Routes from '@/router/routes';
import { convertSignupPass } from '@/utils/fotmat';
import { ChangeEventHandler, memo, useCallback, useEffect, useMemo, useState } from 'react';

interface Props {
  depth: number;
  panelWidth?: string;
}

export default memo(({ depth, panelWidth }: Props) => {
  const { login: handleLogin } = useAuth();

  const router = useRouter(depth);

  const [email] = useState(`${router.query.email}`);
  const [nickname, setNickname] = useState('');
  const [nicknameErrMsg, setNickNameErrMsg] = useState('');
  const [funnelInfo, setFunnelInfo] = useState('');

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
      funnelInfo.length > 0 &&
      terms.over19 &&
      terms.service &&
      terms.privacy &&
      terms.location &&
      terms.notification,
    [email, nickname, terms, funnelInfo],
  );

  const handleChangeNickname = useCallback<ChangeEventHandler<HTMLInputElement>>((e) => {
    if (e.target.value?.length) {
      if (!NICKNAME_REGEX.noSpecialStringRegex.test(e.target.value)) {
        setNickNameErrMsg('공백, 특수문자, 이모티콘 등은 사용할 수 없습니다.');
      }
      if (!NICKNAME_REGEX.length.test(e.target.value)) {
        setNickNameErrMsg('닉네임은 3~20글자 이어야 합니다.');
      }
      if (NICKNAME_REGEX.general.test(e.target.value)) {
        setNickNameErrMsg('');
      }
    }
    setNickname(e.target.value);
  }, []);

  const handleChangeFunnelInfo = useCallback<ChangeEventHandler<HTMLInputElement>>((e) => {
    setFunnelInfo(e.target.value);
  }, []);

  const handleChangeTerms = useCallback((newTerms: TermsState) => {
    setTerms(newTerms);
  }, []);

  const handleClickNext = useCallback(async () => {
    setNickNameErrMsg('');
    setIsLoading(true);

    if (!NICKNAME_REGEX.noSpecialStringRegex.test(nickname)) {
      setNickNameErrMsg('공백, 특수문자, 이모티콘 등은 사용할 수 없습니다.');
      setIsLoading(false);
      return;
    }
    if (!NICKNAME_REGEX.length.test(nickname)) {
      setNickNameErrMsg('닉네임은 3~20글자 이어야 합니다.');
      setIsLoading(false);
      return;
    }
    if (NICKNAME_REGEX.general.test(nickname)) {
      setNickNameErrMsg('');
    }

    const checkNicknameResponse = await checkNickname(nickname);
    if (checkNicknameResponse?.error_code === 1009) {
      setNickNameErrMsg('중복된 닉네임 입니다.');
      setIsLoading(false);
      return;
    }

    const loginResponse = await login({
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

    router.replace(Routes.RegisterSuccess, {
      persistParams: true,
      searchParams: {
        redirect: (router.query.redirect as string) ?? '',
      },
    });
  }, [nickname, email, terms.marketing, router, funnelInfo, handleLogin]);

  useEffect(() => {
    if (!router.query.email || !router.query.token || !router.query.socialLoginType) {
      router.pop();
    }
  }, [router]);

  const handleNavigateToServiceTerms = useCallback(() => {
    router.replace(Routes.ServiceTerms, {
      searchParams: {
        register: 'true',
      },
      state: {
        email: router.query.email as string,
        token: router.query.token as string,
        socialLoginType: router.query.socialLoginType as string,
      },
    });
  }, [router]);
  const handleNavigateToPrivacyPolicy = useCallback(() => {
    router.replace(Routes.PrivacyPolicy, {
      searchParams: {
        register: 'true',
      },
      state: {
        email: router.query.email as string,
        token: router.query.token as string,
        socialLoginType: router.query.socialLoginType as string,
      },
    });
  }, [router]);
  const handleNavigateToLocationTerms = useCallback(() => {
    router.replace(Routes.LocationTerms, {
      searchParams: {
        register: 'true',
      },
      state: {
        email: router.query.email as string,
        token: router.query.token as string,
        socialLoginType: router.query.socialLoginType as string,
      },
    });
  }, [router]);

  return (
    <Panel width={panelWidth}>
      <Register
        email={email}
        nickname={nickname}
        nicknameErrorMessage={nicknameErrMsg}
        funnelInfo={funnelInfo}
        onChangeFunnelInfo={handleChangeFunnelInfo}
        terms={terms}
        formValid={formValid}
        isLoading={isLoading}
        onChangeNickname={handleChangeNickname}
        onChangeTerms={handleChangeTerms}
        onClickNext={handleClickNext}
        onNavigateToServiceTerms={handleNavigateToServiceTerms}
        onNavigateToPrivacyPolicy={handleNavigateToPrivacyPolicy}
        onNavigateToLocationTerms={handleNavigateToLocationTerms}
      />
    </Panel>
  );
});
