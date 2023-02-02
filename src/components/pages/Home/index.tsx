import { Home } from '@/components/templates';
import { useRouter } from '@/hooks/utils';
import { memo, useCallback } from 'react';

type Props = {
  depth: number;
};

export default memo(({ depth }: Props) => {
  const router = useRouter(depth);

  const onClickMyPage = useCallback(() => {
    router.replace('my');
  }, [router]);

  const onClickListingDetail = useCallback(() => {
    router.replace('listingDetail', {
      queryParams: {
        listingID: 1,
      },
    });
  }, [router]);

  const onClickListings = useCallback(() => {
    router.replace('listings');
  }, [router]);

  const onClickDanjiDetail = useCallback(() => {
    router.replace('danjiDetail');
  }, [router]);

  return (
    <>
      <p>{depth}</p>
      <Home
        onClickListingDetail={onClickListingDetail}
        onClickMyPage={onClickMyPage}
        onClickListings={onClickListings}
        onClickDanjiDetail={onClickDanjiDetail}
      />
    </>
  );
});
