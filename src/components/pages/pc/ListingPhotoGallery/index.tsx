import { memo, useMemo } from 'react';

import { Panel } from '@/components/atoms';

import { PhotoGallery } from '@/components/templates';

import { RealestateType } from '@/constants/enums';

import { useRouter } from '@/hooks/utils';

import useFetchListingDetail from '@/services/listing/useFetchListingDetail';

interface Props {
  depth: number;
  panelWidth?: string;
}

export default memo(({ depth, panelWidth }: Props) => {
  const router = useRouter(depth);
  const listingID = Number(router.query.listingID) ?? 0;
  const { data } = useFetchListingDetail(listingID);

  const paths = useMemo(() => {
    if (
      data?.listing?.realestate_type === RealestateType.Apartment ||
      data?.listing?.realestate_type === RealestateType.Officetel
    ) {
      return [
        ...(data?.photos?.map((item) => item.full_file_path) ?? []),
        ...(data?.danji_photos?.map((item) => item.full_file_path) ?? []),
      ];
    }

    return [...(data?.photos?.map((item) => item.full_file_path) ?? [])];
  }, [data?.listing?.realestate_type, data?.photos, data?.danji_photos]);

  return (
    <Panel width={panelWidth}>
      <PhotoGallery headerTitle="매물 사진" photoPaths={paths} />
    </Panel>
  );
});
