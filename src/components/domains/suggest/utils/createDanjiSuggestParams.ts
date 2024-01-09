import { BuyOrRent } from '@/constants/enums';

import convertPriceInputToNumber from '@/utils/convertPriceInputToNumber';

import getDateType from '@/utils/getDateType';

import isEqualValue from './isEqualValue';

import isNotEqualValue from './isNotEqualValue';

interface Args {
  danjiID: string;

  danjiAddress: string;

  danjiRealestateType: number;

  name: string;

  buyOrRent: number;

  tradeOrDepositPrice: string;

  monthlyRentFee: string;

  quickSale: string;

  investAmount: string;

  negotiable: boolean;

  pyoungList: number[];

  purpose: string;

  moveInDate: Date | null;

  moveInDateType: string;

  description: string;

  interviewAvailabletimes: string[];
}

export default function createDanjiSuggestParams(args: Args) {
  const params: Record<string, unknown> = {
    danji_id: Number(args.danjiID ?? 0),

    danji_address: args.danjiAddress ?? '',

    danji_type: args.danjiRealestateType ? args.danjiRealestateType : 0,

    name: args.name,

    buy_or_rents: isEqualValue(args.buyOrRent, BuyOrRent.Buy)
      ? BuyOrRent.Buy.toString()
      : [BuyOrRent.Jeonsae, BuyOrRent.Wolsae].join(','),

    trade_price: isEqualValue(args.buyOrRent, BuyOrRent.Buy) ? convertPriceInputToNumber(args.tradeOrDepositPrice) : 0,

    deposit: isNotEqualValue(args.buyOrRent, BuyOrRent.Buy) ? convertPriceInputToNumber(args.tradeOrDepositPrice) : 0,

    monthly_rent_fee: isNotEqualValue(args.buyOrRent, BuyOrRent.Buy)
      ? convertPriceInputToNumber(args.monthlyRentFee)
      : 0,

    negotiable:
      isEqualValue(args.buyOrRent, BuyOrRent.Buy) && isEqualValue(args.quickSale, '1') ? false : args.negotiable,

    quick_sale: isEqualValue(args.buyOrRent, BuyOrRent.Buy) ? Boolean(+args.quickSale) : null,

    purpose: args.purpose,

    invest_amount: isEqualValue(args.purpose, '투자') ? convertPriceInputToNumber(args.investAmount) : 0,

    move_in_date: isEqualValue(args.purpose, '투자') ? null : args.moveInDate?.toISOString(),

    move_in_date_type: isEqualValue(args.purpose, '투자') ? null : getDateType(args.moveInDateType),

    pyoungs: args.pyoungList,

    note: args.description,

    interview_available_times: args.interviewAvailabletimes.join(),
  };

  Object.keys(params).forEach((key) => (params[key] === undefined || params[key] === '') && delete params[key]);
  return params;
}
