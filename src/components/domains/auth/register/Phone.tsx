import { ChangeEventHandler, useCallback, useState, MouseEvent, useMemo } from 'react';

import { TextFieldV2 } from '@/components/molecules';

import ResetButton from './ResetButton';

interface PhoneProps {
  value?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  handleClickReset?: () => void;
}

export default function Phone({ value, onChange, handleClickReset }: PhoneProps) {
  const [focus, setFocus] = useState(false);

  const handleFocus = useCallback(() => {
    setFocus(true);
  }, []);

  const handleBlur = useCallback(() => {
    setFocus(false);
  }, []);

  const handleResetPhoneNumber = useCallback(
    (e?: MouseEvent<HTMLButtonElement>) => {
      e?.stopPropagation();
      handleClickReset?.();
    },
    [handleClickReset],
  );

  const renderResetIcon = useMemo(() => {
    if (value && focus) return true;

    return false;
  }, [value, focus]);

  // useEffect(() => {
  //   if (typeof window !== 'undefined') {
  //     window.webkit?.messageHandlers?.showKeyboard?.postMessage?.('phone');
  //   }
  // }, []);

  return (
    <div>
      <TextFieldV2 variant="outlined" onFocus={handleFocus} onBlur={handleBlur}>
        <TextFieldV2.Input
          id="negocio-register-phone-input"
          mode="numeric"
          label="전화번호"
          value={value}
          onChange={onChange}
          maxLength={13}
        />
        <ResetButton render={renderResetIcon} handleMouseDown={handleResetPhoneNumber} />
      </TextFieldV2>
    </div>
  );
}
