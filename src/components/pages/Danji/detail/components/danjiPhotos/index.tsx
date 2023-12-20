import { PhotoHero } from '@/components/organisms';

import { useCallback, useMemo } from 'react';

import { useFetchDanjiPhotos } from '@/services/danji/useFetchDanjiPhotos';

import { DefaultListingImageLg } from '@/constants/strings';

import useDanjiDetailStore from '../../hooks/useDanjiDetailStore';

export default function DanjiPhotos() {
  const store = useDanjiDetailStore();

  const { photos } = useFetchDanjiPhotos({
    id: store?.danji?.danji_id,
    realestateType: store?.danji?.type,
  });

  const handlePhotos = useCallback(() => {}, []);

  const paths = useMemo(() => {
    if (photos) {
      const { danji_photos } = photos;

      return danji_photos ? danji_photos.map((item) => item.full_file_path) : [];
    }

    return [];
  }, [photos]);

  if (!store?.danji) return null;

  const { type } = store.danji;

  return (
    <PhotoHero photoPaths={paths} defaultPhotoPath={DefaultListingImageLg[type]} onClickViewPhotos={handlePhotos} />
  );
}
