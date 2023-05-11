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
  depth,
  danji,
  setLoadingListing,
}: {
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
    pnu: danji?.pnu,
    realestateType: danji?.type,
    orderBy: dropDownValue === '최신순' ? 1 : 2,
    pageSize: 4,
  });

  const handleListingAll = useCallback(() => {
    if (router.query.listingID) {
      router.push(Routes.DanjiListings, {
        searchParams: {
          listingID: router.query.listingID as string,
          p: danji?.pnu || `${router.query.p}` || '',
          rt: danji?.type.toString() || (router.query.rt as string) || '',
        },
      });
    } else {
      router.push(Routes.DanjiListings, { searchParams: { p: `${router.query.p}`, rt: router.query.rt as string } });
    }
  }, [router, danji]);

  const handleListingDetail = useCallback(
    (id: number) => {
      nextRouter.replace({
        pathname: `/${Routes.DanjiListings}/${Routes.ListingDetail}`,
        query: {
          listingID: `${id}`,
          p: danji?.pnu || `${nextRouter.query.p}` || '',
          rt: danji?.type.toString() || (nextRouter.query.rt as string) || '',
        },
      });
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

  return (
    <div tw="pb-8">
      <div>
        <div tw="flex mb-2 px-5 items-center">
          <span tw="text-b1 [line-height: 1.5] font-bold">네고가능 매물&nbsp;</span>
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
            <Dropdown.Option tw="[width: 92px]" value="최신순">
              최신순
            </Dropdown.Option>
            <Dropdown.Option tw="[width: 92px]" value="가격순">
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
              onClick={() => handleListingDetail(item.listing_id)}
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
