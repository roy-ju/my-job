import { MobileContainer } from '@/components/atoms';
import { MapListingList } from '@/components/templates';
import { memo, useCallback } from 'react';
import { addFavorite } from '@/apis/listing/addListingFavroite';
import { toast } from 'react-toastify';
import { removeFavorite } from '@/apis/listing/removeListingFavorite';
import { useRouter } from 'next/router';
import Routes from '@/router/routes';
import useMapListingList from './useMapListingList';

export default memo(() => {
  const router = useRouter();

  const { data, isLoading, increamentPageNumber } = useMapListingList();

  const onClickListing = useCallback(
    (id: number) => {
      router.push(`/${Routes.EntryMobile}/${Routes.ListingDetail}?listingID=${id}`);
    },
    [router],
  );

  const onToggleFav = useCallback((id: number, active: boolean) => {
    if (active) {
      addFavorite(id);
      toast.success('관심을 설정했습니다.');
    } else {
      removeFavorite(id);
      toast.success('관심을 해제했습니다.');
    }
  }, []);

  return (
    <MobileContainer>
      <MapListingList
        data={data}
        isLoading={isLoading}
        onClickListing={onClickListing}
        onToggleFavorite={onToggleFav}
        onClickBack={() => router.back()}
        onNext={increamentPageNumber}
      />
    </MobileContainer>
  );
});
