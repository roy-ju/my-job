import { RegionItem } from '@/components/organisms/RegionList';
import { BuyOrRent } from '@/constants/enums';
import convertPriceInputToNumber from '@/utils/convertPriceInputToNumber';

interface Args {
  bubjungdong: RegionItem;
  realestateType: number[];
  buyOrRent: number;
  price: string;
  monthlyRentFee: string;
  minArea: string;
  maxArea: string;
  floor: string[];
  purpose: string;
  moveInDate: Date | null;
  moveInDateType: string;
  remainingAmountDate: Date | null;
  remainingAmountDateType: string;
  description: string;
}

function getDateType(value?: string) {
  if (value === '이전') return 1;
  if (value === '이후') return 2;
  return 3;
}

export default function makeSuggestRegionalParams(args: Args) {
  const params: Record<string, unknown> = {
    address: args.bubjungdong.name,
    bubjungdong_code: args.bubjungdong.code,
    realestate_types: `${args.realestateType}`,
    buy_or_rents: args.buyOrRent === BuyOrRent.Buy ? '1' : '2,3',
    trade_price: args.buyOrRent === BuyOrRent.Buy ? convertPriceInputToNumber(args.price) : 0,
    deposit: args.buyOrRent !== BuyOrRent.Buy ? convertPriceInputToNumber(args.price) : 0,
    monthly_rent_fee: args.buyOrRent !== BuyOrRent.Buy ? convertPriceInputToNumber(args.monthlyRentFee) : 0,
    pyoung_from: args.minArea,
    pyoung_to: args.maxArea,
    purpose: args.purpose,
    remaining_amount_payment_time: args.purpose === '투자' ? args.remainingAmountDate?.toISOString() : null,
    remaining_amount_payment_time_type: args.purpose === '투자' ? getDateType(args.remainingAmountDateType) : null,
    move_in_date: args.purpose === '실거주' ? args.moveInDate?.toISOString() : null,
    move_in_date_type: args.purpose === '실거주' ? getDateType(args.moveInDateType) : null,
    floors: `${args.floor}`,
    note: args.description,
  };
  Object.keys(params).forEach((key) => (params[key] === undefined || params[key] === '') && delete params[key]);
  return params;
}
