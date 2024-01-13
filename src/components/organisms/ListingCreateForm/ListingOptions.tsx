import { Checkbox, Label } from '@/components/atoms';
import useControlled from '@/hooks/useControlled';
import { ChangeEventHandler, useCallback } from 'react';

interface ListingOptionsProps {
  verandaExtended?: boolean;
  verandaRemodelling?: boolean;
  onChangeVerandaExtended?: (value: boolean) => void;
  onChangeVerandaRemodelling?: (value: boolean) => void;
}

export default function ListingOptions({
  verandaExtended: verandaExtendedValueProp,
  verandaRemodelling: verandaRemodellingValueProp,
  onChangeVerandaExtended,
  onChangeVerandaRemodelling,
}: ListingOptionsProps) {
  const [verandaExtendedValue, setVerandaExtendedValue] = useControlled({
    controlled: verandaExtendedValueProp,
    default: false,
  });
  const [verandaRemodellingValue, setVerandaRemodellingValue] = useControlled({
    controlled: verandaRemodellingValueProp,
    default: false,
  });

  const handleChangeVerandaExtended = useCallback<ChangeEventHandler<HTMLInputElement>>(
    (e) => {
      setVerandaExtendedValue(e.target.checked);
      onChangeVerandaExtended?.(e.target.checked);
    },
    [setVerandaExtendedValue, onChangeVerandaExtended],
  );

  const handleChangeVerandaRemodelling = useCallback<ChangeEventHandler<HTMLInputElement>>(
    (e) => {
      setVerandaRemodellingValue(e.target.checked);
      onChangeVerandaRemodelling?.(e.target.checked);
    },
    [setVerandaRemodellingValue, onChangeVerandaRemodelling],
  );

  return (
    <div>
      <div tw="text-b1 leading-none font-bold">매물 옵션</div>
      <div tw="mt-[0.6875rem] text-info text-gray-700">- 복수선택 가능합니다.</div>
      <div tw="mt-4 grid grid-cols-3">
        <Label
          label="베란다 확장"
          control={<Checkbox checked={verandaExtendedValue} onChange={handleChangeVerandaExtended} />}
        />
        <Label
          label="2년 내 올수리"
          control={<Checkbox checked={verandaRemodellingValue} onChange={handleChangeVerandaRemodelling} />}
        />
      </div>
    </div>
  );
}
