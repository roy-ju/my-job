import { useCallback, useState } from 'react';

import { useRouter } from 'next/router';

import useCheckPlatform from '@/hooks/useCheckPlatform';

import { MyParticipatedListingDetailResponse } from '@/services/my/types';

import { apiService } from '@/services';

import Routes from '@/router/routes';
import { toast } from 'react-toastify';

export default function useDirectHandler({ data }: { data?: MyParticipatedListingDetailResponse }) {
  const router = useRouter();

  const [openPastPopup, setOpenPastPopup] = useState(false);

  const [openCancelBiddingPopup, setOpenCancelBiddingPopup] = useState(false);

  const { platform } = useCheckPlatform();

  const handleNavigateToBack = useCallback(() => {
    if (platform === 'pc') {
      if (router.query.back) {
        router.replace(router.query.back as string);
      } else {
        const depth1 = router?.query?.depth1;
        const depth2 = router?.query?.depth2;

        const query = router.query;

        delete query.depth1;
        delete query.depth2;

        const convertedQuery = { ...query, tab: '4' };

        if (depth1 && depth2) {
          if (depth1 === Routes.ListingDetailHistory) {
            router.replace({
              pathname: `/${Routes.MyParticipatingListings}/${depth2}`,
              query: convertedQuery,
            });
          } else {
            router.replace({
              pathname: `/${depth1}/${Routes.MyParticipatingListings}`,
              query: convertedQuery,
            });
          }
          return;
        }

        router.replace({
          pathname: `/${Routes.MyParticipatingListings}`,
          query: convertedQuery,
        });
      }
    } else {
      router.back();
    }
  }, [platform, router]);

  const handleNavigateToChatRoom = useCallback(() => {
    if (!data?.buyer_agent_chat_room_id) return;

    if (platform === 'pc') {
      const depth1 = router.query.depth1;
      const depth2 = router.query.depth2;

      const query = router.query;

      delete query.depth1;
      delete query.depth2;

      const convertedQuery = { ...query, chatRoomID: `${data.buyer_agent_chat_room_id}` };

      if (depth1 && depth2) {
        router.push({
          pathname: `/${depth1}/${Routes.ChatRoom}`,
          query: convertedQuery,
        });
      } else if (depth1 && !depth2) {
        router.push({
          pathname: `/${Routes.ChatRoom}`,
          query: convertedQuery,
        });
      }
    } else {
      router.push(`/${Routes.EntryMobile}/${Routes.ChatRoom}?chatRoomID=${data.buyer_agent_chat_room_id}`);
    }
  }, [data?.buyer_agent_chat_room_id, platform, router]);

  const handleNavigateToTransactionReview = useCallback(() => {
    if (!data?.listing_contract_id) return;

    if (platform === 'pc') {
      const depth1 = router.query.depth1;
      const depth2 = router.query.depth2;

      const query = router.query;

      delete query.depth1;
      delete query.depth2;

      const convertedQuery = {
        ...query,
        listingContractID: `${data.listing_contract_id}`,
        hasReview: `${data?.has_review}`,
      };

      if (depth1 && depth2) {
        router.push({
          pathname: `/${depth1}/${Routes.TransactionReview}`,
          query: convertedQuery,
        });
      } else if (depth1 && !depth2) {
        router.push({
          pathname: `/${Routes.TransactionReview}`,
          query: convertedQuery,
        });
      }
    } else {
      router.push(
        `/${Routes.EntryMobile}/${Routes.TransactionReview}?listingContractID=${data?.listing_contract_id}&hasReview=${data?.has_review}`,
      );
    }
  }, [data?.has_review, data?.listing_contract_id, platform, router]);

  const handleNavigateToUpdateBiddingForm = useCallback(() => {
    if (!data?.listing_id || !data.bidding_id) return;

    if (platform === 'pc') {
      const depth1 = router.query.depth1;
      const depth2 = router.query.depth2;

      const query = router.query;

      delete query.depth1;
      delete query.depth2;

      const convertedQuery = {
        ...query,
        listingID: `${data.listing_id}`,
        biddingID: `${data.bidding_id}`,
        back: router.asPath,
      };

      if (depth1 && depth2) {
        router.push({
          pathname: `/${depth1}/${Routes.UpdateBiddingForm}`,
          query: convertedQuery,
        });
      } else if (depth1 && !depth2) {
        router.push({
          pathname: `/${Routes.UpdateBiddingForm}`,
          query: convertedQuery,
        });
      }
    } else {
      router.push(
        `/${Routes.EntryMobile}/${Routes.UpdateBiddingForm}?listingID=${data?.listing_id}&biddingID=${data?.bidding_id}`,
      );
    }
  }, [data?.bidding_id, data?.listing_id, platform, router]);

  const handleNavigateToListingDetail = useCallback(async () => {
    if (!data?.listing_id) return;

    const response = await apiService.getListingStatus(data.listing_id);

    if (response?.can_access) {
      if (platform === 'pc') {
        const depth1 = router.query.depth1;
        const depth2 = router.query.depth2;

        const query = router.query;

        delete query.depth1;
        delete query.depth2;

        const convertedQuery = {
          ...query,
          listingID: `${data.listing_id}`,
        };

        if (depth1 && depth2) {
          router.push({
            pathname: `/${depth1}/${Routes.ListingDetail}`,
            query: convertedQuery,
          });
        } else if (depth1 && !depth2) {
          router.push({
            pathname: `/${Routes.ListingDetail}`,
            query: convertedQuery,
          });
        }
      } else {
        router.push(`/${Routes.EntryMobile}/${Routes.ListingDetail}?listingID=${data.listing_id}`);
      }
    } else if (!response?.can_access) {
      setOpenPastPopup(true);
    }
  }, [data?.listing_id, platform, router]);

  const handleCancelBidding = useCallback(async () => {
    const listingID = router?.query?.listingID;
    const biddingID = router?.query?.biddingID;

    if (listingID && biddingID) {
      await apiService.cancelBidding(Number(listingID), Number(biddingID));

      toast.success('제안을 취소하였습니다.');

      if (platform === 'pc') {
        if (router?.query?.back) {
          router.replace(router.query.back as string);
        } else {
          const depth1 = router?.query?.depth1;
          const depth2 = router?.query?.depth2;

          const query = router.query;

          delete query.depth1;
          delete query.depth2;

          if (depth1 && depth2) {
            if (depth1 === Routes.ListingDetailHistory) {
              router.replace({
                pathname: `/${Routes.MyParticipatingListings}/${depth2}`,
                query: {
                  ...query,
                  tab: '4',
                },
              });
            } else {
              router.replace({
                pathname: `/${depth1}/${Routes.MyParticipatingListings}`,
                query: {
                  ...query,
                  tab: '4',
                },
              });
            }
            return;
          }

          router.replace({
            pathname: `/${Routes.MyParticipatingListings}`,
            query: {
              ...query,
              tab: '4',
            },
          });
        }
      } else {
        router.replace(`/${Routes.EntryMobile}/${Routes.MyParticipatingListings}?tab=4`);
      }
    }
  }, [platform, router]);

  const handleClosePastPopup = useCallback(() => {
    setOpenPastPopup(false);
  }, []);

  const handleCloseCancelBiddingPopup = useCallback(() => {
    setOpenCancelBiddingPopup(false);
  }, []);

  const handleOpenCancelBiddingPopup = useCallback(() => {
    setOpenCancelBiddingPopup(true);
  }, []);

  return {
    openPastPopup,
    openCancelBiddingPopup,
    handleNavigateToBack,
    handleNavigateToChatRoom,
    handleNavigateToListingDetail,
    handleNavigateToTransactionReview,
    handleNavigateToUpdateBiddingForm,
    handleCancelBidding,
    handleClosePastPopup,
    handleOpenCancelBiddingPopup,
    handleCloseCancelBiddingPopup,
  };
}
