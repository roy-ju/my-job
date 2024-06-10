import { Label, Radio } from '@/components/atoms';
import { RadioGroup } from '@/components/molecules';
import { RealestateType } from '@/constants/enums';
import useControlled from '@/hooks/useControlled';
import { ChangeEventHandler, useCallback } from 'react';
import { RealestateTypeGroup } from './types';

const optionsList = {
  'apt,oftl': [
    {
      label: '전체',
      value: [RealestateType.Apartment, RealestateType.Officetel].join(','),
    },
    { label: '아파트', value: [RealestateType.Apartment].join(',') },
    { label: '오피스텔', value: [RealestateType.Officetel].join(',') },
  ],
  'villa,dandok': [
    {
      label: '전체',
      value: [RealestateType.Yunrip, RealestateType.Dasaedae, RealestateType.Dandok, RealestateType.Dagagoo].join(','),
    },
    {
      label: '빌라',
      value: [RealestateType.Yunrip, RealestateType.Dasaedae].join(','),
    },
    {
      label: '단독 / 다가구',
      value: [RealestateType.Dandok, RealestateType.Dagagoo].join(','),
    },
  ],
  'one,two': [
    {
      label: '전체',
      value: [RealestateType.Apartment, RealestateType.Officetel].join(','),
    },
    { label: '아파트', value: [RealestateType.Apartment].join(',') },
    { label: '오피스텔', value: [RealestateType.Officetel].join(',') },
  ],
};

interface RealestateTypeFilterProps {
  realestateTypeGroup: RealestateTypeGroup;
  value?: string;
  onChange?: (value: string) => void;
}

export default function RealestateTypeFilter({
  realestateTypeGroup,
  value: valueProp,
  onChange,
}: RealestateTypeFilterProps) {
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
      <p tw="text-b1 text-gray-1000 font-bold mb-5">유형</p>
      <RadioGroup tw="flex gap-4" value={value} onChange={handleInputChange}>
        {optionsList[realestateTypeGroup].map((option) => (
          <Label key={option.value} control={<Radio />} value={option.value} label={option.label} />
        ))}
      </RadioGroup>
    </div>
  );
}
