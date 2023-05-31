import useAPI_GetListingDetail from '@/apis/listing/getListingDetail';
import { MobileContainer } from '@/components/atoms';
import { PhotoGallery } from '@/components/templates';
import { useRouter } from 'next/router';
import { memo, useMemo } from 'react';

export default memo(() => {
  const router = useRouter();
  const listingID = Number(router.query.listingID) ?? 0;
  const { data } = useAPI_GetListingDetail(listingID);

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
