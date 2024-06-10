import { useCallback, useMemo } from 'react';

import { useRouter } from 'next/router';

import Routes from '@/router/routes';

import { DefaultListingImageLg } from '@/constants/strings';

import { DanjiPhotosResponse } from '@/services/danji/types';

import { CommonDanjiDetailProps } from '../types';

import PhotoHero from './PhotoHero';

interface PhotosProps extends CommonDanjiDetailProps {
  danjiPhotos?: DanjiPhotosResponse;
}

export default function PhotosPc({ danji, danjiPhotos }: PhotosProps) {
  const router = useRouter();

  const handlePhotos = useCallback(() => {
    router.push(`/${Routes.DanjiDetail}/${Routes.DanjiPhotos}?danjiID=${danji.danji_id}`);
  }, [router, danji]);

  const paths = useMemo(() => danjiPhotos?.danji_photos?.map((item) => item) ?? [], [danjiPhotos]);

  if (!danji) return null;

  return (
    <PhotoHero
      photoPaths={paths}
      defaultPhotoPath={DefaultListingImageLg[danji.type]}
      onClickViewPhotos={handlePhotos}
    />
  );
}
