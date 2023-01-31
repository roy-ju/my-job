import { Home } from '@/components/templates';
import { useRouter } from '@/hooks/utils';
import { useCallback } from 'react';

type Props = {
  depth: number;
};

export default function HomePage({ depth }: Props) {
  const router = useRouter();

  const onClickMyPage = useCallback(() => {
    router.push('my');
  }, [router]);

  const onClickListingDetail = useCallback(() => {
    router.push('listingDetail', {
      listingID: 1,
    });
  }, [router]);

  const onClickListings = useCallback(() => {
    router.push('listings');
  }, [router]);

  return (
    <>
      <p>{depth}</p>
      <Home
        onClickListingDetail={onClickListingDetail}
        onClickMyPage={onClickMyPage}
        onClickListings={onClickListings}
      />
    </>
  );
}
