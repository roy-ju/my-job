import { Chip } from '@/components/atoms';

import { describeRealestateType } from '@/constants/enums';

import { RealestateTypeChipVariant } from '@/constants/strings';

import { DanjiDetailResponse } from '@/services/danji/types';

import { RowCenterGapOne, DetailText } from './SummaryWidget';

type AddressProps = {
  danji: DanjiDetailResponse;
};

export default function Address({ danji }: AddressProps) {
  return (
    <RowCenterGapOne tw="mb-1">
      <Chip variant={RealestateTypeChipVariant[danji?.type]}>{describeRealestateType(danji?.type)}</Chip>
      <DetailText>{danji.road_name_address || danji.jibun_address}</DetailText>
    </RowCenterGapOne>
  );
}
