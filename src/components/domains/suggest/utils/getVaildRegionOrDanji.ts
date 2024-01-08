import { DanjiOrRegionalType } from '@/constants/enums';

const getVaildRegionOrDanji = (danjiOrRegion: DanjiOrRegionalType | 0) => {
  if (!danjiOrRegion) return true;

  return false;
};

export default getVaildRegionOrDanji;
