import { CollateralType, DebtSuccessionType, InterimType } from '@/components/templates/ListingCreateForm/FormContext';
import { BuyOrRent } from '@/constants/enums';
import convertPriceInputToNumber from '@/utils/convertPriceInputToNumber';
import convertToISOString from '@/utils/convertToISOString';

interface Args {
  ownerName: string;
  ownerPhone: string;
  buyOrRent: number;
  price: string;
  monthlyRentFee: string;
  contractAmount: string;
  contractAmountNegotiable: boolean;
  remainingAmount: string;
  remainingAmountDate: string;
  remainingAmountDateType: string;
  interims: InterimType[];

  debtSuccessionDeposit: string;
  debtSuccessionMiscs: DebtSuccessionType[];
  jeonsaeLoan: boolean;

  moveInDate: string;
  dateType: string;

  rentArea: string;
  rentTermYear: string;
  rentTermMonth: string;
  rentTermNegotiable: boolean;
  specialTerms: string;

  collaterals: CollateralType[];

  quickSale: boolean;
}

function getDateType(value?: string) {
  if (value === '이전') {
    return 1;
  }
  if (value === '이후') {
    return 2;
  }
  return undefined;
}

export default function makeListingCreateParams(args: Args) {
  const collaterals = args.collaterals
    .filter((item) => item.price !== '')
    .map((item) => ({ name: item.name, amount: convertPriceInputToNumber(item.price) }));

  const debtSuccessions = [];
  if (args.debtSuccessionDeposit !== '') {
    debtSuccessions.push({
      name: '보증금',
      amount: convertPriceInputToNumber(args.debtSuccessionDeposit),
    });
  }
  debtSuccessions.push(
    ...args.debtSuccessionMiscs
      .filter((item) => item.price !== '')
      .map((item) => ({ name: item.name, amount: convertPriceInputToNumber(item.price) })),
  );

  const params: Record<string, unknown> = {
    administrative_fee: 0,
    buy_or_rent: args.buyOrRent,
    contract_amount: convertPriceInputToNumber(args.contractAmount),
    contract_amount_negotiable: args.contractAmountNegotiable,
    collaterals,
    debt_successions: debtSuccessions,
    deposit: args.buyOrRent !== BuyOrRent.Buy ? convertPriceInputToNumber(args.price) : 0,
    description: '',

    interim_amount1: convertPriceInputToNumber(args.interims[0]?.price),
    interim_amount_negotiable1: args.interims[0]?.negotiable,
    interim_amount_payment_time1: args.interims[0]?.date && convertToISOString(args.interims[0]?.date),
    interim_amount_payment_time1_type: getDateType(args.interims[0]?.dateType),

    interim_amount2: convertPriceInputToNumber(args.interims[1]?.price),
    interim_amount_negotiable2: args.interims[1]?.negotiable,
    interim_amount_payment_time2: args.interims[1]?.date && convertToISOString(args.interims[1]?.date),
    interim_amount_payment_time2_type: getDateType(args.interims[1]?.dateType),

    interim_amount3: convertPriceInputToNumber(args.interims[2]?.price),
    interim_amount_negotiable3: args.interims[2]?.negotiable,
    interim_amount_payment_time3: args.interims[2]?.date && convertToISOString(args.interims[2]?.date),
    interim_amount_payment_time3_type: getDateType(args.interims[2]?.dateType),

    jeonsae_loan: args.jeonsaeLoan,

    move_in_date: args.moveInDate && convertToISOString(args.moveInDate),
    move_in_date_type: getDateType(args.dateType),

    owner_name: args.ownerName,
    owner_phone: args.ownerPhone,

    remaining_amount: convertPriceInputToNumber(args.remainingAmount),
    remaining_amount_payment_time: args.remainingAmountDate && convertToISOString(args.remainingAmountDate),
    remaining_amount_payment_time_type: getDateType(args.remainingAmountDateType),

    rent_area: args.rentArea,
    rent_contract_term_year: Number(args.rentTermYear.replace('년', '')) ?? 0,
    rent_contract_term_month: Number(args.rentTermMonth.replace('개월', '')) ?? 0,
    rent_contract_term_negotiable: args.rentTermNegotiable,

    special_terms: args.specialTerms,

    trade_price: args.buyOrRent === BuyOrRent.Buy ? convertPriceInputToNumber(args.price) : 0,
    quick_sale: args.quickSale,
  };

  Object.keys(params).forEach((key) => (params[key] === undefined || params[key] === '') && delete params[key]);

  return params;
}
