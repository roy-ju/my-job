import { CollateralType, DebtSuccessionType } from '@/components/templates/ListingCreateForm/FormContext';

import { BuyOrRent } from '@/constants/enums';

import convertPriceInputToNumber from '@/utils/convertPriceInputToNumber';

interface Args {
  buyOrRent: number;
  price: string;
  monthlyRentFee: string;

  debtSuccessionDeposit: string;
  debtSuccessionMiscs: DebtSuccessionType[];
  jeonsaeLoan: boolean;

  moveInDate: Date | null;
  moveInDateType: string;

  rentArea: string;
  rentTermYear: string;
  rentTermMonth: string;
  rentTermNegotiable: boolean;
  specialTerms: string;

  verandaExtended: boolean;
  verandaRemodelling: boolean;
  extraOptions: number[];

  collaterals: CollateralType[];

  quickSale: boolean;

  adminFee: string;

  listingPhotoUrls: string[];

  danjiPhotoUrls: string[];

  description: string;

  rentEndDate: Date | null;
}

function getDateType(value?: string) {
  if (value === '이전') {
    return 1;
  }
  if (value === '이후') {
    return 2;
  }
  if (value === '당일') {
    return 3;
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
    negotiation_or_auction: 1,
    administrative_fee: convertPriceInputToNumber(args.adminFee),
    buy_or_rent: args.buyOrRent,

    collaterals,
    debt_successions: debtSuccessions,
    deposit: args.buyOrRent !== BuyOrRent.Buy ? convertPriceInputToNumber(args.price) : 0,
    description: args.description,

    jeonsae_loan: args.jeonsaeLoan,

    move_in_date: args.moveInDate?.toISOString(),
    move_in_date_type: getDateType(args.moveInDateType),

    monthly_rent_fee: convertPriceInputToNumber(args.monthlyRentFee),

    rent_area: args.rentArea,
    rent_contract_term_year: Number(args.rentTermYear.replace('년', '')) ?? 0,
    rent_contract_term_month: Number(args.rentTermMonth.replace('개월', '')) ?? 0,
    rent_contract_term_negotiable: args.rentTermNegotiable,

    special_terms: args.specialTerms,

    veranda_extended: args.verandaExtended,
    veranda_remodelling: args.verandaRemodelling,
    options: args.extraOptions,

    trade_price: args.buyOrRent === BuyOrRent.Buy ? convertPriceInputToNumber(args.price) : 0,
    quick_sale: args.quickSale,

    rent_end_date: args.rentEndDate?.toISOString(),

    listingPhotoUrls: args.listingPhotoUrls,
    danjiPhotoUrls: args.danjiPhotoUrls,
  };

  Object.keys(params).forEach((key) => (params[key] === undefined || params[key] === '') && delete params[key]);

  return params;
}
