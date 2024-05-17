import { memo, useMemo } from 'react';

import { useRouter } from 'next/router';

import { MobileContainer } from '@/components/atoms';

import { PhotoGallery } from '@/components/templates';

import useFetchListingDetail from '@/services/listing/useFetchListingDetail';

export default memo(() => {
  const router = useRouter();
  const listingID = Number(router.query.listingID) ?? 0;
  const { data } = useFetchListingDetail(listingID);

  const paths = useMemo(
    () => [
      ...(data?.photos?.map((item) => item.full_file_path) ?? []),
      ...(data?.danji_photos?.map((item) => item.full_file_path) ?? []),
    ],
    [data?.photos, data?.danji_photos],
  );

  return (
    <MobileContainer>
      <PhotoGallery headerTitle="매물 사진" photoPaths={paths} onClickBack={() => router.back()} />
    </MobileContainer>
  );
});
