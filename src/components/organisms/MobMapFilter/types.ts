export type RealestateTypeGroup = 'apt,oftl' | 'villa,dandok' | 'one,two';

export type FilterType = 'all' | 'realestateType' | 'buyOrRent' | 'price' | 'household' | 'etc';

export type MinHousehold = '0' | '20' | '100' | '300' | '500' | '1000';

export interface Filter {
  realestateTypeGroup: RealestateTypeGroup;
  realestateTypes: string; // comma separated string. e.g. '1,2'
  buyOrRents: string; // comma separated string. e.g. '1,2,3'
  priceRange: number[];
  depositRange: number[];
  rentRange: number[];
  minHousehold: MinHousehold;
  quickSale: boolean;
  gapInvestment: boolean;
  roomCounts: string;
}
