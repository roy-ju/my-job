/**
 * PC에서 사용되는 라우터
 * Mobile에서는 src/pages 디렉토리를 사용한다.
 */

import { Panel } from '@/components/atoms';

import dynamic from 'next/dynamic';

import { ParsedUrlQuery } from 'querystring';

import Head from 'next/head';

import AppConfig from '@/config';

import {
  DanjiDetailResponse,
  DanjiPhotosResponse,
  DanjiListingListResponse,
  DanjiSuggestListResponse,
  NaverDanjiResponse,
  DanjiSchoolsResponse,
} from '@/services/danji/types';

import Routes from './routes';

function FallbackComponent() {
  return <Panel />;
}

const MapListingList = dynamic(() => import('@/components/pages/pc/MapListingList'), {
  ssr: false,
  loading: FallbackComponent,
});
const My = dynamic(() => import('@/components/pages/My/MyPc'), { ssr: false, loading: FallbackComponent });
const MyDetail = dynamic(() => import('@/components/pages/MyDetail/MyDetailPc'), {
  ssr: false,
  loading: FallbackComponent,
});
const MyRealPriceList = dynamic(() => import('@/components/pages/MyRealpriceList/MyRealpriceListPc'), {
  ssr: false,
  loading: FallbackComponent,
});
const MyFavoriteList = dynamic(() => import('@/components/pages/MyFavoriteList/MyFavoriteListPc'), {
  ssr: false,
  loading: FallbackComponent,
});
const MySuggestDetail = dynamic(() => import('@/components/pages/MySuggestDetail/MySuggestDetailPc'), {
  ssr: false,
  loading: FallbackComponent,
});
const MyRegisteredListings = dynamic(() => import('@/components/pages/MyRegisteredListings/MyRegisteredListingsPc'), {
  ssr: false,
  loading: FallbackComponent,
});
// 추후 리팩토링
const MyParticipatingListings = dynamic(() => import('@/components/pages/pc/MyParticipatingListings'), {
  ssr: false,
  loading: FallbackComponent,
});
const MyAddress = dynamic(() => import('@/components/pages/MyAddress/MyAddressPc'), {
  ssr: false,
  loading: FallbackComponent,
});
const MyAddressDetail = dynamic(() => import('@/components/pages/MyAddressDetail/MyAddressDetailPc'), {
  ssr: false,
  loading: FallbackComponent,
});
const MyAddressDetailVerifying = dynamic(() => import('@/components/pages/MyAddressVerifying/MyAddressVerifyingPc'), {
  ssr: false,
  loading: FallbackComponent,
});
const MyAddressVerifyResult = dynamic(
  () => import('@/components/pages/MyAddressVerifyResult/MyAddressVerifyResultPc'),
  {
    ssr: false,
    loading: FallbackComponent,
  },
);
const MyAddressAgreement = dynamic(() => import('@/components/pages/MyAddressAgreement/MyAddressAgreementPc'), {
  ssr: false,
  loading: FallbackComponent,
});
const MyRegisteredHomes = dynamic(() => import('@/components/pages/MyRegisteredHomes/MyRegisteredHomesPc'), {
  ssr: false,
  loading: FallbackComponent,
});
const Register = dynamic(() => import('@/components/pages/Register/RegisterPc'), {
  ssr: false,
  loading: FallbackComponent,
});
const RegisterSuccess = dynamic(() => import('@/components/pages/RegisterSuccess/RegisterSuccessPc'), {
  ssr: false,
  loading: FallbackComponent,
});
const VerifyCi = dynamic(() => import('@/components/pages/VerifyCi/VerifyCiPc'), {
  ssr: false,
  loading: FallbackComponent,
});
const Reactivate = dynamic(() => import('@/components/pages/ReActivate/ReActivatePc'), {
  ssr: false,
  loading: FallbackComponent,
});
const UpdatePhone = dynamic(() => import('@/components/pages/UpdatePhone/UpdatePhonePc'), {
  ssr: false,
  loading: FallbackComponent,
});
const FindAccount = dynamic(() => import('@/components/pages/FindAccount/FindAccountPc'), {
  ssr: false,
  loading: FallbackComponent,
});
const Deregister = dynamic(() => import('@/components/pages/Deregister/DeregisterPc'), {
  ssr: false,
  loading: FallbackComponent,
});
const ListingDetail = dynamic(() => import('@/components/pages/pc/ListingDetail'), {
  ssr: false,
  loading: FallbackComponent,
});
const ListingDetailPassed = dynamic(() => import('@/components/pages/ListingDetailPassed/ListingDetailPassedPc'), {
  ssr: false,
  loading: FallbackComponent,
});
const ListingDetailHistory = dynamic(() => import('@/components/pages/ListingDetailHistory/ListingDetailHistoryPc'), {
  ssr: false,
  loading: FallbackComponent,
});
const Notifications = dynamic(() => import('@/components/pages/Notifications/NotificationsPc'), {
  ssr: false,
  loading: FallbackComponent,
});
const NotificationSettings = dynamic(() => import('@/components/pages/NotificationSettings/NotificationSettingsPc'), {
  ssr: false,
  loading: FallbackComponent,
});
const NoticeList = dynamic(() => import('@/components/pages/NoticeList/NoticeListPc'), {
  ssr: false,
  loading: FallbackComponent,
});
const NoticeDetail = dynamic(() => import('@/components/pages/NoticeDetail/NoticeDetailPc'), {
  ssr: false,
  loading: FallbackComponent,
});
const Qna = dynamic(() => import('@/components/pages/Qna/QnaPc'), {
  ssr: false,
  loading: FallbackComponent,
});
const DanjiDetail = dynamic(() => import('@/components/pages/Danji/DanjiPc'), {
  // ssr: false,
  loading: FallbackComponent,
});
const DanjiRealPriceListAll = dynamic(() => import('@/components/pages/pc/DanjiRealPriceListAll'), {
  loading: FallbackComponent,
  ssr: false,
});
const DanjiPhotos = dynamic(() => import('@/components/pages/DanjiPhotos/DanjiPhotosPc'), {
  loading: FallbackComponent,
  ssr: false,
});
const DanjiRealPriceDetail = dynamic(() => import('@/components/pages/pc/RealPriceDetail'), {
  loading: FallbackComponent,
  ssr: false,
});
const DanjiRealTradeDetail = dynamic(() => import('@/components/pages/pc/RealTradeDetail'), {
  loading: FallbackComponent,
  ssr: false,
});
const DanjiSelect = dynamic(() => import('@/components/pages/pc/DanjiSelect'), {
  loading: FallbackComponent,
  ssr: false,
});
const DanjiListings = dynamic(() => import('@/components/pages/DanjiListings/DanjiListingsPc'), {
  loading: FallbackComponent,
  ssr: false,
});
const ChatRoom = dynamic(() => import('@/components/pages/ChatRoom/ChatRoomPc'), {
  ssr: false,
  loading: FallbackComponent,
});
const ChatRoomList = dynamic(() => import('@/components/pages/ChatRoomList/ChatRoomListPc'), {
  ssr: false,
  loading: FallbackComponent,
});
const ChatRoomReport = dynamic(() => import('@/components/pages/pc/ChatRoomReport'), {
  ssr: false,
  loading: FallbackComponent,
});

const TransactionReview = dynamic(
  () => import('@/components/pages/ListingTransactionReview/ListingTransactionReviewPc'),
  {
    ssr: false,
    loading: FallbackComponent,
  },
);
const FAQ = dynamic(() => import('@/components/pages/Faq/FaqPc'), {
  ssr: false,
  loading: FallbackComponent,
});
const WaitingCreateForm = dynamic(() => import('@/components/pages/WaitingCreateForm/WaitingCreateFormPc'), {
  ssr: false,
  loading: FallbackComponent,
});

const ListingSelectAddress = dynamic(() => import('@/components/pages/ListingSelectAddress/ListingSelectAddressPc'), {
  ssr: false,
  loading: FallbackComponent,
});
const ListingCreateForm = dynamic(() => import('@/components/pages/pc/ListingCreateForm'), {
  ssr: false,
  loading: FallbackComponent,
});
const ListingCreateSummary = dynamic(() => import('@/components/pages/ListingCreateSummary/ListingCreateSummaryPc'), {
  ssr: false,
  loading: FallbackComponent,
});
const ListingCreateResult = dynamic(() => import('@/components/pages/ListingCreateResult/ListingCreateResultPc'), {
  ssr: false,
  loading: FallbackComponent,
});
const ListingPhotoGallery = dynamic(() => import('@/components/pages/pc/ListingPhotoGallery'), {
  ssr: false,
  loading: FallbackComponent,
});
const ListingTargetPriceUpdate = dynamic(
  () => import('@/components/pages/ListingTargetPriceUpdate/ListingTargetPriceUpdatePc'),
  {
    ssr: false,
    loading: FallbackComponent,
  },
);
const ListingTargetPriceUpdateSummary = dynamic(
  () => import('@/components/pages/ListingTargetPriceUpdateSummary/ListingTargetPriceUpdateSummaryPc'),
  {
    ssr: false,
    loading: FallbackComponent,
  },
);

const BiddingForm = dynamic(() => import('@/components/pages/pc/BiddingForm'), {
  ssr: false,
  loading: FallbackComponent,
});
const BiddingSummary = dynamic(() => import('@/components/pages/pc/BiddingSummary'), {
  ssr: false,
  loading: FallbackComponent,
});
const BiddingSuccess = dynamic(() => import('@/components/pages/pc/BiddingSuccess'), {
  ssr: false,
  loading: FallbackComponent,
});
const UpdateBiddingForm = dynamic(() => import('@/components/pages/pc/UpdateBiddingForm'), {
  ssr: false,
  loading: FallbackComponent,
});
const UpdateBiddingSummary = dynamic(() => import('@/components/pages/pc/UpdateBiddingSummary'), {
  ssr: false,
  loading: FallbackComponent,
});
const UpdateBiddingSuccess = dynamic(() => import('@/components/pages/pc/UpdateBiddingSuccess'), {
  ssr: false,
  loading: FallbackComponent,
});

const ListingQnaCreateForm = dynamic(() => import('@/components/pages/ListingQnaCreate/ListingQnaCreatePc'), {
  ssr: false,
  loading: FallbackComponent,
});
const ListingManage = dynamic(() => import('@/components/pages/pc/ListingManage'), {
  ssr: false,
  loading: FallbackComponent,
});
const ListingReport = dynamic(() => import('@/components/pages/pc/ListingReport'), {
  ssr: false,
  loading: FallbackComponent,
});
const SuggestGuide = dynamic(() => import('@/components/pages/SuggestGuide/SuggestGuidePc'), {
  ssr: false,
  loading: FallbackComponent,
});
const SuggestForm = dynamic(() => import('@/components/pages/SuggestForm/SuggestFormPc'), {
  ssr: false,
  loading: FallbackComponent,
});
const SuggestFormUpdate = dynamic(() => import('@/components/pages/SuggestFormUpdate/SuggestFormUpdatePc'), {
  ssr: false,
  loading: FallbackComponent,
});
const SuggestRequestedList = dynamic(() => import('@/components/pages/SuggestRequestedList/SuggestRequestedListPc'), {
  ssr: false,
  loading: FallbackComponent,
});
const SuggestDetail = dynamic(() => import('@/components/pages/SuggestDetail/SuggestDetailPc'), {
  ssr: false,
  loading: FallbackComponent,
});
const SuggestListings = dynamic(() => import('@/components/pages/SuggestListings/SuggestListingsPc'), {
  ssr: false,
  loading: FallbackComponent,
});
const SuggestRecommendedList = dynamic(() => import('@/components/pages/pc/SuggestRecommendedList'), {
  ssr: false,
  loading: FallbackComponent,
});
const SuggestRecommendedDetail = dynamic(() => import('@/components/pages/pc/SuggestRecommendedDetail'), {
  ssr: false,
  loading: FallbackComponent,
});
const SuggestSelectAddress = dynamic(() => import('@/components/pages/pc/SuggestSelectAddress'), {
  ssr: false,
  loading: FallbackComponent,
});
const SuggestListingForm = dynamic(() => import('@/components/pages/pc/SuggestListingForm'), {
  ssr: false,
  loading: FallbackComponent,
});
const LawQna = dynamic(() => import('@/components/pages/pc/LawQna'), {
  ssr: false,
  loading: FallbackComponent,
});
const LawQnaSearch = dynamic(() => import('@/components/pages/pc/LawQnaSearch'), {
  ssr: false,
  loading: FallbackComponent,
});
const LawQnaDetail = dynamic(() => import('@/components/pages/pc/LawQnaDetail'), {
  ssr: false,
  loading: FallbackComponent,
});
const LawQnaCreate = dynamic(() => import('@/components/pages/pc/LawQnaCreate'), {
  ssr: false,
  loading: FallbackComponent,
});
const LawQnaUpdate = dynamic(() => import('@/components/pages/pc/LawQnaUpdate'), {
  ssr: false,
  loading: FallbackComponent,
});
const SubHome = dynamic(() => import('@/components/pages/SubHome/SubHomePc'), {
  ssr: false,
  loading: FallbackComponent,
});
const TradeProcess = dynamic(() => import('@/components/pages/TradeProcess/TradeProcessPc'), {
  ssr: false,
  loading: FallbackComponent,
});
const Dictionary = dynamic(() => import('@/components/pages/Dictionary/DictionaryPc'), {
  ssr: false,
  loading: FallbackComponent,
});
const DictionaryDetail = dynamic(() => import('@/components/pages/DictionaryDetail/DictionaryDetailPc'), {
  ssr: false,
  loading: FallbackComponent,
});
const CommonSense = dynamic(() => import('@/components/pages/CommonSense/CommonSensePc'), {
  ssr: false,
  loading: FallbackComponent,
});
const ListingCheckList = dynamic(() => import('@/components/pages/ListingCheckList/ListingCheckListPc'), {
  ssr: false,
  loading: FallbackComponent,
});
const SpecialTerms = dynamic(() => import('@/components/pages/SpecialTerms/SpecialTermsPc'), {
  ssr: false,
  loading: FallbackComponent,
});
const RealestateDocumentList = dynamic(
  () => import('@/components/pages/RealestateDocumentList/RealestateDocumentListPc'),
  {
    ssr: false,
    loading: FallbackComponent,
  },
);
const RealestateDocumentDetail = dynamic(
  () => import('@/components/pages/RealestateDocumentDetail/RealestateDocumentDetailPc'),
  {
    ssr: false,
    loading: FallbackComponent,
  },
);
const RealestateDocumentSearchAddress = dynamic(
  () => import('@/components/pages/RealestateDocumentSearchAddress/RealestateDocumentSearchAddressPc'),
  {
    ssr: false,
    loading: FallbackComponent,
  },
);
const RealestateDocumentAddressDetail = dynamic(
  () => import('@/components/pages/RealestateDocumentAddressDetail/RealestateDocumentAddressDetailPc'),
  {
    ssr: false,
    loading: FallbackComponent,
  },
);
const RealestateDocumentAddressVerifying = dynamic(
  () => import('@/components/pages/RealestateDocumentAddressVerifying/RealestateDocumentAddressVerifyingPc'),
  {
    ssr: false,
    loading: FallbackComponent,
  },
);
const RealestateDocumentAddressVerifyResult = dynamic(
  () => import('@/components/pages/RealestateDocumentVerifyResult/RealestateDocumentVerifyResultPc'),
  {
    ssr: false,
    loading: FallbackComponent,
  },
);
// 약관 및 정책 관련
const BusinessInfo = dynamic(() => import('@/components/pages/BusinessInfo/BusinessInfoPc'), {
  ssr: false,
  loading: FallbackComponent,
});
const ServiceInfo = dynamic(() => import('@/components/pages/ServiceInfo/ServiceInfoPc'), {
  ssr: false,
  loading: FallbackComponent,
});
const ContractTerms = dynamic(() => import('@/components/pages/ContractTerms/ContractTermsPc'), {
  ssr: false,
  loading: FallbackComponent,
});
const LocationTerms = dynamic(() => import('@/components/pages/LocationTerms/LocationTermsPc'), {
  ssr: false,
  loading: FallbackComponent,
});
const ServiceTerms = dynamic(() => import('@/components/pages/ServiceTerms/ServiceTermsPc'), {
  ssr: false,
  loading: FallbackComponent,
});
const PrivacyPolicy = dynamic(() => import('@/components/pages/PrivacyPolicy/PrivacyPolicyPc'), {
  ssr: false,
  loading: FallbackComponent,
});
const TermsAndPolicy = dynamic(() => import('@/components/pages/TermsAndPolicy/TermsAndPolicyPc'), {
  ssr: false,
  loading: FallbackComponent,
});
const Developer = dynamic(() => import('@/components/pages/Developer/DeveloperPc'), {
  ssr: false,
  loading: FallbackComponent,
});
const NotFound = dynamic(() => import('@/components/pages/NotFound'), { ssr: false, loading: FallbackComponent });

const DEFAULT_PANEL_WIDTH = '380px';

interface RouterProps {
  route: string; // url segments 에서 가장 우측에 위치한 segment
  query: ParsedUrlQuery; // 쿼리 파라미터
  depth: number; // route segment 의 depth
  ipAddress: string;
  prefetchedData?: DanjiDetailResponse;
  prefetchedPhotosData?: DanjiPhotosResponse;
  prefetchedSuggestList?: DanjiSuggestListResponse;
  prefetchedListingList?: DanjiListingListResponse;
  prefetchedNaverDanji?: NaverDanjiResponse;
  preselectedSchoolType: number;
  prefetchedDanjiSchoolData?: DanjiSchoolsResponse;
}

function Router({
  route,
  query,
  depth,
  ipAddress,
  prefetchedData,
  prefetchedPhotosData,
  prefetchedSuggestList,
  prefetchedListingList,
  prefetchedNaverDanji,
  preselectedSchoolType,
  prefetchedDanjiSchoolData,
}: RouterProps) {
  const props = {
    panelWidth: DEFAULT_PANEL_WIDTH,
    depth,
  };

  console.log(prefetchedData);

  switch (route) {
    case Routes.My: {
      return <My {...props} />;
    }
    case Routes.MyDetail: {
      return <MyDetail {...props} />;
    }
    case Routes.MyAddress: {
      return <MyAddress {...props} />;
    }
    case Routes.MyAddressDetail: {
      return <MyAddressDetail {...props} />;
    }
    case Routes.MyAddressVerifying: {
      return <MyAddressDetailVerifying {...props} />;
    }
    case Routes.MyAddressVerifyResult: {
      return <MyAddressVerifyResult {...props} />;
    }
    case Routes.MyAddressAgreement: {
      return <MyAddressAgreement {...props} />;
    }
    case Routes.MyRealPriceList: {
      return <MyRealPriceList {...props} />;
    }
    case Routes.MyFavoriteList: {
      return <MyFavoriteList {...props} />;
    }
    case Routes.MyRegisteredListingList: {
      return <MyRegisteredListings {...props} />;
    }
    case Routes.MyParticipatingListings: {
      return <MyParticipatingListings {...props} />;
    }
    case Routes.MyRegisteredHomes: {
      return <MyRegisteredHomes {...props} />;
    }
    case Routes.ListingDetailPassed: {
      return <ListingDetailPassed {...props} />;
    }
    case Routes.ListingDetailHistory: {
      return <ListingDetailHistory {...props} />;
    }
    case Routes.LawQna: {
      return <LawQna {...props} />;
    }
    case Routes.LawQnaSearch: {
      return <LawQnaSearch {...props} />;
    }
    case Routes.LawQnaDetail: {
      return <LawQnaDetail key={query.qnaID as string} qnaID={Number(query.qnaID)} ipAddress={ipAddress} {...props} />;
    }
    case Routes.LawQnaCreate: {
      return <LawQnaCreate {...props} />;
    }
    case Routes.LawQnaUpdate: {
      return <LawQnaUpdate key={query.qnaID as string} qnaID={Number(query.qnaID)} {...props} />;
    }
    case Routes.NotificationList: {
      return <Notifications {...props} />;
    }
    case Routes.NotificationSettings: {
      return <NotificationSettings {...props} />;
    }
    case Routes.NoticeList: {
      return <NoticeList {...props} />;
    }
    case Routes.NoticeDetail: {
      return <NoticeDetail {...props} />;
    }
    case Routes.TransactionReview: {
      return <TransactionReview {...props} />;
    }
    case Routes.Qna: {
      return <Qna {...props} />;
    }
    case Routes.FAQ: {
      return <FAQ {...props} />;
    }
    case Routes.Deregister: {
      return <Deregister {...props} />;
    }
    case Routes.Reactivate: {
      return <Reactivate {...props} />;
    }
    case Routes.ListingDetail: {
      return (
        <ListingDetail
          key={query.listingID as string}
          listingID={Number(query.listingID)}
          ipAddress={ipAddress}
          {...props}
        />
      );
    }
    case Routes.ChatRoom: {
      return <ChatRoom key={query.chatRoomID as string} {...props} />;
    }
    case Routes.ChatRoomList: {
      return <ChatRoomList {...props} />;
    }
    case Routes.ChatRoomReport: {
      return <ChatRoomReport key={query.chatRoomID as string} {...props} />;
    }

    case Routes.DanjiDetail: {
      if (!prefetchedData) return null;

      return (
        <DanjiDetail
          key={`${query.danjiID as string}`}
          prefetchedData={prefetchedData}
          prefetchedPhotosData={prefetchedPhotosData}
          prefetchedSuggestList={prefetchedSuggestList}
          prefetchedListingList={prefetchedListingList}
          prefetchedNaverDanji={prefetchedNaverDanji}
          prefetchedDanjiSchoolData={prefetchedDanjiSchoolData}
          preselectedSchoolType={preselectedSchoolType}
          {...props}
        />
      );
    }
    case Routes.DanjiPhotos: {
      return (
        <DanjiPhotos
          key={`${query.danjiID}`}
          prefetchedData={prefetchedData}
          prefetchedPhotosData={prefetchedPhotosData}
          {...props}
        />
      );
    }
    case Routes.DanjiRealPriceDetail: {
      return <DanjiRealPriceDetail key={`${query.danjiID}`} {...props} />;
    }
    case Routes.DanjiRealTradeDetail: {
      return <DanjiRealTradeDetail key={`${query.danjiID}`} {...props} />;
    }
    case Routes.DanjiSelect: {
      return <DanjiSelect key={`${query.danjiID}`} {...props} />;
    }
    case Routes.DanjiListings: {
      return <DanjiListings key={`${query.danjiID}`} {...props} />;
    }
    case Routes.DanjiRealPriceList: {
      return <DanjiRealPriceListAll key={`${query.danjiID}`} {...props} />;
    }
    case Routes.UpdatePhone: {
      return <UpdatePhone {...props} />;
    }
    case Routes.Register: {
      return <Register {...props} />;
    }
    case Routes.RegisterSuccess: {
      return <RegisterSuccess {...props} />;
    }
    case Routes.VerifyCi: {
      return <VerifyCi {...props} />;
    }
    case Routes.FindAccount: {
      return <FindAccount {...props} />;
    }
    case Routes.ListingCreateForm: {
      return <ListingCreateForm {...props} />;
    }
    case Routes.ListingSelectAddress: {
      return <ListingSelectAddress {...props} />;
    }
    case Routes.ListingCreateSummary: {
      return <ListingCreateSummary {...props} />;
    }
    case Routes.ListingCreateResult: {
      return <ListingCreateResult {...props} />;
    }
    case Routes.BiddingForm: {
      return <BiddingForm {...props} />;
    }
    case Routes.BiddingSummary: {
      return <BiddingSummary {...props} />;
    }
    case Routes.BiddingSuccess: {
      return <BiddingSuccess {...props} />;
    }
    case Routes.UpdateBiddingForm: {
      return <UpdateBiddingForm {...props} />;
    }
    case Routes.UpdateBiddingSummary: {
      return <UpdateBiddingSummary {...props} />;
    }
    case Routes.UpdateBiddingSuccess: {
      return <UpdateBiddingSuccess {...props} />;
    }
    case Routes.ListingQnaCreateForm: {
      return <ListingQnaCreateForm {...props} />;
    }
    case Routes.ListingManage: {
      return <ListingManage {...props} />;
    }
    case Routes.ListingReport: {
      return <ListingReport {...props} />;
    }
    case Routes.SuggestForm: {
      return <SuggestForm {...props} />;
    }
    case Routes.SuggestFormUpdate: {
      return <SuggestFormUpdate {...props} />;
    }
    case Routes.SuggestGuide: {
      return <SuggestGuide {...props} />;
    }
    case Routes.SuggestRequestedList: {
      return <SuggestRequestedList {...props} />;
    }
    case Routes.MySuggestDetail: {
      return <MySuggestDetail key={`${query.suggestID}`} {...props} />;
    }
    case Routes.SuggestSelectAddress: {
      return <SuggestSelectAddress key={`${query.suggestID}`} {...props} />;
    }
    case Routes.SuggestDetail: {
      return <SuggestDetail key={`${query.suggestID}`} ipAddress={ipAddress} {...props} />;
    }
    case Routes.SuggestListings: {
      return <SuggestListings key={`${query.danjiID}`} {...props} />;
    }
    case Routes.SuggestRecommendedList: {
      return <SuggestRecommendedList {...props} />;
    }
    case Routes.SuggestRecommendedDetail: {
      return <SuggestRecommendedDetail {...props} />;
    }
    case Routes.SuggestListingForm: {
      return <SuggestListingForm key={`${query.suggestID}`} {...props} />;
    }
    case Routes.ListingPhotoGallery: {
      return <ListingPhotoGallery {...props} />;
    }
    case Routes.ListingTargetPriceUpdate: {
      return <ListingTargetPriceUpdate {...props} />;
    }
    case Routes.ListingTargetPriceUpdateSummary: {
      return <ListingTargetPriceUpdateSummary {...props} />;
    }
    case Routes.MapListingList: {
      return <MapListingList {...props} />;
    }
    case Routes.WaitingCreateForm: {
      return <WaitingCreateForm {...props} />;
    }
    case Routes.SubHome: {
      return <SubHome {...props} />;
    }
    case Routes.TradeProcess: {
      return <TradeProcess {...props} />;
    }
    case Routes.Dictionary: {
      return <Dictionary {...props} />;
    }
    case Routes.DictionaryDetail: {
      return <DictionaryDetail {...props} />;
    }
    case Routes.CommonSense: {
      return <CommonSense {...props} />;
    }
    case Routes.ListingCheckList: {
      return <ListingCheckList {...props} />;
    }
    case Routes.SpecialTerms: {
      return <SpecialTerms {...props} />;
    }
    case Routes.RealestateDocumentList: {
      return <RealestateDocumentList {...props} />;
    }
    case Routes.RealestateDocumentDetail: {
      return <RealestateDocumentDetail {...props} />;
    }
    case Routes.RealestateDocumentSearchAddress: {
      return <RealestateDocumentSearchAddress {...props} />;
    }
    case Routes.RealestateDocumentAddressDetail: {
      return <RealestateDocumentAddressDetail {...props} />;
    }
    case Routes.RealestateDocumentAddressVerifying: {
      return <RealestateDocumentAddressVerifying {...props} />;
    }
    case Routes.RealestateDocumentAddressVerifyResult: {
      return <RealestateDocumentAddressVerifyResult {...props} />;
    }

    case Routes.BusinessInfo: {
      return <BusinessInfo {...props} />;
    }
    case Routes.ServiceInfo: {
      return <ServiceInfo {...props} />;
    }

    case Routes.ServiceTerms: {
      return <ServiceTerms {...props} />;
    }
    case Routes.LocationTerms: {
      return <LocationTerms {...props} />;
    }
    case Routes.ContractTerms: {
      return <ContractTerms {...props} />;
    }

    case Routes.TermsAndPolicy: {
      return <TermsAndPolicy {...props} />;
    }
    case Routes.PrivacyPolicy: {
      return <PrivacyPolicy {...props} />;
    }

    case Routes.Developer: {
      if (process.env.NEXT_PUBLIC_APP_ENVIRONMENT === 'test') {
        return <Developer {...props} />;
      }
      return <NotFound />;
    }

    default: {
      return <NotFound />;
    }
  }
}

interface MetaInsertedProps extends RouterProps {
  title?: string;
  description?: string;
  keyWords?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogSiteName?: string;
  ogType?: string;
  ogImagePath?: string;
  ogTitleOnly?: boolean;
  canonical?: string;
  alternate?: string;
}

export default function MetaInserted({
  title,
  description,
  keyWords,
  ogTitle,
  ogDescription,
  ogSiteName,
  ogType,
  ogImagePath,
  ogTitleOnly,
  canonical,
  alternate,
  ...props
}: MetaInsertedProps) {
  return (
    <>
      <Head>
        {title && <title>{`${title}`}</title>}
        {description && <meta name="description" content={description} />}
        {keyWords && <meta property="keywords" content={keyWords} />}
        {ogTitle && (
          <meta property="og:title" content={ogTitleOnly ? `${ogTitle}` : `${ogTitle} | ${AppConfig.title}`} />
        )}
        {ogDescription && <meta property="og:description" content={ogDescription} />}
        {ogSiteName && <meta property="og:site_name" content={ogSiteName} />}
        {ogType && <meta property="og:type" content={ogType} />}
        {ogImagePath && <meta property="og:image" content={ogImagePath} />}
        {canonical && <meta property="og:url" content={canonical} />}
        {canonical && <link rel="canonical" href={canonical} />}
        {alternate && <link rel="alternate" media="only screen and (max-width: 640px)" href={alternate} />}
      </Head>
      <Router {...props} />
    </>
  );
}
