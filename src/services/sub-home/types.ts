export type GuideListItem = {
  id: number;
  code: string;
  name: string;
  parent_id: number;
  content: string;
  additional_explanation: string;
  tip: string;
  warning: string;
  related_terms_ids: string;
  order_num: number;
  created_time: string;
  children?: GuideListItem[] | null;
};

export type SubHomeGuideListResponse = {
  middle_category_list: GuideListItem[];
  list: GuideListItem[];
};

export type SubHomeGuideDetailResponse = {
  term: GuideListItem;
  related_terms: GuideListItem[];
};

export type SubHomeVerifyAddressRequest = {
  road_name_address: string;
  jibun_address: string;
  dong: string;
  ho: string;
};

export type AddressListItem = {
  realestate_unique_number: string;
  full_road_name_address: string;
  address_detail: string;
};

export type SubHomeVerifyAddressResponse = {
  count: number;
  address_list: AddressListItem[];
  remaining_count: number;
  fields?: {
    remaining_count?: number;
  };
};

export type SubHomeRealestatedocumentGetRequest = {
  realestate_unique_number: string;
  address_detail: string;
  bubjungdong_code: string;
  jibun_address: string;
  building_name: string;
  eubmyundong: string;
  lat: number;
  long: number;
  li: string;
  road_name_address: string;
  sido: string;
  sigungu: string;
};

export type RealestateDocumentListItem = {
  danji_id: number;
  danji_name: string;
  id: number;
  road_name_address: string;
  address_detail: string;
  dong: string;
  ho: string;
  floor: string;
};

export type SubHomeRealestatedocumentGetResonse = {
  user_realestate_document_history_id: number;
};

export type SubHomeRealestatedocumentListResponse = {
  list: RealestateDocumentListItem[];
  remaining_count: number;
};
