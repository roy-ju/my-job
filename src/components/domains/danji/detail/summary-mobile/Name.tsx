import { DanjiDetailResponse } from '@/services/danji/types';

import { DanjiNameWrraper, DanjiName } from './SummaryWidget';

type NameProps = {
  danji: DanjiDetailResponse;
};

export default function Name({ danji }: NameProps) {
  return (
    <DanjiNameWrraper>
      <DanjiName>{danji.name}</DanjiName>
    </DanjiNameWrraper>
  );
}
