import { GetMySuggestListResponse } from '@/apis/suggest/getMySuggestList';
import { Checkbox, Chip, Moment, Switch } from '@/components/atoms';
import { RealestateType } from '@/constants/enums';
import { RealestateTypeString } from '@/constants/strings';
import { ChangeEventHandler, useCallback, useMemo } from 'react';

const chipVariantByRealestateType: Record<number, 'nego' | 'green' | 'red' | 'blue' | 'orange'> = {
  [RealestateType.Apartment]: 'nego',
  [RealestateType.Officetel]: 'green',
  [RealestateType.Dandok]: 'red',
  [RealestateType.Dagagoo]: 'blue',
  [RealestateType.Yunrip]: 'orange',
  [RealestateType.Dasaedae]: 'orange',
};

interface Props {
  item?: NonNullable<GetMySuggestListResponse['list']>[0];
  inputType?: 'checkbox' | 'switch' | 'none';
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (value: boolean) => void;
}

export default function SuggestRequestedListItem({
  item,
  inputType = 'switch',
  checked,
  defaultChecked,
  onChange,
}: Props) {
  const handleInputChange = useCallback<ChangeEventHandler<HTMLInputElement>>(
    (e) => {
      onChange?.(e.target.checked);
    },
    [onChange],
  );

  const realestateTypes = useMemo(
    () => item?.realestate_types?.split(',').map((d) => Number(d)) ?? [],
    [item?.realestate_types],
  );

  return (
    <div>
      <button type="button" tw="w-full text-start px-5 hover:bg-gray-100">
        <div tw="py-5">
          <div tw="flex items-center gap-3">
            {inputType === 'checkbox' && <Checkbox checked={checked} onChange={handleInputChange} />}
            <div tw="flex gap-1 flex-1">
              {realestateTypes?.map((d) => (
                <Chip key={d} variant={chipVariantByRealestateType[d]}>
                  {RealestateTypeString[d]}
                </Chip>
              ))}
            </div>
            {inputType === 'switch' && (
              <Switch defaultChecked={defaultChecked} checked={checked} onChange={handleInputChange} />
            )}
          </div>
          <div tw="text-b1 font-bold my-1.5">{item?.title}</div>
          <div tw="text-info text-gray-700">
            <span tw="mr-1">요청일:</span>
            <Moment format="calendar">{item?.created_time}</Moment>
          </div>
        </div>
      </button>
    </div>
  );
}
