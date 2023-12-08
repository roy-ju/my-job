import { useCallback, useMemo, useState } from 'react';

import { usePlatform } from '@/providers/PlatformProvider';

import { useRouter } from '@/hooks/utils';

import { useRouter as useNextRouter } from 'next/router';

import Routes from '@/router/routes';

import useChatRoomStore from './useChatRoomStore';

export default function useClientAccordionHandler() {
  const platform = usePlatform();
  const nextRouter = useNextRouter();
  const router = useRouter(platform?.depth);

  const store = useChatRoomStore();

  const [open, setOpen] = useState(false);

  const [subTab, setSubTab] = useState(0);

  const chatRoomType = useMemo(() => store?.data?.chat_room_type, [store?.data?.chat_room_type]);

  const isPC = useMemo(() => platform?.platform === 'pc', [platform?.platform]);

  const accordionDetails = useMemo(
    () => ({
      listingItem1Count: store?.data?.listing_item1_count || 0,
      listingItem1Arr: store?.data?.listing_item1,

      listingItem2Count: store?.data?.listing_item2_count || 0,
      listingItem2Arr: store?.data?.listing_item2,

      suggestCount: store?.data?.suggest_item_count || 0,
      suggestItemArr: store?.data?.suggest_item,

      recommendCount: store?.data?.recommend_item_count || 0,
      recommendItemArr: store?.data?.recommend_item,
    }),
    [store?.data],
  );

  const onClickNavigateToListingDetail = useCallback(
    (listingID?: number, biddingID?: Nullable<number>) => {
      if (biddingID && listingID) {
        if (isPC) {
          router.replace(Routes.ListingDetailHistory, {
            searchParams: { listingID: `${listingID}`, biddingID: `${biddingID}`, back: `${router.asPath}` },
          });
        } else {
          nextRouter.push(
            `/${Routes.EntryMobile}/${Routes.ListingDetailHistory}?listingID=${listingID}&biddingID=${biddingID}`,
          );
        }

        return;
      }

      if (listingID) {
        if (isPC) {
          router.replace(Routes.ListingDetail, {
            searchParams: { listingID: `${listingID}`, back: `${router.asPath}` },
          });
        } else {
          nextRouter.push(`/${Routes.EntryMobile}/${Routes.ListingDetail}?listingID=${listingID}`);
        }
      }
    },
    [isPC, nextRouter, router],
  );

  const onClickNavigateToSuggestDetail = useCallback(
    (suggestID?: number) => {
      if (suggestID) {
        if (isPC) {
          router.replace(Routes.MySuggestDetail, {
            searchParams: { suggestID: `${suggestID}`, back: `${router.asPath}` },
          });
        } else {
          nextRouter.push(`/${Routes.EntryMobile}/${Routes.MySuggestDetail}?suggestID=${suggestID}`);
        }
      }
    },
    [isPC, nextRouter, router],
  );

  const onClickNavigateToSuggestRecommended = useCallback(
    (suggestID?: number) => {
      if (isPC) {
        router.replace(Routes.SuggestRecommendedDetail, {
          searchParams: { back: `${router.asPath}` },
          state: { suggestID: `${suggestID}` },
        });
      } else {
        nextRouter.push(
          {
            pathname: `/${Routes.EntryMobile}/${Routes.SuggestRecommendedDetail}`,
            query: { suggestID: suggestID?.toString() },
          },
          `/${Routes.EntryMobile}/${Routes.SuggestRecommendedDetail}`,
        );
      }
    },
    [isPC, nextRouter, router],
  );

  return {
    chatRoomType,
    open,
    subTab,
    accordionDetails,
    setOpen,
    setSubTab,
    onClickNavigateToListingDetail,
    onClickNavigateToSuggestDetail,
    onClickNavigateToSuggestRecommended,
  };
}
