import { Chip } from '@/components/atoms';

import { describeRealestateType } from '@/constants/enums';

import { RealestateTypeChipVariant } from '@/constants/strings';

import { RowCenterGapOne, DetailText } from './widget/SummaryWidget';

import { CommonDanjiDetailProps } from '../types';

export default function Address({ danji }: CommonDanjiDetailProps) {
  return (
    <RowCenterGapOne tw="mb-1">
      <Chip variant={RealestateTypeChipVariant[danji?.type]}>{describeRealestateType(danji?.type)}</Chip>
      <DetailText>{danji.road_name_address || danji.jibun_address}</DetailText>
    </RowCenterGapOne>
  );
}
