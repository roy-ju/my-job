import { GetDanjiDetailResponse } from '@/apis/danji/danjiDetail';
import { useAPI_GetDanjiPhotos } from '@/apis/danji/danjiPhotos';
import { PhotoHero } from '@/components/organisms';
import { useRouter } from '@/hooks/utils';
import Routes from '@/router/routes';
import { useCallback, useMemo } from 'react';
import { DefaultListingImageLg } from '@/constants/strings';

export default function DanjiPhotoHero({ danji, depth }: { danji?: GetDanjiDetailResponse; depth: number }) {
  const router = useRouter(depth);

  const handlePhotos = useCallback(() => {
    router.push(Routes.DanjiPhotos, {
      searchParams: { danjiID: `${router.query.danjiID}`, rt: router.query.rt as string },
    });
  }, [router]);

  const { danjiPhotos } = useAPI_GetDanjiPhotos({
    danjiId: danji?.danji_id,
    realestateType: danji?.type,
  });

  const paths = useMemo(() => danjiPhotos?.danji_photos?.map((item) => item.full_file_path) ?? [], [danjiPhotos]);

  if (!danji) return null;

  return (
    <PhotoHero
      photoPaths={paths}
      defaultPhotoPath={DefaultListingImageLg[danji.type]}
      onClickViewPhotos={handlePhotos}
    />
  );
}
