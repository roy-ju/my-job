import { useCallback, useState } from 'react';

import { useRouter } from 'next/router';

import { ListingDetailResponse } from '@/services/listing/types';

import Routes from '@/router/routes';

import useAuth from '@/hooks/services/useAuth';

import useAuthPopup from '@/states/hooks/useAuhPopup';

import useReturnUrl from '@/states/hooks/useReturnUrl';

export default function useListingDetailPc({
  data,
  listingID,
}: {
  data?: ListingDetailResponse & ErrorResponse;
  listingID: number;
}) {
  const { user } = useAuth();

  const { openAuthPopup } = useAuthPopup();

  const { handleUpdateReturnUrl } = useReturnUrl();

  const router = useRouter();

  const [popup, setPopup] = useState('none');

  const handleOpenPopup = useCallback((v: string) => {
    setPopup(v);
  }, []);

  const handleClosePopup = useCallback(() => {
    setPopup('none');
  }, []);

  const handleNavigateToParticipateBidding = useCallback(() => {
    if (!user) {
      openAuthPopup('needVerify');
      handleUpdateReturnUrl(`/${Routes.ListingDetail}/${Routes.BiddingForm}?listingID=${router.query.listingID}`);
      return;
    }

    if (user && !user.isVerified) {
      router.push(`/${Routes.VerifyCi}/${Routes.ListingDetail}?listingID=${router.query.listingID}`);
      handleUpdateReturnUrl(`/${Routes.ListingDetail}/${Routes.BiddingForm}?listingID=${router.query.listingID}`);
      return;
    }

    router.push(`/${Routes.ListingDetail}/${Routes.BiddingForm}?listingID=${router.query.listingID}`);
  }, [handleUpdateReturnUrl, router, openAuthPopup, user]);

  const handleNavigateToUpdateBidding = useCallback(() => {
    if (!data?.bidding_id) {
      const query = router.query;

      delete query.depth1;
      delete query.depth2;

      router.push({
        pathname: `/${Routes.ListingDetail}/${Routes.UpdateBiddingForm}`,
        query: { ...query, listingID: router.query.listingID as string, biddingID: `${data?.bidding_id}` },
      });
    }
  }, [router, data?.bidding_id]);

  const handleNavigateToChatRoom = useCallback(() => {
    if (data?.chat_room_id) {
      const query = router.query;

      delete query.depth1;
      delete query.depth2;

      router.push({
        pathname: `/${Routes.ListingDetail}/${Routes.ChatRoom}`,
        query: { listingID: router.query.listingID as string, chatRoomID: `${data.chat_room_id}` },
      });
    }
  }, [router, data]);

  const handleNavigateToPhotoGallery = useCallback(() => {
    const query = router.query;

    delete query.depth1;
    delete query.depth2;

    router.push({
      pathname: `/${Routes.ListingDetail}/${Routes.ListingPhotoGallery}`,
      query: { ...query },
    });
  }, [router]);

  const handleNavigateToUpdateTargetPrice = useCallback(() => {
    const query = router.query;

    delete query.depth1;
    delete query.depth2;

    router.push({
      pathname: `/${Routes.ListingDetail}/${Routes.ListingTargetPriceUpdate}`,
      query: { ...query, listingID: router.query.listingID as string },
    });
  }, [router]);

  const handleNavigateToSuggestForm = useCallback(() => {
    const depth1 = router.query.depth1;
    const depth2 = router.query.depth2;

    const query = router.query;

    delete query.depth1;
    delete query.depth2;

    if (depth1 && depth2) {
      if (depth1 === Routes.ListingDetail) {
        router.replace({ pathname: `/${Routes.SuggestForm}/${depth2}`, query: { ...query } });
      } else {
        router.replace({ pathname: `/${depth1}/${Routes.SuggestForm}`, query: { ...query } });
      }
    } else if (depth1 && !depth2) {
      router.replace({ pathname: `/${Routes.SuggestForm}`, query: { ...query } });
    }
  }, [router]);

  const handleNavigateToListingDetailHistory = useCallback(() => {
    const depth1 = router.query.depth1;
    const depth2 = router.query.depth2;

    const query = router.query;

    delete query.depth1;
    delete query.depth2;

    if (depth1 && depth2) {
      if (depth1 === Routes.ListingDetail) {
        router.replace({
          pathname: `/${Routes.ListingDetailHistory}/${depth2}`,
          query: { ...query, listingID: `${listingID}`, biddingID: `${data?.bidding_id}`, back: `${router.asPath}` },
        });
      } else {
        router.replace({
          pathname: `/${depth1}/${Routes.ListingDetailHistory}`,
          query: { ...query, listingID: `${listingID}`, biddingID: `${data?.bidding_id}`, back: `${router.asPath}` },
        });
      }
    } else if (depth1 && !depth2) {
      router.replace({
        pathname: `/${Routes.ListingDetailHistory}`,
        query: { ...query, listingID: `${listingID}`, biddingID: `${data?.bidding_id}`, back: `${router.asPath}` },
      });
    }
  }, [router, data, listingID]);

  const handleClickBack = useCallback(() => {
    if (router.query.back) {
      router.replace(router.query.back as string);
    } else {
      const canGoBack = window.history.length > 1;

      if (canGoBack) {
        router.back();
      } else {
        router.replace('/');
      }
    }
  }, [router]);

  const routerPop = useCallback(() => {
    const depth1 = router.query.depth1;
    const depth2 = router.query.depth2;

    const query = router.query;

    delete query.depth1;
    delete query.depth2;

    if (depth1 && depth2) {
      if (depth1 === Routes.ListingDetail) {
        router.replace({ pathname: `/${depth2}`, query: { ...query } });
      } else {
        router.replace({ pathname: `/${depth1}`, query: { ...query } });
      }
    } else if (depth1 && !depth2) {
      router.replace('/');
    }
  }, [router]);

  return {
    popup,

    handleNavigateToParticipateBidding,
    handleNavigateToUpdateTargetPrice,
    handleNavigateToUpdateBidding,
    handleNavigateToChatRoom,
    handleNavigateToPhotoGallery,
    handleNavigateToSuggestForm,
    handleNavigateToListingDetailHistory,

    handleOpenPopup,
    handleClosePopup,

    handleClickBack: router.query.back ? undefined : handleClickBack,
    routerPop,
  };
}
