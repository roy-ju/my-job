import { ChangeEventHandler, useCallback, useState, MouseEvent, useMemo } from 'react';

import { TextFieldV2 } from '@/components/molecules';

import Timer from './Timer';

import ReSendButton from './ResendButton';

import ResetButton from './ResetButton';

import ErrorMessage from './ErrorMessage';

interface PhoneVerificationProps {
  isRender: boolean;
  time: string;
  value: string;
  errorMessage?: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  handleClickReset: () => void;
  handleReSendVerifcationCode?: () => void;

  handleClientValidation?: () => void;
  handleResetErrorMsg?: () => void;
}

export default function PhoneVerification({
  isRender,
  time,
  value,
  errorMessage,
  onChange,
  handleClickReset,
  handleReSendVerifcationCode,

  handleResetErrorMsg,
  handleClientValidation,
}: PhoneVerificationProps) {
  const [focus, setFocus] = useState(false);

  const handleFocus = useCallback(() => {
    handleResetErrorMsg?.();
    setFocus(true);
  }, [handleResetErrorMsg]);

  const handleBlur = useCallback(() => {
    if (value) {
      setTimeout(() => {
        handleClientValidation?.();
      }, 100);
    }
    setFocus(false);
  }, [handleClientValidation, value]);

  const handleResetCode = useCallback(
    (e?: MouseEvent<HTMLButtonElement>) => {
      e?.stopPropagation();
      handleClickReset?.();
    },
    [handleClickReset],
  );

  const renderResetIcon = useMemo(() => {
    if (value?.length === 6) return false;

    if (value && focus) return true;

    return false;
  }, [value, focus]);

  if (!isRender) return null;

  return (
    <div>
      <TextFieldV2 variant="outlined" hasError={Boolean(errorMessage)} onFocus={handleFocus} onBlur={handleBlur}>
        <TextFieldV2.Input mode="numeric" label="인증번호" value={value} onChange={onChange} maxLength={13} />
        <ResetButton render={renderResetIcon} handleMouseDown={handleResetCode} prChange={!!errorMessage} />
        <TextFieldV2.Trailing tw="pr-4">
          <Timer>{time}</Timer>
        </TextFieldV2.Trailing>
      </TextFieldV2>
      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
      <ReSendButton handleClick={handleReSendVerifcationCode} />
    </div>
  );
}
