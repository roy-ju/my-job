import { BuyOrRent, RealestateType } from '@/constants/enums';

import { PRICE_STEPS, DEPOSIT_STEPS, RENT_STEPS } from '../mobile-map-filter/PriceFilter';

import { Filter } from '../mobile-map-filter/types';

export function getDefaultFilterAptOftl(): Filter {
  return {
    realestateTypeGroup: 'apt,oftl',
    realestateTypes: [RealestateType.Apartment, RealestateType.Officetel].join(','),
    buyOrRents: [BuyOrRent.Buy].join(','),
    priceRange: [0, PRICE_STEPS.length - 1],
    depositRange: [0, DEPOSIT_STEPS.length - 1],
    rentRange: [0, RENT_STEPS.length - 1],
    minHousehold: '100',
    gapInvestment: false,
    quickSale: false,
    roomCounts: '',
  };
}

export function getDefaultFilterVillaDandok(): Filter {
  return {
    realestateTypeGroup: 'villa,dandok',
    realestateTypes: [
      RealestateType.Yunrip,
      RealestateType.Dasaedae,
      RealestateType.Dandok,
      RealestateType.Dagagoo,
    ].join(','),
    // buyOrRents: [BuyOrRent.Buy, BuyOrRent.Jeonsae, BuyOrRent.Wolsae].join(','),
    buyOrRents: [BuyOrRent.Buy].join(','),
    priceRange: [0, PRICE_STEPS.length - 1],
    depositRange: [0, DEPOSIT_STEPS.length - 1],
    rentRange: [0, RENT_STEPS.length - 1],
    minHousehold: '0',
    gapInvestment: false,
    quickSale: false,
    roomCounts: '',
  };
}

export function getDefaultFilterOneRoomTwoRoom(): Filter {
  return {
    realestateTypeGroup: 'one,two',
    realestateTypes: [
      RealestateType.Apartment,
      RealestateType.Officetel,
      RealestateType.Yunrip,
      RealestateType.Dasaedae,
      RealestateType.Dandok,
      RealestateType.Dagagoo,
    ].join(','),
    buyOrRents: [BuyOrRent.Jeonsae, BuyOrRent.Wolsae].join(','),
    priceRange: [0, PRICE_STEPS.length - 1],
    depositRange: [0, DEPOSIT_STEPS.length - 1],
    rentRange: [0, RENT_STEPS.length - 1],
    minHousehold: '0',
    gapInvestment: false,
    quickSale: false,
    roomCounts: '1,2',
  };
}
