export type RealestateTypeGroup = 'apt,oftl' | 'villa,dandok' | 'one,two';

export type FilterType =
  | 'all'
  | 'realestateType'
  | 'buyOrRent'
  | 'price'
  | 'household'
  | 'etc';

export interface Filter {
  realestateTypes: string; // comma separated string. e.g. '1,2'
  buyOrRents: string; // comma separated string. e.g. '1,2,3'
  priceRange: number[];
  depositRange: number[];
  rentRange: number[];
}
