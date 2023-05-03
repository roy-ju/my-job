import { GetDanjiDetailResponse } from '@/apis/danji/danjiDetail';
import { useAPI_GetDanjiPhotos } from '@/apis/danji/danjiPhotos';
import { PhotoHero } from '@/components/organisms';

import Routes from '@/router/routes';
import { useCallback } from 'react';
import { DefaultListingImageLg } from '@/constants/strings';
import { useRouter } from 'next/router';

export default function MobDanjiPhotoHero({ danji }: { danji?: GetDanjiDetailResponse }) {
  const router = useRouter();

  const handlePhotos = useCallback(() => {
    router.push(
      {
        pathname: `/${Routes.EntryMobile}/${Routes.DanjiPhotos}`,
        query: { p: router.query.p, rt: router.query.rt },
      },
      `/${Routes.EntryMobile}/${Routes.DanjiPhotos}?p=${router.query.p}&rt${router.query.rt}`,
    );
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
