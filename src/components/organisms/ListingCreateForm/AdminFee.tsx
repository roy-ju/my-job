import { Label, Radio } from '@/components/atoms';
import { RadioGroup, TextField } from '@/components/molecules';
import useControlled from '@/hooks/useControlled';
import { ChangeEventHandler, useCallback, useEffect, useState } from 'react';

interface AdminFeeProps {
  value?: string;
  onChange?: (value: string) => void;
}

export default function AdminFee({ value: valueProp, onChange }: AdminFeeProps) {
  const [type, setType] = useState('0');
  const [value, setValue] = useControlled({
    controlled: valueProp,
    default: '',
  });

  const handleChangeValue = useCallback<ChangeEventHandler<HTMLInputElement>>(
    (e) => {
      setValue(e.target.value);
      onChange?.(e.target.value);
    },
    [setValue, onChange],
  );

  const handleChangeType = useCallback<ChangeEventHandler<HTMLInputElement>>(
    (e) => {
      if (e.target.value === '0') {
        handleChangeValue({ target: { value: '' } } as any);
      }

      setType(e.target.value);
    },
    [handleChangeValue],
  );

  useEffect(() => {
    if (value && type === '0') {
      setType('1');
    }
  }, [value, type]);

  return (
    <div>
      <div tw="text-b1 leading-none font-bold mb-4">고정 관리비</div>
      <RadioGroup tw="flex gap-4 mb-4" value={type} onChange={handleChangeType}>
        <Label control={<Radio />} value="0" label="없음" />
        <Label control={<Radio />} value="1" label="있음" />
      </RadioGroup>
      {type === '1' && (
        <div>
          <TextField variant="outlined">
            <TextField.PriceInput label="관리비" value={value} onChange={handleChangeValue} />
          </TextField>
          <TextField.PriceHelperMessage tw="mr-4">{value}</TextField.PriceHelperMessage>
        </div>
      )}
    </div>
  );
}
