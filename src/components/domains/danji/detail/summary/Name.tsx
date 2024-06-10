import { DanjiNameWrraper, DanjiName } from './widget/SummaryWidget';

import { CommonDanjiDetailProps } from '../types';

export default function Name({ danji }: CommonDanjiDetailProps) {
  return (
    <DanjiNameWrraper>
      <DanjiName>{danji.name}</DanjiName>
    </DanjiNameWrraper>
  );
}
