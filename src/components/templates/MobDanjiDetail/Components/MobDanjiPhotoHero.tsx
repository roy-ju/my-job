import { GetDanjiDetailResponse } from '@/apis/danji/danjiDetail';
import { useAPI_GetDanjiPhotos } from '@/apis/danji/danjiPhotos';
import { PhotoHero } from '@/components/organisms';
import { useCallback } from 'react';
import { DefaultListingImageLg } from '@/constants/strings';
import useFullScreenDialogStore from '@/hooks/recoil/mobile/useFullScreenDialog';
import MobDanjiPhotos from '../../MobDanjiPhotos';

export default function MobDanjiPhotoHero({ danji }: { danji?: GetDanjiDetailResponse }) {
  const { addFullScreenDialog, closeAll } = useFullScreenDialogStore();

  const { danjiPhotos } = useAPI_GetDanjiPhotos({
    pnu: danji?.pnu,
    realestateType: danji?.type,
  });

  const handlePhotos = useCallback(() => {
    addFullScreenDialog({
      body: <MobDanjiPhotos danjiPhotos={danjiPhotos} onClickBack={closeAll} />,
    });
  }, [addFullScreenDialog, closeAll, danjiPhotos]);

  if (!danji) return null;

  return (
    <PhotoHero
      itemSize={danjiPhotos?.danji_photos?.length ?? 0}
      photoPath={danjiPhotos?.danji_photos?.[0]?.full_file_path ?? DefaultListingImageLg[danji.type]}
      onClickViewPhotos={handlePhotos}
    />
  );
}
