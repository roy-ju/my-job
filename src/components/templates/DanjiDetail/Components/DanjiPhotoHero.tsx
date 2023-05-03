import { GetDanjiDetailResponse } from '@/apis/danji/danjiDetail';
import { useAPI_GetDanjiPhotos } from '@/apis/danji/danjiPhotos';
import { PhotoHero } from '@/components/organisms';
import { useRouter } from '@/hooks/utils';
import Routes from '@/router/routes';
import { useCallback } from 'react';
import { DefaultListingImageLg } from '@/constants/strings';

export function DanjiPhotoHero({ danji, depth }: { danji?: GetDanjiDetailResponse; depth: number }) {
  const router = useRouter(depth);

  const handlePhotos = useCallback(() => {
    router.push(Routes.DanjiPhotos, { searchParams: { p: `${router.query.p}`, rt: router.query.rt as string } });
  }, [router]);

  const { danjiPhotos } = useAPI_GetDanjiPhotos({
    pnu: danji?.pnu,
    realestateType: danji?.type,
  });

  if (!danji) return null;

  return (
    <PhotoHero
      itemSize={danjiPhotos?.danji_photos?.length ?? 0}
      photoPath={danjiPhotos?.danji_photos?.[0]?.full_file_path ?? DefaultListingImageLg[danji.type]}
      onClickViewPhotos={handlePhotos}
    />
  );
}
