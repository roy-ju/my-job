export interface CommonMapMarker {
  id: string;
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
  lat: number;
  lng: number;
  onClick?: () => void;
}

export interface CommonSchoolMarker {
  id: string;
  type: string;
  lat: number;
  lng: number;
  name: string;
  onClick?: () => void;
}
