import { BuyOrRent, DanjiOrRegionalType, RealestateType } from '@/constants/enums';

import convertPriceInputToNumber from '@/utils/convertPriceInputToNumber';

import getDateType from '@/utils/getDateType';

import isEqualValue from './isEqualValue';

import isNotEqualValue from './isNotEqualValue';

interface Args {
  suggestID: string;
  danjiOrRegion: number;
  realestateTypes: number[];
  buyOrRent: number;
  tradeOrDepositPrice: string;
  monthlyRentFee: string;
  quickSale: string;
  investAmount: string;
  negotiable: boolean;
  pyoungList: string[];
  purpose: string;
  moveInDate: Date | null;
  moveInDateType: string;
  additionalConditions: string[];
  interviewAvailabletimes: string[];
}

export default function suggestUpdateParams(args: Args) {
  if (args.danjiOrRegion === DanjiOrRegionalType.Danji) {
    const params: Record<string, unknown> = {
      suggest_id: Number(args.suggestID),
      realestate_types: args.realestateTypes.includes(RealestateType.Dasaedae)
        ? `${[...args.realestateTypes, RealestateType.Yunrip]}`
        : `${[...args.realestateTypes]}`,
      buy_or_rents: isEqualValue(args.buyOrRent, BuyOrRent.Buy)
        ? BuyOrRent.Buy.toString()
        : [BuyOrRent.Jeonsae.toString(), BuyOrRent.Wolsae.toString()].join(),
      trade_price: isEqualValue(args.buyOrRent, BuyOrRent.Buy)
        ? convertPriceInputToNumber(args.tradeOrDepositPrice)
        : 0,
      deposit: isNotEqualValue(args.buyOrRent, BuyOrRent.Buy) ? convertPriceInputToNumber(args.tradeOrDepositPrice) : 0,
      monthly_rent_fee: isNotEqualValue(args.buyOrRent, BuyOrRent.Buy)
        ? convertPriceInputToNumber(args.monthlyRentFee)
        : 0,
      negotiable: args.negotiable,
      quick_sale: isEqualValue(args.buyOrRent, BuyOrRent.Buy) ? Boolean(+args.quickSale) : null,
      purpose: isEqualValue(args.buyOrRent, BuyOrRent.Buy) ? args.purpose : '',
      invest_amount:
        isEqualValue(args.buyOrRent, BuyOrRent.Buy) && isEqualValue(args.purpose, '투자')
          ? convertPriceInputToNumber(args.investAmount)
          : 0,
      move_in_date: isEqualValue(args.purpose, '투자') ? null : args.moveInDate?.toISOString(),
      move_in_date_type: isEqualValue(args.purpose, '투자') ? null : getDateType(args.moveInDateType),
      pyoungs: [...args.pyoungList].sort((a, b) => Number(a) - Number(b)).join(),
      note: [...args.additionalConditions].join(),
      interview_available_times: [...args.interviewAvailabletimes].join(),
    };

    Object.keys(params).forEach((key) => (params[key] === undefined || params[key] === '') && delete params[key]);
    return params;
  }

  if (args.danjiOrRegion === DanjiOrRegionalType.Regional) {
    const params: Record<string, unknown> = {
      suggest_id: Number(args.suggestID),
      realestate_types: args.realestateTypes.includes(RealestateType.Dasaedae)
        ? `${[...args.realestateTypes, RealestateType.Yunrip]}`
        : `${[...args.realestateTypes]}`,
      buy_or_rents: isEqualValue(args.buyOrRent, BuyOrRent.Buy)
        ? BuyOrRent.Buy.toString()
        : [BuyOrRent.Jeonsae.toString(), BuyOrRent.Wolsae.toString()].join(),
      trade_price: isEqualValue(args.buyOrRent, BuyOrRent.Buy)
        ? convertPriceInputToNumber(args.tradeOrDepositPrice)
        : 0,
      deposit: isNotEqualValue(args.buyOrRent, BuyOrRent.Buy) ? convertPriceInputToNumber(args.tradeOrDepositPrice) : 0,
      monthly_rent_fee: isNotEqualValue(args.buyOrRent, BuyOrRent.Buy)
        ? convertPriceInputToNumber(args.monthlyRentFee)
        : 0,
      negotiable: args.negotiable,
      purpose: isEqualValue(args.buyOrRent, BuyOrRent.Buy) ? args.purpose : '',
      invest_amount:
        isEqualValue(args.buyOrRent, BuyOrRent.Buy) && isEqualValue(args.purpose, '투자')
          ? convertPriceInputToNumber(args.investAmount)
          : 0,
      move_in_date: isEqualValue(args.purpose, '투자') ? null : args.moveInDate?.toISOString(),
      move_in_date_type: isEqualValue(args.purpose, '투자') ? null : getDateType(args.moveInDateType),
      pyoung_from: [...args.pyoungList].join(),
      pyoung_to: undefined,
      note: [...args.additionalConditions].join(),
      interview_available_times: [...args.interviewAvailabletimes].join(),
    };

    Object.keys(params).forEach((key) => (params[key] === undefined || params[key] === '') && delete params[key]);
    return params;
  }

  return {};
}
