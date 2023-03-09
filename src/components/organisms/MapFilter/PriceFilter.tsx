import { Slider } from '@/components/molecules';
import { BuyOrRent } from '@/constants/enums';
import { useMemo } from 'react';

interface PriceFilterProps {
  buyOrRents: string;
  value?: string;
  onChange?: (value: string) => void;
}

export default function PriceFilter({ buyOrRents }: PriceFilterProps) {
  const buyEnabled = useMemo(
    () => buyOrRents.split(',').includes(`${BuyOrRent.Buy}`),
    [buyOrRents],
  );
  const jeonsaeEnabled = useMemo(
    () => buyOrRents.split(',').includes(`${BuyOrRent.Jeonsae}`),
    [buyOrRents],
  );
  const wolsaeEnabled = useMemo(
    () => buyOrRents.split(',').includes(`${BuyOrRent.Wolsae}`),
    [buyOrRents],
  );

  return (
    <div tw="py-5 bg-white">
      <p tw="text-b1 text-gray-1000 font-bold mb-5">가격</p>
      <div tw="flex flex-col gap-4">
        {buyEnabled && (
          <div>
            <div tw="flex items-center justify-between mb-2.5">
              <span tw="text-b2 text-gray-1000">매매가</span>
              <span tw="text-b2 text-nego-1000">0 ~ 6억 5,000</span>
            </div>
            <Slider
              min={0}
              max={10}
              step={1}
              defaultValue={[0, 10]}
              labels={['0', '5억', '무제한']}
            />
          </div>
        )}
        {jeonsaeEnabled && (
          <div>
            <div tw="flex items-center justify-between mb-2.5">
              <span tw="text-b2 text-gray-1000">보증금 (전 / 월세)</span>
              <span tw="text-b2 text-nego-1000">0 ~ 6억 5,000</span>
            </div>
            <Slider
              min={0}
              max={10}
              step={1}
              defaultValue={[0, 10]}
              labels={['0', '5억', '무제한']}
            />
          </div>
        )}
        {wolsaeEnabled && (
          <div>
            <div tw="flex items-center justify-between mb-2.5">
              <span tw="text-b2 text-gray-1000">매매가</span>
              <span tw="text-b2 text-nego-1000">0 ~ 6억 5,000</span>
            </div>
            <Slider
              min={0}
              max={10}
              step={1}
              defaultValue={[0, 10]}
              labels={['0', '5억', '무제한']}
            />
          </div>
        )}
      </div>
    </div>
  );
}
