import { ChangeEventHandler, useCallback, useMemo, useState } from 'react';

import { toast } from 'react-toastify';

import useIsomorphicLayoutEffect from '@/hooks/useIsomorphicLayoutEffect';

import sendPhoneVerificationCode from '@/apis/user/sendPhoneVerificationCode';

import updatePhone from '@/apis/user/updatePhone';

import ErrorCodes from '@/constants/error_codes';

export default function useMyUpdatePhone() {
  const VALID_TIME_OF_VERIFICATION = 180;

  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');
  const [sent, setSent] = useState(false);
  const [codeVerified, setCodeVerified] = useState(false);
  const [errorCode, setErrorCode] = useState<number | null>(null);
  const [verificationTimeLeft, setVerificationTimeLeft] = useState(0);

  const leftVerificationMinutes = Math.floor(verificationTimeLeft / 60);
  const leftVerificationSeconds = verificationTimeLeft % 60;

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

  const handleClickRemovePhoneValue = useCallback(() => {
    setPhone('');
  }, []);

  const handleClickVerifyCode = useCallback(async () => {
    const res = await updatePhone(phone, code);
    if (res?.error_code) {
      setErrorCode(res?.error_code);
      setCodeVerified(false);
    } else {
      setErrorCode(null);
      setCodeVerified(true);
    }
  }, [phone, code]);

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

  return {
    leftVerificationMinutes,
    leftVerificationSeconds,
    phone,
    code,
    sent,
    codeVerified,
    errorCode,
    errorMessage,
    handleChangePhone,
    handleChangeCode,
    handleClickSend,
    handleClickVerifyCode,
    handleClickRemovePhoneValue,
  };
}
