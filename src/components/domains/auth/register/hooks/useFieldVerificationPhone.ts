import { ChangeEvent, ChangeEventHandler, useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { apiService } from '@/services';

import ErrorCodes from '@/constants/error_codes';

import PHONE_VERIFY_STATUS from '../constants/phoneVerifyStatus';

import Popup from '../types/Popups';

import timerFormat from '../utils/timerFormat';

import PHONE_VERIFY_ERROR_MESSAGE from '../constants/phoneVerifyErrorMessage';

import REGISTER_STEP from '../constants/registerStep';

export default function useFieldVerificationPhone({
  phone,
  updateStepFunc,
  updatePopupFunc,
}: {
  phone: string;
  updateStepFunc: (v: number) => void;
  updatePopupFunc: (value: Popup) => void;
}) {
  const [verifyStatus, setVerifyStatus] = useState(PHONE_VERIFY_STATUS.DEFAULT);
  const [code, setCode] = useState('');
  const [codeErrMsg, setCodeErrMsg] = useState('');
  const [remainCount, setRemainCount] = useState(5);
  const [secondsLeft, setSecondsLeft] = useState(180);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const isRenderVerifyField = useMemo(() => verifyStatus > PHONE_VERIFY_STATUS.DEFAULT, [verifyStatus]);

  const handleChangeCode = useCallback<ChangeEventHandler<HTMLInputElement>>(async (e) => {
    const value = e.target.value;

    if (value.length === 0) {
      setCode('');
    }

    if (/^\d+$/.test(value) && value.length <= 6) {
      setCode(value);
    }
  }, []);

  const handleResetCode = useCallback(() => {
    setCode('');
  }, []);

  const handleUpdateVerifyStatus = useCallback((v: number) => {
    setVerifyStatus(v);
  }, []);

  const handleUpdateCodeErrMsg = useCallback((v: string) => {
    setCodeErrMsg(v);
  }, []);

  const resetTimer = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);

    setSecondsLeft(180);

    intervalRef.current = setInterval(() => {
      setSecondsLeft((prevSeconds) => (prevSeconds > 0 ? prevSeconds - 1 : 0));
    }, 1000);
  };

  /** 휴대폰 문자 인증 코드 전송 */
  const handleSendVerifcationCode = useCallback(async () => {
    const requestPhone = phone.replaceAll('-', '');

    const response = await apiService.sendPhoneVerificationCodeForRegister(requestPhone);

    if (response?.attemp_count_today && response.attemp_count_today <= 5) {
      handleUpdateVerifyStatus(PHONE_VERIFY_STATUS.ING);
    } else if (response?.error_code === ErrorCodes.MAX_SMS_ATTEMPS_REACHED) {
      updatePopupFunc('maxSmsAttemptsReached');
    }

    return response;
  }, [phone, handleUpdateVerifyStatus, updatePopupFunc]);

  const handleReSendVerifcationCode = useCallback(() => {
    handleSendVerifcationCode().then((res) => {
      if (res?.attemp_count_today && res.attemp_count_today <= 5) {
        resetTimer();
        updatePopupFunc('sendSms');
        setRemainCount(5 - res.attemp_count_today);
        handleUpdateCodeErrMsg('');
      }
    });
  }, [handleSendVerifcationCode, handleUpdateCodeErrMsg, updatePopupFunc]);

  const handleChangeCodeAndVerifyPhone = useCallback(
    async (e: ChangeEvent<HTMLInputElement>) => {
      handleChangeCode(e);

      const verifyCode = e.target.value;

      if (verifyCode.length < 6) {
        handleUpdateCodeErrMsg('');
      }

      if (verifyCode.length === 6) {
        const response = await apiService.phoneVerificationForRegister(phone.replaceAll('-', ''), verifyCode);

        if ((response as any)?.fields?.remaining_count === 0) {
          handleUpdateVerifyStatus(PHONE_VERIFY_STATUS.FAIL);
          handleUpdateCodeErrMsg(PHONE_VERIFY_ERROR_MESSAGE.CANNOT_VERIFY_THIS_CODE);
          return;
        }

        if (response?.error_code === ErrorCodes.PHONE_VERIFICATION_NUMBER_NOT_MATCH) {
          handleUpdateVerifyStatus(PHONE_VERIFY_STATUS.FAIL);
          handleUpdateCodeErrMsg(PHONE_VERIFY_ERROR_MESSAGE.CANNOT_MATCHED);
          return;
        }

        if (response?.error_code === ErrorCodes.PHONE_VERIFICATION_NUMBER_EXPIRED) {
          handleUpdateVerifyStatus(PHONE_VERIFY_STATUS.FAIL);
          handleUpdateCodeErrMsg(PHONE_VERIFY_ERROR_MESSAGE.EXPIRED);
          return;
        }

        updateStepFunc(REGISTER_STEP.TERMS);
        handleUpdateVerifyStatus(PHONE_VERIFY_STATUS.SUCCESS);
      }
    },
    [handleChangeCode, handleUpdateCodeErrMsg, handleUpdateVerifyStatus, phone, updateStepFunc],
  );

  useEffect(() => {
    if (verifyStatus === PHONE_VERIFY_STATUS.ING) {
      resetTimer();
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [verifyStatus]);

  useEffect(() => {
    if (secondsLeft === 0) {
      handleUpdateVerifyStatus(PHONE_VERIFY_STATUS.FAIL);
      handleUpdateCodeErrMsg(PHONE_VERIFY_ERROR_MESSAGE.EXPIRED);
    }
  }, [handleUpdateCodeErrMsg, handleUpdateVerifyStatus, secondsLeft]);

  return {
    isRenderVerifyField,

    verifyStatus,
    handleUpdateVerifyStatus,

    code,
    codeErrMsg,
    handleChangeCode: handleChangeCodeAndVerifyPhone,
    handleResetCode,

    handleUpdateCodeErrMsg,

    handleSendVerifcationCode,
    handleReSendVerifcationCode,

    time: timerFormat(secondsLeft),
    remainCount,
  };
}
