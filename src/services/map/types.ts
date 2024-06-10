interface HakgudoItem {
  hakgudo_id: string;
  hakgudo_name: string;
  polygons: string;
}

export interface MapHakgudoResponse {
  list: HakgudoItem[];
}

export interface MapSearchResponse {
  listing_count: number;
  results: {
    bubjungdong_code: string;
    bubjungdong_name: string;
    danji_count: number;
    listing_count: number;
    lat: number;
    long: number;
  }[];
}

export interface MapSearchLevelOneResponse {
  listing_count: number;
  danji_list:
    | {
        danji_id: number;
        danji_realestate_type: number;
        pyoung: string;
        price: number;
        monthly_rent_fee: number;
        listing_count: number;
        long: number;
        lat: number;
        road_name_address: string;
        jibun_address: string;
      }[]
    | null;
  listing_list:
    | {
        listing_count: number;
        listing_ids: string;
        trade_price: number;
        deposit: number;
        monthly_rent_fee: number;
        long: number;
        lat: number;
      }[]
    | null;
}

export interface MapSearchFilter {
  trade_price_min?: number | null;
  trade_price_max?: number | null;
  jeonsae_deposit_min?: number | null;
  jeonsae_deposit_max?: number | null;
  monthly_rent_fee_min?: number | null;
  monthly_rent_fee_max?: number | null;
  trade_price2_min?: number | null;
  trade_price2_max?: number | null;
  jeonsae_deposit2_min?: number | null;
  jeonsae_deposit2_max?: number | null;
  monthly_rent_fee2_min?: number | null;
  monthly_rent_fee2_max?: number | null;
  saedae_min?: number | null;
  saedae_max?: number | null;
  listing_type?: number | null;
  buy_or_rent: string;
  realestate_type: string;
  gap_investment: boolean;
  room_count: string;
}

interface ListItem {
  listing_id: number;
  thumbnail_full_path?: string;
  listing_title: string;
  realestate_type: number;
  jeonyong_area: string;
  floor_description: string;
  total_floor: string;
  direction: string;
  buy_or_rent: number;
  quick_sale?: boolean;
  is_participating: boolean;
  view_count: number;
  participants_count: number;
  trade_or_deposit_price: number;
  monthly_rent_fee: number;
  eubmyundong: string;
  is_favorite: boolean;
  bidding_id: any;
  label_text: string;
  status_text: string;
}

export interface MapSearchListResponse {
  count: number;
  list: ListItem[] | null;
}
