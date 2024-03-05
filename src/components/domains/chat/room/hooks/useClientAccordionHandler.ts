import { useCallback, useMemo, useState } from 'react';

import { useRouter } from 'next/router';

import Routes from '@/router/routes';

import useCheckPlatform from '@/hooks/useCheckPlatform';

import useChatRoomStore from './useChatRoomStore';

export default function useClientAccordionHandler() {
  const store = useChatRoomStore();

  const { platform } = useCheckPlatform();

  const router = useRouter();

  const [open, setOpen] = useState(false);

  const [subTab, setSubTab] = useState(0);

  const chatRoomType = useMemo(() => store?.data?.chat_room_type, [store?.data?.chat_room_type]);

  const isPC = useMemo(() => platform === 'pc', [platform]);

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

  const handleClickNavigateToListingDetail = useCallback(
    (listingID?: number, biddingID?: Nullable<number>) => {
      if (biddingID && listingID) {
        if (isPC) {
          const depth1 = router?.query?.depth1 ?? '';
          const depth2 = router?.query?.depth2 ?? '';

          const query = router.query;

          delete query.depth1;
          delete query.depth2;

          if (depth1 && depth2) {
            if (depth1 === Routes.ChatRoom) {
              router.push({
                pathname: `/${Routes.ListingDetailHistory}/${depth2}`,
                query: {
                  ...query,
                  listingID: `${listingID}`,
                  biddingID: `${biddingID}`,
                  back: `${router.asPath}`,
                },
              });
            } else {
              router.push({
                pathname: `/${depth1}/${Routes.ListingDetailHistory}`,
                query: { ...query, listingID: `${listingID}`, biddingID: `${biddingID}`, back: `${router.asPath}` },
              });
            }
          } else if (depth1 && !depth2) {
            router.push({
              pathname: `/${Routes.ListingDetailHistory}`,
              query: { ...query, listingID: `${listingID}`, biddingID: `${biddingID}`, back: `${router.asPath}` },
            });
          }
        } else {
          router.push(
            `/${Routes.EntryMobile}/${Routes.ListingDetailHistory}?listingID=${listingID}&biddingID=${biddingID}`,
          );
        }

        return;
      }

      if (listingID) {
        if (isPC) {
          const depth1 = router?.query?.depth1 ?? '';
          const depth2 = router?.query?.depth2 ?? '';

          const query = router.query;

          delete query.depth1;
          delete query.depth2;

          if (depth1 && depth2) {
            if (depth1 === Routes.ChatRoom) {
              router.push({
                pathname: `/${Routes.ListingDetail}/${depth2}`,
                query: {
                  ...query,
                  listingID: `${listingID}`,
                  back: `${router.asPath}`,
                },
              });
            } else {
              router.push({
                pathname: `/${depth1}/${Routes.ListingDetail}`,
                query: { ...query, listingID: `${listingID}`, back: `${router.asPath}` },
              });
            }
          } else if (depth1 && !depth2) {
            router.push({
              pathname: `/${Routes.ListingDetail}`,
              query: { ...query, listingID: `${listingID}`, back: `${router.asPath}` },
            });
          }
        } else {
          router.push(`/${Routes.EntryMobile}/${Routes.ListingDetail}?listingID=${listingID}`);
        }
      }
    },
    [isPC, router],
  );

  const handleClickNavigateToSuggestDetail = useCallback(
    (suggestID?: number) => {
      if (suggestID) {
        if (isPC) {
          const depth1 = router?.query?.depth1 ?? '';
          const depth2 = router?.query?.depth2 ?? '';

          const query = router.query;

          delete query.depth1;
          delete query.depth2;

          if (depth1 && depth2) {
            if (depth1 === Routes.ChatRoom) {
              router.push({
                pathname: `/${Routes.MySuggestDetail}/${depth2}`,
                query: {
                  ...query,
                  suggestID: `${suggestID}`,
                  back: `${router.asPath}`,
                },
              });
            } else {
              router.push({
                pathname: `/${depth1}/${Routes.MySuggestDetail}`,
                query: { ...query, suggestID: `${suggestID}`, back: `${router.asPath}` },
              });
            }
          } else if (depth1 && !depth2) {
            router.push({
              pathname: `/${Routes.MySuggestDetail}`,
              query: { ...query, suggestID: `${suggestID}`, back: `${router.asPath}` },
            });
          }
        } else {
          router.push(`/${Routes.EntryMobile}/${Routes.MySuggestDetail}?suggestID=${suggestID}`);
        }
      }
    },
    [isPC, router],
  );

  const handleClickNavigateToSuggestRecommended = useCallback(
    (suggestID?: number) => {
      if (isPC) {
        const depth1 = router?.query?.depth1 ?? '';
        const depth2 = router?.query?.depth2 ?? '';

        const query = router.query;

        delete query.depth1;
        delete query.depth2;

        if (depth1 && depth2) {
          if (depth1 === Routes.ChatRoom) {
            router.push({
              pathname: `/${Routes.SuggestRecommendedDetail}/${depth2}`,
              query: {
                ...query,
                suggestID: `${suggestID}`,
                back: `${router.asPath}`,
              },
            });
          } else {
            router.push({
              pathname: `/${depth1}/${Routes.SuggestRecommendedDetail}`,
              query: { ...query, suggestID: `${suggestID}`, back: `${router.asPath}` },
            });
          }
        } else if (depth1 && !depth2) {
          router.push({
            pathname: `/${Routes.SuggestRecommendedDetail}`,
            query: { ...query, suggestID: `${suggestID}`, back: `${router.asPath}` },
          });
        }
      } else {
        router.push(
          {
            pathname: `/${Routes.EntryMobile}/${Routes.SuggestRecommendedDetail}`,
            query: { suggestID: suggestID?.toString() },
          },
          `/${Routes.EntryMobile}/${Routes.SuggestRecommendedDetail}`,
        );
      }
    },
    [isPC, router],
  );

  return {
    chatRoomType,
    open,
    subTab,
    accordionDetails,
    setOpen,
    setSubTab,
    handleClickNavigateToListingDetail,
    handleClickNavigateToSuggestDetail,
    handleClickNavigateToSuggestRecommended,
  };
}
