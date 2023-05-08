import { MobUpdatePhone } from '@/components/templates';
import { useRouter } from 'next/router';
import sendPhoneVerificationCode from '@/apis/user/sendPhoneVerificationCode';
import updatePhone from '@/apis/user/updatePhone';
import Routes from '@/router/routes';
import { ChangeEventHandler, useCallback, useMemo, useState } from 'react';

export default function UpdatePhoneWrraper() {
  const router = useRouter();
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');
  const [sent, setSent] = useState(false);
  const [codeVerified, setCodeVerified] = useState(false);
  const [errorCode, setErrorCode] = useState<number | null>(null);

  const errorMessage = useMemo(() => {
    if (errorCode === 1021) {
      return '인증번호가 일치하지 않습니다.';
    }
    return '';
  }, [errorCode]);

  const handleChangePhone = useCallback<ChangeEventHandler<HTMLInputElement>>((e) => {
    setPhone(e.target.value);
  }, []);

  const handleChangeCode = useCallback<ChangeEventHandler<HTMLInputElement>>((e) => {
    setCode(e.target.value);
  }, []);

  const handleClickSend = useCallback(async () => {
    setSent(true);
    await sendPhoneVerificationCode(phone);
  }, [phone]);

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

  const handleClickNext = useCallback(() => {
    router.replace(`/${Routes.EntryMobile}/${Routes.MyDetail}`);
  }, [router]);

  const handleClickBack = () => {
    router.back();
  };

  return (
    <MobUpdatePhone
      phone={phone}
      code={code}
      sent={sent}
      codeErrorMessage={errorMessage}
      codeVerified={codeVerified}
      onChangePhone={handleChangePhone}
      onChangeCode={handleChangeCode}
      onClickSend={handleClickSend}
      onClickVerifyCode={handleClickVerifyCode}
      onClickNext={handleClickNext}
      onClickBack={handleClickBack}
    />
  );
}
