import { ChangeEventHandler } from 'react';

import { TextField } from '@/components/molecules';

type ReportTextFieldProps = {
  reportValue: string;
  handleChange: ChangeEventHandler<HTMLTextAreaElement>;
};

export default function ReportTextField({ reportValue, handleChange }: ReportTextFieldProps) {
  return (
    <div>
      <TextField tw="flex items-start" variant="outlined" size="medium">
        <TextField.TextArea
          tw="min-h-[4.75rem]"
          placeholder="내용을 입력하세요."
          value={reportValue}
          onChange={handleChange}
        />
      </TextField>
      <TextField.HelperMessage>{reportValue.length} / 200</TextField.HelperMessage>
    </div>
  );
}
