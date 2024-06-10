import { useRouter } from 'next/router';

import { Panel } from '@/components/atoms';

import { DanjiDetailResponse, DanjiPhotosResponse } from '@/services/danji/types';

import { useFetchDanjiPhotos } from '@/services/danji/useFetchDanjiPhotos';

import DanjiPhotos from '@/components/domains/danji/DanjiPhotos';

interface Props {
  prefetchedData?: DanjiDetailResponse;
  prefetchedPhotosData?: DanjiPhotosResponse;
  panelWidth?: string;
}

export default function DanjiPhotosPc({ panelWidth, prefetchedData, prefetchedPhotosData }: Props) {
  const router = useRouter();

  const onClickBack = () => {
    const depth1 = router.query.depth1;
    const depth2 = router.query.depth2;

    const query = router.query;

    delete query.depth1;
    delete query.depth1;

    if (depth1 && depth2) {
      router.replace({ pathname: `/${depth1}`, query: { ...query } });
    } else if (depth1 && !depth2) {
      router.replace('/');
    }
  };

  const { danjiPhotos } = useFetchDanjiPhotos({
    prefetchedData: prefetchedPhotosData,
    danjiId: prefetchedData?.danji_id,
    realestateType: prefetchedData?.type,
  });

  return (
    <Panel width={panelWidth}>
      <DanjiPhotos danjiName={prefetchedData?.name} danjiPhotos={danjiPhotos} onClickBack={onClickBack} />
    </Panel>
  );
}
