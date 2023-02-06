import { Listings } from '@/components/templates';
import { useRouter } from '@/hooks/utils';
import { memo, useCallback } from 'react';

type Props = {
  depth: number;
};

export default memo(({ depth }: Props) => {
  const router = useRouter(depth);

  const onClickGoBack = useCallback(() => {
    router.pop();
  }, [router]);

  const onClickListingDetail = useCallback(
    (id: number) => {
      router.push('listingDetail', {
        queryParams: {
          listingID: id,
        },
      });
    },
    [router],
  );

  return (
    <>
      {depth === 2 && (
        <button
          tw="absolute top-[10px] left-[750px] z-[200] bg-gray-800 p-2 text-white"
          type="button"
          onClick={onClickGoBack}
        >
          닫기
        </button>
      )}
      <Listings onClickListingDetail={onClickListingDetail} />
    </>
  );
});
