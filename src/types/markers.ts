export interface CommonMarker {
  id: string;
  lat: number;
  lng: number;
  onClick?: () => void;
  onMouseOver?: () => void;
  onMouseLeave?: () => void;
}

export interface ListingDanjiMarker extends CommonMarker {
  variant: 'blue' | 'nego';
  bubjungdongCode?: string;
  bubjungdongName?: string;
  danjiCount?: number;
  danjiID?: number;
  danjiRealestateType?: number;
  pyoung?: string;
  price?: number;
  monthlyRentFee?: number;
  roadNameAddress?: string;
  jibunAddress?: string;
  listingIDs?: string;
  tradePrice?: number;
  deposit?: number;
  listingCount: number;
}

export interface SchoolMarker extends CommonMarker {
  type: string;
  name: string;
}

export interface AroundMarker extends CommonMarker {
  type: string;
  place?: string | string[];
  duplicatedCount?: number;
  distance?: string;
  addressName?: string;
}
