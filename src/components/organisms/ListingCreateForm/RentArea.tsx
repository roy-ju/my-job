import { RadioGroup, TextField } from '@/components/molecules';
import { useControlled } from '@/hooks/utils';
import { ChangeEventHandler, useCallback, useState } from 'react';
import QuestionIcon from '@/assets/icons/question.svg';
import { Button, Label, Radio } from '@/components/atoms';

interface RentAreaProps {
  value?: string;
  onChangeValue?: (value: string) => void;
  onClickQuestion?: () => void;
}

export default function RentArea({ value, onChangeValue, onClickQuestion }: RentAreaProps) {
  const [hasRentArea, setHasRentArea] = useState('0');
  const [rentArea, setRentArea] = useControlled({ controlled: value, default: '' });

  const handleChange = useCallback<ChangeEventHandler<HTMLInputElement>>(
    (e) => {
      if (e.target.value.length > 100) {
        return;
      }
      setRentArea(e.target.value);
      onChangeValue?.(e.target.value);
    },
    [setRentArea, onChangeValue],
  );

  const handleChangeHasRentArea = useCallback(
    (v: string) => {
      setHasRentArea(v);
      handleChange({ target: { value: '' } } as any);
    },
    [handleChange],
  );

  return (
    <div>
      <div tw="mb-3 flex items-center gap-1">
        <div tw="text-b1 leading-none font-bold">특약조건</div>
        <Button variant="ghost" size="none" tw="pb-px" onClick={onClickQuestion}>
          <QuestionIcon />
        </Button>
      </div>
      <div tw="mt-3 flex flex-col gap-4">
        <div>
          <RadioGroup tw="flex gap-4" value={hasRentArea} onChange={(e) => handleChangeHasRentArea(e.target.value)}>
            <Label control={<Radio />} value="0" label="전체" />
            <Label control={<Radio />} value="1" label="부분" />
          </RadioGroup>
        </div>
        {hasRentArea && (
          <div>
            <TextField variant="outlined" size="medium">
              <TextField.Input
                value={rentArea}
                onChange={handleChange}
                disabled={hasRentArea === '0'}
                placeholder="ex) 101호, 전용 15m²"
              />
            </TextField>
          </div>
        )}
      </div>
    </div>
  );
}
