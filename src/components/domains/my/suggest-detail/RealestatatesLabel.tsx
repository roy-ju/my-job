import { useMemo } from 'react';

import ChipV2 from '@/components/atoms/ChipV2';

import ChipVariantByRealestateType from '@/utils/chipVaiantByRealestateType';

import { RealestateType } from '@/constants/enums';

import { RealestateTypeString } from '@/constants/strings';

export default function RealestatatesLabel({ realestates }: { realestates?: string }) {
  const realestateTypes = useMemo(
    () =>
      Array.from(
        new Set(
          realestates
            ?.split(',')
            .map((d) => Number(d))
            .map((d) => (d === RealestateType.Yunrip ? RealestateType.Dasaedae : d))
            .sort((a, b) => a - b) ?? [],
        ),
      ),
    [realestates],
  );
  return (
    <div tw="flex flex-row flex-1 items-center gap-2">
      {realestateTypes.map((realestateType) => (
        <ChipV2 size="large" variant={ChipVariantByRealestateType[realestateType]} key={realestateType}>
          {RealestateTypeString[realestateType]}
        </ChipV2>
      ))}
    </div>
  );
}
