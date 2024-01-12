import { GetListingDetailResponse } from '@/apis/listing/getListingDetail';
import { Numeral, PersistentBottomBar, Separator } from '@/components/atoms';
import { Accordion, NavigationHeader, Table, Tabs } from '@/components/molecules';
import { DanjiDetailSection, ListingCtaButtons, ListingDetailSection, PhotoHero } from '@/components/organisms';
import HeartFilledIcon from '@/assets/icons/heart.svg';
import HeartOutlinedIcon from '@/assets/icons/heart_outlined.svg';
import ShareIcon from '@/assets/icons/share.svg';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useIsomorphicLayoutEffect, useRouter, useScroll } from '@/hooks/utils';
import tw from 'twin.macro';
import { DefaultListingImageLg, RealestateTypeString } from '@/constants/strings';
import falsy from '@/utils/falsy';
import { BuyOrRent, RealestateType, VisitUserType } from '@/constants/enums';
import { GetListingQnaListResponse } from '@/apis/listing/getListingQnaList';
import useDanjiDetail from '@/components/pages/pc/DanjiDetail/useDanjiDetail';
import Routes from '@/router/routes';
import { GetRealestateDocumentResponse } from '@/apis/listing/getRealestateDocument';
import useDanjiInteraction from '@/states/danjiButton';
import UserStatusStrings from './strings';
import DanjiRealpriceContainer from '../DanjiDetail/Components/DanjiRealpriceContainer';

export interface ListingDetailProps {
  depth?: number;
  listingDetail?: GetListingDetailResponse | null;
  qnaList?: GetListingQnaListResponse['list'];
  hasMoreQnas?: boolean;

  realestateDocumentData?: GetRealestateDocumentResponse;

  isLoadingQna?: boolean;
  isLoading?: boolean;

  onClickMoreItem?: (index: number, buttonTitle: string) => void;
  onClickFavorite?: () => void;
  onNavigateToCreateQna?: () => void;
  onNavigateToPhotoGallery?: () => void;
  onClickLoadMoreQna?: () => void;
  onClickDeleteQna?: (id: number) => void;

  onNavigateToParticipateBidding?: () => void;
  onNavigateToUpdateBidding?: () => void;
  onNavigateToChatRoom?: () => void;
  onNavigateToSuggestForm?: () => void;
  onNavigateToUpdateTargetPrice?: () => void;
  onNavigateToListingDetailHistory?: () => void;
  onClickSuggestNotInterested?: () => void;
  onClickSuggestAcceptRecommend?: () => void;
  onClickShare?: () => void;
  onClickBack?: () => void;
}

export default function ListingDetail({
  depth = 0,
  listingDetail,
  qnaList,
  hasMoreQnas,
  realestateDocumentData,
  onClickMoreItem,
  onClickFavorite,
  onClickLoadMoreQna,
  onClickDeleteQna,
  onClickSuggestAcceptRecommend,
  onClickSuggestNotInterested,
  onNavigateToParticipateBidding,
  onNavigateToUpdateBidding,
  onNavigateToUpdateTargetPrice,
  onNavigateToChatRoom,
  onNavigateToCreateQna,
  onNavigateToPhotoGallery,
  onNavigateToSuggestForm,
  onNavigateToListingDetailHistory,
  onClickShare,
  onClickBack,
}: ListingDetailProps) {
  const router = useRouter(depth);

  const { danji } = useDanjiDetail(depth, listingDetail?.listing?.danji_id);

  const interactStore = useDanjiInteraction({ danjiData: danji });

  const scrollContainer = useRef<HTMLDivElement | null>(null);
  const [userStatusAccordion, setUserStatusAccordion] = useState<HTMLDivElement | null>(null);

  const [isHeaderActive, setIsHeaderActive] = useState(false);
  const [isTopCtaButtonsVisible, setIsTopCtaButtonsVisible] = useState(true);

  // const [infoSectionExpanded, setInfoSectionExpanded] = useState(false);

  const photoPaths = useMemo(() => {
    if (
      listingDetail?.listing?.realestate_type === RealestateType.Apartment ||
      listingDetail?.listing?.realestate_type === RealestateType.Officetel
    ) {
      return [
        ...(listingDetail?.photos?.map((item) => item.full_file_path) ?? []),
        ...(listingDetail?.danji_photos?.map((item) => item.full_file_path) ?? []),
      ];
    }

    return [...(listingDetail?.photos?.map((item) => item.full_file_path) ?? [])];
  }, [listingDetail?.listing?.realestate_type, listingDetail?.photos, listingDetail?.danji_photos]);

  const basicContainerRef = useRef<HTMLDivElement | null>(null);
  const realPriceContainerRef = useRef<HTMLDivElement | null>(null);
  const basicDetailContainerRef = useRef<HTMLDivElement | null>(null);
  const danjiSchoolContainerRef = useRef<HTMLDivElement | null>(null);

  const [listingInfoSection, setListingInfoSection] = useState<HTMLDivElement | null>(null);
  const [danjiSection, setDanjiSection] = useState<HTMLDivElement | null>(null);
  const [qnaSection, setQnaSection] = useState<HTMLDivElement | null>(null);

  const [tabIndex, setTabIndex] = useState(0);
  const [visibleState, setVisibleState] = useState<Record<string, number>>({
    listingInfoSection: 0,
    danjiSection: 0,
    qnaSection: 0,
  });

  const [isShowRpTab, setIsShowRpTab] = useState(false);

  const isListingRegisteredBeforeMarch22nd2023 = useMemo(() => {
    const targetDate = new Date('2023-03-22T00:00:00+09:00');
    const dateTimeString = listingDetail?.listing?.created_time;

    if (!dateTimeString) {
      return false;
    }

    const dateTime = new Date(dateTimeString);
    return dateTime < targetDate;
  }, [listingDetail?.listing?.created_time]);

  const commonOptions = isListingRegisteredBeforeMarch22nd2023 ? ['신고하기', '중개약정확인'] : ['신고하기'];

  const sellerOptions = isListingRegisteredBeforeMarch22nd2023
    ? ['신고하기', '매물관리', '중개약정확인']
    : ['신고하기', '매물관리'];

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

  const etcOptions = useMemo(() => {
    if (listingDetail?.options?.length) return listingDetail?.options?.map((item) => item.name).join(',');
    return '';
  }, [listingDetail?.options]);

  const handleTabItemClick = useCallback(
    (i: number) => {
      if (i === 0) {
        scrollContainer.current?.scrollBy({
          top: (listingInfoSection?.getBoundingClientRect().top ?? 0) - 96,
          behavior: 'smooth',
        });
      }
      if (i === 1) {
        scrollContainer.current?.scrollBy({
          top: (danjiSection?.getBoundingClientRect().top ?? 0) - 96,
          behavior: 'smooth',
        });
      }
      if (i === 2) {
        scrollContainer.current?.scrollBy({
          top: (qnaSection?.getBoundingClientRect().top ?? 0) - 96,
          behavior: 'smooth',
        });
      }
    },
    [listingInfoSection, danjiSection, qnaSection],
  );

  useScroll(scrollContainer, ({ scrollY }) => {
    setIsHeaderActive(scrollY > 0);
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

  useIsomorphicLayoutEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setVisibleState((prev) => ({ ...prev, [entry.target.id]: entry.intersectionRatio }));
        });
      },
      { rootMargin: '96px 0px 100px 0px', threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1] },
    );

    if (listingInfoSection) {
      observer.observe(listingInfoSection);
    }

    if (danjiSection) {
      observer.observe(danjiSection);
    }

    if (qnaSection) {
      observer.observe(qnaSection);
    }

    return () => {
      observer.disconnect();
    };
  }, [listingInfoSection, danjiSection, qnaSection]);

  useEffect(() => {
    const sectionName = Object.keys(visibleState).reduce((a, b) => (visibleState[a] > visibleState[b] ? a : b));

    if (visibleState[sectionName] === 0) return;

    if (sectionName === 'listingInfoSection') {
      setTabIndex(0);
    } else if (sectionName === 'danjiSection') {
      setTabIndex(1);
    } else if (sectionName === 'qnaSection') {
      setTabIndex(2);
    }
  }, [visibleState]);

  const isShowlistingsSection = useMemo(() => router.query.depth1 !== Routes.DanjiListings, [router.query]);

  useIsomorphicLayoutEffect(
    () => () => {
      interactStore.makeDataReset();
    },
    [],
  );

  return (
    <div tw="relative flex flex-col h-full">
      <NavigationHeader
        css={[
          tw`absolute top-0 left-0 z-50 w-full text-white transition-colors bg-transparent`,
          isHeaderActive && tw`bg-white text-gray-1000`,
        ]}
      >
        {onClickBack && <NavigationHeader.BackButton onClick={onClickBack} />}
        <NavigationHeader.Title tw="text-inherit">
          <h1>{listingDetail?.listing?.listing_title}</h1>
        </NavigationHeader.Title>
        <div tw="flex gap-4">
          <NavigationHeader.Button onClick={onClickShare}>
            <ShareIcon tw="text-inherit" />
          </NavigationHeader.Button>
          <NavigationHeader.Button onClick={onClickFavorite}>
            {listingDetail?.is_favorite ? <HeartFilledIcon tw="text-red" /> : <HeartOutlinedIcon tw="text-inherit" />}
          </NavigationHeader.Button>
          <NavigationHeader.MoreButton
            iconColor={isHeaderActive ? 'dark' : 'light'}
            onClickItem={onClickMoreItem}
            items={listingDetail?.visit_user_type === VisitUserType.SellerGeneral ? sellerOptions : commonOptions}
          />
        </div>
      </NavigationHeader>
      <div tw="flex-1 min-h-0 overflow-auto" ref={scrollContainer} id="scroll-container">
        <PhotoHero
          onClickViewPhotos={onNavigateToPhotoGallery}
          defaultPhotoPath={DefaultListingImageLg[listingDetail?.listing?.realestate_type ?? 0]}
          photoPaths={photoPaths}
        />
        <div tw="sticky top-12 pt-2 z-40">
          <Tabs value={tabIndex} onChange={handleTabItemClick}>
            <Tabs.Tab value={0}>
              <h2 tw="text-b2">거래정보</h2>
            </Tabs.Tab>
            {danji && !danji.error_code && (
              <Tabs.Tab value={1}>
                <h2 tw="text-b2">단지정보</h2>
              </Tabs.Tab>
            )}
            <Tabs.Tab value={2}>
              <h2 tw="text-b2">Q&A</h2>
            </Tabs.Tab>
            <Tabs.Indicator />
          </Tabs>
        </div>
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
                <h2 tw="text-left">{UserStatusStrings[listingDetail?.visit_user_type ?? 0]?.title}</h2>
              </Accordion.Summary>
              <Accordion.Details tw="pt-1 pb-6 px-5 text-b2 text-gray-700 whitespace-pre-wrap">
                <p>{UserStatusStrings[listingDetail?.visit_user_type ?? 0]?.body}</p>
                {listingDetail?.bidding_reject_reason && (
                  <div tw="mt-5">
                    <span tw="text-nego-1000">중개사님 추가답변</span>
                    <br />
                    {listingDetail?.bidding_reject_reason}
                  </div>
                )}
                <div tw="mt-5" ref={setUserStatusAccordion}>
                  <ListingCtaButtons
                    visitUserType={listingDetail?.visit_user_type ?? 0}
                    buttonSize="big"
                    onNavigateToParticipateBidding={onNavigateToParticipateBidding}
                    onNavigateToUpdateBidding={onNavigateToUpdateBidding}
                    onNavigateToUpdateTargetPrice={onNavigateToUpdateTargetPrice}
                    onNavigateToChatRoom={onNavigateToChatRoom}
                    onClickSuggestAcceptRecommend={onClickSuggestAcceptRecommend}
                    onClickSuggestNotInterested={onClickSuggestNotInterested}
                    onNavigateToSuggestForm={onNavigateToSuggestForm}
                    onNavigateToListingDetailHistory={onNavigateToListingDetailHistory}
                  />
                </div>
              </Accordion.Details>
            </Accordion>
          </div>
        )}
        <Separator />
        <div id="listingInfoSection" ref={setListingInfoSection}>
          <div tw="px-5 pt-6 pb-10">
            <ListingDetailSection.Biddings
              isOwner={listingDetail?.is_owner ?? false}
              biddingsChatRoomCreated={biddingsChatRoomCreated}
              biddingsChatRoomNotCreated={biddingsChatRoomNotCreated}
              isMonthlyRent={listingDetail?.listing?.buy_or_rent === BuyOrRent.Wolsae}
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
            <div tw="font-bold mb-3">
              <h2>매물 기본정보</h2>
            </div>
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
                    {listingDetail?.listing?.direction} <span tw="text-info text-gray-700">거실기준</span>
                  </Table.Data>
                </Table.Row>
                <Table.Row>
                  <Table.Head>복층여부</Table.Head>
                  <Table.Data>{listingDetail?.listing?.storey}</Table.Data>
                </Table.Row>
              </Table.Body>
              <Table.Body>
                <Table.Row>
                  <Table.Head>방 / 욕실</Table.Head>
                  <Table.Data>
                    {falsy(listingDetail?.listing?.room_count, '-')}개 /{' '}
                    {falsy(listingDetail?.listing?.bathroom_count, '-')}개
                  </Table.Data>
                </Table.Row>
                <Table.Row>
                  <Table.Head>해당 층 / 총 층</Table.Head>
                  <Table.Data>
                    {falsy(listingDetail?.listing?.floor_description, '-')} /{' '}
                    {falsy(listingDetail?.listing?.total_floor, '-')}층
                  </Table.Data>
                </Table.Row>
                {(listingDetail?.parking_per_saedae || listingDetail?.total_parking_count) && (
                  <Table.Row>
                    <Table.Head>총 / 세대당 주차대수</Table.Head>
                    <Table.Data>
                      {falsy(listingDetail?.total_parking_count, '-')}대 /{' '}
                      {falsy(listingDetail?.parking_per_saedae, '-')}대
                    </Table.Data>
                  </Table.Row>
                )}
                <Table.Row>
                  <Table.Head>관리비</Table.Head>
                  <Table.Data>
                    {listingDetail?.listing?.administrative_fee ? (
                      <>
                        <Numeral koreanNumber thousandsSeparated>
                          {listingDetail?.listing?.administrative_fee}
                        </Numeral>{' '}
                        원
                      </>
                    ) : (
                      '0 원'
                    )}
                  </Table.Data>
                </Table.Row>
              </Table.Body>
            </Table>
          </div>
          {(listingDetail?.listing?.veranda_extended || listingDetail?.listing?.veranda_remodelling || etcOptions) && (
            <div>
              <Separator />
              <div tw="py-10 px-5">
                <div tw="font-bold mb-3">
                  <h2>매물 상세정보</h2>
                </div>
                <Table>
                  <Table.Body>
                    <Table.Row>
                      <Table.Head>
                        베란다
                        <br />
                        확장 여부
                      </Table.Head>
                      <Table.Data>{listingDetail?.listing?.veranda_extended ? '확장' : '해당없음'}</Table.Data>
                    </Table.Row>
                    <Table.Row>
                      <Table.Head>올수리 여부</Table.Head>
                      <Table.Data>
                        {listingDetail?.listing?.veranda_remodelling ? '2년 내 올수리' : '해당없음'}
                      </Table.Data>
                    </Table.Row>
                    <Table.Row>
                      <Table.Head>기타 옵션</Table.Head>
                      <Table.Data>{etcOptions || '해당없음'}</Table.Data>
                    </Table.Row>
                  </Table.Body>
                </Table>
              </div>
            </div>
          )}
          {listingDetail?.listing?.buy_or_rent === BuyOrRent.Buy && (
            <div>
              <Separator />
              <div tw="py-10 px-5">
                <div tw="font-bold mb-3">
                  <h2>관련 규제 정보</h2>
                </div>
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
                <div tw="font-bold mb-3">
                  <h5>특이사항</h5>
                </div>
                <div tw="whitespace-pre-wrap break-all text-b2">{listingDetail?.listing?.description}</div>
              </div>
            </div>
          )}
          {realestateDocumentData && realestateDocumentData.created_time && (
            <div>
              <Separator />
              <div tw="py-10 px-5">
                <ListingDetailSection.RealestateDocument data={realestateDocumentData} />
              </div>
            </div>
          )}
        </div>
        <Separator />

        {danji && !danji.error_code && (
          <div id="danjiSection" ref={setDanjiSection}>
            <DanjiDetailSection>
              {isShowlistingsSection && (
                <div tw="pt-6" id="negocio-danjidetail-bi" ref={basicContainerRef}>
                  <DanjiDetailSection.Info danji={danji} depth={depth} isListingDetail />
                  <DanjiDetailSection.ActiveInfo danji={danji} depth={depth} isListingDetail />
                </div>
              )}

              <DanjiRealpriceContainer
                ref={realPriceContainerRef}
                danji={danji}
                depth={depth}
                isShowRpTab={isShowRpTab}
                isShowlistingsSection={isShowlistingsSection}
                setLoadingRp={() => {}}
                setIsShowRpTab={setIsShowRpTab}
              />

              <div id="negocio-danjidetail-bid" ref={basicDetailContainerRef}>
                <Separator tw="w-full [min-height: 8px]" />
                <DanjiDetailSection.DetailInfo danji={danji} />
              </div>

              <div id="negocio-danjidetail-sc" ref={danjiSchoolContainerRef}>
                <Separator tw="w-full [min-height: 8px]" />
                <DanjiDetailSection.SchoolInfo danji={danji} />
                <Separator tw="w-full [min-height: 8px]" />
                <DanjiDetailSection.AroundInfo danji={danji} />
                <Separator tw="w-full [min-height: 8px]" />
              </div>
            </DanjiDetailSection>
          </div>
        )}

        <div id="qnaSection" ref={setQnaSection}>
          <div tw="py-10 px-5">
            <ListingDetailSection.Agent agent={listingDetail?.agent_summary} />
          </div>
          <Separator />
          <div tw="py-10 px-5">
            <ListingDetailSection.Qna
              isOwner={listingDetail?.visit_user_type === VisitUserType.SellerGeneral}
              hasNext={hasMoreQnas}
              qnaList={qnaList}
              onClickCreateQna={onNavigateToCreateQna}
              onClickNext={onClickLoadMoreQna}
              onClickDeleteQna={onClickDeleteQna}
            />
          </div>
          <Separator />
          <div tw="py-10 px-5">
            <ListingDetailSection.Faq />
          </div>
        </div>
      </div>
      {!isTopCtaButtonsVisible && (
        <PersistentBottomBar>
          <ListingCtaButtons
            visitUserType={listingDetail?.visit_user_type ?? 0}
            buttonSize="bigger"
            onNavigateToParticipateBidding={onNavigateToParticipateBidding}
            onNavigateToUpdateBidding={onNavigateToUpdateBidding}
            onNavigateToUpdateTargetPrice={onNavigateToUpdateTargetPrice}
            onNavigateToChatRoom={onNavigateToChatRoom}
            onClickSuggestAcceptRecommend={onClickSuggestAcceptRecommend}
            onClickSuggestNotInterested={onClickSuggestNotInterested}
            onNavigateToSuggestForm={onNavigateToSuggestForm}
          />
        </PersistentBottomBar>
      )}
    </div>
  );
}
