import { Home } from '@/components/templates';
import { useRouter } from '@/hooks/utils';
import { loginWithKakao } from '@/lib/kakao';
import { memo, useCallback } from 'react';

type Props = {
  depth: number;
};

export default memo(({ depth }: Props) => {
  const router = useRouter(depth);

  const handleClickMyPage = useCallback(() => {
    router.replace('my');
  }, [router]);

  const handleClickListingDetail = useCallback(() => {
    router.replace('listingDetail', {
      queryParams: {
        listingID: 1,
      },
    });
  }, [router]);

  const handleClickListings = useCallback(() => {
    router.replace('listings');
  }, [router]);

  const handleClickDanjiDetail = useCallback(() => {
    router.replace('danjiDetail');
  }, [router]);

  const handleClickLoginWithKakao = useCallback(() => {
    loginWithKakao(router.asPath);
  }, [router]);

  return (
    <>
      <Home
        onClickListingDetail={handleClickListingDetail}
        onClickMyPage={handleClickMyPage}
        onClickListings={handleClickListings}
        onClickDanjiDetail={handleClickDanjiDetail}
        onClickLoginWithKakao={handleClickLoginWithKakao}
      />
    </>
  );
});
