import { RegionItem } from '@/components/organisms/RegionList';

import { BuyOrRent, RealestateType } from '@/constants/enums';

import convertPriceInputToNumber from '@/utils/convertPriceInputToNumber';

interface Args {
  bubjungdong: RegionItem;
  realestateType: number[];
  buyOrRent: number;
  price: string;
  monthlyRentFee: string;
  investAmount: string;
  negotiable: boolean;
  minArea: string;
  maxArea: string;
  purpose: string;
  moveInDate: Date | null;
  moveInDateType: string;
  description: string;
  interviewAvailabletimes: string[];
}

function getDateType(value?: string) {
  if (value === '이전') return 1;
  if (value === '이후') return 2;
  return 3;
}

export default function makeSuggestRegionalParams(args: Args) {
  if (args.realestateType.includes(RealestateType.Dasaedae)) {
    args.realestateType.push(RealestateType.Yunrip);
  }

  const params: Record<string, unknown> = {
    address: args.bubjungdong.name,
    bubjungdong_code: args.bubjungdong.code,
    realestate_types: `${args.realestateType}`,
    buy_or_rents: args.buyOrRent === BuyOrRent.Buy ? '1' : '2,3',
    invest_amount: args.buyOrRent === BuyOrRent.Buy ? convertPriceInputToNumber(args.investAmount) : 0,
    trade_price: args.buyOrRent === BuyOrRent.Buy ? convertPriceInputToNumber(args.price) : 0,
    deposit: args.buyOrRent !== BuyOrRent.Buy ? convertPriceInputToNumber(args.price) : 0,
    monthly_rent_fee: args.buyOrRent !== BuyOrRent.Buy ? convertPriceInputToNumber(args.monthlyRentFee) : 0,
    negotiable: args.negotiable,
    pyoung_from: args.minArea,
    pyoung_to: args.minArea === args.maxArea ? undefined : args.maxArea,
    purpose: args.purpose,
    move_in_date: args.purpose === '투자' ? null : args.moveInDate?.toISOString(),
    move_in_date_type: args.purpose === '투자' ? null : getDateType(args.moveInDateType),
    note: args.description,
    interview_available_times: args.interviewAvailabletimes.join(),
  };
  Object.keys(params).forEach((key) => (params[key] === undefined || params[key] === '') && delete params[key]);
  return params;
}
