import { Label, Radio } from '@/components/atoms';
import { RadioGroup } from '@/components/molecules';
import { BuyOrRent } from '@/constants/enums';
import useControlled from '@/hooks/useControlled';
import { ChangeEventHandler, useCallback } from 'react';
import { RealestateTypeGroup } from './types';

const optionsList = {
  'apt,oftl': [
    // {
    //   label: '매매 / 전월세',
    //   value: [BuyOrRent.Buy, BuyOrRent.Jeonsae, BuyOrRent.Wolsae].join(','),
    // },
    { label: '매매', value: [BuyOrRent.Buy].join(',') },
    { label: '전월세', value: [BuyOrRent.Jeonsae, BuyOrRent.Wolsae].join(',') },
  ],
  'villa,dandok': [
    // {
    //   label: '매매 / 전월세',
    //   value: [BuyOrRent.Buy, BuyOrRent.Jeonsae, BuyOrRent.Wolsae].join(','),
    // },
    { label: '매매', value: [BuyOrRent.Buy].join(',') },
    { label: '전월세', value: [BuyOrRent.Jeonsae, BuyOrRent.Wolsae].join(',') },
  ],
  'one,two': [
    {
      label: '전월세',
      value: [BuyOrRent.Jeonsae, BuyOrRent.Wolsae].join(','),
    },
    { label: '전세', value: [BuyOrRent.Jeonsae].join(',') },
    { label: '월세', value: [BuyOrRent.Wolsae].join(',') },
  ],
};

interface BuyOrRentFilterProps {
  realestateTypeGroup: RealestateTypeGroup;
  value?: string;
  onChange?: (value: string) => void;
}

export default function BuyorRentFilter({ realestateTypeGroup, value: valueProp, onChange }: BuyOrRentFilterProps) {
  const [value, setValueState] = useControlled({
    controlled: valueProp,
    default: optionsList[realestateTypeGroup][0].value,
  });

  const handleInputChange = useCallback<ChangeEventHandler<HTMLInputElement>>(
    (event) => {
      setValueState(event.target.value);
      onChange?.(event.target.value);
    },
    [onChange, setValueState],
  );

  return (
    <div tw="py-5">
      <p tw="text-b1 text-gray-1000 font-bold mb-5">거래 종류</p>
      <RadioGroup tw="flex gap-4" value={value} onChange={handleInputChange}>
        {optionsList[realestateTypeGroup].map((option) => (
          <Label key={option.value} control={<Radio />} value={option.value} label={option.label} />
        ))}
      </RadioGroup>
    </div>
  );
}
