/* eslint-disable react-hooks/exhaustive-deps */

import { useCallback, useState } from 'react';

import { useRouter } from 'next/router';

import { ListingDetailResponse } from '@/services/listing/types';

import Routes from '@/router/routes';

import useAuth from '@/hooks/services/useAuth';

import useInAppBroswerHandler from '@/hooks/useInAppBroswerHandler';

import useAuthPopup from '@/states/hooks/useAuhPopup';

import useReturnUrl from '@/states/hooks/useReturnUrl';

export default function useListingDetailMobile({
  data,
  listingID,
}: {
  data?: ListingDetailResponse & ErrorResponse;
  listingID: number;
}) {
  const { user } = useAuth();

  const { openAuthPopup } = useAuthPopup();

  const { handleUpdateReturnUrl } = useReturnUrl();

  const { inAppInfo, handleOpenAppInstallPopup } = useInAppBroswerHandler();

  const router = useRouter();

  const [popup, setPopup] = useState('none');

  const handleOpenPopup = useCallback((v: string) => {
    setPopup(v);
  }, []);

  const handleClosePopup = useCallback(() => {
    setPopup('none');
  }, []);

  const handleNavigateToParticipateBidding = useCallback(() => {
    if (inAppInfo.isInAppBrowser) {
      handleOpenAppInstallPopup();
      return;
    }

    if (!user) {
      openAuthPopup('needVerify');
      handleUpdateReturnUrl(`/${Routes.EntryMobile}/${Routes.BiddingForm}?listingID=${router.query.listingID}`);
      return;
    }

    if (user && !user.isVerified) {
      router.push(`/${Routes.EntryMobile}/${Routes.VerifyCi}`);
      handleUpdateReturnUrl(`/${Routes.EntryMobile}/${Routes.BiddingForm}?listingID=${router.query.listingID}`);
      return;
    }

    router.push(`/${Routes.EntryMobile}/${Routes.BiddingForm}?listingID=${router.query.listingID}`);
  }, [router]);

  const handleNavigateToUpdateBidding = useCallback(() => {
    if (!data?.bidding_id) {
      router.push(
        `/${Routes.EntryMobile}/${Routes.UpdateBiddingForm}?listingID=${router.query.listingID}&biddingID=${data?.bidding_id}`,
      );
    }
  }, [router, data?.bidding_id]);

  const handleNavigateToChatRoom = useCallback(() => {
    if (data?.chat_room_id) {
      router.push(`/${Routes.EntryMobile}/${Routes.ChatRoom}?chatRoomID=${data.chat_room_id}`);
    }
  }, [router, data]);

  const handleNavigateToPhotoGallery = useCallback(() => {
    router.push(`/${Routes.EntryMobile}/${Routes.ListingPhotoGallery}?listingID=${router.query.listingID}`);
  }, [router]);

  const handleNavigateToUpdateTargetPrice = useCallback(() => {
    router.push(`/${Routes.EntryMobile}/${Routes.ListingTargetPriceUpdate}?listingID=${router.query.listingID}`);
  }, [router]);

  const handleNavigateToSuggestForm = useCallback(() => {
    router.push(`/${Routes.EntryMobile}/${Routes.SuggestForm}`);
  }, [router]);

  const handleNavigateToListingDetailHistory = useCallback(() => {
    router.push(
      `/${Routes.EntryMobile}/${Routes.ListingDetailHistory}?listingID=${listingID}&biddingID=${data?.bidding_id}`,
    );
  }, [router, listingID, data?.bidding_id]);

  const handleClickBack = useCallback(() => {
    if (typeof window !== 'undefined') {
      const canGoBack = window.history.length > 1;

      if (canGoBack) {
        router.back();
      } else {
        router.replace('/');
      }
    }
  }, [router]);

  const handleClickBackIfInvalidAccess = useCallback(() => {
    if (typeof window !== 'undefined') {
      const canGoBack = window.history.length > 1;

      if (canGoBack) {
        router.back();
      } else {
        router.replace(`/${Routes.EntryMobile}`);
      }
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

    handleClickBack,
    handleClickBackIfInvalidAccess,
  };
}
