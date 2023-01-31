import { DanjiDetail } from '@/components/templates';
import { useRouter } from '@/hooks/utils';
import { useCallback } from 'react';

type Props = {
  depth: number;
};

export default function DanjiDetailPage({ depth }: Props) {
  const router = useRouter();
  const onClickListingDetail = useCallback(() => {
    router.push('listingDetail', {
      listingID: 1,
    });
  }, [router]);

  const onClickGoBack = useCallback(() => {
    router.pop(depth - 1);
  }, [router, depth]);

  return (
    <>
      <p>{depth}</p>
      <DanjiDetail
        depth={depth}
        onClickListingDetail={onClickListingDetail}
        onClickGoBack={onClickGoBack}
      />
    </>
  );
}
