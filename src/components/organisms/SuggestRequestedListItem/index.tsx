import { GetMySuggestListResponse } from '@/apis/suggest/getMySuggestList';
import { Checkbox, Chip, Moment, Switch } from '@/components/atoms';
import { RealestateType } from '@/constants/enums';
import { RealestateTypeString } from '@/constants/strings';
import { ChangeEventHandler, MouseEventHandler, useCallback, useMemo } from 'react';

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
  onClick?: () => void;
}

export default function SuggestRequestedListItem({
  item,
  inputType = 'switch',
  checked,
  defaultChecked,
  onChange,
  onClick,
}: Props) {
  const handleInputChange = useCallback<ChangeEventHandler<HTMLInputElement>>(
    (e) => {
      onChange?.(e.target.checked);
    },
    [onChange],
  );

  const stopPropgation = useCallback<MouseEventHandler<HTMLInputElement>>((e) => {
    e.stopPropagation();
  }, []);

  const realestateTypes = useMemo(
    () =>
      Array.from(
        new Set(
          item?.realestate_types
            ?.split(',')
            .map((d) => Number(d))
            .map((d) => (d === RealestateType.Yunrip ? RealestateType.Dasaedae : d)) ?? [],
        ),
      ),
    [item?.realestate_types],
  );

  return (
    <div>
      <button
        type="button"
        tw="w-full text-start px-5 hover:bg-gray-100"
        onClick={inputType === 'checkbox' ? undefined : onClick}
      >
        <div tw="py-5">
          <div tw="flex items-center gap-3">
            {inputType === 'checkbox' && (
              <Checkbox checked={checked} onChange={handleInputChange} onClick={stopPropgation} />
            )}
            <div tw="flex gap-1 flex-1">
              {realestateTypes?.map((d) => (
                <Chip key={d} variant={chipVariantByRealestateType[d]}>
                  {RealestateTypeString[d]}
                </Chip>
              ))}
            </div>
            {inputType === 'switch' && (
              <Switch
                defaultChecked={defaultChecked}
                checked={checked}
                onChange={handleInputChange}
                onClick={stopPropgation}
              />
            )}
          </div>
          <div tw="text-b1 font-bold my-1.5">{item?.title}</div>
          <div tw="flex justify-between">
            <div tw="text-info text-gray-700">
              <span tw="mr-1">요청일:</span>
              <Moment format="calendar">{item?.created_time}</Moment>
            </div>
            <div tw="text-info text-gray-700">추천받은 매물수 {item?.suggest_recommended_count ?? 0}</div>
          </div>
        </div>
      </button>
    </div>
  );
}
