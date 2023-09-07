import { BuyOrRent } from '@/constants/enums';
import convertPriceInputToNumber from '@/utils/convertPriceInputToNumber';

interface Args {
  danjiID: string;
  name: string;
  buyOrRent: number;
  price: string;
  monthlyRentFee: string;
  quickSale: string;
  investAmount: string;
  negotiable: boolean;
  pyoungList: number[];
  purpose: string;
  moveInDate: Date | null;
  moveInDateType: string;
  description: string;
}

function getDateType(value?: string) {
  if (value === '이전') return 1;
  if (value === '이후') return 2;
  return 3;
}

export default function makeRecommendDanjiParams(args: Args) {
  const params: Record<string, unknown> = {
    danji_id: args.danjiID,
    name: args.name,
    buy_or_rents: args.buyOrRent === BuyOrRent.Buy ? '1' : '2,3',
    invest_amount: args.buyOrRent === BuyOrRent.Buy ? convertPriceInputToNumber(args.investAmount) : 0,
    trade_price: args.buyOrRent === BuyOrRent.Buy ? convertPriceInputToNumber(args.price) : 0,
    deposit: args.buyOrRent !== BuyOrRent.Buy ? convertPriceInputToNumber(args.price) : 0,
    monthly_rent_fee: args.buyOrRent !== BuyOrRent.Buy ? convertPriceInputToNumber(args.monthlyRentFee) : 0,
    pyoungs: args.pyoungList.sort((a, b) => a - b),
    negotiable: args.buyOrRent === BuyOrRent.Buy && Boolean(+args.quickSale) === true ? false : args.negotiable,
    purpose: args.purpose,
    move_in_date: args.purpose === '투자' ? null : args.moveInDate?.toISOString(),
    move_in_date_type: args.purpose === '투자' ? null : getDateType(args.moveInDateType),
    note: args.description,
    quick_sale: args.buyOrRent === BuyOrRent.Buy ? Boolean(+args.quickSale) : null,
  };
  Object.keys(params).forEach((key) => (params[key] === undefined || params[key] === '') && delete params[key]);
  return params;
}
