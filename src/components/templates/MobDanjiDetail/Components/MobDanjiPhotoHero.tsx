import { GetDanjiDetailResponse } from '@/apis/danji/danjiDetail';

import { useAPI_GetDanjiPhotos } from '@/apis/danji/danjiPhotos';

import { PhotoHero } from '@/components/organisms';

import { useCallback, useMemo } from 'react';

import { DefaultListingImageLg } from '@/constants/strings';

import useFullScreenDialogStore from '@/hooks/recoil/mobile/useFullScreenDialog';

import MobDanjiPhotos from '../../MobDanjiPhotos';

export default function MobDanjiPhotoHero({ danji }: { danji: GetDanjiDetailResponse }) {
  const { addFullScreenDialog, closeAll } = useFullScreenDialogStore();

  console.log(danji);

  const { danjiPhotos } = useAPI_GetDanjiPhotos({
    danjiId: danji?.danji_id,
    realestateType: danji?.type,
  });

  const handlePhotos = useCallback(() => {
    addFullScreenDialog({
      body: <MobDanjiPhotos danjiPhotos={danjiPhotos} onClickBack={closeAll} />,
    });
  }, [addFullScreenDialog, closeAll, danjiPhotos]);

  const paths = useMemo(() => danjiPhotos?.danji_photos?.map((item) => item.full_file_path) ?? [], [danjiPhotos]);

  return (
    <PhotoHero
      photoPaths={paths}
      defaultPhotoPath={DefaultListingImageLg[danji.type]}
      onClickViewPhotos={handlePhotos}
    />
  );
}
