import { GetListingDetailResponse } from '@/apis/listing/getListingDetail';
import { Button, Numeral, PersistentBottomBar, Separator } from '@/components/atoms';
import { Accordion, NavigationHeader, Table, Tabs } from '@/components/molecules';
import { ListingCtaButtons, ListingDetailSection, PhotoHero } from '@/components/organisms';

import HeartFilledIcon from '@/assets/icons/heart.svg';
import HeartOutlinedIcon from '@/assets/icons/heart_outlined.svg';
import ShareIcon from '@/assets/icons/share.svg';
import { useMemo, useRef, useState } from 'react';
import { useIsomorphicLayoutEffect, useScroll } from '@/hooks/utils';
import tw from 'twin.macro';
import { RealestateTypeString } from '@/constants/strings';
import falsy from '@/utils/falsy';
import { BuyOrRent } from '@/constants/enums';
import UserStatusStrings from './strings';

export interface ListingDetailProps {
  listingDetail?: GetListingDetailResponse | null;
  isLoading?: boolean;

  onClickFavorite?: () => void;
  onNavigateToParticipateBidding?: () => void;
  onNavigateToUpdateBidding?: () => void;
  onNavigateToChatRoom?: () => void;
  onNavigateToCreateQna?: () => void;
}

export default function ListingDetail({
  listingDetail,
  onClickFavorite,
  onNavigateToParticipateBidding,
  onNavigateToUpdateBidding,
  onNavigateToChatRoom,
  onNavigateToCreateQna,
}: ListingDetailProps) {
  const scrollContainer = useRef<HTMLDivElement | null>(null);
  const [userStatusAccordion, setUserStatusAccordion] = useState<HTMLDivElement | null>(null);

  const [isHeaderActive, setIsHeaderActive] = useState(false);
  const [isTopCtaButtonsVisible, setIsTopCtaButtonsVisible] = useState(true);

  const [infoSectionExpanded, setInfoSectionExpanded] = useState(false);

  const biddingsChatRoomCreated = useMemo(
    () =>
      listingDetail?.biddings_chat_room_created?.map((item) => ({
        nickname: item.nickname,
        createdTime: item.created_time,
        price: item.trade_or_deposit_price,
        monthlyRentFee: item.monthly_rent_fee,
        isMyBidding: item.is_my_bidding,
      })),
    [listingDetail?.biddings_chat_room_created],
  );

  const biddingsChatRoomNotCreated = useMemo(
    () =>
      listingDetail?.biddings_chat_room_not_created?.map((item) => ({
        nickname: item.nickname,
        createdTime: item.created_time,
        price: item.trade_or_deposit_price,
        monthlyRentFee: item.monthly_rent_fee,
        isMyBidding: item.is_my_bidding,
      })),
    [listingDetail?.biddings_chat_room_not_created],
  );

  useScroll(scrollContainer, ({ scrollY }) => {
    setIsHeaderActive(scrollY > 0.1);
  });

  useIsomorphicLayoutEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsTopCtaButtonsVisible(entry.isIntersecting);
    });

    if (userStatusAccordion) {
      observer.observe(userStatusAccordion);
    }
    return () => {
      observer.disconnect();
    };
  }, [userStatusAccordion]);

  return (
    <div tw="relative flex flex-col h-full">
      <NavigationHeader
        css={[
          tw`absolute top-0 left-0 z-50 w-full text-white transition-colors bg-transparent`,
          isHeaderActive && tw`bg-white text-gray-1000`,
        ]}
      >
        <NavigationHeader.Title tw="text-inherit">{listingDetail?.listing?.listing_title}</NavigationHeader.Title>
        <div tw="flex gap-4">
          <NavigationHeader.Button>
            <ShareIcon tw="text-inherit" />
          </NavigationHeader.Button>
          <NavigationHeader.Button onClick={onClickFavorite}>
            {listingDetail?.is_favorite ? <HeartFilledIcon tw="text-red" /> : <HeartOutlinedIcon tw="text-inherit" />}
          </NavigationHeader.Button>
        </div>
      </NavigationHeader>
      <div tw="flex-1 min-h-0 overflow-auto" ref={scrollContainer}>
        <PhotoHero
          itemSize={listingDetail?.photos?.length ?? 0}
          photoPath={listingDetail?.photos?.[0]?.full_file_path}
        />
        <div tw="px-5 py-6">
          <ListingDetailSection.Summary
            createdTime={listingDetail?.active_status_time}
            viewCount={listingDetail?.listing?.view_count}
            participatorCount={listingDetail?.participator_count}
            listingTitle={listingDetail?.listing?.listing_title}
            address={listingDetail?.display_address}
            buyOrRent={listingDetail?.listing?.buy_or_rent}
            price={listingDetail?.trade_or_deposit_price}
            monthlyRentFee={listingDetail?.monthly_rent_fee}
            realestateType={listingDetail?.listing?.realestate_type}
            jeonyongArea={listingDetail?.listing?.jeonyong_area}
            gonggeupArea={listingDetail?.listing?.gonggeup_area}
            floor={listingDetail?.listing?.total_floor}
            floorDescription={listingDetail?.listing?.floor_description}
            direction={listingDetail?.listing?.direction}
            tags={listingDetail?.tags?.map((tag) => tag.name)}
            quickSale={listingDetail?.listing?.quick_sale}
            quickSaleComparative={listingDetail?.listing?.quick_sale_comparative}
          />
        </div>
        {Object.keys(UserStatusStrings).includes(`${listingDetail?.visit_user_type}`) && (
          <div>
            <Separator />
            <Accordion defaultExpanded>
              <Accordion.Summary tw="h-14 px-5 font-bold">
                {UserStatusStrings[listingDetail?.visit_user_type ?? 0]?.title}
              </Accordion.Summary>
              <Accordion.Details tw="pt-1 pb-6 px-5 text-b2 text-gray-700 whitespace-pre-wrap">
                {UserStatusStrings[listingDetail?.visit_user_type ?? 0]?.title}
                <div tw="mt-5" ref={setUserStatusAccordion}>
                  <ListingCtaButtons
                    visitUserType={listingDetail?.visit_user_type ?? 0}
                    buttonSize="big"
                    onNavigateToParticipateBidding={onNavigateToParticipateBidding}
                    onNavigateToUpdateBidding={onNavigateToUpdateBidding}
                    onNavigateToChatRoom={onNavigateToChatRoom}
                  />
                </div>
              </Accordion.Details>
            </Accordion>
          </div>
        )}
        <Separator />
        <div tw="sticky top-8 pt-6 z-50">
          <Tabs>
            <Tabs.Tab value={0}>
              <span tw="text-b2">거래정보</span>
            </Tabs.Tab>
            <Tabs.Tab value={1}>
              <span tw="text-b2">단지정보</span>
            </Tabs.Tab>
            <Tabs.Tab value={2}>
              <span tw="text-b2">Q&A</span>
            </Tabs.Tab>
            <Tabs.Indicator />
          </Tabs>
        </div>
        <div tw="px-5 pt-6 pb-10">
          <ListingDetailSection.Biddings
            showBiddingPrice={listingDetail?.is_owner ?? false}
            biddingsChatRoomCreated={biddingsChatRoomCreated}
            biddingsChatRoomNotCreated={biddingsChatRoomNotCreated}
          />
        </div>
        <Separator />
        <div tw="py-10 px-5">
          <ListingDetailSection.Conditions
            listing={listingDetail?.listing}
            debtSuccessions={listingDetail?.debt_successions}
            collaterals={listingDetail?.collaterals}
          />
        </div>
        <Separator />
        <div tw="py-10 px-5">
          <div tw="font-bold mb-3">매물 기본정보</div>
          <Table>
            <Table.Body>
              <Table.Row>
                <Table.Head>매물번호</Table.Head>
                <Table.Data>{listingDetail?.listing?.trade_id}</Table.Data>
              </Table.Row>
              <Table.Row>
                <Table.Head>부동산 종류</Table.Head>
                <Table.Data>{RealestateTypeString[listingDetail?.listing?.realestate_type ?? 0]}</Table.Data>
              </Table.Row>
              <Table.Row>
                <Table.Head>면적</Table.Head>
                <Table.Data>
                  공급 {listingDetail?.listing?.gonggeup_area}㎡ / 전용 {listingDetail?.listing?.jeonyong_area}㎡
                </Table.Data>
              </Table.Row>
              <Table.Row>
                <Table.Head>방향</Table.Head>
                <Table.Data>
                  {listingDetail?.listing.direction} <span tw="text-info text-gray-700">거실기준</span>
                </Table.Data>
              </Table.Row>
              <Table.Row>
                <Table.Head>복층여부</Table.Head>
                <Table.Data>{listingDetail?.listing?.storey}</Table.Data>
              </Table.Row>
            </Table.Body>
            {infoSectionExpanded && (
              <Table.Body>
                <Table.Row>
                  <Table.Head>방 / 욕실</Table.Head>
                  <Table.Data>
                    {falsy(listingDetail?.listing.room_count, '-')}개 /{' '}
                    {falsy(listingDetail?.listing.bathroom_count, '-')}개
                  </Table.Data>
                </Table.Row>
                <Table.Row>
                  <Table.Head>해당 층 / 총 층</Table.Head>
                  <Table.Data>
                    {falsy(listingDetail?.listing.floor_description, '-')} /{' '}
                    {falsy(listingDetail?.listing?.total_floor, '-')}층
                  </Table.Data>
                </Table.Row>
                {(listingDetail?.parking_per_saedae || listingDetail?.total_parking_count) && (
                  <Table.Row>
                    <Table.Head>
                      총 주차대수 <br />/ 세대당 주차대수
                    </Table.Head>
                    <Table.Data>
                      {falsy(listingDetail?.total_parking_count, '-')}대 /{' '}
                      {falsy(listingDetail?.parking_per_saedae, '-')}대
                    </Table.Data>
                  </Table.Row>
                )}
                <Table.Row>
                  <Table.Head>고정관리비</Table.Head>
                  <Table.Data>
                    {listingDetail?.listing?.administrative_fee ? (
                      <Numeral>{listingDetail?.listing?.administrative_fee}</Numeral>
                    ) : (
                      '없음'
                    )}
                  </Table.Data>
                </Table.Row>
              </Table.Body>
            )}
          </Table>
          <Button variant="outlined" tw="w-full mt-3" onClick={() => setInfoSectionExpanded((prev) => !prev)}>
            {infoSectionExpanded ? '접기' : '더보기'}
          </Button>
        </div>
        {(listingDetail?.listing?.veranda_extended || listingDetail?.listing.veranda_remodelling) && (
          <div>
            <Separator />
            <div tw="py-10 px-5">
              <div tw="font-bold mb-3">매물 상세정보</div>
              <Table>
                <Table.Body>
                  {listingDetail?.listing?.veranda_extended && (
                    <Table.Row>
                      <Table.Head>
                        베란다
                        <br />
                        확장 여부
                      </Table.Head>
                      <Table.Data>확장</Table.Data>
                    </Table.Row>
                  )}
                  {listingDetail?.listing?.veranda_remodelling && (
                    <Table.Row>
                      <Table.Head>올수리 여부</Table.Head>
                      <Table.Data>2년 내 올수리</Table.Data>
                    </Table.Row>
                  )}
                </Table.Body>
              </Table>
            </div>
          </div>
        )}
        {listingDetail?.listing?.buy_or_rent === BuyOrRent.Buy && (
          <div>
            <Separator />
            <div tw="py-10 px-5">
              <div tw="font-bold mb-3">관련 규제 정보</div>
              <Table>
                <Table.Body>
                  <Table.Row>
                    <Table.Head>투기지역 여부</Table.Head>
                    <Table.Data>{falsy(listingDetail?.listing?.toogi_region, '해당없음')}</Table.Data>
                  </Table.Row>
                  <Table.Row>
                    <Table.Head>
                      토지거래 허가
                      <br />
                      구역 여부
                    </Table.Head>
                    <Table.Data>{listingDetail?.listing?.toji_trade_eligible ? '허가구역' : '해당없음'}</Table.Data>
                  </Table.Row>
                </Table.Body>
              </Table>
            </div>
          </div>
        )}
        {listingDetail?.listing?.description && (
          <div>
            <Separator />
            <div tw="py-10 px-5">
              <div tw="font-bold mb-3">특이사항</div>
              <div tw="whitespace-pre-wrap break-all text-b2">{listingDetail?.listing?.description}</div>
            </div>
          </div>
        )}
        <Separator />
        <div tw="py-10 px-5">
          <ListingDetailSection.Agent agent={listingDetail?.agent_summary} />
        </div>
        <Separator />
        <div tw="py-10 px-5">
          <ListingDetailSection.Qna onClickCreateQna={onNavigateToCreateQna} />
        </div>
      </div>
      {!isTopCtaButtonsVisible && (
        <PersistentBottomBar>
          <ListingCtaButtons
            visitUserType={listingDetail?.visit_user_type ?? 0}
            buttonSize="bigger"
            onNavigateToParticipateBidding={onNavigateToParticipateBidding}
            onNavigateToUpdateBidding={onNavigateToUpdateBidding}
            onNavigateToChatRoom={onNavigateToChatRoom}
          />
        </PersistentBottomBar>
      )}
    </div>
  );
}
