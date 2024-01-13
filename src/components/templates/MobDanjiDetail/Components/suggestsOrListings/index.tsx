import { useEffect, useMemo, useState } from 'react';

import dynamic from 'next/dynamic';

import { useRouter } from 'next/router';

import Routes from '@/router/routes';

import useAPI_GetUserInfo from '@/apis/user/getUserInfo';

import listingEligibilityCheck from '@/apis/listing/listingEligibilityCheck';

import { useFetchDanjiListingsList } from '@/services/danji/useFetchDanjiListingsList';

import { useFetchDanjiSuggestsList } from '@/services/danji/useFetchDanjiSuggestsList';

import {
  DanjiDetailResponse,
  DanjiListingListResponse,
  DanjiSuggestListResponse,
  NaverDanjiResponse,
} from '@/services/danji/types';

import useAuthRedirect from '@/hooks/useAuthRedirect';

import { apiService } from '@/services';
import Tabs from './Tabs';

import Messages from './Messages';

import ListingItemList from './ListingItemList';

import RegisterButtons from './RegisterButtons';

const FixedButton = dynamic(() => import('./FixedButton'), { ssr: false });

const ImpossibleRecommdation = dynamic(() => import('../popups/ImpossibleRecommdation'), { ssr: false });

const VerificationAddress = dynamic(() => import('../popups/VerificationAddress'), { ssr: false });

const NeedMoreAddVerificationAddress = dynamic(() => import('../popups/NeedMoreAddVerificationAddress'), {
  ssr: false,
});

const ListingDetailOpertionsButtons = dynamic(() => import('./ListingDetailOpertionsButtons'), { ssr: false });

export default function SuggestsOrListings({
  isListingDetail = false,
  tabIndex,
  danji,
  danjiSuggestList,
  danjiListingList,
  naverDanji,
}: {
  isListingDetail?: boolean;
  tabIndex: number;
  danji: DanjiDetailResponse;
  danjiSuggestList?: DanjiSuggestListResponse;
  danjiListingList?: DanjiListingListResponse;
  naverDanji?: NaverDanjiResponse;
}) {
  const router = useRouter();

  const danjiID = danji.danji_id || Number(router?.query?.danjiID ?? 0);

  const { data: userData } = useAPI_GetUserInfo();

  const { handleLogin, handleVerified } = useAuthRedirect();

  const [isRecommendationService, setIsRecommendationService] = useState(false);

  const [tab, setTab] = useState(1);

  const [popup, setPopup] = useState<
    'impossibleRecommendation' | 'verificationAddress' | 'needMoreVerificationAddress' | ''
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

  const handleCreateListing = async () => {
    if (!userData) {
      handleLogin();
      return;
    }

    if (!userData.is_verified) {
      handleVerified();
      return;
    }

    if (!userData?.has_address) {
      setPopup('verificationAddress');
      return;
    }

    if (userData?.has_address) {
      const res = await listingEligibilityCheck({ danji_id: danjiID });

      if (res && !res?.is_eligible) {
        setPopup('needMoreVerificationAddress');

        return;
      }

      if (res && res?.is_eligible) {
        router.push({
          pathname: `/${Routes.EntryMobile}/${Routes.ListingSelectAddress}`,
          query: {
            origin: router.asPath,
            ...(danjiID ? { danjiID: `${danjiID}` } : {}),
          },
        });
      }
    }
  };

  const handleCreateSuggest = () => {
    if (!isRecommendationService) {
      return;
    }

    router.push({
      pathname: `/${Routes.EntryMobile}/${Routes.SuggestForm}`,
      query: {
        danjiID: `${danjiID}`,
        entry: 'danjiDetail',
      },
    });
  };

  const handleClosePopup = () => {
    setPopup('');
  };

  const handleVerficationAddress = () => {
    handleClosePopup();

    router.push({
      pathname: `/${Routes.EntryMobile}/${Routes.MyAddress}`,
      query: {
        origin: router.asPath,
        ...(danjiID ? { danjiID: `${danjiID}` } : {}),
      },
    });
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

  if (isListingDetail && listingList?.length > 0)
    return (
      <ListingDetailOpertionsButtons
        danjiID={0}
        totalCount={listingListData?.[0].total_count || 0}
        handleListingListAll={handleListingListAll}
      />
    );

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
          handleClickListingButton={handleCreateListing}
          naverDanji={naverDanji}
        />
      </div>
      <FixedButton
        tabIndex={tabIndex}
        handleClickSuggestButton={handleCreateSuggest}
        handleClickListingButton={handleCreateListing}
      />

      {popup === 'impossibleRecommendation' && <ImpossibleRecommdation handleClosePopup={handleClosePopup} />}

      {popup === 'verificationAddress' && (
        <VerificationAddress handleVerficationAddress={handleVerficationAddress} handleClosePopup={handleClosePopup} />
      )}

      {popup === 'needMoreVerificationAddress' && (
        <NeedMoreAddVerificationAddress
          handleVerficationAddress={handleVerficationAddress}
          handleClosePopup={handleClosePopup}
        />
      )}
    </>
  );
}
