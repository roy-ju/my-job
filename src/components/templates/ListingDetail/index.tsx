import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import tw, { styled } from 'twin.macro';

import Container from '@/components/atoms/Container';

import RelativeFlexContents from '@/components/atoms/RelativeFlexContents';

import { PersistentBottomBar, Separator } from '@/components/atoms';

import { DanjiDetailSection, PhotoHero } from '@/components/organisms';

import useDanjiInteraction from '@/states/hooks/useDanjiInteraction';

import useScroll from '@/hooks/useScroll';

import useIsomorphicLayoutEffect from '@/hooks/useIsomorphicLayoutEffect';

import { useRouter } from '@/hooks/utils';

import { DefaultListingImageLg } from '@/constants/strings';

import { RealestateType, VisitUserType } from '@/constants/enums';

import { useFetchDanjiDetail } from '@/services/danji/useFetchDanjiDetail';

import { ListingDetailResponse, ListingRealestateDocumenSummarytResponse } from '@/services/listing/types';

import { QnaListResponse } from '@/services/qna/types';

import Routes from '@/router/routes';

import ListingDetailHeader from '@/components/domains/listings/detail/ListingDetailHeader';

import ListingDetailTabs from '@/components/domains/listings/detail/ListingDetailTabs';

import ListingBasicInfo from '@/components/domains/listings/detail/ListingBasicInfo';

import ListingDetailInfo from '@/components/domains/listings/detail/ListingDetailInfo';

import ListingDetailSummary from '@/components/domains/listings/detail/ListingDetailSummary';

import ListingDetailBiddings from '@/components/domains/listings/detail/ListingDetailBiddings';

import ListingDetailConditions from '@/components/domains/listings/detail/ListingDetailConditions';

import ListingsAllViewButton from '@/components/domains/listings/detail/ListingsAllViewButton';

import ListingUserStatus from '@/components/domains/listings/detail/ListingUserStatus';

import ListingRealestateDocument from '@/components/domains/listings/detail/ListingRealestateDocument';

import ListingDetailAgent from '@/components/domains/listings/detail/ListingDetailAgent';

import ListingDetailQna from '@/components/domains/listings/detail/ListingDetailQna';

import ListingDetailFaqs from '@/components/domains/listings/detail/ListingDetailFaqs';

import ListingDetailCtaButtons from '@/components/domains/listings/detail/ListingDetailCtaButtons';

import Summary from '@/components/domains/danji/detail/summary';

import BasicInfoPc from '@/components/domains/danji/detail/basic-info-pc';

import DanjiRealpriceContainer from '../DanjiDetail/Components/DanjiRealpriceContainer';

const SectionContainer = styled.div``;

const StyledSperator = styled(Separator)`
  ${tw`w-full [min-height: 8px]`}
`;

export interface ListingDetailProps {
  depth?: number;
  listingDetail?: ListingDetailResponse | null;
  qnaList?: QnaListResponse['list'];
  hasMoreQnas?: boolean;
  realestateDocumentData?: ListingRealestateDocumenSummarytResponse;

  onClickBack?: () => void;
  onClickShare?: () => void;
  onClickMoreItem?: (index: number, buttonTitle: string) => void;
  onClickFavorite?: () => void;
  onClickLoadMoreQna?: () => void;
  onClickDeleteQna?: (id: number) => void;
  onClickSuggestAcceptRecommend?: () => void;
  onClickSuggestNotInterested?: () => void;

  onNavigateToParticipateBidding?: () => void;
  onNavigateToUpdateTargetPrice?: () => void;
  onNavigateToUpdateBidding?: () => void;
  onNavigateToChatRoom?: () => void;
  onNavigateToCreateQna?: () => void;
  onNavigateToPhotoGallery?: () => void;
  onNavigateToSuggestForm?: () => void;
  onNavigateToListingDetailHistory?: () => void;
}

export default function ListingDetail({
  depth = 0,
  listingDetail,
  qnaList,
  hasMoreQnas,
  realestateDocumentData,

  onClickBack,
  onClickShare,
  onClickMoreItem,
  onClickFavorite,
  onClickLoadMoreQna,
  onClickDeleteQna,
  onClickSuggestAcceptRecommend,
  onClickSuggestNotInterested,

  onNavigateToParticipateBidding,
  onNavigateToUpdateTargetPrice,
  onNavigateToUpdateBidding,
  onNavigateToChatRoom,
  onNavigateToCreateQna,
  onNavigateToPhotoGallery,
  onNavigateToSuggestForm,
  onNavigateToListingDetailHistory,
}: ListingDetailProps) {
  const router = useRouter(depth);

  const { data: danji } = useFetchDanjiDetail({
    danjiID: listingDetail?.listing?.danji_id ? listingDetail.listing.danji_id : null,
  });

  const interactStore = useDanjiInteraction({ danjiData: danji });

  const scrollContainer = useRef<HTMLDivElement | null>(null);
  const [userStatusAccordion, setUserStatusAccordion] = useState<HTMLDivElement | null>(null);

  const [isHeaderActive, setIsHeaderActive] = useState(false);
  const [isTopCtaButtonsVisible, setIsTopCtaButtonsVisible] = useState(true);

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
    <Container tw="relative">
      <ListingDetailHeader
        listingDetail={listingDetail}
        isHeaderActive={isHeaderActive}
        onClickBack={onClickBack}
        onClickShare={onClickShare}
        onClickFavorite={onClickFavorite}
        onClickMoreItem={onClickMoreItem}
      />
      <RelativeFlexContents ref={scrollContainer} id="scroll-container">
        <PhotoHero
          onClickViewPhotos={onNavigateToPhotoGallery}
          defaultPhotoPath={DefaultListingImageLg[listingDetail?.listing?.realestate_type ?? 0]}
          photoPaths={photoPaths}
        />
        <ListingDetailTabs listingDetail={listingDetail} tabIndex={tabIndex} handleTabItemClick={handleTabItemClick} />
        <ListingDetailSummary listingDetail={listingDetail} />
        <ListingUserStatus
          listingDetail={listingDetail}
          onNavigateToParticipateBidding={onNavigateToParticipateBidding}
          onNavigateToUpdateBidding={onNavigateToUpdateBidding}
          onNavigateToUpdateTargetPrice={onNavigateToUpdateTargetPrice}
          onNavigateToChatRoom={onNavigateToChatRoom}
          onClickSuggestAcceptRecommend={onClickSuggestAcceptRecommend}
          onClickSuggestNotInterested={onClickSuggestNotInterested}
          onNavigateToSuggestForm={onNavigateToSuggestForm}
          onNavigateToListingDetailHistory={onNavigateToListingDetailHistory}
          setUserStatusAccordion={setUserStatusAccordion}
        />
        <StyledSperator />
        <SectionContainer id="listingInfoSection" ref={setListingInfoSection}>
          <ListingDetailBiddings listingDetail={listingDetail} />
          <StyledSperator />
          <ListingDetailConditions listingDetail={listingDetail} />
          <StyledSperator />
          <ListingBasicInfo listingDetail={listingDetail} />
          <ListingDetailInfo listingDetail={listingDetail} />
          <ListingRealestateDocument realestateDocumentData={realestateDocumentData} />
        </SectionContainer>
        <StyledSperator />
        {danji && !danji.error_code && (
          <SectionContainer id="danjiSection" ref={setDanjiSection}>
            <DanjiDetailSection>
              {isShowlistingsSection && (
                <SectionContainer tw="pt-6" id="negocio-danjidetail-bi" ref={basicContainerRef}>
                  <Summary danji={danji} isListingDetailPage />
                  <ListingsAllViewButton danji={danji} />
                </SectionContainer>
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
              <SectionContainer id="negocio-danjidetail-bid" ref={basicDetailContainerRef}>
                <StyledSperator />
                <BasicInfoPc danji={danji} />
              </SectionContainer>
              <SectionContainer id="negocio-danjidetail-sc" ref={danjiSchoolContainerRef}>
                <StyledSperator />
                <DanjiDetailSection.SchoolInfo danji={danji} />
                <StyledSperator />
                <DanjiDetailSection.AroundInfo danji={danji} />
                <StyledSperator />
              </SectionContainer>
            </DanjiDetailSection>
          </SectionContainer>
        )}
        <SectionContainer id="qnaSection" ref={setQnaSection}>
          <ListingDetailAgent agent={listingDetail?.agent_summary} />
          <StyledSperator />
          <ListingDetailQna
            isOwner={listingDetail?.visit_user_type === VisitUserType.SellerGeneral}
            hasNext={hasMoreQnas}
            qnaList={qnaList}
            onClickCreateQna={onNavigateToCreateQna}
            onClickNext={onClickLoadMoreQna}
            onClickDeleteQna={onClickDeleteQna}
          />
          <StyledSperator />
          <ListingDetailFaqs />
        </SectionContainer>
      </RelativeFlexContents>
      {!isTopCtaButtonsVisible && (
        <PersistentBottomBar>
          <ListingDetailCtaButtons
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
    </Container>
  );
}
