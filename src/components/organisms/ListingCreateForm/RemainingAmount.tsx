import { TextField } from '@/components/molecules';
import { useControlled } from '@/hooks/utils';
import { ChangeEventHandler, useCallback } from 'react';

interface Props {
  value?: string;
  onChange?: (value: string) => void;
}

export default function RemainingAmount({ value: valueProp, onChange }: Props) {
  const [value, setValue] = useControlled({
    controlled: valueProp,
    default: '',
  });

  const handleChange = useCallback<ChangeEventHandler<HTMLInputElement>>(
    (e) => {
      setValue(e.target.value);
      onChange?.(e.target.value);
    },
    [setValue, onChange],
  );

  return (
    <div>
      <div>
        <div tw="flex justify-between mb-4">
          <div tw="text-info">잔금</div>
        </div>
        <TextField variant="outlined">
          <TextField.PriceInput disabled label="잔금" value={value} onChange={handleChange} isZeroAllowd />
        </TextField>
        <TextField.PriceHelperMessage>{value}</TextField.PriceHelperMessage>
      </div>
    </div>
  );
}
