export enum SocialLoginType {
  Kakao = 1,
  Apple = 2,
}

export enum PlatformType {
  Android = 1,
  IOS = 2,
}

export enum RealestateType {
  Apartment = 10,
  Officetel = 20,
  Dasaedae = 30,
  Yunrip = 40,
  Dandok = 50,
  Dagagoo = 60,
}

export enum RoomCounts {
  OneRoom = 1,
  TwoRoom = 2,
}

export enum BuyOrRent {
  Buy = 1,
  Jeonsae = 2,
  Wolsae = 3,
}

export enum ChatUserType {
  Buyer = 1,
  Seller = 2,
  Agent = 3,
  System = 4,
}

export enum ChatRoomType {
  Agent = 1,
  BuyerSeller = 2,
}

export enum NegotiationOrAuction {
  Negotiation = 1,
  Auction = 2,
}

export enum NegotiationTarget {
  Deposit = 1,
  Wolsae = 2,
}

export enum PrivacyRetentionType {
  OneYear = 1,
  ThreeYear = 2,
  FiveYear = 3,
  Deregister = 4,
}

export enum Year {
  One = 1,
  Two = 2,
  Three = 3,
  Four = 4,
  Five = 5,
}

export enum TimeType {
  BeforeDay = 1,
  AfterDay = 2,
  Day = 3,
}

export enum SchoolType {
  All = 0,
  ElementarySchool = 1,
  MiddleSchool = 2,
  HighSchool = 3,
}

export enum MyAddressStatus {
  WaitingForOwnerAgreement = 16,
  Active = 20,
}

export enum VerifyStatus {
  None = 1,
  Ing = 2,
  OwnerIng = 3,
  Completed = 4,
  Success = 5,
}

export enum ListingStatus {
  VerifyAddress = 10, // 등기부 주소 조회 서비스 요청중 (실패시 계속 같은 Status 유지) check

  NoAddressFound = 11, // 주소확인 불가 check

  MultipleAddressesFound = 12, // 2개이상의 주소 발견 check

  VerifyOwnership = 13, // 등기부 소유주 조회 서비스 요청중, PDF 다운은 따로 Status로 관리 하지 않는다. 매물등록에 크리티컬한 스텝은 아니기 때문에. check

  VerifyOwnershipNotFound = 14, // 14 - (입력정보 확인필요) 등기부 소유자 조회 서비스 결과 소유자랑 일치하지 않을때 check

  VerifyOwnershipFinished = 15, // 15 -  등기부 소유자 조회 서비스는 끝났는데 아직 매물 등록이 완료 안됬을때 (사실상 클라이언트에서 확인하기 어려움)

  WaitingForOwnerAgreement = 16, // (소유자 동의 대기중)  소유자 동의 문자 발송 완료 (대리인)

  AgentSelection = 17, // (중개사 선택 대기 중) 중개사가 중개포기를 하거나 등록완료 기한을 넘겨서 다시 선택해야 할때

  WaitingForAgentCompletion = 18, // (등록 대기 중) 중개사 배정매물 등록 완료 대기중

  Duplicated = 19, // (등록 불가 매물) 모든 유형의 중복 매물이 있어서 등록이 불가능해서 삭제 가능한 상태

  Active = 20, // Active 상태

  Negotiating = 21, // 우선협상자 선정 상태

  ContractComplete = 22, // 거래 성사 상태

  Cancelled = 23, // 취소 상태. 매도인 취소, 중개사 취소. 삭제와는 구분되어야 함

  Deleted = 24, // 중개사 임시저장 상태

  PreContractComplete = 25, // 거래성사 - 가계약금 입금완료
}

export enum VisitUserType {
  NotLoggedIn = 1, // 로그인 안한 유저
  BuyerGeneral = 2, // 로그인 한 유저 - 미제안
  SellerGeneral = 3, // 매도인 - 가계약금 이전
  SellerPreContractComplete = 4, // 매도인 - 가계약금 이후
  Submitted = 5, // 매수인 제안상태 (중개사가 액션전)
  Rejected = 6, // 매수인 제안거걸 (중개사가 거절함)
  Accepted = 7, // 매수인 제안수락 (중개사가 수락하여 채팅방 열림)
  HasSuggestRecommend = 8, // 매수인 제안은 없고 중개인의 추천이 있는 경우
  PreContractOthers = 9, // 가계약금 입금 됐지만 당사자가 아님
  PreContractSelf = 10, // 가계약금 입금된 당사자
}

export enum BiddingStatus {
  BiddingStatusSubmitted = 1, // 리뉴얼추가: 가격제안중 (입찰형에서는 입찰중인 상태)
  BiddingStatusAccepted = 2, // 리뉴얼추가: 중개사가 수락하여 하여 채팅방이 열리거나 유저가 중개사가 추천한 매물을 수락한 경우
  BiddingStatusRejected = 3, // 리뉴얼추가: 중개사가 거절한 상태(다시 수락될수도 있음)
  BiddingStatusNegotiating = 4, // 리뉴얼변경: 우선협상자 선정 (입찰형에서 입찰 기간 끝날때만 존재할수 있는 Status). 네고형에서는
  BiddingStatusPreContractComplete = 5, // 리뉴얼추가: 거래성사(가계약금)
  BiddingStatusContractComplete = 6, // 리뉴얼추가: 거래완료(계약체결) - 거래성사 단계를 스킵할수도 있다
  BiddingStatusCancelled = 7, // 제안 취소: BiddingCancelType이 반드시 존재
}

export enum SuggestStatus {
  Active = 1,
  Stopped = 2,
  Deleted = 3,
}

export enum SuggestCancelType {
  UserCacncelled = 1,
  AdminCancelled = 2,
}

export enum SuggestRecommendStatus {
  Sent = 1, // 추천생성
  Accepted = 2, // 협의시작 (채팅방 열려있는 상태)
  NotInterested = 3, // 관심없음(유저목록에서 삭제, 중개사 목록에선 대기중)
  Cancelled = 4, // 취소 함 (채팅방을 나가거나 추천자가 취소버튼을 누름)
  // Completed = 5, // 거래성사 202308추가
}

export enum SuggestCompleteHistoryStatus {
  New = 1,
  Updated = 2,
  Cancelled = 3,
}

export enum NotificationLinkType {
  ServiceHome = 1,
  ListingRegister = 2, // 매물등록
  ListingDetail = 3, // 매물상세
  ChatList = 4, // 채팅메인
  ChatRoom = 5, // 특정채팅방
  MyRegisterd = 6, // 나의거래 - 등록한거래
  MyParticipated = 7, // 나의거래 - 참여한거래
  MyProfile = 8, // 마이페이지 - 회원정보(닉네임, 본인인증, 간편 로그인, 연락처, 탈퇴, 로그아웃)
  MyPrivacyPolicy = 9, // 마이페이지 - 기타정보공개 - 약관 및 정책 - 개인정보 처리방침
  MyTerms = 10, // 마이페이지 - 약관 및 정책 - 서비스 이용약관
  MyNegoMoney = 11, // 마이페이지 - 네고머니
  MyVisitSchedules = 12, // 마이페이지 - 방문일정
  MyServiceQna = 13, // 마이페이지 - 서비스문의
  MyReport = 14, // 신고내역
  MyReportDetail = 15, // 신고상세페이지
  VisitSurvey = 16, // 방문예약 서베이 페이지
  MyParticipatingTradesPast = 17, // 마이페이지 - 거래참여 이력 - 지난 거래
  MyParticipatingTrades = 18, // 마이페이지 - 거래참여 이력
  ListingRegisterCompleted = 19, // 매물등록완료페이지
  PhoneUpdate = 20, // 휴대폰번호 변경 페이지
  PenaltyPayment = 21, // 위약금납부 (listing_contract_id 가 chat_room_id column 에 있음)
  RegisterMyHomeNoticePage = 22, // 집주인 이벤트 공지사항 페이지
  OpinionHistory = 23, // 마이페이지 - 오피니언 이력 페이지
  OpinionResultComplete = 24, // 마이페이지 - 오피니언 이력 완료 탭
  ListingDetailQna = 25, // 매물상세 - Qna 탭.
  OpinionResultCancelled = 26, // 마이페이지 - 오피니언 이력 - 취소 탭
  MyTempListingDetail = 27, // 나의거래 등록전 매물 상세 페이지
  MyRealPrice = 28, // 마이페이지 - 관심실거래가
  SuggestRegional = 29, // 지역매물 추천 페이지
  SuggestList = 30, // 추천매물 페이지
  MyRegisteredPastDetail = 31, // 등록한 매물 이력
  SuggestRecommendList = 32, // 마이페이지 -> 요청리스트 -> 요청의 추천매물 페이지
}

export enum NiceVerificationType {
  Phone = 1,
  IPin = 2,
}

export enum UserStatus {
  Active = 1,
  InActive = 2,
  Suspended = 3,
  Deleted = 4,
}

export enum DanjiOrRegionalType {
  Danji = 1,
  Regional = 2,
}

export function describeRealestateType(type: RealestateType | undefined | null) {
  switch (type) {
    case RealestateType.Apartment:
      return '아파트';
    case RealestateType.Officetel:
      return '오피스텔';
    case RealestateType.Dasaedae:
      return '빌라';
    case RealestateType.Yunrip:
      return '빌라';
    case RealestateType.Dandok:
      return '단독';
    case RealestateType.Dagagoo:
      return '다가구';
    default:
      return '';
  }
}

export function describeTimeType(type: TimeType | undefined | null) {
  switch (type) {
    case TimeType.BeforeDay:
      return '이전';
    case TimeType.AfterDay:
      return '이후';
    case TimeType.Day:
      return '당일';
    default:
      return '';
  }
}

export function describeTargetPrice({
  negotiation_or_auction,
  isOwnerLabel = false,
}: {
  negotiation_or_auction?: NegotiationOrAuction;
  isOwnerLabel?: boolean;
}) {
  switch (negotiation_or_auction) {
    case NegotiationOrAuction.Auction:
      return '낙찰기준가';
    case NegotiationOrAuction.Negotiation:
      return isOwnerLabel ? '집주인 희망가' : '희망가';
    default:
      return '';
  }
}

export function describeBiddingPrice({ negotiation_or_auction }: { negotiation_or_auction?: NegotiationOrAuction }) {
  if (negotiation_or_auction === NegotiationOrAuction.Auction) return '입찰가';
  return '제안가';
}

export function describeBuyOrRent(type: BuyOrRent | null | undefined) {
  switch (type) {
    case BuyOrRent.Buy:
      return '매매';
    case BuyOrRent.Jeonsae:
      return '전세';
    case BuyOrRent.Wolsae:
      return '월세';
    default:
      return '';
  }
}

export function describeJeonsaeWolsaeSame(type: BuyOrRent | null | undefined) {
  switch (type) {
    case BuyOrRent.Buy:
      return '매매';
    case BuyOrRent.Jeonsae:
      return '전월세';
    case BuyOrRent.Wolsae:
      return '전월세';
    default:
      return '';
  }
}
