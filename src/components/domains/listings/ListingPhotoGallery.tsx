import { useMemo } from 'react';

import { useRouter } from 'next/router';

import useFetchListingDetail from '@/services/listing/useFetchListingDetail';

import PhotoGallery from './photo-gallery';

export default function ListingPhotoGallery() {
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

  return <PhotoGallery headerTitle="매물 사진" photoPaths={paths} />;
}
