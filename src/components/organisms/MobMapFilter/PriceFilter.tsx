import { Slider } from '@/components/molecules';
import { BuyOrRent } from '@/constants/enums';
import { useControlled } from '@/hooks/utils';
import { formatNumberInKorean } from '@/utils';
import _ from 'lodash';
import { useCallback, useMemo } from 'react';

function useEnabled(value: BuyOrRent, list: string) {
  return useMemo(() => list.split(',').includes(`${value}`), [list, value]);
}

function f(n: number) {
  return formatNumberInKorean(n, {
    formatFn: (v) => v.toLocaleString('ko-KR', { useGrouping: true }),
  });
}

export const PRICE_STEPS = [
  ..._.range(0, 50000000, 30000000),
  ..._.range(50000000, 500000000, 50000000),
  ..._.range(500000000, 1700000000, 100000000),
];

export const DEPOSIT_STEPS = [
  ..._.range(0, 5000000, 1000000),
  ..._.range(5000000, 70000000, 5000000),
  ..._.range(70000000, 200000000, 10000000),
  ..._.range(200000000, 1200000000, 50000000),
  ..._.range(1200000000, 1400000000, 100000000),
];

export const RENT_STEPS = [
  ..._.range(0, 500000, 50000),
  ..._.range(500000, 600000, 10000),
  ..._.range(600000, 800000, 50000),
  ..._.range(800000, 2100000, 100000),
  ..._.range(2500000, 4500000, 500000),
];

const priceLabels = ['0', f(PRICE_STEPS[Math.floor(PRICE_STEPS.length / 2)]), '무제한'];

const depositLabels = ['0', f(DEPOSIT_STEPS[Math.floor(DEPOSIT_STEPS.length / 2)]), '무제한'];

const rentLabels = ['0', f(RENT_STEPS[Math.floor(RENT_STEPS.length / 2)]), '무제한'];

function PriceLabel({ steps, range }: { steps: number[]; range: number[] }) {
  const label = useMemo(() => {
    if (range[0] === 0 && range[1] === steps.length - 1) {
      return '무제한';
    }

    if (range[0] !== 0 && range[1] === steps.length - 1) {
      return `${f(steps[range[0]])} ~ 무제한`;
    }

    return `${f(steps[range[0]])} ~ ${f(steps[range[1]])}`;
  }, [range, steps]);

  return <span tw="text-b2 text-nego-1000">{label}</span>;
}

interface PriceFilterProps {
  buyOrRents: string;
  priceRange?: number[];
  depositRange?: number[];
  rentRange?: number[];
  onChangePriceRange?: (range: number[]) => void;
  onChangeDepositRange?: (range: number[]) => void;
  onChangeRentRange?: (range: number[]) => void;
}

export default function PriceFilter({
  priceRange: priceRangeProp,
  depositRange: depositRangeProp,
  rentRange: rentRangeProp,
  buyOrRents,
  onChangePriceRange,
  onChangeDepositRange,
  onChangeRentRange,
}: PriceFilterProps) {
  const [priceRange, setPriceRange] = useControlled({
    controlled: priceRangeProp,
    default: [0, PRICE_STEPS.length - 1],
  });

  const [depositRange, setDepositRange] = useControlled({
    controlled: depositRangeProp,
    default: [0, DEPOSIT_STEPS.length - 1],
  });

  const [rentRange, setRentRange] = useControlled({
    controlled: rentRangeProp,
    default: [0, RENT_STEPS.length - 1],
  });

  const buyEnabled = useEnabled(BuyOrRent.Buy, buyOrRents);

  const jeonsaeEnabled = useEnabled(BuyOrRent.Jeonsae, buyOrRents);

  const wolsaeEnabled = useEnabled(BuyOrRent.Wolsae, buyOrRents);

  const handleChangePriceRange = useCallback(
    (newRange: number[]) => {
      setPriceRange(newRange);
      onChangePriceRange?.(newRange);
    },
    [setPriceRange, onChangePriceRange],
  );

  const handleChangeDepositRange = useCallback(
    (newRange: number[]) => {
      setDepositRange(newRange);
      onChangeDepositRange?.(newRange);
    },
    [setDepositRange, onChangeDepositRange],
  );

  const handleChangeRentRange = useCallback(
    (newRange: number[]) => {
      setRentRange(newRange);
      onChangeRentRange?.(newRange);
    },
    [setRentRange, onChangeRentRange],
  );

  return (
    <div tw="py-5">
      <p tw="text-b1 text-gray-1000 font-bold mb-5">가격</p>
      <div tw="flex flex-col gap-4">
        {buyEnabled && (
          <div>
            <div tw="flex items-center justify-between mb-2.5">
              <span tw="text-b2 text-gray-1000">매매가</span>
              <PriceLabel steps={PRICE_STEPS} range={priceRange} />
            </div>
            <Slider
              min={0}
              max={PRICE_STEPS.length - 1}
              defaultValue={[0, PRICE_STEPS.length - 1]}
              labels={priceLabels}
              value={priceRange}
              onChange={handleChangePriceRange}
            />
          </div>
        )}
        {jeonsaeEnabled && (
          <div>
            <div tw="flex items-center justify-between mb-2.5">
              <span tw="text-b2 text-gray-1000">보증금 (전 / 월세)</span>
              <PriceLabel steps={DEPOSIT_STEPS} range={depositRange} />
            </div>
            <Slider
              min={0}
              max={DEPOSIT_STEPS.length - 1}
              defaultValue={[0, DEPOSIT_STEPS.length - 1]}
              labels={depositLabels}
              value={depositRange}
              onChange={handleChangeDepositRange}
            />
          </div>
        )}
        {wolsaeEnabled && (
          <div>
            <div tw="flex items-center justify-between mb-2.5">
              <span tw="text-b2 text-gray-1000">월차임</span>
              <PriceLabel steps={RENT_STEPS} range={rentRange} />
            </div>
            <Slider
              min={0}
              max={RENT_STEPS.length - 1}
              defaultValue={[0, RENT_STEPS.length - 1]}
              labels={rentLabels}
              value={rentRange}
              onChange={handleChangeRentRange}
            />
          </div>
        )}
      </div>
    </div>
  );
}
