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
  notion_url?: string;
  thumb_file_path?: string;

  checked?: boolean;
  related_terms?: string[];
};

export type TermsDictionaryListItem = {
  term_dictionary: GuideListItem;
  related_terms: string[];
};

export type SubHomeGuideListResponse = {
  middle_category_list: GuideListItem[];
  list: GuideListItem[];

  additional_list: GuideListItem[];
  required_list: GuideListItem[];
};

export type SubHomeDashInfoResponse = {
  realestate_knowledge_list: GuideListItem[];
  term_dictionary_list: TermsDictionaryListItem[];
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
  created_time: string;
};

export type SubHomeRealestatedocumentGetResonse = {
  user_realestate_document_history_id: number;
};

export type SubHomeRealestatedocumentListResponse = {
  list: RealestateDocumentListItem[];
  remaining_count: number;
};

export type OwnerListItem = {
  owner: string;
  registration_number: string;
  share: string;
  address: string;
  number: string;
};

export type DeptListItem = {
  number: string;
  purpose: string;
  application_info: string;
  description: string;
  owner: string;
};

export type PreviousHistoryListItem = {
  user_realestate_history_id: string;
  created_time: string;
};

export type SubHomeRealestatedocumentDetailResponse = {
  realestate_document_info: {
    id: number;
    road_name_address: string;
    address_detail: string;
    dong: string;
    ho: string;
    floor: string;
    danji_id: number;
    danji_name: string;
    created_time: string;
  };

  realestate_document_summary: {
    created_time: string;
    owner_list: OwnerListItem[] | null;
    debt_list1: DeptListItem[] | null;
    debt_list2: DeptListItem[] | null;
  };

  previous_history_list: PreviousHistoryListItem[] | null;

  realestate_document_pdf: {
    realestate_document_path: string;
    realestate_document_time: string;
  };
};
