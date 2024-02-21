import { ChangeEventHandler } from 'react';

import { TextFieldV2 } from '@/components/molecules';

import UpdateButton from './UpdateButton';

import FormFieldContainer from './FormFieldContainer';

interface PhoneProps {
  label: string;
  value: string;
  noValueText: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  handleUpdateField: () => void;
}

export default function Phone({ label, value, noValueText, handleUpdateField }: PhoneProps) {
  return (
    <FormFieldContainer>
      <TextFieldV2 variant="outlined">
        <TextFieldV2.Input
          mode="numeric"
          label={label}
          value={value || noValueText || ''}
          readOnly
          disabled={!value}
          tw="pointer-events-none"
        />
        <UpdateButton ctaTitle={value ? '수정' : '등록'} render handleClick={handleUpdateField} />
      </TextFieldV2>
    </FormFieldContainer>
  );
}
