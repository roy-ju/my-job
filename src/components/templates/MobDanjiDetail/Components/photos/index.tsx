import { memo, useCallback, useMemo } from 'react';

import dynamic from 'next/dynamic';

import useFullScreenDialog from '@/states/hooks/useFullScreenDialog';

import { DanjiDetailResponse, DanjiPhotosResponse } from '@/services/danji/types';

import { DefaultListingImageLg } from '@/constants/strings';

import PhotoHero from './PhotoHero';

const PhotosDialog = dynamic(() => import('./PhotosDialog'), { ssr: false });

function Photos({ danji, danjiPhotos }: { danji: DanjiDetailResponse; danjiPhotos?: DanjiPhotosResponse }) {
  const { addFullScreenDialog, closeAll } = useFullScreenDialog();

  const paths = useMemo(() => danjiPhotos?.danji_photos?.map((item) => item) ?? [], [danjiPhotos]);

  const handleViewPhotos = useCallback(() => {
    if (paths.length > 0) return;

    addFullScreenDialog({
      body: <PhotosDialog paths={paths} onClickBack={closeAll} />,
    });
  }, [addFullScreenDialog, closeAll, paths]);

  return (
    <PhotoHero
      photoPaths={paths}
      defaultPhotoPath={paths.length > 0 ? null : DefaultListingImageLg[danji.type]}
      onClickViewPhotos={handleViewPhotos}
    />
  );
}

export default memo(Photos);
