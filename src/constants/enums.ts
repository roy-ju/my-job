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
