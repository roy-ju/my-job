import { Slider } from '@/components/molecules';
import { BuyOrRent } from '@/constants/enums';
import { formatNumberInKorean } from '@/utils';
import _ from 'lodash';
import { useMemo, useState } from 'react';

function useEnabled(value: BuyOrRent, list: string) {
  return useMemo(() => list.split(',').includes(`${value}`), [list, value]);
}

function f(n: number) {
  return formatNumberInKorean(n, {
    formatFn: (v) => v.toLocaleString('ko-KR', { useGrouping: true }),
  });
}

const priceSteps = [
  ..._.range(0, 50000000, 30000000),
  ..._.range(50000000, 500000000, 50000000),
  ..._.range(500000000, 1700000000, 100000000),
];

const depositSteps = [
  ..._.range(0, 5000000, 1000000),
  ..._.range(5000000, 70000000, 5000000),
  ..._.range(70000000, 200000000, 10000000),
  ..._.range(200000000, 1200000000, 50000000),
  ..._.range(1200000000, 1400000000, 100000000),
];

const rentSteps = [
  ..._.range(0, 500000, 50000),
  ..._.range(500000, 600000, 10000),
  ..._.range(600000, 800000, 50000),
  ..._.range(800000, 2100000, 100000),
  ..._.range(2500000, 4500000, 500000),
];

const priceLabels = [
  '0',
  f(priceSteps[Math.floor(priceSteps.length / 2)]),
  '무제한',
];

const depositLabels = [
  '0',
  f(depositSteps[Math.floor(depositSteps.length / 2)]),
  '무제한',
];

const rentLabels = [
  '0',
  f(rentSteps[Math.floor(rentSteps.length / 2)]),
  '무제한',
];

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
  value?: string;
  onChange?: (value: string) => void;
}

export default function PriceFilter({ buyOrRents }: PriceFilterProps) {
  const [priceRange, setPriceRange] = useState([0, priceSteps.length - 1]);
  const [depositRange, setDepositRange] = useState([
    0,
    depositSteps.length - 1,
  ]);
  const [rentRange, setRentRange] = useState([0, rentSteps.length - 1]);

  const buyEnabled = useEnabled(BuyOrRent.Buy, buyOrRents);

  const jeonsaeEnabled = useEnabled(BuyOrRent.Jeonsae, buyOrRents);

  const wolsaeEnabled = useEnabled(BuyOrRent.Wolsae, buyOrRents);

  return (
    <div tw="py-5">
      <p tw="text-b1 text-gray-1000 font-bold mb-5">가격</p>
      <div tw="flex flex-col gap-4">
        {buyEnabled && (
          <div>
            <div tw="flex items-center justify-between mb-2.5">
              <span tw="text-b2 text-gray-1000">매매가</span>
              <PriceLabel steps={priceSteps} range={priceRange} />
            </div>
            <Slider
              min={0}
              max={priceSteps.length - 1}
              defaultValue={[0, priceSteps.length - 1]}
              labels={priceLabels}
              value={priceRange}
              onChange={(range) => setPriceRange(range)}
            />
          </div>
        )}
        {jeonsaeEnabled && (
          <div>
            <div tw="flex items-center justify-between mb-2.5">
              <span tw="text-b2 text-gray-1000">보증금 (전 / 월세)</span>
              <PriceLabel steps={depositSteps} range={depositRange} />
            </div>
            <Slider
              min={0}
              max={depositSteps.length - 1}
              defaultValue={[0, depositSteps.length - 1]}
              labels={depositLabels}
              value={depositRange}
              onChange={(range) => setDepositRange(range)}
            />
          </div>
        )}
        {wolsaeEnabled && (
          <div>
            <div tw="flex items-center justify-between mb-2.5">
              <span tw="text-b2 text-gray-1000">월차임</span>
              <PriceLabel steps={rentSteps} range={rentRange} />
            </div>
            <Slider
              min={0}
              max={rentSteps.length - 1}
              defaultValue={[0, rentSteps.length - 1]}
              labels={rentLabels}
              value={rentRange}
              onChange={(range) => setRentRange(range)}
            />
          </div>
        )}
      </div>
    </div>
  );
}
