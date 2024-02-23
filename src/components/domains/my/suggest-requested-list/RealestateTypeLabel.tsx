import ChipV2 from '@/components/atoms/ChipV2';

import ChipVariantByRealestateType from '@/utils/chipVaiantByRealestateType';

import { RealestateType } from '@/constants/enums';

import { RealestateTypeString } from '@/constants/strings';

export default function RealestateTypeLabel({ realestateTypes }: { realestateTypes: string }) {
  const array = Array.from(
    new Set(
      realestateTypes
        ?.split(',')
        .map((d) => Number(d))
        .map((d) => (d === RealestateType.Yunrip ? RealestateType.Dasaedae : d))
        .sort((a, b) => a - b) ?? [],
    ),
  );

  if (array.length <= 2) {
    return (
      <div tw="flex gap-1">
        {array?.map((d) => (
          <ChipV2 key={d} variant={ChipVariantByRealestateType[d]} size="large">
            {RealestateTypeString[d]}
          </ChipV2>
        ))}
      </div>
    );
  }

  if (array.length > 2) {
    return (
      <div tw="flex gap-1">
        {array.map((d, index) => {
          if (index > 0) return null;

          return (
            <ChipV2 key={d} variant={ChipVariantByRealestateType[d]} size="large">
              {RealestateTypeString[d]} 외 {array.length - 1}
            </ChipV2>
          );
        })}
      </div>
    );
  }

  return null;
}
