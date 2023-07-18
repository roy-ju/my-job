import { GetDanjiDetailResponse } from '@/apis/danji/danjiDetail';
import { useAPI_GetDanjiListingsList } from '@/apis/danji/danjiListingsList';
import { Button } from '@/components/atoms';
import { Dropdown } from '@/components/molecules';
import { useRouter } from '@/hooks/utils';
import Routes from '@/router/routes';
import { Dispatch, SetStateAction, useCallback, useEffect, useState } from 'react';
import { useRouter as useNextRouter } from 'next/router';
import ListingItem from '../ListingItem';

export default function ActiveListingInfo({
  isListingDetail = false,
  depth,
  danji,
  setLoadingListing,
}: {
  isListingDetail?: boolean;
  depth: number;
  danji?: GetDanjiDetailResponse;
  setLoadingListing: Dispatch<SetStateAction<boolean>>;
}) {
  const [dropDownValue, setDropDownValue] = useState('최신순');

  const router = useRouter(depth);
  const nextRouter = useNextRouter();

  const {
    data: danjiListings,
    isLoading,
    totalCount,
  } = useAPI_GetDanjiListingsList({
    danjiId: danji?.danji_id,
    realestateType: danji?.type,
    orderBy: dropDownValue === '최신순' ? 1 : 2,
    pageSize: 4,
  });

  const handleListingAll = useCallback(() => {
    if (router.query.listingID) {
      router.replace(Routes.DanjiListings, {
        searchParams: {
          listingID: router.query.listingID as string,
          danjiID: `${danji?.danji_id}` || `${router?.query?.danjiID}` || '',
          rt: danji?.type.toString() || (router.query.rt as string) || '',
        },
      });
    } else {
      router.replace(Routes.DanjiListings, {
        searchParams: { danjiID: `${router?.query?.danjiID}`, rt: router.query.rt as string },
      });
    }
  }, [router, danji]);

  const handleListingAllTypeTwo = useCallback(() => {
    if (router.query.listingID) {
      nextRouter.replace({
        pathname: `/${Routes.DanjiListings}`,
        query: {
          danjiID: `${danji?.danji_id}` || `${nextRouter?.query?.danjiID}` || '',
          rt: danji?.type.toString() || (nextRouter.query.rt as string) || '',
        },
      });
    } else {
      nextRouter.replace({
        pathname: `/${Routes.DanjiListings}`,
        query: {
          danjiID: `${danji?.danji_id}` || `${nextRouter?.query?.danjiID}` || '',
          rt: danji?.type.toString() || (nextRouter.query.rt as string) || '',
        },
      });
    }
  }, [router.query.listingID, nextRouter, danji?.danji_id, danji?.type]);

  const handleListingDetail = useCallback(
    (id: number, buyOrRent: number) => {
      nextRouter.replace(
        {
          pathname: `/${Routes.DanjiListings}/${Routes.ListingDetail}`,
          query: {
            listingID: `${id}`,
            danjiID: `${danji?.danji_id}` || `${nextRouter?.query?.danjiID}` || '',
            rt: danji?.type.toString() || (nextRouter.query.rt as string) || '',
            bor: `${buyOrRent}`,
          },
        },
        `/${Routes.DanjiListings}/${Routes.ListingDetail}?listingID=${id}&danjiID=${
          danji?.danji_id || `${nextRouter?.query?.danjiID}` || ''
        }&rt=${danji?.type.toString() || (nextRouter.query.rt as string) || ''}`,
      );
    },
    [nextRouter, danji],
  );

  useEffect(() => {
    if (isLoading === false) {
      setLoadingListing(false);
    }
  }, [isLoading, setLoadingListing]);

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
      <div>
        <div tw="flex mb-2 px-5 items-center">
          <h2 tw="text-b1 [line-height: 1.5] font-bold">네고가능 매물&nbsp;</h2>
          <span tw="text-b1 text-nego [line-height: 1.5] font-bold">{totalCount || 0}</span>
          <Dropdown
            size="small"
            variant="outlined"
            tw="[width: 92px] min-w-0 ml-auto"
            value={dropDownValue}
            onChange={(v) => {
              setDropDownValue(v);
            }}
          >
            <Dropdown.Option tw="[width: 92px] text-info py-0.5" value="최신순">
              최신순
            </Dropdown.Option>
            <Dropdown.Option tw="[width: 92px] text-info py-0.5" value="가격순">
              가격순
            </Dropdown.Option>
          </Dropdown>
        </div>
        <ListingItem>
          {danjiListings.slice(0, 3).map((item, index) => (
            <ListingItem.TypeOne
              key={item.listing_id}
              item={item}
              isLast={danjiListings.length - 1 === index}
              onClick={() => handleListingDetail(item.listing_id, item.buy_or_rent)}
              anchorURL={`/${Routes.DanjiListings}/${Routes.ListingDetail}?listingID=${item.listing_id}&danjiID=${
                danji?.danji_id || `${nextRouter?.query?.danjiID}` || ''
              }&rt=${danji?.type.toString() || (nextRouter.query.rt as string) || ''}`}
            />
          ))}
        </ListingItem>

        {danjiListings.length > 3 && (
          <div tw="flex flex-col gap-3 pt-3 px-5">
            <Button variant="outlined" size="medium" tw="w-full" onClick={handleListingAll}>
              매물 전체보기
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
