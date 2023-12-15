import { useCallback } from 'react';

import { DanjiDetailResponse } from '@/services/danji/types';

import Paths from '@/constants/paths';
import { toast } from 'react-toastify';

export default function useDanjiShareHandler() {
  const onClickShare = useCallback((danji?: DanjiDetailResponse, callback?: () => void) => {
    if (!danji) return;

    const { danji_id, name, road_name_address, jibun_address } = danji;

    const link = `${window.origin}/danjiDetail?danjiID=${danji_id}`;

    window.Kakao.Share.sendDefault({
      objectType: 'feed',
      installTalk: true,
      content: {
        title: name ?? '',
        description: road_name_address ?? jibun_address ?? '',
        imageUrl: Paths.DEFAULT_OPEN_GRAPH_IMAGE_3,
        link: {
          mobileWebUrl: link,
          webUrl: link,
        },
        imageWidth: 1200,
        imageHeight: 630,
      },
      buttons: [
        {
          title: '자세히보기',
          link: {
            mobileWebUrl: link,
            webUrl: link,
          },
        },
      ],
    });

    callback?.();
  }, []);

  const setCopyUrl = useCallback((danji?: DanjiDetailResponse, callback?: () => void) => {
    if (!danji) return;

    const { danji_id, name, road_name_address, jibun_address } = danji;

    const content = `[네고시오] ${name}\n► ${road_name_address ?? jibun_address}\n\n${
      window.origin
    }/danjiDetail?danjiID=${danji_id}`;

    navigator.clipboard.writeText(content);

    toast.success('복사되었습니다.');

    callback?.();
  }, []);

  return { onClickShare, setCopyUrl };
}
