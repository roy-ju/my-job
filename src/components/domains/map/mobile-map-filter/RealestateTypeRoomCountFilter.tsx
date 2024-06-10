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
      value: [1, 2].join(','),
    },
    { label: '원룸', value: [1].join(',') },
    { label: '투룸', value: [2].join(',') },
  ],
};

interface RealestateTypeRoomCountProps {
  realestateTypeGroup: RealestateTypeGroup;

  realestateTypes?: string;
  roomCounts?: string;
  onChangeRealestateTypes?: (value: string) => void;
  onChangeRoomCounts?: (value: string) => void;
}

export default function RealestateTypeFilter({
  realestateTypeGroup,
  realestateTypes: realestateTypesProp,
  roomCounts: roomCountsProp,
  onChangeRealestateTypes,
  onChangeRoomCounts,
}: RealestateTypeRoomCountProps) {
  const [realestateTypes, setRealestateTypes] = useControlled({
    controlled: realestateTypesProp,
    default: optionsList[realestateTypeGroup][0].value,
  });

  const [roomCounts, setRoomCounts] = useControlled({
    controlled: roomCountsProp,
    default: optionsList['one,two'][0].value,
  });

  const handleRealestateTypesChange = useCallback<ChangeEventHandler<HTMLInputElement>>(
    (event) => {
      setRealestateTypes(event.target.value);
      onChangeRealestateTypes?.(event.target.value);
    },
    [onChangeRealestateTypes, setRealestateTypes],
  );

  const handleRoomCountsChange = useCallback<ChangeEventHandler<HTMLInputElement>>(
    (event) => {
      setRoomCounts(event.target.value);
      onChangeRoomCounts?.(event.target.value);
    },
    [onChangeRoomCounts, setRoomCounts],
  );

  return (
    <div tw="py-5">
      <p tw="text-b1 text-gray-1000 font-bold mb-5">유형</p>
      <RadioGroup
        tw="flex gap-4"
        value={realestateTypeGroup === 'one,two' ? roomCounts : realestateTypes}
        onChange={realestateTypeGroup === 'one,two' ? handleRoomCountsChange : handleRealestateTypesChange}
      >
        {optionsList[realestateTypeGroup].map((option) => (
          <Label key={option.value} control={<Radio />} value={option.value} label={option.label} />
        ))}
      </RadioGroup>
    </div>
  );
}
