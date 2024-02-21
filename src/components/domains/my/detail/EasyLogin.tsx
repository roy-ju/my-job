import { TextFieldV2 } from '@/components/molecules';

import UpdateButton from './UpdateButton';

import FormFieldContainer from './FormFieldContainer';

interface EasyLoginProps {
  label: string;
  value: string;
  handleUpdateField: () => void;
}

export default function EasyLogin({ label, value, handleUpdateField }: EasyLoginProps) {
  return (
    <FormFieldContainer>
      <TextFieldV2 variant="outlined">
        <TextFieldV2.Input label={label} value={value} readOnly tw="pointer-events-none" />
        <UpdateButton render handleClick={handleUpdateField} />
      </TextFieldV2>
    </FormFieldContainer>
  );
}
