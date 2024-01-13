import { ChangeEventHandler, memo, useCallback, useMemo, useState } from 'react';

import { toast } from 'react-toastify';

import { mutate } from 'swr';

import { Panel } from '@/components/atoms';

import { OverlayPresenter, Popup } from '@/components/molecules';

import { UpdatePhone } from '@/components/templates';

import useIsomorphicLayoutEffect from '@/hooks/useIsomorphicLayoutEffect';

import { useRouter } from '@/hooks/utils';

import ErrorCodes from '@/constants/error_codes';

import Routes from '@/router/routes';

import updatePhone from '@/apis/user/updatePhone';

import sendPhoneVerificationCode from '@/apis/user/sendPhoneVerificationCode';

interface Props {
  depth: number;
  panelWidth?: string;
}

const VALID_TIME_OF_VERIFICATION = 180;

export default memo(({ depth, panelWidth }: Props) => {
  const router = useRouter(depth);
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');
  const [sent, setSent] = useState(false);
  const [codeVerified, setCodeVerified] = useState(false);
  const [errorCode, setErrorCode] = useState<number | null>(null);
  const [verificationTimeLeft, setVerificationTimeLeft] = useState(0);

  useIsomorphicLayoutEffect(() => {
    if (!sent) return;
    const intervalId = setInterval(() => {
      setVerificationTimeLeft((prev) => prev - 1);
    }, 1000);
    if (verificationTimeLeft === 0) {
      clearInterval(intervalId);
    }

    return () => clearInterval(intervalId);
  }, [verificationTimeLeft]);

  const leftVerificationMinutes = Math.floor(verificationTimeLeft / 60);
  const leftVerificationSeconds = verificationTimeLeft % 60;

  const errorMessage = useMemo(() => {
    if (sent && verificationTimeLeft === 0) {
      setErrorCode(ErrorCodes.PHONE_VERIFICATION_NUMBER_EXPIRED);
      return '인증번호 유효시간이 초과되었습니다.';
    }
    if (errorCode === ErrorCodes.PHONE_VERIFICATION_NUMBER_NOT_MATCH) {
      return '일치하지 않는 인증번호입니다.';
    }
    return '';
  }, [errorCode, verificationTimeLeft, sent]);

  const handleChangePhone = useCallback<ChangeEventHandler<HTMLInputElement>>(
    (e) => {
      if (codeVerified) return;
      setPhone(e.target.value);
    },
    [codeVerified],
  );

  const handleChangeCode = useCallback<ChangeEventHandler<HTMLInputElement>>(
    (e) => {
      if (errorCode === ErrorCodes.PHONE_VERIFICATION_NUMBER_NOT_MATCH) {
        setErrorCode(null);
      }
      setCode(e.target.value);
    },
    [errorCode],
  );

  const handleClickSend = useCallback(async () => {
    setVerificationTimeLeft(VALID_TIME_OF_VERIFICATION);
    setSent(true);
    setErrorCode(null);
    setCode('');
    const res = await sendPhoneVerificationCode(phone);
    if (res?.data?.error_code) {
      setErrorCode(res?.data?.error_code);
      return undefined;
    }
    if (sent) {
      toast.success('인증번호가 재발송되었습니다.');
    }
  }, [phone, sent]);

  const handleClickVerifyCode = useCallback(async () => {
    const res = await updatePhone(phone, code);
    await mutate('/user/info/get');
    if (res?.error_code) {
      setErrorCode(res?.error_code);
      setCodeVerified(false);
    } else {
      setErrorCode(null);
      setCodeVerified(true);
    }
  }, [phone, code]);

  const handleClickRemovePhoneValue = useCallback(() => {
    setPhone('');
  }, []);

  const handleClickNext = useCallback(() => {
    if (router.query.trigger === 'iPin') {
      router.replace(Routes.VerifyCiSuccess, {
        persistParams: true,
        searchParams: { redirect: (router.query.redirect as string) ?? '' },
      });
    } else {
      router.replace(Routes.MyDetail);
    }
  }, [router]);

  const handleClickBack = useCallback(() => {
    router.replace(Routes.MyDetail);
  }, [router]);

  if (errorCode === ErrorCodes.MAX_SMS_ATTEMPS_REACHED) {
    return (
      <OverlayPresenter>
        <Popup>
          <Popup.ContentGroup tw="py-10">
            <Popup.Title>인증번호 발송 불가</Popup.Title>
            <Popup.Body>
              하루 최대 인증번호 발송 한도를 초과했습니다.
              <br />
              내일 다시 시도해 주세요.
            </Popup.Body>
          </Popup.ContentGroup>
          <Popup.ButtonGroup>
            <Popup.ActionButton onClick={() => router.pop()}>확인</Popup.ActionButton>
          </Popup.ButtonGroup>
        </Popup>
      </OverlayPresenter>
    );
  }

  return (
    <Panel width={panelWidth}>
      <UpdatePhone
        phone={phone}
        code={code}
        sent={sent}
        minutes={leftVerificationMinutes}
        seconds={leftVerificationSeconds}
        codeErrorMessage={errorCode !== null ? errorMessage : ''}
        codeVerified={codeVerified}
        onChangePhone={handleChangePhone}
        onChangeCode={handleChangeCode}
        onClickSend={handleClickSend}
        onClickVerifyCode={handleClickVerifyCode}
        onClickNext={handleClickNext}
        onClickBack={handleClickBack}
        onClickRemovePhoneValue={handleClickRemovePhoneValue}
      />
    </Panel>
  );
});
