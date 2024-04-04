export type AroundListType = {
  address_name: string;
  category_group_code: string;
  category_group_name: string;
  category_name: string;
  distance: string;
  place_name: string | string[];
  x: string | string[];
  y: string | string[];
  id: string;
  phone: string;
  road_address_name: string;
  place_url: string;
}[];

export type Item = {
  address_name: string;
  category_group_code: string;
  category_group_name: string;
  category_name: string;
  distance: string;
  place_name: string | string[];
  x: string | string[];
  y: string | string[];
  id: string;
  phone: string;
  road_address_name: string;
  place_url: string;
};

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
