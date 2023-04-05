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
