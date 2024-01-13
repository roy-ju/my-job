import { useCallback, ChangeEventHandler } from 'react';
import { TextField } from '@/components/molecules';
import useControlled from '@/hooks/useControlled';

interface ChatReportTextFieldProps {
  value?: string;
  onChangeValue?: (value: string) => void;
}

export default function ChatReportTextField({ value, onChangeValue }: ChatReportTextFieldProps) {
  const [reportContent, setReportContent] = useControlled({ controlled: value, default: '' });

  const handleChange = useCallback<ChangeEventHandler<HTMLTextAreaElement>>(
    (e) => {
      if (e.target.value.length > 200) {
        return;
      }
      setReportContent(e.target.value);
      onChangeValue?.(e.target.value);
    },
    [setReportContent, onChangeValue],
  );

  return (
    <div>
      <TextField tw="flex items-start" variant="outlined" size="medium">
        <TextField.TextArea
          tw="min-h-[4.75rem]"
          placeholder="내용을 입력하세요."
          value={reportContent}
          onChange={handleChange}
        />
      </TextField>
      <TextField.HelperMessage>{reportContent.length} / 200</TextField.HelperMessage>
    </div>
  );
}
