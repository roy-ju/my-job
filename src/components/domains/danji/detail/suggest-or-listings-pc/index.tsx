import { useEffect, useMemo, useState } from 'react';

import dynamic from 'next/dynamic';

import { useRouter } from 'next/router';

import Routes from '@/router/routes';

import { useFetchDanjiListingsList } from '@/services/danji/useFetchDanjiListingsList';

import { useFetchDanjiSuggestsList } from '@/services/danji/useFetchDanjiSuggestsList';

import {
  DanjiDetailResponse,
  DanjiListingListResponse,
  DanjiSuggestListResponse,
  NaverDanjiResponse,
} from '@/services/danji/types';

import { apiService } from '@/services';

import getPath from '@/utils/getPath';

import RegisterButtons from './RegisterButtons';

import Tabs from '../suggests-or-listings-mobile/Tabs';

import Messages from '../suggests-or-listings-mobile/Messages';

import ListingItemList from '../suggests-or-listings-mobile/ListingItemList';

import { CommonDanjiDetailProps } from '../types';

const ImpossibleSuggestAreaPopup = dynamic(() => import('@/components/organisms/popups/ImpossibleSuggestAreaPopup'), {
  ssr: false,
});

interface SuggestsOrListingsProps extends CommonDanjiDetailProps {
  danji: DanjiDetailResponse;
  danjiSuggestList?: DanjiSuggestListResponse;
  danjiListingList?: DanjiListingListResponse;
  naverDanji?: NaverDanjiResponse;
}

export default function SuggestsOrListings({
  danji,
  danjiSuggestList,
  danjiListingList,
  naverDanji,
}: SuggestsOrListingsProps) {
  const router = useRouter();

  const danjiID = danji.danji_id ?? 0;

  const [isRecommendationService, setIsRecommendationService] = useState(false);

  const [tab, setTab] = useState(1);

  const [popup, setPopup] = useState<
    'impossibleSuggestArea' | 'verificationAddress' | 'needMoreVerificationAddress' | ''
  >('');

  const handleChangeTab = (value: number) => {
    setTab(value);
  };

  const { data: suggestListData, mutate } = useFetchDanjiSuggestsList({
    prefetchedData: danjiSuggestList,
    danjiID: danji.danji_id,
    pageSize: 4,
  });

  const { data: listingListData } = useFetchDanjiListingsList({
    prefetchedData: danjiListingList,
    danjiID: danji.danji_id,
    realestateType: danji.type,
    orderBy: 1,
    pageSize: 4,
  });

  const suggestList = useMemo(() => {
    if (!suggestListData) return [];
    return suggestListData
      ?.map((item) => item?.list)
      .filter((item) => Boolean(item))
      .flat();
  }, [suggestListData]);

  const listingList = useMemo(() => {
    if (!listingListData) return [];
    return listingListData
      ?.map((item) => item?.list)
      .filter((item) => Boolean(item))
      .flat();
  }, [listingListData]);

  const handleSuggestListAll = () => {
    const query = router.query;

    delete query.depth1;
    delete query.depth2;

    const convertedQuery = {
      ...query,
      ...(router.query.listingID ? { listingID: router.query.listingID as string } : {}),
      danjiID: `${danji?.danji_id}`,
    };

    router.push({
      pathname: `/${Routes.SuggestListings}`,
      query: convertedQuery,
    });
  };

  const handleSuggestDetail = (id: number, mySuggest: boolean) => {
    if (mySuggest) {
      router.push(`/${Routes.DanjiDetail}/${Routes.MySuggestDetail}?danjiID=${danjiID}&suggestID=${id}`);
      return;
    }

    router.push(`/${Routes.DanjiDetail}/${Routes.SuggestDetail}?danjiID=${danjiID}&suggestID=${id}`);
  };

  const handleListingListAll = () => {
    const query = router.query;

    delete query.depth1;
    delete query.depth2;

    const convertedQuery = {
      ...query,
      ...(router.query.listingID ? { listingID: router.query.listingID as string } : {}),
      danjiID: `${danji?.danji_id}`,
    };

    router.push({
      pathname: `/${Routes.DanjiListings}`,
      query: convertedQuery,
    });
  };

  const handleListingDetail = (id: number, buyOrRent: number) => {
    router.push(
      {
        pathname: `/${Routes.DanjiListings}/${Routes.ListingDetail}`,
        query: {
          listingID: `${id}`,
          danjiID: `${danjiID}`,
          bor: `${buyOrRent}`,
        },
      },
      `/${Routes.DanjiListings}/${Routes.ListingDetail}?listingID=${id}&danjiID=${danjiID}`,
    );
  };

  const handleCreateSuggest = () => {
    if (!isRecommendationService) {
      setPopup('impossibleSuggestArea');
      return;
    }

    const path = getPath({
      depth1: router?.query?.depth1 as NegocioPath,
      depth2: router?.query?.depth2 as NegocioPath,
      targetPath: Routes.SuggestForm as NegocioPath,
    });

    router.push({
      pathname: path,
      query: {
        entry: Routes.DanjiDetail,
        danjiID,
      },
    });
  };

  const handleClosePopup = () => {
    setPopup('');
  };

  useEffect(() => {
    async function isCheckPossibleRecommedationService(code: string) {
      const response = await apiService.suggestEligibilityCheck({ bubjungdong_code: code });

      if (response && response.eligible) {
        setIsRecommendationService(true);
      } else if (response && !response.eligible) {
        setIsRecommendationService(false);
      }
    }

    if (danji && danji.bubjungdong_code) {
      isCheckPossibleRecommedationService(danji.bubjungdong_code);
    }
  }, [danji]);

  useEffect(() => {
    mutate();
  }, [mutate]);

  return (
    <>
      <div tw="pb-10">
        <Tabs
          tab={tab}
          suggestCount={suggestListData?.[0].total_count || 0}
          listingCount={listingListData?.[0].total_count || 0}
          handleChangeTab={handleChangeTab}
        />
        <div>
          <Messages
            tab={tab}
            suggestCount={suggestListData?.[0].total_count || 0}
            listingCount={listingListData?.[0].total_count || 0}
            handleSuggestListAll={handleSuggestListAll}
            handleListingListAll={handleListingListAll}
          />

          <ListingItemList
            tab={tab}
            suggestList={suggestList}
            listingList={listingList}
            handleClickSuggestItem={handleSuggestDetail}
            handleClickListingItem={handleListingDetail}
          />
        </div>
        <RegisterButtons
          tab={tab}
          danjiID={danji.danji_id}
          handleClickSuggestButton={handleCreateSuggest}
          naverDanji={naverDanji}
        />
      </div>

      {popup === 'impossibleSuggestArea' && <ImpossibleSuggestAreaPopup handleClosePopup={handleClosePopup} />}
    </>
  );
}
