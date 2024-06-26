import { BuyOrRent, RealestateType } from '@/constants/enums';

import convertPriceInputToNumber from '@/utils/convertPriceInputToNumber';

import getDateType from '@/utils/getDateType';

import { BubjungdongType } from '../form/types';

import isEqualValue from './isEqualValue';

import isNotEqualValue from './isNotEqualValue';

interface Args {
  bubjungdong: BubjungdongType[];

  realestateType: number[];

  buyOrRent: number;

  tradeOrDepositPrice: string;

  monthlyRentFee: string;

  negotiable: boolean;

  minArea: string;

  maxArea: string;

  purpose: string;

  investAmount: string;

  moveInDate: Date | null;

  moveInDateType: string;

  description: string;

  interviewAvailabletimes: string[];
}

export default function suggestRegionParams(args: Args) {
  const updatedRealestateType =
    args.realestateType.includes(RealestateType.Dasaedae) && !args.realestateType.includes(RealestateType.Yunrip)
      ? [...args.realestateType, RealestateType.Yunrip]
      : [...args.realestateType];

  const params: Record<string, unknown> = {
    address: args.bubjungdong.map((item) => item.name),

    bubjungdong_code: args.bubjungdong.map((item) => item.code),

    realestate_types: `${updatedRealestateType.sort((a, b) => a - b)}`,

    buy_or_rents: isEqualValue(args.buyOrRent, BuyOrRent.Buy)
      ? BuyOrRent.Buy.toString()
      : [BuyOrRent.Jeonsae, BuyOrRent.Wolsae].join(','),

    trade_price: isEqualValue(args.buyOrRent, BuyOrRent.Buy) ? convertPriceInputToNumber(args.tradeOrDepositPrice) : 0,

    deposit: isNotEqualValue(args.buyOrRent, BuyOrRent.Buy) ? convertPriceInputToNumber(args.tradeOrDepositPrice) : 0,

    monthly_rent_fee: isNotEqualValue(args.buyOrRent, BuyOrRent.Buy)
      ? convertPriceInputToNumber(args.monthlyRentFee)
      : 0,

    negotiable: args.negotiable,

    purpose: args.purpose,

    invest_amount: isEqualValue(args.purpose, '투자') ? convertPriceInputToNumber(args.investAmount) : 0,

    move_in_date: isEqualValue(args.purpose, '투자') ? null : args.moveInDate?.toISOString(),

    move_in_date_type: isEqualValue(args.purpose, '투자') ? null : getDateType(args.moveInDateType),

    pyoung_from: args.minArea,

    pyoung_to: undefined,

    note: '',

    additional_conditions: args.description,

    interview_available_times: args.interviewAvailabletimes.join(),
  };

  Object.keys(params).forEach((key) => (params[key] === undefined || params[key] === '') && delete params[key]);

  return params;
}
