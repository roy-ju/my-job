export type BtnState = {
  SW8?: boolean;
  HP8?: boolean;
  MT1?: boolean;
  CS2?: boolean;
  BK9?: boolean;
  PO3?: boolean;
};

export const categoryButtonList: { id: keyof BtnState; korTitle: string }[] = [
  { id: 'SW8', korTitle: '지하철' },
  { id: 'HP8', korTitle: '병원' },
  { id: 'MT1', korTitle: '마트' },
  { id: 'CS2', korTitle: '편의점' },
  { id: 'BK9', korTitle: '은행' },
  { id: 'PO3', korTitle: '관공서' },
];

export type ConvertedCategoryType = {
  id: string;
  place_name: string;
  category_name: string;
  category_group_code: string;
  category_group_name: string;
  phone: string;
  address_name: string;
  road_address_name: string;
  x: string;
  y: string;
  place_url: string;
  distance: string;
}[];
