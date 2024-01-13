import { RadioGroup, TextField } from '@/components/molecules';
import useControlled from '@/hooks/useControlled';
import { ChangeEventHandler, useCallback, useEffect } from 'react';
import { Label, Radio } from '@/components/atoms';

interface SpecialTermsProps {
  value?: string;
  hasSpecialTerms?: string;
  onChangeValue?: (value: string) => void;
  onChangeHasSpecialTerms?: (value: string) => void;
  onClickQuestion?: () => void;
}

export default function SpecialTerms({
  value,
  hasSpecialTerms: hasSpecialTermsProp,
  onChangeHasSpecialTerms,
  onChangeValue,
}: SpecialTermsProps) {
  const [hasSpecialTerms, setHasSpecialTerms] = useControlled({
    controlled: hasSpecialTermsProp,
    default: '0',
  });

  const [specialTerms, setSpecialTerms] = useControlled({ controlled: value, default: '' });

  const handleChange = useCallback<ChangeEventHandler<HTMLTextAreaElement>>(
    (e) => {
      if (e.target.value.length > 100) {
        return;
      }
      setSpecialTerms(e.target.value);
      onChangeValue?.(e.target.value);
    },
    [setSpecialTerms, onChangeValue],
  );

  const handleChangeHasSpecialTerms = useCallback(
    (v: string) => {
      setHasSpecialTerms(v);
      onChangeHasSpecialTerms?.(v);
      handleChange({ target: { value: '' } } as any);
    },
    [handleChange, setHasSpecialTerms, onChangeHasSpecialTerms],
  );

  useEffect(() => {
    if (value && hasSpecialTerms === '0') {
      setHasSpecialTerms('1');
      onChangeHasSpecialTerms?.('1');
    }
  }, [value, hasSpecialTerms, setHasSpecialTerms, onChangeHasSpecialTerms]);

  return (
    <div>
      <div tw="mb-3 flex items-center gap-1">
        <div tw="text-b1 leading-none font-bold">특약조건</div>
      </div>
      <div tw="mt-3 flex flex-col gap-4">
        <div>
          <RadioGroup
            tw="flex gap-4"
            value={hasSpecialTerms}
            onChange={(e) => handleChangeHasSpecialTerms(e.target.value)}
          >
            <Label control={<Radio />} value="0" label="없음" />
            <Label control={<Radio />} value="1" label="있음" />
          </RadioGroup>
        </div>
        <div>
          <TextField variant="outlined" size="medium">
            <TextField.TextArea
              value={specialTerms}
              onChange={handleChange}
              tw="min-h-[72px]"
              disabled={hasSpecialTerms === '0'}
              placeholder="반려동물, 시설물 상태, 수리가능 여부 등을 입력해 주세요."
            />
          </TextField>
          <TextField.HelperMessage>{specialTerms.length} / 100</TextField.HelperMessage>
        </div>
      </div>
    </div>
  );
}
