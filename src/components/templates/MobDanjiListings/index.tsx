import { useCallback, useState } from 'react';

import Image from 'next/image';

import { useRouter } from 'next/router';

import { Button, InfiniteScroll, PersistentBottomBar } from '@/components/atoms';

import { Dropdown, NavigationHeader, OverlayPresenter, Popup } from '@/components/molecules';

import { ListingItem, MobDanjiDetailSection } from '@/components/organisms';

import useAuthPopup from '@/states/hooks/useAuhPopup';

import useReturnUrl from '@/states/hooks/useReturnUrl';

import Routes from '@/router/routes';

import { GetDanjiDetailResponse } from '@/apis/danji/danjiDetail';

import { GetDanjiListingsResponse } from '@/apis/danji/danjiListingsList';

import listingEligibilityCheck from '@/apis/listing/listingEligibilityCheck';

import useAPI_GetUserInfo from '@/apis/user/getUserInfo';

import ListingNodata from '@/../public/static/images/listing_nodata.png';

export default function MobDanjiListings({
  data,
  danji,
  totalCount,
  dropDownValue,
  onNext,
  handleBackButton,
  handleChangeDropDown,
}: {
  data?: GetDanjiListingsResponse['list'];
  danji?: GetDanjiDetailResponse;
  totalCount: number;
  dropDownValue: string;
  onNext?: () => void;
  handleBackButton?: () => void;
  handleChangeDropDown: (value: string) => void;
}) {
  const router = useRouter();

  const { data: userData } = useAPI_GetUserInfo();

  const { openAuthPopup } = useAuthPopup();

  const { handleUpdateReturnUrl } = useReturnUrl();

  const [openVerificationAddressPopup, setOpenVerificationAddressPopup] = useState(false);
  const [openNeedMoreVerificationAddressPopup, setOpenNeedMoreVerificationAddressPopup] = useState(false);

  const handleClickListingDetail = (id: number, buyOrRent: number) => {
    router.push(
      {
        pathname: `/${Routes.EntryMobile}/${Routes.ListingDetail}`,
        query: { listingID: `${id}`, bor: `${buyOrRent}` },
      },
      `/${Routes.EntryMobile}/${Routes.ListingDetail}?listingID=${id}`,
    );
  };

  const handleCreateListing = useCallback(async () => {
    if (!userData) {
      openAuthPopup('needVerify');
      handleUpdateReturnUrl();
      return;
    }

    if (!userData.is_verified) {
      router.push(`/${Routes.EntryMobile}/${Routes.VerifyCi}`);
      handleUpdateReturnUrl();
      return;
    }

    if (!userData?.has_address) {
      setOpenVerificationAddressPopup(true);
      return;
    }

    if (userData?.has_address) {
      const res = await listingEligibilityCheck({ danji_id: danji?.danji_id });

      if (res && !res?.is_eligible) {
        setOpenNeedMoreVerificationAddressPopup(true);
        return;
      }

      if (res && res?.is_eligible) {
        router.push({
          pathname: `/${Routes.EntryMobile}/${Routes.ListingSelectAddress}`,
          query: {
            origin: router.asPath,
            ...(router?.query?.danjiID ? { danjiID: router?.query?.danjiID } : {}),
          },
        });
      }
    }
  }, [danji?.danji_id, handleUpdateReturnUrl, openAuthPopup, router, userData]);

  if (!danji) return null;

  return (
    <>
      <div tw="w-full flex flex-col relative h-full">
        <NavigationHeader>
          <NavigationHeader.BackButton onClick={handleBackButton} />
          <NavigationHeader.Title>단지 매물 목록</NavigationHeader.Title>
        </NavigationHeader>

        <div tw="[min-height: 24px]" />

        <MobDanjiDetailSection>
          <MobDanjiDetailSection.Info danji={danji} isShowDanjiListings />
        </MobDanjiDetailSection>

        {data && data.length > 0 && (
          <div tw="px-5">
            <div tw="flex items-center mb-1">
              <p tw="text-b1 font-bold mt-1">
                매물 <span tw="text-nego-1000">{totalCount || 0}</span>
              </p>
              <div tw="ml-auto">
                <Dropdown
                  size="small"
                  variant="outlined"
                  tw="[width: 92px] min-w-0 ml-auto"
                  value={dropDownValue}
                  onChange={(v) => {
                    handleChangeDropDown(v);
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
            </div>
            <p tw="text-info text-gray-700">매수인, 임차인의 가격 제안을 기다리고 있는 매물이에요.</p>
          </div>
        )}

        {data && data.length > 0 && (
          <div tw="flex-1 min-h-0 overflow-auto">
            <InfiniteScroll tw="pt-0 flex-1 min-h-0 overflow-auto" onNext={onNext}>
              {data.map((item, index) => (
                <ListingItem.TypeOne
                  key={item.listing_id}
                  item={item}
                  isFirst={index === 0}
                  isLast={data.length - 1 === index}
                  onClick={() => {
                    handleClickListingDetail(item.listing_id, item.buy_or_rent);
                  }}
                />
              ))}
            </InfiniteScroll>
          </div>
        )}

        {data && data.length === 0 && (
          <div tw="px-5 flex-1 min-h-0 overflow-auto flex flex-col items-center">
            <Image src={ListingNodata.src} width={200} height={128} alt="" />
            <p tw="mt-4 mb-2 text-center text-h2 font-bold">해당 단지에 등록된 매물이 없어요!</p>
            <p tw="text-center text-info text-gray-700">
              해당 단지에 매물을 가지고 있다면
              <br />
              우리집 등록 후 매물을 등록해보세요!
            </p>
          </div>
        )}

        <PersistentBottomBar>
          <div tw="w-full [padding-bottom: 26px]">
            <Button variant="primary" size="bigger" tw="w-full" onClick={handleCreateListing}>
              매물 등록
            </Button>
          </div>
        </PersistentBottomBar>
      </div>

      {openVerificationAddressPopup && (
        <OverlayPresenter>
          <Popup>
            <Popup.ContentGroup tw="[text-align: center]">
              <Popup.SubTitle>
                이 단지의 집주인만 매물등록이 가능합니다.
                <br />
                우리집을 인증하시겠습니까?
              </Popup.SubTitle>
            </Popup.ContentGroup>
            <Popup.ButtonGroup>
              <Popup.CancelButton onClick={() => setOpenVerificationAddressPopup(false)}>취소</Popup.CancelButton>
              <Popup.ActionButton
                onClick={() => {
                  setOpenVerificationAddressPopup(false);
                  router.push({
                    pathname: `/${Routes.EntryMobile}/${Routes.MyAddress}`,
                    query: {
                      origin: router.asPath,
                    },
                  });
                }}
              >
                인증하기
              </Popup.ActionButton>
            </Popup.ButtonGroup>
          </Popup>
        </OverlayPresenter>
      )}

      {openNeedMoreVerificationAddressPopup && (
        <OverlayPresenter>
          <Popup>
            <Popup.ContentGroup tw="[text-align: center]">
              <Popup.SubTitle>
                추가로 매물등록이 가능한 우리집 정보가 없습니다.
                <br />
                우리집을 추가 인증하시겠습니까?
              </Popup.SubTitle>
            </Popup.ContentGroup>
            <Popup.ButtonGroup>
              <Popup.CancelButton onClick={() => setOpenNeedMoreVerificationAddressPopup(false)}>
                취소
              </Popup.CancelButton>
              <Popup.ActionButton
                onClick={() => {
                  setOpenNeedMoreVerificationAddressPopup(false);
                  router.push({
                    pathname: `/${Routes.EntryMobile}/${Routes.MyAddress}`,
                    query: {
                      origin: router.asPath,
                    },
                  });
                }}
              >
                인증하기
              </Popup.ActionButton>
            </Popup.ButtonGroup>
          </Popup>
        </OverlayPresenter>
      )}
    </>
  );
}
