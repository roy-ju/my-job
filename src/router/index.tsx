/**
 * PC에서 사용되는 라우터
 * Mobile에서는 src/pages 디렉토리를 사용한다.
 */

import { Panel } from '@/components/atoms';
import dynamic from 'next/dynamic';
import { ParsedUrlQuery } from 'querystring';
import ListingCreateUpdateAddress from '@/components/pages/pc/ListingCreateUpdateAddress';
import ListingCreateUpdateAddressDetail from '@/components/pages/pc/ListingCreateUpdateAddressDetail';
import Routes from './routes';

function FallbackComponent() {
  return <Panel />;
}

const MapListingList = dynamic(() => import('@/components/pages/pc/MapListingList'), {
  ssr: false,
  loading: FallbackComponent,
});
const My = dynamic(() => import('@/components/pages/pc/My'), { ssr: false, loading: FallbackComponent });
const MyAddress = dynamic(() => import('@/components/pages/pc/MyAddress'), { ssr: false, loading: FallbackComponent });
const MyAddressDetail = dynamic(() => import('@/components/pages/pc/MyAddressDetail'), {
  ssr: false,
  loading: FallbackComponent,
});
const MyAddressDetailVerifying = dynamic(() => import('@/components/pages/pc/MyAddressVerifying'), {
  ssr: false,
  loading: FallbackComponent,
});
const MyDetail = dynamic(() => import('@/components/pages/pc/MyDetail'), { ssr: false, loading: FallbackComponent });
const MyRealPriceList = dynamic(() => import('@/components/pages/pc/MyRealPriceList'), {
  ssr: false,
  loading: FallbackComponent,
});
const MyFavoriteList = dynamic(() => import('@/components/pages/pc/MyFavoriteList'), {
  ssr: false,
  loading: FallbackComponent,
});
const MyRegisteredListings = dynamic(() => import('@/components/pages/pc/MyRegisteredListings'), {
  ssr: false,
  loading: FallbackComponent,
});
const MyParticipatingListings = dynamic(() => import('@/components/pages/pc/MyParticipatingListings'), {
  ssr: false,
  loading: FallbackComponent,
});

const ListingDetailPassed = dynamic(() => import('@/components/pages/pc/ListingDetailPassed'), {
  ssr: false,
  loading: FallbackComponent,
});

const ListingDetailHistory = dynamic(() => import('@/components/pages/pc/ListingDetailHistory'), {
  ssr: false,
  loading: FallbackComponent,
});

const NotificationList = dynamic(() => import('@/components/pages/pc/NotificationList'), {
  ssr: false,
  loading: FallbackComponent,
});
const NotificationSettings = dynamic(() => import('@/components/pages/pc/NotificationSettings'), {
  ssr: false,
  loading: FallbackComponent,
});
const NoticeList = dynamic(() => import('@/components/pages/pc/NoticeList'), {
  ssr: false,
  loading: FallbackComponent,
});
const NoticeDetail = dynamic(() => import('@/components/pages/pc/NoticeDetail'), {
  ssr: false,
  loading: FallbackComponent,
});
const Qna = dynamic(() => import('@/components/pages/pc/Qna'), {
  ssr: false,
  loading: FallbackComponent,
});
const MyCoupon = dynamic(() => import('@/components/pages/pc/MyCoupon'), {
  ssr: false,
  loading: FallbackComponent,
});
const Login = dynamic(() => import('@/components/pages/pc/Login'), { ssr: false, loading: FallbackComponent });
const ListingDetail = dynamic(() => import('@/components/pages/pc/ListingDetail'), { loading: FallbackComponent });
const ChatRoom = dynamic(() => import('@/components/pages/pc/ChatRoom'), { ssr: false, loading: FallbackComponent });

const DanjiDetail = dynamic(() => import('@/components/pages/pc/DanjiDetail'), {
  loading: FallbackComponent,
  ssr: false,
});

const DanjiRecommendation = dynamic(() => import('@/components/pages/pc/DanjiRecommendation'), {
  loading: FallbackComponent,
  ssr: false,
});

const DanjiRecommendationSuccess = dynamic(() => import('@/components/pages/pc/DanjiRecommendationSuccess'), {
  loading: FallbackComponent,
  ssr: false,
});

const DanjiRealPriceListAll = dynamic(() => import('@/components/pages/pc/DanjiRealPriceListAll'), {
  loading: FallbackComponent,
  ssr: false,
});

const DanjiPhotos = dynamic(() => import('@/components/pages/pc/DanjiPhotos'), {
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

const DanjiListings = dynamic(() => import('@/components/pages/pc/DanjiListings'), {
  loading: FallbackComponent,
  ssr: false,
});

const ChatRoomList = dynamic(() => import('@/components/pages/pc/ChatRoomList'), {
  ssr: false,
  loading: FallbackComponent,
});
const ChatRoomReport = dynamic(() => import('@/components/pages/pc/ChatRoomReport'), {
  ssr: false,
  loading: FallbackComponent,
});
const Developer = dynamic(() => import('@/components/pages/pc/Developer'), { ssr: false, loading: FallbackComponent });
const NotFound = dynamic(() => import('@/components/pages/pc/NotFound'), { loading: FallbackComponent });
const Deregister = dynamic(() => import('@/components/pages/pc/Deregister'), {
  ssr: false,
  loading: FallbackComponent,
});
const DeregisterDisclaimer = dynamic(() => import('@/components/pages/pc/DeregisterDisclaimer'), {
  ssr: false,
  loading: FallbackComponent,
});
const TransactionHistory = dynamic(() => import('@/components/pages/pc/TransactionHistory'), {
  ssr: false,
  loading: FallbackComponent,
});
const TransactionReview = dynamic(() => import('@/components/pages/pc/TransactionReview'), {
  ssr: false,
  loading: FallbackComponent,
});
const FAQ = dynamic(() => import('@/components/pages/pc/FAQ'), {
  ssr: false,
  loading: FallbackComponent,
});
const UpdatePhone = dynamic(() => import('@/components/pages/pc/UpdatePhone'), {
  ssr: false,
  loading: FallbackComponent,
});
const NegoPoint = dynamic(() => import('@/components/pages/pc/NegoPoint'), {
  ssr: false,
  loading: FallbackComponent,
});
const BusinessInfo = dynamic(() => import('@/components/pages/pc/BusinessInfo'), {
  ssr: false,
  loading: FallbackComponent,
});
const Register = dynamic(() => import('@/components/pages/pc/Register'), {
  ssr: false,
  loading: FallbackComponent,
});
const RegisterSuccess = dynamic(() => import('@/components/pages/pc/RegisterSuccess'), {
  ssr: false,
  loading: FallbackComponent,
});
const VerifyCi = dynamic(() => import('@/components/pages/pc/VerifyCi'), {
  ssr: false,
  loading: FallbackComponent,
});
const VerifyCiSuccess = dynamic(() => import('@/components/pages/pc/VerifyCiSuccess'), {
  ssr: false,
  loading: FallbackComponent,
});
const FindAccount = dynamic(() => import('@/components/pages/pc/FindAccount'), {
  ssr: false,
  loading: FallbackComponent,
});
const ListingCreateAddress = dynamic(() => import('@/components/pages/pc/ListingCreateAddress'), {
  ssr: false,
  loading: FallbackComponent,
});
const ListingCreateAddressDetail = dynamic(() => import('@/components/pages/pc/ListingCreateAddressDetail'), {
  ssr: false,
  loading: FallbackComponent,
});

const ListingCreateForm = dynamic(() => import('@/components/pages/pc/ListingCreateForm'), {
  ssr: false,
  loading: FallbackComponent,
});
const ListingCreateChooseAgent = dynamic(() => import('@/components/pages/pc/ListingCreateChooseAgent'), {
  ssr: false,
  loading: FallbackComponent,
});
const ListingCreateSummary = dynamic(() => import('@/components/pages/pc/ListingCreateSummary'), {
  ssr: false,
  loading: FallbackComponent,
});
const ListingCreateResult = dynamic(() => import('@/components/pages/pc/ListingCreateResult'), {
  ssr: false,
  loading: FallbackComponent,
});
const ServiceInfo = dynamic(() => import('@/components/pages/pc/ServiceInfo'), {
  ssr: false,
  loading: FallbackComponent,
});
const TermsAndPolicy = dynamic(() => import('@/components/pages/pc/TermsAndPolicy'), {
  ssr: false,
  loading: FallbackComponent,
});
const ServiceTerms = dynamic(() => import('@/components/pages/pc/ServiceTerms'), {
  ssr: false,
  loading: FallbackComponent,
});
const PrivacyTerms = dynamic(() => import('@/components/pages/pc/PrivacyTerms'), {
  ssr: false,
  loading: FallbackComponent,
});
const LocationTerms = dynamic(() => import('@/components/pages/pc/LocationTerms'), {
  ssr: false,
  loading: FallbackComponent,
});
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
const ListingQnaCreateForm = dynamic(() => import('@/components/pages/pc/ListingQnaCreateForm'), {
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
const SuggestRegionalForm = dynamic(() => import('@/components/pages/pc/SuggestRegionalForm'), {
  ssr: false,
  loading: FallbackComponent,
});
const SuggestRegionalSummary = dynamic(() => import('@/components/pages/pc/SuggestRegionalSummary'), {
  ssr: false,
  loading: FallbackComponent,
});
const SuggestRegionalSuccess = dynamic(() => import('@/components/pages/pc/SuggestRegionalSuccess'), {
  ssr: false,
  loading: FallbackComponent,
});
const SuggestRequestedList = dynamic(() => import('@/components/pages/pc/SuggestRequestedList'), {
  ssr: false,
  loading: FallbackComponent,
});
const SuggestReceivedList = dynamic(() => import('@/components/pages/pc/SuggestReceivedList'), {
  ssr: false,
  loading: FallbackComponent,
});
const SuggestDetail = dynamic(() => import('@/components/pages/pc/SuggestDetail'), {
  ssr: false,
  loading: FallbackComponent,
});
const ListingPhotoGallery = dynamic(() => import('@/components/pages/pc/ListingPhotoGallery'), {
  ssr: false,
  loading: FallbackComponent,
});
const ListingTargetPriceUpdate = dynamic(() => import('@/components/pages/pc/ListingTargetPriceUpdate'), {
  ssr: false,
  loading: FallbackComponent,
});
const ListingTargetPriceUpdateSummary = dynamic(() => import('@/components/pages/pc/ListingTargetPriceUpdateSummary'), {
  ssr: false,
  loading: FallbackComponent,
});

const DEFAULT_PANEL_WIDTH = '380px';

interface Props {
  route: string; // url segments 에서 가장 우측에 위치한 segment
  query: ParsedUrlQuery; // 쿼리 파라미터
  depth: number; // route segment 의 depth
}

export default function Router({ route, query, depth }: Props) {
  const props = {
    panelWidth: DEFAULT_PANEL_WIDTH,
    depth,
  };

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

    case Routes.ListingDetailPassed: {
      return <ListingDetailPassed {...props} />;
    }

    case Routes.ListingDetailHistory: {
      return <ListingDetailHistory {...props} />;
    }

    case Routes.NotificationList: {
      return <NotificationList {...props} />;
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

    case Routes.TransactionHistory: {
      return <TransactionHistory {...props} />;
    }

    case Routes.TransactionReview: {
      return <TransactionReview {...props} />;
    }

    case Routes.NegoPoint: {
      return <NegoPoint {...props} />;
    }

    case Routes.Qna: {
      return <Qna {...props} />;
    }

    case Routes.FAQ: {
      return <FAQ {...props} />;
    }

    case Routes.MyCoupon: {
      return <MyCoupon {...props} />;
    }

    case Routes.ServiceInfo: {
      return <ServiceInfo {...props} />;
    }

    case Routes.TermsAndPolicy: {
      return <TermsAndPolicy {...props} />;
    }

    case Routes.ServiceTerms: {
      return <ServiceTerms {...props} />;
    }
    case Routes.PrivacyTerms: {
      return <PrivacyTerms {...props} />;
    }
    case Routes.LocationTerms: {
      return <LocationTerms {...props} />;
    }

    case Routes.Deregister: {
      return <Deregister {...props} />;
    }

    case Routes.DeregisterDisclaimer: {
      return <DeregisterDisclaimer {...props} />;
    }

    case Routes.Login: {
      return <Login {...props} />;
    }

    case Routes.ListingDetail: {
      return <ListingDetail key={query.listingID as string} listingID={Number(query.listingID)} {...props} />;
    }

    case Routes.ChatRoom: {
      return <ChatRoom key={query.chatRoomID as string} {...props} />;
    }

    case Routes.ChatRoomList: {
      return <ChatRoomList {...props} />;
    }

    case Routes.ChatRoomReport: {
      return <ChatRoomReport {...props} />;
    }

    case Routes.DanjiDetail: {
      return <DanjiDetail key={`${query.p}-${query.rt}`} {...props} />;
    }

    case Routes.DanjiRecommendation: {
      return <DanjiRecommendation key={`${query.p}-${query.rt}`} {...props} />;
    }

    case Routes.DanjiRecommendationSuccess: {
      return <DanjiRecommendationSuccess key={`${query.p}-${query.rt}`} {...props} />;
    }

    case Routes.DanjiPhotos: {
      return <DanjiPhotos key={`${query.p}-${query.rt}`} {...props} />;
    }

    case Routes.DanjiRealPriceDetail: {
      return <DanjiRealPriceDetail key={`${query.p}-${query.rt}`} {...props} />;
    }

    case Routes.DanjiRealTradeDetail: {
      return <DanjiRealTradeDetail key={`${query.p}-${query.rt}`} {...props} />;
    }

    case Routes.DanjiSelect: {
      return <DanjiSelect key={`${query.p}-${query.rt}`} {...props} />;
    }

    case Routes.DanjiListings: {
      return <DanjiListings key={`${query.p}-${query.rt}`} {...props} />;
    }

    case Routes.DanjiRealPriceList: {
      return <DanjiRealPriceListAll key={`${query.p}-${query.rt}`} {...props} />;
    }

    case Routes.UpdatePhone: {
      return <UpdatePhone {...props} />;
    }

    case Routes.BusinessInfo: {
      return <BusinessInfo {...props} />;
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

    case Routes.VerifyCiSuccess: {
      return <VerifyCiSuccess {...props} />;
    }

    case Routes.FindAccount: {
      return <FindAccount {...props} />;
    }

    case Routes.ListingCreateAddress: {
      return <ListingCreateAddress {...props} />;
    }

    case Routes.ListingCreateAddressDetail: {
      return <ListingCreateAddressDetail {...props} />;
    }

    case Routes.ListingCreateForm: {
      return <ListingCreateForm {...props} />;
    }

    case Routes.ListingCreateChooseAgent: {
      return <ListingCreateChooseAgent {...props} />;
    }

    case Routes.ListingCreateSummary: {
      return <ListingCreateSummary {...props} />;
    }

    case Routes.ListingCreateResult: {
      return <ListingCreateResult {...props} />;
    }

    case Routes.ListingCreateUpdateAddress: {
      return <ListingCreateUpdateAddress {...props} />;
    }

    case Routes.ListingCreateUpdateAddressDetail: {
      return <ListingCreateUpdateAddressDetail {...props} />;
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

    case Routes.SuggestRegionalForm: {
      return <SuggestRegionalForm {...props} />;
    }

    case Routes.SuggestRegionalSummary: {
      return <SuggestRegionalSummary {...props} />;
    }

    case Routes.SuggestRegionalSuccess: {
      return <SuggestRegionalSuccess {...props} />;
    }

    case Routes.SuggestRequestedList: {
      return <SuggestRequestedList {...props} />;
    }

    case Routes.SuggestReceivedList: {
      return <SuggestReceivedList {...props} />;
    }

    case Routes.SuggestDetail: {
      return <SuggestDetail {...props} />;
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

    case Routes.Developer: {
      if (process.env.NEXT_PUBLIC_APP_ENVIRONMENT === 'test') {
        return <Developer {...props} />;
      }
      return <NotFound {...props} />;
    }

    default: {
      return <NotFound {...props} />;
    }
  }
}
