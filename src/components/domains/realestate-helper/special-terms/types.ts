export type Category = '매매' | '전월세';

export type MiddleCategory = '기본' | '담보권' | '임대차 승계' | '하자' | '특별' | '기타' | '특수' | '추가';

export type SmallCategory =
  | '기본 특약'
  | '담보권 관련 특약'
  | '임대차 승계 특약'
  | '하자 관련 특약'
  | '특별 특약'
  | '기타 특약'
  | '특수 특약'
  | '추가 특약';

export type TermsListItem = {
  index: number;
  category: Category;
  middleCategory: MiddleCategory;
  smallCategory: SmallCategory;
  title: string;
  content: string;
};
