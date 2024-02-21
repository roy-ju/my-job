import { useState, useCallback, ChangeEventHandler, useMemo } from 'react';

import { TextFieldV2 } from '@/components/molecules';

import UpdateButton from './UpdateButton';

import ResetButton from './ResetButton';

import FormFieldContainer from './FormFieldContainer';

interface NicknameProps {
  label: string;
  value: string;
  message: string;
  updateButtonDisbled: boolean;
  onChange: ChangeEventHandler<HTMLInputElement>;
  handleClickReset: () => void;
  handleUpdateField: () => void;
}

export default function Nickname({
  label,
  value,
  message,
  updateButtonDisbled,
  onChange,
  handleClickReset,
  handleUpdateField,
}: NicknameProps) {
  const [focus, setFocus] = useState(false);

  const handleFocus = useCallback(() => {
    setFocus(true);
  }, []);

  const handleBlur = useCallback(() => {
    setFocus(false);
  }, []);

  const renderResetButton = useMemo(() => focus && value.length > 0, [focus, value.length]);

  return (
    <FormFieldContainer>
      <TextFieldV2 variant="outlined" hasError={Boolean(message)} onFocus={handleFocus} onBlur={handleBlur}>
        <TextFieldV2.Input label={label} value={value} onChange={onChange} />
        <ResetButton render={renderResetButton} handleMouseDown={handleClickReset} />
        <UpdateButton render disabled={updateButtonDisbled} handleClick={handleUpdateField} />
      </TextFieldV2>
      {message && <TextFieldV2.ErrorMessage>{message}</TextFieldV2.ErrorMessage>}
    </FormFieldContainer>
  );
}
