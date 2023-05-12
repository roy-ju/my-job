import { Button } from '@/components/atoms';
import CheckIcon from '@/assets/icons/check.svg';
import { TextField } from '@/components/molecules';
import RemoveIcon from '@/assets/icons/remove.svg';
import { useControlled } from '@/hooks/utils';
import { ChangeEventHandler, useCallback } from 'react';

interface Props {
  price?: string;
  negotiable?: boolean;
  onChangePrice?: (value: string) => void;
  onChangeNegotiable?: (value: boolean) => void;
  onClickRemove?: () => void;
}

export default function InterimAmount({
  price: priceProp,
  negotiable: negotiableProp,
  onChangePrice,
  onChangeNegotiable,
  onClickRemove,
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
      <div>
        <div tw="flex justify-between mb-4">
          <div tw="flex items-center gap-1">
            <Button variant="ghost" size="none" onClick={onClickRemove}>
              <RemoveIcon />
            </Button>
            <div tw="text-info">중도금</div>
          </div>
          <Button
            size="small"
            variant="gray"
            selected={!negotiable}
            onClick={() => handleChangeNegotiable(!negotiable)}
          >
            <CheckIcon tw="mr-2 text-gray-600" />
            금액 협의 불가
          </Button>
        </div>
        <TextField variant="outlined">
          <TextField.PriceInput label="중도금" value={value} onChange={handleChangePrice} />
        </TextField>
        <TextField.PriceHelperMessage tw="mr-4">{value}</TextField.PriceHelperMessage>
      </div>
    </div>
  );
}
