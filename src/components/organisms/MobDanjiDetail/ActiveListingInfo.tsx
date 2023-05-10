import { GetDanjiDetailResponse } from '@/apis/danji/danjiDetail';
import { useAPI_GetDanjiListingsList } from '@/apis/danji/danjiListingsList';
import { Button } from '@/components/atoms';
import { Dropdown } from '@/components/molecules';

import Routes from '@/router/routes';
import { useRouter } from 'next/router';
import { Dispatch, SetStateAction, useCallback, useEffect, useState } from 'react';
import ListingItem from '../ListingItem';

export default function ActiveListingInfo({
  danji,
  setLoadingListing,
}: {
  danji?: GetDanjiDetailResponse;
  setLoadingListing: Dispatch<SetStateAction<boolean>>;
}) {
  const [dropDownValue, setDropDownValue] = useState('최신순');

  const router = useRouter();

  const {
    totalCount,
    data: danjiListings,
    isLoading,
  } = useAPI_GetDanjiListingsList({
    pnu: danji?.pnu,
    realestateType: danji?.type,
    orderBy: dropDownValue === '최신순' ? 1 : 2,
    pageSize: 4,
  });

  const handleListingAll = useCallback(() => {
    router.push(
      {
        pathname: `/${Routes.EntryMobile}/${Routes.DanjiListings}`,
        query: {
          p: router.query.p ? `${router.query.p}` : danji?.pnu || '',
          rt: router.query.rt ? (router.query.rt as string) : danji?.type?.toString() || '',
        },
      },
      `/${Routes.EntryMobile}/${Routes.DanjiListings}?p=${danji?.pnu}&rt=${danji?.type}`,
    );
  }, [danji?.pnu, danji?.type, router]);

  const handleListingDetail = useCallback(
    (id: number) => {
      router.push(
        {
          pathname: `/${Routes.EntryMobile}/${Routes.ListingDetail}?listingID=${id}`,
          query: {
            listingID: `${id}`,
            p: router.query.p ? `${router.query.p}` : danji?.pnu || '',
            rt: router.query.rt ? (router.query.rt as string) : danji?.type?.toString() || '',
          },
        },
        `/${Routes.EntryMobile}/${Routes.ListingDetail}?listingID=${id}`,
      );
    },
    [router, danji],
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
        <div tw="flex mb-2 px-5">
          <span tw="text-b1 [line-height: 1] font-bold">네고가능 매물&nbsp;</span>
          <span tw="text-b1 text-nego [line-height: 1] font-bold">{totalCount || 0}</span>
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
