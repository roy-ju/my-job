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

import Tabs from '../suggests-or-listings-mobile/Tabs';

import Messages from '../suggests-or-listings-mobile/Messages';

import ListingItemList from '../suggests-or-listings-mobile/ListingItemList';

import RegisterButtons from '../suggests-or-listings-mobile/RegisterButtons';

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

  const danjiID = danji.danji_id || Number(router?.query?.danjiID ?? 0);

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
    router.push(`/${Routes.EntryMobile}/${Routes.SuggestListings}?danjiID=${danjiID}`);
  };

  const handleListingListAll = () => {
    router.push(`/${Routes.EntryMobile}/${Routes.DanjiListings}?danjiID=${danjiID}`);
  };

  const handleSuggestDetail = (id: number, mySuggest: boolean) => {
    if (mySuggest) {
      router.push(`/${Routes.EntryMobile}/${Routes.MySuggestDetail}?danjiID=${danjiID}&suggestID=${id}`);
      return;
    }

    router.push(`/${Routes.EntryMobile}/${Routes.SuggestDetail}?danjiID=${danjiID}&suggestID=${id}`);
  };

  const handleListingDetail = (id: number, buyOrRent: number) => {
    router.push(
      {
        pathname: `/${Routes.EntryMobile}/${Routes.ListingDetail}`,
        query: {
          listingID: `${id}`,
          danjiID: `${danjiID}`,
          bor: `${buyOrRent}`,
        },
      },
      `/${Routes.EntryMobile}/${Routes.ListingDetail}?listingID=${id}&danjiID=${danjiID}`,
    );
  };

  const handleCreateSuggest = () => {
    if (!isRecommendationService) {
      setPopup('impossibleSuggestArea');
      return;
    }

    router.push({
      pathname: `/${Routes.EntryMobile}/${Routes.SuggestForm}`,
      query: {
        entry: Routes.DanjiDetail,
        danjiID: `${danjiID}`,
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
