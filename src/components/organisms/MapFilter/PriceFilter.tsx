import { Slider } from '@/components/molecules';
import { BuyOrRent } from '@/constants/enums';
import { formatNumberInKorean } from '@/utils';
import _ from 'lodash';
import { useMemo, useState } from 'react';

const priceSteps = [
  0,
  30000000,
  ..._.range(50000000, 500000000, 50000000),
  ..._.range(500000000, 1600000001, 100000000),
];

const depositSteps = [
  ..._.range(0, 5000000, 1000000),
  ..._.range(5000000, 70000000, 5000000),
  ..._.range(70000000, 200000000, 10000000),
  ..._.range(200000000, 900000000, 50000000),
  ..._.range(900000000, 1000000001, 100000000),
];

function useEnabled(value: BuyOrRent, list: string) {
  return useMemo(() => list.split(',').includes(`${value}`), [list, value]);
}

function PriceLabel({ range }: { range: number[] }) {
  const label = useMemo(() => {
    if (range[0] === 0 && range[1] === priceSteps.length - 1) {
      return '무제한';
    }

    if (range[0] !== 0 && range[1] === priceSteps.length - 1) {
      return `${formatNumberInKorean(priceSteps[range[0]])} ~ 무제한`;
    }

    return `${formatNumberInKorean(
      priceSteps[range[0]],
    )} ~ ${formatNumberInKorean(priceSteps[range[1]])}`;
  }, [range]);

  return <span tw="text-b2 text-nego-1000">{label}</span>;
}

function DepositLabel({ range }: { range: number[] }) {
  const label = useMemo(() => {
    if (range[0] === 0 && range[1] === depositSteps.length - 1) {
      return '무제한';
    }

    if (range[0] !== 0 && range[1] === depositSteps.length - 1) {
      return `${formatNumberInKorean(depositSteps[range[0]])} ~ 무제한`;
    }

    return `${formatNumberInKorean(
      depositSteps[range[0]],
    )} ~ ${formatNumberInKorean(depositSteps[range[1]])}`;
  }, [range]);

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
              <PriceLabel range={priceRange} />
            </div>
            <Slider
              min={0}
              max={priceSteps.length - 1}
              step={1}
              defaultValue={[0, priceSteps.length - 1]}
              labels={['0', '5억', '무제한']}
              value={priceRange}
              onChange={(range) => setPriceRange(range)}
            />
          </div>
        )}
        {jeonsaeEnabled && (
          <div>
            <div tw="flex items-center justify-between mb-2.5">
              <span tw="text-b2 text-gray-1000">보증금 (전 / 월세)</span>
              <DepositLabel range={depositRange} />
            </div>
            <Slider
              min={0}
              max={depositSteps.length - 1}
              step={1}
              defaultValue={[0, depositSteps.length - 1]}
              labels={['0', '1억 2,000만', '무제한']}
              value={depositRange}
              onChange={(range) => setDepositRange(range)}
            />
          </div>
        )}
        {wolsaeEnabled && (
          <div>
            <div tw="flex items-center justify-between mb-2.5">
              <span tw="text-b2 text-gray-1000">매매가</span>
              <span tw="text-b2 text-nego-1000">무제한</span>
            </div>
            <Slider
              min={0}
              max={10}
              step={1}
              defaultValue={[0, 10]}
              labels={['0', '60만', '무제한']}
            />
          </div>
        )}
      </div>
    </div>
  );
}
