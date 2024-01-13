import { Checkbox, Label } from '@/components/atoms';
import useControlled from '@/hooks/useControlled';
import { ChangeEventHandler, useCallback } from 'react';

interface ExtraOptionsProps {
  extraOptions?: number[];
  onChangeExtraOptions?: (id: number) => void;
  listingOptions?: {
    id: number;
    name: string;
    createdTime: string;
  }[];
}

export default function ExtraOptions({
  extraOptions: extraOptionsValueProp,
  onChangeExtraOptions,
  listingOptions,
}: ExtraOptionsProps) {
  const [extraOptionsValue, setExtraOptionsValue] = useControlled({
    controlled: extraOptionsValueProp,
    default: [],
  });

  const handleCheckBoxChange = useCallback<ChangeEventHandler<HTMLInputElement>>(
    (e) => {
      let newValue = [...extraOptionsValue];
      if (extraOptionsValue.includes(+e.target.id)) {
        newValue = newValue.filter((item) => item !== +e.target.id);
      } else {
        newValue.push(+e.target.id);
      }
      setExtraOptionsValue(newValue);
      onChangeExtraOptions?.(+e.target.id);
    },
    [setExtraOptionsValue, onChangeExtraOptions, extraOptionsValue],
  );

  return (
    <div>
      <div tw="text-b1 leading-none font-bold">추가 옵션</div>
      <div tw="mt-3 text-info text-gray-700">- 복수선택 가능합니다.</div>
      <div tw="mt-4 grid grid-cols-3  gap-4">
        {listingOptions?.map(({ name, id }) => (
          <Label
            label={name}
            key={id}
            control={<Checkbox id={`${id}`} onChange={handleCheckBoxChange} checked={extraOptionsValue.includes(id)} />}
          />
        ))}
      </div>
    </div>
  );
}
