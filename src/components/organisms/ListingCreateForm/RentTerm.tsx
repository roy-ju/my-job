import { Dropdown } from '@/components/molecules';
import CheckIcon from '@/assets/icons/check.svg';
import useControlled from '@/hooks/useControlled';
import { useCallback } from 'react';
import { Button } from '@/components/atoms';

const yearOptions = Array(11)
  .fill(0)
  .map((_, i) => `${i}년`);

const monthOptions = Array(12)
  .fill(0)
  .map((_, i) => `${i}개월`);

interface RentTermProps {
  rentTermYear?: string;
  rentTermMonth?: string;
  rentTermNegotiable?: boolean;
  onChangeRentTermYear?: (value: string) => void;
  onChangeRentTermMonth?: (value: string) => void;
  onChangeRentTermNegotiable?: (value: boolean) => void;
}

export default function RentTerm({
  rentTermYear,
  rentTermMonth,
  rentTermNegotiable,
  onChangeRentTermYear,
  onChangeRentTermMonth,
  onChangeRentTermNegotiable,
}: RentTermProps) {
  const [negotiable, setNegotiable] = useControlled({
    controlled: rentTermNegotiable,
    default: true,
  });

  const handleChangeNegotiable = useCallback(
    (checked: boolean) => {
      setNegotiable(checked);
      onChangeRentTermNegotiable?.(checked);
    },
    [setNegotiable, onChangeRentTermNegotiable],
  );

  return (
    <div>
      <div>
        <div tw="flex justify-between mb-3">
          <div tw="text-b1 leading-none font-bold">임대 기간</div>
          <Button
            size="small"
            variant="gray"
            selected={!negotiable}
            onClick={() => handleChangeNegotiable(!negotiable)}
          >
            <CheckIcon tw="mr-2 text-gray-600" />
            협의 불가
          </Button>
        </div>
        <div tw="flex gap-3">
          <Dropdown
            tw="flex-1 min-w-0 text-black"
            variant="outlined"
            value={rentTermYear}
            onChange={onChangeRentTermYear}
          >
            {yearOptions.map((item) => (
              <Dropdown.Option key={item} value={item}>
                {item}
              </Dropdown.Option>
            ))}
          </Dropdown>
          <Dropdown
            tw="flex-1 min-w-0 text-black"
            variant="outlined"
            value={rentTermMonth}
            onChange={onChangeRentTermMonth}
          >
            {monthOptions.map((item) => (
              <Dropdown.Option key={item} value={item}>
                {item}
              </Dropdown.Option>
            ))}
          </Dropdown>
        </div>
      </div>
    </div>
  );
}
