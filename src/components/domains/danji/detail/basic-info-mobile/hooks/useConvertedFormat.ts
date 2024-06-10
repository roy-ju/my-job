import { useMemo } from 'react';

import { DanjiDetailResponse } from '@/services/danji/types';

export default function useConvertedFormat({ danji }: { danji: DanjiDetailResponse }) {
  const address = useMemo(() => danji?.road_name_address || danji?.jibun_address || '', [danji]);

  const joinSaedaeDong = useMemo(() => {
    const saedae = danji?.total_saedae_count && danji?.total_saedae_count !== '0' ? '세대' : '';
    const dong = danji?.total_dong_count ? '동수' : '';

    if (saedae && dong) {
      return `${saedae} / ${dong}`;
    }

    if (saedae) {
      return saedae;
    }

    if (dong) {
      return dong;
    }

    return '';
  }, [danji]);

  const joinSaedaeDongValue = useMemo(() => {
    const saedaeCount =
      danji?.total_saedae_count && danji?.total_saedae_count !== '0' ? `${danji?.total_saedae_count}세대` : '';

    const dongCount = danji?.total_dong_count ? `${danji?.total_dong_count}동` : '';

    if (saedaeCount && dongCount) {
      return `${saedaeCount} / ${dongCount}`;
    }

    if (saedaeCount) {
      return saedaeCount;
    }

    if (dongCount) {
      return dongCount;
    }

    return '';
  }, [danji]);

  return { address, joinSaedaeDong, joinSaedaeDongValue };
}
