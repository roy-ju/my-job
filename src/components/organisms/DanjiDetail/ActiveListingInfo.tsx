import { GetDanjiDetailResponse } from '@/apis/danji/danjiDetail';
import { useAPI_GetDanjiListingsList } from '@/apis/danji/danjiListingsList';
import { Button } from '@/components/atoms';
import { useRouter } from '@/hooks/utils';
import Routes from '@/router/routes';
import { useCallback, useState } from 'react';
import { useRouter as useNextRouter } from 'next/router';
import NewTabs from '@/components/molecules/Tabs/NewTabs';
import tw from 'twin.macro';
import { useAPI_GetDanjiSuggestList } from '@/apis/danji/danjiSuggestList';
import ListingItem from '../ListingItem';

export default function ActiveListingInfo({
  isListingDetail = false,
  depth,
  danji,
}: {
  isListingDetail?: boolean;
  depth: number;
  danji?: GetDanjiDetailResponse;
}) {
  const [tab, setTab] = useState(1);

  const router = useRouter(depth);
  const nextRouter = useNextRouter();

  const { data: danjiListings, totalCount } = useAPI_GetDanjiListingsList({
    danjiId: danji?.danji_id,
    realestateType: danji?.type,
    orderBy: 1,
    pageSize: 4,
  });

  const { data: suggestListings, totalCount: suggestTotalCount } = useAPI_GetDanjiSuggestList({
    danjiId: danji?.danji_id,
    pageSize: 4,
  });

  const handleListingAll = useCallback(() => {
    if (router.query.listingID) {
      router.replace(Routes.DanjiListings, {
        searchParams: {
          listingID: router.query.listingID as string,
          danjiID: `${danji?.danji_id}` || `${router?.query?.danjiID}` || '',
        },
      });
    } else {
      router.replace(Routes.DanjiListings, {
        searchParams: { danjiID: `${router?.query?.danjiID}` },
      });
    }
  }, [router, danji]);

  const handleSuggestListAll = useCallback(() => {
    if (router.query.listingID) {
      router.replace(Routes.DanjiSuggestListings, {
        searchParams: {
          listingID: router.query.listingID as string,
          danjiID: `${danji?.danji_id}` || `${router?.query?.danjiID}` || '',
        },
      });
    } else {
      router.replace(Routes.DanjiSuggestListings, {
        searchParams: { danjiID: `${router?.query?.danjiID}` },
      });
    }
  }, [router, danji]);

  const handleListingAllTypeTwo = useCallback(() => {
    if (router.query.listingID) {
      nextRouter.replace({
        pathname: `/${Routes.DanjiListings}`,
        query: {
          danjiID: `${danji?.danji_id}` || `${nextRouter?.query?.danjiID}` || '',
        },
      });
    } else {
      nextRouter.replace({
        pathname: `/${Routes.DanjiListings}`,
        query: {
          danjiID: `${danji?.danji_id}` || `${nextRouter?.query?.danjiID}` || '',
        },
      });
    }
  }, [router.query.listingID, nextRouter, danji?.danji_id]);

  const handleListingDetail = useCallback(
    (id: number, buyOrRent: number) => {
      nextRouter.replace(
        {
          pathname: `/${Routes.DanjiListings}/${Routes.ListingDetail}`,
          query: {
            listingID: `${id}`,
            danjiID: `${danji?.danji_id}` || `${nextRouter?.query?.danjiID}` || '',
            bor: `${buyOrRent}`,
          },
        },
        `/${Routes.DanjiListings}/${Routes.ListingDetail}?listingID=${id}&danjiID=${
          danji?.danji_id || `${nextRouter?.query?.danjiID}` || ''
        }`,
      );
    },
    [nextRouter, danji],
  );

  if (!danjiListings) return null;

  if (danjiListings && danjiListings.length === 0) return null;

  if (isListingDetail && danjiListings.length > 0)
    return (
      <div tw="flex flex-col gap-3 px-5 pb-10">
        <Button
          variant="outlined"
          size="medium"
          tw="w-full"
          onClick={handleListingAllTypeTwo}
          name="allDanjiListingsShow"
        >
          단지내 매물 전체보기&nbsp;{!!totalCount && <span tw="font-bold">{totalCount}</span>}
        </Button>
      </div>
    );

  return (
    <div tw="pb-8">
      <NewTabs variant="contained" value={tab} onChange={(v) => setTab(v)}>
        <NewTabs.Tab value={1}>
          <span tw="text-b2 leading-4">
            구해요 <span css={[tab === 1 && tw`text-nego-1000`]}>{suggestTotalCount || 0}</span>
          </span>
        </NewTabs.Tab>
        <NewTabs.Tab value={2}>
          <span tw="text-b2 leading-4">
            매물 <span css={[tab === 2 && tw`text-nego-1000`]}>{totalCount || 0}</span>
          </span>
        </NewTabs.Tab>
        <NewTabs.Indicator />
      </NewTabs>

      <div>
        <div tw="flex pt-7 mb-2 px-5 items-center justify-between">
          {tab === 1 ? (
            <h2 tw="text-info text-gray-700">
              중개사와 집주인의 연락을
              <br />
              기다리고 있는 요청이에요.
            </h2>
          ) : (
            <h2 tw="text-info text-gray-700">
              매수인, 임차인의 가격 제안을
              <br />
              기다리고 있는 매물이에요.
            </h2>
          )}

          {tab === 1 ? (
            <Button variant="outlined" tw="h-9" onClick={handleSuggestListAll}>
              구해요 전체보기
            </Button>
          ) : (
            <Button variant="outlined" tw="h-9" onClick={handleListingAll}>
              매물 전체보기
            </Button>
          )}
        </div>

        <ListingItem>
          {tab === 1 &&
            suggestListings.slice(0, 3).map((item, index) => (
              <ListingItem.TypeTwo
                key={item.suggest_id}
                item={item}
                isLast={danjiListings.length - 1 === index}
                // onClick={() => handleListingDetail(1, 1)}
                // anchorURL={`/${Routes.DanjiListings}/${Routes.ListingDetail}?listingID=${item.listing_id}&danjiID=${
                //   danji?.danji_id || `${nextRouter?.query?.danjiID}` || ''
                // }`}
              />
            ))}

          {tab === 2 &&
            danjiListings
              .slice(0, 3)
              .map((item, index) => (
                <ListingItem.TypeOne
                  key={item.listing_id}
                  item={item}
                  isLast={danjiListings.length - 1 === index}
                  onClick={() => handleListingDetail(item.listing_id, item.buy_or_rent)}
                  anchorURL={`/${Routes.DanjiListings}/${Routes.ListingDetail}?listingID=${item.listing_id}&danjiID=${
                    danji?.danji_id || `${nextRouter?.query?.danjiID}` || ''
                  }`}
                />
              ))}
        </ListingItem>
      </div>
    </div>
  );
}
