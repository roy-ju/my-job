export interface GuideListItem {
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
}

export interface SubHomeGuideListResponse {
  middle_category_list: GuideListItem[];
  list: GuideListItem[];
}

export interface SubHomeGuideDetailResponse {
  term: GuideListItem;
  related_terms: GuideListItem[];
}
