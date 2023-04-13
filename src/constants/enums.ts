export enum SocialLoginType {
  Kakao = 1,
  Apple = 2,
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
  Complete = 22, // 거래 성사 상태
  Cancelled = 23, // 취소 상태. 매도인 취소, 중개사 취소. 삭제와는 구분되어야 함
  Deleted = 24, // 중개사 임시저장 상태
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
