import { Listings } from '@/components/templates';
import { useRouter } from '@/hooks/utils';
import { useCallback } from 'react';

type Props = {
  depth: number;
};

export default function ListingsPage({ depth }: Props) {
  const router = useRouter();

  const onClickGoBack = useCallback(() => {
    router.pop(depth);
  }, [router, depth]);

  const onClickListingDetail = useCallback(
    (id: number) => {
      router.push('listingDetail', { listingID: id });
    },
    [router],
  );

  return (
    <>
      <p>{depth}</p>
      <Listings
        onClickGoBack={onClickGoBack}
        onClickListingDetail={onClickListingDetail}
      />
    </>
  );
}
