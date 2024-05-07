import { useCallback, useState } from 'react';

import { useRouter } from 'next/router';

import useCheckPlatform from '@/hooks/useCheckPlatform';

import replaceFirstOccurrence from '@/utils/replaceFirstOccurrence';

import { apiService } from '@/services';

import { MyListingDetailPassedResponse } from '@/services/my/types';

import Routes from '@/router/routes';

export default function useDirectHandler({ data }: { data?: MyListingDetailPassedResponse }) {
  const router = useRouter();

  const { platform } = useCheckPlatform();

  const [openPastPopup, setOpenPastPopup] = useState(false);

  const handleNavigateToListingDetail = useCallback(() => {
    if (!data?.listing_id) return;

    if (platform === 'pc') {
      const depth1 = router.query.depth1;
      const depth2 = router.query.depth2;

      const query = router.query;

      delete query.depth1;
      delete query.depth2;

      if (depth1 && depth2) {
        router.push({
          pathname: `/${depth1}/${Routes.ListingDetail}`,
          query: { ...query, listingID: `${data.listing_id}` },
        });
      } else if (depth1 && !depth2) {
        router.push({ pathname: `/${Routes.ListingDetail}`, query: { ...query, listingID: `${data.listing_id}` } });
      }
    } else {
      router.push(`/${Routes.EntryMobile}/${Routes.ListingDetail}?listingID=${data?.listing_id}`);
    }
  }, [data?.listing_id, router, platform]);

  const handleDirectPassedItem = async () => {
    if (!data?.listing_id) return;

    const response = await apiService.getListingStatus(data.listing_id);

    if (response?.can_access) {
      handleNavigateToListingDetail();
    } else if (!response?.can_access) {
      setOpenPastPopup(true);
    }
  };

  const handleNavigateToChatRoom = useCallback(() => {
    if (!data?.seller_agent_chat_room_id) return;

    if (platform === 'pc') {
      const depth1 = router.query.depth1;
      const depth2 = router.query.depth2;

      const query = router.query;

      delete query.depth1;
      delete query.depth2;

      if (depth1 && depth2) {
        router.push({
          pathname: `/${depth1}/${Routes.ChatRoom}`,
          query: { ...query, chatRoomID: `${data.seller_agent_chat_room_id}` },
        });
      } else if (depth1 && !depth2) {
        router.push({
          pathname: `/${Routes.ChatRoom}`,
          query: { ...query, chatRoomID: `${data.seller_agent_chat_room_id}` },
        });
      }
    } else {
      router.push(`/${Routes.EntryMobile}/${Routes.ChatRoom}?chatRoomID=${data.seller_agent_chat_room_id}`);
    }
  }, [data?.seller_agent_chat_room_id, router, platform]);

  const handleNavigateToTransactionReview = useCallback(() => {
    if (!data?.listing_contract_id || !data?.listing_id) return;

    if (platform === 'pc') {
      const depth1 = router.query.depth1;
      const depth2 = router.query.depth2;

      const query = router.query;

      delete query.depth1;
      delete query.depth2;

      if (depth1 && depth2) {
        router.push({
          pathname: `/${depth1}/${Routes.TransactionReview}`,
          query: {
            ...query,
            listingContractID: `${data.listing_contract_id}`,
            listingID: `${data.listing_id}`,
            hasReview: `${data?.has_review}`,
          },
        });
      } else if (depth1 && !depth2) {
        router.push({
          pathname: `/${Routes.TransactionReview}`,
          query: {
            ...query,
            listingContractID: `${data.listing_contract_id}`,
            listingID: `${data.listing_id}`,
            hasReview: `${data?.has_review}`,
          },
        });
      }
    } else {
      router.push(
        `/${Routes.EntryMobile}/${Routes.TransactionReview}?listingContractID=${data.listing_contract_id}&listingID=${data.listing_id}&hasReview=${data?.has_review}`,
      );
    }
  }, [data?.has_review, data?.listing_contract_id, data?.listing_id, platform, router]);

  const handleNavigateToBack = useCallback(() => {
    if (platform === 'pc') {
      const path = replaceFirstOccurrence(router.asPath, Routes.ListingDetailPassed, Routes.MyRegisteredListingList);
      router.replace(path);
    } else {
      router.back();
    }
  }, [platform, router]);

  const handleClosePastPopup = useCallback(() => {
    setOpenPastPopup(false);
  }, []);

  return {
    openPastPopup,
    handleClosePastPopup,
    handleNavigateToBack,
    handleNavigateToChatRoom,
    handleNavigateToTransactionReview,
    handleDirectPassedItem,
  };
}
