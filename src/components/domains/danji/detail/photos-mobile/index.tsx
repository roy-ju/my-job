import { memo, useCallback, useMemo } from 'react';

import dynamic from 'next/dynamic';

import useFullScreenDialog from '@/states/hooks/useFullScreenDialog';

import { DanjiPhotosResponse } from '@/services/danji/types';

import { DefaultListingImageLg } from '@/constants/strings';

import PhotoHero from './widget/PhotoHero';

import { CommonDanjiDetailProps } from '../types';

const PhotosDialog = dynamic(() => import('./widget/PhotosDialog'), { ssr: false });

interface PhotosProps extends CommonDanjiDetailProps {
  danjiPhotos?: DanjiPhotosResponse;
}

function Photos({ danji, danjiPhotos }: PhotosProps) {
  const { addFullScreenDialog, closeAll } = useFullScreenDialog();

  const paths = useMemo(() => danjiPhotos?.danji_photos?.map((item) => item) ?? [], [danjiPhotos]);

  const handleViewPhotos = useCallback(() => {
    if (paths.length <= 0) return;

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
