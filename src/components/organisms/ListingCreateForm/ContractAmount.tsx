import { Button } from '@/components/atoms';
import CheckIcon from '@/assets/icons/check.svg';
import { TextField } from '@/components/molecules';
import { useControlled } from '@/hooks/utils';
import { ChangeEventHandler, useCallback } from 'react';

interface Props {
  price?: string;
  negotiable?: boolean;
  onChangePrice?: (value: string) => void;
  onChangeNegotiable?: (value: boolean) => void;
}

export default function ContractAmount({
  price: priceProp,
  negotiable: negotiableProp,
  onChangePrice,
  onChangeNegotiable,
}: Props) {
  const [value, setValue] = useControlled({
    controlled: priceProp,
    default: '',
  });

  const [negotiable, setNegotiable] = useControlled({ controlled: negotiableProp, default: true });

  const handleChangePrice = useCallback<ChangeEventHandler<HTMLInputElement>>(
    (e) => {
      setValue(e.target.value);
      onChangePrice?.(e.target.value);
    },
    [setValue, onChangePrice],
  );

  const handleChangeNegotiable = useCallback(
    (checked: boolean) => {
      setNegotiable(checked);
      onChangeNegotiable?.(checked);
    },
    [setNegotiable, onChangeNegotiable],
  );

  return (
    <div>
      <div tw="flex justify-between mb-4">
        <div tw="text-info">계약금</div>
        <Button size="small" variant="gray" selected={!negotiable} onClick={() => handleChangeNegotiable(!negotiable)}>
          <CheckIcon tw="mr-2 text-gray-600" />
          금액 협의 불가
        </Button>
      </div>
      <div>
        <TextField variant="outlined">
          <TextField.PriceInput label="계약금" value={value} onChange={handleChangePrice} isZeroAllowed />
        </TextField>
        <TextField.PriceHelperMessage tw="mr-4">{value}</TextField.PriceHelperMessage>
      </div>
    </div>
  );
}
