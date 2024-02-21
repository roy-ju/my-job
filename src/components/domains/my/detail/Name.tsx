import { useState, useCallback, ChangeEventHandler, MouseEvent, useMemo } from 'react';

import { TextFieldV2 } from '@/components/molecules';

import ResetButton from './ResetButton';

import FormFieldContainer from './FormFieldContainer';

import Message from './Message';

import UpdateButton from './UpdateButton';

interface NameProps {
  label: string;
  value: string;
  message: string;
  inputDisabled: boolean;
  updateButtonDisbled: boolean;
  onChange: ChangeEventHandler<HTMLInputElement>;
  handleClickReset: () => void;
  handleUpdateField: () => void;
  handleUpdateNameFieldFocus: (v: boolean) => void;
}

export default function Name({
  label,
  value,
  message,
  inputDisabled,
  updateButtonDisbled,
  onChange,
  handleClickReset,
  handleUpdateField,
  handleUpdateNameFieldFocus,
}: NameProps) {
  const [focus, setFocus] = useState(false);

  const handleFocus = useCallback(() => {
    setFocus(true);
    handleUpdateNameFieldFocus(true);
  }, [handleUpdateNameFieldFocus]);

  const handleBlur = useCallback(() => {
    setFocus(false);
    handleUpdateNameFieldFocus(false);
  }, [handleUpdateNameFieldFocus]);

  const handleResetName = useCallback(
    (e?: MouseEvent<HTMLButtonElement>) => {
      e?.stopPropagation();
      handleClickReset?.();
    },
    [handleClickReset],
  );

  const renderResetButton = useMemo(
    () => !inputDisabled && focus && value.length > 0,
    [focus, inputDisabled, value.length],
  );

  const renderUpdateButton = useMemo(() => !inputDisabled, [inputDisabled]);

  return (
    <FormFieldContainer>
      <TextFieldV2 variant="outlined" onFocus={handleFocus} onBlur={handleBlur}>
        <TextFieldV2.Input
          label={label}
          value={value}
          onChange={onChange}
          disabled={inputDisabled}
          tw="text-gray-1000"
        />
        <ResetButton render={renderResetButton} handleMouseDown={handleResetName} />
        <UpdateButton render={renderUpdateButton} disabled={updateButtonDisbled} handleClick={handleUpdateField} />
      </TextFieldV2>
      {message && <Message>{message}</Message>}
    </FormFieldContainer>
  );
}
