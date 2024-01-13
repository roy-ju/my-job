import { ChangeEventHandler, useCallback, useEffect } from 'react';

import { Button, Label, Radio } from '@/components/atoms';

import { RadioGroup, TextField } from '@/components/molecules';

import useTooltip from '@/states/hooks/useTooltip';

import useControlled from '@/hooks/useControlled';

import QuestionIcon from '@/assets/icons/question.svg';

import CloseContained from '@/assets/icons/close_contained.svg';

interface RentAreaProps {
  value?: string;
  hasRentArea?: string;
  onChangeValue?: (value: string) => void;
  onChangeHasRentArea?: (value: string) => void;
  onClickQuestion?: () => void;
}

export default function RentArea({
  value,
  hasRentArea: hasRentAreaProp,
  onChangeValue,
  onChangeHasRentArea,
}: RentAreaProps) {
  const { openTooltip } = useTooltip();

  const [hasRentArea, setHasRentArea] = useControlled({
    controlled: hasRentAreaProp,
    default: '0',
  });

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
      onChangeHasRentArea?.(v);
      handleChange({ target: { value: '' } } as any);
    },
    [handleChange, setHasRentArea, onChangeHasRentArea],
  );

  useEffect(() => {
    if (value && hasRentArea === '0') {
      setHasRentArea('1');
      onChangeHasRentArea?.('1');
    }
  }, [value, hasRentArea, setHasRentArea, onChangeHasRentArea]);

  return (
    <div>
      <div tw="mb-3 flex items-center gap-1">
        <div tw="text-b1 leading-none font-bold">임대할 부분</div>
        <Button variant="ghost" size="none" tw="pb-px" onClick={() => openTooltip('rentArea')}>
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
              {rentArea && (
                <TextField.Trailing
                  tw="absolute right-1.5 bottom-4 cursor-pointer"
                  onClick={() => {
                    setRentArea('');
                    onChangeValue?.('');
                  }}
                >
                  <CloseContained />
                </TextField.Trailing>
              )}
            </TextField>
          </div>
        )}
      </div>
    </div>
  );
}
