/**
 * PC에서 사용되는 Routes 이름들
 */

const Routes = {
  Chat: 'chat',
  ChatRoom: 'chatRoom',
  ChatRoomList: 'chatRoomList',
  ChatRoomReport: 'chatRoomReport',

  DanjiDetail: 'danjiDetail',
  DanjiListings: 'danjiListings',
  DanjiPhotos: 'danjiPhotos',
  DanjiRealPriceList: 'danjiRealPriceList',
  DanjiRealPriceDetail: 'danjiRealPrice',
  DanjiRealTradeDetail: 'danjiRealTrade',
  DanjiSelect: 'danjiSelect',

  Deregister: 'deregister',
  DeregisterDisclaimer: 'deregisterDisclaimer',
  Developer: 'developer',
  Login: 'login',
  Reactivate: 'reactivate',

  My: 'my',
  Map: 'map',
  MapListingList: 'mapListingList',
  Maintenance: 'maintenance',

  MyAddress: 'myAddress',
  MyAddressDetail: 'myAddressDetail',
  MyAddressVerifying: 'myAddressVerifying',
  MyAddressVerifyResult: 'myAddressVerifyResult',
  MyAddressAgreement: 'myAddressAgreement',

  MyRegisteredHomes: 'myRegisteredHomes',

  MyRealPriceList: 'myRealPriceList',
  MyDetail: 'myDetail',

  MyFavoriteList: 'myFavoriteList',
  MyRegisteredListingList: 'myRegisteredListings',

  MyParticipatingListings: 'myParticipatingListings',
  MySuggestDetail: 'mySuggestDetail',

  ListingDetailPassed: 'listingDetailPassed',
  ListingDetailHistory: 'listingDetailHistory',

  LawQna: 'lawQna',
  LawQnaSearch: 'lawQnaSearch',
  LawQnaDetail: 'lawQnaDetail',
  LawQnaCreate: 'lawQnaCreate',
  LawQnaUpdate: 'lawQnaUpdate',

  NotificationList: 'notifications',
  NotificationSettings: 'notificationSettings',
  NoticeList: 'noticeList',
  NoticeDetail: 'noticeDetail',

  NegoMoney: 'negoMoney',
  NegoPoint: 'negoPoint',

  Qna: 'qna',
  TransactionReview: 'transactionReview',
  FAQ: 'faq',
  UpdatePhone: 'updatePhone',

  MyCoupon: 'myCoupon',

  Register: 'register',
  RegisterSuccess: 'registerSuccess',
  VerifyCi: 'verifyCi',
  VerifyCiSuccess: 'verifyCiSuccess',
  FindAccount: 'findAccount',

  // 서비스 정보
  ServiceInfo: 'serviceInfo',
  BusinessInfo: 'businessInfo',
  TermsAndPolicy: 'termsAndPolicy',
  ServiceTerms: 'serviceTerms',
  PrivacyPolicy: 'privacyPolicy',
  LocationTerms: 'locationTerms',

  // 매물등록
  ListingSelectAddress: 'listingSelectAddress',
  ListingCreateForm: 'listingCreateForm',
  ListingCreateChooseAgent: 'listingCreateChooseAgent',
  ListingCreateSummary: 'listingCreateSummary',
  ListingCreateResult: 'listingCreateResult',

  // 모바일 매물등록 가이드 페이지
  HOG: 'hog',

  // 가격제안
  BiddingForm: 'biddingForm',
  BiddingSummary: 'biddingSummary',
  BiddingSuccess: 'biddingSuccess',

  // 가격제안 수정
  UpdateBiddingForm: 'updateBiddingForm',
  UpdateBiddingSummary: 'updateBiddingSummary',
  UpdateBiddingSuccess: 'updateBiddingSuccess',

  // 매물상세
  ListingDetail: 'listingDetail',
  ListingQnaCreateForm: 'listingQnaCreate',
  ListingManage: 'listingManage',
  ListingReport: 'listingReport',
  ListingPhotoGallery: 'listingPhotoGallery',
  ListingTargetPriceUpdate: 'listingTargetPriceUpdate',
  ListingTargetPriceUpdateSummary: 'listingTargetPriceUpdateSummary',
  ContractTerms: 'contractTerms',

  // 나의 추천요청 / 추천받은매물
  SuggestRequestedList: 'suggestRequestedList',

  // 나의 추천
  SuggestRecommendedList: 'suggestRecommendedList',
  SuggestRecommendedDetail: 'suggestRecommendedDetail',

  // 매물 구해요 (지역 / 단지)
  SuggestGuide: 'suggestGuide',
  SuggestForm: 'suggestForm',
  SuggestFormUpdate: 'suggestFormUpdate',

  // 매물 내놓기
  SuggestListingForm: 'suggestListingForm',
  SuggestSelectAddress: 'suggestSelectAddress',

  // 구해요 상세
  SuggestDetail: 'suggestDetail',

  // 구해요 목록
  SuggestListings: 'suggestListings',

  // 구해요 목록
  WaitingCreateForm: 'waitingCreateForm',

  // 부동산 거래도우미 거래절차
  TradeProcess: 'tradeProcess',

  // 부동산 거래도우미 사전
  Dictionary: 'dictionary',
  // 부동산 거래도우미 사전
  DictionaryDetail: 'dictionaryDetail',

  // 오픈소스라이센스
  OpenSourceLicenses: 'openSourceLicenses',
  // 버전정보
  VersionInfo: 'versionInfo',

  EntryMobile: 'm',
  Intro: 'intro',

  // 실제로 존재하는 url은 아니다. 핸들링을 필요한 클라이언트 루트
  Home: 'home',

  // 과거 매물추천과 관련된 Routes들 존재하면 안되는 페이지
  PAST_RecommedationGuide: 'recommendGuide',

  PAST_RecommendationForm: 'recommendationForm',

  PAST_SuggestRegionalForm: 'suggestRegionalForm',
  PAST_SuggestRegionalSummary: 'suggestRegionalSummary',
  PAST_SuggestRegionalFormUpdate: 'suggestRegionalFormUpdate',

  PAST_DanjiRecommendation: 'danjiRecommendation',
  PAST_DanjiRecommendationSummary: 'danjiRecommendationSummary',
  PAST_DanjiRecommendationUpdate: 'danjiRecommendationUpdate',
};

export default Routes;
