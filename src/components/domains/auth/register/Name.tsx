import { ChangeEventHandler, useCallback, useState, MouseEvent, useMemo } from 'react';

import { TextFieldV2 } from '@/components/molecules';

import ResetButton from './ResetButton';

import FIELD_ID from './constants/fieldId';

interface NameProps {
  value?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  handleClickReset?: () => void;
}

export default function Name({ value, onChange, handleClickReset }: NameProps) {
  const [focus, setFocus] = useState(false);

  const handleFocus = useCallback(() => {
    setFocus(true);
  }, []);

  const handleBlur = useCallback(() => {
    setFocus(false);
  }, []);

  const handleResetName = useCallback(
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
  //     window.webkit?.messageHandlers?.showKeyboard?.postMessage?.('name');
  //   }
  // }, []);

  return (
    <div id={FIELD_ID.NAME}>
      <TextFieldV2 variant="outlined" onFocus={handleFocus} onBlur={handleBlur}>
        <TextFieldV2.Input label="이름" value={value} onChange={onChange} id="negocio-register-name-input" />
        <ResetButton render={renderResetIcon} handleMouseDown={handleResetName} />
      </TextFieldV2>
    </div>
  );
}
