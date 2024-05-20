import { memo, useCallback, useMemo } from 'react';

import dynamic from 'next/dynamic';

import useFullScreenDialog from '@/states/hooks/useFullScreenDialog';

import { DanjiPhotosResponse } from '@/services/danji/types';

import { DefaultListingImageLg } from '@/constants/strings';

import useCheckPlatform from '@/hooks/useCheckPlatform';

import { useRouter } from 'next/router';

import Routes from '@/router/routes';

import PhotoHero from './PhotoHero';

import { CommonDanjiDetailProps } from '../types';

const PhotosDialog = dynamic(() => import('./PhotosDialog'), { ssr: false });

interface PhotosProps extends CommonDanjiDetailProps {
  isSeo?: boolean;
  danjiPhotos?: DanjiPhotosResponse;
}

function Photos({ isSeo, danji, danjiPhotos }: PhotosProps) {
  const router = useRouter();

  const { platform } = useCheckPlatform();

  const { addFullScreenDialog, closeAll } = useFullScreenDialog();

  const paths = useMemo(() => danjiPhotos?.danji_photos?.map((item) => item) ?? [], [danjiPhotos]);

  const handleViewPhotos = useCallback(() => {
    if (paths.length <= 0) return;

    if (isSeo && platform === 'pc') {
      router.replace(`/${Routes.DanjiDetail}/${Routes.DanjiPhotos}?danjiID=${danji.danji_id}`);
      return;
    }

    addFullScreenDialog({
      body: <PhotosDialog paths={paths} onClickBack={closeAll} />,
    });
  }, [addFullScreenDialog, closeAll, danji.danji_id, isSeo, paths, platform, router]);

  return (
    <PhotoHero
      photoPaths={paths}
      defaultPhotoPath={paths.length > 0 ? null : DefaultListingImageLg[danji.type]}
      onClickViewPhotos={handleViewPhotos}
    />
  );
}

export default memo(Photos);
