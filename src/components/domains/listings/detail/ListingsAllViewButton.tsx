import React, { useCallback, useMemo } from 'react';

import { useRouter } from 'next/router';

import tw, { styled } from 'twin.macro';

import { Button } from '@/components/atoms';

import useCheckPlatform from '@/hooks/useCheckPlatform';

import { useFetchNaverDanji } from '@/services/danji/useFetchNaverDanji';

import { useFetchDanjiListingsList } from '@/services/danji/useFetchDanjiListingsList';

import Routes from '@/router/routes';

import NaverLogo from '@/assets/icons/naver_logo.svg';

import { CommonDanjiDetailProps } from '../../danji/detail/types';

const Container = styled.div`
  ${tw`flex flex-col gap-3 px-5 pb-10`}
`;

export default function ListingsAllViewButton({ danji }: CommonDanjiDetailProps) {
  const router = useRouter();

  const { platform } = useCheckPlatform();

  const { data } = useFetchNaverDanji({ id: danji?.danji_id });

  const { data: danjiListingsListData } = useFetchDanjiListingsList({
    danjiID: danji?.danji_id,
    realestateType: danji?.type,
    orderBy: 1,
    pageSize: 4,
  });

  const totalCount = useMemo(
    () => (danjiListingsListData ? (danjiListingsListData[0] ? danjiListingsListData[0].total_count : 0) : 0),
    [danjiListingsListData],
  );

  const url = useMemo(() => (platform === 'pc' ? data?.outlink_pc : data?.outlink_mobile), [data, platform]);

  const handleClickListingsAllViewButton = useCallback(() => {
    if (platform === 'pc') {
      if (router.query.listingID) {
        router.replace({
          pathname: `/${Routes.DanjiListings}`,
          query: {
            danjiID: `${danji?.danji_id}`,
          },
        });
      } else {
        router.replace({
          pathname: `/${Routes.DanjiListings}`,
          query: {
            danjiID: `${danji?.danji_id}`,
          },
        });
      }
    } else if (platform === 'mobile') {
      router.push(`/${Routes.EntryMobile}/${Routes.DanjiListings}?danjiID=${danji?.danji_id}`);
    }
  }, [danji?.danji_id, platform, router]);

  const handleOpenNaverRealestate = useCallback(() => {
    if (url) {
      window.open(url);
    }
  }, [url]);

  return (
    <Container>
      <Button
        variant="outlined"
        size="medium"
        tw="w-full mt-4"
        onClick={handleClickListingsAllViewButton}
        name="allDanjiListingsShow"
      >
        매물 전체보기&nbsp;{!!totalCount && <span tw="font-bold">{totalCount}</span>}
      </Button>

      {url && (
        <Button variant="outlined" tw="w-full" size="medium" onClick={handleOpenNaverRealestate}>
          <NaverLogo style={{ marginRight: '4px' }} />
          네이버 호가 확인하기
        </Button>
      )}
    </Container>
  );
}
