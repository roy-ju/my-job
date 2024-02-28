import { useCallback, useMemo } from 'react';

import { useRouter } from 'next/router';

import { Button } from '@/components/atoms';

import Routes from '@/router/routes';

import { useAPI_GetDanjiNaver } from '@/apis/danji/danjiNaver';

import NaverLogo from '@/assets/icons/naver_logo.svg';

import { DanjiDetailResponse } from '@/services/danji/types';

import { useFetchDanjiListingsList } from '@/services/danji/useFetchDanjiListingsList';

export default function ActiveListingInfo({ danji }: { danji?: DanjiDetailResponse }) {
  const { mobileNaverURL } = useAPI_GetDanjiNaver({ danjiId: danji?.danji_id });

  const router = useRouter();

  const { data: danjiListingsListData } = useFetchDanjiListingsList({
    danjiID: danji?.danji_id,
    realestateType: danji?.type,
    orderBy: 1,
    pageSize: 4,
  });

  const danjiListings = useMemo(() => {
    if (!danjiListingsListData) return [];

    return danjiListingsListData
      ?.map((item) => item?.list)
      .filter((item) => Boolean(item))
      .flat();
  }, [danjiListingsListData]);

  const totalCount = useMemo(
    () => (danjiListingsListData ? (danjiListingsListData[0] ? danjiListingsListData[0].total_count : 0) : 0),
    [danjiListingsListData],
  );

  const handleListingAll = useCallback(() => {
    router.push(`/${Routes.EntryMobile}/${Routes.DanjiListings}?danjiID=${danji?.danji_id || router?.query?.danjiID}`);
  }, [danji?.danji_id, router]);

  const handleOpenNaverRealestate = () => {
    if (mobileNaverURL) {
      window.open(mobileNaverURL);
    }
  };

  if (danjiListings?.length > 0)
    return (
      <div tw="flex flex-col gap-3 px-5 pb-10 mt-4">
        <Button variant="outlined" size="medium" tw="w-full" onClick={handleListingAll}>
          매물 전체보기&nbsp;{!!totalCount && <span tw="font-bold">{totalCount}</span>}
        </Button>

        {mobileNaverURL && (
          <Button variant="outlined" tw="w-full" size="medium" onClick={handleOpenNaverRealestate}>
            <NaverLogo style={{ marginRight: '4px' }} />
            네이버 호가 확인하기
          </Button>
        )}
      </div>
    );

  return null;
}
